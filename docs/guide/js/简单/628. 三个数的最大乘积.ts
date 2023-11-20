// 给你一个整型数组 nums ，在数组中找出由三个数组成的最大乘积，并输出这个乘积。

/**
 * 官方题解：
 * 1. 排序：先排序，再找出 最大3个的乘积 | 最小两个*最大一个， 比较
 * @param nums 
 * @returns 
 */

function maximumProduct(nums: number[]): number {
  if (nums.length === 3) {
    return nums[0] * nums[1] * nums[2];
  }
  nums.sort((a, b) => a - b);
  return Math.max(nums[0] * nums[1] * nums[nums.length - 1], nums[nums.length - 1] * nums[nums.length - 2] * nums[nums.length -3])
};

console.log(maximumProduct([1, 2, 3]));
console.log(maximumProduct([1, 2, 3, 4]));
console.log(maximumProduct([-4, -3, -2, -1]));
console.log(maximumProduct([-4, -3, -2, -1, 6, 0]));