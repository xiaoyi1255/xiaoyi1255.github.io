function checkPossibility(nums: number[]): boolean {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i + 1]) { // 后一项比当前小，不满足
      if (nums[i - 1] > nums[i + 1]) { // 前一项比后一项大，把后一项赋值为当前项
        nums[i] = nums[i + 1];
        nums[i + 1] = nums[i];
      }
      count++;
    }
    if (count > 1) return false;
  }
  return true;
};

console.log(checkPossibility([-1, 4, 2, 3]));
console.log(checkPossibility([5, 7, 1, 8]));