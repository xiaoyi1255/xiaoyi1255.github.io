/**
 * 容积 = 底 * 高（左右柱子中，矮的那根）
 * 1、双指针遍历，计算两个柱子间的容积，是否比最大值大，大就覆盖
 * 2、判断左右指针大小，小的进行移动， 以此循环
 * 3、 返回最大值
 * @param height 
 * @returns 
 */
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let max = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    if (area > max) {
      max = area;
    }
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));