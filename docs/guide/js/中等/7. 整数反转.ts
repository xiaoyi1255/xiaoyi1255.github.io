
/**
 * 1、取数值的绝对值，转成字符串去变量
 * 2、从后往前拼接，每次拼接判断一下是否大于 2的32次方 -1
 * 3、返回时判断一下符号即可
 * @param x 
 * @returns 
 */
function reverse(x: number): number {
  if (!x) return x;
  const MAX = Math.pow(2, 31) - 1;
  let x1 = Math.abs(x);
  let str = x1.toString();
  let res = ''
  for (let i = str.length-1; i >=0; i--) {
    res += str[i];
    if (+res > MAX) return 0;
  }
  return +res * (x > 0 ? 1 : -1);
};
console.log(reverse(1534236469));
