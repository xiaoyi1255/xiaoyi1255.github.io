<!-- @format -->

# vue3 响应式系统之 reactive 和 ref 的实现

## 前言

本文主要介绍 vue3 响应式系统中的 reactive 和 ref 的实现，以及它们之间的区别和联系。

## reactive

reactive 函数用于将一个对象转换为响应式对象。

-   用法 reactive(obj)
-   参数 obj: 需要转换为响应式对象的普通对象
-   返回值: 响应式对象

```js
const data = reactive({
	name: '小易',
	paly: function () {
		console.log('播放')
	},
	habbits: ['吃饭', '睡觉', '打豆豆'],
})
```

### reactive 具体实现

1. 判断参数 obj 是否为对象，如果不是对象则直接返回 obj。
2. 判断参数 obj 是否已经被转换为响应式对象，如果是则直接返回 obj。
3. 创建一个响应式对象 proxy，使用 ES6 的 Proxy 对象来实现响应式。
4. get 时，如果获取的属性值是对象，则递归调用 reactive 函数将其转换为响应式对象。


```js
const reactiveMap = new WeakMap();

const handler = {
  get(target, key) {
    // console.log(`get ${key}`)
    const res = Reflect.get(target, key)
    return typeof res === 'object' ? reactive(res) : res
  },
  set(target, key, value) {
    const res = Reflect.set(target, key, value)
    // console.log(`set ${key}`, value)
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
### reactive 的局限性

-   只能将对象转换为响应式对象，不能将数组转换为响应式对象。
-   不能监听到对象属性的删除和添加。
-   不能监听到对象属性的修改。

