// 2696. 删除子串后的字符串最小长度 
// https://leetcode.cn/problems/minimum-string-length-after-removing-substrings/?envType=daily-question&envId=2024-01-10
function minLength(s: string): number {
  while (s.includes("AB") || s.includes("CD")) {
    s = s.replaceAll("AB", "")
    s = s.replaceAll("CD", "")
  }
  return s.length
};

console.log(minLength("ABFCACDB"))
console.log(minLength("ACBBD"))