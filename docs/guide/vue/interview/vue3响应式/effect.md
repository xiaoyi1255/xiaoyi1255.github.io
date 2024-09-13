---
theme: channing-cyan
---
# Vue3 响应式原理
## 背景
一个朋友：



## 一、前置知识
### 1. 数据响应式
下面是精简版的`reactive`函数的实现
```js
// reactive.mjs
import { effect, activeEffect, track, trigger } from './effect.mjs'

const reactiveMap = new WeakMap();

const handler = {
  get(target, key) {
    console.log(`get ${key}`)
    const res = Reflect.get(target, key)
    return typeof res === 'object' ? reactive(res) : res
  },
  set(target, key, value) {
    const res = Reflect.set(target, key, value)
    console.log(`set ${key}`, value)
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

```

### 2. 副作用函数
副作用函数：函数的执行会直接或间接地影响外部函数、变量。如下
```js
// index.js
let a = 1
function effect(){
    a = 2 // 影响了外层变量的值，所有effect函数产生了副作用
}
effect()

console.log(a) // 2
```
### 3. Vue3响应式的实现
我们知道Vue中，`响应式系统`是基于`依赖追踪`实现的。那它具体是怎么实现的呢？
1. 初始化时，把数据转为响应式，使用Proxy 代理 拦截set\get
2. 模板渲染读取 响应式数据， 触发get 进行依赖收集
3. 响应数据修改，触发set, set 去遍历使用该数据的依赖进行更新（执行effect => 触发patch => 更新页面）

## 二、effect副作用函数的实现
1. track 在响应式数据 get 中进行依赖收集
2. trigger 响应式数据 set 中触发副作用函数的执行
3. 通过全局变量 activeEffect 存储被注册副作用函数
4. weakMap 维护 属性与 依赖之间的对应关系
5. effectStack数组 处理嵌套 effct造成的问题
6. cleanup函数 清理上一个副作用函数的遗留
7. 避免无限递归 get \ set 注册、清除依赖
8. 调度执行 effect

### 1. effect 函数的实现
需要一个全局变量 activeEffect 判断是否进行依赖收集
- 初始化 null
- 执行effect函数时，将当前effect函数赋值给activeEffect
- 执行完effect函数后，将activeEffect置为null
```js
const buckList = new Set()
let activeEffect = null
function effect(fn) {
  const effectFn = () => {
    try {
      activeEffect = effectFn
      fn()
    } finally {
      activeEffect = null
    }
  }
  effectFn()
}
```
### 2. 依赖收集和触发
```js
const buckList = new Set()
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
```

测试一下
```js
import {
  reactive,
  effect
} from './reactive.mjs'

const state = reactive({
  count: 1,
  name: '张三',
  age: 18,
  info: {
    gender: '男',
    address: '北京'
  },
  arr: [1, 2, 3]
})

effect(() => {
  console.log(state.count)
})

setTimeout(() => {
  state.name = '小易'
}, 1000)
```











