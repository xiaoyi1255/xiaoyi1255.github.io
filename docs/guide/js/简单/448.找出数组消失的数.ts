/**
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

示例 1：
  输入：nums = [4,3,2,7,8,2,3,1]
  输出：[5,6]
 */

function findDisappearedNumbers1(nums: number[]): number[] {
  const resArr: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (!nums.includes(i + 1)) {
      resArr.push(i + 1);
    }
  }
  return resArr;
};

function findDisappearedNumbers2(nums: number[]): number[] {
  const len = nums.length
  const set = new Set(Array.from({length: len}, (_,index) => index+1));
  for (let i = 0; i < len; i++) {
    if (set.has(nums[i])) {
      set.delete(nums[i])
    }
  }
  return [...set];
};


function findDisappearedNumbers(nums: number[]): number[] {
  const len = nums.length
  const set = new Set(nums);
  let arr: number[] = []
  for (let i = 1; i <= len; i++) {
    if (!set.has(i)) {
      arr.push(i);
    }
  }
  return arr
};

console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1]));