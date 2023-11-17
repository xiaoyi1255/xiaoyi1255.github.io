/**
 * 全部字母都是大写，比如 "USA" 。
  单词中所有字母都不是大写，比如 "leetcode" 。
  如果单词不只含有一个字母，只有首字母大写， 比如 "Google" 。
 */

function detectCapitalUse1(word: string): boolean {
  let reg1 = /^[A-Z]*/g
  let reg2 = /^[a-z]*/g
  let reg3 = /^[A-Z][a-z]*/g

  return word.replaceAll(reg1, '').length === 0 || word.replaceAll(reg2, '').length === 0|| word.replaceAll(reg3, '').length === 0
}

function detectCapitalUse(word: string): boolean {
  return /^[A-Z]+$|^[a-z]+$|^[A-Z][a-z]+$/.test(word);
}

console.log(detectCapitalUse("USA"));
console.log(detectCapitalUse("leetcode"));
console.log(detectCapitalUse("Google"));
console.log(detectCapitalUse("googlE"));