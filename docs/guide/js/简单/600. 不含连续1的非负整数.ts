// 给定一个正整数 n ，请你统计在 [0, n] 范围的非负整数中，有多少个整数的二进制表示中不存在 连续的 1 

/**
 * 示例 1:
      输入: n = 5
      输出: 5
      解释: 
      下面列出范围在 [0, 5] 的非负整数与其对应的二进制表示：
      0 : 0
      1 : 1
      2 : 10
      3 : 11
      4 : 100
      5 : 101
      6 : 110
      7 : 111
      8 : 1000
      9 : 1001
      10: 1010
      11: 1011
      其中，只有整数 3 违反规则（有两个连续的 1 ），其他 5 个满足规则。
 * @param n 
 */
function findIntegers(n: number): number {
  let ans = 0
  for (let item = 0; item <= n; item++) {
    const a = item.toString(2)
    if (a === a.replaceAll('11', '')) {
      ans++
    }
  }
  return ans
};

console.log(findIntegers(1))
console.log(findIntegers(2))
console.log(findIntegers(5))
console.log(findIntegers(18))