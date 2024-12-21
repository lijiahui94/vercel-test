<template>
  <a-modal v-model:open="open" :width="380" :centered="true" :closable="false" :destroyOnClose="true"
    wrapClassName="modal-tarot">
    <div class="d-flex flex-column align-items-center">
      <div class="br-4 overflow-hidden"
        :class="{ 'rotate-180': !store.view.emotion.tarot.curr.isUpright }">
        <div class="front">
          <img v-if="store.view.emotion.tarot.curr.validated" :src="`/tarot/${ store.view.emotion.tarot.curr.id }.jpg`" />
          <img v-else src="/tarot/back.jpg" />
        </div>
        <!-- <div class="back"></div> -->
      </div>
      <div class="d-flex ms-auto me-3">
        <div class="linker color-white" @click="handleClose"><iClose /></div>
      </div>

      <div class="d-flex flex-column bg-white br-3 col-12 p-4 gap-3">
        <template v-if="store.view.emotion.tarot.curr.validated">
          <span>{{ parseContent }}</span>
        </template>
        <template v-else>
          <span class="color-secondary">Fill in the shared tweet link to get today's tarot reading!</span>
          <a-input v-model:value="store.view.emotion.tarot.curr.tweetUrl" placeholder="Enter the shared tweet url" />
          <div class="d-flex align-items-center">
            <a-button class="br-5 fw-bold col" type="primary" @click="async () => {
              const { data, error } = await store.req.userEmotionParse()
              if (error) return

              await printParseContent()
              await store.req.userEmotionHistory(true) // 对应的拆解是旧的，除非这部分数据单独获取
              }">
              Parse
            </a-button>
            <a :href="store.user.info.tweetShareUrl" target="_blank"  class="d-flex align-items-center justify-content-center hover-primary flex-shrink-0 br-5 w-40 border-primary ms-4">
              <iShare />
            </a>
          </div>
        </template>
      </div>
    <!--
    {{ store.view.emotion.tarot.curr.expired }}  -->

<!--{{ store.view.emotion.tarot.curr.emotionId }} |
      {{ store.view.emotion.tarot.curr.hasParse }} |
      <span class="color-secondary text-center">
      </span>
        解
      -->
    </div>
    <template #footer></template>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { store } from '@/store'
import {
  iClose,
  iShare,
  iX
} from '../components/icons'
import { infiniteLoop } from '@/utils'

const open = defineModel<boolean>('open')

let parseContent= ref('')
let forceStop = false


watch(open, async (newVal, oldVal) => {
  if (!newVal) {
    parseContent.value = ''
    forceStop = true
    return
  }

  printParseContent()
})

const printParseContent = async () => {
  forceStop = false
  const { parse, ts } = store.view.emotion.tarot.curr
console.log(parse)
  parseContent.value = ''
  if (!parse) return

  await infiniteLoop(async (accumulate: number) => {
    const stop = !(accumulate < parse.length)

    if (!stop) {
      parseContent.value += parse[accumulate]
    }

    return stop || forceStop
  }, 100)
}

const handleClose = () => {
  open.value = false
}
</script>

<style lang="scss">
.ant-modal-wrap {
  &.modal-tarot {
    .ant-modal-content {
      background-color: transparent;
      box-shadow: none;

      .ant-modal-body {
        > div {
          > div {
            &:nth-child(1) {
              transition: all 0.75s;
              position: relative;
              z-index: 1;
              width: 240px;
              border: 4px solid #fff;
              background-color: #f0f0f0;
              img {
                width: 100%;
              }
              .front {
                // position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                // background-color: red;
                // animation: l23 2s 2 linear;
              }
              .back {
                // position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                // background-color: blue;
                // animation: l24 2s infinite linear;
              }
              &:hover {
                transform: rotateY(-180deg);
              }
            }
            &:nth-child(2) {
              margin-top: -32px;
            }
            &:nth-child(3) {
              margin-top: 24px;
              min-height: 126px;
              box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
            }
          }
        }
      }
    }
  }
}

@keyframes l23 {
  100% {
    transform: rotateY(0deg);
    opacity: 0;
  }
  51% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  0% {
    opacity: 1;
    transform: rotateY(-180deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
@keyframes l24 {
  100% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  51% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  0% {
    opacity: 0;
    transform: rotateY(-180deg);
  }
}
</style>