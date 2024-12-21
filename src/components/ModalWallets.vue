<template>
  <a-modal v-model:open="open" :width="360" :centered="true" :maskClosable="true" :closable="false"
    wrapClassName="modal-wallets">
    <div class="d-flex flex-column p-3 p-sm-4">
      <div class="d-flex mb-4 mt-3 mt-md-2 justify-content-between align-items-center ps-2 ps-sm-1">
        <h5 class="fw-500 col color-white">Connect a wallet on Solana</h5>
        <div class="linker color-white" @click="handleClose"><iClose /></div>
      </div>
      <ul class="br-3 bg-white">
        <li class="p-3 m-2 br-3 pointer"
          v-for="(item) in Object.values(store.wallet.wallets).filter(item => !item.unsupported)" :key="`wallet-${item.id}`"
          :class="{ 'curr': item.id === store.wallet.id }"
          @click="() => {
            if (item.installed) {
              store.method.common.onConnectLogIn({ walletId: item.id })
              handleClose()
            } else {
              item.installation()
            }
          }">
          <div class="d-flex align-items-center flex-wrap">
            <div class="br-2 me-3" :class="{ 'bg-primary color-white': true }"><img :src="item.icon" class="w-40" /></div>
            <span class="h6 fw-bold">{{ item.name }}</span>
            <small class="fw-500 ms-auto color-secondary pe-1">{{ item.readyStateView }}</small>
          </div>
        </li>
      </ul>
    </div>
    <template #footer></template>
  </a-modal>
</template>

<script setup lang="ts">
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { ref, defineProps } from 'vue';
import { iClose } from '../components/icons';
import { store } from '@/store';

const open = defineModel<boolean>('open')

const handleClose = () => {
  open.value = false
}

</script>

<style lang="scss">
.ant-modal-wrap {
  &.modal-wallets {
    .ant-modal-content {
      background-color: rgb(0, 82, 217);

      .ant-modal-body {
        ul {
          li {
            transition: all 0.3s;
            color: rgb(0, 82, 217);
            &:hover,
            &.curr {
              background-color: #3C80F1;
              color: #fff;
              small {
                color: #f0f0f0;
              }
            }
          }
        }
      }
    }
  }
}

</style>