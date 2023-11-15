/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

 /**
  *  
  * @param n 
  * @returns 
  * 二分法：先才 0-n 的中间 => mid = n/2
  *   大了 => 0 - n/2-1
  *   小了 => n/2 -n
  */

function guessNumber(n: number): number {
  let left = 1
  let right = n;
  while (left<=right) {
    const mid = Math.floor((left+right)/2);
    const result = guess(mid);
    if (result === 0) {
      return mid;
    } else if (result === 1) { // 猜小了
      left = mid + 1;
    } else if(result === -1) { // 猜大了
      right = mid - 1;
    }
  }
  return left;
};
console.log(guessNumber(10));

function guess(num: number) {
  const pick = 6;
  if (num === pick) {
    return 0
  } else if (pick > num) {
    return 1
  } else {
    return -1
  }
}