/**
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。

你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

示例 1：
  输入：num1 = "11", num2 = "123"
  输出："134"
示例 2：
  输入：num1 = "456", num2 = "77"
  输出："533"
 */

/**
 * 
 * @param num1 
 * @param num2 
 * 解法1：和两大数相加一样：补全长度 => 对位相加 => 进位加一
 * 
 */

function addStrings1(num1: string, num2: string): string {
  if (num1.length > num2.length) {
    num2 = num2.padStart(num1.length, '0')
  } else {
    num1 = num1.padStart(num2.length, '0')
  }
  let carry = 0
  let res = ''
  for (let i = num1.length-1; i >=0 ; i--) {
    let sum = Number(num1[i]) + Number(num2[i]) + carry
    if (sum >= 10) {
      carry = 1
      res += sum - 10
    } else {
      carry = 0
      res += sum
    }
  }
  if (carry) {
    res += 1
  }
  return res.split('').reverse().join('')
};


function addStrings(num1: string, num2: string): string {
  if (num1.length > num2.length) {
    num2 = num2.padStart(num1.length, '0')
  } else {
    num1 = num1.padStart(num2.length, '0')
  }
  let carry = 0
  let res: number[] = []
  for (let i = num1.length-1; i >=0 ; i--) {
    let sum = Number(num1[i]) + Number(num2[i]) + carry
    carry = sum >= 10 ? 1 : 0
    res.push(sum % 10)
  }
  if (carry) {
    res.push(1)
  }
  return res.reverse().join('')
};

console.log(addStrings('1', '123'))
console.log(addStrings('456', '44'))