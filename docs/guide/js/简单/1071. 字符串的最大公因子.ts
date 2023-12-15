function gcdOfStrings(str1: string, str2: string): string {
  let noRepeatStr1 = str1[0]
  for (let i = 1; i < str1.length; i++) {
    if (str1[i]!== str1[0]) {
      noRepeatStr1 += str1[i]
    } else {
      break
    }
  }
  let _str1 = str1.replaceAll(noRepeatStr1, '')
  let _str2 = str2.replaceAll(noRepeatStr1, '')
  let noRepeatStr2 = noRepeatStr1
  if (_str1 === _str2) { // 能被整除
    while (true) {
      let noRepeatStr3 =noRepeatStr2 + noRepeatStr1
      if (str1.includes(noRepeatStr3) && str2.includes(noRepeatStr3)) {
        noRepeatStr1+=noRepeatStr1
      } else {
        return noRepeatStr1
      }
    }
    return noRepeatStr1
  }
  return ''
};
console.log(gcdOfStrings("TAUXXTAUXXTAUXXTAUXXTAUXX", "TAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXX"));