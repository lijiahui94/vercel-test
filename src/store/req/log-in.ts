import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '../user'
// import { wallet } from '../wallet'
import { walletEvm } from '../wallet-evm'
import { constants } from '@/store/constants'
import { method } from '@/store/method'
import { baseCheck } from './helper'
import { baseUrl } from './constants'

export type TLogIn = {
  logIn: () => Promise<any>
  logInBusy: boolean
}

export const logIn = {
  async logIn() {
    const { logInBusy }  = this as TLogIn
    const result = { data: {}, error: true }
    const address = walletEvm.address.handled
    const signedMessage = method.common.getAccountLoginSignByCache()

    if (logInBusy || !signedMessage) return result

    this.logInBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/user/login`,
      data: {
        address,
        signStr: signedMessage,
        signText: user.logInSignMessageText,
        invitationCode: user.param.invitCode
      }
    })

    result.error = baseCheck(res)
    this.logInBusy = false

    if (result.error) {
      method.common.baseLogOut()
      return
    }

    // update
    const { data } = res.data
    result.data = {
      createTs: data.regTime,
      session: data.token,
      id: data.userId
    }

    // sync
    merge(user.info, result.data)

    return result
  },
  logInBusy: false,
}