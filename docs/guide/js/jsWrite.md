
<!-- js 手写题 2024.8.2 -->

## 1. new 操作符

```js
function myNew(fn, ...args) {
	// 1.创建一个空对象
	const obj = Object.create(null)

	// 2.将空对象的__proto__指向构造函数的prototype
	obj.__proto__ = fn.prototype

	// 3.将构造函数的this指向obj，并执行构造函数
	const res = fn.apply(obj, args)

	// 4.如果构造函数返回一个对象，则返回该对象，否则返回obj
	return res instanceof Object ? res : obj
}
```

## 2. 防抖和节流

```js
// 防抖
function debounce(fn, delay) {
	let timer = null
	return function () {
		const context = this
		const args = arguments
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(context, args)
		}, delay)
	}
}

// 节流
function throttle(fn, delay) {
	let timer = null
	return function () {
		const context = this
		const args = arguments
		if (!timer) {
			timer = setTimeout(() => {
				fn.apply(context, args)
				timer = null
			}, delay)
		}
	}
}
```

## 3. 如何遍历一个对象

```js
const obj = {
	name: '小易',
	age: 18,
	gender: '男',
}
// 1. for...in  会遍历原型上的属性
for (let key in obj) {
	console.log(key, obj[key])
}

// 2. Object.keys 遍历自身可枚举属性
Object.keys(obj).forEach((key) => {
	console.log(key, obj[key])
})

// 3. Object.getOwnPropertyNames
Object.getOwnPropertyNames(obj).forEach((key) => {
	console.log(key, obj[key])
})

// 4. Object.entries
Object.entries(obj).forEach(([key, value]) => {
	console.log(key, value)
})

// 5. Reflect.ownKeys
Reflect.ownKeys(obj).forEach((key) => {
	console.log(key, obj[key])
})
```

## 4. 如何使用 for of 遍历一个对象

for of 只能遍历可迭代对象，对象默认是不可迭代的，所以需要手动实现迭代器
可迭代对象：

-   必须实现一个`Symbol.iterator`方法，
-   这个方法返回一个对象，这个对象包含一个`next`方法，
-   `next`方法返回一个对象，这个对象包含两个属性，`value`和`done`，
-   `value`表示当前迭代的值，`done`表示是否迭代完成

```js
const obj = {
	name: '小易',
	age: 18,
	gender: '男',
}

obj[Symbol.iterator] = function () {
	let index = 0
	let keys = Object.keys(this)
	return {
		next: () => {
			if (index < keys.length) {
				const res = {
					value: [keys[index], this[keys[index]]],
					done: false,
				}
				index++
				return res
			} else {
				return {
					value: undefined,
					done: true,
				}
			}
		},
	}
}

for (let [key, value] of obj) {
	console.log(key, value, 'for...of')
}
```

## 5. 如何隔 1s 打印 1，2s 后打印 2，3s 后打印 3

```js
// 1. 使用Promise + async/await
function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time))
}

async function test() {
	for (let i = 1; i <= 3; i++) {
		await sleep(i * 1000)
		console.log(i)
	}
}

test()

// 2.使用gernerator
function* gen() {
	yield setTimeout(() => console.log(1), 1000)
	yield setTimeout(() => console.log(2), 2000)
	yield setTimeout(() => console.log(3), 3000)
}
let g = gen()
g.next()
g.next()
g.next()
```

## 6. 进阶版发布订阅

```js
class EventEmitter {
	constructor() {
		this.events = {} // 存储事件和回调函数
		this.lazyExecutes = {} // 存储延迟执行的事件和回调函数
	}

	once(eventName, callback) {
		this.on(eventName, callback)
	}
	on(eventName, callback) {
		if (!this.events[eventName]) {
			this.events[eventName] = [callback]
		} else {
			this.events[eventName].push(callback)
		}

		if (
			this.lazyExecutes[eventName] &&
			this.lazyExecutes[eventName]?.length !== 0
		) {
			this.lazyExecutes[eventName].forEach((arg) => {
				this.emit(eventName, ...arg)
			})
			this.lazyExecutes[eventName] = []
		}
	}
	immediately(eventName, callback, flag) {
		flag ? callback() : this.on(eventName, callback)
	}
	emit(eventName, ...rest) {
		this.events[eventName] &&
			this.events[eventName].forEach((cb) => cb.apply(this, rest))
		try {
			if (this.events[eventName] === undefined) {
				if (!this.lazyExecutes[eventName]) {
					this.lazyExecutes[eventName] = []
					this.lazyExecutes[eventName].push(rest)
				} else {
					this.lazyExecutes[eventName].push(rest)
				}
			}
		} catch (error) {
			console.error(error)
		}
	}
	removeListener(eventName, callback) {
		if (this.events[eventName]) {
			this.events[eventName] = this.events[eventName].filter(
				(cb) => cb != callback
			)
		}
	}
	once(eventName, callback) {
		let fn = (rest) => {
			callback(rest)
			this.removeListener(eventName, fn)
		}
		this.on(eventName, fn)
	}
}
```

## 7.实现一键复制

```js
const copyText = (text) => {
	if (!text) {
		console.log('没有复制内容')
		return
	}
	function copy(text) {
		const input = document.createElement('input')
		document.body.appendChild(input)
		input.setAttribute('value', text)
		input.focus()
		input.select()
		document.execCommand('copy')
		document.body.removeChild(input)
	}

	if (navigator?.clipboard) {
		navigator.clipboard.writeText(text).catch((err) => copy(text))
	} else {
		copy(text)
	}
}
```

## 8. 封装一个动画函数:控制一个数的变化

-   规定时间 duration 内从 start 匀速变化到 target
-   callback 在每次变化时执行
-   动画结束执行 callback
-   使用 requestAnimationFrame 实现
-   返回一个终止动画的函数的 id

```js
/**
 *
 * @param {number} start 初始值
 * @param {number} target 目标值
 * @param {number} duration 持续时间
 * @param {function} callback 回调函数
 *
 */
function animation(start, target, duration, callback) {
	let startTime = Date.now()
	function step() {
		let now = Date.now()
		let progress = (now - startTime) / duration
		if (progress > 1) progress = 1
		let value = start + (target - start) * progress
		value = value.toFixed(2)
		callback(value)
		if (progress < 1) {
			requestAnimationFrame(step)
		} else {
			return
		}
	}
	step()
}
```

## 9. 如何实现数组扁平化

本质：将多维数组转换为一维|低纬数组

```js
const arr = [1, [2, [3, [4, [5]]]]]

// 1.使用reduce
function flatten1(arr) {
	return arr.reduce((pre, cur) => {
		return pre.concat(Array.isArray(cur) ? flatten1(cur) : cur)
	}, [])
}

// 2.使用递归
function flatten2(arr) {
	let res = []
	arr.forEach((item) => {
		if (Array.isArray(item)) {
			res = res.concat(flatten2(item))
		} else {
			res.push(item)
		}
	})
	return res
}

// 3. 控制扁平深度
function flatten3(arr, depth = 1) {
	if (depth === 0) return arr
	return arr.reduce((pre, cur) => {
		return pre.concat(Array.isArray(cur) ? flatten3(cur, depth - 1) : cur)
	}, [])
}
```

## 10. 求数组并集、交集、差集

```js
/**
 *
 * @param {*} arr1 数组1
 * @param {*} arr2 数组2
 * @param {*} type 类型: 1: 交集, 2: 差集, 3: 并集
 */
function getIntersect(arr1, arr2, type) {
	if (!Number(type) || !Array.isArray(arr1) || !Array.isArray(arr2)) return
	let s1 = new Set(arr1)
	let s2 = new Set(arr2)
	let res = []
	const mapType = {
		1: 'intersect', // 交集
		2: 'diff', // 差集
		3: 'total', // 并集
	}
	switch (mapType[type]) {
		case 'intersect':
			res = Array.from([...s1].filter((v) => s2.has(v)))
			break
		case 'diff':
			res = Array.from([...s1].filter((v) => !s2.has(v)))
			break
		case 'total':
			res = [...new Set([...s1, ...s2])]
		default:
			break
	}
	return res
}

let arr1 = [1, 3, 4, 5, 6, 9]
let arr2 = [2, 4, 677, 84, 5]
console.log(getIntersect(arr1, arr2, 1)) //[ 4, 5 ]
console.log(getIntersect(arr1, arr2, 2)) //[ 1, 3, 6, 9 ]
console.log(getIntersect(arr1, arr2, 3)) //[ 1, 3, 4, 5, 6, 9, 2, 677, 84 ]
```

## 11. 实现深拷贝

-   序列化反序列化: JSON.parse(JSON.stringify(obj))
    -   缺点： 无法处理函数、循环引用、特殊对象（Date、RegExp、Set、Map）
-   递归
-   第三方库 loadsh

```js
function deepClone(obj, map = new WeakMap()) {
	if (typeof obj !== 'object' || obj === null) return obj

	// 处理循环引用
	if (map.has(obj)) return map.get(obj)

	// 处理日期对象
	if (obj instanceof Date) return new Date(obj)
	// 处理正则对象
	if (obj instanceof RegExp) return new RegExp(obj)

	// Handle Map
	if (obj instanceof Map) {
		const mapCopy = new Map()
		map.set(obj, mapCopy)
		for (const [key, value] of obj) {
			mapCopy.set(deepClone(key, map), deepClone(value, map))
		}
		return mapCopy
	}

	// Handle Set
	if (obj instanceof Set) {
		const setCopy = new Set()
		map.set(obj, setCopy)
		for (const value of obj) {
			setCopy.add(deepClone(value, map))
		}
		return setCopy
	}

	let res = Array.isArray(obj) ? [] : {}
	map.set(obj, res)

	for (let key in obj) {
		// for...in会遍历原型链上的属性
		if (obj.hasOwnProperty(key)) {
			// 只拷贝对象自身的属性
			res[key] = deepClone(obj[key], map)
		}
	}
	return res
}
```
## 12. 手写call、apply、bind
- call、apply、bind 都能改变函数的this指向
- call、apply 会立即执行，返回执行结果
- bind 不会立即执行，返回一个函数
- call、apply 传参方式不同，call 传参逐个传入，apply 传参以数组形式传入
- bind 可以传参，也可以不传参

```js

// call
Function.prototype._call = function (context, ...arg) {
  if ([null, undefined].includes(context)) {
    context = window
  } else {
    context = Object(context)
  }
  const syb  = Symbol('call-weiyi') // 代表唯一不重复
  context[syb] = this;
  const res = context[syb](...arg);
  delete context[syb]
  return res
}

// apply
Function.prototype._apply = function (context,arr) {
  if ([null, undefined].includes(context)) {
    context = window
  } else {
    context = Object(context)
  }
  const syb  = Symbol('apply-weiyi') // 代表唯一不重复
  context[syb] = this;
  const res = context[syb](...arr);
  delete context[syb]
  return res
}

// bind
Function.prototype._bind = function (context, arg) {
  if ([null, undefined].includes(context)) {
    context = window
  } else {
    context = Object(context)
  }
  const syb  = Symbol('bind-weiyi') // 代表唯一不重复
  context[syb] = this;
  const res = context[syb];
  return function (...arg) {
    return res._call(context, ...arg)
  }
}

```
## 13. 实现简易的并发请求控制
1. 使用三方库：p-limit
2. 手写实现

```js
/**
 * 并发请求控制
 * @param {Array} urls 请求地址列表
 * @param {Number} maxNum 最大并发数
 * @returns {Promise}
 */
async function request(urls, maxNum) {
  return new Promise((resolve, reject) => {
    const result = []
    let index = 0
    let count = 0
    async function fetchFn() {
      if (index === urls.length) {
        return
      }
      const url = urls[index]
      index++
      try {
        const res = await fetch(url)
        result[index] = res
      } catch (error) {
        result[index] = error
      } finally {
        count++
        if (count === urls.length) {
          resolve(result)
        } else {
          fetchFn()
        }
      }
    }
    let len = Math.min(maxNum, urls.length)
    for (let i = 0; i < len; i++) {
      fetchFn()
    }
  })
}

// 测试
 request(['https://www.baidu.com', 'https://www.baidu.com', 'https://www.baidu.com', 'https://www.baidu.com', 'https://www.baidu.com', 'https://www.baidu.com', 'https://www.baidu.com', 'https://www.baidu.com', 'https://www.baidu.com', 'https://www.baidu.com'], 3)
```

## 14. 手写Promise
- then
- catch
- finally
- all
- race
- allSettled
- any
- resolve
- reject
```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #status = PENDING; // 状态存放
  #reason = null; // 存放结果, 只能是成功或者失败其中一个
  #handlers = []; // 存放 onFulfilled、onRejected、resolve、reject

  constructor(executor) {
    const resolve = (reason) => {
      this.#changeState(FULFILLED, reason)
    }
    const reject = (reason) => {
      this.#changeState(REJECTED, reason)
    }
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      });
      this.#run();
    });

  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
  finally(onFinally) {
    return this.then(
      value => MyPromise.resolve(onFinally()).then(() => value),
      reason => MyPromise.resolve(onFinally()).then(() => {
        throw reason
      })
    )
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }

  static all(promiseArr) {
    if (typeof promiseArr[Symbol.iterator] !== 'function') {
      throw new Error('参数必须是可迭代对象')
    }
    return new MyPromise((resolve, reject) => {
      let result = []
      let count = 0
      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then(res => {
          result[i] = res
          count++
          if (count === promiseArr.length) {
            resolve(result)
          }
        }, err => {
          reject(err) // 失败一个则返回这个失败的结果
        })
      }
    })
  }

  static race(promiseArr) {
    if (typeof promiseArr[Symbol.iterator] !== 'function') {
      throw new Error('参数必须是可迭代对象')
    }
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then(res => {
          resolve(res) // 返回第一个成功的结果
        }, err => {
          reject(err) // 失败一个则返回这个失败的结果
        })
      }
    })
  }

  static allSettled(promiseArr) {
    if (typeof promiseArr[Symbol.iterator] !== 'function') {
      throw new Error('参数必须是可迭代对象')
    }
    return new MyPromise((resolve, reject) => {
      let result = []
      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then(res => {
          result[i] = { status: 'fulfilled', value: res }
        }, err => {
          result[i] = { status: 'rejected', reason: err }
        })
      }
      resolve(result)
    })
  }

  static any(promiseArr) {
    if (typeof promiseArr[Symbol.iterator] !== 'function') {
      throw new Error('参数必须是可迭代对象')
    }
    return new MyPromise(async (resolve, reject) => {
      const result = []
      for (let i = 0; i < promiseArr.length; i++) {
        try {
          const res = await promiseArr[i]
          resolve(res)
        } catch (error) {
          result[i] = { status: 'rejected', reason: error }
          if (i === promiseArr.length - 1) {
            reject(result)
          }
        }
      }

    })

  }

  /**
   * promise 状态发生改变时：记录状态及结果，并执行run函数
   * @param {*} state 状态
   * @param {*} reason 结果
   * @returns 
   */
  #changeState(state, reason) {
    if (this.#status !== PENDING) return;
    this.#status = state;
    this.#reason = reason;
    this.#run();
  }
  /**
   * run函数：辅助then函数返回的promise对象有结果时，
   * 遍历执行所有onFulfilled、onRejected 并把结果传递给下一个promise对象
   * @returns 
   */
  #run() {
    if (this.#status === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift();
      let fn = this.#status === FULFILLED ? onFulfilled : onRejected;
      this.#runFn(fn, resolve, reject);
    }
  }
  /**
   * setTimeout执行模拟微任务的执行环境
   * @param {*} fn onFulfilled | onRejected
   * @param {*} resolve 通过resolve传递给下一个promise对象
   * @param {*} reject 
   * 
   */
  #runFn(fn, resolve, reject) {
    setTimeout(() => {
      if (typeof fn !== 'function') {
        let settled = this.#status === FULFILLED ? resolve : reject;
        settled(this.#reason)
        return
      }
      try {
        const res = fn(this.#reason);
        // 当前promise(then)的执行结果传递给下一个promise对象
        resolve(res)
      } catch (error) {
        reject(error)
      }
    }, 0)
  }
}
```
## 15. 前端埋点上报
前端埋点上报：
- 传统请求方式axios\fetch
    - 优点：请求方式任意，上报数据无限制
		- 缺点：数据上报的实时性差，需要等待js执行完成，且可能会阻塞页面渲染
- sendBeacon
	  - 优点：不占用浏览器请求通道，不会阻塞页面
		- 缺点：只支持post请求
- img
    - 优点：不存在跨域问题、不需要插入dom
		- 缺点：只支持get请求，上报数据体大小有限制
```ts
const url = '';
export function reportBySendBeacon(data: any) {
  if (!navigator?.sendBeacon) {
    return reportByImg(data)
  }
  return navigator.sendBeacon(url, JSON.stringify(data));
}

export function reportByImg(data={}) {
  const img = new Image();
  const query = new URLSearchParams(data).toString();
  img.src = `${url}?data=${JSON.stringify(query)}`;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve('Success');
    img.onerror = () => reject('Error');
  })
}

export function reportFetch(data: any) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

```

## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾