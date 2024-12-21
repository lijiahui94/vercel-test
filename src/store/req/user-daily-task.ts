



import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

export type TUserDailyTask = {
  userDailyTask: (init?: boolean) => Promise<any>
  userDailyTaskBusy: boolean
}

const TASK_TYPES: Record<string, { volume: string, notes: string }> = {
  checkin: {
    volume: '20',
    notes: 'checkin'
  },
  uploadEmotional: {
    volume: '10',
    notes: 'uploadEmotional'
  }
}

export const userDailyTask = {
  async userDailyTask(init = false) {
    const { userDailyTaskBusy }  = this as TUserDailyTask
    const result = { data: {}, error: true }
    const { isLogged, info } = user
    const { task } = view.accountReward

    if (userDailyTaskBusy || !isLogged) return result

    this.userDailyTaskBusy = true

    if (init) {
      task.reset()
    }

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/user/dailyTask`,
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.userDailyTaskBusy = false

    if (result.error) return result

    // update
    const { record } = res.data.data

    result.data = {
      dailyList: record.map((item: { type: string, status: string }, idx: number) => {
        const taskType = TASK_TYPES[item.type]

        return {
          id: idx,
          type: item.type,
          symbol: 'JUN',
          volume: taskType.volume || '0',
          notes: taskType.notes || '',
          status: item.status,
          finished: item.status === 'finish'
        }
      })
    }

    // sync
    merge(task, result.data)

    return result
  },
  userDailyTaskBusy: false,
}