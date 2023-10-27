const str1 = '9';
const str2 = '11';

// str1 - str2
function multiply(str1='', str2='') {
  let maxLen = str1.length
  let isMix = str1.length >= str2.length ? (str1[0] > str2[0] ? true: false) : false
  if (str1.length > str2.length) {
    maxLen = str1.length
    str2 = str2.padStart(maxLen, '0')
  } else if (str1.length < str2.length) {
    maxLen = str2.length
    str1 = str1.padStart(maxLen, '0')
  }
  let carry = 0
  let result = []
  for (let i = maxLen-1; i >=0; i--) {
    let subtract =  0
    if (isMix) {
      subtract =  Number(str1[i]) - Number(str2[i]) + carry
    } else {
      subtract =  Number(str2[i]) - Number(str1[i]) + carry
    }
    console.log(i, ': ',str1,str2,subtract, result)
    if (subtract>0) {
      carry = 0
      result.unshift(subtract)
    } else {
      carry = -1
      // 被减数 比减数小，借位， 取绝对值
      result.unshift(10 + subtract)
    }
    console.log(i, ': ',str1,str2,subtract, result)

  }
  if (carry) {
    result.unshift(carry)
  }
  console.log('被减数',str1)
  console.log('减 数',str2)
  console.log('差',result.join(''));
  return result.join('')
}

console.log(multiply(str1, str2));