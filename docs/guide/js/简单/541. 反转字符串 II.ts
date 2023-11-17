// 给定一个字符串 s 和一个整数 k，从字符串开头算起，每计数至 2k 个字符，就反转这 2k 字符中的前 k 个字符。

// 如果剩余字符少于 k 个，则将剩余字符全部反转。
// 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。


// 示例 1：
// 输入：s = "abcdefg", k = 2
    // 01 45 89 1213
// 输出："bacdfeg"
// 示例 2：
// 输入：s = "abcd", k = 2
// 输出："bacd"

/**
 * 遍历字符串：0 2k 4k 6k,
 * 分别把0-k 翻转 拼上k-2k
 * 2k-3k 翻转 拼上3k-4k
 * 最后返回即可
 * @param s 
 * @param k 
 * @returns 
 */
function reverseStr(s: string, k: number): string {
  let res = '';
  for (let i = 0; i < s.length; i+=2*k) {
    const subStr = s.slice(i, i+k).split("").reverse().join("");
    const subStr2 = s.slice(i+k, i+2*k);
   res += subStr + subStr2;
  }
  return res
}

console.log(reverseStr("abcdefg", 2));
console.log(reverseStr("abcd", 4));
