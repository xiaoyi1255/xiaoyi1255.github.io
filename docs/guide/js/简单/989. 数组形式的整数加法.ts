/**
 * k转数组，长度不一样补位0,按位相加，记录进位，返回结果
 * @param num 
 * @param k 
 * @returns 
 */
function addToArrayForm1(num: number[], k: number): number[] {
  const result: number[] = [];
  let carry = 0;
  let arr = k.toString().split('').map(item => Number(item));
  const maxLength = Math.max(num.length, arr.length);
  while (arr.length < maxLength) {
    arr.unshift(0);
  }
  while (num.length < maxLength) {
    num.unshift(0);
  }
  for (let i = maxLength - 1; i >= 0; i--) {
    const sum = num[i] + arr[i] + carry;
    result.unshift(sum % 10);
    carry = Math.floor(sum / 10);
  }
  if (carry) result.unshift(carry);
  return result;
};


function addToArrayForm(num: number[], k: number): number[] {
  const result: number[] = [];
  let carry = 0;
  let i = num.length - 1;
  let _k = k.toString();
  let j = _k.length - 1;
  while (i >= 0 || j >= 0) {
    let n1 = num[i] || 0;
    let n2 = _k[j] || 0;
    let sum = n1 + +n2 + carry;
    result.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  if (carry) {
    result.unshift(carry);
  }
  return result;
};
console.log(addToArrayForm([1, 2, 3, 4], 8126));