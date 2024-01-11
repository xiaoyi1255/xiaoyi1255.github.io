function findContentChildren(g: number[], s: number[]): number {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let count = 0;
  let sIdx = 0
  let gIdx = 0;
  while (sIdx < s.length && gIdx < g.length) {
    if (s[sIdx] >= g[gIdx]) {
      count++;
      sIdx++;
      gIdx++;
    } else {
      sIdx++;
    }
  }
  return count;
};

console.log(findContentChildren([1, 2, 3], [1, 1]));