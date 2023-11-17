/**
 * 给定一个包含大写字母和小写字母的字符串 s ，返回 通过这些字母构造成的 最长的回文串 。
  在构造过程中，请注意 区分大小写 。比如 "Aa" 不能当做一个回文字符串。

  示例 1:
    输入:s = "abccccdd"
    输出:7
    解释:
    我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
 */

/**
 * 规律：(出现次数未偶数 + 大于2的奇数 -1) === 结果
 * 所以我们使用map记录出现次数，最后遍历map 把符合项相加即可
 */

function longestPalindrome(s: string): number {
  if (s.length < 2) return s.length;
  const map = new Map<string, number>();
  for (const item of s) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  let max = 0;
  for (const item of map.entries()) {
    if (item[1] % 2 === 0) {
      max += item[1];
    } else if (item[1] >1 && item[1] % 2 === 1) {
      max += item[1]-1;
    }
  }
  return s.length === max ? max :  max && max + 1 || 1;
};

console.log(longestPalindrome("abccccdd"))
console.log(longestPalindrome("aba"))
console.log(longestPalindrome("abc"))
console.log(longestPalindrome("aaaaaccc"))
console.log(longestPalindrome("a"))
console.log(longestPalindrome("AB"))