/**
 * 给你两个字符串 s 和 goal ，只要我们可以通过交换 s 中的两个字母得到与 goal 相等的结果，就返回 true ；否则返回 false 。

交换字母的定义是：取两个下标 i 和 j （下标从 0 开始）且满足 i != j ，接着交换 s[i] 和 s[j] 处的字符。

例如，在 "abcd" 中交换下标 0 和下标 2 的元素可以生成 "cbad" 。
 */

function buddyStrings(s: string, goal: string): boolean {
    if (s.length !== goal.length) {
      return false
    }
    let idx = -1;
    let pre = ''
    const map = new Map<string, number>()
    for (let i = 0; i < s.length; i++) {
      if (pre === s[i]) {
        if (s.slice(i) === goal.slice(i)) {
          return true
        }
      }
      pre = s[i]
      if (s[i] !== goal[i]) {
        if (idx===-1) {
          idx = i
        } else {
          const left = s.slice(0,idx) + s[i] + s.slice(idx+1, i)
          const right = s[idx]+ s.slice(i+1)
          return left + right === goal
        }
      }
      map.set(s[i], (map.get(s[i]) || 0) + 1)

    }
    if (idx === -1) {
      for (const [_, key] of map.entries()) {
        if (key > 1) return true
      }
    }
    return false
};

// console.log(buddyStrings('zzabc', 'zzbac'));
// console.log(buddyStrings('aa', 'aa'));
// console.log(buddyStrings('aab', 'aba'));
console.log(buddyStrings('abab', 'abab'));