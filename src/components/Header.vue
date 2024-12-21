<template>

  <div class="container-fluid d-flex flex-column px-0 position-fixed header">
    <div style="background-color: #1A2713;">
      <div class="container-xl">
        <a href="https://www.bio.xyz/" target="_blank"><img class="w-full" src="../assets/view/home/banner.png" /></a>
      </div>
    </div>

    <div class="container-xl d-flex flex-wrap align-items-center px-0 py-2 p-md-4 ">
      <router-link to="/" class="z-size me-0 me-md-5 ms-3 ms-md-0">
        <span class="d-flex d-md-none">
          <iLogoStandardMark />
        </span>
        <span class="d-none d-md-flex"><img src="../assets/logo/standard.png" /></span>
      </router-link>
      <ul class="d-none d-xl-flex h6 gap-4">
        <li v-for="(item, idx) in store.view.header.nav" :key="`nav-${idx}`"
          class="d-flex flex-column align-items-center pointer"
          :class="{ 'fw-bold': item.id === $router.currentRoute.value.name || (($router.currentRoute.value.name || '') as string).indexOf(item.prefix) === 0 }">
          <template v-if="item.to == '/ai-watch'">
            <a-dropdown>
              <a :class="item.class || []" @click.prevent>
                {{ item.text }}
                <img style="margin-top: -4px;" src="../assets/view/ai-watch/DownOutlined.png" alt="" srcset="">
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item v-for="item in [
                    { label: 'AI WATCH', to: '/ai-watch', content: 'AI Watch enables real-time health data tracking', svg: icon1 },
                    { label: 'Blood Glucose Monitor', to: '/blood-glucose-monitor', content: 'Automatically measures glucose, providing more comprehensive data', svg: icon2 },
                  ]" :key="item.label">
                    <router-link :to=item.to>
                      <div class="d-flex gap-2 align-items-start">
                        <div class="d-flex justify-content-center align-items-center"
                          style="width: 40px; height: 40px;">
                          <component :is="item.svg" class="img-fluid" />
                        </div>
                        <div>
                          <div class="fw-semibold fs-5 text-dark">{{ item.label }}</div>
                          <div class="fw-normal fs-6 text-dark">{{ item.content }}</div>
                        </div>
                      </div>
                    </router-link>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <template v-else-if="item.to">
            <router-link :to=item.to :class="item.class || []">{{ item.text }}</router-link>
          </template>
          <template v-else>
            <a :href="item.href" :target="item.target || '_blank'" :class="item.class || []">{{ item.text }}</a>
          </template>
        </li>
      </ul>
      <div class="d-flex align-items-center ms-auto">
        <!-- <SocialLink v-if="!store.wallet.signedIn" class="d-none d-md-flex me-3" /> -->
        <!-- <div v-if="store.wallet.signedIn" class="d-flex me-3">
          <Busy :busy="store.req.userInfoBusy">
            <a-button ghost type="primary" size="small" class="d-flex align-items-center br-5 px-2 px-sm-3">
              <iScore />
              <span class="d-sm-flex d-none align-items-center ms-2">
                <span class="fw-500">{{ store.user.info.scoreView }}</span>
                <small class="ms-2">$JUN</small>
              </span>
            </a-button>
          </Busy>
        </div> -->

        <!-- <template v-if="store.wallet.signedIn">
          <WalletAccountPanel />
        </template>
        <template v-else>
          <Busy :busy="store.wallet.connecting || store.wallet.signing">
            <div class="me-2 me-md-0" @click="() => store.method.common.onConnect()">
              <a-button type="primary" size="small" class="d-flex d-md-none br-5 px-3 fw-500">Connect</a-button>
              <a-button type="primary" class="d-none d-md-flex br-5 px-md-4 fw-500">Connect</a-button>
            </div>
          </Busy>
        </template> -->

        <template v-if="store.walletEvm.signedIn">
          <WalletEvmAccountPanel />
        </template>
        <template v-else>
          <Busy :busy="store.walletEvm.connecting || store.walletEvm.signing">
            <div class="me-2 me-md-0" @click="() => store.method.common.onConnect()">
              <a-button type="primary" size="small" class="d-flex d-md-none br-5 px-3 fw-500">Connect</a-button>
              <a-button type="primary" class="d-none d-md-flex br-5 px-md-4 fw-500">Connect</a-button>
            </div>
          </Busy>
        </template>

        <!-- <template v-if="store.wallet.signedIn">
          <AccountMenu />
        </template>
        <template v-else>
          <Busy :busy="store.wallet.connecting || store.wallet.signing">
            <div class="me-2 me-md-0" @click="() => store.evmWallet.autoConnect()">
              <a-button type="primary" size="small" class="d-flex d-md-none br-5 px-3 fw-500">Connect</a-button>
              <a-button type="primary" class="d-none d-md-flex br-5 px-md-4 fw-500">Connect</a-button>
            </div>
          </Busy>
        </template> -->

        <div class="d-xl-none">
          <a-dropdown :overlayStyle="{ width: '320px' }" overlayClassName="side-nav" placement="bottomRight"
            :getPopupContainer="(triggerNode: any) => triggerNode.parentNode">
            <div class="d-flex py-2 px-4 linker color-primary">
              <iMenu />
            </div>
            <template #overlay>
              <a-menu class="p-2 br-3">
                <a-menu-item class="px-3 py-2" v-for="(item, idx) in store.view.header.nav" :key="`side-nav-${idx}`">
                  <div class="d-flex align-items-center color-primary col"
                    :class="{ 'fw-bold': item.id === $router.currentRoute.value.name }">
                    <div class="p-1 br-2 me-3"
                      :class="{ 'bg-primary color-white': item.id === $router.currentRoute.value.name }">
                      <component :is="item.component" />
                    </div>
                    <template v-if="item.to">
                      <router-link class="col" :to=item.to :class="item.class || []">{{ item.text }}</router-link>
                    </template>
                    <template v-else>
                      <a class="col" :href="item.href" :target="item.target || '_blank'" :class="item.class || []">{{
                        item.text }}</a>
                    </template>
                  </div>
                </a-menu-item>
                <a-menu-item>
                  <SocialLink />
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
  </div>

  <div class="d-flex py-4 py-md-5 my-md-5"></div>
  <!-- <ModalWallets v-model:open="store.wallet.selectOpen" /> -->
  <DrawerUserCenter v-model:open="store.user.accountCenter.open" />
</template>

<script setup lang="ts">
import {
  iLogoStandardMark,
  iMenu,
  iScore
} from './icons'
import { store } from '@/store'
import icon1 from '../assets/view/ai-watch/icon-1.svg'
import icon2 from '../assets/view/ai-watch/icon-2.svg'
</script>

<style scoped lang="scss">
.header {
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 99;
  backdrop-filter: blur(8px);
}

.side-nav {
  width: 320px !important;
}

.a {
  display: flex;
  gap: 8px;
}

.b {
  width: 40px;
  height: 40px;
}

.c {}

.d {
  font-weight: 600;
  font-size: 16px;
  color: #000000;
}

.e {
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}
</style>