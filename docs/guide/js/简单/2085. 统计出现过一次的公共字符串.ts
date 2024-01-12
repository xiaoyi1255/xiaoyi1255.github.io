/**
 * 给你两个字符串数组 words1 和 words2 ，请你返回在两个字符串数组中 都恰好出现一次 的字符串的数目。
 * https://leetcode.cn/problems/count-common-words-with-one-occurrence/description/?envType=daily-question&envId=2024-01-12
 * @param words1 
 * @param words2 
 */
function countWords1(words1: string[], words2: string[]): number {
  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();
  for (const word of words1) {
    map1.set(word, (map1.get(word) ?? 0) + 1);
  }
  let ans = 0;
  for (const word of words2) {
    map2.set(word, (map2.get(word) ?? 0) + 1);
  }
  map1.forEach((value, key) => {
    if (value === 1 && map2.get(key) === 1) {
      ans++;
    }
  })
  return ans;
};

function countWords(words1: string[], words2: string[]): number {
  const map1 = createWordMap(words1);
  const map2 = createWordMap(words2);
  
  let ans = 0;
  
  map1.forEach((value, key) => {
    if (value === 1 && map2.get(key) === 1) {
      ans++;
    }
  });

  return ans;
  function createWordMap(words: string[]): Map<string, number> {
    const wordMap = new Map<string, number>();
    for (const word of words) {
      wordMap.set(word, (wordMap.get(word) ?? 0) + 1);
    }
    return wordMap;
  }
}



console.log(countWords(["leetcode", "is", "amazing", "as", "is"], ["amazing", "leetcode", "is"]));