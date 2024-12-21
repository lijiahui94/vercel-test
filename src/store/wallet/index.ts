import { reactive } from 'vue'
import { PublicKey, clusterApiUrl, Connection, Transaction } from '@solana/web3.js';
import { notification } from 'ant-design-vue';
import { WalletAdapterNetwork, WalletReadyState } from '@solana/wallet-adapter-base';

import { maskingAddress, localStorage, merge } from '@/utils'
import { constants } from '@/store/constants'

import { TPublicKey, BaseProvider } from './types'
import { TBaseAdapter } from './utils/BaseAdapter'
import { PhantomAdapter, SolflareAdapter } from './wallets'
import { createTransferTransaction } from './utils/createTransferTransaction'
import { getProvider } from './utils/getProvider'
import { handleSignAllTransactions } from './utils/handleSignAllTransactions'
import { handleSignAndSendTransaction } from './utils/handleSignAndSendTransaction'
import { handleSignMessage } from './utils/handleSignMessage'
import { handleSignTransaction } from './utils/handleSignTransaction'
import { pollSignatureStatus } from './utils/pollSignatureStatus'

const WALLET_ID_CACHE_KEY = '_WALLET_NAME_'

export type TWallet = {
  // autoConnect: boolean
  _publicKey: TPublicKey
  readonly publicKey: TPublicKey
  readonly connected: boolean
  readonly address: string
  readonly maskingAddress: string

  provider: BaseProvider | null
  readonly hasProvider: boolean

  transactions: Array<Transaction>
  readonly hasTransactions: boolean

  selectOpen: boolean
  id: string
  currentWallet: TBaseAdapter<any> | null
  wallets: Record<string, TBaseAdapter<any>>
  select: (opts?: { walletId: string } ) => Promise<void>

  init: () => Promise<void>
  listen: () => Promise<void>

  connecting: boolean
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<void>

  disconnecting: boolean
  disconnect: () => Promise<void>

  getWalletAccountsLoginSignByCache: () => Record<string, string>
  walletAccountLoginSignByCache: (address?: string) => string
  setWalletAccountsLoginSignByCache: (signedMessage: string) => void
  updateSignedIn: () => Promise<void>
  afterUpdateSignedIn: () => Promise<any>
  afterAccountChanged: () => Promise<any>
  afterDisconnect: () => Promise<any>
  signedIn: boolean

  signing: boolean
  signMessage: (message: string) => Promise<string | undefined>
  signAllTransactions: () => Promise<void>
  signTransaction: () => Promise<void>
  signAndSendTransaction: () => Promise<void>

  reset: () => void
}

const NETWORK = 'https://solana-api.projectserum.com';
// const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet)
// TODO: android 下无效
// const connection = new Connection(NETWORK);

const DEFAULTS = {
  _publicKey: null, // App 引导的方案

  transactions: [],
  // 是否已签名登录
  signedIn: false,

  id: '',
  currentWallet: null,
}

let rootProvider: BaseProvider | null = null

export const wallet: TWallet = reactive({
  ...DEFAULTS,

  get publicKey () {
    const { provider, _publicKey } = this

    return provider?.publicKey || _publicKey || null
  },
  // NOTE: 目前规则
  get connected () {
    return !!this.publicKey
  },
  get address () {
    const { publicKey } = this

    return publicKey?.toBase58() ?? ''
  },
  get maskingAddress () {
    const { address } = this

    return maskingAddress(address)
  },
  provider: null,
  get hasProvider () {
    const { provider } = this

    return !!provider
  },

  get hasTransactions () {
    const { transactions } = this

    return !!transactions.length
  },

  selectOpen: false,
  wallets: {
    phantom: new PhantomAdapter(),
    solflare: new SolflareAdapter()
  },
  async select({ walletId }: { walletId: string }) {
    const wallet = this.wallets[walletId]

    if (!wallet || wallet.readyState === WalletReadyState.Unsupported) return

    const { provider } = wallet.getProvider()

    if (!provider) return

    // update
    rootProvider = provider
    this.id = walletId
    this.currentWallet = wallet

    this.listen()
    await this.connect({ onlyIfTrusted: true })
  },

  async init() {
    const walletId = localStorage.get(WALLET_ID_CACHE_KEY) as string

    if (walletId) {
      await this.select({ walletId })
    } else {
      if (!rootProvider) return

      this.listen()
      await this.connect({ onlyIfTrusted: true })
    }
  },

  async listen () {
    if (!rootProvider) return

    rootProvider.on('connect', (publicKey: PublicKey) => {
      // update
      this.provider = rootProvider
      localStorage.set(WALLET_ID_CACHE_KEY, this.id)

      console.log(`Connected to account ${this.address}`)
    });

    rootProvider.on('disconnect', () => {
      // update
      this.provider = null

      this.afterDisconnect ()
      console.log('Disconnect.')
    })

    rootProvider.on('accountChanged', (publicKey: TPublicKey) => {
      // update
      this.provider = null

      if (publicKey) {
        // update
        this.provider = rootProvider

        this.afterAccountChanged()
        this.updateSignedIn()

        console.log(`Switched to account ${this.address}`)
      } else {
        console.log('Attempting to switch accounts.')
      }
    })
  },

  connecting: false,
  async connect (opts = { onlyIfTrusted: false }) {
    if (!rootProvider || this.connecting || this.connected ) return;

    try {
      this.connecting = true

      await rootProvider.connect(opts)

      this.connecting = false
      await this.updateSignedIn()
    } catch (error: any) {
      this.connecting = false

      notification.error({
        message: `Connect`,
        description: error.message,
      })
    }
  },

  disconnecting: false,
  async disconnect () {
    const { provider } = this

    if (!provider) return;

    this.disconnecting = true
    try {
      await provider.disconnect()
      this.disconnecting = false
    } catch (error: any) {
      this.disconnecting = false

      notification.error({
        message: `Disconnect`,
        description: error.message,
      })
    }
  },

  getWalletAccountsLoginSignByCache () {
    const { WALLET_ACCOUNTS_LOGIN_SIGN } = constants.cacheKey

    return localStorage.get(WALLET_ACCOUNTS_LOGIN_SIGN) || {}
  },
  walletAccountLoginSignByCache (address?: string) {
    const { WALLET_ACCOUNTS_LOGIN_SIGN } = constants.cacheKey
    address = address ?? this.address
    const cache = localStorage.get(WALLET_ACCOUNTS_LOGIN_SIGN) as { [k: string]: string }

    return cache[address] ?? ''
  },
  setWalletAccountsLoginSignByCache (signedMessage) {
    const { WALLET_ACCOUNTS_LOGIN_SIGN } = constants.cacheKey
    const { address } = this
    const cache = this.getWalletAccountsLoginSignByCache()

    cache[address] = signedMessage

    localStorage.set(WALLET_ACCOUNTS_LOGIN_SIGN, cache)
  },
  async updateSignedIn () {
    const signedMessage = this.walletAccountLoginSignByCache()

    // update
    this.signedIn = !!signedMessage

    this.afterUpdateSignedIn()
  },
  // NOTE: 可在外部自定义触发的事件
  async afterUpdateSignedIn () {

  },
  // NOTE: 可在外部自定义触发的事件
  async afterAccountChanged () {

  },
  // NOTE: 在由钱包主动触发的事件（地址切换至无授权的网站）
  async afterDisconnect () {

  },

  signing: false,
  async signMessage (message: string) {
    const { provider, signing } = this

    if (!provider) return;

    // update
    this.signing = true

    const signedMessage = await handleSignMessage(provider, message);

    // update
    this.signing = false

    notification.success({
      message: `SignMessage`,
      description: `Message signed: ${JSON.stringify(signedMessage)}`
    })

    return signedMessage
  },

  async signAllTransactions () {
    // const { provider, transactions, hasTransactions } = this
    const { provider } = this
    const key = 'signAllTransactions'

    if (!provider || !provider.publicKey) return;

    try {
      // TEST
      const transactions = [
        // await createTransferTransaction(provider.publicKey, connection),
        // await createTransferTransaction(provider.publicKey, connection),
      ];

      // notification.info({
      //   key,
      //   message: 'SignAllTransactions',
      //   description: `Requesting signature for: ${JSON.stringify(transactions)}`,
      // });

      // const signedTransactions = await handleSignAllTransactions(provider, transactions, key);

      // notification.success({
      //   key,
      //   message: 'SignAllTransactions',
      //   description: `Transactions signed: ${JSON.stringify(signedTransactions)}`,
      // });
    } catch (error: any) {
      notification.error({
        key,
        message: `SignAllTransactions`,
        description: error.message,
      })
    }
  },

  async signTransaction () {
    const { provider } = this
    const key = 'signTransaction'

    if (!provider || !provider.publicKey) return;

    try {
      // TEST
      // const transaction = await createTransferTransaction(provider.publicKey, connection)

      // notification.info({
      //   key,
      //   message: 'SignTransaction',
      //   description: `Requesting signature for: ${JSON.stringify(transaction)}`,
      // });

      // const signedTransaction = await handleSignTransaction(provider, transaction, key);
      // notification.success({
      //   key,
      //   message: 'SignTransaction',
      //   description: `Transaction signed: ${JSON.stringify(signedTransaction)}`,
      // })
    } catch (error: any) {
      notification.error({
        key,
        message: `SignTransaction`,
        description: error.message,
      })
    }
  },

  async signAndSendTransaction () {
    const { provider } = this
    const key = 'signAndSendTransaction'

    if (!provider || !provider.publicKey) return;

    try {
      // TEST
      // const transaction = await createTransferTransaction(provider.publicKey, connection);

      // notification.info({
      //   key,
      //   message: 'SignAndSendTransaction',
      //   description: `Requesting signature for: ${JSON.stringify(transaction)}`,
      // })

      // const signature = await handleSignAndSendTransaction(provider, transaction, key);
      // notification.info({
      //   key,
      //   message: 'signAndSendTransaction',
      //   description: `Signed and submitted transaction ${signature}.`,
      // })

      // pollSignatureStatus(signature, connection, key);
    } catch (error: any) {
      notification.error({
        key,
        message: 'signAndSendTransaction',
        description: error.message,
      })
    }
  },

  reset () {
    // update
    merge(this, DEFAULTS)
  }
} as TWallet)

wallet.init()