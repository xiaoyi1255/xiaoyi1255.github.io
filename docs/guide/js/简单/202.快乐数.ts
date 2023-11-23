/**
 * 19
  1^2 + 9^2 = 82
  8^2 + 2^2 = 68
  6^2 + 8^2 = 100
  1^2 + 0^2 + 0^2 = 1
 */

function isHappy(n: number): boolean {
  const set = new Set<number>();
  while (n !== 1) {
    if (set.has(n)) return false
    set.add(n);
    n = ('' + n).split('').reduce((a, b) => a + Math.pow(Number(b), 2), 0);
  }
  return true;
};
console.log(isHappy(1));
console.log(isHappy(2));
console.log(isHappy(7));
// console.log(isHappy(19));
// console.log(isHappy(10));