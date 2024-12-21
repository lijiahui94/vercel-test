import { merge } from '@/utils'

import { constants } from '@/store/constants'
import { user } from '@/store/user'

type TAccountReward = {
  claimWeekRewards: {
    open: boolean
    value: number
    _list: Array<{ id: number, volume: string, status: number }>
    readonly list: Array<{ id: number, volume: string, skipped: boolean, claime: boolean, claimed: boolean, freeze: boolean, label: string }>
    readonly hasList: boolean
  }
  invite: {
    readonly code: string
    qrCodeOpen: boolean
    readonly qrCodeValue: string
  }
  inviteRecord: {
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
  task: {
    noviceList: Array<{
      id: string
      volume: string
      symbol: string
      notes: string
      finished: boolean
    }>
    dailyList: Array<{
      id: string
      volume: string
      symbol: string
      notes: string
      finished: boolean
    }>
    reset: () => void
  }
  reset: () => void
}

const DEFAULTS = {
  claimWeekRewards: {
    open: false,
    value: 1,
    _list: []
  },
  invite: {
    qrCodeOpen: false,
    record: {
      list: [],
      _last: [],
      pagination: {
        size: 10,
        current: 1,
        total: 0,
        isEnd: false,
      }
    }
  },
  inviteRecord: {
    list: [],
    _last: [],
    pagination: {
      size: 9,
      current: 1,
      total: 0,
      isEnd: false,
    }
  },
  task: {
    noviceList: [],
    dailyList: [],
  }
}

const accountReward: TAccountReward = {
  claimWeekRewards: {
    ...DEFAULTS.claimWeekRewards,

    get list () {
      const { _list, value } = this
      const labels: { [id: number]: string } = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday'
      }

      return _list.map(item => ({
        id: item.id, // 1~7
        volume: item.volume,
        skipped: item.status === 1, // 已被忽略、跳过
        claimed: item.status === 2, // 已被领取
        claime: item.status === 3 && value === item.id, // 当前，且可领取
        freeze: item.status === 3 && value < item.id, // 超过当天的可领取，未不可领取
        label: labels[item.id]
      }))
    },
    get hasList () {
      const { _list } = this

      return !!_list.length
    }
  },

  invite: {
    ...DEFAULTS.invite,
    get code () {
      const { invitCode } = user.info

      return invitCode
    },
    get qrCodeValue () {
      const { code } = this
      const { app } = constants

      return `${app.url}/\i-${code}`
    }
  },
  inviteRecord: {
    ...DEFAULTS.inviteRecord,

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
      ...DEFAULTS.inviteRecord.pagination,

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
      merge(this, DEFAULTS.inviteRecord)
    }
  },
  tab: {
    curr: 0,
    list: [
      { id: 0, label: 'Tasks' },
      { id: 1, label: 'Invite' }
    ]
  },
  task: {
    ...DEFAULTS.task,
    reset() {
      merge(this, DEFAULTS.task)
    }
  },
  reset() {
    merge(this, DEFAULTS)
    this.inviteRecord.reset()
    this.task.reset()
  }
}

// #TEST
accountReward.claimWeekRewards.value = 3
accountReward.claimWeekRewards._list = [
  { id: 1, volume: '100', status: 1 },
  { id: 2, volume: '200', status: 2 },
  { id: 3, volume: '300', status: 3 },
  { id: 4, volume: '400', status: 3 },
  { id: 5, volume: '500', status: 3 },
  { id: 6, volume: '600', status: 3 },
  { id: 7, volume: '700', status: 3 }
]

// accountReward.task.noviceList = [
//   { id: '1', volume: '20', symbol: 'JUN', notes: 'Favorite to follow official tweets for new users only.Favorite to follow official tweets for new users only.', finished: true },
//   { id: '1', volume: '120', symbol: 'JUN', notes: 'Favorite to follow official tweets for new users only.', finished: true },
//   { id: '1', volume: '300', symbol: 'JUN', notes: 'Favorite to follow official tweets for new users only.', finished: true },
//   { id: '1', volume: '40', symbol: 'JUN', notes: 'Favorite to follow official tweets for new users only.', finished: false },
//   { id: '1', volume: '60', symbol: 'JUN', notes: 'Favorite to follow official tweets for new users only.', finished: false },
//   { id: '1', volume: '90', symbol: 'JUN', notes: 'Favorite to follow official tweets for new users only.', finished: false },
//   { id: '1', volume: '20', symbol: 'JUN', notes: 'Favorite to follow official tweets for new users only.', finished: false },
// ]

export default accountReward