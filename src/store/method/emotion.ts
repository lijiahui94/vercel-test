import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { Upload } from 'ant-design-vue';

import { getBase64, dealImage, merge } from '@/utils'
import router from '@/router'

import { store } from '..'
import { view } from '@/store/view'
import { req } from '@/store/req'
import { user } from '@/store/user'
import { wallet } from '@/store/wallet'
import { method } from '../method'

export default {
  async onInit() {
    // update
    user.param.invitCode = router.currentRoute.value.params?.code as string ?? ''

    if (!(wallet.connected && wallet.signedIn)) return

    if (!user.isLogged) {
      await method.common.autoSignLogin()
      // method.common.onShareTweet()
    }

    await req.userEmotionHistory(true)
    await req.tarotList()
  },

  // async onUpload () {
  //   const formData = new FormData()
  //   const now = Date.now()
  //   const { fileList } = 

  //   formData.append('image', fileList[0], `${now}.png`)

  //   const { data, error } = await req.userEmotionUpload(formData)

  //   if (error) return

  //   
  // },

  beforeUpload (file: any) {
    const isImage = /image\/(jpg|jpeg|png)$/.test(file.type)
    const { upload } = view.emotion

    // init
    upload.reset()

    if (!isImage) {
      upload.error = true
      store.message.error(`${file.name} is not a image file.`);
    }

    const isLimitSize = file.size < view.emotion.upload.fileLimitByte

    if (!isLimitSize) {
      upload.error = true
      store.message.error(`${file.name} exceeds the ${view.emotion.upload.fileLimitMB} MB limit.`)
    }

    return (isImage && isLimitSize) || Upload.LIST_IGNORE;
    // NOTE: 转为手动上传
    // return false
  },

  onSelectEmotion (item: { label: string }) {
    const { label } = item

    // update
    view.emotion.upload.cloudPhotoEmotion = label
  },

  async handleCameraUpload () {

  },

  async handleUploadChange ({ file, fileList }: UploadChangeParam) {
    const { upload, } = view.emotion
    const files = fileList[0] as any

    if (!files.url && !files.preview) {
      const base64 = (await getBase64(files.originFileObj)) as string

      view.emotion.upload.preview = files.preview = await dealImage(base64, 700, 0.8)
    }

    switch(file.status) {
      case 'uploading':
        // sync
        upload.percent = file.percent ?? 0
        upload.uploading = true
        upload.done = false
        break
      case 'done':
        // sync
        upload.uploading = false
        upload.done = true

        if (file.response.code !== '0') {
          // sync
          upload.error = true
          upload.errorMessage = file.response.msg

          // store.message.error(file.response.msg)
        } else {
          // sync
          upload.cloudPhotoEmotion = file.response.data.emotion.toLowerCase()
          upload.cloudPhotoUrl = file.response.data.url

          // 成功不提示，会显得多余
          // store.message.success(`${file.name} file uploaded successfully.`)
        }
        break
      case 'error':
        const text = `${file.name} file upload failed.`
        // sync
        upload.error = true
        upload.errorMessage = text

        // store.message.error(text)
        break
      default:
    }
  },

  async onUploadEmotion () {
    const { data, error } = await store.req.userEmotionAdd()

    if (error) return

    store.view.emotion.share.open = true

    // update
    view.emotion.upload.finished = true
    await req.userEmotionHistory(true)
    await req.userInfo() // 更新积分
  },



  async showTarotModal (item?: { id: number, uploadTs: number, tarot: { isUpright: boolean, id: number, parse: string, expired: boolean, validated: boolean }}) {
    // NOTE: reset 会清掉所有curr 数据，但 emotionalId 在 add emotion 后需要保存
    // TODO: 要在另一个里面showTarotModal({ emotionId: store.view.emotion.tarot.curr.emotionId })
    // 然后删除下面2句
    view.emotion.tarot.curr.parse = ''
    view.emotion.tarot.curr.id = 0

    // sync
    if (item ) {
      view.emotion.tarot.reset()

      merge(view.emotion.tarot.curr, item)
    }

    view.emotion.tarot.open = true
  },

  async showCameraModal () {
    view.emotion.camera.reset()

    // sync
    view.emotion.camera.open = true
  }
}