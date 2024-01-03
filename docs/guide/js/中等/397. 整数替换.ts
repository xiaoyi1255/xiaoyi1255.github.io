function integerReplacement(n: number): number {
  const dp = (n: number): number => {
    if (n < 4) {
      return n-1;
    } else if (n === 4) {
      return 2
    }
    if (n % 2 === 0) {
      return dp(n / 2) + 1
    } else {
      return Math.min(dp(n + 1), dp(n - 1)) + 1
    }
  }
  return dp(n);
};

console.log(integerReplacement(8)); // 3
console.log(integerReplacement(7)); // 4
console.log(integerReplacement(4)); // 2
console.log(integerReplacement(1)); // 0
console.log(integerReplacement(100)); // 50 25 24 12 6 3 2 1
console.log(integerReplacement(65535)); // 