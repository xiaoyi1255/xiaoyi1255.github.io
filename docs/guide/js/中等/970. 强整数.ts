// 超时待优化
function powerfulIntegers(x: number, y: number, bound: number): number[] {
  if (bound < 2) {
    return []
  } else if (x === 1 && y === 1) {
    return [2]
  }
  const set = new Set<number>()
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
      const sum = x ** i + y ** j
      if (sum > bound) break
      set.add(sum)
    }
  }
  return [...set]
};

console.log(powerfulIntegers(2, 3, 10));
console.log(powerfulIntegers(3, 5, 15));
console.log(powerfulIntegers(3, 5, 0));
console.log(powerfulIntegers(1, 2, 8));
console.log(powerfulIntegers(1, 1, 4000));