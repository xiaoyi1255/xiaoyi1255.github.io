/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:
  输入: nums = [0,1,0,3,12]
  输出: [1,3,12,0,0]
 */

function moveZeroes1(nums: number[]): void {
  let len = nums.length
  let arr: number[] = []
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1)
      arr.push(0)
      i--
    }
  }
  nums.push(...arr)
};

function moveZeroes2(nums: number[]): void {
  let len = nums.length
  for (let i = 0; i < len; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1)
      nums.push(0)
      len--
      i--
    }
  }
};

/**
 * 双指针
 * @param nums 
 */
function moveZeroes(nums: number[]): void {
  const len = nums.length;
  let left = 0, right = 0;
  while (right < len) {
    const num = nums[right];
    if (num !== 0) {
      if (left !== right) {
        [nums[right], nums[left]] = [nums[left], nums[right]];
      }
      left++;
    }
    right++;
  }
};
// let nums = [0, 0, 1, 2]
let nums = [1, 2, 0, 3]
moveZeroes(nums)
console.log(nums);
