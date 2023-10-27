/**
 * @param {number[]} digits
 * @return {number[]}
 * 加一 数字数组+1， 考虑js最大有效数字 2^53 -1
 */
var plusOne = function(digits) {
  // return (String(Number(digits.join('')) +1)).split('') // bigin类型的计算不了
  // return (BigInt(digits.join('')) + 1n).toString().split(''); // 果然bigint可以嘞
  let len = digits.length;
  let resArr = [];
  let carry = 1;

  for (let i = len-1; i >=0; i--) {
    let sum = digits[i] + carry;
    if (sum >= 10) {
      if (i===0) {
        resArr.unshift(1, 0);
      } else {
        resArr.unshift(sum-10);
        carry = 1;
      }
    } else{
      resArr.unshift(sum);
      carry = 0;
    }
  }
  console.log(resArr)
  return resArr
};

var plusOne = function(digits) {
  let carry = 1; // 初始进位设为1
  for (let i = digits.length - 1; i >= 0; i--) {
    let sum = digits[i] + carry;
    if (sum >= 10) {
      digits[i] = sum - 10;
      carry = 1; // 有进位
    } else {
      digits[i] = sum;
      carry = 0; // 无进位
      break; // 提前结束循环，无需继续进位
    }
  }
  
  // 如果循环结束后还有进位，需要在数组头部插入一个1
  if (carry) {
    digits.unshift(1);
  }
  
  return digits;
};

var plusOne = function(digits) {
  let carry = 1;

  for (let i = digits.length - 1; i >= 0 && carry > 0; i--) {
    const sum = digits[i] + carry;
    digits[i] = sum % 10;
    carry = Math.floor(sum / 10);
  }

  if (carry > 0) {
    digits.unshift(carry);
  }

  return digits;
};

plusOne([9])