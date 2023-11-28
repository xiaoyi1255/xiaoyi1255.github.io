/**
 * 1、滑动窗口的思想：窗口大小：p的长度，两个map; map1: 分包统计前p.length个， 各自子串出现次数
 * 2、遍历s,窗口依次右移比较。左减一，右加1，
 * 3、满足条件的记录其下标，注意结束条件即可
 * @param s 
 * @param p 
 * @returns 
 */
function findAnagrams(s: string, p: string): number[] {
  let map = new Map<string, number>()
  let _map = new Map<string, number>()

  for (let key in p as any) {
    map.set(p[key], (map.get(p[key])||0) + 1)
    _map.set(s[key], (_map.get(s[key])||0) + 1)
  }
  let pLen = p.length
  let len = s.length -pLen
  let res: number[] = []
  for (let i = 0; i <= len; i++) { 
    if (i>0) { 
      // i=0 时，已在刚开始设置了_map的值
      // 所以在i>0 到i<=s.length-p.length时，
      // 窗口右移一次，窗口左减一,窗口右加一 => 计数
      _map.set(s[i-1], (_map.get(s[i-1])||0)-1)
      _map.set(s[i+pLen-1], (_map.get(s[i+pLen-1])||0)+1)
    }
    let flag = true
    // 右移一次，分包判断窗口字符串出现次数是否 与p的字符串出现次数一致
    for (const [key, val] of map) {
      if (_map.get(key) !== val){
        flag = false
        break
      }
    }
    if (flag) res.push(i)
  }
  return res
};

console.log(findAnagrams("cbaebabacd", "abc"));
// console.log(findAnagrams("abab", "ab"));
// console.log(findAnagrams("bbb", "abc"));
// console.log(findAnagrams("bbbc", "bc"));