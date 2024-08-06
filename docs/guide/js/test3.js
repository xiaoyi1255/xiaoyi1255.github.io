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

const p = new MyPromise((resolve, reject) => {
  console.log('promise')
  setTimeout(() => {
    reject('123')
  }, 1000)
})
const p1 = new Promise((resolve, reject) => {
  console.log('promise')
  setTimeout(() => {
    reject('123')
  }, 1000)
})
const arr = [MyPromise.reject('失败'), MyPromise.reject('发生错误啦'), MyPromise.resolve('成功3333')];
async function test() {
  try {
    // const res = await Promise.allSettled(arr)
    // const res = await MyPromise.allSettled(arr)
    // const res = await Promise.all(arr)
    // const res = await MyPromise.all(arr)
    // const res = await Promise.race(arr)
    // const res = await MyPromise.race(arr)
    // const res = await Promise.any(arr)
    // const res = await MyPromise.any(arr)
    // const res = await Promise.resolve('成功')
    // const res = await MyPromise.resolve('成功')
    // const res = await Promise.reject('失败')
    // const res = await MyPromise.reject('失败')
    console.log(res, '成功')
  } catch (error) {
    console.log(error, '失败')
  }
}
// test()
p.then(res => {
  console.log(res, '成功')
}).catch(err => {
  console.log(err, '失败')
})
p1.then(res => {
  console.log(res, '成功1')
}).catch(err => {
  console.log(err, '失败1')
})