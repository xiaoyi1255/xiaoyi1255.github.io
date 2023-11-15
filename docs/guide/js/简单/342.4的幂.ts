function isPowerOfFour(n: number): boolean {
  while (n/4 >= 1) {
    n = n/4;
  }
  return n ===1
};
console.log(isPowerOfFour(16));
console.log(isPowerOfFour(5));
console.log(isPowerOfFour(14));