/**
 * https://leetcode.cn/problems/trapping-rain-water/solutions/692342/jie-yu-shui-by-leetcode-solution-tuvc/
 * 1、站在巨人肩膀上：正反遍历 分别找到最大能接的水滴，不考虑会漏
 * 2、遍历原数组，取 正反两个中较小的 减去当前柱子占的面积
 * 
 * @param height 
 */
function trap(height: number[]): number {
  let len = height.length

  const leftMax: number[] = [height[0]]
  for (let i = 1; i < len; i++) {
    leftMax[i] = Math.max(height[i], leftMax[i - 1])
  }

  const rightMax: number[] = new Array(len).fill(0);
  rightMax[len-1] = height[len-1]
  for (let j = len-2; j >= 0; j--) {
    rightMax[j] = Math.max(height[j], rightMax[j + 1])
  }

  let res = 0;
  for (let i = 0; i < len; i++) {
    res += Math.min(leftMax[i], rightMax[i]) - height[i]
  }

  return res
};

// console.log(trap([0,1,0,2])) //
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])) //