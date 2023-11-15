function isPowerOfThree(n: number): boolean {
  while (n/3 >= 1) {
    n = n/3;
  }
  return n ===1
};

console.log(isPowerOfThree(0));
console.log(isPowerOfThree(1));
console.log(isPowerOfThree(19));
console.log(isPowerOfThree(27));