

function pivotIndex(nums: number[]): number {
  const total = nums.reduce((a, b) => a + b, 0);
  let sumL = 0 // 左边部分的和
  for (let i = 0; i < nums.length; i++) {
    if (total - nums[i] - sumL === sumL) { // 总 - 左边 - 当前 == 右边的和
      return i
    } else {
      sumL += nums[i]
    }
  }
  return -1
};

console.log(pivotIndex([1, 7, 3, 6, 5, 6]));