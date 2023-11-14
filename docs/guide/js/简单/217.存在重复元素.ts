
/**
 * 数组中是否存在重复元素
 * 1. 转成Set（去重） 再与原数组比较长度
 * 2. 直接遍历，元素存map,重复则返回
 * @param nums 
 */
function containsDuplicate1(nums: number[]): boolean {
    return new Set(nums).size !== nums.length;
};

function containsDuplicate(nums: number[]): boolean {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return true;
    } else {
      map.set(nums[i], 1);
    }
  }
  return false;
};

console.log(containsDuplicate([1,2,3,1]));