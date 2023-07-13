---
title: Vue3源码
titleTemplate: Effect
---

## 前言 {#前言}

**主题**： 本文将深入探讨[Vue3.2.47](https://github.com/vuejs/core/tree/v3.2.47)中**effect**的实现

**内容**： 本文将分为3个部分：首先是介绍及使用，然后是源码阅读，最后是总结及注意事项

**目的**： 手模手深入学习**effect**原理，方便开发排问题及面试派上用场😁

* * *

**阅读先知**

-   示例代码：基于[nuxt3](https://juejin.cn/post/7204471695544336439),所以里面使用的方法均不需要导出
-   gif 工具: [LICEcap](https://www.cockos.com/licecap/) 免费的还可以
-   源码版本：[3.2.47](https://github.com/vuejs/core/tree/v3.2.47)
-   对响应式系统不太熟悉的可以先参考以下几篇文章


## 一、effect介绍 {#一、effect介绍}

#### 1. effect是什么？

回答这个问题之前：我们需要对vue的[响应式系统](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html)有一定的了解。**effec**是响应式系统的核心api之一，主要负责收集依赖、更新依赖。其本质是一个封装了具有响应式依赖的函数，可以通过**effect**函数将传入的函数转为**副作用函数**。那么这个**副作用函数**会在定义时就会执行一次，并且副作用函数会在dom更新、响应式数据改变时执行。

简单理解为：加强版的**watch**, **watch** 是监听某个响应式对象或者属性发生改变时，执行回调，而**effect**是所有依赖改变它都会执行回调，和react中的useEffect 传入空数组很像。定义很空洞，接下来我们来使用一下**effect**

#### 2. effect怎么的使用？

**参数**：第一个是副作用函数，第二个是个对象: '{scope,lazy,scheduler,allowRecurse，onStop}'

**副作用函数**：声明会默认执行一下（取消：在第二个参数传入lazy: true, ），依赖更新新也会执行

**返回值**：ReactiveEffect对象，可以用来停止监听，或重新调用

```typescript
<template>
  <div>
    <div>count: {{ count }}</div>
    <button @click="count++">修改 count</button>
  </div>
</template>
<script lang="ts" setup>
let num = 0;
const count = ref(0);
effect(() => {
  console.log("effect 回调执行", ++num);
  return count.value * 2;
});
</script>
```

**默认执行第一次**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/116abb2c778042ea9a5282b3a2bd8744~tplv-k3u1fbpfcp-zoom-1.image)

**取消第一次的执行**

```typescript
effect(() => {
  console.log("effect 回调执行", ++num);
  return count.value * 2;
},{
    lazy: true
});
```

当我修改count 的值时：点击一次按钮，副作用函数就会执行一次，这是因为 count 这个依赖项发生了改变，effect 的副作用函数就会执行

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4009a18a56944bed92559160dde65f62~tplv-k3u1fbpfcp-zoom-1.image)

**手动触发副作用函数** 和 **停止自动监听副作用函数**

```typescript
<template>
  <div>
    <div>count: {{ count }}</div>
    <button @click="count++">修改 count</button>
    <button @click="effectCb">手动触发effect</button>
    <button @click="effectCb.effect.stop">停止监听effect</button>
  </div>
</template>

<script lang="ts" setup>
let num = 0;
const count = ref(0);
const effectCb = effect(() => {
  console.log("effect 回调执行", ++num);
  return count.value * 2;
});
</script>
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c48fa6d41021479d8430ef57eb1380c9~tplv-k3u1fbpfcp-zoom-1.image)

  


#### 3. 为什么使用effect?

相信看到这里 已经很能体现**effect**的强大之处了，它的功能远不止于此，在vue响应式系统中扮演了更为重要的角色：响应式数据被读取时收集依赖，并在响应式数据改变时重新运行。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc053e33ed884fbfbc5adf28753defcc~tplv-k3u1fbpfcp-zoom-1.image)

上图是effect副作用函数的执行流程，接下来上主菜👻

## 二、effect源码 {#二、effect源码}

[源码地址](https://github.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/effect.ts)

#### effect 主函数

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/effect.ts#L170-L189
export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions
): ReactiveEffectRunner {
  if ((fn as ReactiveEffectRunner).effect) {
  	// fn 嵌套了 effect ==>> effect(() => {efect(fn)})
    // 判断 fn 是否已经是 被包装过后的 effect 是则取出 fn
    fn = (fn as ReactiveEffectRunner).effect.fn
  }
  // 实例化 ReactiveEffect 
  const _effect = new ReactiveEffect(fn)
  if (options) {
    // 把option 浅拷贝到 _effect 身上
    extend(_effect, options) // Object.assign(_effect,options)
    if (options.scope) recordEffectScope(_effect, options.scope) // 记录 effect 作用域
  }
  if (!options || !options.lazy) { // 没有传option 或者 option.lazy 为false
    _effect.run() // 调用run ==> 直接执行 fn()
    // 这里就是为什么我们定义一个effect 传入的副作用函数会立马执行的原因
  }
  // 通过bind 改变 _effect this 指向，并返回新函数
  // 为了确保 我们在外面调用 runner this指向的正确性   
  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  // runner的effect 赋值为 _effect
  runner.effect = _effect
  return runner
}
```

#### ReactiveEffect：effect函数的实现类

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/effect.ts#L53-L140
export class ReactiveEffect<T = any> {
  active = true // 标记为激活状态
  deps: Dep[] = [] // 保存了该ReactiveEffect 所依赖的所有响应式对象的 Dep 对象。
  parent: ReactiveEffect | undefined = undefined // 父级 effect


  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T> // 标记为computed
  /**
   * @internal
   */
  allowRecurse?: boolean // 允许 递归调用
  /**
   * @internal
   */
  private deferStop?: boolean // 延迟停止正执行的effect


  onStop?: () => void // 停止监听
  // dev only 开发环境 依赖收集 触发回调
  onTrack?: (event: DebuggerEvent) => void
  // dev only 开发环境 依赖改变 触发回调
  onTrigger?: (event: DebuggerEvent) => void


  constructor(
    public fn: () => T, // 传入的fn
    public scheduler: EffectScheduler | null = null, // 传入的调度器
    scope?: EffectScope // 作用域对象
  ) {
    // 记录 该副作用所属的作用域
    recordEffectScope(this, scope)
  }

	// run函数: lazy 为false 直接调的 _effect.run
  run() {
    // active 为false 说明响应副作用已经被停止
    if (!this.active) {
      // 直接调用并返回 传入的fn 的执行结果
      return this.fn()
    }
    // parent 赋值 activeEffect：正在执行的副作用
    let parent: ReactiveEffect | undefined = activeEffect
    // shouldTrack 为全局的变量：当前副作用是否需要被追踪
    let lastShouldTrack = shouldTrack
    // 遍历 parent
    while (parent) {
      if (parent === this) { // 当前副作用 已在父副作用链 中，存在循环依赖
        // 确保不会在当前作用域中递归执行同一个副作用函数
        return
      }
      parent = parent.parent
    }
    try {
      this.parent = activeEffect
      activeEffect = this
      shouldTrack = true

    	// effectTrackDepth 表示当前副作用嵌套深度。
      trackOpBit = 1 << ++effectTrackDepth // 1 << 1  => 0010
    	// 4 << 1 => 4 的二进制表示向左移动 1 位，得到二进制数 1000，即十进制数 8
      
    	// 小于 30
      if (effectTrackDepth <= maxMarkerBits) {
        // 初始化依赖标记，用于检测依赖是否变化。
        initDepMarkers(this)
      } else {
        // 清除 依赖关系
        cleanupEffect(this)
      }
      return this.fn()
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        // 最后的依赖关系处理
        finalizeDepMarkers(this)
      }

      trackOpBit = 1 << --effectTrackDepth
      
      activeEffect = this.parent
      shouldTrack = lastShouldTrack
      this.parent = undefined

      if (this.deferStop) { // 延迟停止正执行的 effect
        this.stop()
      }
    }
  }

	// 停止 effect
  stop() {
    // stopped while running itself - defer the cleanup
    if (activeEffect === this) {
      // 该 effect 正执行， deferStop标记为true
      this.deferStop = true
    } else if (this.active) {
       // 清理该effect 身上的依赖关系
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      // 最后将 激活状态设置为false
      this.active = false
    }
  }
}

// 监听被停止 清理 effect 身上的所有依赖关系
function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect
  if (deps.length) {
		// 遍历 当前 effect对象的所有 deps 
    for (let i = 0; i < deps.length; i++) {
      // 从每个依赖项中清除 effect
      // 清除之后 依赖项改变时 不再进行
      deps[i].delete(effect)
    }
    // 清空 deps 
    deps.length = 0
  }
}
```

**recordEffectScope**：是记录该副作用，在activeEffectScope对象的effects 数组中添加该 effect

```typescript
export function recordEffectScope(
  effect: ReactiveEffect,
  scope: EffectScope | undefined = activeEffectScope
) {
  if (scope && scope.active) {
    scope.effects.push(effect)
  }
}
```

**initDepMarkers**：标记 deps 数组中的每个依赖项 为已被追踪

```typescript
export const initDepMarkers = ({ deps }: ReactiveEffect) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit // set was tracked
    }
  }
}
```

**finalizeDepMarkers：** 进行最后的依赖关系标记

```typescript
export const finalizeDepMarkers = (effect: ReactiveEffect) => {
  const { deps } = effect // 从effect 对象中拿到 deps 所有依赖
  if (deps.length) {
    let ptr = 0 // 截断标记
    // 遍历每一个依赖
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i] 
      // 已经被追踪过  && 现在没有被追踪
      if (wasTracked(dep) && !newTracked(dep)) {
        // 这个依赖项在之前的触发中被使用过，但在当前的触发中没有被使用过，因此不需要再次触发它的回调函数
        dep.delete(effect)
      } else {
        // 有效的依赖从 0 开始被放入 deps中
        deps[ptr++] = dep
      }
      // clear bits 清除依赖项的追踪标记
      dep.w &= ~trackOpBit
      dep.n &= ~trackOpBit
    }
    deps.length = ptr
  }
}
```

#### track 依赖收集

在响应式数据被访问时触发get拦截，调用track 进行依赖收集

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/effect.ts#L213-L230
export function track(target: object, type: TrackOpTypes, key: unknown) {
  if (shouldTrack && activeEffect) { // activeEffect 当前的effect 
    let depsMap = targetMap.get(target) // 通过target 找到 对应的 Map 
    if (!depsMap) { // 不存在则 new Map 设置到全局 targetMap
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key) // 通过key 找到Map 中的Set 集合
    if (!dep) { // map 不存在 new Set()
      /*
      export const createDep = (effects?: ReactiveEffect[]): Dep => {
        const dep = new Set<ReactiveEffect>(effects) as Dep
        dep.w = 0 // 标记是否被追踪
        dep.n = 0 // 是否是新依赖
        return dep
      }
      */
      depsMap.set(key, (dep = createDep()))
    }


    const eventInfo = __DEV__
      ? { effect: activeEffect, target, type, key }
      : undefined

  	// dep : Set集合
    trackEffects(dep, eventInfo)
  }
}

export function trackEffects(
  dep: Dep,
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  let shouldTrack = false
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit // set newly tracked
      shouldTrack = !wasTracked(dep)
    }
  } else {
    // Full cleanup mode.
    shouldTrack = !dep.has(activeEffect!)
  }

  if (shouldTrack) {
    dep.add(activeEffect!) // 把 activeEffect 添加到 dep(存effect的Set集合)
    activeEffect!.deps.push(dep) // 是为了 effect执行完通过依赖列表清理无用的依赖
    if (__DEV__ && activeEffect!.onTrack) {
      activeEffect!.onTrack({
        effect: activeEffect!,
        ...debuggerEventExtraInfo!
      })
    }
  }
}
```

#### trigger 通知更新（执行effect）

响应式数据被修改时，通知所以使用到该数据的地方，重新执行effect

```typescript
export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  // 在全局的 targetMap 查找，，没有，直接返回，说明依赖没有被追踪，不是响应式数据
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // never been tracked
    return
  }


  let deps: (Dep | undefined)[] = [] // 存储 所有与修改属性相关的 Dep
  if (type === TriggerOpTypes.CLEAR) { // clear
    // collection being cleared
    // trigger all effects for target
    deps = [...depsMap.values()] // 所有
  } else if (key === 'length' && isArray(target)) { // 修改数组的length=> arr.length = x
    const newLength = Number(newValue)
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= newLength) {
        deps.push(dep) // 所有
      }
    })
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) { // key !== undefined
      deps.push(depsMap.get(key)) // 通过key 在 Map中找
    }


    // also run for iteration key on ADD | DELETE | Map.SET
    switch (type) {
      case TriggerOpTypes.ADD: // 添加
        if (!isArray(target)) {
          // ITERATE_KEY = Symbol(__DEV__ ? 'iterate' : '')
          deps.push(depsMap.get(ITERATE_KEY)) 
          if (isMap(target)) {
            // Symbol(__DEV__ ? 'Map key iterate' : '')
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        } else if (isIntegerKey(key)) { // 下标
          // new index added to array -> length changes
          deps.push(depsMap.get('length'))
        }
        break
      case TriggerOpTypes.DELETE: // 删除
        if (!isArray(target)) { // 非数组
          // ITERATE_KEY = Symbol(__DEV__ ? 'iterate' : '')
          deps.push(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            // Symbol(__DEV__ ? 'Map key iterate' : '')
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        }
        break
      case TriggerOpTypes.SET: // set 说明是Map
        if (isMap(target)) { // 判断是否是map
          deps.push(depsMap.get(ITERATE_KEY))
        }
        break
    }
  }


  const eventInfo = __DEV__
    ? { target, type, key, newValue, oldValue, oldTarget }
    : undefined


  if (deps.length === 1) { // 长度为1 直接处理
    if (deps[0]) {
      if (__DEV__) {
        triggerEffects(deps[0], eventInfo)
      } else {
        triggerEffects(deps[0])
      }
    }
  } else { // 长度大于1 
    // effects 所有 effect
    const effects: ReactiveEffect[] = []
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep)
      }
    }
    if (__DEV__) {
      /*
      export const createDep = (effects?: ReactiveEffect[]): Dep => {
        const dep = new Set<ReactiveEffect>(effects) as Dep
        dep.w = 0
        dep.n = 0
        return dep
      }
      */
      triggerEffects(createDep(effects), eventInfo)
    } else {
      // 遍历 effects数组
      triggerEffects(createDep(effects))
    }
  }
}


export function triggerEffects(
  dep: Dep | ReactiveEffect[],
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  // spread into array for stabilization
  const effects = isArray(dep) ? dep : [...dep]
  // 先触发计算属性的副作用函数，再触发响应式数据的副作用函数
  // 因为计算属性的副作用函数可能会修改响应式数据，所以先触发计算属性的副作用函数可以保证数据已经被更新到最新值。
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo)
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo)
    }
  }
}

// 追踪的执行 effec 副作用函数
function triggerEffect(
  effect: ReactiveEffect,
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (__DEV__ && effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
    }
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}
```

## 总结 {#总结}

1、effect 的作用

-   effect 是响应式数据和副作用函数之间的桥梁
-   响应式数据被读取时，触发get => track => effect 会被添加到该数据的依赖列表中
-   响应式数据被修改时，触发set => trigger=>与之关联的所有effect被重新执行

2、effete 被存储

```typescript
// 全局的WeakMap
const targetMap = new WeakMap()
const deps = new Map() 
target.set(target, deps)
const effects = new Set() 
deps.set(key, effects) // 一个key 对应一个Dep 【Map】
effects.add(effect) // 依赖集合 【Set】
```

3、effect 被创建

-   手动使用 effect时 (之前官方有介绍：主要服务于库的作者，已移出api文档，所以一般业务不用，需要监听操作考虑watch\watchEffect)
-   创建 watch 和 watchEffect 时会隐式创建effect
-   模板中使用响应式对象
