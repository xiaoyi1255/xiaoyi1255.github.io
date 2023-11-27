function myAtoi(s: string): number {
  const MAX = Math.pow(2, 31);
  s = s.trimStart();
  let sign: number = 1;
  let isChange = false;
  let res = ''
  const numReg = /^[0-9]$/;
  for (let i = 0; i < s.length; i++) {
    if (isChange && (s[i] === '-' || s[i] === '+')) {
      break;
    }
    if (i===0 && s[i] === '-') {
      sign = -1;
      isChange = true
      continue
    };
    if (i===0 && s[i] === '+') {
      sign = 1;
      isChange = true
      continue
    };
    if (!numReg.test(s[i])) {
      return +res * sign
    }
    res += s[i]
    if (+res > MAX -1) {
      return sign === -1 ? -MAX : MAX -1
    }
  }
  return res ? +res * sign : 0
};
// console.log(myAtoi("42"));
// console.log(myAtoi("   -42 9"));
// console.log(myAtoi("+-1"));
console.log(myAtoi("-5-"));