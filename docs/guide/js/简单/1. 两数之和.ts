function twoSum1(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    const idx = nums.indexOf(target - nums[i]);
    if (idx !== -1 && idx !== i) {
      return [i, idx];
    }
  }
  return [];
};


function twoSum(nums: number[], target: number): number[] {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const item = map.get(nums[i]);
    if (item !== undefined && item !== i) {
      return [item, i];
    }
    map.set(target - nums[i], i);
  }
  return [];
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([2, 5, 11, 5], 10));
console.log(twoSum([3,3], 6));