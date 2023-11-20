
/**
 * 给你一个字符串 s，最多 可以从中删除一个字符。
请你判断 s 是否能成为回文字符串：如果能，返回 true ；否则，返回 false 。

示例 1：
  输入：s = "aba"
  输出：true
示例 2：
    输入：s = "abca"
    输出：true
    解释：你可以删除字符 'c' 。
示例 3：
    输入：s = "abc"
    输出：false
 */

function validPalindrome1(s: string): boolean {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if(s[left] !== s[right]) {
      if(s[left+1] !==s[right] && s[left] !== s[right-1]) {
        return false;
      }
      if (s[left] ===s[right-1] || s[left +1] === s[right]) {
        const str1 = s.slice(left, right); // 删除右边一个
        if (str1.split('').reverse().join('') == str1){
          return true
        }
        const str = s.slice(left+1, right+1); // 删除左边一个
        if (str.split('').reverse().join('') == str){
          return true
        }
        return false;
      }
    }
    left++;
    right--;
  }
  return true
};

function validPalindrome(s: string): boolean {
  function isPalindromeRange(start: number, end: number): boolean {
    for (let i = start, j = end; i < j; i++, j--) {
      if (s[i] !== s[j]) {
        return false;
      }
    }
    return true;
  }

  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        isPalindromeRange(left + 1, right) ||  // 删除左边一个
        isPalindromeRange(left, right - 1)     // 删除右边一个
      );
    }
    left++;
    right--;
  }

  return true;
}

console.log(validPalindrome("aba"));
console.log(validPalindrome("abac"));
console.log(validPalindrome("abca"));
console.log(validPalindrome("caba"));
console.log(validPalindrome("abc"));
console.log(validPalindrome("ebcbbececabbacecbbcbe")); // ececabbacec
console.log(validPalindrome('ececacec'))
console.log(validPalindrome('ececacec'))