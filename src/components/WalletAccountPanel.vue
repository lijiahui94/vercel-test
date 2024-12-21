<template>
  <a-dropdown v-model:open="open" :getPopupContainer="(triggerNode: any) => triggerNode.parentNode">
    <a-button ghost type="primary" class="d-flex align-items-center br-5 px-3 px-sm-4" :class="{ 'hover': open }"
      @click.prevent="() => store.method.common.showAccountCenter()">
      <iAvatar />
      <span class="d-none d-sm-flex ms-2">{{ store.wallet.maskingAddress }}</span>
    </a-button>
    <template #overlay>
      <a-menu class="p-2 br-3">
        <a-menu-item class="px-2">
          <span class="color-primary d-flex" @click="() => store.method.common.showAccountCenter()">
            <iUser class="me-2" />Account Center
          </span>
        </a-menu-item>
        <a-menu-item class="px-2">
          <span class="color-primary d-flex" @click="() => store.method.common.logOut()">
          <iLogOut class="me-2" />Log out</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { store } from '@/store'
import {
  iAvatar,
  iLogOut,
  iUser
} from './icons'

const open = ref<boolean>(false);
</script>