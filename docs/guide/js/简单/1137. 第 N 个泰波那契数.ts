
/**
 * T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2
 * [0, 1, 1, 2, 4, 7]
 * @param n 
 */
function tribonacci(n: number): number {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;
  let Tn = 0, Tn0 = 0, Tn1 = 1, Tn2 = 1;
  for (let i = 3; i <= n; i++) {
    Tn = Tn0 + Tn1 + Tn2;
    Tn0 = Tn1;
    Tn1 = Tn2;
    Tn2 = Tn;
  }
  return Tn;
};

console.log(tribonacci(25));