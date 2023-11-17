// 和谐数组是指一个数组里元素的最大值和最小值之间的差别 正好是 1 。

// 现在，给你一个整数数组 nums ，请你在所有可能的子序列中找到最长的和谐子序列的长度。

// 数组的子序列是一个由数组派生出来的序列，它可以通过删除一些元素或不删除元素、且不改变其余元素的顺序而得到。

// 示例 1：
// 输入：nums = [1,3,2,2,5,2,3,7]
// 输出：5
// 解释：最长的和谐子序列是 [3,2,2,2,3]
// 示例 2：
// 输入：nums = [1,2,3,4]
// 输出：2
// 示例 3：
// 输入：nums = [1,1,1,1]
// 输出：0

/**
 * 1. 先判断值是否有不同
 * 2. 遍历数组，把与每一项能组成只差为1的元素 放进数组
 * 3. 遍历结果数组，返回长度最大的即可
 * @param nums 
 * @returns 
 */
function findLHS1(nums: number[]): number {
  if ([...new Set(nums)].length === 1) {
    return 0
  }
  let result: Array<number>[]= []
  let i = 0
  for (const item of nums) {
    let carry = nums[i]
    if (item+1 === carry || item === carry) {
      result.push(nums.filter(v => (v === item || v===item+1)))
    }
    i++
  }
  let res = 0
  for (const item of result) {
    if ([...new Set(item)].length !== 1 && item.length>res) {
      res = item.length
    }
  }
  return res;
};

/**
 * 1.记录元素出现次数
 * 2. 遍历map 找到大改数1 的元素出现的次数，计算两个出现次数之和
 * 3. 找到最大长度即可
 */
function findLHS(nums: number[]): number {
  let map = new Map<number, number>();
  for (const item of nums) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  if (map.size === 1) {
    return 0
  }
  let res = 0
  for (const [key, value] of map) {
    if (map.has(key + 1) ) {
      res = Math.max(res, value + map.get(key + 1)!)
    }
  }
  return res;
};

// console.log(findLHS([1,3,2,2,5,2,3,7])); // [3,2,2,2,3] 5
console.log(findLHS([1,1,1,1]))
console.log(findLHS([1,1,1,2]))
// console.log(findLHS([1,2,1,3]))