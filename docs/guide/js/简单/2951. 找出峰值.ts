function findPeaks(mountain: number[]): number[] {
  let res: number[] = []
  for (let i = 1; i < mountain.length - 1; i++) {
    if (mountain[i] > mountain[i - 1] && mountain[i] > mountain[i + 1]) {
      res.push(i)
    }
  }
  return res
};

console.log(findPeaks([0, 1, 0])) // [1]
console.log(findPeaks([0, 2, 1, 3,1])) // [1]