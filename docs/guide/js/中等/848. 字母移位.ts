/**
 * 1、不难发现规律： 
 *  第一项需要移动数组和次 total
 *  后一项为总和减去前一项移动次数 fn = totaol - fn-1
 * 2、先计算total,遍历一个total减去其次数
 * 3、技巧：移动次数可以转换成 ascll值进行计算
 * 4、因为都是小写，所以大于122 => z 时需要自减 26
 * @param s 
 * @param shifts 
 * @returns 
 */

function shiftingLetters(s: string, shifts: number[]): string {
  const letterMap = {}
  for (let i = 0; i < 26; i++) {
    letterMap[i + 97] = String.fromCharCode(i + 97)
  }
  let total = shifts.reduce((acc, cur) => acc + cur, 0)
  let res = ''
  for (let i = 0; i < s.length; i++) {
    let cur = s[i].charCodeAt(0) + total
    if (cur>122) {
      /**
       * cur - 97 是保证起点是0开始
       * % 26 保证从0开始的数落在 [0-26] 之间
       * +97 转回原来的位置 97开始
       * 如果此时 cur < 26 就加26
       */

      cur = (cur - 97) % 26 + 97;
      if (cur < 97) {
        cur += 26;
      }
    }
    res += letterMap[cur]
    total -= shifts[i]
  }
  return res
};
console.log(shiftingLetters("abc", [3, 5, 35]));