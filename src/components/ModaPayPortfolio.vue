<template>
  <a-modal v-model:open="open" :width="460" :centered="true" :destroyOnClose="true" :closable="false">
    <div class="d-flex flex-column p-4 m-md-3">
      <div class="d-flex mb-4 mt-3 mt-md-2 justify-content-between align-items-center ps-2 ps-sm-1">
        <h5 class="fw-bold col">Buy <img :src="store.view.contribute.payPortfolioItem.icon" /> ${{ store.view.contribute.payPortfolioItem.symbol }}</h5>
        <div class="linker color-secondary" @click="handleClose"><iClose /></div>
      </div>
      <div class="d-flex flex-column br-4 gap-4 col mb-3">
        <template v-if="!store.view.contribute.payPortfolio.finished">
          <div class="d-flex flex-column col pb-3">
            <span class="color-secondary text-center pb-3">
              Please enter the value you wish to purchase
            </span>
            <span class="d-flex selectInput strong">
              <span class="d-flex align-items-center gap-2 p-4 col-4">
                <iUSDT class="w-24" /> <span class="fw-bold h6">USDT</span>
              </span>
              <div class="d-flex align-items-center col">
                <a-input-number autofocus :bordered="false" :decimalSeparator="0" :min="store.view.contribute.payPortfolioItem.min" :max="store.view.contribute.payPortfolioItem.max" size="small" class="col"
                  v-model:value="store.view.contribute.payPortfolio.inputAmount"
                  @change="(value: number) => {
                    if (!(value > 0)) {
                      store.view.contribute.payPortfolio.inputAmount = 1
                    }
                  }"
                   :controls="false" />
              </div>
            </span>
            <div class="to">
              <img src="../assets/view/contribute/to.png" />
            </div>
            <span class="d-flex selectInput">
              <span class="d-flex align-items-center gap-2 p-4 col-4">
                <img class="w-24" :src="store.view.contribute.payPortfolioItem.icon" /> <span class="fw-bold h6">{{ store.view.contribute.payPortfolioItem.name }}</span>
              </span>
              <div class="d-flex align-items-center col">
                <span class="amount ms-auto pe-4">{{ formatNumber(new BN(store.view.contribute.payPortfolio.inputAmount).div(store.view.contribute.payPortfolioItem.price).toString() || '-') }}</span>
              </div>
            </span>
          </div>
          <Busy :busy="store.view.contribute.payPortfolio.busy">
            <a-button @click="() => store.method.contribute.handlePay() " type="primary" class="d-flex justify-content-center align-items-center br-4 col-12">
              <span class="px-5 py-2">Pay</span>
            </a-button>
          </Busy>
        </template>
        <template v-else>
          <span class="d-flex flex-column text-center pb-3 pt-4 h6">
            <span class="color-primary mx-auto mb-2" :style="{fontSize: '100px'}">🎉</span>
            That's great<br />You've made your purchase.
          </span>
          <div class="d-flex justify-content-center mb-4">
            <span class="fw-500 hover-primary py-2 px-3 br-4" @click="() => handleAddMetamaskCoin()">Add <em class="fw-bold">${{ store.view.contribute.payPortfolioItem.symbol }}</em> to Wallet</span>
          </div>
          <a-button @click="() => handleClose() " type="primary" class="d-flex justify-content-center align-items-center br-4 col-12">
            <span class="px-5 py-2">Close</span>
          </a-button>
        </template>
      </div>
      <!-- <span class="color-secondary text-center">
        Invite friends to scan and sign up to win a total of <em class="fw-bold color-primary">$JUN</em>
      </span> -->
    </div>
    <template #footer></template>
  </a-modal>
</template>

<script setup lang="ts">
import {
  iClose,
  iUSDT,
  iCheckCircle
} from './icons'
import { formatNumber } from '@/utils'
import { ref, onMounted, watch } from 'vue'
import { store } from '@/store'
import BN from 'bignumber.js'


const open = defineModel<boolean>('open')
const value = ref<string>('');

const handleClose = () => {
  open.value = false
}
const handleAddMetamaskCoin = async () => {
  const { web3 } = store.walletEvm
  const { address, symbol, decimals } = store.view.contribute.payPortfolioItem

  try {

    await web3._provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
        },
      },
    })
    store.message.error(`${symbol} added to Wallet token list!`)
  } catch (error) {
    console.error('Failed to add token:', error);
  }
}
watch(open, (newValue, oldValue) => {
  if (newValue) {
    store.view.contribute.payPortfolio.reset()
  }
})
</script>

<style lang="scss">
.selectInput {
  border: 1px solid #0052d9;
  border-radius: 16px;
  &.strong {
    background-color: #0052d9;
    color: #fff;

    .ant-input-number {
      border: none;
      background-color: transparent;
      .ant-input-number-input {
        background-color: #0052d9;
        color: #fff;
        border: none;
      }
    }
  }

  .ant-input-number-group-addon {
    padding: 0 16px !important;
  }
  .ant-input-number-input-wrap {
    .ant-input-number-input {
      text-align: end;
      font-weight: bold;
      font-family: monospace;
      font-size: 20px;
    }
  }
  .amount {
    text-align: end;
    font-weight: bold;
    font-family: monospace;
    font-size: 20px;
  }
}
.to {
  margin-top: -10px;
  margin-bottom: -10px;
  display: flex;
  justify-content: center
}
</style>