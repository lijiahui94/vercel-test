import {
  WalletName,
  WalletReadyState,
  isIosAndRedirectable,
  scopePollingDetectionStrategy
} from '@solana/wallet-adapter-base';

import { BaseProvider } from '../types'

export type TBaseAdapter<ProviderType extends BaseProvider> = {
  readonly id: string;
  name: WalletName;
  url: string;
  icon: string;
  readyState: WalletReadyState;
  readonly installed: boolean;
  readonly unsupported: boolean;
  readonly loadable: boolean;
  readonly readyStateView: string;
  checkProvider: ({ provider }: { provider?: ProviderType }) => boolean;
  getProvider: () => { provider: ProviderType };
  installation: () => Promise<void>
}

export class BaseAdapter<T> {
  get id () {
    return this.name.toLocaleLowerCase()
  }
  name = ''
  url = '###'
  icon = ''

  readyState = typeof window === 'undefined' || typeof document === 'undefined'
    ? WalletReadyState.Unsupported
    : WalletReadyState.NotDetected
  get installed () {
    return this.readyState === WalletReadyState.Installed
  }
  get unsupported () {
    return this.readyState === WalletReadyState.Unsupported
  }
  get loadable () {
    return this.readyState === WalletReadyState.Loadable
  }
  get readyStateView () {
    const { loadable, installed} = this

    return loadable
      ? 'Loadable'
      : installed
        ? 'Detected'
        : 'Not Installed'
  }

  constructor () {

  }
}