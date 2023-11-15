// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

function isSubsequence(s: string, t: string): boolean {
  if (s.length === t.length) {
    return s === t;
  }
  if (s.length > t.length) {
    return false;
  }
  let i = 0;
  for (let j = 0; j < s.length; j++) {
    let index = t.indexOf(s[j], i)
    if (index !== -1) {
      i = index + 1;
    } else {
      return false;
    }
  }
  return true;
};

console.log(isSubsequence('abc', 'ahbgdc'))
console.log(isSubsequence('axc', 'ahbgdc'))
console.log(isSubsequence('ach', 'ahbgdc'))