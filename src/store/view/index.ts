import { reactive } from 'vue'

import emotion from './emotion'
import header from './header'
import accountReward from './accountReward'
import aiwatch from './aiwatch'
import contribute from './contribute'

export const view = reactive({
  emotion,
  header,
  accountReward,
  aiwatch,
  contribute
})