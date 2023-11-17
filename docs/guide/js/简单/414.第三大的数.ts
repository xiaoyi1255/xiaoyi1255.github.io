// 给你一个非空数组，返回此数组中 第三大的数 。如果不存在，则返回数组中最大的数。

/**
 * 
 * 解法1： 先去重，然后排序， 长度大于2就返回第三项，否则返回第一项
 * 解法2： 声明三个变量，遍历数组， 注意赋值的顺序
 *            比max大，third=second；second = max；max = nums[i]
 *            比second大 third = second；second = nums[i]
 *            比third大 third = nums[i]
 */

function thirdMax1(nums: number[]): number {
  const _num = [...new Set(nums)].sort((a, b) => b - a);
  return _num.length > 2 ? _num[2] : _num[0];
};

function thirdMax(nums: number[]): number {
  if (nums.length < 3) return Math.max(...nums);
  let max = -Infinity
  let second = -Infinity
  let third = -Infinity
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      third = second
      second = max
      max = nums[i]
    } else if (nums[i] > second && nums[i] < max) {
      third = second
      second = nums[i]
    } else if (nums[i] > third && nums[i] < second) {
      third = nums[i]
    }
  }
  return third === -Infinity ? max : third;
};

console.log(thirdMax([3, 2, 1])); // 1
console.log(thirdMax([1, 2])); // 2
console.log(thirdMax([3, 2, 1, 2, 3, 4, 5, 6, 7, 8]))