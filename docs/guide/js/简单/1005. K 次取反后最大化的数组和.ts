/**
 * 1、遍历一次原数组，正数部分和负数部分分别累加，并找到最小正数和最大负数、负数push在一个数组
 * 2、会存在两种情况：
 *    1、 k> 负数个数；全部翻转负数后，剩余次数为
 *    偶数无需处理 => 总和 = 正数和-负数和
 *    奇数：比较最小正数和最大负数，把再其翻转一次
 *    2、k<= 负数个数，把负数数组排序，翻转最小的k个即可
 * @param nums 
 * @param k 
 * @returns 
 */

function largestSumAfterKNegations(nums: number[], k: number): number {
  let total = 0
  let totalNeg = 0
  let min = Infinity
  let max = -Infinity
  let negatives: number[] = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= 0) {
      total += nums[i]
      min = Math.min(min, nums[i])
    } else {
      totalNeg -= nums[i]
      negatives.push(nums[i])
      if (nums[i] >= max) {
        max = nums[i]
      }
    }
  }
  if (k > negatives.length) {
    if ((k - negatives.length) % 2 === 1) { // 累加完负数，k 还剩余次数，偶数无需处理，奇数需要减去最小正数 *2 
      if (min > -max) { // 最小正值 > |最大负值|
        totalNeg += max * 2
      } else {
        total -= min * 2
      }
    }
  } else if (k < negatives.length){
    negatives.sort((a, b) => a - b)
    totalNeg = 0
    for (let i = 0; i < negatives.length; i++) {
      if (k > 0) {
        totalNeg -= negatives[i]
        k--
      } else {
        totalNeg += negatives[i]
      }
    }
  }
  return total + totalNeg
}
console.log(largestSumAfterKNegations([2, -3, -1, 5, -4], 2));
console.log(largestSumAfterKNegations([-8, 3, -5, -3, -5, -2], 6)); // 22
console.log(largestSumAfterKNegations([5, 6, 9, -3, 3], 2));