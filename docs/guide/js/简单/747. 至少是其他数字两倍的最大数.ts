function dominantIndex1(nums: number[]): number {
  const _nums = nums.slice()
  _nums.sort((a, b) => a - b);
  if (_nums[_nums.length - 1] >= _nums[_nums.length - 2] * 2) {
    return nums.lastIndexOf(_nums[_nums.length - 1]);
  }
  return -1;
};

/**
 * 1. 找到最大值和第二大的值， 最大>= 第二*2 就返回最大的值下标
 * @param nums 
 * @returns 
 */
function dominantIndex(nums: number[]): number {
  let max = -Infinity;
  let secondMax = -Infinity;
  let index = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i]>max) {
      secondMax=max;
      max = nums[i];
      index = i;
    } else if (nums[i]>secondMax) {
      secondMax = nums[i];
    }
  }
  return max >= secondMax*2 ? index : -1;
};
// console.log(dominantIndex([1, 2, 3, 4]));
// console.log(dominantIndex([0,0,3,2]));
console.log(dominantIndex([3,6,1,0]));