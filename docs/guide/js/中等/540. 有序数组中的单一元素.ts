
/**
 * 540. 有序数组中的单一元素
 * 给你一个仅由整数组成的有序数组，其中每个元素都会出现两次，唯有一个数只会出现一次。
请你找出并返回只出现一次的那个数。
 * @param nums 
 */
function singleNonDuplicate(nums: number[]): number {
  let res: number = 0;
  for (let i = 0; i < nums.length; i += 2) {
    if (nums[i] !== nums[i + 1]) {
      res = nums[i];
      break;
    }
  }
  return res;
};

singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])