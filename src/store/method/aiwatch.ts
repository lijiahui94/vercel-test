import { view } from '../view'
import { user } from '../user'
import { req } from '../req'
// import { wallet } from '../wallet'
import { walletEvm } from '../wallet-evm'
import { method } from '../method'
import { localStorage } from '@/utils'
import { constants } from '@/store/constants'
import router from '@/router'
import USDTABI from './USDTABI'

export default {
  async onInit () {
    // update
    view.aiwatch.invite.receivedInviteCode = router.currentRoute.value.params?.code as string ?? ''

    if (!walletEvm.connected) return

    if (!user.isLogged) {
      await method.common.autoSignLogin()
    }

    req.presale1uRepoInvite()
    await req.presale1uPaid()
    await req.presale1uLeaderboard(true)
  },

  async handleTabLeaderboard(id: number) {
    if (view.aiwatch.tab.curr === id) return

    // update
    view.aiwatch.tab.curr = id
    view.aiwatch.leaderboard.reset()
    await req.presale1uLeaderboard(true)
  },

  async handlePayPresale1u () {
    const { web3, address, customNotification } = walletEvm
    const amount = 1 // usdt 数量（不考虑精度）
    const accurate = 10**18  // 1 USDT

    view.aiwatch.payBusy = true
    const { update, dismiss } = customNotification({
      type: 'hint',
      message: 'Please confirm the transaction within the wallet.',
      autoDismiss: 0
    })
    const fromAddress = address.handled
    const toAddress = constants.contract.presale1u
    const usdtContractAddress = constants.contract.usdt

    try {
      const nonce = await web3.eth.getTransactionCount(fromAddress)

      const usdtContract = new web3.eth.Contract(USDTABI, usdtContractAddress, {from: fromAddress})
      const amountInWei = web3.utils.toBN(amount * accurate)

      const messageData = {
        from: fromAddress,
        to: usdtContractAddress,
        gasLimit: web3.utils.toHex(210000),
        // nonce: web3.utils.toHex(nonce),
        data: usdtContract.methods.transfer(toAddress, amountInWei).encodeABI()
      };

      await web3.eth.sendTransaction(messageData)
        .on('sent', (payload: any) => { })
        .on('sending', (payload: any) => { })
        .on('transactionHash', (txHash: any) => {
          update({
            eventCode: 'dbUpdateSuccess',
            message: `Tx has been sent and is awaiting block confirmation...`,
            type: 'pending',
            autoDismiss: 0
          })
        })
        .on('receipt', (receipt: any) => {
          update({
            eventCode: 'dbUpdateSuccess',
            message: 'The transaction has been completed.',
            type: 'success',
            autoDismiss: 5000
          })

          view.aiwatch.payBusy = false
          view.aiwatch.invite.presale1uPaid = true
          let cache = localStorage.get(constants.storageKey.PAIDS) as Array<string> || []
          cache.push(fromAddress)
          localStorage.set(constants.storageKey.PAIDS, cache)

          req.presale1uPaid()
        })
        .on('error', (error: any) => {
          update({
            message: error.message,
            type: 'error',
            autoDismiss: 5000
          })
          view.aiwatch.payBusy = false
        })
    } catch(e) {
      console.error(e)
      view.aiwatch.payBusy = false
    }
  }
}