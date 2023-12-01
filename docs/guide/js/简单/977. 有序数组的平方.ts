function sortedSquares1(nums: number[]): number[] {
  return nums.map((num) => Math.pow(num, 2)).sort((a, b) => a - b);
};

function sortedSquares2(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    nums[left] = Math.pow(nums[left], 2);
    if (left === right) break;
    nums[right] = Math.pow(nums[right], 2);
    left++;
    right--;
  }
  return nums.sort((a, b) => a - b);
};

function sortedSquares(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    nums[left] = Math.pow(nums[left], 2);
    if (left === right) break;
    nums[right] = Math.pow(nums[right], 2);
    left++;
    right--;
  }
  return nums.sort((a, b) => a - b);
};

console.log(sortedSquares([-4, -1, 0, 3, 10]));
console.log(sortedSquares([-7, -3, 2, 3, 11]));
console.log(sortedSquares([2, 3, 3, 4]));