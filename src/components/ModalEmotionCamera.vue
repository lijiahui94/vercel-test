<template>
  <a-modal v-model:open="open" :width="modealWidth" :centered="true" :maskClosable="true" :closable="false" :destroyOnClose="true"
    wrapClassName="modal-camera">
    <div class="d-flex flex-column bg-black br-4 overflow-hidden">
      <div class="d-flex mb-4 mt-3 mt-md-2 justify-content-between align-items-center px-4 pt-3">
        <h5 class="fw-500 col color-white">Take a picture</h5>
        <div class="linker color-white" @click="handleClose"><iClose /></div>
      </div>

      <div class="camera d-flex flex-column align-items-center position-relative overflow-hidden mx-3 mb-3 br-3"
        :style="{ 'max-width': `${videoWidth}px`, 'max-height': `${videoHeight}px` }">
        <canvas ref="canvas" class="w-full position-absolute full overflow-hidden" />
        <video v-if="store.view.emotion.camera.filming" ref="videoScreen" class="full" />
        <div class="consoles d=flex position-absolute">
          <a-alert v-if="store.view.emotion.camera.error" class="p-2 mb-4" :message="store.view.emotion.camera.errorMessage" type="error" show-icon />
          <div class="d-flex gap-3 justify-content-center">
            <template v-if="store.view.emotion.camera.filming">
              <!-- <button @click="() => start() ">start</button> -->
              <Busy :busy="store.view.emotion.camera.init" className="br-5 overflow-hidden">
                <span class="linker" @click="() => save()"><iShutter class="color-white w-40"/></span>
              </Busy>
            </template>
            <template v-else>
              <div class="hover-white br-3 px-3 py-2 br-2 fw-bold" @click="() => {
                cancel()
                start()
              }" title="Retake"><iChevronLeft /></div>
              <div class="hover-white br-3 px-3 py-2 br-2 fw-bold" @click="() => done()" title="Okay">
                <iCheckCircle />
              </div>
            </template>
          </div>
          <div class="mt-3 mb-3 py-2 px-3 br-1">
            <a-select v-if="store.view.emotion.camera.hasVideoInput" size="small" class="p-0 m-0"
              popupClassName="modal-camera-devices"
              :autoClearSearchValue="false" placement="topRight" :bordered="false"
              :disabled="false" v-model:value="store.view.emotion.camera.videoInputDeviceId" @change="handleChange">
              <template #suffixIcon>
                <!-- <iChevronUp class="color-unimportant zoom-75" /> -->
              </template>
              <a-select-option v-for="item in store.view.emotion.camera.videoInputs" :value="item.deviceId">{{ item.label }}</a-select-option>
            </a-select>
            <span v-else class="color-unimportant">Video input device not found</span>
          </div>
        </div>
      </div>
    </div>
    <template #footer></template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { iClose, iShutter, iChevronLeft, iCheckCircle } from '../components/icons';
import { store } from '@/store';
import { dealImage } from '@/utils'

const open = defineModel<boolean>('open')
const modealWidth = 460
const videoWidth = modealWidth
const videoHeight = videoWidth
const videoScreen: Ref<HTMLVideoElement | undefined> = ref()
const canvas: Ref<HTMLCanvasElement | undefined> = ref()
const { camera } = store.view.emotion

watch(open, async (newVal, oldVal) => {
  if (!newVal) {
    camera.reset()
    return
  }

  await init()

  if (!camera.hasVideoInput) return
  start()
})

const handleClose = () => {
  open.value = false
}

const handleChange = (deviceId: string) => {
  // NOTE: 这里假设2个视频设备时，为手机
  if (camera.isFrontBackCameraDevice) {
    camera.switchFacingMode()
  } else {
    camera.videoInputDeviceId = deviceId
  }
  start()
}

const init = async () => {
  if (navigator.mediaDevices == null) {
    camera.errorMessage = 'DocumentUploader image capture cannot be provided over an unsecure connection.'

    return
  }

  // NOTE: 先触发一次，拉起授权
  await navigator.mediaDevices.getUserMedia({ video: true })

  const devices = await navigator.mediaDevices.enumerateDevices()
  // # TEST:
  // alert(JSON.stringify(devices))
  devices.filter(item => item.kind == 'videoinput').forEach((item, idx) => {
    const deviceId = item.deviceId

    if (item.deviceId && item.label) {
      camera.videoInputs[deviceId] = { deviceId: item.deviceId, label: item.label }
    }

    // NOTE: 判断是否为前后摄像头
    if (item.label.includes('front')) {
      camera.isFrontBackCameraDevice = true
    }

    // First default
    if (idx === 0) {
      camera.videoInputDeviceId = item.deviceId
    }
  })
}

const start = () => {
  const constraints = {
    video: {
      width: { min: videoWidth, ideal: videoWidth * 2},
      height: { min: videoHeight, ideal: videoHeight * 2},
      frameRate: { ideal: 24, max: 30 },
      facingMode: camera.facingMode
    },
    deviceId: { exact: camera.videoInputDeviceId }
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      if (!videoScreen.value) return

      videoScreen.value.srcObject = stream;
      videoScreen.value.play()
      // update
      camera.init = false
    })
    .catch((ex) => {
      camera.errorMessage = "Camera access denied"
      console.error(ex)
    })
}

const save = () => {
  capture_canvas()
}

const cancel = () => {
  if (!canvas.value) return

  const context = canvas.value.getContext('2d')
  context?.clearRect(0, 0, canvas.value.width, canvas.value.height)
  // update
  camera.filming = true
}

const done = async () => {
  if (!canvas.value) return

  const now = Date.now()

  // update
  store.view.emotion.upload.preview = await dealImage(camera.base64, 700, 0.8)
  open.value = false

  canvas.value.toBlob(async blob => {
    if (!blob) return

    const formData = new FormData()
    formData.append('image', blob, `${now}.png`)

    const { data, error } = await store.req.userEmotionUpload(formData)
  })
}

const capture_canvas = async () => {
  if (!camera.hasVideoInput || !canvas.value || !videoScreen.value) return

  const context = canvas.value.getContext('2d')
  canvas.value.width = videoScreen.value.videoWidth
  canvas.value.height = videoScreen.value.videoHeight
  context?.drawImage(videoScreen.value, 0, 0, videoScreen.value.videoWidth, videoScreen.value.videoHeight)

  // update
  camera.base64 = canvas.value.toDataURL('image/png')
  camera.filming = false
}
</script>

<style lang="scss">
.ant-modal-wrap {
  &.modal-camera {
    .ant-modal {
      // max-width: 100vw;
      .ant-modal-content {
        .ant-modal-body {
          .camera {
            min-height: 260px;
            canvas {
              top: 0;
              left: 0;
            }
            .consoles {
              bottom: 0;
              z-index: 2;
              > div {
                &:last-child {
                  background-color: rgba(0,0,0,0.5);
                }
              }

              .ant-select {
                height: 18px;
                .ant-select-selector {
                  background-color: transparent;
                  height: 20px;
                  input {
                    height: 22px;
                  }
                  .ant-select-selection-item {
                    font-size: 14px;
                    line-height: 22px;
                    color: #a1a1a1;
                    height: 22px;
                    padding: 0px;
                    // padding-right: 35px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.ant-select-dropdown {
  &.modal-camera-devices {
    padding: 8px;

    .ant-select-item {
      padding: 8px;
      min-height: 30px;
      // height:
      .ant-select-item-option-content {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}

</style>