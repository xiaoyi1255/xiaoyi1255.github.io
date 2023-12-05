type Fn = (accum: number, curr: number) => number

function reduce(nums: number[], fn: Fn, init: number): number {
  if (nums.length === 0) return init
  for (const item of nums) {
    init = fn(init, item)
  }
  return init
};
console.log(reduce([1, 2, 3, 4], (accum, curr) => accum + curr, 0))
console.log(reduce([1, 2, 3, 4], (accum, curr) => accum * curr, 1))