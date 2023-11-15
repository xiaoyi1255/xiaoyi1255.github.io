/**
 * 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。

如果可以，返回 true ；否则返回 false 。

magazine 中的每个字符只能在 ransomNote 中使用一次。
 * @param ransomNote 
 * @param magazine 
 * 遍历第一个字符串，是否每一个都能在第二个字符串中出现
 *  如果有一个没有出现 => false
 *  如果出现了，用string保存起来并且删除第二个字符串中出现的那个
 *  最后判断 保存起来的和比较的第一个字符串是否相等
 */
function canConstruct(ransomNote: string, magazine: string): boolean {
  let str = ''
  let _magazine = magazine.substring(0)
  for (let i = 0; i < ransomNote.length; i++) {
    if (_magazine.indexOf(ransomNote[i]) === -1) {
      return false
    } else {
      str += ransomNote[i]
      _magazine = _magazine.replace(ransomNote[i], '')
    }
  }
  return str === ransomNote
};

console.log(canConstruct("a", "b"));
console.log(canConstruct("aa", "ab"));
console.log(canConstruct("aa", "aab"));
console.log(canConstruct("aa", "aabaa"));
console.log(canConstruct("aba", "aabaaa"));