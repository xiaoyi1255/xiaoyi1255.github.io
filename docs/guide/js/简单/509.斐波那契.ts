/**
 * F(0) = 0，F(1) = 1
   F(n) = F(n - 1) + F(n - 2)，其中 n > 1
   n=0 => 0
   n=1 => 1
   n=2 => 1 +0
   n=3 => 1+1
   n=4 => 2+1
   n=5 => 3+2
   n=6 => 5+3
   n=7 => 13
   n=8 => 21

 */

function fib(n: number): number {
  if (n < 2) {
    return n
  }
  let l = 0; // f(n-2)
  let res = 1; // f(n-1)
  for (let i = 2; i < n; i++) {
    let _res = res
    res = l + res
    l = _res
  }
  return res + l
};
for (let i = 2; i < 10; i++) {
  console.log(fib(i))
}