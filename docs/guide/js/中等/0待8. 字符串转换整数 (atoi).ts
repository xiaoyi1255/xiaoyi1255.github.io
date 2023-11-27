function myAtoi(s: string): number {
  const MAX = Math.pow(2, 31) - 1;
  s = s.trimStart();
  const sign = s[0] === '-' ? -1 : 1;
  s = s[0] === '-' ? s.substring(1) : s;
  let res = ''
  const numReg = /^[0-9]$/;
  for (let i = 0; i < s.length; i++) {
    if (!numReg.test(s[i])) {
      return +res * sign
    }
    res += s[i]
    if (+res > MAX) {
      return sign === -1 ? -MAX +1 : MAX
    }
  }
  return +res * sign
};
console.log(myAtoi("42"));
console.log(myAtoi("   -42 9"));