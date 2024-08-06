function getSum(a: number, b: number): number {
  while (a) {
     if (a > 0) {
       b++
       a--
     } else {
       b--
       a++
     }
   }
   return b
 };