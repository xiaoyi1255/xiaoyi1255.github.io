function permute1(nums: number[]): number[][] {
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

function permute(nums: number[]): number[][] {
  if (nums.length === 1) return [nums];
  const result: number[][] = [];
  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      result.push([...path]); // 将路径加入结果集
      return;
    }
    for (let j =0; j < nums.length; j++) {
      if (path.includes(nums[j])) {
        continue
      }
      path.push(nums[j]); // 加入路径
      backtrack(path); // 递归()
      path.pop(); // 回溯，移除路径中的最后一个元素
    }
  }
  backtrack([] as number[]);

  return result;
};

console.log(permute1([1, 2, 3]));
console.log(permute([1, 2, 3]));