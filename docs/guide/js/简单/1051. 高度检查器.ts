function heightChecker(heights: number[]): number {
  const sorts = heights.slice().sort((a, b) => a - b);
  let res = 0;
  for (let i = 0; i < sorts.length; i++) {
    if (sorts[i] !== heights[i]) {
      res++
    }
  }
  return res;
};
console.log(heightChecker([1,1,4,2,1,3])) // 3