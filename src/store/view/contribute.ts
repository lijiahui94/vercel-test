import { merge } from '@/utils'

import { constants } from '@/store/constants'
import { user } from '@/store/user'

import IEmoDAO from '@/assets/coin/emoDAO.png'
import { finished } from 'stream'

type TContribute = {
  payPortfolio: {
    remainingBusy: boolean
    idx: number
    open: boolean
    inputAmount: string
    busy: boolean
    finished: boolean

    reset: () => void
  }
  readonly payPortfolioItem: any
  portfolio: {
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
  reset: () => void
}

const DEFAULTS_PAY_PORTFOLIO = {
  inputAmount: '1',
  busy: false,
  finished: false
}
const DEFAULTS = {
  payPortfolio: {
    remainingBusy: false,
    idx: 0,
    open: false,
    ...DEFAULTS_PAY_PORTFOLIO
  },
  portfolio: {
    list: [
      { eventIndex: 1, name: 'emoDAO', min: 1, max: 80000, symbol: 'EMO', amount: '200000000', price: '0.0004', icon: IEmoDAO, remaining: '0', address: constants.contract.emo, decimals: 18 },
    ],
    _last: [],
    pagination: {
      size: 10,
      current: 1,
      total: 0,
      isEnd: false,
    }
  }
}

const contribute: TContribute = {
  payPortfolio: {
    ...DEFAULTS.payPortfolio,
    reset() {
      merge(this, DEFAULTS_PAY_PORTFOLIO)
    }
  },
  get payPortfolioItem () {
    const { payPortfolio, portfolio } = this

    return portfolio.list[payPortfolio.idx]
  },
  portfolio: {
    ...DEFAULTS.portfolio,

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
      ...DEFAULTS.portfolio.pagination,

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
      merge(this, DEFAULTS.portfolio)
    }
  },
  reset() {
    merge(this, DEFAULTS)
    this.portfolio.reset()
  }
}

export default contribute