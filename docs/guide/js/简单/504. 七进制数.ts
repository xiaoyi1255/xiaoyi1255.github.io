/**
 * 示例 1:
    输入: num = 100
    输出: "202"
示例 2:
    输入: num = -7
    输出: "-10"
 */

/**
 * 100 => 2*7^2 + 2*7^0 => 2*49+2=100
 * 判断正负 除7取余，倒着取
 * @param num 
 */

function convertToBase(num: number): string {
  return num.toString(7);
};

function convertToBase7(num: number): string {
  if (!num) return '0';
  let pre = ''
  if (num<0) {
    pre = '-'
    num = -num
  }
  let res = '';
  while (num > 0) {
    res = (num % 7) + res.toString();
    num = Math.floor(num / 7);
  }
  return pre + res;
};

console.log(convertToBase7(100));
console.log(convertToBase7(-7));