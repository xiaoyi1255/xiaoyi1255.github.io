/**
 * 两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。
给你两个整数 x 和 y，计算并返回它们之间的汉明距离。
示例 1：
  输入：x = 1, y = 4
  输出：2
  解释：
  1   (0 0 0 1)
  4   (0 1 0 0)
        ↑   ↑
  上面的箭头指出了对应二进制位不同的位置。
示例 2：
  输入：x = 3, y = 1
  输出：1
 * @param x 
 * @param y 
 * 先为转二进制，然后补零对齐长度，最后遍历对位不等的数量
 */

function hammingDistance(x: number, y: number): number {
  let x1 = x.toString(2)
  let y1 = y.toString(2)
  if (x1.length>y1.length) {
    y1 = y1.padStart(x1.length, '0')
  } else {
    x1 = x1.padStart(y1.length, '0')
  }
  let count = 0;
  for (let i = 0; i < x1.length; i++) {
    if (x1[i] !== y1[i]) {
      count++
    }
  }
  return count;
};
console.log(hammingDistance(93, 73));
console.log(hammingDistance(3, 1));