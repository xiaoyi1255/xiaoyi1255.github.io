/**
 * 1、排序数组
 * 2、双重for + 双指针遍历
 * 3、sum = nums[i] + nums[j] + nums[left] + nums[right]
 * 4、 sum>target, right--; sum<target left++; sum=target => 添加进数组
 * 5、处理边界条件：
 *  1）if (i > 0 && nums[i] === nums[i - 1]) continue;
 *  2）if (j > i + 1 && nums[j] === nums[j - 1]) continue;
 *  3）sum === target时，left++ 和right-- 可能与之相等，如相等跳过
 * @param nums 
 * @param target 
 * @returns 
 */

function fourSum(nums: number[], target: number): number[][] {
  if (nums.length < 4) return [];

  nums.sort((a, b) => a - b);
  const len = nums.length;
  const res: number[][] = [];

  for (let i = 0; i < len - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < len - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let left = j + 1;
      let right = len - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          res.push([nums[i], nums[j], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }
  return res;
}


console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
console.log(fourSum([2, 2, 2, 2, 2], 8));
console.log(fourSum([0, 0, 0, 0], 0));
console.log(fourSum([-2, -1, -1, 1, 1, 2, 2], 0));
console.log(fourSum([1,-2,-5,-4,-3,3,3,5], -11));