



import axios from 'axios'

import { merge, localStorage } from '@/utils'

import { user } from '@/store/user'
import { view } from '@/store/view'
import { walletEvm } from '@/store/wallet-evm'
import { baseCheck } from '../helper'
import { baseUrl } from '../constants'

export type TPresale1uLeaderboard = {
  presale1uLeaderboard: (init?: boolean) => Promise<any>
  presale1uLeaderboardBusy: boolean
}

export const presale1uLeaderboard: TPresale1uLeaderboard = {
  async presale1uLeaderboard(init = false) {
    const { presale1uLeaderboardBusy }  = this
    const result = { data: {}, error: true }
    const { isLogged, info } = user
    const { leaderboard } = view.aiwatch

    if (presale1uLeaderboardBusy || !walletEvm.signedIn) return result

    this.presale1uLeaderboardBusy = true

    if (init) {
      leaderboard.reset()
    }

    let path = ''
    let param: { pageSize: number, pageNum: number, address?: string } = {
      pageSize: leaderboard.pagination.size,
      pageNum: leaderboard.pagination.current
    }
    switch(view.aiwatch.tab.curr) {
      case 0:
        path = '/preSell/myInvitePage'
        param.address = walletEvm.address.handled
        break
      case 1:
        path = '/preSell/invitePage'
        break
      default:
    }

    const res = await axios({
      method: 'post',
      url: `${baseUrl}${path}`,
      data: param,
      headers: {
        'Access-Token': info.session,
      }
    })

    result.error = baseCheck(res)
    this.presale1uLeaderboardBusy = false

    if (result.error) return result

    // update
    const { count, records, myInviteScore } = res.data.data

    result.data = {
      last: records.map((item: { address: string, score?: string, payTime: Date }) => {
        return {
          address: item.address,
          score: item.score,
          createTs: new Date(item.payTime).getTime() / 1000,
        }
      }),
      pagination: {
        isEnd: records.length < leaderboard.pagination.size,
        total: count
      }
    }

    switch(view.aiwatch.tab.curr) {
      case 0:
        merge(view.aiwatch.invite, {
          referral: myInviteScore,
          inviteCode: walletEvm.address.handled.slice(-8)
        })
        break
      default:
    }

    // sync
    merge(leaderboard, result.data)

    return result
  },
  presale1uLeaderboardBusy: false,
}