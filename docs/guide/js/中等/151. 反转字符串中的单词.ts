/**
 * 1、先去除收尾空格
 * 2、通过正则匹配1到多个空字符串，对字符进行拆分成数组
 * 3、再将数组拼接成字符串
 * @param s 
 * @returns 
 */
function reverseWords(s: string): string {
  s = s.trim();
  return s.split(/\s+/).reverse().join(" ");
};

console.log(reverseWords("Let's take LeetCode contest")) // contest LeetCode take Let's