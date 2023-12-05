// 1、冒泡排序 O(n^2) => 两两交换,每次找到最大的或者最小的
function sortArray1(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
      if (nums[j + 1] < nums[j]) {
        [nums[j + 1], nums[j]] = [nums[j], nums[j + 1]]
      }
    }
  }
  return nums
};
// 1、标记是否已有序,遍历到一有序后退出循环
function sortArray2(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    let flag = false
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j + 1] < nums[j]) {
        [nums[j + 1], nums[j]] = [nums[j], nums[j + 1]]
        flag = true
      }
    }
    if (!flag) break;
  }
  return nums
};

// 2、选择排序 => 每轮找到剩余数据最小、最大值放首、尾
function sortArray3(nums: number[]): number[] {
  let len = nums.length
  let minIdx = 0
  for (let i = 0; i < len - 1; i++) {
    minIdx = i
    for (let j = i + 1; j < len; j++) {
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

// 2、选择排序优化 => 每轮找到最大和最小， 放在对应位置
function sortArray4(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let minIdx = left;
    let maxIdx = right;
    for (let i = left; i <= right; i++) {
      if (nums[i] <= nums[minIdx]) {
        minIdx = i;
      }
      if (nums[i] >= nums[maxIdx]) {
        maxIdx = i;
      }
    }

    if (nums[left] > nums[minIdx]) {
      [nums[left], nums[minIdx]] = [nums[minIdx], nums[left]];
    }
    if (nums[right] < nums[maxIdx]) {
      [nums[right], nums[maxIdx]] = [nums[maxIdx], nums[right]];
    }

    left++;
    right--;
  }

  return nums
}

// 3、快速排序 => 找一个基值，比其小放前面，比其大放后面，相等放旁边
function sortArray(nums: number[]): number[] {
  quickSort(nums, 0, nums.length - 1)
  return nums
  function quickSort(nums: number[], left: number, right: number) {
    if (left >= right) {
      return
    }
    let pivot = nums[Math.floor((left + right) / 2)]
    let i = left
    let j = right
    while (i <= j) {
      while (nums[i] < pivot) {
        i++
      }
      while (nums[j] > pivot) {
        j--
      }
      if (i <= j) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
        i++
        j--
      }
    }
    if (left < j) {
      quickSort(nums, left, j)
    }
    if (right > i) {
      quickSort(nums, i, right)
    }
  }

}

// console.log(sortArray4([5, 5, 1, 98, 1, 2, 0, 99, 99, 99, 0, 0, 0]));
// console.log(sortArray4([5, 5, 1, 1, 2, 0, 0, 0]));
console.log(sortArray([5, 2, 3, 1]));