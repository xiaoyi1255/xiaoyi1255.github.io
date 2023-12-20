/**
 * 1、先判断数组长度是否等于字符串长度
 * 2、遍历数组，分别取数组元素的第一个字母和字符串比较，一个不等返回false
 * @param words 
 * @param s 
 * @returns 
 */
function isAcronym(words: string[], s: string): boolean {
  if(words.length !== s.length) return false
  return words.every((word, i) => word[0] === s[i])
};

console.log(isAcronym(["ac", "dc", "ba", "a"], "adba")) // true