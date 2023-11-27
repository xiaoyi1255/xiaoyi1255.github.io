/**
 * 对于一个 正整数，如果它和除了它自身以外的所有 正因子 之和相等，我们称它为 「完美数」。
给定一个 整数 n， 如果是完美数，返回 true；否则返回 false。

示例 1：
    输入：num = 28
    输出：true
    解释：28 = 1 + 2 + 4 + 7 + 14
    1, 2, 4, 7, 和 14 是 28 的所有正因子。
示例 2：
    输入：num = 7
    输出：false
 */

function checkPerfectNumber1(num: number): boolean {
  if (num === 1) {
    return false;
  } 
  let sum = 1;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num;
};

function checkPerfectNumber2(num: number): boolean {
  if (num === 1) {
    return false;
  } 
  let sum = 1;
  for (let i = 2; i < num/2; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num;
};

function checkPerfectNumber(num: number): boolean {
  if (num === 1) {
    return false;
  } 
  let sum = 1;
  for (let i = 2; i*i <= num; i++) {
    if (num % i === 0) {
      const j = num / i;
      sum += i + j;
    }
  }
  return sum === num;
};
console.log(checkPerfectNumber(6))