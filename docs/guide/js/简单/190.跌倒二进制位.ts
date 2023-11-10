// 颠倒给定的 32 位无符号整数的二进制位。
/**
 * 转为二进制 遍历，注意补0, 元素为1再进行计算即可
 * 二进制转为10 进制
 * 100100 => 1*2^5 + 0*2^4 +0*2^3 + 1 * 2^2 + 0*2^1 + 0*2^0
 * @param n 
 */
function reverseBits(n: number): number {
  let _n = n.toString(2);
  _n = _n.padStart(32, '0');
  _n =_n.replace(/0+$/, '')
  let res = 0
  for (let i = 0; i < _n.length; i++) {
    if (_n[i] === '1') {
      res += Number(_n[i]) * 2 ** (i)
    }
  }
  return res;
};

console.log(reverseBits(0b00000010100101000001111010011100));