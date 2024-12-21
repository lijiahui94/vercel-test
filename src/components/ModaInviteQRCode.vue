<template>
  <a-modal v-model:open="open" :width="360" :centered="true" :closable="false">
    <div class="d-flex flex-column p-4 m-md-3">
      <div class="d-flex mb-4 mt-3 mt-md-2 justify-content-between align-items-center ps-2 ps-sm-1">
        <h5 class="fw-500 col">Scan QRCode to invite</h5>
        <div class="linker color-secondary" @click="handleClose"><iClose /></div>
      </div>
      <div class="d-flex br-4 border-line mx-auto mb-3 mb-md-4">
        <a-qrcode :value="value" size="220" color="#1F61D0" class="p-3" />
      </div>
      <span class="color-secondary text-center">
        Invite friends to scan and sign up to win a total of <em class="fw-bold color-primary">$JUN</em>
      </span>
    </div>
    <template #footer></template>
  </a-modal>
</template>

<script setup lang="ts">
import {
  iClose,
} from '../components/icons'
import { ref } from 'vue'

const open = defineModel<boolean>('open')
const value = ref<string>('');

const handleClose = () => {
  open.value = false
}
</script>

<style lang="scss">

</style>./icons