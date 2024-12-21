import { reactive } from 'vue'

import { merge, formatNumber } from '@/utils'
import { constants } from '../constants'

export type TUser = {
  info: {
    createTs: number
    session: string
    id: number
    invitCode: string
    score: string
    readonly scoreView: string
    tweetShareUrl: string
    signature: string
  }
  twitter: {
    id: string
    name: string
    username: string
    avatar: string
    readonly has: boolean
  }
  telegram: {
    id: string
    username: string
    firstName: string
    lastName: string
    avatar: string
    authDate: number
    hash: string
    readonly has: boolean
  },
  accountCenter: {
    open: boolean
  }
  readonly isLogged: boolean
  param: {
    invitCode: string
  }
  readonly logInSignMessageText: string
  changed: () => void
  reset: () => void
}

const DEFAULTS = {
  info: {
    createTs: 0,
    session: '',
    id: -1,
    invitCode: '',
    score: '0',
    tweetShareUrl: '',
    signature: ''
  },
  twitter: {
    id: '',
    name: '',
    username: '',
    avatar: ''
  },
  telegram: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    avatar: '',
    authDate: 0,
    hash: ''
  },
  accountCenter: {
    open: false
  },
  param: {
    invitCode: ''
  },
}

export const user: TUser = reactive({
  info: {
    ...DEFAULTS.info,
    get scoreView () {
      const { score } = this

      return +score >= 0 ? formatNumber(score) : '-'
    }
  },
  get isLogged () {
    const { session } = this.info

    return !!session
  },
  twitter: {
    ...DEFAULTS.twitter,
    get has () {
      const { username } = this

      return !!username
    }
  },
  telegram: {
    ...DEFAULTS.telegram,
    get has () {
      const { username } = this

      return !!username
    }
  },
  accountCenter: {
    ...DEFAULTS.accountCenter
  },
  param: {
    ...DEFAULTS.param,
  },
  get logInSignMessageText () {
    return constants.user.logInSignMessageText
  },
  // NOTE: 账号被切换时的操作
  changed () {
    this.info.session = ''
  },
  reset () {
    merge(this, DEFAULTS)
  }
})