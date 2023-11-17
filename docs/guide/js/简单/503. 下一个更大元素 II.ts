/**
 * 
示例 1:
  输入: nums = [1,2,1]
  输出: [2,-1,2]
  解释: 第一个 1 的下一个更大的数是 2；
        数字 2 找不到下一个更大的数； 
        第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
示例 2:
  输入: nums = [1,2,3,4,3]
  输出: [2,3,4,-1,4]
 */

function nextGreaterElements(nums: number[]): number[] {
  const result: number[] = [];
  let hasMax = false
  for (let i = 0; i < nums.length; i++) {
    hasMax =false
    for (let j = i+1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        result.push(nums[j])
        hasMax = true
        break
      }
    }
    if (!hasMax) {
      for (let j = 0; j <= i; j++) {
        if (nums[j] > nums[i]) {
          result.push(nums[j])
          hasMax = true
          break
        }
      }
    }
    !hasMax && result.push(-1)
  }
  return result
};

// console.log(nextGreaterElements([1, 2, 1])); // [2,-1,2]
// console.log(nextGreaterElements([1, 2, 3, 4, 3])); // [2,3,4,-1,4]
console.log(nextGreaterElements([5,4,3,2,1])); // [-1,5,5,5,5]