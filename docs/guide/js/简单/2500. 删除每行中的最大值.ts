function deleteGreatestValue(grid: number[][]): number {
  if (grid.length === 1) return grid[0].reduce((a, b) => a + b, 0);

  let max = 0;
  let maxLen = 0;
  for (let i = 0; i < grid.length; i++) {
    grid[i].sort((a, b) => b - a);
    maxLen = Math.max(maxLen, grid[i].length);
  }
  console.log(grid)
  for (let i = 0; i < grid.length; i++) {
    let _max = 0;
    for (let j = 0; j < maxLen; j++) {
      let cur = grid[j].unshift()
      console.log(cur, 'cur', j)
      _max = Math.max( cur, _max)
    }
    max += _max;
    
  }
  return max
};

console.log(deleteGreatestValue([[1, 7, 2], [6, 4, 2], [6, 5, 3]]));
console.log(deleteGreatestValue([[10]]));