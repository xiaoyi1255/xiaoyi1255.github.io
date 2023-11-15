/**
 * 给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。
这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。
 * @param pattern 
 * @param s 
 * 示例1:
    输入: pattern = "abba", s = "dog cat cat dog"
    输出: true
  示例 2:
    输入:pattern = "abba", s = "dog cat cat fish"
    输出: false
 */

/**
 * 先判断长度 => 遍历 
 *  1.map 不存在key,存进map;map存在value说明映射关系有重复
 * 2. 存在key, 但是不等于map对应的value，说明映射关系有缺失
 */
function wordPattern(pattern: string, s: string): boolean {
  let map = new Map();
  let words = s.split(' ');
  if (pattern.length !== words.length) return false;
  for (let i = 0; i < pattern.length; i++) {
    if (!map.has(pattern[i])){
      if ([...map.values()].includes(words[i])) return false
      map.set(pattern[i], words[i]);
    } else {
      if (map.get(pattern[i]) !== words[i]) {
        return false
      }
    }
  }
  return true;
};

console.log(wordPattern('abba', 'dog cat cat dog'));
console.log(wordPattern('abba', 'dog dog dog dog'));
console.log(wordPattern('abba', 'dog cat cat fish'));
console.log(wordPattern('aaaa', 'dog cat cat dog'));