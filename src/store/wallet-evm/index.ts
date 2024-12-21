import { constants } from '@/store/constants'
import ModelInitWallet from '../../models/helpers/init-wallet'

export const walletEvm = ModelInitWallet.create({
  infuraKey: constants.app.infuraKey,
  supportedWallets: [
    'metamask',
    // 'bitKeep',
    'okx',
    // 'tokenPocket',
    'walletConnect',
    // 'trezor',
    // 'ledger',
    // 'trust',
    // 'imToken',
    // 'coinbase',
    'status',
    // 'meetone',
  ],
})

