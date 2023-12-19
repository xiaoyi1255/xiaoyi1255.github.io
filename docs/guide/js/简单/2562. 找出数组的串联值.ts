function findTheArrayConcVal(nums: number[]): number {
  let total = 0
  let left = 0;
  let right = nums.length - 1;
  while (left<=right) {
    if (left===right) {
      total += nums[left];
      return total;
    }
    total += Number('' + nums[left] + nums[right]);
    left++
    right--
  }
  return total;
};

console.log(findTheArrayConcVal([1, 2, 3,1]))