<template>
  <!-- <div @click="() => {
    store.view.emotion.upload.agreement.open = true
  }">协议</div>
  <div @click="() => {
    store.view.emotion.share.open = true
  }">分享</div>
  <div @click="() => {
    store.view.emotion.tarot.open = true
  }">塔罗</div>
  <div @click="() => {
    store.view.emotion.camera.open = true
  }">照相</div> -->

  <div class="container-fluid px-0 d-flex flex-column">
    <div class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 gap-4 gap-md-5 my-5 pt-0 pb-0 pt-md-5">
      <div class="d-flex flex-column col ps-lg-4 justify-content-center">
        <span class="h4 fw-bold mt-3 mb-2 my-md-3 text-center text-md-start">Obtain a large amount of $JUN</span>
        <h2 class="fw-800 mx-2 mx-md-0 mb-5 text-center text-md-start text-uppercase">Participate in emotion training</h2>
        <span class="d-flex flex-column h6 color-secondary mx-2 mx-md-0 mb-5">
          <span class="mb-3 d-flex">
            <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
            <span>Share emotional photos and upload them to JUNLALA database.</span>
          </span>
          <span class="mb-3 d-flex">
            <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
            <span>Score them according to the quality of the uploaded pictures.</span>
          </span>
          <span class="mb-3 d-flex">
            <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
            <span>Every time you complete a training session, you can earn <em class="fw-500 color-primary">100 $JUN</em> and Daily Divination.</span>
          </span>
          <span class="mb-3 d-flex">
            <span class="d-flex pt-1 pt-md-2 pe-3 pe-md-4"><em class="avatar w-6 bg-primary d-inline-block col"></em></span>
            <span>Discover What the Universe Has in Store for You: Claim Your Free Daily Tarot Reading Today!</span>
          </span>
        </span>
      </div>
      <div class="d-flex flex-column col position-relative">
        <Busy :busy="store.view.emotion.upload.uploading" className="col">
          <a-upload-dragger
            class="col br-4"
            v-model:file-list="store.view.emotion.upload.fileList"
            name="image"
            :accept="store.view.emotion.upload.accept"
            :action="store.req.userEmotionUploadUrl"
            :maxCount="store.view.emotion.upload.maxCount"
            :before-upload="store.method.emotion.beforeUpload"
            :showUploadList="false"
            @change="store.method.emotion.handleUploadChange"
            :headers="{'Access-Token': store.user.info.session }"
            >
            <div class="d-flex flex-column align-items-center justify-content-end pb-5 py-md-5 h-100 br-4 overflow-hidden"
              :style="`background: url(${store.view.emotion.upload.preview}) no-repeat center center / cover;`">
              <template v-if="!store.view.emotion.upload.hasPreview">
                <div class="pt-5 mt-5 pb-2">
                  <iViewUploadPhoto />
                </div>
                <span class="h5 my-5 color-secondary col-12 col-md-11 col-lg-10 d-flex justify-content-center">
                  <template v-if="store.user.isLogged && store.wallet.signedIn">
                    <span class="d-none d-md-flex px-4">Drag and drop or select pictures, as well as by taking pictures</span>
                    <span class="d-flex d-md-none">Select a photograph</span>
                  </template>
                  <template v-else>
                    Please connect your wallet and log in first.
                  </template>
                </span>
                <div class="d-flex gap-3 gap-md-3 mb-4 flex-wrap px-4" :class="{'opacity-0': !(store.user.isLogged && store.wallet.signedIn)}">
                  <a-button class="d-flex br-5 fw-bold col justify-content-center" type="primary">
                    <span class="d-flex align-items-center"><iImage class="me-2"/>Select</span>
                  </a-button>
                  <a-button class="d-flex br-5 fw-bold col justify-content-center" type="primary" @click.stop="() => store.method.emotion.showCameraModal()">
                    <span class="d-flex align-items-center"><iCamera class="me-2" />Camera</span>
                  </a-button>
                </div>
                <div class="d-flex">
                  <span class="d-flex flex-column align-items-center color-secondary">png & jpg<small class="color-unimportant">File types</small></span>
                  <span class="color-primary opacity-50 px-4">|</span>
                  <span class="d-flex flex-column align-items-center color-secondary pe-4">{{ store.view.emotion.upload.fileLimitMB }} MB<small class="color-unimportant">Max size</small></span>
                </div>
              </template>
              <template v-else>
                <div class="py-5 my-5"></div>
                <div class="py-5 mt-5 mb-2"></div>
                <div class="d-flex gap-3">
                  <a-button class="br-5 fw-bold" type="primary">
                    <a-tooltip color="rgba(0,82,217,0.8)" placement="top" :open="store.view.emotion.upload.hasFile">
                      <template #title>
                        <div v-for="item in store.view.emotion.upload.fileList" :key="`file-${item.uid}`" class="d-flex flex-column color-white">
                          <span>{{ item.name }}</span>
                          <small>~ {{ (item.size / 1024 / 1024).toFixed(2) }} MB</small>
                        </div>
                      </template>
                      <span class="d-flex align-items-center">
                        <iImage class="me-2"/>Reselect
                        <iInfoCircle class="ms-2 zoom-75" v-if="store.view.emotion.upload.hasFile" />
                      </span>
                    </a-tooltip>
                  </a-button>
                  <a-button class="br-5 fw-bold" type="primary" @click.stop="() => store.method.emotion.showCameraModal()">
                    <span class="d-flex align-items-center"><iCamera class="me-2" />Retake</span>
                  </a-button>
                </div>
                <span class="pt-4 pb-5"></span>
                <a-alert v-if="store.view.emotion.upload.error"
                  :message="store.view.emotion.upload.errorMessage" type="error" show-icon closable
                  style="bottom: 0;" class="text-start position-absolute p-3 br-3 m-3" />
              </template>
            </div>
          </a-upload-dragger>
        </Busy>
        <div v-if="!(store.user.isLogged && store.wallet.signedIn)"
          class="d-flex flex-column align-items-center justify-content-end position-absolute position-full">
          <Busy :busy="store.wallet.connecting || store.wallet.signing">
            <a-button type="primary" class="d-flex align-items-center br-5"
              @click="() => store.method.common.onConnect()">
              Connect
            </a-button>
          </Busy>
          <div class="py-5 mb-3 mt-2"></div>
        </div>
      </div>
    </div>

    <div v-if="store.view.emotion.upload.hasPreview" class="container-xl d-flex flex-column flex-md-row px-3 px-md-4 gap-4 gap-md-5 mb-5 pb-5 pb-md-5">
      <!-- <template>
        <h2 class="fw-800 mx-2 mx-md-0 mt-5 mb-4 mb-md-5 text-center text-md-start text-break">Congratulations<em class="ps-3">🎉</em></h2>
        <span class="d-flex flex-column h6 color-secondary mx-2 mx-md-0 mb-5">
          <span class="mb-3 text-center text-md-start">
            You have successfully uploaded an emoticon photo, share it next and get more <em class="fw-500 color-primary">$JUN</em>.
          </span>
        </span>
        <div class="d-flex flex-column align-items-center">
          <a-button class="d-flex br-5 fw-bold col-lg-6 justify-content-center" type="primary"
            @click="() => store.view.emotion.share.open = true">
              <iX class="me-2" />Share
          </a-button>
        </div>
      </template>
        -->
      <div class="d-flex flex-column gap-md-4 select-emoji col">
        <div class="d-flex pt-3 align-items-center gap-3">
          <h4 class="fw-bold ps-md-3">Select emoticon and upload</h4>
          <a-tooltip color="rgba(0,82,217,0.8)">
            <template #title>AI automatically analyzes the expressions in photos, and you can also modify the expressions.</template>
            <iQuestionCircle class="linker" />
          </a-tooltip>
        </div>
        <ul class="d-flex flex-wrap my-4">
          <li class="d-flex col-4 col-sm-3 col-md-3 col-lg-2"
            v-for="item in store.view.emotion.upload.emojis"
            :class="{'curr': store.view.emotion.upload.cloudPhotoEmotion === item.label}"
            @click="() => store.method.emotion.onSelectEmotion(item)">
            <div class="d-flex flex-column col gap-3 px-2 py-3 br-3 pointer align-items-center m-1">
              <component :is="item.default" />
              <component :is="item.active" />
              <span class='text-capitalize h6 fw-500'>{{ item.label }}</span>
            </div>
          </li>
        </ul>
        <div class="d-flex justify-content-center gap-4">
          <Busy :busy="store.req.userEmotionAddBusy">
            <a-button :disabled="!store.view.emotion.upload.doneSuccess || store.view.emotion.upload.finished"
              class="br-5 fw-bold" type="primary"
              @click="() => store.method.emotion.onUploadEmotion()">
              <iUpload class="me-2" />Upload
            </a-button>
          </Busy>
          <a-button :disabled="!store.view.emotion.tarot.hasCurr"
            class="br-5 fw-bold"
            @click="() => store.view.emotion.tarot.open = true">
            Daily Tarot
          </a-button>
        </div>
      </div>
    </div>

    <div v-if="store.wallet.connected && store.wallet.signedIn" class="container-xl d-flex flex-column px-3 px-md-4 gap-md-4 record mb-5 pb-5">
      <h3 class="fw-bold mb-3">Emotion training record</h3>
      <Busy :busy="store.req.userEmotionHistoryBusy">
        <ul class="grid gap-3">
          <li v-if="!store.view.emotion.record.list.length" class="d-flex g-col-12 g-col-sm-6 g-col-md-4 br-4 bg-primary-vapors justify-content-center align-items-center color-unimportant">Uploaded photos will appear here</li>
          <li class="d-flex g-col-12 g-col-sm-6 g-col-md-4 d-flex flex-column overflow-hidden br-4 p-3"
            v-for="(item, key) in store.view.emotion.record.last" :key="`record-${key}`"
            :style="`background: url('${item.src}') no-repeat center center / cover;`">
            <h5 class="fw-bold color-white">{{ item.label }}</h5>
            <div class="d-flex mt-auto justify-content-between">
              <a-tooltip color="rgba(0,82,217,0.8)">
                <template #title>
                  <div class="d-flex flex-column color-white">
                    <small class="fw-500 me-2">Upload Date</small>
                    <span>{{ new Date(item.uploadTs * 1000).toLocaleString() }}</span>
                  </div>
                </template>
                <div class="d-flex align-items-center bg-primary br-2 p-2 linker">
                  <component class="zoom-40 me-2" :is="store.constants.emojis[item.emotion]?.active" />
                  <span class="color-white fw-500 text-capitalize pe-1">#{{ item.emotion }}</span>
                </div>
              </a-tooltip>
              <div v-if="!(!item.tarot.validated && item.tarot.expired)"
                class="d-flex align-items-center justify-content-center flex-shrink-0 br-5 w-48 border-primary bg-primary color-white linker"
                @click="() => {
                  store.method.emotion.showTarotModal({
                    isUpright: item.tarot.isUpright,
                    id: item.tarot.id,
                    parse: item.tarot.parse,
                    emotionId: item.id,
                    validated: item.tarot.validated,
                    expired: item.tarot.expired,
                    ts: item.uploadTs
                  })
                }">
                <iTarot />
              </div>
            </div>
          </li>
        </ul>
        <div class="d-flex my-5 justify-content-center">
          <a-pagination v-model:current="store.view.emotion.record.pagination.current"
            :total="store.view.emotion.record.pagination.total"
            :pageSize="store.view.emotion.record.pagination.size"
            @change="() => store.req.userEmotionHistory()"
            show-less-items size="small"/>
        </div>
      </Busy>
    </div>
  </div>

  <!-- <div class="container-fluid position-fixed fixed-bottom p-3 p-md-4 bg-white shadow d-md-none">
    <a-button disabled class="br-5 fw-bold col-12 mb-2" type="primary">
      <iUpload class="me-2" />Upload today photo
    </a-button>
  </div> -->

  <ModalPrivacyAgreement v-model:open="store.view.emotion.upload.agreement.open" />
  <ModalUploadedRating v-model:open="store.view.emotion.share.open" />
  <ModalTarotParse v-model:open="store.view.emotion.tarot.open" />
  <ModalEmotionCamera v-model:open="store.view.emotion.camera.open" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  iViewUploadPhoto,
  iUpload,
  iQuestionCircle,
  iInfoCircle,
  iTarot,
  iImage,
  iCamera
} from '../components/icons'
import { store } from '@/store'

onMounted(() => {
  store.method.emotion.onInit()
})

</script>

<style scoped lang="scss">
.select-emoji {
  ul {
    li {
      > div {
        position: relative;
        transition: all 0.3s;
        background-color: #fff;
        svg {
          opacity: 1;
          &:first-child {
            position: absolute;
          }
        }
      }

      &:hover,
      &.curr {
        > div {
          background-color: #f0f0f0;
          svg {
            &:first-child {
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
.record {
  ul {
    li {
      height: 260px;
    }
  }
}
</style>