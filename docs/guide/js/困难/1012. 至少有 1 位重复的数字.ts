function numDupDigitsAtMostN1(n: number): number {
  if (n <= 10) return 0;
  let num = 0;
  const isDup = (num: number): boolean => {
    const str = num.toString();
    return new Set(str).size !== str.length;
  }
  for (let i = 10; i <= n; i++) {
    if (isDup(i)) {
      num++;
    }
  }
  return num;
};

function numDupDigitsAtMostN(n: number): number {
  if (n <= 10) return 0;
  let num = 0;
  const isDup = (num: number): boolean => {
    let set = new Set<number>();
    while (num > 0) {
      let xum = num % 10;
      if (set.has(xum)) {
        return true
      }
      set.add(xum);
      num = Math.floor(num / 10);
    }
    return false;
  }
  for (let i = 10; i <= n; i++) {
    if (isDup(i)) {
      num++;
    }
  }
  return num;
};

console.log(numDupDigitsAtMostN(100));
// console.time('test1')
// console.log(numDupDigitsAtMostN(6358960));
// console.timeEnd('test1')
console.time('test')
console.log(numDupDigitsAtMostN(6718458));
console.timeEnd('test')