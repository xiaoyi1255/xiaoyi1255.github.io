/**
 * 暴力循环 => 直接从0开始自增计算平方
 * 计算结果大于等于目标值 结束，返回 -1
 * 
 * @param n 
 * @returns 
 */
function sqrt(n: number) {
  let left = 0;
  while(left*left <= n) {
    left++;
  }
  return left - 1;
}

function mySqrt(n: number) {
  if (n === 0 || n === 1) {
    return n;
  }
  let left = 0;
  let right =  n;
  let mid = 0
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    const result = mid * mid;
    if (result === n) {
      return mid
    } else if (result < n) {
      left = mid + 1;
    } else if (result > n) {
      right = mid - 1;
    }
  }
  return left - 1;
}
console.log('sqrt(16): ', sqrt(16));
console.log('sqrt(17): ', sqrt(17));
// console.log('sqrt(25): ', sqrt(25));
// console.log('sqrt(100): ', sqrt(100));
// console.log('sqrt(99): ', sqrt(99));
