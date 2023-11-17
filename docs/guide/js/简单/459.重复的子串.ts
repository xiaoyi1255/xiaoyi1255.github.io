// 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

/**
 * 示例 1:
  输入: s = "abab"
  输出: true
  解释: 可由子串 "ab" 重复两次构成。
示例 2:
  输入: s = "aba"
  输出: false
示例 3:
  输入: s = "abcabcabcabc"
  输出: true
  解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
 * @param s 
 */
/**
 * 遍历字符串，依次提取0-n 个子串看是否能全局替换完
 * 提取的子串一定是原串的整数倍
 */
function repeatedSubstringPattern(s: string): boolean {
  for (let i = 1; i < s.length; i++) {
    const str = s.substring(0, i)
    if (s.length % str.length === 0) { // 原串必然是子串长度整数倍
      if (s.replaceAll(str, '').length === 0) {
        return true
      }
    }
  }
  return false
};

console.log(repeatedSubstringPattern('abab'))
console.log(repeatedSubstringPattern('aba'))
console.log(repeatedSubstringPattern('abcabcabcabc'))
console.log(repeatedSubstringPattern('abaababaab'))