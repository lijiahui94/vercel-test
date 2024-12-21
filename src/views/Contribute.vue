<template>
  <div class="container-fluid px-0 d-flex flex-column">
    <div class="container-fluid px-0 d-flex flex-column main-cover">
      <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 home-cover gap-md-4 mb-5 pb-5">
        <div class="d-flex flex-column align-items-center col pt-0 pb-0 mb-0 pe-0 pe-md-5">
          <IMainCover class="col-10 col-sm-8 col-md-5" />
          <h2 class="fw-bold mb-4 mt-3 text-uppercase text-center col-10">
            Curate & Support <em class="color-primary">DeSci</em> Innovations
          </h2>
          <h4 class="fw-bold mb-3 text-uppercase text-center">
            Join Us in Making a Difference
          </h4>
          <span class="d-flex flex-column h6 color-secondary mb-5 text-center col-10">
            JunLaLa invites you to participate in DeSci meme token auctions, and donate to support groundbreaking research in preventive medicine. Your contributions will directly fund JunLaLa Research Guilds' projects.
          </span>
          <div class="d-flex flex-column gap-4 justify-content-center justify-content-md-start">
            <a href="#auctions">
              <a-button type="primary" class="d-flex justify-content-center align-items-center br-4">
                Token Auctions <iArrowRight class="ms-2 rotate-90" />
              </a-button>
            </a>
          </div>
        </div>
      </div>

      <div id="auctions" class="my-md-5 pb-5"></div>
      <div class="container-fluid px-0 d-flex flex-column">
        <div class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-5 my-md-5 py-md-5">
          <h2 class="fw-bold mb-4 pb-3 text-uppercase lh-2 text-center">DeSci Portfolio</h2>

          <div class="d-flex flex-column">
            <div class="d-flex bg-dilute color-secondary fw-500 px-3 px-sm-4 py-4">
              <span class="col">JunLaLa DAO</span>
              <span class="col-2 text-end">Amount</span>
              <span class="col-1 text-end">Price</span>
              <span class="d-none d-md-block col-2 text-end">Total Value</span>
              <span class="d-none d-md-block col-2 text-end">Remaining</span>
              <span class="col-3 col-md-2 text-end">Actions</span>
            </div>
            <ul class="d-flex flex-column bg-vapors">
              <li class="d-flex align-items-center px-3 px-sm-4 py-4"
                :class="{ 'bg-vapors': !(idx % 2) }"
                v-for="(item, idx) in store.view.contribute.portfolio.list" :key="`id-${item.id}`">
                <span class="col"><img :src="item.icon" class="me-2" /><em class="fw-bold color-primary">{{ item.name }}</em> <small class="color-secondary">${{ item.symbol }}</small></span>
                <span class="col-2 h6 text-end">{{ formatNumber(item.amount) }}</span>
                <span class="col-1 h6 text-end">$ {{ item.price }}</span>
                <span class="d-none d-md-block col-2 h6 text-end">$ {{ formatNumber(new BN(item.amount).times(item.price).toString()) }}</span>
                <span class="d-none d-md-block col-2 h6 text-end">
                  <Busy :busy="store.view.contribute.payPortfolio.remainingBusy">{{ formatNumber(item.remaining) }}</Busy>
                </span>
                <span class="d-flex col-3 col-md-2 justify-content-end text-end">
                  <template v-if="store.walletEvm.signedIn">
                    <Busy :busy="store.view.contribute.payPortfolio.remainingBusy">
                      <a-button type="primary" :disabled="!(item.remaining > 0)" size="small" class="d-flex justify-content-center align-items-center br-4 px-4" @click="() => handleOpenPay(idx)">
                        {{ item.remaining > 0 ? 'Buy' : 'Gone' }}
                      </a-button>
                    </Busy>
                  </template>
                  <template v-else>
                    <a-button type="primary" size="small" class="d-flex justify-content-center align-items-center br-4 px-3" @click="() => store.method.common.onConnect()">Connect</a-button>
                  </template>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-dilute mb-4">
      <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 gap-md-4 ai-why my-3 my-md-5 py-3 py-md-5">
        <div class="d-flex flex-column col col-md-7 order-12 order-md-1 pt-0 pb-3 py-md-5">
          <h2 class="fw-bold mb-4 text-center text-md-start text-uppercase">Why Contribute?</h2>
          <span class="mb-3 d-flex">
            <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
            <span class="h6 color-secondary">
              <em class="fw-bold color-primary pe-3">Fund Critical Research</em>Help uncover new insights into early prevention and intervention strategies for vital health issues.
            </span>
          </span>
          <span class="mb-3 d-flex">
            <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
            <span class="h6 color-secondary">
              <em class="fw-bold color-primary pe-3">Be Part of a Community</em>Join a global network of supporters and researchers dedicated to advancing science and improving health outcomes.
            </span>
          </span>
          <span class="mb-3 d-flex">
            <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
            <span class="h6 color-secondary">
              <em class="fw-bold color-primary pe-3">Incentives for Supporters</em>Early supporters have the opportunity to receive exclusive rewards.
            </span>
          </span>
        </div>
        <div class="col order-1 order-md-12 me-0 me-md-4 me-lg-5"></div>
      </div>
    </div>

    <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 gap-md-5 ai-how my-3 my-md-5 py-3 py-md-5">
      <div class="col order-1 order-md-12"></div>
      <div class="d-flex flex-column col col-md-7 order-12 order-md-1 pt-0 pb-3 py-md-5">
        <h2 class="fw-bold mb-4 text-center text-md-start text-uppercase">How to Contribute</h2>
        <span class="mb-3 d-flex">
          <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
          <span class="h6 color-secondary">
            <em class="fw-bold color-primary pe-3">Participate in Token Auctions</em>Engage in DeSci meme token auctions to invest in advancing medical research.
          </span>
        </span>
        <span class="mb-3 d-flex">
          <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
          <span class="h6 color-secondary">
            <em class="fw-bold color-primary pe-3">Stay Informed and Engaged</em>Follow our updates and participate in community discussions to stay connected with the latest developments.
          </span>
        </span>
        <span class="mb-3 d-flex">
          <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
          <span class="h6 color-secondary">
            <em class="fw-bold color-primary pe-3">Amplify Your Impact</em>Share our mission with others who are passionate about scientific innovation and health improvements.
          </span>
        </span>
      </div>
    </div>

    <ModaPayPortfolio v-model:open="store.view.contribute.payPortfolio.open" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { store } from '@/store'
import BN from 'bignumber.js'
import { merge, formatNumber } from '@/utils'
import {
  iArrowRight,
  iHappyActive,
  iCalmActive,
  iFearActive,
  iAngryActive
} from '../components/icons.ts'
import ISuperTelecom from '../assets/view/ai-watch/mechanism/super-telecom.png'
import IKucoin from '../assets/view/ai-watch/mechanism/kucoin.png'
import ILinkvc from '../assets/view/ai-watch/mechanism/linkvc.png'
import IMirana from '../assets/view/ai-watch/mechanism/mirana.png'
import IRedpoint from '../assets/view/ai-watch/mechanism/redpoint.png'
import IMainCover from '../assets/view/contribute/DNA-bro.svg'
// const model = defineModel()

const handleOpenPay = (idx: number) => {
  store.view.contribute.payPortfolio.idx = idx
  store.view.contribute.payPortfolio.open = true
}

onMounted(() => {
  store.method.contribute.onInit()
})
</script>

<style scoped lang="scss">
.main-cover {
  background: url('../assets/view/contribute/main-cover.svg') no-repeat center bottom;
  background-size: contain;
}
.home-cover {
  // background: url('../assets/view/contribute/DNA-bro.svg') no-repeat center center;
  // background-size: contain;
}
.ai-cover {
  h1 {
    position: relative;
    span {
      background: linear-gradient(128.87deg, #0052D9 -24.41%, #6FA5FF 120.06%);
    }
    &::after {
      z-index: 1;
      top: 40px;
      right: 0;
      position: absolute;
      content: '';
      display: block;
      width: 88px;
      height: 88px;
      background: url('../assets/view/home/coin-float.png') no-repeat center center;
      background-size: cover;
    }
  }

  > div:last-child {
    background: url('../assets/view/home/ai-cover.png') no-repeat center center;
    min-height: 300px;
    background-size: contain;
  }
}
@media (max-width: 768px) {
  .ai-cover {
    h1 {
      &::after {
        //  transform: rotateX(180deg);
         transform: rotate(180deg);
         zoom: 0.6;
         bottom: -70px;
      }
    }
  }
}
.ai-why {
  > div {
    &:last-child {
      background: url('../assets/view/contribute/cover-2.svg') no-repeat center center;
      background-size: cover;
      min-height: 360px;
    }
  }
}
.ai-how {
  > div {
    &:first-child {
      background: url('../assets/view/contribute/cover-1.svg') no-repeat center center;
      background-size: cover;
      min-height: 360px;
    }
  }
}

</style>