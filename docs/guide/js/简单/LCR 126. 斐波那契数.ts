function fib1(n: number): number {
  if (n<2) return n
  return fib(n-1) + fib(n-2)
};

function fib(n: number): number {
  if (n<2) return n
  let fn_1 = 0
  let fn_2 = 1
  for (let i = 2; i <= n; i++) {
    [fn_1, fn_2] = [fn_2, (fn_1 + fn_2) % (Math.pow(10,9)+7)]
  }
  return fn_2 
};

console.log(fib(81)); // 107920472