function selfDividingNumbers1(left: number, right: number): number[] {
  const result: number[] = [];
  while (left <= right) {
    if (isSelfDivisor(left)) {
      result.push(left);
    }
    if (right === left) break
    if (isSelfDivisor(right)) {
      result.push(right);
    }
    left++
    right--
  }
  function isSelfDivisor(num: number) {
    let str = num.toString();
    if (num < 10) {
      return true
    }
    let result = true;
    for (let i = 0; i < str.length; i++) {
      if (num % +str[i] !== 0) {
        result = false;
        break;
      }
    }
    return result
  }
  result.sort((a, b) => a - b)
  return result;
};

/**
 * 1、写一个算法isSelfDivisor 判断某一个数是否是自除数
 * 2. 变量[left,right]之间所有满足的数
 * @param left 
 * @param right 
 * @returns 
 */
function selfDividingNumbers(left: number, right: number): number[] {
  const result: number[] = [];
  while (left <= right) {
    if (isSelfDivisor(left)) {
      result.push(left);
    }
    left++
  }
  function isSelfDivisor(num: number) {
    if (num < 10) {
      return true
    }
    let str = num.toString();
    let result = true;
    for (let i = 0; i < str.length; i++) {
      if (num % +str[i] !== 0) {
        result = false;
        break;
      }
    }
    return result
  }
  return result;
};
console.log(selfDividingNumbers(1, 22));
console.log(selfDividingNumbers(47, 85));