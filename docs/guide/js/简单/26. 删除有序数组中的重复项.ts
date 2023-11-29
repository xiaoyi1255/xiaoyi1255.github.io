function removeDuplicates1(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    while (nums[i + 1] === nums[i]) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
}
function removeDuplicates2(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    let s = i
    let len = 1;
    while (nums[i + 1] === nums[i]) {
      len++
      i--
    }
    if (len > 1) {
      nums.splice(s + 1, len - 1)
    }
  }
  return nums.length;
}

function removeDuplicates(nums: number[]): number {
  let pointer = 0;
  for (let i = 0; i < nums.length; ++i) {
    if (nums[pointer] !== nums[i]) {
      nums[++pointer] = nums[i]
    }
  }
  return pointer + 1;
};
console.log(removeDuplicates([1, 1, 2, 2 ,2, 2]));
// console.log(removeDuplicates([1, 2]));
// console.log(removeDuplicates([1]));