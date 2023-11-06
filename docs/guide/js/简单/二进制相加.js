// 给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和。

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  // 二进制转10进制 计算完 => 转成2进制
  // return (Number.parseInt(a, 2) + Number.parseInt(b, 2)).toString(2);
  function padLeft(str='', len=0) {
    len = len - str.length;
    for (let i = 0; i < len; i++) {
      str = '0' + str;
    }
    return str;
  }
  let maxLen = a.length;
  if (a.length !== b.length) {
    maxLen = Math.max(a.length, b.length);
    a = padLeft(a, maxLen);
    b = padLeft(b, maxLen);
  }
  let res = '';
  let carry = 0;
  for (let i = maxLen-1; i >=0; i--) {
    const sum = (a[i] ? Number(a[i]) : 0) + (b[i] ? Number(b[i]) : 0) + carry;

    carry = sum > 1 ? 1 : 0;
    res += sum % 2
  }
  if (carry) {
    res += '1';
  }
  if (res.length > 1 && res[res.length-1] === '0') {
    res = res.slice(0, res.length-1);
  }
  let resStr = '';
  for (let i = res.length-1; i >=0; i--) {
    resStr += res[i];
  }
  return resStr;
};

console.log(addBinary('10', '10'))