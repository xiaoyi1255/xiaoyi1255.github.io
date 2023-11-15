/**
 * 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。
 * 
 * 输入：nums = [3,0,1]
  输出：2
  解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。

 * 1. 遍历找0-n 中数组不存在的返回
 * 2. 0-n 求和 -数组各项之和
 * 3. 排序遍历 num[i] !== i 就返回
 */


function missingNumber1(nums: number[]): number {
  let res = 0
  for (let i = 0; i <= nums.length; i++) {
    if (!nums.includes(i)) {
      res = i;
      return res;
    }
  }
  return res;
};

function missingNumber2(nums: number[]): number {
  let res = 0
  for (let i = 0; i <= nums.length; i++) {
    res += i
  }
  return res - nums.reduce((prev, cur) => prev + cur, 0);
};

function missingNumber(nums: number[]): number {
  let res = 0
  nums.sort((a, b) => a - b);
  for (let i = 0; i <= nums.length; i++) {
    if (nums[i] !== i) {
      res = i
      return i;
    }
  }
  return res;
};

console.log(missingNumber([0, 1]));
console.log(missingNumber([3, 0, 1]));
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));