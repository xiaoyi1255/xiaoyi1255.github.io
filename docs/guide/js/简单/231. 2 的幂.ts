/**
 * 判断是否是 2的幂  => n=2^x => 求x是不是整数
 * @param n 整数
 */

function isPowerOfTwo1(n: number): boolean {
    return Math.log2(n) % 1 === 0;
};

function isPowerOfTwo(n: number): boolean {
  if (n ===1) {
    return true
  }
  while (n/2 >= 1) {
    n = n/2
  }
  return n === 1
};

console.log(isPowerOfTwo(1));
console.log(isPowerOfTwo(2));
console.log(isPowerOfTwo(3));
console.log(isPowerOfTwo(4));
console.log(isPowerOfTwo(5));
console.log(isPowerOfTwo(8));
console.log(isPowerOfTwo(32));