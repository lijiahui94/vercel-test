<template>
  <a-modal v-model:open="open" :width="360" destroyOnClose :centered="true" :maskClosable="true" :closable="false"
    wrapClassName="modal-video">
    <div class="d-flex flex-column overflow-hidden br-4">
      <video controls ref='junVideo' autoplay>
        <source src="/video/160157.mp4" type="video/mp4">
      </video>
    </div>
    <template #footer></template>
  </a-modal>
</template>

<script setup lang="ts">
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { ref, defineProps } from 'vue';
import { iClose } from './icons';
import { store } from '@/store';

const props = defineProps({
})
const junVideo = ref(null);

const open = defineModel<boolean>('open')

const handleClose = () => {
  open.value = false
}


</script>

<style lang="scss">
.ant-modal-wrap {
  &.modal-video {
    .ant-modal-content {
      
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