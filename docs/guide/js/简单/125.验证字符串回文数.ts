/**
 * 1. 利用正则替换 去除非字母和数字的元素
 * 2. 再转为小写
 * 3. 再把字符串翻转比较
 * @param s 
 * @returns 
 */

function isPalindrome1(s: string): boolean {
  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (s.length === 0) return true;
  return s === s.split('').reverse().join('');
};

/**
 * 1. 先去除非字母和数字的元素
 * 2. 再转为小写
 * 3. 最后遍历 首尾 两两比较
 *  - 注意点：字符串可能是单数或者双数
 *  - 单数：遍历到长度除以2 的整数部分
 *  - 双数：刚好遍历到长度一半
 * @param s 
 * @returns 
 */
function isPalindrome(s: string): boolean {
  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (s.length === 0) return true;
  for (let i = 0; i < Math.ceil(s.length/2); i++) {
    if (s[i] !== s[s.length - 1 -i]) {
      return false;
    }
    if (i === Math.floor(s.length/2) ){
      return true
    }
  }
  return true
};

console.log(isPalindrome("100121001"));