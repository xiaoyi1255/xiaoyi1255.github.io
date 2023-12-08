/**
 * 1、本质就是看是否存在0
 * 2、存在0 是否能走到0的后面,
 * 3、0是最后一个 返回true
 * 思路：找到0的下标idx, 然后遍历 nums[idx-1]>idx-1, nums[idx-2]>idx-2, 直到第一项；
 * 递归遍历找下一个0，并判断是否满足，直到数组结束
 * 
 * 
 * @param nums 
 * @returns 
 */
function canJump(nums: number[]): boolean {
  if (nums.length === 1 && nums[0] === 0) {
    return true
  }
  let flag = false;
  let idx0 = nums.indexOf(0);
  if (idx0 !== -1) {
    function jump(idx: number) {
      flag = false;
      for (let i = idx - 1; i >= 0; i--) {
        if (nums[i] > idx - i) {
          flag = true
          break;
        }
      }
    }
    while (nums.indexOf(0, idx0) !== -1 && idx0 <= nums.length - 1) {
      if (idx0 === nums.length - 1) {
        return true
      }
      jump(idx0);
      if (!flag) {
        return false
      }
      idx0 = nums.indexOf(0, ++idx0)
    }
    return flag
  }
  return true;
};

// console.log(canJump([2, 3, 1, 1, 4]));
// console.log(canJump([3, 2, 1, 0, 4]));
// console.log(canJump([3, 2, 2, 0, 2, 0, 4]));
// console.log(canJump([2, 0, 0]));
// console.log(canJump([1,1,1,0]));
console.log(canJump([1,0,1,0]));
// console.log(canJump([2,0,1,0,1]));