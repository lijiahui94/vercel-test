import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

export type TUserEmotionHistory = {
  userEmotionHistory: (init?: boolean) => Promise<any>
  userEmotionHistoryBusy: boolean
}

export const userEmotionHistory = {
  async userEmotionHistory(init = false) {
    const { userEmotionHistoryBusy }  = this as TUserEmotionHistory
    const result = { data: {}, error: true }
    const { isLogged, info } = user
    const { record } = view.emotion

    if (userEmotionHistoryBusy || !isLogged) return result

    this.userEmotionHistoryBusy = true

    if (init) {
      record.reset()
    }

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/userEmotional/page`,
      data: {
        pageSize: record.pagination.size,
        pageNum: record.pagination.current
      },
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.userEmotionHistoryBusy = false

    if (result.error) return result

    // update
    const { count, records } = res.data.data
    const nowTs = ~~(Date.now() / 1000)

    result.data = {
      last: records.map((item: { id: number, emotional: string, imageUrl: string, uploadTs: number, tarotInterpretTitle: string, tarotInterpretContent: string, tarotCardId: number, direction?: number }) => {
        return {
          label: '',
          emotion: item.emotional.toLowerCase(),
          id: item.id,
          src: item.imageUrl,
          uploadTs: item.uploadTs,
          tarot: {
            id: item.tarotCardId,
            parse: item.tarotInterpretContent,
            isUpright: item.direction === 1, // 方向，但不要用这个来判断是否有效
            validated: !!item.tarotInterpretContent, // 验证
            expired: item.uploadTs + 86400 <= nowTs, // 过期
          }
        }
      }),
      pagination: {
        isEnd: records.length < record.pagination.size,
        total: count
      }
    }

    // sync
    merge(record, result.data)

    return result
  },
  userEmotionHistoryBusy: false,
}