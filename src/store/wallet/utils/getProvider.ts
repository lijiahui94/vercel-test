import { ProviderMix } from '../types';

// XXX: 要放到 wallets 内
export const getProvider = (): ProviderMix | null => {
  if ('phantom' in window) {
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }
  // TODO: 要支持app 拉起
  window.open('https://phantom.app/', '_blank')

  return null
};
