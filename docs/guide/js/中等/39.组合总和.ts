
// https://leetcode.cn/problems/combination-sum/
function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  const dfs = (start: number, temp: number[], sum: number) => {
    if (sum === target) {
      res.push([...temp]);
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      temp.push(candidates[i]);
      dfs(i, temp, sum + candidates[i]);
      temp.pop();
    }
  }
  
  candidates.sort((a, b) => a - b); // 升序 排序，为了在递归遍历时，计算结果大于目标直接结束
  dfs(0, [], 0);

  return res;

};

console.log(combinationSum([2, 3, 6, 7], 7));