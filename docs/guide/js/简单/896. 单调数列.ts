/**
 * 如果数组是单调递增或单调递减的，那么它是 单调 的。
 * 如果对于所有 i <= j，nums[i] <= nums[j]，那么数组 nums 是单调递增的。 如果对于所有 i <= j，nums[i]> = nums[j]，那么数组 nums 是单调递减的。
 * 当给定的数组 nums 是单调数组时返回 true，否则返回 false。
 * 
 * 示例 1：
    输入：nums = [1,2,2,3]
    输出：true
  示例 2：
    输入：nums = [6,5,4,4]
    输出：true
  示例 3：
    输入：nums = [1,3,2]
    输出：false
 */

/**
 * 1. 直接遍历是否： 前一项都 <= 或者 >= 后一项
 * 2. 比较第一项和最后一项 => 递增 | 递减， 再去遍历看是否都满足
 */

function isMonotonic1(nums: number[]): boolean {
  const isIncremental = nums.every((item, index) => index === 0 ? true : item >= nums[index - 1])
  const isDecremental = nums.every((item, index) => index === 0 ? true : item <= nums[index -1])
  return  isIncremental || isDecremental
}

function isMonotonic(nums: number[]): boolean {
  let isIncremental = nums[0] < nums[nums.length - 1]
  return nums.every((item, index) => index === 0 ? true : isIncremental ? item >= nums[index - 1] : item <= nums[index - 1])
}

console.log(isMonotonic([1,2,2,3]))
console.log(isMonotonic([6,5,4,4]))
console.log(isMonotonic([1,3,2]))