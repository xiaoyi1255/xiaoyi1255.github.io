import { effect } from "./effect.mjs";

export function watch(source, cb, options = {}) {
  let getter
  // source 可能是函数，也可能是对象
  if (typeof source === 'function') {
    getter = source
  } else {
    getter = () => traverse(source)
  }
  let cleanup;
  function onInvalidate(fn) {
    cleanup = fn
  }
  const job = () => {
    newValue = effectFn()
    if (cleanup) cleanup() // 避免watch数据静态问题
    cb(newValue, oldValue, onInvalidate)
    oldValue = newValue
  }
  let oldValue, newValue
  const effectFn= effect(() => getter(), {
    lazy: true,
    scheduler: job,
  })
  if (options.immediate) { // 立即执行
    job()
  } else {
    oldValue = effectFn()
  }

}

function traverse(obj, seen = new Set()) {
  if (typeof obj !== 'object' || obj === null || seen.has(obj)) return;
  seen.add(obj)
  for (const key in obj) {
    traverse( obj[key], seen)
  }
  return obj
}