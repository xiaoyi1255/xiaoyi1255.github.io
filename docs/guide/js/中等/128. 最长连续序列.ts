// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

 

// 示例 1：

// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
// 示例 2：

// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9
 

// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109

function longestConsecutive1(nums: number[]): number {
  if (!nums.length) return 0
  nums = [...new Set(nums)]
  nums.sort((a, b) => a - b)
  let maxLen = 1;
  console.log(nums)
  for (let i = 0; i < nums.length; i++) {
    let idx = i
    if (nums[i] === nums[i+1] -1) {
      while (nums[i] === nums[i+1] -1) {
        i++
      }
      if(i - idx + 1 > maxLen) maxLen = i - idx + 1
    }
  } 
  return maxLen
};

/**
 * 1、用set存储
 * 2、遍历set, 找到不存在比其小1的数（连续数中的最小），然后循环找到比它++ 大1的数
 * 3、记录出现的次数，返回出现的最大次数即可
 */
function longestConsecutive(nums: number[]): number {
  if (!nums.length) return 0
  let maxLen = 0;
  const set = new Set<number>()
  for (const item of nums) {
    set.add(item)
  }
  for (const item of set) {
    if (!set.has(item - 1)) {
      let cur = item
      let len = 1
      while (set.has(cur + 1)) {
        cur++
        len++
      }
      if (len > maxLen) maxLen = len
    }
  }
  return maxLen
};


console.log(longestConsecutive([100,4,200,1,3,2]))
console.log(longestConsecutive([100,4,200,1,8,2]))
console.log(longestConsecutive([100,4,200,10,8,2]))
console.log(longestConsecutive([1,2,0,1]))