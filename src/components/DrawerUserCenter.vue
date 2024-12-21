<template>
  <a-drawer :width="width" placement="right" :closable="false" v-model:open="open" @close="handleClose" class="drawer-user-center">
    <template #closeIcon></template>
    <div class="d-flex align-items-center justify-content-between px-3 px-sm-4 my-4 pt-2">
      <h4 class="fw-bold ms-2">Account Center</h4>
      <div class="linker" @click="handleClose"><iClose /></div>
    </div>

    <div class="d-flex align-items-center px-3 px-sm-4">
      <div class="avatar xlg bg-primary m-3"><img src="../assets/blockchain/sol.png" /></div>
      <div class="d-flex flex-column ms-2">
        <span class="fw-bold h5">{{ store.wallet.maskingAddress }}</span>
        <span class="fw-500">{{ new Date(store.user.info.createTs * 1000).toLocaleString() }}</span>
      </div>
    </div>

    <dl class="px-3 px-sm-4">
      <dt class="mx-2 mb-3">
        <span class="h6 fw-bold">Assets</span>
      </dt>
      <dd>
        <a-menu :selectable="false">
          <a-menu-item class="d-flex px-3 mx-2">
            <span class="d-flex align-items-center color-secondary "><iScore class="me-3"/>$JUN</span>
            <span class="fw-500">{{ store.user.info.scoreView }}</span>
          </a-menu-item>
        </a-menu>
      </dd>
    </dl>

    <dl class="px-3 px-sm-4">
      <dt class="mx-2 mb-3">
        <span class="h6">Authorisation</span>
      </dt>
      <dd class="br-3 bg-white overflow-hidden">
        <a-menu :selectable="false">
          <a-menu-item class="d-flex px-3 mx-2">
            <span class="d-flex align-items-center color-secondary"><iX class="me-3"/></span>
            <span v-if="store.user.twitter.has">
              <a :href="`https://twitter.com/${store.user.twitter.username}`" target="_blank" class="d-flex align-items-center">
                @{{ store.user.twitter.username }}
                <span v-if="store.user.twitter.avatar" class="d-inline-block avatar smd ms-2"><img :src="store.user.twitter.avatar" class="w-full" /></span>
              </a>
            </span>
            <span v-else>
              <a :href="authUrl" class="hover-primary br-3 px-3 py-1">Bind</a>
            </span>
          </a-menu-item>
          <a-menu-item class="d-flex px-3 mx-2">
            <span class="d-flex align-items-center color-secondary"><iTelegram class="me-3"/></span>
            <span v-if="store.user.telegram.has">
              <span class="d-flex align-items-center">
                {{ store.user.telegram.username }}
                <span v-if="store.user.telegram.avatar" class="d-inline-block avatar smd ms-2"><img :src="store.user.telegram.avatar" class="w-full" /></span>
              </span>
            </span>
            <span class="d-flex"v-else>
              <TelegramLoginWidget :botUsername="store.constants.auth2.telegramLoginBot" size="medium" :userPhoto="true" :requestWrite="true" @auth="async (user: any) => {
                await store.req.userReportTelegram({
                  id: user.id,
                  username: user.username,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  avatar: user.photo_url,
                  authDate: user.auth_date,
                  hash: user.hash
                })
                }" />
            </span>
          </a-menu-item>
        </a-menu>
      </dd>
    </dl>

    <div class="d-flex px-3 px-sm-4 mt-auto mb-4">
      <a-button tyoe="secondary" class="br-5 fw-bold col" @click="() => {
        store.method.common.logOut()
        handleClose()
      }">
        <iLogOut class="me-2" />Log out
      </a-button>
    </div>

  </a-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  iX,
  iTelegram,
  iClose,
  iScore,
  iLogOut
} from '@/components/icons'
import { store } from '@/store'
import { merge } from '@/utils'

const open = defineModel<boolean>('open')
const width = ref<number>(400);
const authUrl = ref<string>('');
const maxWidth = 640

const handleClose = () => {
  open.value = false
}

watch(open, async (newVal, oldVal) => {
  if (store.user.twitter.has || !newVal) return

  const { data, error } = await store.req.userTwitterAuthUrl()

  authUrl.value = data.authUrl
})

</script>

<style lang="scss">
.drawer-user-center {
  .ant-drawer-wrapper-body {
    .ant-drawer-body {
      // background-color: #0052d9;
      background-color: #f4f4f4;
      display: flex;
      flex-direction: column;
      padding: 0;
      dl {
        margin-top: 24px;
        dt {
          span {
            // color: #fff;
            font-weight: bold;
            // opacity: 0.8;
          }
        }
        dd {
          border-radius: 16px;
          overflow: hidden;
          background-color: #fff;
          .ant-menu-item {
            width: calc(100% - 12px);
            height: 44px;
            line-height: 44px;
            margin-top: 8px;
            margin-bottom: 8px;
            // background-color: blue;
            .ant-menu-title-content {
              display: flex;
              align-items: center;
              flex: 1 0 0%;
              justify-content: space-between;
              // background-color: red;
            }
          }
        }
      }
    }
  }
}
</style>