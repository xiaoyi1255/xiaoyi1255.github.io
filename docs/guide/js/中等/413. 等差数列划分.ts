/**
 * [1,2,3] => 1
 * [1,2,3,4] =>3
 * [1,2,3,4,5] => 6
 * [1,2,3,4,5,6] => 10
 * [1,2,3,4,5,6,8] =>
 * 123 234 345 456 12345 12345 123456 2345 23456 3456 
 * 新增一个元素，还构成等差 => 增量+1  
 * 1=>3   +2
 * 3=>6   +3
 * 6=>10  +4
 * 新增一个元素，不构成等差 => 增量重置
 * 
 * 
 * @param nums 
 */

function numberOfArithmeticSlices1(nums: number[]): number {
  const len = nums.length;
  if (len < 3) return 0;
  let count = 0;
  let increment = 0;
  for (let i = 2; i < len; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      increment++;
      count += increment;
    } else {
      increment = 0;
    }
  }
  return count;
};
function numberOfArithmeticSlices(nums: number[]): number {
  const len = nums.length;
  if (len < 3) return 0;
  let dp = new Array(len).fill(0);
  let count = 0;
  for (let i = 2; i < len; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      dp[i] = dp[i - 1] + 1;
      count += dp[i];
    } 
  }
  return count;
};

console.log(numberOfArithmeticSlices([1, 2, 3, 4]));
console.log(numberOfArithmeticSlices([1, 2, 3, 4, 5]));
console.log(numberOfArithmeticSlices([1, 2, 3, 4, 5, 6]));
console.log(numberOfArithmeticSlices([1, 2, 3, 4, 5, 6, 8]));