/**
 * 1、除法的本质是找到一个数，使得被除数减去多次除数后的差最接近零。
 * 2、 我们可以使用减法来模拟实现除法
 * 3、题目只需要整数部分：即 减到比被除数小即可
 * 4、注意正负
 * @param dividend 
 * @param divisor 
 */

function divide(dividend: number, divisor: number): number {
  if (dividend === 0 || divisor===0) return 0;
  if (dividend >= 2147483647 && divisor === 1) return 2147483647;
  if (dividend <= -2147483648 && divisor === 1) return -2147483648;
  if (dividend >= 2147483647 && divisor === -1) return -2147483647;
  if (dividend <= -2147483648 && divisor === -1) return 2147483647;
  const isNegative = (dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0);
  let a = Math.abs(dividend);
  let b = Math.abs(divisor);
  let res = 0;
  while (a >= b) {
    let k = 1
    let t = b;
    while (a >= t + t){ // 大于2倍 ，就可以直接+2， 被减数减2*divisor
      k+=k
      t+=t;
    }
    res += k;
    a -= t;

  }
  if (res >= 2147483647) res = 2147483647;
  if (res <= -2147483648) res = -2147483648;
  return isNegative ? -res : res;
};

console.log(divide(10, 3)); // 输出3