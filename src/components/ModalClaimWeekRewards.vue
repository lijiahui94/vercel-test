<template>
  <a-modal v-model:open="open" :centered="true" :maskClosable="false" :closable="false">
    <div class="d-flex flex-column p-3 p-sm-4">
      <div class="d-flex mb-4 mt-3 mt-md-2 justify-content-between align-items-center ps-2 ps-sm-1">
        <h5 class="fw-500 col">Claim <em class="color-primary">$JUN</em> every day</h5>
        <div class="linker color-secondary" @click="handleClose"><iClose /></div>
      </div>
      <span class="color-secondary ps-2 mb-3">Invite friends to scan and sign up to win a total of <em class="fw-bold color-primary">10,000 $JUN</em></span>
      <ul class="d-flex flex-wrap mb-4">
        <li class="d-flex col-6 col-md-3"
          :class="{ 'col-12 col-md-6': idx === 6}"
          v-for="(item, idx) in store.view.accountReward.claimWeekRewards.list" :key="`reward-${idx}`">
          <div class="d-flex flex-column col hover-primary br-2 m-2 border-w-2 border-line px-2 py-4 gap-2 bg-dilute justify-content-center align-items-center"
            :class="{ 'bg-primary opacity-80': item.skipped, 'border-primary bg-primary': item.claime }"
            :disabled="item.skipped">

            <template v-if="item.skipped">
              <span class="d-flex flex-column color-white align-items-center">
                <span class="py-2"><iCheckCircle class="zoom-130" /></span>
                <small class="fw-500">{{ item.label }}</small>
              </span>
            </template>
            <template v-if="item.claimed">
              <iScore class="zoom-130" />
              <small class="fw-500">{{ item.label }}</small>
            </template>
            <template v-if="item.claime">
              <span class="d-flex flex-column color-white align-items-center">
                <iScore class="my-2 zoom-130" />
                <small class="fw-500">{{ item.label }}</small>
              </span>
            </template>
            <template v-if="item.freeze">
              <iScore class="zoom-130" />
              <small class="fw-500">{{ item.label }}</small>
            </template>
          </div>
        </li>
      </ul>
      <div class="d-flex justify-content-center">
        <a-button type="primary" class="d-flex br-5 fw-bold">Claim now</a-button>
      </div>
    </div>
    <template #footer></template>
  </a-modal>
</template>

<script setup lang="ts">
import {
  iClose,
  iScore,
  iCheckCircle
} from '../components/icons'
import { store } from '@/store'
import { ref } from 'vue'

const open = defineModel<boolean>('open')

const handleClose = () => {
  open.value = false
}
</script>

<style lang="scss">

</style>./icons./icons./icons./icons