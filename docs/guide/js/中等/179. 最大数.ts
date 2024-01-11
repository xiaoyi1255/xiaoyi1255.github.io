function largestNumber(nums: number[]): string {
  nums.sort((a, b) => +`${b}${a}` - +`${a}${b}`);
  if (nums[0] === 0) return "0";
  return nums.join("");
};

console.log(largestNumber([3, 30, 34, 5, 9])) // "9534330"