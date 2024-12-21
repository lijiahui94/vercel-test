<template>
  <div class="d-flex mgap-3 color-primary">
    <a :href="store.constants.app.telegram" target="_blank" title="Telegram" class="d-flex align-items-center justify-content-center hover-primary flex-shrink-0 br-5 w-40 border-primary"><iTelegram /></a>
    <a :href="store.constants.app.x" target="_blank" title="X" class="d-flex align-items-center justify-content-center hover-primary flex-shrink-0 br-5 w-40 border-primary"><iX /></a>
  </div>
</template>

<script setup lang="ts">
import { store } from '@/store'
import {
  iX,
  iTelegram,
} from './icons'
</script>