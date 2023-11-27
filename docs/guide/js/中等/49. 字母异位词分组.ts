// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

// 示例 1:

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
// 示例 2:

// 输入: strs = [""]
// 输出: [[""]]
// 示例 3:

// 输入: strs = ["a"]
// 输出: [["a"]]

/**
 * 1. 声明一个map<key, [][]>存储数据； key是排序后的子串，value是key相同的所有子串
 * 2. key: item.split('').sort().join(''), value，判断原来存在就push,不存在声明数组接收
 * 3. 返回map的所有值
 * @param strs 
 * @returns 
 */
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (const str of strs) {
    let key = str.split('').sort().join('');
    map.set(key, [...map.get(key) || [], str]);
  }
  return [...map.values()];
};

// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
// console.log(groupAnagrams(["", ""]))
// console.log(groupAnagrams(["a"]))
// console.log(groupAnagrams(["a", "a"]))
// [["max"],["buy"],["doc"],["may"],["ill"],["duh"],["tin"],["bar"],["pew"],["cab"]]
console.log(groupAnagrams(["cab","tin","pew","duh","may","ill","buy","bar","max","doc"]))