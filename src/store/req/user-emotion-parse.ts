


import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

export type TUserEmotionParse = {
  userEmotionParse: () => Promise<any>
  userEmotionParseBusy: boolean
}

export const userEmotionParse = {
  async userEmotionParse() {
    const { userEmotionParseBusy }  = this as TUserEmotionParse
    const result = { data: {}, error: true }
    const { isLogged, info } = user
    const { tarot } = view.emotion

    if (userEmotionParseBusy || !isLogged) return result

    this.userEmotionParseBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/userEmotional/shareFinish`,
      data: {
        emotionalId: tarot.curr.emotionId,
        tweetUrl: tarot.curr.tweetUrl
      },
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.userEmotionParseBusy = false

    if (result.error) return result

    // update
    const { data } = res.data

    const nowTs = ~~(Date.now() / 1000)
    result.data = {
      isUpright: data.direction === 1,
      id: data.tarotCardId,
      parse: data.tarotInterpretContent,
      ts: data.uploadTs,
      validated: !!data.tarotInterpretContent,
      expired: data.uploadTs + 86400 <= nowTs
    }

    // sync
    merge(tarot.curr, result.data)

    return result
  },
  userEmotionParseBusy: false,
}