// 1、冒泡排序 O(n^2) => 两两交换,每次找到最大的或者最小的
function sortArray1(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
      }
    }
    console.log(nums)
  }
  return nums
};
// 标记是否已有序,遍历到一有序后退出循环
function sortArray2(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    let flag = false
    for (let j = 0; j < nums.length-1-i; j++) {
      if (nums[j+1] < nums[j]) {
        [nums[j+1], nums[j]] = [nums[j], nums[j+1]]
        flag = true
      }
    }
    if (!flag) break;
  }
  return nums
};

// 2、选择排序 => 每轮找到剩余数据最小、最大值放首、尾
function sortArray(nums: number[]): number[] {
  let len = nums.length
  let minIdx = 0
  for (let i = 0; i < len-1; i++) {
    minIdx = i
    for (let j = i+1; j < len; j++) {
      if (nums[j] < nums[minIdx]) {
        minIdx = j
      }
    }
    if (i != minIdx) {
      [nums[i], nums[minIdx]] = [nums[minIdx], nums[i]]
    }
  }
  return nums
};

console.log(sortArray([5, 1, 1, 1, 2, 0, 0]));