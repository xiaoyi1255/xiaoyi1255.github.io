function firstMissingPositive(nums: number[]): number {
  const set = new Set(nums);
  let i = 1;
  while(true) {
    if (!set.has(i)) {
      return i;
    }
    i++;
    // 防止死循环
  }
};

console.log(firstMissingPositive([1, 2, 0]));