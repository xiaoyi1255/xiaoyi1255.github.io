/**
 * 双指针：快慢指针
 * 1、题目给的数组是升序，所以相等的元素只能是相邻
 * 2、快慢指针，初始化为2，因为至多能重复2次 
 * 3、[1, 1, 1, 2]
 *    第一次遍历：a[2] === a[2-2], 快慢指标的元素相等，快指针++
 *    第二次遍历 a[3] !== a[2-2], a[2] = a[3]; 慢指针++，变成3
 *    第三次遍历 a[4] !== a[3-2], a[3] = a[4]; 慢指针++，变成4
 * @param nums 
 * @returns 
 */
function removeDuplicates(nums: number[]): number {
  let repeat = 2
  let left = repeat
  for (let right = repeat; right < nums.length; right++) {
    if (nums[right] !== nums[left - repeat]) {
      nums[left++] = nums[right]
    }
  }
  return left
};

console.log(removeDuplicates([1, 1, 1, 2]));