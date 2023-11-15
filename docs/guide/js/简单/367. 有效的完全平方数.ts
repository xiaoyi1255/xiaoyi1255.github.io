/**
 * 给你一个正整数 num 。如果 num 是一个完全平方数，则返回 true ，否则返回 false 。

完全平方数 是一个可以写成某个整数的平方的整数。换句话说，它可以写成某个整数和自身的乘积。

不能使用任何内置的库函数，如  sqrt 。
 */

/**
 * 
 */

function isPerfectSquare1(num: number): boolean {
  if (num ===1) {
    return true
  }
  let mid = Math.floor(num / 2);
  while (mid * mid > num) {
    if (mid*mid === num) {
      return true;
    }
    if (mid * mid < num) {
      return false;
    }
    mid--;
  }
  return mid * mid === num;
};

function isPerfectSquare(num: number): boolean {
  if (num ===1) {
    return true
  }
  let left = 1;
  let right = Math.floor(num / 2);
  while (left<= right) {
    let mid = Math.floor((left + right) / 2);
    const square = mid * mid;
    if (square === num) {
      return true;
    } else if (square < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
};

console.log(isPerfectSquare(16))
console.log(isPerfectSquare(14))
console.log(isPerfectSquare(1))
console.log(isPerfectSquare(2))
console.log(isPerfectSquare(3))
console.log(isPerfectSquare(4))
console.log(isPerfectSquare(9))