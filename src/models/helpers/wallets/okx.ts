import injectedModule, { ProviderIdentityFlag } from '@web3-onboard/injected-wallets'
import { InjectedNameSpace } from '@web3-onboard/injected-wallets/dist/types'

const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACcUlEQVRoge2ZvY7aQBDHx5atNVoju6JxQyRwAwgXLigsszzBKU+QvAk8SvIEiZ8AX0eH09KEFFDQnBGcMLbRpgpKwoeXk4/16fyTphvPzn+93tF4BDgDIURP0/RTmqbWbrezoijSKaX1c76vhSzLc0ppWK1W5wih73EcP04mk3nmg67rDhuNxpOmaRQACmEYY2qaJnVdd3gxcUJI3bbtKcaYe8KXTFEUatv2tNfrnZ4G27anCCHuSbKK+Cd513WHbyH5P4Yxpo7jjAAABEJIfblc/pzNZidvpcg0m83QMIwP4uFwIIvFgnc+N7NarfQkST6LcRw/PD8/887nZtbrNaRp2hW32+1d7/c8iaLIkgBAZ3G2LAt0/bqr7/tMC+cVa7/f62CaZuZXTwihLFiWdddYpmlSkWnLGMna1deIlasAHpQCeFMK4M37EBCGYW4L5hkLAEBicQqCAAaDwVWfMAyh3+/DcHi5aQIA8DyPKVYQBCypAVMlZrXxeJxZYcfjcW7r5V6JeVAK4E0pgDelAN4wFTIAtjbQ87zMOJ7n5dqeli3l35Qt5QsoBfCmFMCb9yGg0C2lKIpzALj6h5q1pWRpA/OMJcvyHLrd7hQKMDZ6ibVaramIEPqRKbWgqKr6S5RlOdA0jXcuN4MxBoTQN1GW5S+1Wi3fL+sOGIYBcRw/AgCA4zijIg+4/zdFUY5j1iNvddB9rAOqqn7sdDoBQuj8OysAGGNot9uBqqqX72HHcUamadIiHSlN02ij0Xg6OTYAIJwTQQipHw4HEsfxw2azqQuCoCdJctdxrCAIc0VRwkqlEkiSFEiS9NX3/ZPL5jdzIS3Sk/pMJgAAAABJRU5ErkJggg=='

export const okxEqual = {
  label: 'OKX Wallet',
  injectedNamespace: InjectedNameSpace.Web3,
  // !!provider && !!provider[ProviderIdentityFlag.OKXWallet]
  checkProviderIdentity: () => true,
  getIcon: async () => icon,
  getInterface: () => ({ provider: window.okexchain }),
  platforms: ['desktop', 'mobile', 'tablet'],
  externalUrl: 'https://www.okx.com/web3'
}
