/**
 * 1、滑动窗口；窗口存在重复，截取重复项之后部分，然后累加当前项，
 * 2、判断窗的最大长度，返回 即可
 * @param s 
 * @returns 
 */

function lengthOfLongestSubstring1(s: string): number {
  if (s.length <= 1) return s.length;

  let maxLen = 0;
  let arr: string[] = [];
  for (let index = 0; index < s.length; index++) {
    const idx = arr.findIndex(x => x === s[index]);
    if (idx >= 0) {
      arr = arr.slice(idx + 1);
    }
    arr.push(s[index]);
    maxLen = Math.max(maxLen, arr.length);
  }
  return maxLen;
};

function lengthOfLongestSubstring(s: string): number {
  if (s.length <= 1) return s.length;

  let maxLen = 0;
  let str: string = '';
  for (let index = 0; index < s.length; index++) {
    const idx = str.indexOf(s[index]);
    if (idx >= 0) {
      str = str.slice(idx + 1);
    }
    str+= s[index];
    maxLen = Math.max(maxLen, str.length);
  }
  return maxLen;
};


console.log(lengthOfLongestSubstring('abcdabcbb'));
console.log(lengthOfLongestSubstring('abcabcbb'));
// console.log(lengthOfLongestSubstring(' '));
// console.log(lengthOfLongestSubstring('auq'));
// console.log(lengthOfLongestSubstring('aaq'));
// console.log(lengthOfLongestSubstring('aa'));

// console.log(strIsRepeat('abca'))