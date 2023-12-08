/**
 * 1、对数组进行二分，查找，二分之后会有有个部分，
 * A: 左有序， 如果值 存在于这部分，右指针左移到mid
 * B：右有序， 如果值 存在这部分，左指针右移到mid
 * 2、值在有序部分=>下一次二分不然有序；
 * 3、如果在无序部分，下一次二分（必然，存在一半有序,另一半无序）
 * @param nums 
 * @param target 
 * @returns 
 */

function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if(nums[mid] === target) {
      return mid;
    } else if (nums[mid] >= nums[left]) { // 左边有序
      if (target >= nums[left] && target <= nums[mid]) {
        // 左边有序，值大于left, 小于 mid 说明值存在于 左半部分 => 右指针左移
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else if (nums[mid] < nums[left]) { // 右边有序 
      if (target >= nums[mid] && target <= nums[right]) {
        // 右边有序，值大于mid， 小于right 说明值 在右半部分 => 左指针右移
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } 
  }
  return -1;
};
console.log(search([4, 5, 6, 7, 0, 1, 2], 8));