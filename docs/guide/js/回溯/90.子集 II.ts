function subsetsWithDup(nums: number[]): number[][] {
  const n = nums.length
  const result: number[][] = []
  const path: number[] = []
  const set: Set<string> = new Set()
  backtrack(0)
  return result
  function backtrack(startIndex: number) {
    const key = [...path].toString()
    if (!set.has(key)) {
      result.push([...path])
      set.add(key)
    }
    for (let i = startIndex; i < n; i++) {
      path.push(nums[i])
      backtrack(i + 1)
      path.pop()
    }
  }
};
// console.log(subsetsWithDup([1, 2, 2]));
console.log(subsetsWithDup([4, 4, 4, 1, 4]));