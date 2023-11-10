/**
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余 每个元素均出现两次。找出那个只出现了一次的元素。
  你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 * @param nums 
 * 1. 遍历数组，把元素用map保存，key为元素，value为次数
 * 2. 遍历map 找到 value为0 的key返回
 */

function singleNumber1(nums: number[]): number {
  if (nums.length === 1) {
    return nums[0];
  }
  let res = nums[0];
  let map = new Map();
  nums.some((item, index) => {
    map.set(item, !map.has(item) ? 0 : 1)
  })
  map.forEach((value, key) => {
    if (value === 0) {
      return res = key;
    }
  });
  return res;
};

/**
 * 1. 原数组去重累加 *2 - 原数组累加 = 只出现一次的数字
 * @param nums 
 * @returns 
 */
function singleNumber2(nums: number[]): number {
  const total = nums.reduce((pre, cur) => pre + cur);
  const total2 = [...new Set(nums)].reduce((pre, cur) => pre + cur) *2;
  return  total2 - total;
};

function singleNumber(nums: number[]): number {
  let res = 0;
  nums.forEach(item => {
    res ^= item;
  })
  return res;
};

console.log(singleNumber([2, 2, 1, 33, 33]));