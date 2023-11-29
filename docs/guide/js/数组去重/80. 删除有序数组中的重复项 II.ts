/**
 * 双指针：快慢指针
 * 1、题目给的数组是升序，所以相等的元素只能是相邻
 * 2、快慢指针，初始化为2，因为至多能重复2次 
 * 3、[1, 1, 1, 2]
 *    第一次遍历：a[2] === a[0], 快慢指标的元素相等，快指针++
 *    第二次遍历 a[3] !== a[2], a[2] = a[3]; 慢指针++，变成3
 *     [1,1,2,2] => 返回left:3, => arr => [1,1,2]
 * @param nums 
 * @returns 
 */
function removeDuplicates(nums: number[]): number {
  const REAP_TIMES = 2;
  let left = 0;
  let right = REAP_TIMES;
  while (right < nums.length) {
    if (nums[right] !== nums[left]) {
      nums[left+2] = nums[right];
      left++;
    }
    right++;
  }
  return left+2;
};


console.log(removeDuplicates([1, 1, 1, 2]));
console.log(removeDuplicates([1, 1, 1, 2,2]));