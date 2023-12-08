/**
 * 1、3^65 => 3*3^32 => 3^16 => 3^8 => 3^4 => 3^2 => 3
 * 
 * @param x 
 * @param n 
 * @returns 
 */

function myPow(x: number, n: number): number {
  if ([0, 1].includes(x)) {
    return x
  } 
  if (n === 0) return 1
  if (n < 0) {
    x = 1 / x
    n = -n
  }
  function pow(num: number, n: number) {
    if (n === 1) return num
    if (n === 0) return 1
    let mid = Math.floor(n/2)
    const res = pow(num, mid)
    return n % 2 === 0 ? res * res : res * res * num
  }
  return pow(x, n)
};
console.log(myPow(2, 3)) 
console.log(myPow(2, 0)) 
console.log(myPow(2.2, 1)) 
console.log(myPow(2, -8)) 