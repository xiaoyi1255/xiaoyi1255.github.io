/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

  1 => 1        1
  2 => 2        2
  3 => 1+2      3
  4 => 2 +1+2   5
  5 => 4+3      8

  不难看出 从3开始每项等于前两项之和
  f(n)=f(n-1)+f(n-2)
 */

import { restart } from "pm2";

  function climbStairs1(n: number): number {
    if (n <= 2) return n;
    let result = [1, 2]
    let res = 0
    for (let i = 2; i <= n-1; i++) {
      console.log('i ', i);
      res = result[i - 1] + result[i - 2];
      result.push(res)
    }
    return res;
  };

  function climbStairs2(n: number): number {
    if (n <= 2) return n;
    let result = [1, 2]
    for (let i = 2; i <= n-1; i++) {
      result.push(result[i - 1] + result[i - 2])
    }
    return result[n-1];
  };

  function climbStairs3(n: number): number {
    if (n <= 2) return n;
    return climbStairs(n - 1) + climbStairs(n - 2);
  };

  function climbStairs(n: number): number {
    if (n <= 2) return n;
    let l = 1 // 前2项
    let res = 2 // 前1项
    for (let i = 2; i <= n-1; i++) {
      let _res = res
      res = l + res
      l = _res
    }
    return res
  };

  console.log(climbStairs(4));