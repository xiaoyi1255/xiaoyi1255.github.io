// 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。

/**
 * 直接替换掉0， 返回剩下的1的长度
 * @param n 
 * @returns 
 */
function hammingWeight1(n: number): number {
  let _n = n.toString(2);
  _n = _n.replace(/0/g, '')
  return _n.length
};

/**
 * 遍历二进制， 记录1 是次数
 * @param n 
 * @returns 
 */
function hammingWeight(n: number): number {
  let _n = n.toString(2);
  let res = 0
  for (let i = 0; i < _n.length; i++) {
    if (_n[i] === '1') {
      res++
    }
  }
  return res;
};

console.log(hammingWeight(0b11111111111111111111111111111101))