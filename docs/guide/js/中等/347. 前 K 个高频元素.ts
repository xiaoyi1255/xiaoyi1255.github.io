function topKFrequent(nums: number[], k: number): number[] {
  if (k === nums.length) return [...new Set(nums)];
  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(num, map.has(num) ? map.get(num)! + 1 : 1);
  }
  let res:number[] = [...map.entries()].sort((a, b) => b[1] - a[1]).map(([num]) => num);
  
  return res.slice(0, k);
};
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1,2]