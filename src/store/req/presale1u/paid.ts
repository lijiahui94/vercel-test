import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'
import { method } from '@/store/method'
import { constants } from '@/store/constants'
import { walletEvm } from '@/store/wallet-evm'

import { baseCheck } from '../helper'
import { baseUrl } from '../constants'

export type TPresale1uPaid = {
  presale1uPaid: () => Promise<any>
  presale1uPaidBusy: boolean
}

export const presale1uPaid: TPresale1uPaid = {
  async presale1uPaid() {
    const { presale1uPaidBusy } = this
    const result = { data: {}, error: true }
    const { isLogged, info } = user
    const address = walletEvm.address.handled

    let cache = localStorage.get(constants.storageKey.PAIDS) as Array<string> || []
    if (cache.includes(address)) {
      view.aiwatch.invite.presale1uPaid = true
    }

    if (presale1uPaidBusy || !walletEvm.signedIn) return result

    this.presale1uPaidBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/preSell/queryPayed`,
      data: {
        address,
      },
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.presale1uPaidBusy = false

    if (result.error) return result

    // update
    const { data } = res.data

    result.data = {
      invite: {
        presale1uPaid: data.result
      }
    }

    merge(view.aiwatch, result.data)

    return result
  },
  presale1uPaidBusy: false,
}