/**
 * 给定一个段落 (paragraph) 和一个禁用单词列表 (banned)。返回出现次数最多，同时不在禁用列表中的单词。

题目保证至少有一个词不在禁用列表中，而且答案唯一。

禁用列表中的单词用小写字母表示，不含标点符号。段落中的单词不区分大小写。答案都是小写字母。
 */
/**
 * 1. 原数组转小写、通过正则匹配所有单词，过滤掉不在禁用列表的单词
 * 2. 使用map记录 单词出现次数
 * 3. 找到出现最多的，返回
 * @param paragraph 
 * @param banned 
 * @returns 
 */
function mostCommonWord(paragraph: string, banned: string[]): string {
  banned = banned.map(item => item.toLowerCase());
  const arr: string[] = paragraph.toLowerCase().match(/\b\w+\b/g)?.filter(item => item && !banned.includes(item)) || [];
  const map = new Map<string, number>();
  for (const item of arr) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  let res = ''
  let max = 0
  for (const [key, value] of map) {
    if (value>max) {
      max = value
      res = key
    }
  }
  return res
};

console.log(mostCommonWord("Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"]));
console.log(mostCommonWord("a, a, a, a, b,b,b,c, c", ["a"]));