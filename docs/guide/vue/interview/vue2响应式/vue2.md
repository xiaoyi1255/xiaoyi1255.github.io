---
theme: channing-cyan
---
# Vue2 响应式核心

## 一、响应式原理
-   `数据响应式`: Vue 初始化时，将 `data` 中的属性变成响应式，通过 `getter` 和 `setter` 来监控数据的变化。

-   模板解析与挂载: Vue 将模板解析为渲染函数，并在组件挂载时生成虚拟 DOM。

-   `Watcher` 创建与依赖收集: 当组件挂载时，Vue 创建一个 `Watcher`，负责监控组件的渲染过程。模板中使用到的 `data` 数据会触发依赖收集，`getter` 被调用时会记录哪些数据被使用。
-   `Dep`: 负责依赖管理

    -   `依赖收集`: 模板使用的 `data` 数据被访问时，`getter` 会触发，记录这些数据的依赖关系，确保数据变化时可以通知相应的部分更新。
    -   `依赖更新`: 如果 `data` 数据发生变化，`setter` 被调用，通知 `Watcher` 需要更新视图。

-   视图更新: `Watcher` 收到数据变化的通知后，它会执行回调函数，更新页面内容。
## 二、Observer、Dep、Watcher的理解
- `Observe` 是 Vue 响应式系统的核心类，负责将对象的属性转换为响应式数据。它的主要作用是通过 `getter` 和 `setter` 劫持数据的访问和修改，从而实现数据的响应式。

- `Dep` 是一个依赖管理器，主要负责依赖的收集和通知。它在 `Observe` 中被创建，并与每一个响应式属性相关联。

- `Watcher` 是 Vue 响应式系统中的观察者类，负责监控数据的变化，并在数据变化时执行相应的回调函数。

- `Compile` 是 Vue 的模板编译器类，负责将模板转换为渲染函数。它是 Vue 渲染系统的核心部分，将 HTML 模板解析为能够动态生成虚拟 DOM 的函数。

## 三、具体实现
### Observer
源码传送：[vue2.6/core/observer](https://github1s.com/vuejs/vue/blob/2.6/src/core/observer/index.js)

前言：想必大家对Vue2的响应式的实现都有所耳闻：`Object.defineProperty`，对其不了解的移步[defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

首先介绍一下observe函数, 把普通数据转为响应式数据
#### 1. observe
```js
export function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  let ob
  if (typeof data.__ob__ !== 'undefined') { // 判断是否已经是一个响应式数据
    ob = data.__ob__
  } else {
    ob = new Observer(data)
  }
  return ob
}
```
#### 2. Observer
因为Object.defineProperty只能对属性进行劫持，所以Vue中使用了Observer类进行管理。
- 对象  this.walk
- 数组  this.observeArray, 针对数组还做了原型方法的改写 [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
] 
```js
class Observer {
  constructor(data) {
    this.dep = new Dep()
    this.value = data
    def(data, '__ob__', this)
    if (Array.isArray(data)) {
      // 针对数组处理
      if (hasProto) {
        protoAugment(data, arrayMethods)
      } else {
        copyAugment(data, arrayMethods, arrayKeys)
      }
      this.observeArray(data)
    } else {
      this.walk(data)
    }
    
  }
  walk(data) {
    const keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data, keys[i])
    }
  }
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

```
#### 3. defineReactive（核心）
```js
// defineReactive
export function defineReactive(obj, key, val) {
  const dep = new Dep()

  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newVal) {
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return
      }
      val = newVal
      childOb = observe(newVal)
      dep.notify()
    }
  })
}
```
上面代码中使用了Dep, Dep 就是用来进行依赖管理的类

### Dep

- addSub: watcher依赖存放到依赖列表 subs中
- removeSub：移除依赖
- depend: 触发watcher 进行 依赖收集
- notify：数据改变通知 watcher update => 执行回调、更新
- Dep.target: 全局变量，用于标识当前活跃的依赖
    - 初始化为null, 进行依赖收集时 为当前依赖项（watcher）
    - Dep.target.addDep(this) => watcher.addDep(dep) => dep.addSub依赖项添加到subs中（订阅）

```js
let uid = 0

export default class Dep {
  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
```
接下来可以看一下Watcher
### Watcher
每个依赖项即watcher,观察者类，负责监控数据的变化，并在数据变化时执行相应的回调函数。
- get: 把Dep.target设置为当前依赖，读取值=>触发收集, 最后再设置为null
- addDep：触发 dep.addSub(this)  把watcher 添加到观察列表中
- update: 执行run 重写读取值，执行回调（触发更新）
- parsePath 把 obj = {a:{b:1}} 'obj.a.b' 这个1 拿出来
```js
import { parsePath } from "./utils.mjs";
import Dep from "./dep.mjs";
let uid = 0;

export default class Watcher {
  constructor(vm, expOrFn, cb, options = {}) {
    this.vm = vm;
    this.cb = cb;
    this.options = options;
    this.id = ++uid;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.getter = this.getterFn(expOrFn);
    this.value = options?.lasy ? undefined : this.get();
    this.active = true
  }

  getterFn(expOrFn) {
    if (typeof this.expOrFn === 'function') {
      return this.expOrFn;
    } else {
      return parsePath(expOrFn);
    }
  }

  get() {
    Dep.target = this;
    let value
    try {
      value = this.getter.call(this.vm, this.vm);
    } finally {
      Dep.target = null;
    }
    return value;
  }

  addDep(dep) {
    let id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      let dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
  }
  update() {
    if (this.lazy) {
      this.dirty = true
    } else {
      this.run();
    }
  }
  run() {
    if (this.active) {
      const value = this.get();
      if (value !== this.value || typeof value === 'object' || this.deep) {
        const oldValue = this.value;
        this.value = value;
        this.cb.call(this.vm, value, oldValue);
      }
      
    }
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
}

```
辅助函数
```js
export function isObject(value) {
  return value !== null && typeof value === 'object'
}
export const hasProto = '__proto__' in {}

export function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    enumerable: !!enumerable,
    configurable: true,
    writable: true,
    value
  })
}

export function parsePath(path) {
  if (!path) return noop

  const segments = path.split('.')

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

```

## 总结
首先Vue初始化时，会先把data中的数据转换成响应式数据.劫持set、get

然后在实例挂载前，new Watcher, 先把Dep.target置为当前watcher

当模板中使用到的data数据，就会触发get

getter中判断 Dep.target存在， 调用 dep.apend => Dep.target.addDep(this) => watcher.addDep => dep.addSub(this) 进行依赖收集、再把Dep.target置为null

data数据改变： 触发set  => dep.notify => 遍历依赖列表中依赖项 执行update => watcher.update => 更新（执行回调）












