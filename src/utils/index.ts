export const ObjectProto = Object.prototype
export const ObjectToString = ObjectProto.toString
const hasOwnProperty = ObjectProto.hasOwnProperty

/**
 * 检查对象是否有该 key
 * @param {Object} obj
 * @param {string} key
 * @return {boolean}
 */
export const hasOwn = (obj: any, key: string): boolean => hasOwnProperty.call(obj, key)


/**
 * 获得内置类型名称
 * @param	{*} val
 * @return {string}
 */
export const baseTag = (val: any): string => ObjectToString.call(val)

/**
 * 是否是一个原型对象
 * 	- 纯 js 对象
 * @param {*} val
 * @return {boolean}
 */
export const isPlainObject = (val: any): boolean => baseTag(val) === '[object Object]'

/**
 * 是否为类对象
 * - true 对象、regexp、函数对象的其他对象，array、除宿主
 * - false function、null、undefined及其他基础数据类型 * @static
 * @param {*} val
 * @return {boolean}
 */
export const isObjectLike = (val: any): boolean => !!val && typeof val === 'object'

/**
 * 是否为数组类型
 * - true array、Array.prototype
 * @param {*} val
 * @return {boolean}
 */
export const isArray = Array.isArray // IE9+，ES5.1


/**
 * 遍历集合
 * - 对于 null、undefined 不做任何处理
 * @param {Object|Array|undefined} obj
 * @param {Function} callback callback( val, idx/key, arr/obj )
 */
export const forEach = (obj: any, callback: (val: any, idx: string | number, obj: any) => any) => {
  if (obj == null) return false

  // 将非对象类型转为对象
  if (!isObjectLike(obj)) {
    obj = [obj]
  }

  if (isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      callback.call(null, obj[i], i, obj)
    }
  } else {
    for (const key in obj) {
      if (hasOwn(obj, key)) {
        callback.call(null, obj[key], key, obj)
      }
    }
  }
}

/**
 * 递归深合并目标对象并返回
 * - 最后一个参数优先级最高
 */
export function merge(target: any, ...objs: any[]) {
  function assignValue(val: any, key: string | number) {
    if (isPlainObject(val)) {
      if (isPlainObject(target[key])) {
        target[key] = merge(target[key], val)
      } else {
        target[key] = merge({}, val)
      }
    } else {
      target[key] = val
    }
  }

  for (let i = 0, l = objs.length; i < l; i++) {
    forEach(objs[i], assignValue)
  }

  return target
}

/* Window */
export const hasWindowSupport = typeof window !== 'undefined'
/**
 * 原生 window
 * @type   {Object}
 */
export const nativeWindow = hasWindowSupport ? window : null
export const nativeLocation = nativeWindow?.location || {}

export const nativeSessionStorage = nativeWindow?.sessionStorage
export const nativeLocalStorage = nativeWindow?.localStorage
export const nativeJsonStringify = JSON.stringify
export const nativeJsonParse = JSON.parse


/**
 * baseArrayEach
 * - 可断言的 forEach
 * @param {Array} arr
 * @param {!Function} iteratee 迭代器
 * @return {Array} 返回自身
 */
function baseArrayEach(arr: Array<any>, iteratee: (item: any, idx: number, arr: Array<any>) => boolean) {
  const len = arr.length
  let idx = 0

  while (idx < len) {
    if (iteratee(arr[idx], idx++, arr) === false) {
      break
    }
  }

  return arr
}

export const nativeObjectKeys = Object.keys

/**
 * 返回由对象自身可枚举属性名的数组
 * - 如果不符合条件，则返回空数组
 * @param {*} val
 * @return {!Array}
 */
export const keys = (val: any) =>
  // NOTE: 解决 ES5 中 原生 Object.keys() 不会强制转换为 Object 的现象
  nativeObjectKeys(Object(val))

/**
 * baseStorage
 * @param {Object} storage
 * @return {!Object}
 */
function baseStorage(storage: any) {
  return {
    /**
     * 写入
     * @param {(Object|string)} key
     * @param {*} val
     */
    set(key: string | undefined, val: any) {
      if (!key) return

      if (typeof key === 'object') {
        const arr = keys(key)
        let val = ''
        let idx = arr.length

        while (idx--) {
          val = nativeJsonStringify(key[arr[idx]])
          // 排除 undefined、null
          storage.setItem(arr[idx], val != null ? val : '')
        }
      } else {
        storage.setItem(key, nativeJsonStringify(val))
      }
    },

    /**
     * 读取
     * - 需要注意，获取时要 .data 才是最终数据
     * @param {(Object|string)} key
     * @return {*}
     */
    get(key: string | Array<string> | undefined): { [k: string]: string } | Array<string> | string {
      let val = ''

      if (!key) return val

      if (isArray(key)) {
        const result: { [k: string]: any} = {}
        let idx = key.length
        let sub = ''

        while (idx--) {
          sub = key[idx]
          val = nativeJsonParse(storage.getItem(sub))

          result[sub] = val != null ? val : ''
        }
        return result
      } else {
        val = nativeJsonParse(storage.getItem(key))

        return val != null ? val : ''
      }
    },

    /**
     * 删除指定的 key
     * @param {(Array|string)} key
     */
    remove(key: string | Array<string> | undefined) {
      if (!key) return

      if (Array.isArray(key)) {
        baseArrayEach(key, storage.removeItem)
      } else {
        storage.removeItem(key)
      }
    },

    /**
     * 清掉对应 storage 的所有缓存
     */
    clear() {
      storage.clear()
    },
  }
}

export const localStorage = baseStorage(nativeLocalStorage)
export const sessionStorage = baseStorage(nativeSessionStorage)

export function maskingAddress(address: string): string {
  return address
    ? address.replace(address.substring(5, address.length - 4), '...')
    : ''
}

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}

export const dealImage = async (base64: string, w: number, quality: number = 0.75): Promise<string> => {
  return new Promise((resolve, reject) => {
    var newImage = new Image();
    newImage.src = base64;
    newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
    var imgWidth, imgHeight;

    newImage.onload = () => {
      imgWidth = newImage.width;
      imgHeight = newImage.height;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      if (Math.max(imgWidth, imgHeight) > w) {
        if (imgWidth > imgHeight) {
          canvas.width = w;
          canvas.height = w * imgHeight / imgWidth;
        } else {
          canvas.height = w;
          canvas.width = w * imgWidth / imgHeight;
        }
      } else {
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        quality = 0.6;
      }

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(newImage, 0, 0, canvas.width, canvas.height);
      base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
      // // 如想确保图片压缩到自己想要的尺寸,如要求在50-150kb之间，请加以下语句，quality初始值根据情况自定
      // while (base64.length / 1024 > 150) {
      // 	quality -= 0.01;
      // 	base64 = canvas.toDataURL("image/jpeg", quality);
      // }
      // // 防止最后一次压缩低于最低尺寸，只要quality递减合理，无需考虑
      // while (base64.length / 1024 < 50) {
      // 	quality += 0.001;
      // 	base64 = canvas.toDataURL("image/jpeg", quality);
      // }

      resolve(base64)
    }
  })
}

export const formatNumber = (val: string | number): string => {
  const list = (val + '').split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''

  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }

  if (num) {
    result = num + result
  }

  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}



/**
 * 执行无限循环
 * - 会先执行1次
 * - callback 返回 true 则会中断
 */
export const infiniteLoop = async (
  callback: (accumulate: number) => Promise<void | boolean>,
  ms: number = 1000,
  infinite: boolean = true,
  loop: number = 10,
  accumulate: number = 0, // 累加计数器的起始索引
): Promise<any> => {
  let timer: any
  const clear = await callback(accumulate)

  !infinite && loop--

  if (infinite || loop > 0) {
    timer = setTimeout(async () => {
      clear !== true && infiniteLoop(callback, ms, infinite, loop, ++accumulate)
    }, ms)
  }

  return {
    cancel: () => {
      clearTimeout(timer)
    },
  }
}


export const desensitize = (
  val: string,
  { prePlainLength = 2, postPlainLength = 2, maskLength = 4, maskSymbol = '*' } = {},
) => {
  const reg = new RegExp(`(.{${prePlainLength}})(.*)(.{${postPlainLength}})`)

  return (val || '').replace(reg, (match, before, maskPart, after) => {
    return `${before}${maskLength > 0
      ? maskSymbol.repeat(maskLength)
      : maskPart
        .split('')
        .map(() => maskSymbol)
        .join('')
      }${after}`
  })
}

export const addressShortener = (val: string = ''): string =>
  desensitize(val, { prePlainLength: 6, postPlainLength: 4, maskLength: 3, maskSymbol: '.' })


export const nativeDate = Date

const nativeNow = nativeDate.now
/**
 * 获得当前的毫秒时间戳
 * @return {number}
 */
export const now = nativeNow

export const nativeNavigator = navigator

export const nativeUserAgent = nativeNavigator.userAgent

export const isIOS = /iPhone|iPad|iPod/.test(nativeUserAgent)
export const isAndroid = /Android/.test(nativeUserAgent)
export const isBlackBerry = /BlackBerry/.test(nativeUserAgent)
export const isWindowsPhone = /Windows Phone/.test(nativeUserAgent)

export const isMobile = isIOS || isAndroid || isBlackBerry || isWindowsPhone
