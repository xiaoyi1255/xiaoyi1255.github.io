/**
 * 1、012 按升序排序
 * @param nums 
 */
function sortColors1(nums: number[]): void {
  nums.sort((a, b) => a - b)
  console.log(nums)
};

function sortColors(nums: number[]): void {
  let left = 0, right = nums.length - 1, i = 0;
  while (i <= right) {
    if (nums[i] === 0) { // 当前为0，放到0的下一个位置，左指针右移
      [nums[i], nums[left]] = [nums[left], nums[i]];
      i++;
      left++;
    } else if (nums[i] === 2) {// 当前为2， 放到2的前一个位置，右指针左移 交换过来的可能也是2，所以i不自增
      [nums[i], nums[right]] = [nums[right], nums[i]];
      right--;
    } else { // 遇到2跳过
      i++;
    }
  }
};

const arr = [2, 0, 2, 1, 1, 0]
console.log(sortColors1([...arr]))
console.log(sortColors(arr))