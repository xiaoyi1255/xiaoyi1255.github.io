function multiply(num1: string, num2: string): string {
  if (+num1 == 0 || +num2 == 0) {
   return '0'
  }
  num1 = num1.replace(/^0*/g, '');
  num2 = num2.replace(/^0*/g, '');
  let len1 = num1.length;
  let len2 = num2.length;
  let res: number[] = new Array(len1 + len2).fill(0);
  for (let i = num1.length-1; i >= 0; i--) {
   for (let j = num2.length-1; j >=0; j--) {
     let sum = Number(num1[i]) * Number(num2[j]) + res[i + j + 1];
     res[i + j + 1] = sum % 10;
     res[i + j] += Math.floor(sum / 10);
   }
  }
  return res.join('').replace(/^0*/, '') || '0';
}



console.log(multiply('10', '10'));