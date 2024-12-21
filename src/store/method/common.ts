// import message from '../message'
import Clipboard from 'clipboard'
import Web3 from 'web3'
import { message } from 'ant-design-vue'

import { localStorage } from '@/utils'
import { store } from '@/store'
import router from '@/router'

import { constants } from '@/store/constants'
import { view } from '@/store/view'
// import { wallet } from '@/store/wallet'
import { walletEvm } from '../wallet-evm'
import { user } from '@/store/user'
import { req } from '@/store/req'
import { appliance } from '@/store/appliance'

export default {
  async onInit () {
    if (!walletEvm.connected) return

    if (!user.isLogged) {
      await this.autoSignLogin()
      // this.onShareTweet()
    }
  },

  onCopy (selector: string) {
    const clipboard = new Clipboard(selector)

    clipboard.on('success', e => {
      store.message.success('Successfully copied to clipboard.')

      clipboard.destroy()
    })
  },

  async onConnect() {
    // Wallet Solana
    // store.wallet.selectOpen = true

    // Wallet Evm
    store.walletEvm.changeWallet()

    // store.method.common.onConnectLogIn()
  },

  // async onConnectLogIn ({ walletId } = { walletId: '' }) {
  //   // NOTE: 这里新地址切换后，如果使用 onlyIfTrusted: true 则 connect 报错
  //   if (walletId) {
  //     await walletEvm.select({ walletId })
  //   }

  //   await walletEvm.connect()

  //   if (!walletEvm.connected) return

  //   if (walletEvm.signedIn) return
  //   // NOTE: 补签名及登记
  //   this.onLogInSignMessage()
  // },

  // NOTE: 区分流程
  async logOut () {
    if (appliance.appEnv) {
      appliance.logout()
    } else {
      await this.baseLogOut()
    }
  },

  // 标准退出流程
  async baseLogOut (skipDisconnect: boolean = false) {
    if (!skipDisconnect) {
      // walletdisconnect()
    }

    walletEvm.resetWallet()
    user.reset()

    switch(router.currentRoute.value.name) {
      case 'InviteLink':
      case 'Emotion':
        view.emotion.reset()
        break
      case 'Earn':
        view.accountReward.reset()
        break
      case 'AIWatch':
      case 'AIWatchWithCode':
        view.aiwatch.reset()
        break
      default:
    }
  },

  // async onLogInSignMessage (signedMessage?: string) {
  //   // NOTE: 传入则是App，否则默认流程
  //   if (!signedMessage) {
  //     signedMessage = await wallet.signMessage(user.logInSignMessageText)
  //   }

  //   if (!signedMessage) return

  //   wallet.setWalletAccountsLoginSignByCache(signedMessage)
  //   wallet.updateSignedIn()

  //   const { data, error } = await req.logIn()

  //   if (error) return
  // },
  // XXX:
  // async autoLogInByCache () {
  //   wallet.getWalletAccountsLoginSignByCache()
  // }

  onShareTweet () {
    const opts = {
      text: `I'm earning $JUN at JUNLALA AI Emotion Training, the first of its kind in Web3. Join us to build an AI with emotions and earn while you train!`,
      hashtags: [...constants.tweet.hashtags],
      url: view.accountReward.invite.qrCodeValue,
      via: ''
    }
    const hashtags = opts.hashtags.length ? `&hashtags=${opts.hashtags.join(',')}` : ''
    const result = `https://twitter.com/intent/tweet?text=${encodeURIComponent(opts.text)}${hashtags}&url=${opts.url}&via=${opts.via}`

    user.info.tweetShareUrl = result
    // window.open(result,'_blank')
  },

  showAccountCenter () {
    store.user.accountCenter.open = true
  },

  async handleEvmSignMessage (wallet: any, signMessage: string): Promise<string> {
    const passphrase = ''
    try {
      const web3 = wallet.walletWeb3
      const encodedMessage = web3.utils.utf8ToHex(signMessage)
      const signature = await web3.eth.personal.sign(encodedMessage, wallet.address.handled, passphrase)

      return signature

    } catch (error: any) {
      message.error(error.message)

      throw new Error(error.message)
    }
  },

  getAccountLoginSignByCache (address?: string): string {
    let addressKey = address || walletEvm.address.handled
    const cache = localStorage.get(constants.cacheKey.WALLET_ACCOUNTS_LOGIN_SIGN) as { [k: string]: string }
    const signedMessage = cache[addressKey] ?? ''

    walletEvm.signedIn = !!signedMessage

    return signedMessage
  },

  setAccountLoginSignByCache (signedMessage: string, address?: string) {
    const { WALLET_ACCOUNTS_LOGIN_SIGN } = constants.cacheKey
    let addressKey = address || walletEvm.address.handled
    const cache = localStorage.get(WALLET_ACCOUNTS_LOGIN_SIGN) as { [k: string]: string } || {}

    cache[addressKey] = signedMessage
    walletEvm.signedIn = !!signedMessage

    localStorage.set(WALLET_ACCOUNTS_LOGIN_SIGN, cache)
  },

  getStorageSession () {
    return localStorage.get(constants.storageKey.SESSION) || {}
  },

  // NOTE: 必须只能同时只传一个address
  getSyncStorageSession (address: string): string {
    const sessions = this.getStorageSession() as Record<string, any>
    const session = sessions[address]

    let result = ''

    if (!session) {
      return result
    }

    // update
    user.info.session = result = session

    return result
  },
  async autoSignLogin () {
    const session = this.getSyncStorageSession(walletEvm.address.handled)

    if (session) {
      // await req.userInfo()
      return
    }

    let signedMessage = this.getAccountLoginSignByCache()

    // NOTE: 签名
    if (!signedMessage) {
      const signedMessage = await this.handleEvmSignMessage(walletEvm, user.logInSignMessageText)

      // update
      this.setAccountLoginSignByCache(signedMessage)
    }

    // await req.logIn()
    // await req.userInfo()
  }
}