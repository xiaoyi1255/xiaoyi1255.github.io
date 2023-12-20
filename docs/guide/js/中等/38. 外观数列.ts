/**
 * 1、记录上一个的值
 * 2、利用正则 把上一个值 拆分成 连续数字 的数组
 * 3、遍历数组元素，长度加第一个字符 =》更新为上一个值
 * 4、遍历结束返回上一个值
 * @param n 
 * @returns 
 */
function countAndSay(n: number): string {
  if (n === 1) return '1'
  let res = '1'
  for (let i = 2; i <= n; i++) {
    let temp = ''
    let arr = splitStringByConsecutiveChars(res)
    for (let j = 0; j < arr.length; j++) {
      temp += arr[j].length + arr[j][0]
    }
    res = temp
  }
  function splitStringByConsecutiveChars(inputString) {
    const regex = /(\d)\1*/g;
  
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(inputString)) !== null) {
      matches.push(match[0]);
    }
  
    return matches;
  }
  return res
};
// 1
// 11
// 21
// 1211
// 111221
console.log(countAndSay(2)); 
console.log(countAndSay(3)); 
console.log(countAndSay(4)); 