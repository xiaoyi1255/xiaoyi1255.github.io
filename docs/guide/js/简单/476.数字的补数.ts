/**
 * 对整数的二进制表示取反（0 变 1 ，1 变 0）后，再转换为十进制表示，可以得到这个整数的补数。

例如，整数 5 的二进制表示是 "101" ，取反后得到 "010" ，再转回十进制表示得到补数 2 。
给你一个整数 num ，输出它的补数。
 */

function findComplement1(num: number): number {
  const arr = num.toString(2).split('');
  let res = 0
  arr.some((item, index) => {
    let count = arr.length - index - 1;
    if (item === '0') {
      res += 2 ** count;
    }
  });
  return res
};

function findComplement(num: number): number {
  const str = num.toString(2);
  let res = 0
  for (let i = 0; i < str.length; i++) {
    let count = str.length - i - 1;
    if (str[i] === '0') {
      res += 2 ** count;
    }
  }
  return res
};
console.log(findComplement(5));
console.log(findComplement(1));
