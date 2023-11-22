/**
 * 给定两个字符串, s 和 goal。如果在若干次旋转操作之后，s 能变成 goal ，那么返回 true 。
s 的 旋转操作 就是将 s 最左边的字符移动到最右边。 
例如, 若 s = 'abcde'，在旋转一次之后结果就是'bcdea' 。
 * @param s 
 * @param goal 
 * @returns 
 * 变量数组，用一个值记录左边累拼加的值
 * 右边值拼左边值看是否等于 goal的值
 */
function rotateString1(s: string, goal: string): boolean {
  if (s.length !== goal.length) {
    return false;
  } else if (s === goal) {
    return true;
  }
  let leftStr = '';
  for (let i = 0; i < s.length; i++) {
    leftStr += s[i];
    const newStr = s.slice(i+1) + leftStr;
    if (newStr === goal) {
      return true
    }
  }
  return false;
};

function rotateString(s: string, goal: string): boolean {
  return Boolean(s.length === goal.length && (s+s.includes(goal)));
}

console.log(rotateString("abcde", "cdeab"));
console.log(rotateString("abc", "abc"));