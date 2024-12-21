import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '../user'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

export type TUserInfo = {
  userInfo: () => Promise<any>
  userInfoBusy: boolean
}

export const userInfo = {
  async userInfo() {
    const { userInfoBusy }  = this as TUserInfo
    const result = { data: {}, error: true }
    const { isLogged, info } = user

    if (userInfoBusy || !isLogged) return result

    this.userInfoBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/user/userInfo`,
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.userInfoBusy = false

    if (result.error) return result

    // update
    const { data } = res.data
    const twitter = data.twitterUser || { id: '', name: '', username: '', profileImageUrl: '' }
    const telegram = data.telegramUser || { firstName: '', lastName: '', username: '' }

    result.data = {
      info: {
        id: data.userId,
        createTs: data.regTime,
        invitCode: data.invitationCode,
        score: data.score,
      },
      twitter: {
        id: twitter.id,
        name: twitter.name,
        username: twitter.username,
        avatar: twitter.profileImageUrl
      },
      telegram: {
        firstName: telegram.firstName,
        lastName: telegram.lastName,
        username: telegram.username,
        avatar: telegram.headIco
      }
    }

    // sync
    merge(user, result.data)

    return result
  },
  userInfoBusy: false,
}