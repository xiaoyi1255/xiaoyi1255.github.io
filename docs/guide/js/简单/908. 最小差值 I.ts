/**
 * 给你一个整数数组 nums，和一个整数 k 。
在一个操作中，您可以选择 0 <= i < nums.length 的任何索引 i 。将 nums[i] 改为 nums[i] + x ，其中 x 是一个范围为 [-k, k] 的整数。对于每个索引 i ，最多 只能 应用 一次 此操作。
nums 的 分数 是 nums 中最大和最小元素的差值。 
在对  nums 中的每个索引最多应用一次上述操作后，返回 nums 的最低 分数 。

示例 1：
  输入：nums = [1], k = 0
  输出：0
  解释：分数是 max(nums) - min(nums) = 1 - 1 = 0。
示例 2：
  输入：nums = [0,10], k = 2
  输出：6
  解释：将 nums 改为 [2,8]。分数是 max(nums) - min(nums) = 8 - 2 = 6。
示例 3：
  输入：nums = [1,3,6], k = 3
  输出：0
  解释：将 nums 改为 [4,4,4]。分数是 max(nums) - min(nums) = 4 - 4 = 0。
 */

  // 1、求最小差值主要是先取到数组中最大元素和最小元素的差值m 
  // 2、然后以这个差值m和2倍的k值对比 
  // 3、如果m-2k > 0 ,说明不管怎么填都差m-2k 
  // 4、如果m-2k <= 0 ,说明一定能填充到一个相等的值，最小差值就为0
function smallestRangeI(nums: number[], k: number): number {
  let max = nums[0]
  let min = nums[0]
  for (let val of nums) {
    max = max > val ? max : val
    min = min < val ? min : val
  }

  const subNum = max - min - 2 * k

  if (subNum > 0) return subNum
  return 0
};

console.log(smallestRangeI([1, 8], 3));