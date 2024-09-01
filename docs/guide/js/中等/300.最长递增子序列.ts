
const nums = [10, 9, 2, 5, 3, 7, 101, 18];

function lengthOfLIS(nums: number[]): number {
  const len = nums.length;
  const dp = new Array(len);
  let max = 1;
  for (let i = 0; i < len; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}

console.log(lengthOfLIS(nums));