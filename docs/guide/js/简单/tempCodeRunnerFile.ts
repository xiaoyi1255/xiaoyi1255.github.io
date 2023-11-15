function moveZeroes(nums: number[]): void {
  let len = nums.length
  let arr: number[] = []
  for (let i = 0; i < len; i++) {
    if (nums[i]===0) {
      nums.splice(i, 1)
      arr.push(0)
      if (nums[i+1] ===0) {
        i--
      }
    }
  }
  nums.push(...arr)
};