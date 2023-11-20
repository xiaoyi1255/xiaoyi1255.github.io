/**
 * 
给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
 */



function findLengthOfLCIS1(nums: number[]): number {
  const res: Array<number[]> = [];
  const temp: number[] = []
  nums.forEach((item, index) => {
    if (item < nums?.[index + 1]) {
      temp.push(item)
    } else {
      temp.push(item)
      temp.length && res.push([...temp])
      temp.length = 0
    }
  })
  let maxLen = -Infinity
  res.some(item => {
    if (item.length > maxLen) {
      maxLen = item.length
    }
  })
  return maxLen
};

/**
 * 遍历数组，相邻比较，升序部分用中间数组temp保存，
 * 遇到降序，比较temp长度是否大于最大长度maxLen，大于则更新， 然后重置temp
 * 返回 maxLen
 * @param nums 
 * @returns 
 */
function findLengthOfLCIS(nums: number[]): number {
  const temp: number[] = []
  let maxLen = -Infinity
  nums.forEach((item, index) => {
    if (item < nums?.[index + 1]) {
      temp.push(item)
    } else {
      temp.push(item)
      if (temp.length > maxLen) {
        maxLen = temp.length
      }
      temp.length = 0
    }
  })
  return maxLen
};

console.log(findLengthOfLCIS([1, 3, 5, 4, 7]));
console.log(findLengthOfLCIS([2, 2, 2, 2, 2]));