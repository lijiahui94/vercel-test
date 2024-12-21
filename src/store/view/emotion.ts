import { merge } from '@/utils'

import { constants } from '@/store/constants'

type TEmotion = {
  upload: {
    fileList: Array<any>
    error: boolean
    errorMessage: string
    finished: boolean
    accept: string
    maxCount: number
    fileLimitByte: number
    preview: string
    readonly hasPreview: boolean
    readonly hasFile: boolean
    readonly fileLimitMB: number
    readonly doneSuccess: boolean

    uploading: boolean
    done: boolean
    percent: number

    agreement: {
      isRead: boolean
      open: boolean
    }
    emojis: Array<{
      label: string
      default: any
      active: any
    }>
    cloudPhotoEmotion: string
    cloudPhotoUrl: string
    reset: () => void
  }
  share: {
    open: boolean
    lv: number
  }
  tarot: {
    open: boolean
    curr: {
      tweetUrl: string
      ts: number
      isUpright: boolean
      id: number
      emotionId: number
      parse: string
      validated: boolean
      expired: boolean
    }
    readonly hasCurr: boolean
    readonly hasParse: boolean
    reset: () => void
    catalogs: Record<number, {id: number, name: string}>
  }
  record: {
    list: Array<{ label: string }>
    last: Array<{ label: string }>
    _last: Array<{ label: string }>
    pagination: {
      size: number
      current: number
      total: number
      isEnd: boolean
      isFirst: boolean
      isLast: boolean
      count: number
      prev: () => void
      next: () => void
    }
    reset: () => void
  }
  camera: {
    init: boolean
    open: boolean
    filming: boolean
    errorMessage: string
    readonly error: boolean
    videoInputs: Record<string, { deviceId: string, label: string }>
    videoInputDeviceId: string
    readonly hasVideoInput: boolean
    videoScreen: HTMLVideoElement | null
    isFrontBackCameraDevice: boolean
    canvas: HTMLCanvasElement | null
    base64: string
    facingMode: string
    switchFacingMode: () => void
    reset: () => void
  }
  reset: () => void
}

const DEFAULTS_UPLOAD_CACHE = {
  fileList: [],
  percent: 0,
  preview: '',
  error: false,
  errorMessage: '',
  cloudPhotoEmotion: '',
  cloudPhotoUrl: '',
  finished: false, // 完成整个流程
  uploading: false,
  done: false // 上传完成后，则为 true
}

const DEFAULTS = {
  upload: {
    accept: 'image/png, image/jpeg, image/jpg',
    maxCount: 1,
    fileLimitByte: 20971520, // 文件限制字节
    agreement: {
      isRead: false,
      open: false
    },
    ...DEFAULTS_UPLOAD_CACHE
  },
  share: {
    open: false,
    lv: 3
  },
  tarot: {
    open: false,
    curr: {
      tweetUrl: '',
      ts: 0,
      isUpright: false,
      id: 0,
      emotionId: 0,
      parse: '',
      validated: false,
      expired: false
    },
    catalogs: {}
  },
  record: {
    list: [],
    _last: [],
    pagination: {
      size: 9,
      current: 1,
      total: 0,
      isEnd: false,
    }
  },
  camera: {
    init: true,
    open: false,
    filming: true, // 拍摄状态
    errorMessage: '',
    videoInputs: {},
    videoInputDeviceId: '',
    videoScreen: null,
    isFrontBackCameraDevice: false, // 是否为前后摄像头设备
    canvas: null,
    base64: '',
    facingMode: 'user'
  },
}

const emotion: TEmotion = {
  upload: {
    ...DEFAULTS.upload,
    // NOTE: 通用拍摄和上传
    get hasPreview () {
      const { preview } = this

      return !!preview
    },
    get hasFile () {
      const { fileList } = this

      return !!fileList.length
    },
    get fileLimitMB () {
      const { fileLimitByte } = this

      return fileLimitByte / 1048576
    },
    get doneSuccess () {
      const { error, done, cloudPhotoEmotion } = this

      return !error && done && !!cloudPhotoEmotion
    },
    emojis: [
      { ...constants.emojis.happy },
      { ...constants.emojis.sad },
      { ...constants.emojis.angry },
      { ...constants.emojis.confused },
      { ...constants.emojis.disgusted },
      { ...constants.emojis.surprised },
      { ...constants.emojis.calm },
      { ...constants.emojis.fear },
      { ...constants.emojis.unknown },
    ],
    reset () {
      merge(this, DEFAULTS_UPLOAD_CACHE)
    }
  },

  share: {
    ...DEFAULTS.share
  },

  tarot: {
    ...DEFAULTS.tarot,
    get hasCurr() {
      const { id } = this.curr

      return id > 0
    },
    get hasParse() {
      const { parse } = this.curr

      return !!parse
    },
    reset () {
      merge(this, DEFAULTS.tarot)
    }
  },
  record: {
    ...DEFAULTS.record,

    // 最后请求的
    get last() {
      return this._last
    },
    set last(val) {
      const result = this._last = val

      // update
      this.list = this.list.concat(result)
    },

    pagination: {
      ...DEFAULTS.record.pagination,

      get isFirst() {
        return this.current <= 1
      },
      get isLast() {
        return this.current >= this.count
      },
      get count() {
        const { total, size } = this

        return Math.ceil(total / size || 1)
      },
      prev() {
        !this.isFirst
          && this.current--
      },
      next() {
        !this.isLast
          && this.current++
      }
    },
    reset() {
      merge(this, DEFAULTS.record)
    }
  },
  camera: {
    ...DEFAULTS.camera,

    get error () {
      const { errorMessage } = this

      return !!errorMessage
    },
    get hasVideoInput () {
      const { videoInputs } = this

      return !!Object.keys(videoInputs).length
    },
    switchFacingMode() {
      const { facingMode } = this

      this.facingMode = facingMode === 'user' ? 'environment' : 'user'
    },
    reset() {
      merge(this, DEFAULTS.camera)
    }
  },
  reset() {
    this.upload.reset()
    this.record.reset()
    this.tarot.reset()
    this.camera.reset()
  }
}

export default emotion
