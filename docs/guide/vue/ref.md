---
title: Vue3源码
titleTemplate: Ref
---
## 前言 {#前言}

**主题** 相信ref和reactive是vue3用的最多的两个方法，本文接着进行ref 源码的解读

**内容** 本文将分为三个部分：首先是ref的介绍，其次是ref源码阅读，最后是总结

**目的** 手摸手 深入学习[Vue3.2.47](https://github.com/vuejs/core/tree/v3.2.47)源码 ref 实现原理

* * *

[Vue源码之Reactive](https://juejin.cn/post/7205171975647445052)

[Vue源码之工具函数](https://juejin.cn/post/7205787772124495928)

* * *

## 一、 ref的介绍及使用 {#一、 ref的介绍及使用}

  


[官方介绍](https://vue3js.cn/vue-composition-api/#ref)：接受一个参数值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性 .value。

```typescript
<script lang="ts" setup>
const count = ref(0)
count.value++
console.log(count.value) // 1
const newCount = ref({
  count
})
newCount.value.count++
console.log(newCount.value.count === count.value) // true
</script>
```

从上面的代码中可以看出，ref 可以对转换基础类型和引用类型的数据进行响应式转换。因为**newCount.value.count** 和**count.value**是同一个和引用地址，所以**严格相等**。

如果**reactive**对基础数据类型转换会怎么样？在另一篇关于[Reactive源码解读](https://juejin.cn/post/7205171975647445052)的文章有介绍，dev 下会报警告并返回原始值，Prod下直接返回原始值。

```typescript
<script lang="ts" setup>
const num = reactive(1) // value cannot be made reactive: 1
</script>
```

各位看官们是否有以下疑问：

**ref的值改变会触发什么操作？**

**ref和reactive的区别是什么？使用场景分别是什么？**

**为什么ref 可以将基础数据类型转换为响应式？Proxy不是只能代理对象么？**

听说带着问题阅读源码，会有额外的收获？上主菜👻

## 二、 ref源码实现 {#二、 ref源码实现}

**ref**的源码相比**reactive**还是简单很多，主要分为2个步骤：

1.  调createRef 判断传入的值 value是否为ref 是直接返回，不是就new new RefImpl类
1.  RefImpl类主要是 初始化了_value和_rawValue，value是基础不处理，对象就调用toReactive 转换，然后对setter 和getter 操作进行拦截，添加依赖和通知跟新。

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/ref.ts#L99-L133
export function ref<T extends object>(
	value: T
): [T] extends [Ref] ? T : Ref<UnwrapRef<T>>
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>

	// value 任意类型
export function ref(value?: unknown) {
	return createRef(value, false)
}
// rawValue: 传入的原始值（任意类型）、shallow 标识是否浅层 ref 
function createRef(rawValue: unknown, shallow: boolean) {
	if (isRef(rawValue)) { 
		// 入参本身就是ref 通过判断入参r.__v_isRef === true
		return rawValue
	}
	// 不是ref 返回一个 RefImpl 实例
	return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
	private _value: T // 内部维护，外部访问的.value 返回它
	private _rawValue: T // 报存 旧值

	public dep?: Dep = undefined // 调用trackEffects 会传过去
	public readonly __v_isRef = true // ref 标识

	// __v_isShallow 是否 是浅层ref  传入的值为 false
	constructor(value: T, public readonly __v_isShallow: boolean) {
		// 通过 toRaw  拿到原始属性/对象 并存在_rawVale中，后面判断用
		this._rawValue = __v_isShallow ? value : toRaw(value)
		// value 传入 toReactive 函数，
		// value是对象则调用reactive用Proxy 代理,如果是基础类型,则直接返回 
		this._value = __v_isShallow ? value : toReactive(value)
		// 看到这里 再回顾上面 第三问，是不是就有答案啦
	}

	// 拦截 getter器 属性访问时触发
	get value() {
		// 在我们进行.value 操作时， 触发trackRefValue(this) 进行依赖收集
		trackRefValue(this) // 在下面有详细介绍
		// 返回 原始值/proxy 代理对象
		return this._value
	}
	// setter 拦截器 属性改变时触发
	set value(newVal) {
		// useDirectValue 判断是否使用原始值（不需要响应式的标识）以下3种 使用原始值
		// 1. 入参 __v_isShalloww 值为true
		// 2. isShallow 新增是浅层ref
		// 3. 新值是只读
		const useDirectValue =
			this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
		newVal = useDirectValue ? newVal : toRaw(newVal)
		if (hasChanged(newVal, this._rawValue)) {
			// 如果 新值和旧值 发生了改变， 跟新旧值
			this._rawValue = newVal
			// 设置 value 值，需要使用原始值，则直接用newVal,否则转Proxy
			this._value = useDirectValue ? newVal : toReactive(newVal)
			// 派发事件 响应式跟新
			triggerRefValue(this, newVal) // 在下面有详细介绍
		}
		// 看到这里 对第一问是不是也有答案啦
	}
}
```

#### RefImpl 执行总结：

1.  RefImpl 的构造函数接收两个参数，分别是 rawValue 和 shallow。rawValue 表示 ref 存储的值，shallow 表示是否浅层处理。
1.  初始化_value 和 _rawValue ，_rawValue表示原始属性/对象; _value 表示 基础值则是本身，引用值这是通过reactive 进行响应式
1.  拦截get 操作，拦截 进行依赖收集 并返回 _value
1.  拦截set 操作，判断新值/新值的原始值 是否和旧值相等，不相等 则更新value 并通知依赖跟新


## 三、依赖收集 {#三、依赖收集}

#### 1. trackRefValue

在 **get** 拦截器中，调用了trackRefValue函数，trackRefValue函数：

1.  判断 shouldTrack 和 activeEffect，存在则往下执行
1.  拿到原始值
1.  调用trackEffects 并把 ref.dep 传进去，刚开始 ref.dep是 undefined，然后创建dep

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/ref.ts#L40-L53
export function trackRefValue(ref: RefBase<any>) {
  // shouldTrack为true => 处于响应式状态
  // activeEffect不为undefined => 存在运行的Effect函数
  if (shouldTrack && activeEffect) {
    // 拿到原始值
    // 调用 trackEffects, 把ref.dep 传进去，没有则创建
    ref = toRaw(ref)
    if (__DEV__) { // 开发环境 记录一些调试信息
      trackEffects(ref.dep || (ref.dep = createDep()), {
        target: ref,
        type: TrackOpTypes.GET,
        key: 'value'
      })
    } else {
      trackEffects(ref.dep || (ref.dep = createDep()))
    }
  }
}
```

#### 2. createDep

**createDep** 是一个创建 dep 的工厂函数

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/dep.ts#L21-L26export
// 依赖集合
export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const dep = new Set<ReactiveEffect>(effects) as Dep
  dep.w = 0
  dep.n = 0
  return dep
}
```

#### 3. trackEffects

**trackEffects** 函数就是根据传过来的dep 对象，将当前的副作用加入到指定的 dep 中，以便依赖跟新时 触发副作用函数跟新。这个模块比较绕，我们先梳理一下几个概念

1.  **dep** 每个ref 对象是独立的，所以每个ref 有一个对应的 dep对象来存储 这个ref 的所以依赖项（就是所有用到这个ref 的地方），每个依赖项会存在一个或多个的 副作用函数，副作用函数被存储在依赖项的deps 中（activeEffect.deps.push(dep)）
1.  当一个响应式对象ref\reactive被访问时，它所对应的 **dep** 对象就会被加入当前正在执行的副作用函数（即 **activeEffect**）的依赖列表中（**activeEffect.deps.push(dep)** ），同时这个 **dep** 对象也会记录下这个副作用函数。
1.  **函数副作用**指函数在正常工作任务之外对外部环境所施加的影响

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/effect.ts#L232-L257
const maxMarkerBits = 30

export function trackEffects(
  dep: Dep, // 依赖集合
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  let shouldTrack = false // 是否应该 追踪依赖关系
  if (effectTrackDepth <= maxMarkerBits /*20*/) { // 效果追踪深度小于等于最大标记位数
    if (!newTracked(dep)) { // 当前的 effect 不存在了 dep
      dep.n |= trackOpBit // 设置新的 追踪标记
      shouldTrack = !wasTracked(dep) // 判断是否应该被追踪
    }
  } else {
    // Full cleanup mode. 完全清理模式
    shouldTrack = !dep.has(activeEffect!)
  }


  /*
  * effect 响应式副作用函数
  * activeEffect 是一个全局变量 表示当前正在运行的 effect  
  * ReactiveEffect 表示响应式对象的订阅者
  * activeEffect!.deps 用于存储当前 effect 依赖的所有 dep 对象
  */
  // 依赖应该被追踪 => 将 dep 和 副作用 双向关联
  if (shouldTrack) {
    // 将当前正在执行的 activeEffect 添加到dep
    // 谁用到了这个响应式数据 就把谁添加到依赖数组中
    dep.add(activeEffect!)
    // 将 dep 添加到 activeEffect 的 deps 数组中，表示 activeEffect 依赖于该 dep。
    activeEffect!.deps.push(dep) 
    if (__DEV__ && activeEffect!.onTrack) {
      activeEffect!.onTrack({
        effect: activeEffect!,
        ...debuggerEventExtraInfo!
      })
    }
  }
}
```

  


## 四、 通知更新 {#四、 通知更新}

#### 1. triggerRefValue

在 **set** 拦截器中 调用triggerRefValue，triggerEffects函数：

1.  拿到ref 的原始值
1.  判断原始对象是否存在 dep
1.  存在则 调用 triggerEffects 并把 dep 传进去

```typescript
export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
  ref = toRaw(ref) // 拿到原始值
  const dep = ref.dep
  if (dep) { // dep 存在
    if (__DEV__) { // 和 trackRefValue一样 记录一些调试信息
      triggerEffects(dep, {
        target: ref,
        type: TriggerOpTypes.SET,
        key: 'value',
        newValue: newVal
      })
    } else {
      triggerEffects(dep)
    }
  }
}
```

#### 2. triggerEffects

**triggerEffects** 函数就是遍历依赖项：首先初始化effects ，两次遍历effects ， 触发triggerEffect ，小伙伴们 这里肯定想问：为啥要遍历两次，直接在一个for of里面斜杠else不就行了么？，讲实话，不可能我们都能想到的，人家框架作者没有想到噻。所以这里肯定是有原因滴🎃

```typescript
export function triggerEffects(
  dep: Dep | ReactiveEffect[],
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  // spread into array for stabilization
  const effects = isArray(dep) ? dep : [...dep]
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
```

**遍历两次**的原因是为了确保先触发所有 **computed** 的副作用函数，再触发**普通**的副作用函数。因为 **computed** 的副作用函数是基于其依赖的响应式数据的值计算得出的，而响应式数据的值发生变化时，需要先触发所有计算属性的副作用函数，才能确保后续普通的副作用函数使用到的计算属性的值是最新的。

#### 3. triggerEffect

**triggerEffect**函数作用: 触发副作用函数 的执行 run

```typescript
function triggerEffect(
  effect: ReactiveEffect,
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  // 检查这个副作用函数是不是正在执行的副作用函数
  // 检查这个副作用函数是不是可以递归执行
  if (effect !== activeEffect || effect.allowRecurse) { // 避免被无限循环调用
    if (__DEV__ && effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
    }

    // 调度器函数，用于控制副作用函数的执行
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      // run 副作用函数 的执行函数
      effect.run()
    }
  }
}
```

## 辅助函数 {#辅助函数}

ReactiveEffect是我们在使用 computed、ref 、reactive 等响应式api 时，用来管理副作用函数的。我会在下一期单独分享它，这里就不做过多阐述。

```typescript
export class ReactiveEffect<T = any> {
  active = true
  deps: Dep[] = []
  parent: ReactiveEffect | undefined = undefined

  /**
   * Can be attached after creation
   * @internal
   */
  computed?: ComputedRefImpl<T>
  /**
   * @internal
   */
  allowRecurse?: boolean
  /**
   * @internal
   */
  private deferStop?: boolean


  onStop?: () => void
  // dev only
  onTrack?: (event: DebuggerEvent) => void
  // dev only
  onTrigger?: (event: DebuggerEvent) => void


  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope)
  }


  run() {
    if (!this.active) {
      return this.fn()
    }
    let parent: ReactiveEffect | undefined = activeEffect
    let lastShouldTrack = shouldTrack
    while (parent) {
      if (parent === this) {
        return
      }
      parent = parent.parent
    }
    try {
      this.parent = activeEffect
      activeEffect = this
      shouldTrack = true


      trackOpBit = 1 << ++effectTrackDepth


      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this)
      } else {
        cleanupEffect(this)
      }
      return this.fn()
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this)
      }


      trackOpBit = 1 << --effectTrackDepth


      activeEffect = this.parent
      shouldTrack = lastShouldTrack
      this.parent = undefined


      if (this.deferStop) {
        this.stop()
      }
    }
  }


  stop() {
    // stopped while running itself - defer the cleanup
    if (activeEffect === this) {
      this.deferStop = true
    } else if (this.active) {
      cleanupEffect(this)
      if (this.onStop) {
        this.onStop()
      }
      this.active = false
    }
  }
}
```

```typescript
// 判断是否是 ref
export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
export function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true)
}

// 获取原始值
export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}

// 对象则调用 reactive ， 否则 返回本身
export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value

// 判断是否是对象
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

// 判断值是否发生改变
export const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue)


export const newTracked = (dep: Dep): boolean => (dep.n & trackOpBit) > 0
export const wasTracked = (dep: Dep): boolean => (dep.w & trackOpBit) > 0
```

## 总结 {#总结}

**ref**：

-   ref 是用于将 reactive 处理不了的 **基础数据**类型 转为响应式
-   ref 也可以传入引用数据类型，内部借助了toReactive
-   只能通过 .value 访问和修改
-   本质是一个对象，包含一个value值和一个getter/setter函数。

**依赖收集及通知更新：**

-   对响应式数据访问是，get 拦截，进行依赖的收集
-   对响应式数据修改时，set 拦截，遍历依赖 并执行依赖的副作用函数

**ref 和 reactive**：reactive 和 ref 在模板中都是直接使用的

|          | 入参   | 响应实现              | 访问方式         | 修改                |
| -------- | ---- | ----------------- | ------------ | ----------------- |
| reactive | 引用类型 | Proxy             | obj.xx       | obj.xx = xx       |
| ref      | 任意类型 | Proxy / get + set | obj.value.xx | obj.value.xx = xx |

* * *

