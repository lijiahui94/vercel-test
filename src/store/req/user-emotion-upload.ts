import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '../user'
import { wallet } from '../wallet'
import { view } from '../view'

import { baseUrl } from './constants'
import { baseCheck } from './helper'

export type TUserEmotionUpload = {
  userEmotionUploadUrl: string
  userEmotionUpload: (formData: FormData) => Promise<any>
  userEmotionUploadBusy: boolean
}

export const userEmotionUpload = {
  userEmotionUploadUrl: `${baseUrl}/misc/uploadFace`,
  async userEmotionUpload(formData: FormData) {
    const { userEmotionUploadBusy, userEmotionUploadUrl }  = this as TUserEmotionUpload
    const result = { data: {}, error: true }
    const { upload } = view.emotion
    const { isLogged, info } = user

    if (userEmotionUploadBusy || !isLogged) return result

    this.userEmotionUploadBusy = true

    const res = await axios({
      method: 'post',
      url: userEmotionUploadUrl,
      data: formData,
      headers: {
        'Access-Token': info.session,
        'max-age': 6000,
        'Content-Type': 'multipart/form-data'
      }
    })

    result.error = baseCheck(res)
    this.userEmotionUploadBusy = false

    if (result.error) return result

    // update
    const { data } = res.data

    result.data = {
      cloudPhotoEmotion: data.emotion.toLowerCase(),
      cloudPhotoUrl: data.url,
      done: true
    }

    // sync
    merge(upload, result.data)

    return result
  },
  userEmotionUploadBusy: false,
}