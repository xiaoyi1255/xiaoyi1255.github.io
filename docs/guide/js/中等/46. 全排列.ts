function permute(nums: number[]): number[][] {
  if (nums.length === 1) return [nums];
  const result: number[][] = [];

  function backtrack(path: number[], remaining: number[]) {
    if (path.length === nums.length) {
      result.push([...path]); // 将路径加入结果集
      return;
    }
    for (let j =0; j < remaining.length; j++) {
      if (path.includes(remaining[j])) {
        continue
      }
      path.push(remaining[j]); // 加入路径
      const _remaining = [...nums]
      backtrack(path, _remaining); // 递归()
      path.pop(); // 回溯，移除路径中的最后一个元素
    }
  }
  backtrack([] as number[], nums);

  return result;
};

console.log(permute([1, 2, 3]));