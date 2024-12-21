<template>
  <a-modal v-model:open="open" :width="600" :closable="false" :centered="true" :maskClosable="false" class="modal-uploaded-rating">
    <div class="d-flex px-5 py-4 flex-wrap">
      <div class="col-12 mb-4">
        <h4 class="fw-bold col text-center">Successful</h4>
      </div>
      <div class="d-flex flex-column col-12 col-sm-7 justify-content-center align-items-center align-items-sm-start">
        <h4 class="fw-bold py-3">Bagged 100 $JUN</h4>
        <span class="color-secondary h6 mb-5">
          Nailed your emotion training today!  Your AI-generated daily tarot card is ready.  Share it on Twitter to unlock the answer!
        </span>
        <a :href="store.user.info.tweetShareUrl" target="_blank" class="d-flex linker text-center h6 fw-500 py-3 px-5 align-items-center me-sm-auto"
          @click="() => {
            handleCancel()
            store.method.emotion.showTarotModal()
          }">
          <iX class="me-2 color-white" />Share<iShare class="ms-3 zoom-75 color-white" />
        </a>
      </div>
      <div class="d-none d-sm-flex col-4 overflow-hidden ms-auto mb-2 ">
        <img src="/tarot/back.jpg" class="br-4 w-full" />
      </div>
    </div>
    <template #footer>
      <div class="p-2 linker" @click="handleCancel">
        <iClose class="color-white" />
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import {
  iClose,
  iX,
  iShare,
} from '../components/icons';
import { store } from '@/store';

const open = defineModel<boolean>('open')

const handleCancel = () => {
  open.value = false
};
</script>

<style lang="scss">
.ant-modal {
  &.modal-uploaded-rating {
    .ant-modal-content {
      .ant-modal-body {
        border-radius: 24px;
        overflow: hidden;
        background-color: #DFEFFE;
        > div {
          background: url('../assets/component/modal-uploaded-rating/lv1-bg.svg') no-repeat center center;
          background-size: cover;
          > div {
            &:nth-child(2) {
              > a {
                color: #fff;
                background: linear-gradient(96.92deg, #3383ED 8.03%, #77B2FF 111.85%);
                border-radius: 32px;
              }

              h4 {
                color: #004096;
              }
              > span {
                em {
                  color: #004096;
                }
              }
            }

            &:nth-child(3) {
              img {
                border: 3px solid #FFC56D;
                animation: flip-vertical-animation 2s infinite alternate;
              }
            }
          }
        }
      }
    }
    .ant-modal-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0px;

      > div {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        position:absolute;
        margin-top: 32px;
        background-color: #999999;
        border-radius: 50%;
      }
    }
  }
}
@keyframes flip-vertical-animation {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(-1);
  }
}
</style>