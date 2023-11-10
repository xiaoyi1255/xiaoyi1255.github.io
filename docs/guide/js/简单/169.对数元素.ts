// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。


function majorityElement(nums: number[]): number {
  const len = nums.length;
  const map = new Map<number, number>();
  let res: number = nums[0]
  nums.forEach(item => map.set(item, (map.get(item) || 0) + 1));
  map.forEach((value, key) => {
    if (value > len / 2) {
      res = key 
    }
  })
  return res;

};

console.log(majorityElement([0, 2, 2, 3]));