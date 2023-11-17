/**
 * 你总共有 n 枚硬币，并计划将它们按阶梯状排列。对于一个由 k 行组成的阶梯，其第 i 行必须正好有 i 枚硬币。阶梯的最后一行 可能 是不完整的。

  给你一个数字 n ，计算并返回可形成 完整阶梯行 的总行数。
  1: 1
  2: 1
  3: 2  => 1+2
  4: 2  => 1+2
  5: 2  => 1+2
  6: 3  => 1+2+3
  7: 3  => 1+2+3
  8: 3  => 1+2+3
  9: 3  => 1+2+3
  10: 4 => 1+2+3+4
  11: 4 => 1+2+3+4
  12: 4 => 1+2+3+4
  13: 4 => 1+2+3+4
  14: 4 => 1+2+3+4
  15: 5 => 1+2+3+4+5
  21: 6 => 1+2+3+4+5+6
 */

function arrangeCoins(n: number): number {
  let sum = 0;
  let i = 1;
  while (sum <= n) {
    sum += i;
    i++;
  }
  return i-2
};



console.log(arrangeCoins(1));
console.log(arrangeCoins(5));
console.log(arrangeCoins(6));
console.log(arrangeCoins(10));
console.log(arrangeCoins(15));
console.log(arrangeCoins(1050));