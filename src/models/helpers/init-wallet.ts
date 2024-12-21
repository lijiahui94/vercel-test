import Web3 from 'web3'
import Onboard from '@web3-onboard/core'
// import type { OnboardAPI } from '@web3-onboard/core'
// import Onboard from '../../../public/lib/@web3-onboard:core/index'
// import { init } from '@web3-onboard/vue'

import { reactive } from 'vue'
import { merge, localStorage, isMobile, forEach, addressShortener } from '@/utils'
import { constants } from '@/store/constants'

import ModelInfura from './infura'
import ModelState from '../base/state'
import { NETWORK_ID } from './constant'
import ModelValueAddress from '../value/address'
import injectedWallets from './wallets'
import { method } from '@/store/method'

const CACHE_WALLET_NAME = '__Global_Wallet_Selected'
const CACHE_WALLET_ADDRESS = '__Global_Wallet_Address'
const CACHE_WALLET_CONNECTED = '__Global_Wallet_Connected'

const bitkeepWalletLogoSvg = `
<svg style="zoom:0.7" width="54" height="61" viewBox="0 0 54 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M53.6608 17.1403V20.2035C53.6609 20.4994 53.5834 20.7901 53.4362 21.0464C53.289 21.3027 53.0772 21.5155 52.8222 21.6634L42.9944 27.3642L51.7699 32.4414C52.3439 32.7744 52.8204 33.2535 53.1516 33.8304C53.4829 34.4074 53.657 35.0618 53.6566 35.7279V43.8956C53.6574 44.562 53.4834 45.2169 53.1522 45.7942C52.8209 46.3716 52.3442 46.851 51.7699 47.1842L28.6825 60.4965C28.1089 60.8294 27.4581 61.0046 26.7958 61.0046C26.1334 61.0046 25.4827 60.8294 24.909 60.4965L17.3621 56.1125C17.2345 56.0385 17.1286 55.9321 17.0549 55.804C16.9813 55.6758 16.9425 55.5305 16.9425 55.3825C16.9425 55.2345 16.9813 55.0891 17.0549 54.961C17.1286 54.8328 17.2345 54.7264 17.3621 54.6525L42.3089 40.2236C42.3725 40.1866 42.4252 40.1334 42.4619 40.0694C42.4985 40.0055 42.5178 39.933 42.5178 39.8591C42.5178 39.7853 42.4985 39.7128 42.4619 39.6488C42.4252 39.5849 42.3725 39.5317 42.3089 39.4947L33.0451 34.1162C32.7901 33.9683 32.5009 33.8904 32.2065 33.8904C31.9121 33.8904 31.6229 33.9683 31.368 34.1162L6.02071 48.7832C5.82949 48.8941 5.61259 48.9525 5.3918 48.9525C5.171 48.9525 4.9541 48.8941 4.76288 48.7832L1.89505 47.1336C1.32013 46.8001 0.842947 46.32 0.511679 45.7418C0.180411 45.1637 0.0067797 44.508 0.00831082 43.8408V40.4996C0.00816917 40.2776 0.0662217 40.0594 0.176626 39.8671C0.28703 39.6748 0.445891 39.5151 0.637223 39.4041L36.9611 18.4233C37.0246 18.3863 37.0774 18.3331 37.114 18.2691C37.1507 18.2052 37.17 18.1326 37.17 18.0588C37.17 17.985 37.1507 17.9125 37.114 17.8485C37.0774 17.7846 37.0246 17.7314 36.9611 17.6944L27.6804 12.2991C27.4255 12.1511 27.1363 12.0733 26.8419 12.0733C26.5475 12.0733 26.2583 12.1511 26.0033 12.2991L1.26613 26.6016C1.13857 26.6756 0.993852 26.7145 0.846551 26.7145C0.69925 26.7144 0.554562 26.6754 0.42705 26.6013C0.299537 26.5272 0.1937 26.4206 0.120191 26.2923C0.0466814 26.164 0.00809352 26.0186 0.00831082 25.8705V17.1003C0.00751743 16.4339 0.181499 15.779 0.51273 15.2017C0.843961 14.6243 1.32074 14.1449 1.89505 13.8117L24.9761 0.501453C25.5498 0.168627 26.2005 -0.0065918 26.8629 -0.0065918C27.5252 -0.0065918 28.1759 0.168627 28.7496 0.501453L51.7824 13.8517C52.3552 14.186 52.8303 14.6659 53.16 15.2431C53.4897 15.8204 53.6624 16.4747 53.6608 17.1403Z" fill="#7524F9"/>
</svg>
`
const tokenPocketWalletLogoImg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABuCAMAAADbNSdmAAAAdVBMVEUAAAApgP4pgP8ogP8pgP4pgP4ogP0jgP8ngf0qgP4pgP8ogPspgP4pf/0pgP4pgP0ogP9Tmv8xhf8qgP8pgP5Hk/8qgv5Tmf5gof9Ej/4pgP46if1lpv9gn/8pgP5gof9Nlf5Gkf85iv9Tmf9Mlf85if9Umf/iliMZAAAAHnRSTlMA3yBAgL9gEDDvz0CQcO+gn/5Pn693b+/fv7CAPzCYi75gAAABvklEQVRo3u3X23LCIBCA4YWQQA4aNdWe6cn2/R+xzliHUQhZOxu4cL9bnfyzJOQAjDHGGGOMMXKmmGZgnDbePzB0aTGEkhBQ7Mr69Jdm2GjAUxZJeDNp1dgLQwFYpUVrL7K1DSgNfXgpwSmEHTFI6rAd3Lhd9KRQh5cajmRjoxbEYbv56wo7QRGHF647VaYLu8M1qMWhn1ghtwBN2O3kwuKUhGEBBwK9PHThCgCqKzYfVbhBDIy/su/wCy3dwLiRIQJ/pE7/41qMUQIzbXc8iLTX6ADNL/rrgyfown1wx1Zt2wXXTZKFG+upq+NJCF2lFVk4cp/QTeA3qrAObe6T1npWVGEZvUvUacL+aRRJw7tcEz/CiUl7jt9fIntczRjeP8jxT5LNnBO/3W8N6KK0AWbW8NfHZ+S5mCX8lCtczRtej4UFZAqvINNSy0xhBXnCAjKFDUCWi0tBnok7yBPuYfbw/hD+DsybZeIFJAmvLyYWBtKEf84mrhU46Za6VhqcFPvYfVKmClevm+2zUqoyoVnTvNBzmMMcvu2w923dTIVbINFPvDqV/orQ0H1tY8842YszpQTGGGOMMcbYTfgFwT+WWi9nEtIAAAAASUVORK5CYII=`
const okxWalletLogoImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACcUlEQVRoge2ZvY7aQBDHx5atNVoju6JxQyRwAwgXLigsszzBKU+QvAk8SvIEiZ8AX0eH09KEFFDQnBGcMLbRpgpKwoeXk4/16fyTphvPzn+93tF4BDgDIURP0/RTmqbWbrezoijSKaX1c76vhSzLc0ppWK1W5wih73EcP04mk3nmg67rDhuNxpOmaRQACmEYY2qaJnVdd3gxcUJI3bbtKcaYe8KXTFEUatv2tNfrnZ4G27anCCHuSbKK+Cd513WHbyH5P4Yxpo7jjAAABEJIfblc/pzNZidvpcg0m83QMIwP4uFwIIvFgnc+N7NarfQkST6LcRw/PD8/887nZtbrNaRp2hW32+1d7/c8iaLIkgBAZ3G2LAt0/bqr7/tMC+cVa7/f62CaZuZXTwihLFiWdddYpmlSkWnLGMna1deIlasAHpQCeFMK4M37EBCGYW4L5hkLAEBicQqCAAaDwVWfMAyh3+/DcHi5aQIA8DyPKVYQBCypAVMlZrXxeJxZYcfjcW7r5V6JeVAK4E0pgDelAN4wFTIAtjbQ87zMOJ7n5dqeli3l35Qt5QsoBfCmFMCb9yGg0C2lKIpzALj6h5q1pWRpA/OMJcvyHLrd7hQKMDZ6ibVaramIEPqRKbWgqKr6S5RlOdA0jXcuN4MxBoTQN1GW5S+1Wi3fL+sOGIYBcRw/AgCA4zijIg+4/zdFUY5j1iNvddB9rAOqqn7sdDoBQuj8OysAGGNot9uBqqqX72HHcUamadIiHSlN02ij0Xg6OTYAIJwTQQipHw4HEsfxw2azqQuCoCdJctdxrCAIc0VRwkqlEkiSFEiS9NX3/ZPL5jdzIS3Sk/pMJgAAAABJRU5ErkJggg=='
const ETHERSCAN_DOMAINS: Record<number, string> = {
  1: 'etherscan.io',
  4: 'rinkeby.etherscan.io',
}

export default {
  /**
   * @param {Object} opts
   * @param {string} opts.infuraKey
   * @param {number|string=} opts.networkId 当前配置的网络 ID，默认从 .env 中获取
   * @param {Array=} opts.supportedWallets 支持的钱包
   * @return {!Object}
   */
  create({ infuraKey, networkId = NETWORK_ID, supportedWallets = [] }: {
    infuraKey: string
    networkId?: number | string
    supportedWallets?: string[]
  }) {
    // 创建时的网络 ID，当后面网络切换时的参照而设定为常量
    const NETWORK_ID: string | number = +networkId
    const infura = ModelInfura.create({ networkId: NETWORK_ID, infuraKey })

    const __store__: { name: string | undefined } = {
      name: undefined,
    }

    const wallet = reactive({
      /**
       * 钱包名称
       * @type {string|undefined}
       */
      get name() {
        return __store__.name
      },
      set name(val) {
        __store__.name = val || ''

        if (__store__.name) {
          localStorage.set(CACHE_WALLET_NAME, __store__.name)
        } else {
          localStorage.remove(CACHE_WALLET_NAME)
        }
      },
      /**
       * 用户钱包地址
       * @type {string|undefined}
       */
      address: ModelValueAddress.create(),
      /**
       * 缩短的用户钱包地址
       * @type {string}
       */
      get addressShortened() {
        const { address } = this

        return addressShortener(address.handled)
      },
      /**
       * 地址在区块浏览器中的 url
       * @type {string}
       */
      get getEtherscanUrl() {
        const { address, networkId } = this

        return `https://${ETHERSCAN_DOMAINS[networkId]}/address/${address.handled}`
      },

      // connecting: false,
      // signing: false,
      signedIn: false,

      /**
       * 当前网络 ID
       * @type {number|string|undefined}
       */
      networkId: NETWORK_ID,

      // 是否有效的网络 ID
      get isValidatedNetwork() {
        const { networkId } = this
        // 必须与配置的网络 ID 一样
        return Number(networkId) === NETWORK_ID
      },

      /**
       * 校验网络 ID 是否有效
       */
      async checkNetwork() {
        const { isConnected } = this

        // 已连上钱包时才可以 walletCheck()，否则需要 walletSelect()，而如果 walletSelect() 则会连续出现2次弹框
        if (isConnected) {
          // 官方说明需要先调用 walletSelect，但这里 walletSelect 后 body 会被 hidden
          // await onboard.walletSelect(name)
          // 当网络不匹配时，onboard 会要求变更网络
          // @ts-ignore
          await onboard.walletCheck()
        }
      },

      /**
       * 当前钱包数据是否有效
       * - 无法 set
       * - true 有钱包地址、网络 id 符合、连接钱包时
       * @type {boolean}
       */
      get isValidated() {
        const { isValidatedNetwork, address, isConnected } = this

        return isValidatedNetwork && address.isValidated && isConnected
      },

      /**
       * 当前使用的 web3
       * @type {!Object}
       */
      get web3() {
        return (
          (this.isConnected && this.walletWeb3) ||
          // 没链接到钱包
          this.infuraWeb3
        )
      },
      /**
       * infura
       * @type {Object}
       */
      infuraWeb3: infura.web3,
      /**
       * 钱包自身
       * @type {Object}
       */
      walletWeb3: null,
      /**
       * 对应 window.web3
       * @type {Object}
       */
      get windowWeb3() {
        return window.web3
      },
      set windowWeb3(val) {
        window.web3 = val
      },
      RPC_URL: infura.RPC_URL,
      /**
       * 初始钱包配置
       */
      async init() {
        const address = localStorage.get(CACHE_WALLET_ADDRESS)

        try {
          address && this.autoConnect()
        } catch (err) {
          console.error(err)
        }
      },
      /**
       * 切账号
       */
      // switchAccount () {
      //   // TODO: 要已经连上钱包后
      //   // TODO: 目前 web 下无效
      //   onboard.accountSelect()
      // },
      async autoConnect(bool = false) {
        // TODO: 这里要对已支持在 app 内自动登录的钱包做遍历校验，但要把 walletConnect 放在最后，或不自动执行
        // console.log(
        //   bool,
        //   bitKeep.envFactor && bitKeep.envWalletName,
        //   tokenPocket.envFactor && tokenPocket.envWalletName,
        //   trust.envFactor && trust.envWalletName,
        //   imToken.envFactor && imToken.envWalletName,
        //   coinbase.envFactor && coinbase.envWalletName,
        // )
        if (!this.isConnected || !this.isValidated) {
          // 自动加载缓存、所在环境的钱包名
          await this.changeWallet(localStorage.get(CACHE_WALLET_CONNECTED))
        }
      },
      /**
       * 变更钱包
       */
      async changeWallet(previouslyConnectedWallets: any) {
        const { state } = this
        let wallets = null
        state.beforeUpdate()

        try {
          if (previouslyConnectedWallets) {
            // 静默自动加载
            wallets = await onboard.connectWallet({ autoSelect: { label: previouslyConnectedWallets[0], disableModals: true } })
          } else {
            wallets = await onboard.connectWallet()
          }

          // 由 onboard.wallet 的监听触发，而不用在这里
          // this.updateWallet()
        } catch (err) {
          console.error(err)
        }
      },
      /**
       * 更新钱包数据
       * @param {Object=} [provider]
       */
      updateWallet(provider = null) {
        const { state } = this
        const { wallets, chains } = onboard.state.get()

        if (!wallets.length) {
          // 重置钱包
          this.resetWallet()
        } else {
          // update
          this.name = wallets[0].label
          // @ts-ignore
          this.networkId = chains[0].id

          // 使用钱包的
          // wallet.address 有效后会使用钱包赋值的 this.web3，因此先处理 this.web3
          // @ts-ignore
          this.walletWeb3 = new Web3(provider || chains[0].rpcUrl)
          this.isConnected = true

          state.afterUpdate()
        }
      },
      customNotification: (data: any) => ({ update: (data: any) => {}, dismiss: (data: any) => {} }),
      /**
       * 是否已连上钱包
       * @type {boolean}
       */
      isConnected: false,

      // NOTE: 目前规则
      get connected() {
        return this.isConnected
      },

      // 有地址、切地址成功后触发
      async eventAddress() { },

      // 有地址、切地址、切网络成功后，且 isValidated true 触发
      async eventValidatedAddress() { },

      /**
       * 重置当前钱包
       */
      async resetWallet() {
        const { state } = this

        // 已经断开则不再重置
        if (!this.isConnected) return false

        // update
        this.name = ''
        this.signedIn = false
        this.address.reset()
        localStorage.remove(CACHE_WALLET_NAME)
        localStorage.remove(CACHE_WALLET_ADDRESS)
        localStorage.remove(CACHE_WALLET_CONNECTED)

        this.walletWeb3 = null

        state.reset()
        this.isConnected = false

        // 重置 Onboard 钱包状态并断开
        const [primaryWallet] = onboard.state.get().wallets
        await onboard.disconnectWallet({ label: primaryWallet.label })
        console.info('Wallet disconnected.')
      },

      // 状态
      state: ModelState.create(),
    })

    const currentProvider = wallet.web3.currentProvider

    // TODO:?
    // const ModelOriginWalletUnit = {
    //   /**
    //    * @param {Object} opts
    //    * @param {*} param0
    //    * @return {!Object}
    //    */
    //   create ({
    //     name = '',
    //     preferred = false,
    //     envFactor = true
    //   } = {}) {
    //     return {
    //       onboard: { walletName: name, preferred },
    //       // TODO:
    //       envFactor: true
    //     }
    //   }
    // }

    // 是否在某个钱包的 App env
    //  TODO:
    //  let isWalletAppEnv = false

    // const wallets = []

    // forEach(supportedWallets, name => {
    //   const wallet = originWallets[name]

    //   if (wallet) {
    //     // 移动端钱包 App 环境限定，或无环境条件
    //     if (!isMobile || wallet.envFactor) {
    //       wallets.push(wallet.onboard)
    //     }
    //   }
    // })

    const onboard = Onboard({
      // theme: 'dark',
      wallets: injectedWallets,
      chains: [
        constants.app.isProd
          ? {
            id: '0x38',
            // token: 'BNB',
            // label: 'BSC Mainnet',
            // rpcUrl: constants.network.rpc
          }
          : {
            id: '0x61',
            token: 'BNB',
            label: 'BSC Testnet',
            rpcUrl: constants.network.rpc
          }
      ],
      apiKey: constants.app.blocknativeKey,
      connect: {
        autoConnectLastWallet: true,
        // autoConnectAllPreviousWallet: true
      },
      accountCenter: {
        desktop: {
          // position: 'bottomRight',
          enabled: true,
          minimal: false
        },
        mobile: {
          enabled: true,
          minimal: true
        }
      },
    })

    wallet.customNotification = onboard.state.actions.customNotification

    const { unsubscribe } = onboard.state.select('wallets').subscribe((wallets: any) => {
      if (!wallets.length) return false

      localStorage.set(CACHE_WALLET_CONNECTED, wallets.map(({ label }: { label: any}) => label))

      const [data] = wallets

      if (data.chains?.length) {
        if (+data.chains[0].id !== +NETWORK_ID) {
          onboard.setChain({ chainId: NETWORK_ID })
        }
      }

      if (data.accounts[0]) {
        wallet.updateWallet(data.provider)
        const { address } = data.accounts[0]

        // 唯一 address 赋值处
        wallet.address.setValue(address)
        wallet.eventAddress()

        if (wallet.isValidated) {
          wallet.eventValidatedAddress()
        }
      } else {
        method.common.logOut()
      }
    })

    wallet.init()

    return wallet
  },
}
