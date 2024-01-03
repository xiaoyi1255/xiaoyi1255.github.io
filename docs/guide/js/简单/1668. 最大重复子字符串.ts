function maxRepeating(sequence: string, word: string): number {
  if (sequence.length === word.length) {
    return sequence === word ? 1 : 0;
  }
  let count = 0;
  for (let i = 0; i < sequence.length; i++) {
    let endIdx = i + word.length;
    if (endIdx > sequence.length) continue;
    if (sequence.slice(i, endIdx) === word) {
      i+=word.length-1;
      count++;
    }
  }
  return count;
};

console.log(maxRepeating("ababc", "ab")); // 2  
console.log(maxRepeating("ababc", "ba")); // 1
console.log(maxRepeating("aaa", "a")); // 1
console.log(maxRepeating("aaaba aaaba aaba aaaba aaaba aaaba aaaba", "aaaba")); // 5
// "aaabaaaabaaabaaaabaaaabaaaabaaaaba"