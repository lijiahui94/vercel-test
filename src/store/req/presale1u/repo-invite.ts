import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'
import { method } from '@/store/method'
import { walletEvm } from '@/store/wallet-evm'

import { baseCheck } from '../helper'
import { baseUrl } from '../constants'

export type TPresale1uRepoInvite = {
  presale1uRepoInvite: () => Promise<any>
  presale1uRepoInviteBusy: boolean
}

export const presale1uRepoInvite: TPresale1uRepoInvite = {
  async presale1uRepoInvite() {
    const { presale1uRepoInviteBusy } = this
    const result = { data: {}, error: true }
    const { isLogged, info } = user
    const address = walletEvm.address.handled
    const signedMessage = method.common.getAccountLoginSignByCache()

    if (presale1uRepoInviteBusy || !walletEvm.signedIn) return result

    this.presale1uRepoInviteBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/preSell/reportInvite`,
      data: {
        address,
        signStr: signedMessage,
        signText: user.logInSignMessageText,
        inviter: view.aiwatch.invite.receivedInviteCode
      },
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.presale1uRepoInviteBusy = false

    if (result.error) return result

    return result
  },
  presale1uRepoInviteBusy: false,
}