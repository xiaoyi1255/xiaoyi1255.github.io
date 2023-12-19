function findPeakElement(nums: number[]): number {
  let res = 0
  nums.some((num, index) => {
    let after = nums[index + 1] === undefined ? -Infinity : nums[index + 1]
    let before = nums[index - 1] === undefined ? -Infinity : nums[index - 1]
    if (num > after && num > before) {
      return res = index;
    }
  })
  return res
};

console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4]));