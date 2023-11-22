
/**
 * 示例 1：
    输入：nums = [3,1,2,4]
    输出：[2,4,3,1]
    解释：[4,2,3,1]、[2,4,1,3] 和 [4,2,1,3] 也会被视作正确答案。
示例 2：
    输入：nums = [0]
    输出：[0]
 * @param nums 
 * 声明一个数组， 遍历原数组，奇数就push，偶数就 unshift
 * 
 */
function sortArrayByParity1(nums: number[]): number[] {
  const resArr: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      resArr.unshift(nums[i]);
    } else {
      resArr.push(nums[i]);
    }
  }
  return resArr;
};

function sortArrayByParity2(nums: number[]): number[] {
  return nums.sort((a, b) => a % 2 - b % 2);
}

function sortArrayByParity(nums: number[]): number[] {
  if (nums.length === 1) return nums;
  const resArr: number[] = [];
  for (let i = 0, j=nums.length-1; i <= j; i++,j--) {
    if (nums[i] % 2 === 0) {
      resArr.unshift(nums[i]);
    } else {
      resArr.push(nums[i]);
    }
    if (i===j) break;
    if (nums[j] % 2 === 0) {
      resArr.unshift(nums[j]);
    } else {
      resArr.push(nums[j]);
    }
  }
  return resArr;
};

console.log(sortArrayByParity([3, 1, 2, 4]));
console.log(sortArrayByParity([0]));
console.log(sortArrayByParity([0,2,4]));