declare global {
  interface Array<T> {
      groupBy(fn: (item: T) => string): Record<string, T[]>
  }
}

Array.prototype.groupBy = function(fn) {
  const result = {}
  this.forEach(item => {
    const key = fn(item)
    if (!result[key]) {
      result[key] = []
    }
    result[key].push(item)
  })
  return result
} 
console.log([1, 2, 3, 4, 5, 6].groupBy(item => item % 2))