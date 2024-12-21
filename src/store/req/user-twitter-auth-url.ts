import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '../user'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

export type TUserTwitterAuthUrl = {
  userTwitterAuthUrl: () => Promise<any>
  userTwitterAuthUrlBusy: boolean
}

export const userTwitterAuthUrl = {
  async userTwitterAuthUrl() {
    const { userTwitterAuthUrlBusy }  = this as TUserTwitterAuthUrl
    const result = { data: {}, error: true }
    const { isLogged, info } = user

    if (userTwitterAuthUrlBusy || !isLogged) return result

    this.userTwitterAuthUrlBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/user/twitterAuthUrl`,
      data: {
        callback: location.href
      },
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.userTwitterAuthUrlBusy = false

    if (result.error) return result

    // update
    const { data } = res.data

    result.data = {
      authUrl: data.authUrl
    }

    return result
  },
  userTwitterAuthUrlBusy: false,
}