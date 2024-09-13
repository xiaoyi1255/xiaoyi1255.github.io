import { effect, activeEffect, track, trigger } from './effect.mjs'

const reactiveMap = new WeakMap();

const handler = {
  get(target, key) {
    console.log(`get ${key}`)
    if (activeEffect) track(target, key)
    const res = Reflect.get(target, key)
    return typeof res === 'object' ? reactive(res) : res
  },
  set(target, key, value) {
    const res = Reflect.set(target, key, value)
    console.log(`set ${key}`, value)
    trigger(target, key)
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

export {
  reactive,
  effect
}