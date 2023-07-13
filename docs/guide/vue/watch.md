---
title: Vue3源码
titleTemplate: Ref
---
## 前言 {#前言}

**主题**： 本文将深入探讨[Vue3.2.47](https://github.com/vuejs/core/tree/v3.2.47)中**watch**和**watchEffect**的实现

**内容**： 本文将分为3个部分：首先是介绍及使用，然后是源码阅读，最后是总结及注意事项

**目的**： 手模手深入学习**watch**和**watchEffect**原理，方便开发排问题及面试派上用场😁

* * *

[Vue3源码之Reactive](https://juejin.cn/post/7205171975647445052)  
[Vue3源码之拦截工具函数](https://juejin.cn/post/7205787772124495928)  
[Vue3源码之ref + 依赖收集 + 通知更新](https://juejin.cn/post/7206508940640124987)  
[Vue3源码之Computed](https://juejin.cn/post/7208111879151566904)  
[Vue3源码之effect](https://juejin.cn/post/7209510210422685755)

* * *

## 一、watch和watchEffect使用 {#一、watch和watchEffect使用}

### 1. watch定义及使用

[官方](https://cn.vuejs.org/api/reactivity-core.html#watch)：侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

**watch** 本质是一个数据监听器，在监听的数据发生改变时，执行我们的回调。

**参数3个**：监听数据、回调函数、配置对象

**监听数据**：函数返回值、ref、reactive、computed、前几个组成的数组

**回调函数**：监听的数据改变时，需要执行的操作如：异步请求、改变状态、路由跳转等

**配置对象**：

-   **immediate** 是否立即执行
-   **deep** 是否深度监听（针对对象、数组）
-   **flush** 控制回调函数的**执行时机** 同步/异步 dom更新前/后
-   **onTack**/**onTrigger** 调试侦听器的依赖

**返回值**：终止监听

接下来使用一下**watch**,下面代码是通过监听**ref**数据count

[示例源码：](https://github.com/xiaoyi1255/nuxt3-temple.git)

```typescript
<template>
  <h1>倒计时 {{ count }} s</h1>
  <button @click="() => run()">开启倒计时</button>
  <br>
  <br>
  <button @click="() => stopWatch()">终止监听</button>
</template>


<script setup lang="ts">
const count = ref(60);
let timer: NodeJS.Timer;
const run = () => {
  timer = setInterval(() => {
    if (count.value <= 0) {
      window.clearInterval(timer);
      return;
    }
    count.value--;
  }, 1000);
};
const stopWatch = watch(
  () => count.value,
  (newVal, oldVal) => {
    console.log({ newVal, oldVal });
  },
  {
    immediate: true,
    deep: true
  }
);
</script>
```

下面是界面的执行情况：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d93656df61e447839260cb40c574aee7~tplv-k3u1fbpfcp-zoom-1.image)

因为我们 监听的 **count.value** 设置了 **immediate** 为true，所以默认会执行，控制台会打印 { "newVal": 60，"oldValue": undefined }, 当我点击开启倒计时按钮：**setInterval** 倒计时在修改coun的值，控制台每个一秒打印一次；当我点击了停止监听按钮：执行了返回的 **stopWatch** 函数，终止了监听，控制台便没有再打印。

### 2. watchEffect

[官方](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

**watchEffect** 和 **watch** 都是用来监听数据的。只是watchEffect不能指定监听的数据源

**参数2个**：回调和配置对象 回调参数，用来**清除副作用**

**回调的执行**：watch 设置了才能立即执行，watchEffect*默认立即执行*

**返回值**：终止监听

```typescript
<template>
  <h1>倒计时 {{ count }} s</h1>
  <button @click="() => run()">开启倒计时</button>
  <br>
  <br>
  <button @click="() => stopWatch()">终止监听</button>
  <br>
  <br>
  <button @click="() => stopWatchEffect()">终止监听</button>
</template>


<script setup lang="ts">
const count = ref(60);
let timer: NodeJS.Timer;
const run = () => {
  timer = setInterval(() => {
    if (count.value <= 0) {
      window.clearInterval(timer);
      return;
    }
    count.value--;
  }, 1000);
};
const stopWatch = watch(
  () => count.value,
  (newVal, oldVal) => {
    console.log('watch监听', { newVal, oldVal });
  },
  {
    immediate: true,
    deep: true
  }
);
const stopWatchEffect = watchEffect(() => {
    console.log('watchEfect监听', count.value)
},{})
</script>
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e11087b7a2964493870548aa4e33ce98~tplv-k3u1fbpfcp-zoom-1.image)

**watchEffect**

**优势**：不需要指定具体监听的值、对象并且是立即执行的

**劣势**：不能指定具体的值，回调里面使用的，其中一个变，回调就会执行，不能指定第一次是否执行

### watch和watchEffect总结：

|             | watch                                      | watchEffect               |
| ----------- | ------------------------------------------ | ------------------------- |
| 默认立即执行      | 否 可以配置                                     | 是                         |
| 参数          | 监听值、回调、配置对象                                | 回调、配置对象                   |
| 回调支持异步      | 是                                          | 是                         |
| 支持终止监听      | 是                                          | 是                         |
| 配置对象options | immediate, deep, flush, onTrack, onTrigger | flush, onTrack, onTrigger |
| source      | 监听数据源                                      | 回调函数，它的参数是清理副作用的函数        |
| 回调函数 cb     | 回调函数（newVal,oldVal）                        | null                      |

以上就是watch和watchEffect的简单使用及区别，接下还是 上主菜👻👻

## 二、源码阅读 {#二、源码阅读}

以往进行源码阅读都是一股脑往下阅读，发现那样容易视觉疲乏，所以这次选择把整体过一遍，然针对核心代码模块去阅读。平常你们是怎么去阅读的呢？

[源码](https://github1s.com/vuejs/core/blob/v3.2.47/packages/runtime-core/src/apiWatch.ts#L157-L170)中我们可以看到：**watch**和**watchEffect**都是调的 **deWatch** 只是 **watchEffect**调时第二个参数为null

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/runtime-core/src/apiWatch.ts#L157-L170
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
   // (val: unknown): val is Function => typeof val === 'function'
  if (__DEV__ && !isFunction(cb)) { // dev下 回调不是一个函数，报警告
    warn(
      ``watch(fn, options?)` signature has been moved to a separate API. ` +
        `Use `watchEffect(fn, options?)` instead. `watch` now only ` +
        `supports `watch(source, cb, options?) signature.`
    )
  }
  // 返回 doWatch的执行结果
  return doWatch(source as any, cb, options)
}

export function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle {
  return doWatch(effect, null, options)
}
```

### doWatch

先阐述一下**doWatch**函数做了哪些事情

1.  首先是校验参数、根据参数创建/直接使用getter函数
1.  针对2.x watch 监听数组做兼容
1.  监听数据是reactive **deep**默认为**true** 根据deep 改造getter实现深度监听
1.  根据option: flush将job 加入调度器 scheduler中
1.  实例化effect 传入 getter 和 scheduler
1.  根据判断 传入 immediate并为true 则立即执行一次effect
1.  最后返回一个用于终止监听的函数 

阉割版的**doWatch**

```typescript
function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect | object,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ
): WatchStopHandle {
   // dev下 没有传回调会报警告
  if (__DEV__ && !cb) {...}
   // 声明数据校验不过警告函数
  const warnInvalidSource = (s: unknown) => {}
	// 组件实例
  const instance =
    getCurrentScope() === currentInstance?.scope ? currentInstance : null
  // const instance = currentInstance
  let getter: () => any
  let forceTrigger = false // 是否立即执行标识 不同于immediate
  let isMultiSource = false // 监听多个数据标识
	// 根据 监听数据 判断并赋值 getter
  if (isRef(source)) {...} // ref
  else if (isReactive(source)) {...} // reactive
  else if (isArray(source)) {...} // 数组
  else if (isFunction(source)) {...} // 函数，watchEffect 在里面的else里面
  else { // 不合法 给getter赋值 dev下抛警告
    getter = NOOP // NOOP = ()=>{}
    __DEV__ && warnInvalidSource(source)
  }

  if (__COMPAT__ && cb && !deep) {...} // 兼容2.x

  if (cb && deep) { // watch 深度监听
    const baseGetter = getter
    getter = () => traverse(baseGetter()) // 遍历可枚举的key 实现深度监听
  }
	// 清理副作用函数
  let cleanup: () => void
  let onCleanup: OnCleanup = (fn: () => void) => {...}
	// 服务端相关
  let ssrCleanup: (() => void)[] | undefined
  if (__SSR__ && isInSSRComponentSetup) {...}

  let oldValue: any = isMultiSource
    ? new Array((source as []).length).fill(INITIAL_WATCHER_VALUE)
    : INITIAL_WATCHER_VALUE
  // 声明一个 job 里面就是具体执行 effect.run 的
  const job: SchedulerJob = () => {...}
	// 运行递归 标识
  job.allowRecurse = !!cb

  let scheduler: EffectScheduler
   // 根据flush 的值对应触发 job 函数的调用
  if (flush === 'sync') {...} // 同步执行
  else if (flush === 'post') {...} // 异步队列结束后执行 dom更新后
  else {...} // 默认 异步队列开始前 dom 更新前
	// effect 传入副作用函数，和调度配置，在依赖更新执行对应副作用函数
  const effect = new ReactiveEffect(getter, scheduler)
	// dev 下 onTrack/onTrigger 收集依赖/触发更新时执行回调
  if (__DEV__) { effect.onTrack = onTrack effect.onTrigger = onTrigger}

  // initial run 判断初始化的回调的执行
  if (cb) {...} else if (flush === 'post') {...} else {effect.run()}
	// 终止函数，用于停止监听
  const unwatch = () => {...}
  return unwatch
}
```

先是定义了几个变量：

-   **instance** 当前组件实例
-   **getter** 实例化effect 传入的副作用函数
-   **forceTrigger** 强制执行
-   **isMultiSource** 监听数据源为多个

```typescript
const instance =
    getCurrentScope() === currentInstance?.scope ? currentInstance : null
  // const instance = currentInstance
let getter: () => any
let forceTrigger = false
let isMultiSource = false
```

### 1. 根据source类型，分别处理并赋值getter

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64e4959049924af18d3b9d6cd5468909~tplv-k3u1fbpfcp-zoom-1.image)

对应代码如下：

```typescript
if (isRef(source)) {
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    getter = () => source
    deep = true
  } else if (isArray(source)) {
    isMultiSource = true
    forceTrigger = source.some(s => isReactive(s) || isShallow(s))
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
          return traverse(s)
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, ErrorCodes.WATCH_GETTER)
        } else {
          __DEV__ && warnInvalidSource(s)
        }
      })
  } else if (isFunction(source)) {
    if (cb) {
      // getter with cb
      getter = () =>
        callWithErrorHandling(source, instance, ErrorCodes.WATCH_GETTER)
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return
        }
        if (cleanup) {
          cleanup() // 存在上一次的副作用函数先清理
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          ErrorCodes.WATCH_CALLBACK,
          [onCleanup] // 传入onCleanup函数，以便在回调函数执行完毕后清理其副作用
        )
      }
    }
  } else {
    // 如果都不满足：getter = () => {} de抛出警告
    getter = NOOP
    __DEV__ && warnInvalidSource(source)
  }
```

上面代码主要是根据**source**类型不同，分别进行处理并赋值给**getter**函数赋值

### 2.针对2.x 数组的兼容处理

如果使用 Vue 2.x 中的 **watch** 监听了一个数组，而在回调函数中修改了数组，那么 Vue 2.x 会自动触发更新。但在 Vue 3.x 中，由于引入了基于 Proxy 的响应式系统，会使得数组变异失效，需要使用 **watch** API 中的 **deep** 选项来监听数组内部元素的变化。

```typescript
// 2.x array mutation watch compat
if (__COMPAT__ && cb && !deep) {
  const baseGetter = getter
  getter = () => {
    const val = baseGetter()
    if (
      isArray(val) &&
      checkCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance) // 检查兼容性的
    ) {
      traverse(val)
    }
    return val
  }
}
```

Vue 3.x 中使用了 **watch** API 监听了一个数组，并且没有默认启用 **deep** 选项，那么数组变化，watch 实际上是监听不到的【**实测**】，
所以我们监听数组的时候记得 加上**deep**

### 3.存在deep 递归遍历属性

```typescript
if (cb && deep) {
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }
```

紧接着 声明了清理副作用函数，在执行完回调时执行

```typescript
let cleanup: () => void
  let onCleanup: OnCleanup = (fn: () => void) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, ErrorCodes.WATCH_CLEANUP)
    }
  }
```

### 4. job函数

**job 函数是 effect 的一个调度器**

1.  先判断 effect 是否是激活状态，不是直接return
1.  存在**cb** （**watch**）执行 effect.run() 计算出新值，判断新、旧值，是否发生改变，如果改变了，存在上一次副作用函数，先清理副作用，把回调、参数、清理副作用函数等传入callWithAsyncErrorHandling去执行，然后更新旧值
1.  不存在**cb** (**watchEffect**) 直接调用effect.run =》getter

```typescript
const job: SchedulerJob = () => {
    if (!effect.active) { // 判断 effect 是否是激活状态
      return
    }
    if (cb) {
      // watch(source, cb) 
      const newValue = effect.run() // 获取新值
      if (
        deep ||
        forceTrigger ||
        (isMultiSource
          ? (newValue as any[]).some((v, i) =>
              hasChanged(v, (oldValue as any[])[i])
            )
          : hasChanged(newValue, oldValue)) ||
        (__COMPAT__ &&
          isArray(newValue) &&
          isCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance))
      ) {
        // 判断 新、旧值 如果发生了改变
        // cleanup before running cb again
        if (cleanup) {
          cleanup() // 先清理上一次的副作用
        }
        // 传入 新值 清理副作用函数 调用回调函数
        callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE
            ? undefined
            : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE
            ? []
            : oldValue,
          onCleanup
        ])
        // 旧值赋值
        oldValue = newValue
      }
    } else {
      // watchEffect 直接执行执行
      effect.run()
    }
  }
```

接着根据**flush** 的值 处理 job函数，就是决定回调的执行时机，赋值给调度器 scheduler

### 5. 实例化 effect

然后传入 **getter** 和 **schedluer** 并[实例化 effect](https://juejin.cn/post/7209510210422685755)

```typescript
let scheduler: EffectScheduler
if (flush === 'sync') { // 同步执行不做处理
  scheduler = job as any // the scheduler function gets called directly
} else if (flush === 'post') { // 异步 在渲染完dom 后执行
  scheduler = () => queuePostRenderEffect(job, instance && instance.suspense)
} else { // 默认pre 在dom 渲染前执行
  // default: 'pre'
  job.pre = true
  if (instance) job.id = instance.uid
  scheduler = () => queueJob(job)
}

// 实例化 effect 
const effect = new ReactiveEffect(getter, scheduler)
```

### 6.初始化并返回终止监听函数

```typescript
// initial run
if (cb) {
  if (immediate) {
    job()
  } else {
    oldValue = effect.run()
  }
} else if (flush === 'post') { // 异步 推入队列中，下一次dom
  queuePostRenderEffect(
    effect.run.bind(effect),
    instance && instance.suspense
  )
} else {
  effect.run()
}

// 终止监听 
const unwatch = () => {
  effect.stop()
  if (instance && instance.scope) {
    remove(instance.scope.effects!, effect)
  }
}
return unwatch
```

*恭喜你*👻👻👻！！！看到这里就结束了，下面是完整的**dowatch** 源码

```typescript
function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect | object,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ
): WatchStopHandle {
  if (__DEV__ && !cb) {
    if (immediate !== undefined) {
      warn(
        `watch() "immediate" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
    if (deep !== undefined) {
      warn(
        `watch() "deep" option is only respected when using the ` +
          `watch(source, callback, options?) signature.`
      )
    }
  }


  const warnInvalidSource = (s: unknown) => {
    warn(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, ` +
        `a reactive object, or an array of these types.`
    )
  }


  const instance =
    getCurrentScope() === currentInstance?.scope ? currentInstance : null
  // const instance = currentInstance
  let getter: () => any
  let forceTrigger = false
  let isMultiSource = false


  if (isRef(source)) {
    getter = () => source.value
    forceTrigger = isShallow(source)
  } else if (isReactive(source)) {
    getter = () => source
    deep = true
  } else if (isArray(source)) {
    isMultiSource = true
    forceTrigger = source.some(s => isReactive(s) || isShallow(s))
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value
        } else if (isReactive(s)) {
          return traverse(s)
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, ErrorCodes.WATCH_GETTER)
        } else {
          __DEV__ && warnInvalidSource(s)
        }
      })
  } else if (isFunction(source)) {
    if (cb) {
      // getter with cb
      getter = () =>
        callWithErrorHandling(source, instance, ErrorCodes.WATCH_GETTER)
    } else {
      // no cb -> simple effect
      getter = () => {
        if (instance && instance.isUnmounted) {
          return
        }
        if (cleanup) {
          cleanup()
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          ErrorCodes.WATCH_CALLBACK,
          [onCleanup]
        )
      }
    }
  } else {
    getter = NOOP
    __DEV__ && warnInvalidSource(source)
  }


  // 2.x array mutation watch compat
  if (__COMPAT__ && cb && !deep) {
    const baseGetter = getter
    getter = () => {
      const val = baseGetter()
      if (
        isArray(val) &&
        checkCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance)
      ) {
        traverse(val)
      }
      return val
    }
  }


  if (cb && deep) {
    const baseGetter = getter
    getter = () => traverse(baseGetter())
  }


  let cleanup: () => void
  let onCleanup: OnCleanup = (fn: () => void) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, ErrorCodes.WATCH_CLEANUP)
    }
  }


  // in SSR there is no need to setup an actual effect, and it should be noop
  // unless it's eager or sync flush
  let ssrCleanup: (() => void)[] | undefined
  if (__SSR__ && isInSSRComponentSetup) {
    // we will also not call the invalidate callback (+ runner is not set up)
    onCleanup = NOOP
    if (!cb) {
      getter()
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
        getter(),
        isMultiSource ? [] : undefined,
        onCleanup
      ])
    }
    if (flush === 'sync') {
      const ctx = useSSRContext() as SSRContext
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = [])
    } else {
      return NOOP
    }
  }


  let oldValue: any = isMultiSource
    ? new Array((source as []).length).fill(INITIAL_WATCHER_VALUE)
    : INITIAL_WATCHER_VALUE
  const job: SchedulerJob = () => {
    if (!effect.active) {
      return
    }
    if (cb) {
      // watch(source, cb)
      const newValue = effect.run()
      if (
        deep ||
        forceTrigger ||
        (isMultiSource
          ? (newValue as any[]).some((v, i) =>
              hasChanged(v, (oldValue as any[])[i])
            )
          : hasChanged(newValue, oldValue)) ||
        (__COMPAT__ &&
          isArray(newValue) &&
          isCompatEnabled(DeprecationTypes.WATCH_ARRAY, instance))
      ) {
        // cleanup before running cb again
        if (cleanup) {
          cleanup()
        }
        callWithAsyncErrorHandling(cb, instance, ErrorCodes.WATCH_CALLBACK, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE
            ? undefined
            : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE
            ? []
            : oldValue,
          onCleanup
        ])
        oldValue = newValue
      }
    } else {
      // watchEffect
      effect.run()
    }
  }


  // important: mark the job as a watcher callback so that scheduler knows
  // it is allowed to self-trigger (#1727)
  job.allowRecurse = !!cb


  let scheduler: EffectScheduler
  if (flush === 'sync') {
    scheduler = job as any // the scheduler function gets called directly
  } else if (flush === 'post') {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense)
  } else {
    // default: 'pre'
    job.pre = true
    if (instance) job.id = instance.uid
    scheduler = () => queueJob(job)
  }


  const effect = new ReactiveEffect(getter, scheduler)


  if (__DEV__) {
    effect.onTrack = onTrack
    effect.onTrigger = onTrigger
  }


  // initial run
  if (cb) {
    if (immediate) {
      job()
    } else {
      oldValue = effect.run()
    }
  } else if (flush === 'post') {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    )
  } else {
    effect.run()
  }


  const unwatch = () => {
    effect.stop()
    if (instance && instance.scope) {
      remove(instance.scope.effects!, effect)
    }
  }


  if (__SSR__ && ssrCleanup) ssrCleanup.push(unwatch)
  return unwatch
}
```

## 辅助函数 {#辅助函数}

```typescript
export function isShallow(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_SHALLOW])
}
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isArray = Array.isArray
export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

export function isReactive(value: unknown): boolean {
  if (isReadonly(value)) {
    return isReactive((value as Target)[ReactiveFlags.RAW])
  }
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE])
}
```

## 总结 {#总结}

首先通过**source**监听数据源的类型创建**getter**，比如数据源是一个**reactive** 对象，它将自动启用deep，对每一个属性创建一个getter，如果是嵌套对象，则通过**traverse** 函数进行递归遍历。**job**是用来处理watch和watchEffect 中副作用的具体执行的函数，同时也是用来计算新旧值的。  
接着通过*flush*声明用来控制watch 回调的执行时机的**schedluer对象**

-   flush=sync => **schedluer**=job // 同步
-   flush=post => **schedluer = () =>** queuePostRenderEffect(job,xxx) // dom 更新后
-   flush=pre => **schedluer** => queueJob(job) // dom 更新前

接着实例化*effect*=new ReactiveEffect(getter, scheduler)  
然后初始化执行：watchEffect、watch 存在 immediate 则第一次默认执行  
最后声明并返回一个终止函数 **unwatch**

## 注意事项： {#注意事项：}

-   监听一个嵌套响应对象时，默认启用deep
-   监听数组 必须声明deep 才能监听到
-   watchEffec 默认第一次会执行，没有新、旧值概念
-   watchEffect 回调的参数可以用来清理上一次副作用
-   可以通过flush来控制watch和watchEffec回调的执行时机
-   deep 实现深度监听原理是traverse 递归每一个属性，[慎用于监听嵌套过深数据，性能问题]
-   watch 监听的数据源是多个时，回调函数参数也是数组（[new1,new2],[old1,old2]）
-   watch回调中不要直接修改监听的数据源，实在要修改，可以判断一下新、旧值再改
