/**
 * 1、使用map计数，分别在 R 和 L 上累加
 * 2、遍历时判断R和L的个数 相等及满足
 * @param s 
 * @returns 
 */
function balancedStringSplit(s: string): number {
  let count = 0;
  let map = new Map<string,number>();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
    if (map.get('L') === map.get('R')) {
      count++;
    }
  }
  return count;
};

console.log(balancedStringSplit("LLLLRRRR"));