function findMinDifference(timePoints: string[]): number {
  const arr: number[] = []
  for (let i = 0; i < timePoints.length; i++) {
    const [h,m] = timePoints[i].split(':')
    arr.push((+h)*60 + (+m))
  }
  arr.sort((a,b)=>a-b)
  let min = Infinity
  for (let i = 0; i < arr.length-1; i++) {
    min = Math.min(min, arr[i+1] - arr[i])
  }
  min = Math.min(min, 1440 - arr[arr.length-1] + arr[0])
  return min
};
console.log(findMinDifference(["23:59", "00:00"]));