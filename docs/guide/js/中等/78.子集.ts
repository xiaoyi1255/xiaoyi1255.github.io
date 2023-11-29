function subsets(nums: number[]): number[][] {
  const n = nums.length
  const result: number[][] = []
  const path: number[] = []
  backtrack(0)
  return result
  function backtrack(startIndex: number) {
    result.push([...path])
    for (let i = startIndex; i < n; i++) {
      path.push(nums[i])
      backtrack(i + 1)
      path.pop()
    }
  }
};
console.log(subsets([1, 2, 3]));
console.log(subsets([1, 2, 3, 4]));
console.log(subsets([1, 2, 3, 4, 5])); 