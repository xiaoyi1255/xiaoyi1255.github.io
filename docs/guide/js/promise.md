<!-- @format -->

## 手写 promise

### 1.Promise 构造函数

-   Promise 构造函数接受一个函数作为参数，该函数有两个参数，分别是 resolve 和 reject，这两个参数也是函数
-   resolve 函数用于将 Promise 对象的状态从 pending 变为 fulfilled，并将结果传递给 then 方法
-   reject 函数用于将 Promise 对象的状态从 pending 变为 rejected，并将结果传递给 catch 方法
-   在构造函数中，需要定义三个状态：pending、fulfilled 和 rejected，分别表示 Promise 对象的状态
-   构造函数：参数函数立即执行，所有逻辑都放在 executor 函数中，所有 promise 本身是同步的，then\catch 才是异步

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
	constructor(executor) {
		this.status = PENDING
		this.reason = undefined

		const resolve = (value) => {
			if (this.status !== PENDING) return
			this.status = FULFILLED
			this.reason = value
		}

		const reject = (reason) => {
			if (this.status !== PENDING) return
			this.status = REJECTED
			this.reason = reason
		}

		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}
}
```

### 2.then 方法

-   接受两个参数，分别是 onFulfilled 和 onRejected，这两个参数都是函数
-   then 可以链式调用，因为返回一个新的 Promise 对象，该对象的状态由 onFulfilled 和 onRejected 的返回值决定
-   如果是 fulfilled，则把结果传给 onFulfilled 执行，并把执行结果返回给 resolve
-   如果是 rejected，则把结果传给 onRejected 执行，并把执行结果返回给 reject
-   因为 Promise 是微任务，所以我们需要把 onFulfilled、onRejected、resolve、reject 存起来，等到 Promise 的状态改变时，再执行。可以使用数组来存储这些函数，当状态改变时，依次执行这些函数

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
	#status = PENDING // 状态存放
	#reason = null // 存放结果, 只能是成功或者失败其中一个
	#handlers = [] // 存放 onFulfilled、onRejected、resolve、reject

	constructor(executor) {
		const resolve = (reason) => {
			this.#changeState(FULFILLED, reason)
		}
		const reject = (reason) => {
			this.#changeState(REJECTED, reason)
		}
		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}
	then(onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			this.#handlers.push({
				onFulfilled,
				onRejected,
				resolve,
				reject,
			})
			this.#run()
		})
	}

	/**
	 * promise 状态发生改变时：记录状态及结果，并执行run函数
	 * @param {*} state 状态
	 * @param {*} reason 结果
	 * @returns
	 */
	#changeState(state, reason) {
		if (this.#status !== PENDING) return
		this.#status = state
		this.#reason = reason
		this.#run()
	}
	/**
	 * run函数：辅助then函数返回的promise对象有结果时，
	 * 遍历执行所有onFulfilled、onRejected 并把结果传递给下一个promise对象
	 * @returns
	 */
	#run() {
		if (this.#status === PENDING) return
		while (this.#handlers.length) {
			const { onFulfilled, onRejected, resolve, reject } =
				this.#handlers.shift()
			let fn = this.#status === FULFILLED ? onFulfilled : onRejected
			this.#runFn(fn, resolve, reject)
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
				let settled = this.#status === FULFILLED ? resolve : reject
				settled(this.#reason)
				return
			}
			try {
				const res = fn(this.#reason)
				// 当前promise(then)的执行结果传递给下一个promise对象
				resolve(res)
			} catch (error) {
				reject(error)
			}
		}, 0)
	}
}

const p = new MyPromise((resolve, reject) => {
	console.log('promise')
	setTimeout(() => {
		reject('123')
	}, 1000)
})
p.then(
	(res) => {
		console.log(res)
	},
	(err) => {
		console.log(err, 'err')
	}
)
p.then(
	(res) => {
		console.log(res)
	},
	(err) => {
		console.log(err, 'err2')
	}
)
```

### 3.catch 方法

-   catch 方法是状态为 REJECTED 时的处理函数
-   和 then 不同的是 只接受一个 onRejected 参数
    下面是利用 then 实现

```js
catch(onRejected) {
  return this.then(null, onRejected);
}
```

### 4.resolve 方法

-   resolve 方法返回一个状态为 FULFILLED 的 promise 对象
-   接受一个参数 value
-   如果 value 是一个 promise 对象，则返回该 promise 对象
-   否则，返回一个状态为 FULFILLED 的 promise 对象，其值为 value

```js
static resolve(value) {
	if (value instanceof MyPromise) return value
  return new MyPromise((resolve, reject) => {
    resolve(value)
  })
}
```

### 5.reject 方法

-   reject 方法返回一个状态为 REJECTED 的 promise 对象
-   接受一个参数 reason

```js
static reject(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}
```

### 6.finally 方法

-   finally 方法接受一个回调函数作为参数
-   无论 promise 对象的状态是 FULFILLED 还是 REJECTED，都会执行该回调函数
-   finally 方法返回一个 promise 对象，其状态和值与原 promise 对象相同
-   利用 then, 失败和成功都执行一下回调

```js
finally(onFinally) {
  return this.then(
    value => MyPromise.resolve(onFinally()).then(() => value),
    reason => MyPromise.resolve(onFinally()).then(() => {
      throw reason
    })
  )
}
```

### 7.all 方法

-   all 方法接受一个 promise 对象的数组作为参数
-   返回值：有一个失败，则返回失败，否则返回成功
-   往往项目中是所有成功或者失败的结果都要，就使用 allSettled

```js
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
        reject(err)
      })
    }
  })
}
```

### 8. allSettled 方法

-   allSettled 方法接受一个 promise 对象的数组作为参数
-   返回值：返回一个 promise 对象，其状态为 FULFILLED，值为一个数组，数组中的每个元素都是一个对象，表示每个 promise 对象的状态和值

```js

  static allSettled(promiseArr) {
    if (typeof promiseArr[Symbol.iterator] !== 'function') {
      throw new Error('参数必须是可迭代对象')
    }
    return new MyPromise((resolve, reject) => {
      let result = []
      let count = 0
      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then(res => {
          result[i] = { status: 'fulfilled', value: res }
        }, err => {
          result[i] = { status: 'rejected', reason: err }
        })
      }
    })
  }
```

### 9.race 方法

-   race 方法接受一个 promise 对象的数组作为参数
-   返回值：返回最先执行完的 promise 对象的结果, 无论成功、失败

```js
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
```

### 10. any

-   any 方法接受一个 promise 对象的数组作为参数
-   返回值：返回最先成功 promise 对象的结果, 如果全部失败则返回一个失败的 promise 对象

```js
  static any(promiseArr) {
    if (typeof promiseArr[Symbol.iterator] !== 'function') {
      throw new Error('参数必须是可迭代对象')
    }
    return new MyPromise(async(resolve, reject) => {
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
```
