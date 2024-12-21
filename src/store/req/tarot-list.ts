

import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'
import { constants } from '@/store/constants'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

type TarotListResult = {
  data: Record<number, { id: number, name: string }>,
  error: boolean
}

export type TTarotList = {
  tarotList: () => Promise<TarotListResult>
  tarotListBusy: boolean
}

export const tarotList = {
  async tarotList() {
    const { tarotListBusy }  = this as TTarotList
    const result: TarotListResult = { data: {}, error: true }
    const { isLogged, info } = user
    const { tarot } = view.emotion

    if (tarotListBusy || !isLogged) return result

    const { TAROT_LIST } = constants.cacheKey
    const cache: Array<{id: number, name: string}> = localStorage.get(TAROT_LIST) as any

    const sync = (data: Array<any> = [], save: boolean = false) => {
      data.forEach((item) => {
        result.data[item.id] = { id: item.id, name: item.name}
      })

      // sync
      tarot.catalogs = result.data

      if (save) {
        localStorage.set(TAROT_LIST, data.map(item => ({ id: item.id, name: item.name })))
      }

      return result
    }

    if (Array.isArray(cache) && cache.length) {
      return sync(cache)
    }

    this.tarotListBusy = true

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/userEmotional/tarotCard`,
      data: {},
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.tarotListBusy = false

    if (result.error) return result

    // update
    const { data } = res.data

    return sync(data.items, true)
  },
  tarotListBusy: false,
}