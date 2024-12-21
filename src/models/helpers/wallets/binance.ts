import injectedModule, { ProviderIdentityFlag } from '@web3-onboard/injected-wallets'
import { InjectedNameSpace } from '@web3-onboard/injected-wallets/dist/types'

const icon = `
<svg width="1025" height="1024" viewBox="0 0 1025 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M116.053 626.987L230.997 512L116.011 395.989L0 512L116.053 626.987Z" fill="#FCD535"/>
<path d="M709.973 428.971L512 230.997L314.027 429.995L197.973 314.027L512 0L826.027 313.003L709.973 428.971Z" fill="#FCD535"/>
<path d="M793.003 512L907.989 395.989L1024.98 512L909.013 628.011L793.003 512Z" fill="#FCD535"/>
<path d="M314.027 594.005L512 793.003L709.973 594.005L826.027 709.973L512 1024L197.973 710.016L314.027 594.005Z" fill="#FCD535"/>
<path d="M628.011 510.976L512 627.029V626.987L395.989 512L512 396.032L628.011 510.976Z" fill="#FCD535"/>
</svg>

`

export default {
  label: 'Binance Wallet',
  injectedNamespace: InjectedNameSpace.Web3,
  // !!provider && !!provider[ProviderIdentityFlag.BinanceChain]
  checkProviderIdentity: ({ provider }: { provider: any }) => true,
  getIcon: async () => icon,
  getInterface: () => ({ provider: window.BinanceChain }),
  platforms: ['desktop', 'mobile', 'tablet'],
  externalUrl: 'https://www.binance.com/en/download'
}
