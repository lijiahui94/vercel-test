import { reactive } from 'vue'
import { Router } from 'vue-router'

import router from '@/router'
import { localStorage } from '@/utils'

import { constants } from './constants'
import { view } from './view'
import { method } from './method'
import { user, TUser } from './user'
import { wallet, TWallet } from './wallet'
import { walletEvm, } from './wallet-evm'
import { req, TReq } from './req'
import { appliance, TAppliance } from './appliance'

// Wallet Solana
// listen
// wallet.afterAccountChanged = async () => {
//   user.changed()

//   switch(router.currentRoute.value.name) {
//     case 'InviteLink':
//     case 'Emotion':
//       view.emotion.record.reset() // TODO 页码重置？
//       break
//     case 'AIWatch':
//       await view.aiwatch.reset()
//       break
//     default:
//   }
// }

// wallet.afterDisconnect = async () => {
//   method.common.baseLogOut(true)
// }

// wallet.afterUpdateSignedIn = async () => {
//   // NOTE: 由钱包触发时，router.currentRoute.value.name 可能为 undefined
//   if (!router.currentRoute.value.name) return

//   switch(router.currentRoute.value.name) {
//     case 'InviteLink':
//     case 'Emotion':
//       await method.emotion.onInit()
//       break
//     case 'Earn':
//       await method.accountReward.onInit()
//       break
//     case 'AIWatch':
//       await method.aiwatch.onInit()
//       break
//     default:
//       await method.common.onInit()
//   }
// }

// Wallet Evm
const CACHE_WALLET_ADDRESS = '__Global_Wallet_Address'
// init reset
localStorage.remove(CACHE_WALLET_ADDRESS)

walletEvm.eventValidatedAddress = async () => {
  const { address, name } = walletEvm

  const cacheAddress = localStorage.get(CACHE_WALLET_ADDRESS)

  switch (router.currentRoute.value.name) {
    default:
  }

  if ((address.handled && address.handled !== cacheAddress)) {
    // sync
    localStorage.set(CACHE_WALLET_ADDRESS, address.handled)

    switch(router.currentRoute.value.name) {
      case 'InviteLink':
      case 'Emotion':
        await method.emotion.onInit()
        break
      case 'Earn':
        await method.accountReward.onInit()
        break
      case 'AIWatch':
      case 'AIWatchWithCode':
        view.aiwatch.reset()
        await method.aiwatch.onInit()
        break
      default:
        await method.common.onInit()
    }
  }
}

export type TStore = {
  view: any
  method: any
  router: Router
  constants: any
  message: any | null,
  user: TUser
  wallet: TWallet,
  walletEvm: any
  req: TReq
  appliance: TAppliance
}

export const store: TStore = {
  view,
  method,
  router,
  constants,
  message: null,
  user,
  wallet,
  walletEvm,
  req,
  appliance
}