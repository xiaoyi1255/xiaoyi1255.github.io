const buckList = new Set()
const reactiveMap = new WeakMap();
let activeEffect = null

const handler = {
  get(target, key) {
    console.log(`get ${key}`)
    if (activeEffect) {
      console.log('触发依赖收集', activeEffect)
      buckList.add(activeEffect)
    }
    const res = Reflect.get(target, key)
    return typeof res === 'object' ? reactive(res) : res
  },
  set(target, key, value) {
    const res = Reflect.set(target, key, value)
    console.log(`set ${key}`, value)
    if (buckList.size) {
      console.log('触发依赖更新', buckList)
      buckList.forEach(fn => fn())
    }
    return res
  }
}

function reactive(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if (reactiveMap.has(target)) {
    return reactiveMap.get(target)
  }
  const proxy = new Proxy(target, handler)
  reactiveMap.set(target, proxy)
  return proxy
}

function effect (fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}

export {
  reactive,
  effect
}