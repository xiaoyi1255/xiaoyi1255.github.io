function findDuplicate(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;
  let set = new Set<number>();
  while (true) {
    if (set.has(nums[left])) return nums[left]
    set.add(nums[left])
    if (set.has(nums[right])) return nums[right]
    set.add(nums[right])
    left++;
    right--;
  }
};

console.log(findDuplicate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 9]))
console.log(findDuplicate([2,1,3,4,2]))