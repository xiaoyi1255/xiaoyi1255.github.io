// 给定一个字符串 s ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

// 示例 1：
// 输入：s = "Let's take LeetCode contest"
// 输出："s'teL ekat edoCteeL tsetnoc"

// 示例 2:
// 输入： s = "God Ding"
// 输出："doG gniD"
/**
 * 通过 空格拆分，成数组，遍历数组 将每项翻转 拼接
 * @param s 
 * @returns 
 */

function reverseWords1(s: string): string {
  return s.split(' ').map(item => item.split('').reverse().join('')).join(' ');
};


function reverseWords(s: string): string {
  return s.split(' ').map(item => item.split('').reverse().join('')).join(' ');
};
console.log(reverseWords("Let's take LeetCode contest"))