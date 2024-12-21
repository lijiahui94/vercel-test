import { view } from '../view'
import { user } from '../user'
import { req } from '../req'
import { wallet } from '../wallet'
import { method } from '../method'

export default {
  async onInit () {
    if (!(wallet.connected && wallet.signedIn)) return

    if (!user.isLogged) {
      await method.common.autoSignLogin()
      // method.common.onShareTweet()
    }

    await req.userDailyTask()
    await req.userInvitations(true)
  },

  onModalClaimWeekRewards () {
    // TODO: 先 busy ，获取数据
    // 
    view.accountReward.claimWeekRewards.open = true
  },


}