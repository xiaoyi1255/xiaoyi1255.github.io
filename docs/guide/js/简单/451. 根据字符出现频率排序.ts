/**
 * 给定一个字符串 s ，根据字符出现的 频率 对其进行 降序排序 。一个字符出现的 频率 是它出现在字符串中的次数。
 * 
返回 已排序的字符串 。如果有多个答案，返回其中任何一个。
 */

/**
 * 使用map记录元素出现的次数
 * 利用Arrary.from转map为数组进行次数的排序
 * 最后转成字符串
 * @param s 
 * @returns 
 */

function frequencySort(s: string): string {
  const map = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    map.set(c, (map.get(c) || 0) + 1);
  }
  return Array.from(map).sort((a,b) => b[1]-a[1]).map(item => item[0].repeat(item[1])).join('');
};

console.log(frequencySort("treeeeaaa"));