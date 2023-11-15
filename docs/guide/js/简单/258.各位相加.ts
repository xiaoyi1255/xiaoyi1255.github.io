/**
 * 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。返回这个结果。
 * 
 * 输入: num = 38
  输出: 2 
  解释: 各位相加的过程为：
  38 --> 3 + 8 --> 11
  11 --> 1 + 1 --> 2
  由于 2 是一位数，所以返回 2。
 */

function addDigits1(num: number): number {
  if (num<=9) {
    return num
  }
  let _num = String(num);
  _num = _num.replace(/0/, '')
  function getSum (num: string): number {
    return num.split('').reduce((pre, cur) => {
      return Number(pre) + Number(cur)
    }, 0)
  }
  let sum = getSum(_num);
  while (sum > 9) {
    sum = getSum(String(sum));
  }
  return sum;
}

function addDigits(num: number): number {
  if (num<=9) {
    return num
  }
  let _num = String(num).split('').reduce((pre, cur) =>{
    return pre + Number(cur)
  },0);
  if (_num <= 9) {
    return _num
  }
  return addDigits(_num)
}

console.log(addDigits(38));
console.log(addDigits(39));
console.log(addDigits(100));
console.log(addDigits(101));