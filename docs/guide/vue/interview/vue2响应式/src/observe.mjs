import { def, hasProto } from './utils.mjs'
import { arrayMethods } from './array.mjs'
import  Dep  from './dep.mjs'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

// 数据响应式
export function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  let ob
  if (typeof data.__ob__ !== 'undefined') { // 判断是否已经是一个响应式数据
    ob = data.__ob__
  } else {
    ob = new Observer(data)
  }
  return ob
}

// 数据劫持
export function defineReactive(obj, key, val) {
  const dep = new Dep() // 每个属性都有一个dep

  let childOb = observe(val) // 默认 递归处理
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(key,'get>>> ', val)
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newVal) {
      console.log(key,'set>>> ', val, newVal)
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return
      }
      val = newVal
      childOb = observe(newVal) // 新值也需要响应式处理
      dep.notify()
    }
  })
}

class Observer {
  constructor(data) {
    this.dep = new Dep()
    this.value = data
    def(data, '__ob__', this)
    if (Array.isArray(data)) {
      // 针对数组处理
      if (hasProto) {
        protoAugment(data, arrayMethods)
      } else {
        copyAugment(data, arrayMethods, arrayKeys)
      }
      this.observeArray(data)
    } else {
      this.walk(data)
    }
    
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
  observeArray(items) {
    items.forEach(item => {
      observe(item)
    })
  }
}

function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

function protoAugment (target, src) {
  target.__proto__ = src
}