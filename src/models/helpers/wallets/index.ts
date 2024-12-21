import injectedModule, { ProviderLabel } from '@web3-onboard/injected-wallets'
// import walletConnect from './wallet-connect'
import binanceEqual from './binance'
import coinbase from './coinbase'
// import injected from './injected'

import { okxEqual } from './okx'

export const installeUrl: Record<any, string> = {
  [ProviderLabel.OKXWallet]: 'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge'
}

const injected = injectedModule({
  custom: [
  ],
  displayUnavailable: true,
  filter: {},
  // do a manual sort of injected wallets so that MetaMask and Coinbase are ordered first
  // @ts-ignore
  sort: wallets => {
    const metaMask = wallets.find(({ label }) => label === ProviderLabel.MetaMask)

    return [
      metaMask,
      okxEqual,
      binanceEqual
    ]
  },
  walletUnavailableMessage: wallet => {
    const { label } = wallet

    return `Oops ${label} is unavailable!
      ${installeUrl[label]
        ? `Please click <a href="${installeUrl[label]}" target="_blank"><b>here</b></a> to install.`
        : ''
      }
    `
  }
})

export default [
  injected,
  // trust,
  // walletConnect,
  // coinbase
]