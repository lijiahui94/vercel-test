<template>
  <a-modal v-model:open="open" :centered="true" :maskClosable="false" :closable="false">
    <div class="d-flex flex-column p-4 m-md-3">
      <div class="d-flex mb-3 mb-md-4 gap-4 justify-content-between align-items-center">
        <h4 class="fw-bold col">Warm reminder</h4>
        <div class="linker color-secondary" @click="handleClose"><iClose /></div>
      </div>
      <span class="color-secondary h6 mb-3 mb-md-4">
        Welcome to JUNLALA's "Creation Center" for creation. We will conduct relevant technical training for AI emotions based on the images you upload. We will not outsource your information, please rest assured. Of course, in order to protect the legal rights and interests of both parties. Please read, understand, and agree to accept the "<a href="###" target="_blank">JUNLALA AI Privacy Agreement</a>". Your click on "Agree" is regarded as acceptance and recognition of the content of the agreement, and the agreement takes effect immediately.
      </span>
      <div class="d-flex flex-wrap gap-3">
        <a-button class="col" @click="handleClose">Cancel</a-button>
        <a-button class="col" type="primary">Agree</a-button>
      </div>
    </div>
    <template #footer></template>
  </a-modal>
</template>

<script setup lang="ts">
import {
  iClose,
} from '../components/icons'
import { ref } from 'vue';

const open = defineModel<boolean>('open')

const handleClose = () => {
  open.value = false
}
</script>

<style lang="scss">
.ant-modal {
  .ant-modal-content {
    .ant-modal-body {
      overflow: hidden;
      > div {
        > span {
          overflow-y: auto;
          max-height: 300px;
        }
      }
    }
  }
}

</style>./icons