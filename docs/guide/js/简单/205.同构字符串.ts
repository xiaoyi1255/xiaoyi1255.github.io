function isIsomorphic(s: string, t: string): boolean {
  const map = new Map<string, string>();
  const map1 = new Map<string, string>();
  for (let i = 0; i < s.length; i++) {
    // 存在就需要判断对应关系是否对应上
    if ((map.has(s[i]) && map.get(s[i]) !== t[i]) || (map1.has(t[i]) && map1.get(t[i]) !== s[i])) {
      return false;
    }
    map.set(s[i], t[i]);
    map1.set(t[i], s[i]);
  }
  return true
};

console.log(isIsomorphic("egg", "add"));
// console.log(isIsomorphic("foo", "bar"));
// console.log(isIsomorphic("paper", "title"));
console.log(isIsomorphic("badc", "baba"));
console.log(isIsomorphic("baba", "badc"));