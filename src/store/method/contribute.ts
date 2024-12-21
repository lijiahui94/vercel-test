import { message } from 'ant-design-vue'
import BN from 'bignumber.js'

import { view } from '../view'
import { user } from '../user'
import { req } from '../req'
// import { wallet } from '../wallet'
import { walletEvm } from '../wallet-evm'
import { method } from '.'
import { formatNumber, localStorage } from '@/utils'
import { constants } from '@/store/constants'
import router from '@/router'
import deSciPortfolioABI from './deSciPortfolioABI'
import USDTABI from './USDTABI'
import EMOABI from './EMOABI'

export default {
  async onInit () {
    this.handleBalanceOf()

    if (!walletEvm.connected) return

    if (!user.isLogged) {
      await method.common.autoSignLogin()
    }

  },

  async handleBalanceOf () {
    view.contribute.payPortfolio.remainingBusy = true

    const { web3, address, customNotification } = walletEvm
    const desciContractAddress = constants.contract.desciPortfolio
    const emoContractAddress = constants.contract.emo
    const emoContract = new web3.eth.Contract(EMOABI, emoContractAddress)

    const rawBalance = await emoContract.methods.balanceOf(desciContractAddress).call()

    // update
    const remaining = new BN(rawBalance).div(1e18).toString()
    view.contribute.portfolio.list[0].remaining = remaining
    view.contribute.portfolio.list[0].max = new BN(remaining).times(view.contribute.portfolio.list[0].price).toString()

    view.contribute.payPortfolio.remainingBusy = false
  },

  async handlePay() {
    const { web3, address, customNotification } = walletEvm
    const amount = +view.contribute.payPortfolio.inputAmount
    const accurate = new BN(10).pow(18)  // 1 USDT
    const eventIndex = view.contribute.payPortfolioItem.eventIndex

    if (!(amount > 0)) {
      message.error(`Purchased value anomalies`)
      return
    }

    view.contribute.payPortfolio.busy = true
    const { update, dismiss } = customNotification({
      type: 'hint',
      message: 'Please confirm the transaction within the wallet.',
      autoDismiss: 0
    })
    const fromAddress = address.handled
    const desciContractAddress = constants.contract.desciPortfolio

    try {
      const amountInWei = new BN(amount).times(accurate).toFixed(0)

      // USDT 合约
      const usdtContractAddress = constants.contract.usdt
      const usdtContract = new web3.eth.Contract(USDTABI, usdtContractAddress)
      // 查询已授权量
      const allowance = await usdtContract.methods.allowance(fromAddress, desciContractAddress).call();

      if (new BN(web3.utils.fromWei(allowance, 'wei')).gte(amountInWei)) {

      } else {
        update({
          eventCode: 'hint',
          message: `Approve ${formatNumber(amount)} USDT to Contract`,
        })

        // 授权合约转移 USDT
        await usdtContract.methods.approve(desciContractAddress, amountInWei).send({ from: fromAddress });
      }

      const nonce = await web3.eth.getTransactionCount(fromAddress)

      const deSciContract = new web3.eth.Contract(deSciPortfolioABI, desciContractAddress, {from: fromAddress})

      const _method = deSciContract.methods.payByUSDT(amountInWei, eventIndex)

      const messageData = {
        from: fromAddress,
        to: desciContractAddress,
        gasLimit: new BN(await _method.estimateGas({ from: fromAddress })).times(1.2).toFixed(0),
        nonce: web3.utils.toHex(nonce),
        data: _method.encodeABI()
      }

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

          view.contribute.payPortfolio.finished = true
          view.contribute.payPortfolio.finished = true
        })
        .on('error', (error: any) => {
          update({
            message: error.message,
            type: 'error',
            autoDismiss: 5000
          })
          view.contribute.payPortfolio.busy = false
        })
    } catch(e: any) {
      console.error(e.message || e)
      message.error(e.message || e)
      view.contribute.payPortfolio.busy = false
    }
  }
}