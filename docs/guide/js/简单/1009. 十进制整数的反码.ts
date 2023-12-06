/**
 * 本质：转成二进制后， 0 的值当1 计算， 忽略1 即可
 * @param n 
 * @returns 
 */
function bitwiseComplement(n: number): number {
  let _n = n.toString(2);
  let result = 0
  for (let i = 0; i < _n.length; i++) {
    if (_n[i] === '0') {
      result += 2 ** (_n.length - 1 - i)
    }
  }
  return result
};
console.log(bitwiseComplement(5)); // 101 => 010 => 2
console.log(bitwiseComplement(10)); // 1010 => 0101
console.log(bitwiseComplement(4)); // 100 => 001 => 1