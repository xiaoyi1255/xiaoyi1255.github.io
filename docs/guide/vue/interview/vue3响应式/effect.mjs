
let activeEffect
const trackMap = new WeakMap();
const effectStack = [] // 解决effect嵌套 不必要触发的问题
/**
 * effectStack => 解决effect嵌套 不必要触发的问题
 * effect(() => {
  let a = state.count ? state.name : '123'
  console.log('外层effect',a)
  effect(() => {
    let b = state.info.address
    console.log('内层effect',b)
  })
})
  理想情况下：
  外层的effect 改变，内外都会触发
  内层的effect 改变，只有内层会触发
 */

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    effectStack.push(effectFn)
    const res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  effectFn.deps = []
  effectFn.options = options
  activeEffect = null
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
}


function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

// 收集依赖 
function track(target, key) {
  if (!activeEffect) return
  let depsMap = trackMap.get(target)
  if (!depsMap) {
    trackMap.set(target, depsMap = new Map())
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, deps = new Set())
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

// 触发 副作用函数
function trigger(target, key) {
  const depsMap = trackMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  const newDeps = new Set() // 避免无限循环
  deps && deps.forEach(effect => {
    if (effect !== activeEffect) { // 避免自增、自减时引起无限循环
      newDeps.add(effect)
    }
  })
  newDeps.forEach(effect =>  {
    if (effect.options.scheduler){
      console.log('effect.options.scheduler')
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  })
}

export {
  track,
  trigger,
  effect,
  activeEffect
}