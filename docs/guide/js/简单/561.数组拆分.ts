// 输入：nums = [1,4,3,2]
// 输出：4
// 解释：所有可能的分法（忽略元素顺序）为：
// 1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
// 2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
// 3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
// 所以最大总和为 4

/**
 * 排序后的奇数位之和
 * 因为是个数是偶数 必然成对出现
 * 每一对的都是较小的 之和为最大 
 * 所以只需找到每对中小的那个 加起来即可
 * 如[1,2,3,4] 
 * [1,2]和[3,4] => 1+3 =>4
 * [1,3]和[2,4] => 1+2 =>3
 * [1,4]和[2,3] => 1+2 = 3
 * @param nums 
 */
function arrayPairSum(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < nums.length; i += 2) {
    sum += nums[i];
  }
  return sum;
};

console.log(arrayPairSum([1, 4, 3, 2]));