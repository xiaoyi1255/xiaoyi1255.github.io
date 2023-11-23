/**
 * 1: [[1]]
 * 2: [[1],[1,1]]
 * 3: [[1],[1,1], [1,2,1]]
 * 4: [[1],[1,1], [1,2,1], [1,3,3,1]]
 * 5: [[1],[1,1], [1,2,1], [1,3,3,1], [1,4,6,4,1]]
 * 规律：
 *    第n行： 有n个数字
 *    第n+1行：第m个位置的值为 arr[n][m-1]+arr[n][m]
 *        第三行：n=3, 一个三个数字 [1,2,1]
 *                arr[3][0]：arr[2][-1](不存在0) + arr[2][0] => 1
 *                arr[3][1]: arr[2][0]+arr[2][1]   => 1+1   => 2
 *                arr[3][2]: arr[2][1]+arr[2][2] => 1+0=>1
 *         
 */

function generate(numRows: number): number[][] {
  if (numRows === 0) {
    return []
  }else if (numRows === 1) {
    return [[1]]
  }
  const res: number[][] = [[1], [1, 1]]
  for (let i = 2; i < numRows; i++) {
    let temp: number[] = [1]
    for (let j = 0; j < i; j++) {
      temp.push((res[i-1]?.[j] || 0) + (res[i-1]?.[j+1] ||0))
    }
    res.push(temp)
  }
  return res 
};

console.log(generate(5));