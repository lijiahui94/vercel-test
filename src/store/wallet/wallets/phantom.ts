import {
  WalletName,
  WalletReadyState,
  isIosAndRedirectable,
  scopePollingDetectionStrategy
} from '@solana/wallet-adapter-base';
import { PublicKey } from '@solana/web3.js'

import { BaseAdapter } from '../utils/BaseAdapter'
import { BaseProvider } from '../types'
import { appliance } from '@/store/appliance'
import { wallet } from '../index'
import { method } from '@/store/method'
import { user } from '@/store/user'
export interface PhantomProvider extends BaseProvider {
  isPhantom?: boolean
}
declare global {
  namespace globalThis  {
    var phantom: {
      ethereum?: any
      solana?: PhantomProvider
    }
    var solana: PhantomProvider
  }
}

export class PhantomAdapter extends BaseAdapter<PhantomProvider> {
  name = 'Phantom' as WalletName<'Phantom'>
  url = 'https://phantom.app'
  icon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiB2aWV3Qm94PSIwIDAgMTA4IDEwOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPg=='

  constructor() {
    super()
    const hasProvider = this.checkProvider(this.getProvider())

    // update
    if (this.readyState !== WalletReadyState.Unsupported) {
      if (isIosAndRedirectable() || appliance.appEnv) {
        // 在 iOS（非 webview）中，将 Phantom 设置为可加载，而不是检查是否安装
        this.readyState = WalletReadyState.Loadable
      } else {
        scopePollingDetectionStrategy(() => {
          if (hasProvider) {
            this.readyState = WalletReadyState.Installed;
            return true
          }
          return false
        })
      }
    }

    // NOTE: 针对 App 的交互
    if (appliance.appEnv) {
      // alert('isApp')
      document.addEventListener('message', (nativeEvent: any) => {
        const { data } = nativeEvent?.data

        switch(nativeEvent?.data?.method) {
          case 'connect':
            // NOTE: onConnectLogIn() 流程
            const { publicKey } = data

            if (!publicKey) return

            wallet._publicKey = new PublicKey(publicKey)
            wallet.updateSignedIn()

            // update
            wallet.selectOpen = false // 关闭钱包选择框
            if (wallet.signedIn) return

            // 发起登录签名
            window?.ReactNativeWebView?.postMessage(JSON.stringify({method : 'signMessage', data: { walletId: 'phantom', signMessageText: user.logInSignMessageText }}))
            break
          case 'disconnect':
            method.common.baseLogOut(true)
            break
          case 'signMessage':
            const { signedMessage } = data
            if (!signedMessage) return

            // method.common.onLogInSignMessage(signedMessage)
            break
          default:
        }
      })
    }
  }

  checkProvider = ({ provider }: { provider?: PhantomProvider }) => !!provider?.isPhantom

  getProvider = () => ({ provider: window.phantom?.solana || window.solana! || null })

  installation = async () => {
    // TODO: 目前在这里强行
    if (appliance.appEnv) {
      window?.ReactNativeWebView?.postMessage(JSON.stringify({method : 'connect', data: { walletId: 'phantom' }}))
      return
    }

    window.location.href = this.url
  }
}