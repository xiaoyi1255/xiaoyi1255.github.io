/**
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

示例 1：
  输入：s = ["h","e","l","l","o"]
  输出：["o","l","l","e","h"]
 *
 * 1.首尾元素交换位置，注意长度是奇数则长度一半向下取整，偶数刚好一半
 * 2. 
 */

function reverseString1(s: string[]): void {
  let mid = Math.floor(s.length / 2);
  for (let i = 0; i < s.length; i++) {
    if (i>=mid) {
      break;
    }
    [s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]];
  }
};

function reverseString(s: string[]): void {
  let left = 0
  let right = s.length - 1
  while (left <= right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
};

let s = ["h", "e", "l", "l", "o"];
let s1 = ["H", "a", "n", "n", "a", "h"];
let s2 = ["A"," ","m","a","n",","," ","a"," ","p","l","a","n",","," ","a"," ","c","a","n","a","l",":"," ","P","a","n","a","m","a"]
reverseString(s);
console.log(s);

reverseString(s1);
console.log(s1);
reverseString(s2);
console.log(s2);