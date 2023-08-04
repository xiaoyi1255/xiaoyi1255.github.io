---
title: Vue3源码
titleTemplate: 拦截工具
---
## 前言 {#前言}

**主题**：本文将接上一篇[文章](https://juejin.cn/post/7205171975647445052)，我们接着对 [Vue3.2.47](https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts) 拦截工具函数源码的解读。  
**内容**：本文分为三个部分：首先介绍Proxy、Reflect，其次对**get** **set** **deleteProperty** **has** **ownKeys** 等5个拦截函数解读，最后总结及注意事项  
**目的**：手模手深入学习**拦截器**实现原理

------

**为什么使用Proxy代理使用Reflect进行最终属性的访问和设置？**

**为什么结构响应式对象有时会失活有时不会？**

**为什么Proxy可以代理整个对象？**

听说带着问题，会使我们阅读源码更轻松？让我们一起在源码中寻找答案！！！

----

## 一、Proxy和Reflect {#一、Proxy和Reflect}

如果对ES6的Proxy和Reflect有了解，直接移步源码模块😎

**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）共13个拦截方法，Vue3正是使用它代替了Object.defineProperty，下面简述了其中的几种。

**Reflect** 提供了一系列与对象操作相关的方法，这些方法与 **Object** 上的方法功能类似，但有一些差别,简单来说就是可以通过**Object**和**实例**来操作、获取属性的方法，**Reflect** 都可以实现，优势就是使用它**不会报错**，**不会报错,不会报错,** 会返回 **布尔值**

```typescript
const obj = {
	name: '小易',
	age: 20
};
const proxyObj = new Proxy(obj, {
	get(target, key, receiver) {
		console.log(`getting ${key} value is ${target[key]}`);
		return target[key];
	},
	set(target, key, value, receiver) {
		console.log(`setting ${key} value is ${value}`);
		target[key] = value;
	},
	deleteProperty(target, key) {
		console.log(target, key);
		console.log(`deleteProperty key is ${key}`);
	},
	ownKeys(target){
		console.log(target)
		console.log(`ownKeys target ${target}`)
		return Reflect.ownKeys(target)
	},
	has(target, key){
		console.log(`for in target ${target} key ${key}`)
		return Reflect.has(target, key)
	},
});
proxyObj.name; // getting name value is 小易
proxyObj.name = 'xiaoyi'; // getting name value is 小易
delete proxyObj.age; // deleteProperty key is age
Object.keys(proxyObj) // ownKeys target  [object Object] ==> { name: 'xiaoyi', age: 20 }
'name' in proxyObj // for in target [object Object] key name

Reflect.get(obj, 'age') // 20  等价于 obj.age
Reflect.set(obj, 'age', '19') // true 等价于 obj.age = '19'
```

对于Proxy 和 Reflect 有了一定认识，接下来上主菜😁

## 二、源码 {#二、源码}

我们上一篇讲到，Reactive 代理对象代传了两个 handlers 分别是

**mutableHandlers** 和 **mutableCollectionHandlers**

#### 1、mutableHandlers

**mutableHandlers** 是针对Object 和 Array 对象的拦截工具

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L225-L231
const get = /*#__PURE__*/ createGetter()
const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations()
export const mutableHandlers: ProxyHandler<object> = {
  get, // 属性获取拦截
  set, // 属性是设置拦截
  deleteProperty, // 属性删除拦截
  has, // in 操作拦截
  ownKeys 
  // 拦截 Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()、Object.keys() 
  // 和 for...in 循环中的 Object.keys() 操作。
}
```
##### 1. createGetter
**createGetter**是用于创建能够获取响应式对象的**getter**拦截器函数，实现了在**获取响应式数据**时，对该值进行**依赖追踪**功能，以便数据变化时进行视图更新。下面我们来看一下它具体怎么实现的吧😎

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L94-L156
// ReactiveFlags：
// ● SKIP：该常量表示一个属性是否应该被跳过，不进行响应式处理。
// ● IS_REACTIVE：该常量表示一个对象是否已经被转换为响应式对象。
// ● IS_READONLY：该常量表示一个对象是否已经被转换为只读的响应式对象。
// ● IS_SHALLOW：该常量表示一个对象是否已经被转换为浅层响应式对象。
// ● RAW：该常量表示一个响应式对象的原始对象（即未被代理的对象）。

/**
 * createGetter 函数
 * 
 * @param {Boolean} isReadonly 是否为只读对象
 * @param {Boolean} shallow 是否浅层观察对象
 * @returns {Function} getter 函数
 */
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      /* 表示一个对象是否已经被转换为响应式对象*/
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      /*表示一个对象是否已经被转换为只读的响应式对象*/
      return isReadonly
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      /*表示一个对象是否已经被转换为浅层响应式对象*/
      return shallow
    } else if (
      key === ReactiveFlags.RAW && /*表示一个响应式对象的原始对象（即未被代理的对象）*/
      receiver ===  /* 从响应式对象缓存中获取对应的源对象*/
        (isReadonly
          ? shallow
            ? shallowReadonlyMap
            : readonlyMap
          : shallow
          ? shallowReactiveMap
          : reactiveMap
        ).get(target)
    ) {
      // shallowReadonlyMap readonlyMap shallowReactiveMap reactiveMap
      // 上面这个四个对象是转为响应式用来存（target, proxy）的
      // key 是一个对象 并且能在四个 WeakMap 对象中找到，说明target已是响应式，直接返回target
      return target
    }
    // 判断原对象是否是 数组
    const targetIsArray = isArray(target)


    if (!isReadonly) {
      // 数组的特殊处理 判断 key 是否是 arrayInstrumentations 的属性或方法
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        // 返回数组中 对应的方法 
        // arrayInstrumentations =》 createArrayInstrumentations()
        // createArrayInstrumentations函数 返回 instrumentations:{key: Function }
        // key: ['includes', 'indexOf', 'lastIndexOf','push', 'pop', 'shift', 'unshift', 'splice']
        return Reflect.get(arrayInstrumentations, key, receiver)
      }
      // hasOwnProperty 特殊处理
      if (key === 'hasOwnProperty') {
        return hasOwnProperty
      }
    }

  	// 通过 Reflect.get 获取对应的 key
    const res = Reflect.get(target, key, receiver)

  	// 判断key是否为Symbol，是否在 builtInSymbols 集合中，是否为一些不需要追踪的键
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      // 不需要追踪的属性 __proto__,__v_isRef,__isVue
      return res
    }

		// 如果不是只读对象，则进行依赖收集
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }

  	// 如果是浅层响应对象 直接返回属性值
    if (shallow) {
      return res
    }

  	// 如果是 ref 响应式对象
    if (isRef(res)) {
      // ref unwrapping - skip unwrap for Array + integer key.
      // 对象是数组类型 并且 key 是整数 索引 返回 本身 否则 返回.value
      return targetIsArray && isIntegerKey(key) ? res : res.value
    }

    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      // 是对象，并且参数是只读，则创建一个 只读响应式reactive
      // 否则 正常创建一个 reactive 响应式对象
      return isReadonly ? readonly(res) : reactive(res)
      // 其实这里就是递归，把可以是对象的递归创建响应式对象，
      // 也就是 结果的key 是对象结构 不会失去响应式的原因
    }
    return res
  }
}
```

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L53-L86
// 数组处理  __PURE__ 纯净的
const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations()
function createArrayInstrumentations() {
  const instrumentations: Record<string, Function> = {}
  // instrument identity-sensitive Array methods to account for possible reactive
  // values
  ;(['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      const arr = toRaw(this) as any
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, TrackOpTypes.GET, i + '')
      }
      // we run the method using the original args first (which may be reactive)
      const res = arr[key](...args)
      if (res === -1 || res === false) {
        // if that didn't work, run it again using raw values.
        return arr[key](...args.map(toRaw))
      } else {
        return res
      }
    }
  })
  // instrument length-altering mutation methods to avoid length being tracked
  // which leads to infinite loops in some cases (#2137)
  ;(['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach(key => {
    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      pauseTracking()
      const res = (toRaw(this) as any)[key].apply(this, args)
      resetTracking()
      return res
    }
  })
  return instrumentations
}
```

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L37-L46
const builtInSymbols = new Set(
  /*#__PURE__*/
  Object.getOwnPropertyNames(Symbol)
    // ios10.x Object.getOwnPropertyNames(Symbol) can enumerate 'arguments' and 'caller'
    // but accessing them on Symbol leads to TypeError because Symbol is a strict mode
    // function
    .filter(key => key !== 'arguments' && key !== 'caller')
    .map(key => (Symbol as any)[key])
    .filter(isSymbol)
)
```

######  总结 getter函数执行步骤

**createGetter(isReadonly = false, shallow = false)**

1.  判断 **key** 是否 属于以下几种情况
    1.  已是响应式对象 **返回 !isReadonly**
    1.  已是只读响应式对象**返回 isReadonly**
    1.  已是浅层响应式对象key是响应式对象的原始对象 **返回 shallow**
    1.  并且可以在全局WeakMap响应式对象存储中找到 **返回 target**
2.  判断target是否是数组
    1. 不是只读 arrayInstrumentations存在key **返回对应的值**
    1. key等于hasOwnProperty     **返回改造后的hasOwnProperty**
3.  通过Reflect.get 获取对应value
3.  key 是Symbol 并 在Symbol集合中或者 是忽略追踪的key 返回 value  
    忽略的**key**有: **proto,v_isRef,isVue**
3.  不是只读 进行get类型 依赖收集
3.  是浅层                                             返回value
3.  value 是一个对象 则进行递归调用reactive
1.  1.  这里很巧妙，依赖是要 进行访问才会收集 如**模板渲染**
    1.  换句话说：只有进行了get 操作才会进行依赖收集
    1.  比如你用reactive 声明了一个**嵌套**了**100层**的对象，你实际只使用了2层，那么第三层往后就不会进行依赖收集的
8.  最后返回 **value**
##### 2.createSetter

**createSetter**函数是一个用于创建能够拦截响应式对象修改属性的**setter**拦截器函数，能在修改响应式数据时，拦截这个操作并响应式更新。下面我们一起来瞅瞅它是如何实现的

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L161-L200
function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    let oldValue = (target as any)[key] /*通过key 获取旧值*/
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      // 旧值是 只读 并且是 ref 并且设置的 新值 不是ref 不允许修改
      return false
    }
    if (!shallow) { // 不是浅层响应式
      if (!isShallow(value) && !isReadonly(value)) { // 新值不是浅响应式和只读
        oldValue = toRaw(oldValue) // 旧值 通过toRaw 转为原始值
        value = toRaw(value) // 新值通过 toRaw 转为原始值
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        // 对象不是数组、旧值是ref、新值不是ref 
        // ===>说明它原来是ref 直接像修改ref 值的方式进行设置 并返回设置成功
        oldValue.value = value
        return true
      }
    } else {
      // in shallow mode, objects are set as-is regardless of reactive or not
    }

    // hadKey 数组判断设置的是否下标越界 对象判断对象是否原来存在该属性
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    // 通过 Reflect.set 设置新的值
    const result = Reflect.set(target, key, value, receiver)
    // don't trigger if target is something up in the prototype chain of original
    if (target === toRaw(receiver)) {
    	// 目标对象 和 设置的对象的原对象 是同一个对象 才进行更新依赖
      if (!hadKey) { 
        // 新添加的 key 调add
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) { 
        // 修改key 调 set
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    // 最后返回设置的结果
    return result
  }
}
```
###### 总结setter函数执行步骤
1.  先通过key拿到旧值
1.  如果旧值是只读的ref 新值不是ref **不允许修改**
1.  1.  首先ref 类型的值本身是只读的，只能通过修改它的value来修改，不然会破坏其响应式
    1.  如果旧值是只读的 ref 类型，而新值不是 ref 类型，那么说明新值不能通过修改 value 属性来实现更新，这样就可能破坏 ref 的只读特性，因此不允许修改。
3.  不是浅层响应式
1.  1.  新值不是只读的浅响应式 =》 新值和旧值 分包通过toRaw 转为原始值
    1.  目标对象不是数组、旧值不是ref, 新值不是ref 直接替换旧值 **修改成功**
4.  判断目标对象是否有该属性：数组通过下标 对象通过hasOwn
4.  通过 Reflect.set 设置新的值
4.  判断目标对象和设置对象的原对象 是否是同一个对象，是才通知更新
1.  1.  对象没有key 调 add 进行添加及通知跟新
    1.  对象原来有key调 set 进行通知更新
7.  最后返回是设置结果
##### 3.deleteProperty
**deleteProperty** 函数用于创建拦截响应式对象删除属性时，进行响应式更新
```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L202-L210
function deleteProperty(target: object, key: string | symbol): boolean {
  const hadKey = hasOwn(target, key)
  const oldValue = (target as any)[key]
  const result = Reflect.deleteProperty(target, key)
  if (result && hadKey) {
    trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
  }
  return result
}
```

###### 总结deleteProperty函数执行步骤：
1.  先判断对象是否存在该key
1.  通过key 拿到即将删除的 旧值
1.  调 Refkect进行属性的删除
1.  删除成功 并且存在key 就通知更新
1.  最后返回删除结果
##### 4.**has** 和 **ownKeys**
```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/baseHandlers.ts#L212-L218
function has(target: object, key: string | symbol): boolean {
  const result = Reflect.has(target, key)
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, TrackOpTypes.HAS, key)
  }
  return result
}

function ownKeys(target: object): (string | symbol)[] {
  track(target, TrackOpTypes.ITERATE, isArray(target) ? 'length' : ITERATE_KEY)
  return Reflect.ownKeys(target)
}
```
**has** 和 **ownKeys** 都是用来拦截对响应式对象**键**的判断和获取的。  
**has** 是在 in 操作符或者 Reflect.has时被调用，用来判断对象是否包含某个属性。
**ownKeys**是在**Object.getOwnPropertyNames**、**Object.getOwnPropertySymbols**、**Object.keys** 或者 **Reflect.ownKeys** 方法时被调用，用来获取目标对象自身所有属性的键值。
#### 2、mutableCollectionHandlers
是针对 WeakMap、WeakSet、Set、Map 集合对象的拦截工具
```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/reactivity/src/collectionHandlers.ts#L366-L368
export const mutableCollectionHandlers: ProxyHandler<CollectionTypes> = {
  get: /*#__PURE__*/ createInstrumentationGetter(false, false)
}

function createInstrumentationGetter(isReadonly: boolean, shallow: boolean) {
  // 根据参数选择一个instrumentations对象 报错在闭包中
  const instrumentations = shallow
    ? isReadonly
      ? shallowReadonlyInstrumentations
      : shallowInstrumentations
    : isReadonly
    ? readonlyInstrumentations
    : mutableInstrumentations

  return (
    target: CollectionTypes,
    key: string | symbol,
    receiver: CollectionTypes
  ) => {
    if (key === ReactiveFlags.IS_REACTIVE) {
      // 表示一个对象是否已经被转换为响应式对象。
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      // 表示一个对象是否已经被转换为只读的响应式对象。
      return isReadonly
    } else if (key === ReactiveFlags.RAW) {
      // 一个响应式对象的原始对象（即未被代理的对象）。
      return target
    }
  	// 调用 Reflect.get 进行属性获取， 也间接调用了createGetter 进行依赖收集
    return Reflect.get(
      // instrumentations 对象存在key 并且 key 也在 target 中
      hasOwn(instrumentations, key) && key in target
        ? instrumentations
        : target,
      key,
      receiver
    )
  }
}
```

**createInstrumentationGetter** 函数是用于创建针对响应式对象的getter拦截器，我们会发现，它的函数体中没有看到依赖收集的相关操作。它是根据传入的参数相应的选择拦截方式和操作，它并直接进行依赖的收集，而是通过get才触发依赖的收集。它的拦截方式其实也挺多的像：has、 add、 set delete clear forEach 、get size 等等，感兴趣的小伙伴可以下来研究一下哦
#### 辅助函数

```typescript
// https://github1s.com/vuejs/core/blob/v3.2.47/packages/shared/src/index.ts
export const isArray = Array.isArray
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const isIntegerKey = (key: unknown) =>
  isString(key) &&
  key !== 'NaN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key

function hasOwnProperty(this: object, key: string) {
  const obj = toRaw(this)
  track(obj, TrackOpTypes.HAS, key)
  return obj.hasOwnProperty(key)
}
```

## 总结 {#总结}

1.  getter: 实现响应式数据的自动依赖收集
1.  setter：属性被修改通知依赖进行响应式跟新
1.  deleteProperty: 属性被删除时，通知依赖进行更新
1.  has: 在检查对象是否存在某个key时进行拦截
1.  ownKeys: 可以获取对象自身的所有属性

#### 注意事项：

-   对于使用到了的 嵌套深层的对象，会递归收集依赖，注意性能问题
-   不能直接在getter中设置属性的值，会死循环，间接修改可以（那样没有意义）
-   不能修改、删除一个只读对象的属性，会抛出错误
-   不要给响应式对象赋值一些原型上的属性和**proto,v_isRef,isVue**
-   结构一个响应式对象的时候 进来使用 官方toRefs ,否则容易失活
