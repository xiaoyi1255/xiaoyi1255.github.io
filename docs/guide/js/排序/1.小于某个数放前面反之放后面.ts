/**
 * 
 * @param arr 未排序数组
 * @param target 目标值 一定是数组中的某一个
 * 题目：实现数组 目标值左边都小于等目标值，右边都大于目标值
 * 思路：双指针
 */

/**
 * 交换数组两个值
 * @param arr 
 * @param i 
 * @param j 
 */
function patition(arr: number[], i: number, j:number) {
  if (i !== j && i<=arr.length && j<arr.length) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// 比target 大 放右边，比target 小方左边，相等不变 ==> 没有说target 在中间
function sort1(arr: number[], target: number): number[] {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    while (arr[right] > target ) {
      right--;
    }
    while (arr[left] < target ) {
      left++;
    }
    if (left > right) return arr;
    if (arr[left] <= target) {
      left++;
    } else {
      patition(arr, left, right);
      right--;
      left++;
    }
  }
  return arr;
}

// 比target 大 放右边，比target 小方左边，相等不变 ==> target 在中间
function sort(arr: number[], target: number): number[] {
  let left = 0;
  let right = arr.length-1;
  let idx = 0
  while (idx <= right) {
    if (arr[idx] < target) {
      [arr[left], arr[idx]] = [arr[idx], arr[left]];
      left++;
      idx++;
    } else if (arr[idx] > target) {
      [arr[right], arr[idx]] = [arr[idx], arr[right]];
      right--;
    } else {
      idx++;
    }
  }
  return arr;
}

// console.log(sort([3, 2, 1,4,2], 0));
// console.log(sort([3, 2, 1,4,2], 1));
console.log(sort([3, 2, 1,4,2], 2));
// console.log(sort([3, 0, 1,4,2], 0));
// console.log(sort([3, 0, 1,4,2], 10));