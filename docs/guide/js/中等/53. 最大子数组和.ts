/**
 * 1、暴力解法， 哦豁 直接超时
 * @param nums 
 * @returns 
 */
function maxSubArray1(nums: number[]): number {
  let max = nums[0];
  let sum = nums[0];
  for (let i = 0; i < nums.length; i++) {
    sum = 0
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum > max) {
        max = sum;
      }
    }
  }
  return max
};

// 动态规划
function maxSubArray(nums: number[]): number {
  let max = nums[0];
  const dp:number[] = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
    max = Math.max(max, dp[i])
  }
  return max
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));