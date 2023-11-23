// 给你一个字符串 s，找到 s 中最长的回文子串。
// 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
// 示例 1：
// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：
// 输入：s = "cbbd"
// 输出："bb"
// 提示：
// 1 <= s.length <= 1000
// s 仅由数字和英文字母组成
/**
 * 1. 长度为1 或者 set后长度为1 返回原串
 * 2. 声明一个判断通过两下标判断，两坐标间字符串是否是回文
 * 3. 遍历，找与当前字符串所有相同的子串位置（大于已存在回文串长度的再进行回文判断）， 找不到这索引++
 * 4. 找到满足的 ，并且长度最大的回文子串
 */

function longestPalindrome(s: string): string {
  if (s.length === 1) return s
  if ([...new Set(s)].length === 1) return s
  // 验证是否是回文
  function isPalindrome(left: number, right: number): boolean {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false
      }
      left++
      right--
    }
    return true
  }
  let res = s[0]
  let idx = 0
  while (idx < s.length) {
    let right = s.indexOf(s[idx], idx + 1)
    while (right!== -1) {
      if (idx + right > res.length && isPalindrome(idx, right)) {
        let str = s.substring(idx, right + 1)
        if (str.length >= res.length) {
          res = s.substring(idx, right + 1)
        }
      }
      right = s.indexOf(s[right], right + 1)
    }
    idx++
  }
  return res
};
// console.log(longestPalindrome("babad"));
// console.log(longestPalindrome("cbbd"));
// console.log(longestPalindrome("aac"));
// console.log(longestPalindrome("ac"));
// console.log(longestPalindrome("0"));
console.log(longestPalindrome("vvvvvvvv"));
console.log(longestPalindrome('xaabacxcabaaxcabaax')) // "xaabacxcabaax"