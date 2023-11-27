// 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。



// 示例 1：

// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 示例 2：

// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]
// 示例 3：

// 输入：nums = [], target = 0
// 输出：[-1,-1]


// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109
function searchRange1(nums: number[], target: number): number[] {
  if (!nums.length) {
    return [-1, -1];
  }
  let left = 0;
  let right = nums.length - 1;
  let resArr: number[] = [-1, -1];
  while (left <= right) {
    let mid = (left + right) >> 1;
    if (nums[mid] === target) {
      let temp = mid
      while (nums[mid] === target)  mid--;
      resArr[0] = mid+1;

      while (nums[temp] === target) temp++;
      resArr[1] = temp-1;

      return resArr;
    } else if (nums[mid] > target) { 
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return resArr;
};

function searchRange2(nums: number[], target: number): number[] {
  if (!nums.length) {
    return [-1, -1];
  }
  let left = 0;
  let right = nums.length - 1;
  let resArr: number[] = [-1, -1];
  while (left <= right) {
    if (resArr[0] !== -1 && resArr[1] !== -1) {
      return resArr
    }
    if (nums[left] !== target) {
      left++;
    } else {
      resArr[0] = left;
    }
    if (nums[right] !== target) {
      right--
    } else {
      resArr[1] = right;
    }
  }
  return resArr;
};

function searchRange(nums: number[], target: number): number[] {
  return [
    nums.indexOf(target),
    nums.lastIndexOf(target)
  ];
};

console.log(searchRange2([5, 7, 7, 8,8,8, 10], 8))
console.log(searchRange2([5, 7, 7, 8,8, 10], 8))
console.log(searchRange2([5, 7, 7, 8,8, 10], 12))