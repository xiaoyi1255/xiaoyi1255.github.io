function numJewelsInStones(jewels: string, stones: string): number {
  let set = new Set(jewels);
  let count = 0;

  for (let i = 0; i < stones.length; i++) {
    if (set.has(stones[i])) {
      count++;
    }
  }

  return count
};

console.log(numJewelsInStones('aA', 'aAAbbbb'));