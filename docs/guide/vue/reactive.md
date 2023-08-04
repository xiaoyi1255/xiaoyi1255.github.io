---
title: Vue3源码
titleTemplate: Reactive
---
## 前言 {#前言}

**主题**：本文将深入探讨Vue3.2.47 源码中 **reactive** 的实现

**背景**：Vue3响应系统做了全面升级，使其性能和稳定性得到极大提升，Vue3也占据大量前端市场

**内容**：本文将分为三个部分，首先介绍**reactive**及使用，然后**源码解读**，最后总结**reactive** **优缺点**及使用**注意事项**

**目的**：手模手深入学习**reactive**原理😁

## reactive是什么? {#reactive是什么?}

**官网** <https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive>

**reactive** 函数是 Vue3 源码中的一个核心函数，用于将一个普通的对象转换成一个响应式的对象。所谓响应式对象，是指当该对象的属性发生变化时，可以自动触发视图的更新。

在 Vue2 中，实现响应式的方式是通过 **Object.defineProperty** 来拦截属性的读取和设置操作。Vue3 中则采用了更高效的 **Proxy** 对象来实现响应式，因此 **reactive** 函数在 Vue3 中扮演了更加重要的角色

## 为什么要使用reactive? {#为什么要使用reactive?}

在使用 Vue3 开发应用时，我们希望能够简单地定义数据，并在数据发生变化时自动更新视图。如果不使用 **reactive** 函数，我们需要手动监听数据的变化，并手动触发视图的更新。这样的编程方式既繁琐又容易出错。

## 如何使用reactive? {#如何使用reactive?}

reactive函数参数

1、响应式对象 【包括**ref**、**reactive** 声明的响应式对象】

2、纯对象 [**object**, **array**, **function**, **Set**, **Map**]等

```typescript
// 1、基本对象  data 此时就是一个响应式对象
const data = reactive({
    name: '小易',
    paly: function () {
        console.log('播放');
    },
    habbits: ['吃饭', '睡觉', '打豆豆'],
})

// 2、ref , ref会被解包， 修改 count.value => num也跟着生效
const count = ref(0)
const num = reactive(count)
console.log(count.value === num) // true
count.value++
console.log(num) // 1
```

相信读到这里，对reactive 有了初步了解，接下来，**上主菜😂**

## 源码具体实现？ {#源码具体实现？}

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/reactive.ts
// 代理 的对象存在 WeakMap 中
export const reactiveMap = new WeakMap<Target, any>()

export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  // 判断传的对象是否是 一个只读对象,是返回原对象
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}

function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  if (!isObject(target)) { // val !== null && typeof val === 'object'
    if (__DEV__) {  // dev 下传过来的不是一个对象并且抛出警告， pro 返回原对象
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  // 已经是proxy 直接返回
  if (
    // ReactiveFlags.RAW 表示一个对象是否被包装为响应式对象
    // ReactiveFlags.IS_REACTIVE 标记表示一个对象是否已经被转换为响应式对象。
    target[ReactiveFlags.RAW] && /** __v_raw **/
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE]) /** __v_isReactive **/
  ) {
    return target
  }
  // target already has corresponding Proxy
  // 判断该对象是否 已存进WeakMap中，因为满足所有条件，proxyMap.set(target, proxy)
  const existingProxy = proxyMap.get(target) /** WeakMap **/
  if (existingProxy) {
    return existingProxy
  }
  // only specific value types can be observed.
  // 判断是否是 白名单中的类型
  // ['Object','Array','Map','Set','WeakMap','WeakSet']
  // 前两个 返回1 后4个 返回2 其它的返回0
  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) { /** 0 **/
    return target
  }
  // 以上条件都满足 则进行代理
  const proxy = new Proxy(
    target,
    // 前两个type 使用 collectionHandlers 后两个使用 baseHandlers
    // baseHandlers：{get,set,deleteProperty,has,ownKeys} => ['Object','Array']
    // collectionHandlers {get} => ['Map','Set','WeakMap','WeakSet']
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  // 
  proxyMap.set(target, proxy) /** 添加进 WeakMap 对象 [目标对象, 代理过后的对象] **/
  return proxy 
}
```

上面介绍了**reactive**函数，返回了**createReactiveObject**函数，其参数有四个：
1.  target, 原对象
1.  false, isReadonly
1.  mutableHandlers, Object和Arrary 的handlers
1.  mutableCollectionHandlers, Set\Map\weakSet\WeakMap 的handlers
1.  reactiveMap，全局保存的WeakMap对象

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/reactive.ts#L32-L35
export const reactiveMap = new WeakMap<Target, any>()
// #L90-L102
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}
```

##### WeakMap

讲到这里，你们知道为什么使用[WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)来进行存储么？

-   需要存储的key是一个对象
-   WeakMap持有的是每个键对象的“弱引用”
-   WeakMap不被使用了会自动进行垃圾回收

##### mutableHandlers

**mutableHandlers**: 是 Object 和 Array 的 代理工具对象

**代理**了：get\set\deleteProperty\has\ownKeys

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts
const get = /*#__PURE__*/ createGetter()
const set = /*#__PURE__*/ createSetter()
export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
}
```

##### mutableCollectionHandlers

**mutableCollectionHandlers：** 是'Map','Set','WeakMap','WeakSet'的代理工具对象

**代理了**： get

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/collectionHandlers.ts#L366-L368
export const mutableCollectionHandlers: ProxyHandler<CollectionTypes> = {
  get: /*#__PURE__*/ createInstrumentationGetter(false, false)
}
```

这里看了下，get\set\deleteProperty\has\ownKeys 等**拦截器工具函数**内容有点多，准备下一期单独分享

### 辅助函数 {#辅助函数}

##### 1、isReadonly函数

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/reactive.ts
export function isReadonly(value: unknown): boolean {
   // '__v_isReadonly'
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
}
```

##### 2、getTargetType

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/reactive.ts
const enum TargetType {
  INVALID = 0,
  COMMON = 1,
  COLLECTION = 2
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION
    default:
      return TargetType.INVALID
  }
}

function getTargetType(value: Target) {
  // __v_skip || 判断对象是否可拓展
  return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
    ? TargetType.INVALID /*0*/
    : targetTypeMap(toRawType(value)) /*0 1 2*/
}
```

##### 3、toRawType 、isObject

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/shared/src/index.ts#L70-L77
export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)


export const toRawType = (value: unknown): string => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
```

## 总结 {#总结}

1.  声明了一个全局的**WeakMap**对象用来存 代理完的对象 ****key **: target,** value **: proxyObject**
1.  **reactive** 函数的[声明](https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/reactive.ts#L90) isReadonly ? return **target** : **createReactiveObject**
1.  调用 createReactiveObject 函数
1.  以下几种情况会直接返回 **目标对象**
    1.   判断是否是对象 不是 => **dev** 抛出警告&& 返回目标对象; **pro** 返回目标对象
    1.  对象存在__v_raw 属性 返回目标对象
    1.  在 全局的weakMap 对象中 是否有目标对象，**有**返回目标对象所代理的代理对象
    1.  判断目标对象类型在不在白名单类型列表中，**不在** 返回目标对象  

不满足上面的条件则通过  **Proxy**代理对象 并 存进**weakMap** ，然后返回代理后的对象    
object 和 array 则拦截 **get**  **set**  **deleteProperty**  **has** **ownKeys** 这里数组也有单独做处理  集合对象 则拦截 **get** 并在get操作去拦截 add  set delete等方法

## 优缺点及注意事项 {#优缺点及注意事项}

#### reactive优点：
1.  实现数据响应式，数据的修改自动更新视图
1.  可以监听到数组、对象、集合对象等复杂的数据类型的变化
1.  方便易用，传入需要变成响应的数据即可
#### reactive缺点：
-   环境的支持，使用ES6的**Proxy** 实现，需要版本支持
-   **reactive** 是在运行时动态对对象监听，因此对象嵌套过深会有一定性能开销
#### 注意事项：
-   **reactive** 函数会返回代理对象，可以使用 isReactive 判断是否是**reactive** 像ref 可以使用 isRef
-   对reactive对象进行**结构**使用的时候，结构的是对象不会**失活【失去响应式】** ，基础数据类型会**失活**, 可以使用**toRefs** 来进行结构
-----
[拦截工具函数解读](https://juejin.cn/post/7205787772124495928)