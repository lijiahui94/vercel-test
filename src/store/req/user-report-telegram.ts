import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '../user'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

type TParams = {
  id: string
  username: string
  firstName: string
  lastName: string
  avatar: string
  authDate: number
  hash: string
}

export type TUserReportTelegram = {
  userReportTelegram: (args: TParams) => Promise<any>
  userReportTelegramBusy: boolean
}

export const userReportTelegram = {
  async userReportTelegram(args: TParams) {
    const { userReportTelegramBusy }  = this as TUserReportTelegram
    const result = { data: {}, error: true }
    const { isLogged, info, telegram } = user

    if (userReportTelegramBusy || !isLogged) return result

    this.userReportTelegramBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/user/reportTelegramInfo`,
      data: {
        id: args.id,
        first_name: args.firstName || '',
        last_name: args.lastName || '',
        username: args.username,
        auth_date: args.authDate,
        hash: args.hash,
        photo_url: args.avatar || ''
      },
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.userReportTelegramBusy = false

    if (result.error) return result

    // update
    const { data } = res.data

    result.data = args

    merge(telegram, result.data)

    return result
  },
  userReportTelegramBusy: false,
}