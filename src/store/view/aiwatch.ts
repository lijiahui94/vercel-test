import { merge } from '@/utils'

import { constants } from '@/store/constants'
import { user } from '@/store/user'

type TAiwatch = {
  openModalJunVideo: boolean
  payBusy: boolean
  invite: {
    presale1uPaid: boolean
    inviteCode: string
    readonly inviteCodeUrl: string
    receivedInviteCode: string // 收到的邀请码
    referral: number
  }
  leaderboard: {
    list: Array<any>
    last: Array<any>
    _last: Array<any>
    pagination: {
      size: number
      current: number
      total: number
      isEnd: boolean
      isFirst: boolean
      isLast: boolean
      count: number
      prev: () => void
      next: () => void
    },
    reset: () => void
  }
  tab: {
    curr: number
    list: Array<{ id: number, label: string }>
  },
  reset: () => void
}



const DEFAULTS = {
  invite: {
    presale1uPaid: false,
    inviteCode: '',
    receivedInviteCode: '',
    referral: 0,
  },
  leaderboard: {
    list: [],
    _last: [],
    pagination: {
      size: 10,
      current: 1,
      total: 0,
      isEnd: false,
    }
  }
}

const aiwatch: TAiwatch = {
  openModalJunVideo: false,
  payBusy: false,
  invite: {
    ...DEFAULTS.invite,
    get inviteCodeUrl () {
      const { inviteCode } = this
      const { app } = constants

      return `${app.url}/\ai-watch/\i-${inviteCode}`
    }
  },
  leaderboard: {
    ...DEFAULTS.leaderboard,

    // 最后请求的
    get last() {
      return this._last
    },
    set last(val) {
      const result = this._last = val

      // update
      this.list = this.list.concat(result)
    },

    pagination: {
      ...DEFAULTS.leaderboard.pagination,

      get isFirst() {
        return this.current <= 1
      },
      get isLast() {
        return this.current >= this.count
      },
      get count() {
        const { total, size } = this

        return Math.ceil(total / size || 1)
      },
      prev() {
        !this.isFirst
          && this.current--
      },
      next() {
        !this.isLast
          && this.current++
      }
    },
    reset() {
      merge(this, DEFAULTS.leaderboard)
    }
  },
  tab: {
    curr: 0,
    list: [
      { id: 0, label: 'My' },
      { id: 1, label: 'Referral Rank' }
    ]
  },
  reset() {
    merge(this, DEFAULTS)
    this.leaderboard.reset()
  }
}

export default aiwatch