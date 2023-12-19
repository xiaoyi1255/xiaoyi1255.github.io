function findPeakGrid(mat: number[][]): number[] {
  // 二分法查找每行的最大值，然后再从每行最大值中找到最大值
  let left = 0;
  let right = mat.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let maxIndex = getMax(mat[mid]); // 当前行最大值
    // 当前行最大值，和上一行对应位置相比 相比
    if (mid>0 && mat[mid][maxIndex] < mat[mid-1][maxIndex]) {
      right = mid
      continue
    } 
    // 当前行最大值， 和下一行相比，小：左指针右移
    if (mid < mat.length - 1 && mat[mid][maxIndex] < mat[mid+1][maxIndex]) {
      left = mid + 1
      continue
    }
    return [mid, maxIndex]
  }
  function getMax(arr: number[]) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[res]) {
        res = i
      }
    }
    return res
  }
  return []
};

console.log(findPeakGrid([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
])); // [1, 3]

console.log