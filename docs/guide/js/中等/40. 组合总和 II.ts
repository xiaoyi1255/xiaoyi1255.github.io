function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  const dfs = (start: number, temp: number[], sum: number) => {
    if (sum === target) {
      res.push([...temp]);
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1])  continue // 去重
      temp.push(candidates[i]);
      dfs(i+1, temp, sum + candidates[i]);
      temp.pop();
    }
  }
  
  candidates.sort((a, b) => a - b); // 升序 排序，为了在递归遍历时，1.计算结果大于目标直接结束 2.去重
  dfs(0, [], 0);

  return res;

};
console.log(combinationSum([10,1,2,7,6,1,5], 8));

