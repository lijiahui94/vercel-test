<template>
  <div class="container-fluid px-0 d-flex flex-column reward-cover">
    <div class="container-xl d-flex px-3 px-md-4 gap-md-4 gap-lg-5 my-5 py-0 py-md-5">
      <div class="d-flex flex-column col pe-md-0 pe-lg-5 pt-5 justify-content-center">
        <h2 class="fw-800 mx-2 mx-md-0 mb-4 text-center text-md-start text-uppercase">Rewards Center</h2>
        <span class="h6 color-secondary mx-2 mx-md-0 mb-5 text-center text-md-start">Complete daily check-ins, invite friends, daily quests, etc., to earn high rewards</span>
        <template v-if="store.user.isLogged && store.wallet.signedIn">
          <Busy :busy="store.req.userInfoBusy">
            <div class="d-flex flex-column bg-primary-dilute br-2 px-4 py-3 balance mb-3">
              <span class="d-flex gap-2 align-items-center color-white">
                <span class="h6 fw-500 text-break">
                  {{ store.wallet.maskingAddress }}
                </span>
                <a-tooltip color="rgba(0,82,217,0.8)">
                  <template #title>Address corresponds to the share of $JUN owned.</template>
                  <span class="ms-auto"><iQuestionCircle class="linker" /></span>
                </a-tooltip>
              </span>
              <span class="d-flex color-white align-items-center gap-2">
                <!-- <iIconJun class="me-2" /> -->
                <iScore class="me-2" />
                <span class="h3 fw-bold">{{ store.user.info.scoreView }}</span>
                <small class="fw-bold mt-1 mt-lg-3 opacity-80">$JUN</small>
              </span>
            </div>
          </Busy>
        </template>
        <div class="grid gap-3 mx-2 mx-md-0 dailys">
          <div class="g-col-6 d-flex flex-column br-3 p-3 position-relative hover-primary border-unimportant align-items-center justify-content-center" @click="() => store.method.accountReward.onModalClaimWeekRewards()">
            <span class="position-absolute color-white" style="right: 8px; top: 8px;">
              <template v-if="true">
                <small class="d-flex bg-primary-dilute fw-500 br-2 px-2 py-1">Unchecked</small>
              </template>
              <template v-else>
                <span class="bg-primary br-4"><iCheckCircle /></span>
              </template>
            </span>
            <vCheckIn class="zoom-150 mb-2" />
            <span class="fw-bold text-center">Daily Check-in</span>
          </div>
          <div class="g-col-6 grid d-flex flex-wrap gap-3">
            <div class="d-flex flex-column br-3 p-3 hover-primary border-unimportant col color-primary align-items-center justify-content-center" @click="() => store.view.accountReward.tab.curr = 0">
              <vTask class="zoom-150 mb-2" />
              <span class="fw-bold">Tasks</span>
            </div>
            <div class="d-flex flex-column br-3 p-3 hover-primary border-unimportant col color-primary align-items-center justify-content-center" @click="() => store.view.accountReward.tab.curr = 1">
              <vInviteFriend class="zoom-150 mb-2" />
              <span class="fw-bold">Invite</span>
            </div>
          </div>
        </div>
      </div>

      <div class="d-none d-md-flex flex-column col align-items-center justify-content-center br-4">
      </div>
    </div>

    <dl v-if="store.user.isLogged && store.wallet.signedIn" class="container-xl d-flex flex-column px-3 px-md-4 mb-5 pb-0 pb-md-5 tab">
      <dt class="d-flex flex-wrap justify-content-between align-items-center">
        <div class="d-flex h3 fw-bold gap-3">
          <span class="px-3 px-md-5 py-2 py-md-3 color-secondary"
            v-for="item in store.view.accountReward.tab.list" :key="`tab-${item.id}`"
            :class="{ 'curr': item.id === store.view.accountReward.tab.curr }"
            @click="() => store.view.accountReward.tab.curr = item.id">
            {{ item.label }}
          </span>
        </div>
      </dt>
      <dd class="pt-5">
        <div v-if="store.view.accountReward.tab.curr === 0" class="d-flex flex-column">
          <!-- <div class="d-flex mb-4 pb-2 align-items-center gap-3">
            <h4 class="fw-bold">Novice tasks</h4>
            <a-tooltip color="rgba(0,82,217,0.8)">
              <template #title>New user basic reward, limited to one per account.</template>
              <iQuestionCircle class="linker" />
            </a-tooltip>
          </div>
          <ul class="grid gap-3 task-list mb-5">
            <li class="d-flex flex-column g-col-12 g-col-sm-6 g-col-md-4 g-col-lg-3 px-4 pt-3 pb-3 br-3"
              v-for="item in store.view.accountReward.task.noviceList"
              :key="`noviceList-${item.id}`">
              <div class="d-flex color-primary align-items-center gap-1 my-1">
                <span class="h3 fw-bold">{{ item.volume }}</span>
                <small class="mt-2 fw-500">${{ item.symbol }}</small>
              </div>
              <span class="mb-3 color-secondary">{{ item.notes }}</span>
              <a-button v-if="item.finished" ghost disabled size="small" type="primary" class="mt-auto br-4 fw-500 d-flex justify-content-center align-items-center"><iCheckCircle class="zoom-75 me-1" /><span class="color-primary">Finished</span></a-button>
              <a-button v-else ghost size="small" type="primary" class="mt-auto br-4 fw-500">Go</a-button>
            </li>
          </ul> -->

          <div class="d-flex mb-4 pb-2 gap-3 align-items-center">
            <h4 class="fw-bold">Daily tasks</h4>
            <a-tooltip color="rgba(0,82,217,0.8)">
              <template #title>Tasks will be reset at 12:00 AM (UTC+8) every day.</template>
              <iQuestionCircle class="linker" />
            </a-tooltip>
          </div>
          <ul class="grid gap-3 task-list">
            <li class="d-flex flex-column g-col-12 g-col-sm-6 g-col-md-4 g-col-lg-3 px-4 pt-3 pb-3 br-3"
              v-for="item in store.view.accountReward.task.dailyList"
              :key="`dailyList-${item.id}`">
              <div class="d-flex color-primary align-items-center gap-1 my-1">
                <span class="h3 fw-bold">{{ item.volume }}</span>
                <small class="mt-2 fw-500">${{ item.symbol }}</small>
              </div>
              <span class="mb-3 color-secondary">{{ item.notes }}</span>
              <a-button v-if="item.finished" ghost disabled size="small" type="primary" class="mt-auto br-4 fw-500 d-flex justify-content-center align-items-center"><iCheckCircle class="zoom-75 me-1" /><span class="color-primary">Finished</span></a-button>
              <a-button v-else ghost size="small" type="primary" class="mt-auto br-4 fw-500">Go</a-button>
            </li>
          </ul>
        </div>

        <div v-if="store.view.accountReward.tab.curr === 1" class="d-flex flex-column">
          <div class="d-flex flex-column flex-lg-row gap-5 mb-5">
            <div class="d-flex flex-column col">
              <h4 class="fw-bold mb-3">Make big money together</h4>
              <span class="color-secondary mb-2">Invite your friends to use your exclusive invitation code to complete registration, login, and binding, and you can confirm your invitation relationship. </span>
              <span class="color-secondary mb-3">After that, every time your friends engage in an interaction on JUNLALA, you will earn certain profits! Your friends can also participate in the invitation activity and earn profits!</span>
              <!-- <a-button size="small" class="d-flex align-items-center br-4 me-auto px-3"><iLink class="zoom-75 me-2" />Detail</a-button> -->
            </div>
            <div class="d-flex flex-column col gap-3 p-4 border-line br-3">
              <div class="d-flex flex-wrap br-3 px-3 py-3 border-line align-items-center gap-3">
                <span class="ps-2 color-secondary">Referral code</span>
                <span class="d-flex gap-3 col align-items-center">
                  <span class="col text-end h6 fw-500">{{ store.view.accountReward.invite.code }}</span>
                  <span id="copyInviteCode" class="p-2 br-4 hover-primary" @click="store.method.common.onCopy('#copyInviteCode')" :data-clipboard-text="store.view.accountReward.invite.code"><iCopy /></span>
                </span>
              </div>
              <div class="d-flex flex-wrap br-3 px-3 py-3 border-line align-items-center gap-3">
                <span class="ps-2 color-secondary">Referral link</span>
                <span class="d-flex gap-3 col align-items-center">
                  <span class="col text-end h6 fw-500">{{ store.view.accountReward.invite.qrCodeValue }}</span>
                  <span id="copyInviteLink" class="p-2 br-4 hover-primary" @click="store.method.common.onCopy('#copyInviteLink')" :data-clipboard-text="store.view.accountReward.invite.qrCodeValue"><iCopy /></span>
                </span>
              </div>
              <div class="d-flex gap-3 mt-2">
                <a :href="store.user.info.tweetShareUrl" target="_blank" class="col d-flex">
                  <a-button type="primary" class="d-flex gap-1 align-items-center justify-content-center fw-500 br-4 col">
                    Share<iX class="ms-1" />
                  </a-button>
                </a>
                <!-- <a-button ghost type="primary" class="p-0 w-48 br-5 flex-shrink-0"><iTelegram /></a-button> -->
                <a-button ghost type="primary" class="p-0 w-48 br-5 flex-shrink-0"
                  @click="() => store.view.accountReward.invite.qrCodeOpen = true">
                  <iQRCode />
                </a-button>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column br-3 overflow-hidden ">
            <div class="d-flex bg-dilute color-secondary fw-500 px-3 px-sm-4 px-md-5 py-4">
              <span class="col-3 d-none d-md-flex">Date</span>
              <span class="col-5">Invitee</span>
              <span class="col-3">$JUN</span>
              <span class="col">Status</span>
            </div>
            <Busy :busy="store.req.userInvitationsBusy">
              <template v-if="store.view.accountReward.inviteRecord.list.length">
                <ul class="d-flex flex-column bg-vapors">
                  <li class="d-flex px-3 px-sm-4 px-md-5 py-4"
                    :class="{ 'bg-vapors': !(idx % 2) }"
                    v-for="(item, idx) in store.view.accountReward.inviteRecord.last" :key="`id-${item.id}`">
                    <span class="col-3 d-none d-md-flex color-secondary">{{ new Date(item.createTs * 1000).toLocaleString() }}</span>
                    <span class="col-5 fw-500 linker color-primary">
                      <a-tooltip color="rgba(0,82,217,0.8)">
                        <template #title>
                          {{ item.address }}
                        </template>
                        {{ maskingAddress(item.address) }}
                      </a-tooltip>
                    </span>
                    <span class="col-3 color-secondary">
                      <!-- <a-progress :steps="4" :percent="item.progress" :show-info="false" class="col-auto m-0" /> -->
                      +{{ formatNumber(item.score) }}
                    </span>
                    <span class="col">
                      <template v-if="item.finished">
                        <iCheckCircle class="color-success" />
                      </template>
                      <template v-else>
                        <span class="text-capitalize color-secondary">{{ item.status }}</span>
                      </template>
                    </span>
                  </li>
                </ul>
                <div class="d-flex my-5 justify-content-center">
                  <a-pagination v-model:current="store.view.accountReward.inviteRecord.pagination.current"
                    :total="store.view.accountReward.inviteRecord.pagination.total"
                    :pageSize="store.view.accountReward.inviteRecord.pagination.size"
                    @change="() => store.req.userInvitations()"
                    show-less-items size="small"/>
                </div>
              </template>
              <div v-else class="bg-vapors d-flex p-5 justify-content-center">
                <div class="d-flex flex-column align-items-center gap-3 m-5 p-5">
                  <iNoData />
                  <span class="color-secondary fw-500">No Invite</span>
                </div>
              </div>
            </Busy>
          </div>
        </div>
      </dd>
    </dl>
  </div>

  <ModaInviteQRCode v-model:open="store.view.accountReward.invite.qrCodeOpen" :value="store.view.accountReward.invite.qrCodeValue" />
  <ModalClaimWeekRewards v-model:open="store.view.accountReward.claimWeekRewards.open" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import vCheckIn from '@/assets/view/earn/check-in.svg'
import vTask from '@/assets/view/earn/task.svg'
import vInviteFriend from '@/assets/view/earn/invite-friend.svg'
import {
  iCheckCircle,
  iQuestionCircle,
  iLink,
  iIconJun,
  iTelegram,
  iCopy,
  iX,
  iQRCode,
  iScore,
  iNoData
} from '@/components/icons'
import { store } from '@/store'
import { maskingAddress, formatNumber } from '@/utils'

onMounted(() => {
  store.method.accountReward.onInit()
})
</script>

<style scoped lang="scss">
.reward-cover {
  > div {
    > div {
      .balance {
        background: url('../assets/view/earn/check-in-bg.png') no-repeat center center / cover;
      }
      &:first-child {
        .dailys {
          >div {
            &:first-child {
            }
            &:last-child {
              > div {
                &:first-child {
                  // background: url('../assets/view/earn/task-bg.png') no-repeat center center / cover;
                }
                &:last-child {
                  // background: url('../assets/view/earn/invite-friend-bg.png') no-repeat center center / cover;
                }
              }
            }
          }
        }
      }
      &:last-child {
        min-height: 450px;
        background: url('../assets/view/earn/cover.png') no-repeat center center / cover;
      }
    }
  }
}

.task-list {
  li {
    background: url('../assets/view/earn/task-unit-bg.png') no-repeat center center / cover;
    border: 1px solid #C1C1C166;
    transition: all 0.3s;

    &:hover {
      border-color: #0052D9;
    }

  }
}

.tab {
  dt {
    border-bottom: 2px solid #E6E6E6;

    >div {
      &:first-child {
        > span {
          border-bottom: 2px solid #E6E6E6;
          margin-bottom: -2px;
          cursor: pointer;
          transition: all 0.3s;

          &.curr, &:hover {
            color: #0052D9;
            border-color: #0052D9;
          }
        }
      }
    }
  }
}

.input-disabled-right {
   input {
    text-align: right !important;
    background-color: red;
  }
}
</style>