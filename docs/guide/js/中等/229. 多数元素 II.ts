function majorityElement(nums: number[]): number[] {
  const result = new Set<number>();
  const map = new Map<number, number>();
  let len3 = nums.length / 3;
  for (const item of nums) {
    const pre = map.get(item) || 0
    map.set(item, pre + 1);
    if (pre + 1 > len3){
      result.add(item);
    }
  }
  return [...result];
};

console.log(majorityElement([3, 2, 3]));