<template>
  <a-style-provider hash-priority="high">
  <a-config-provider :getPopupContainer="getPopupContainer" :theme=themeDefault>
    <div class="container-fluid d-flex flex-column px-0 min-100vh">
      <context-holder />
      <router-view />
    </div>
  </a-config-provider>
  </a-style-provider>
</template>

<script setup lang="ts">
import themeDefault from './themes/default'
import { message, notification } from 'ant-design-vue';
import { store } from './store'

const [messageApi, contextHolder] = message.useMessage();

// update
store.message = messageApi

notification.config({
  top: '48px',
  duration: 5,
});
</script>

<script lang="ts">
export default {
  methods: {
    getPopupContainer(el: any, dialogContext: any) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    },
  },
}
</script>

<style scoped lang="ts">

</style>
