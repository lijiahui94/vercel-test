import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

export type TUserEmotionAdd = {
  userEmotionAdd: () => Promise<any>
  userEmotionAddBusy: boolean
}

export const userEmotionAdd = {
  async userEmotionAdd() {
    const { userEmotionAddBusy }  = this as TUserEmotionAdd
    const result = { data: {}, error: true }
    const { isLogged, info } = user
    const { tarot, upload } = view.emotion

    if (userEmotionAddBusy || !isLogged) return result

    this.userEmotionAddBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/userEmotional/add`,
      data: {
        imageUrl: upload.cloudPhotoUrl,
        emotional: upload.cloudPhotoEmotion
      },
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.userEmotionAddBusy = false

    if (result.error) return result

    // update
    const { data } = res.data
    result.data = {
      curr: {
        // id: data.tarotCardId,
        emotionId: data.id,
      }
    }

    // sync
    tarot.reset() // 避免 tarot 由其他地方来的内容
    merge(tarot, result.data)

    return result
  },
  userEmotionAddBusy: false,
}