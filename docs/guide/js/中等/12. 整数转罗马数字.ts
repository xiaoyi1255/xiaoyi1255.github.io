function intToRoman(num: number): string {
  const numMap = {
    1: "I", 4: "IV", 5: "V", 9: "IX", 10: "X", 40: "XL", 50: "L", 90: "XC", 100: "C", 400: "CD", 500: "D", 900: "CM", 1000: "M",
  }

  function toLuoMa(numb: number) {
    const value = numMap[numb];
    let res = ''
    if (numb > 1 && numb < 4) {
      res += ''.padStart(numb, 'I')
    } else if (numb > 5 && numb < 9) {
      res = 'V'.padEnd(numb - 4, 'I')
    } else if (numb > 10 && numb < 40) {
      let last = numb % 10 ? toLuoMa(numb % 10) : ''
      res = ''.padEnd(Math.floor(numb / 10), 'X') + last
    } else if (numb > 40 && numb < 50) {
      let last = toLuoMa(numb - 40)
      res = 'XL' + last
    } else if (numb > 50 && numb < 90) {
      let last = toLuoMa(numb - 50)
      res = 'L' + last
    } else if (numb > 90 && numb < 100) {
      res = 'XC' + toLuoMa(numb - 90)
    } else if (numb > 100 && numb < 400) {
      res = 'C' + toLuoMa(numb - 100)
    } else if (numb > 400 && numb < 500) {
      res = 'CD' + toLuoMa(numb - 400)
    } else if (numb > 500 && numb < 900) {
      res = 'D' + toLuoMa(numb - 500)
    } else if (numb > 900 && numb < 1000) {
      res = 'CM' + toLuoMa(numb - 900)
    } else if (numb > 1000 && numb < 4000) {
      res = 'M' + toLuoMa(numb - 1000)
    } else {
      res = value
    }
    return res
  }
  return toLuoMa(num);
};


console.log(intToRoman(401))
