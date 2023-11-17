/**
 * 给定一个二进制数组 nums ， 计算其中最大连续 1 的个数。
示例 1：
  输入：nums = [1,1,0,1,1,1]
  输出：3
  解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
示例 2:
  输入：nums = [1,0,1,1,0,1]
  输出：2
提示：
1 <= nums.length <= 105
nums[i] 不是 0 就是 1.
 * @param nums 
* 转成字符串，通过0拆分成数组，只剩下'1' '1111'这种，然后遍历数组找到最大长度即可
 */

function findMaxConsecutiveOnes(nums: number[]): number {
  let str = nums.join('').split('0');
  let max = 0;
  for (const item of str) {
    if (item.length>max) {
      max = item.length;
    }
  }
  return max
};

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]))