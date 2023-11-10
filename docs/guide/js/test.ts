// 大数之积
function multiply(num1: string, num2: string): string {
   // 先去除 给的大数前面的0 一般可以忽略
   if (+num1 == 0 || +num2 == 0) {
    return '0'
   }
   num1 = num1.replace(/^0*/g, '');
   num2 = num2.replace(/^0*/g, '');
   let len1 = num1.length;
   let len2 = num2.length;
   // 两数之积 的结果长度一点是<= 两数的长度之和
   /**
    * 1*1 = 1
    * 9*9=81
    * 99*99=9801
    * 1000*1000=1000000
    */
   // 所以我们可以使用一个确定的数组来保存
   //  12 * 34 = [0,0,0,0] => 
   /**
    * a[3] = 2*4 =8
    * a[2] = 4*1 + 3*2 =0  多1
    * a[1] = 1*3 +1 = 4
    * ==>> 408
    */
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

// console.log(multiply('0', '45'))

