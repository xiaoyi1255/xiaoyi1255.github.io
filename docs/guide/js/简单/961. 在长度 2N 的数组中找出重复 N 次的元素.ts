/**
 * 1、长度为2n, 并且某个重复元素出现次数为n, 所以出现次数大于1 就是结果，
 * 2、记录该元素是否出现过，出现过直接返回
 * @param nums 
 * @returns 
 */

function repeatedNTimes(nums: number[]): number {
  let map = new Map<string, number>();
  let item = 0
  for (let i = 0; i < nums.length; i++) {
    const key = nums[i].toString();
    if (!map.has(key)) {
      map.set(key, 1);
    } else {
      return nums[i];
    }
  }
  return item;
};

console.log(repeatedNTimes([1, 2, 3, 3]));