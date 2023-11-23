/**
 * 1、遍历数组用一个map记录 key：[idx1,idx2,idx3]，并且记录数组的最大长度（出现次数最多： maxLen）
 * 2、遍历map, 其中value是数组，其长度为maxLen的，分别计算 第一个下标和最后一个下标只差 +1 ，然后拿到最小的返回即可
 * 3、maxCount = 1 直接返回 1
 *     
 */

function findShortestSubArray(nums: number[]): number {
  if (nums.length === 1) return 1;
  const map = new Map<number, number[]>();
  let maxCount = 0;
  let res = Infinity
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    const arr = map.get(item) || []
    if (map.has(item)) {
      arr?.push(i)
      map.set(item, arr)
    } else {
      map.set(item, [i])
    }
    if (arr.length > maxCount) {
      maxCount = arr.length;
    }
  }
  if (maxCount === 1) return 1;
  for (const [_,value] of map.entries()) {
    const len = value.length;
    if (len === maxCount) {
      const lens = value[len-1] - value[0] +1 ;
      if (lens < res) {
        res = lens
      }
    }
  }
  return res !== Infinity ? res : 1;
};

// console.log(findShortestSubArray([1, 2, 2, 3, 1]));
// console.log(findShortestSubArray([1, 2, 2, 3, 1, 4, 2]));
console.log(findShortestSubArray([2, 1]));