function maxProduct(nums: number[]): number {
  const len = nums.length
  let res = nums[0]
  let max = nums[0]
  let min = nums[0]
  
  for (let i = 1; i < len; i++) {
    if (nums[i] < 0) {
      [max, min] = [min, max]
    }
    max = Math.max(nums[i], max * nums[i])
    min = Math.min(nums[i], min * nums[i])
    res = Math.max(res, max)
  }
  return res
};

// console.log(maxProduct([1,2,3])) // 6
console.log(maxProduct([1,5,4,5, -2, 1,-200,-1])) // 100