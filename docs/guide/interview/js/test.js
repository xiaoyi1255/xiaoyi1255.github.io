function memorize(fn) {
  const cacheMap = new Map()
  return function (...args) {
    if (!cacheMap.has(args)) {
      cacheMap.set(args, fn(...args))
    }
    return cacheMap.get(args)
  }
}

const addMemorize = memorize((a, b) => a + b)
const multMemorize = memorize((a, b) => a * b)

console.log(addMemorize(1, 2))
console.log(addMemorize(1, 2))
console.log(addMemorize(1, 4))
console.log(multMemorize(1, 2))
console.log(multMemorize(1, 4))
