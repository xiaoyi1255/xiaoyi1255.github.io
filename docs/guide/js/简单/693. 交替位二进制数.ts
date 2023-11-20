// 给定一个正整数，检查它的二进制表示是否总是 0、1 交替出现：换句话说，就是二进制表示中相邻两位的数字永不相同。

function hasAlternatingBits(n: number): boolean {
  const _n = n.toString(2);
  return /^(10)*1?$/.test(_n);
};
console.log(hasAlternatingBits(5)); // 101
console.log(hasAlternatingBits(7)); // 111
console.log(hasAlternatingBits(11)); // 1011