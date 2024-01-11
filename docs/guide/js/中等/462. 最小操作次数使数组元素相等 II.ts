function minMoves2(nums: number[]): number {
  nums.sort((a, b) => a - b)
  let ans = 0;
  let mid = nums[Math.floor(nums.length / 2)]
  for (let i = 0; i < nums.length; i++) {
    ans += Math.abs(nums[i] - mid)
  }
  return ans
};

console.log(minMoves2([1, 2, 3]))
console.log(minMoves2([1, 10, 2, 9]))