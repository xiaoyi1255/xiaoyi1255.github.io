const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #handlers = [];
  #status = PENDING;
  #reason = undefined

  constructor(executor) {
    const resolve = (value) => {
      this.#changeStatus(FULFILLED, value)
    }

    const reject = (reason) => {
      this.#changeStatus(REJECTED, reason)
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #changeStatus(status, value) {
    if (this.#status !== PENDING) return
    this.#status = status
    this.#reason = value
    this.#run()
  }
  #runResult(fn,resolve, reject) {
    setTimeout(() => {
      if (typeof fn !== 'function') {
        let settled = this.#status === FULFILLED ? resolve : reject;
        settled(this.#reason)
        return
      }
      try {
        const data = fn(this.#reason)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }, 0)
  }

  #run() {
    if (this.#status === PENDING) return
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift()
      if (this.#status === FULFILLED) {
          this.#runResult(onFulfilled, resolve, reject)
      } else if (this.#status === REJECTED) {
          this.#runResult(onRejected, resolve, reject)
      }
    }
  }

  then(onFulfilled, onRejected) {
    let promise2 = new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
      this.#run()
    })
    return promise2
  }
}



const p = new MyPromise((resolve, reject) => {
  console.log('promise')
  setTimeout(() => {
    reject('123')
  }, 2000)
})
p.then(res => {
  console.log(res)
}, err => {
  console.log(err, 'err')
})
p.then(res => {
  console.log(res)
}, err => {
  console.log(err, 'err2')
})
