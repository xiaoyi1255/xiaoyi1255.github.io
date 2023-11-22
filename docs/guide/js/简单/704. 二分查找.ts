/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。


 */

/**
 * 双指针遍历，判断下标mid （左右指针的一半） 是否 为目标值
 * 小，左指针=> 目标值+1
 * 大，右指针=> 目标值-1
 * @param nums 
 * @param target 
 * @returns 
 */

function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {

    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1
};
console.log(search([-1, 0, 3, 5, 9, 12], 9));
console.log(search([-1,0,3,5,9,12], 2));
console.log(search([2,5], 5));
console.log(search([2,3,4,5], 5));