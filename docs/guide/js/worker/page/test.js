function subtract(str1='', str2='') {
  if (!str1) return str2 || "0";
  if (!str2) return str1 || "0";
  let carry = 0;
  let isMin = false;
  const result = [];
  let sub = (a,b) => a-b;
  if (str1.length > str2.length) {
    str2 = str2.padStart(str1.length, '0');
  } else {
    if (str1.slice(0, 1) <= str2.slice(0, 1)) {
      isMin = true;
      sub = (a,b) => b-a;
    }
    str1 = str1.padStart(str2.length, '0');
  }
  for (let i = str1.length-1; i >= 0; i--) {
    const sum = sub(str1[i], str2[i]) + carry;
    if (sum>=0) {
      carry = 0;
      result.unshift(sum);
    } else {
      carry = -1;
      result.unshift(sum + 10);
    }
  }
  let res = result.join('').replace(/^0+/, '')
  if (res === '') return 0
  if (isMin) {
    res = '-' + res;
  }
  return res;
}

const str1 = '999999999999999999';
const str2 = '888888888888888888';
const res = subtract(str1, str2); // 33334325307562
console.log(res, str1-str2)
