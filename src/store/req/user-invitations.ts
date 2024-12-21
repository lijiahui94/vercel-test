



import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'

import { baseCheck } from './helper'
import { baseUrl } from './constants'

export type TUserInvitations = {
  userInvitations: (init?: boolean) => Promise<any>
  userInvitationsBusy: boolean
}

export const userInvitations = {
  async userInvitations(init = false) {
    const { userInvitationsBusy }  = this as TUserInvitations
    const result = { data: {}, error: true }
    const { isLogged, info } = user
    const { inviteRecord } = view.accountReward

    if (userInvitationsBusy || !isLogged) return result

    this.userInvitationsBusy = true

    if (init) {
      inviteRecord.reset()
    }

    const res = await axios({
      method: 'post',
      url: `${baseUrl}/invitation/page`,
      data: {
        pageSize: inviteRecord.pagination.size,
        pageNum: inviteRecord.pagination.current
      },
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.userInvitationsBusy = false

    if (result.error) return result

    // update
    const { count, records } = res.data.data

    result.data = {
      last: records.map((item: { address: string, receiveScore: string, regTs: number, status: string }) => {
        return {
          address: item.address,
          score: item.receiveScore,
          createTs: item.regTs,
          status: item.status,
          finished: item.status === 'finish'
        }
      }),
      pagination: {
        isEnd: records.length < inviteRecord.pagination.size,
        total: count
      }
    }

    // sync
    merge(inviteRecord, result.data)

    return result
  },
  userInvitationsBusy: false,
}