// 给定两个字符串 s 和 t ，它们只包含小写字母。
// 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
// 请找出在 t 中被添加的字母。

function findTheDifference1(s: string, t: string): string {
  for (let i = 0; i < s.length; i++) {
    if (t.indexOf(s[i]) !== -1) {
      t = t.replace(s[i], '');
    }
  }
  return t;
};

function findTheDifference(s: string, t: string): string {
  s = s.split('').sort().join('');
  t = t.split('').sort().join('');
  return t.replace(s, '');
};
console.log(findTheDifference('abcde', 'abcdea'));