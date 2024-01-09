// [273. 整数转换英文表示](https://leetcode.cn/problems/integer-to-english-words/)
function numberToWords(num: number): string {
  const wordA: string[] = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ]
  const wordB: string[] = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ]

  const threeNumToWords = (num: number): string => {
    const resArr: string[] = []
    if (num >= 100) {
      resArr.push(wordA[Math.floor(num / 100)])
      resArr.push('Hundred')
      num %= 100
    }
    if (num >= 20) {
      resArr.push(wordB[Math.floor(num / 10)])
      num %= 10
    }
    if (num > 0) resArr.push(wordA[num])
    return resArr.join(' ')
  }

  if (num === 0) return 'Zero'
  const resArr: string[] = []
  if (num >= 1000000000) {
    resArr.push(threeNumToWords(Math.floor(num / 1000000000)))
    resArr.push('Billion')
    num %= 1000000000
  }
  if (num >= 1000000) {
    resArr.push(threeNumToWords(Math.floor(num / 1000000)))
    resArr.push('Million')
    num %= 1000000
  }
  if (num >= 1000) {
    resArr.push(threeNumToWords(Math.floor(num / 1000)))
    resArr.push('Thousand')
    num %= 1000
  }
  if (num > 0) resArr.push(threeNumToWords(num))

  return resArr.join(' ')
};

console.log(numberToWords(123)) // "One Hundred Twenty Three"
console.log(numberToWords(12345)) // "Twelve Thousand Three Hundred Forty Five"
console.log(numberToWords(1000000)) // "One Million"