function topKFrequent(words: string[], k: number): string[] {
  const map = new Map<string, number>();
  for (const val of words) {
    map.set(val, (map.get(val) || 0) + 1);
  }
  const res: string[] = [...map.entries()].sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1];
  }).map(item => item[0]);
  return res.slice(0, k);
  
};

console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2));