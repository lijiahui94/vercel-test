import { PublicKey } from '@solana/web3.js';

declare global {
  namespace globalThis  {
    var junlala: {
      isApp?: boolean
    }
    var ReactNativeWebView: {
      postMessage: any
    }
  }
}

export type TAppliance = {
  appEnv: boolean
  logout: () => void
}

const { junlala } = window

export const appliance: TAppliance = {
  appEnv: !!junlala?.isApp,
  logout: () => {
    window?.ReactNativeWebView?.postMessage(JSON.stringify({method : 'disconnect' }))
  }
}