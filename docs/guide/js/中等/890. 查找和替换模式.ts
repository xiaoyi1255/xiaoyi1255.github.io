
function findAndReplacePattern(words: string[], pattern: string): string[] {
  /**
   * 1、先使用一个set记录pattern
   * 2 遍历数组， pattern 和 数组元素长度相等，所以不需要判断长度
   * 3、生成一个map => arr[i][x],v, 如果key arr[i][x]存在，v不等就不满足
   */
  let res: string[] = [];
  let patternSet: Set<string> = new Set(pattern);
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (patternSet.size !== new Set(word).size) {
      continue;
    }
    let map = new Map<string, string>();
    let flag = true;
    for (let j = 0; j < word.length; j++) {
      if (!map.has(word[j])) {
        map.set(word[j], word[j] + pattern[j]);
      } else { 
        if (map.get(word[j]) !== word[j] + pattern[j]) {
          flag = false;
          break;
        }
      }
    }
    if (flag) res.push(word);
  }
  return res;
};

console.log(findAndReplacePattern(["abc", "deq", "mee", "aqq", "dkd", "ccc"], "abb"));
console.log(findAndReplacePattern(["acca", "b", "b"], "abba"));