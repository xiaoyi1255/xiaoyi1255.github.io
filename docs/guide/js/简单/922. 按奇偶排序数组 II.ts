function sortArrayByParityII(nums: number[]): number[] {
  const result: number[] = [];
  let even = 0;
  let odd = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      result[even] = nums[i];
      even += 2;
    } else {
      result[odd] = nums[i];
      odd += 2;
    }
  }
  return result
};

console.log(sortArrayByParityII([4, 2, 5, 7]));
console.log(sortArrayByParityII([4, 2, 5, 7,6]));