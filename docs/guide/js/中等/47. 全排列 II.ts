function permuteUnique(nums: number[]): number[][] {
  const res: number[][] = [];
  const vis = new Array(nums.length).fill(false);
  const backtrack = (path: number[], start: number = 0) => {
    if (start === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; ++i) {
      if ((i > 0 && nums[i] === nums[i - 1] && !vis[i - 1]) || vis[i]) continue;
      path.push(nums[i]);
      vis[i] = true;
      backtrack(path, start + 1);
      vis[i] = false;
      path.pop();
    }
  }
  nums.sort((a, b) => a - b);
  backtrack([], 0);
  return res
};
console.log(permuteUnique([1, 1, 2]))