/**
 * 句子 是一串由空格分隔的单词。每个 单词 仅由小写字母组成。
 * 如果某个单词在其中一个句子中恰好出现一次，在另一个句子中却 没有出现 ，那么这个单词就是 不常见的 。
 */

/**
 * 先通过空格拆分成数组，然后使用Map分包记录其元素出现的次数
 * 最后分包遍历两个Map，找出出现次数为1，并不存在另一个map中的元素
 * @param s1 
 * @param s2 
 * @returns 
 */
function uncommonFromSentences1(s1: string, s2: string): string[] {
  const _s1 = s1.split(' ');
  const _s2 = s2.split(' ');
  const resArr: string[] = [];
  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();
  const maxLen = Math.max(_s1.length, _s2.length);
  for (let i = 0; i < maxLen; i++) {
    const item = _s1[i];
    const item2 = _s2[i];
    if (item) {
      map1.set(item, (map1.get(item) || 0) + 1);
    }
    if (item2) {
      map2.set(item2, (map2.get(item2) || 0) + 1);
    }
  }
  for (const [key,value] of map1.entries()) {
    if (value === 1 && !map2.has(key)) {
      resArr.push(key)
    }
  }
  for (const [key,value] of map2.entries()) {
    if (value === 1 && !map1.has(key)) {
      resArr.push(key)
    }
  }
  return resArr
};

function uncommonFromSentences(s1: string, s2: string): string[] {
  const _s1 = s1.split(' ');
  const _s2 = s2.split(' ');
  const resArr: string[] = [];
  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();
  const maxLen = Math.max(_s1.length, _s2.length);
  for (let i = 0; i < maxLen; i++) {
    const item = _s1[i];
    const item2 = _s2[i];
    if (item && !map1.has(item)) {
      map1.set(item, (map1.get(item) || 0) + 1);
    }
    if (item2 && !map2.has(item2)) {
      map2.set(item2, (map2.get(item2) || 0) + 1);
    }
  }
  for (const [key,value] of map1.entries()) {
    if (value === 1 && !map2.has(key)) {
      resArr.push(key)
    }
  }
  for (const [key,value] of map2.entries()) {
    if (value === 1 && !map1.has(key)) {
      resArr.push(key)
    }
  }
  return resArr
};

console.log(uncommonFromSentences('this apple is sweet', 'this apple is sour'))