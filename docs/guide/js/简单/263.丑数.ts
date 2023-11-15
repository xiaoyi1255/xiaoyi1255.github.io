/**
 * 丑数 就是只包含质因数 2、3 和 5 的正整数。

给你一个整数 n ，请你判断 n 是否为 丑数 。如果是，返回 true ；否则，返回 false 。
 */

function isUgly(n: number): boolean {
    let res = n
    while (res > 1) {
        if (res % 2 === 0) {
            res = res / 2
        } else if (res % 3 === 0) {
            res = res / 3
        } else if (res % 5 === 0) {
            res = res / 5
        } else {
          return false
        }
    }
    return res === 1
};

console.log(isUgly(33))