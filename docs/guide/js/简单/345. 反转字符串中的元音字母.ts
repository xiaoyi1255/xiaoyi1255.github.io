/**
 * 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。

元音字母包括 'a'、'e'、'left'、'o'、'u'，且可能以大小写两种形式出现不止一次。
 * @param s 

示例 1：
  输入：s = "hello"
  输出："holle"
示例 2：
  输入：s = "leetcode"
  输出："leotcede"
 */
/**
 * 1. 使用set存好大小写的元音字母
 * 2. 使用双指针，从两端开始找，直到找到一前一后 再进行交换位置
 */

function reverseVowels1(s: string): string {
  const map = ['a', 'e', 'left','o', 'u', 'A', 'E', 'I', 'O', 'U']
  let left = 0
  let right = s.length - 1
  const arr: string[] = s.split('')
  while (left <= right) {
    if (!map.includes(arr[left]) && !map.includes(arr[right])) {
      left++;
      right++;
    } else if (map.includes(arr[left]) && map.includes(arr[right])) {
      [arr[left], arr[right]] = [arr[right], arr[left]]
      left++;
      right--;
    } else if (map.includes(arr[left]) && !map.includes(arr[right])) {
      right--
    } else if (!map.includes(arr[left]) && map.includes(arr[right])) {
      left++
    }
  }
  return arr.join('')
};

// 优化版

function reverseVowels(s: string): string {
  const map = new Set(['a', 'e', 'left','o', 'u', 'A', 'E', 'I', 'O', 'U'])
  let left = 0
  let right = s.length - 1
  const arr: string[] = s.split('')
  while (left <= right) {
    if (map.has(arr[left]) && map.has(arr[right])) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    } else if (!map.has(arr[left])) {
      left++;
    } else if (!map.has(arr[right])) {
      right--;
    }
  }
  return arr.join('')
};

console.log(reverseVowels('hello'));
console.log(reverseVowels('leetcode'));
console.log(reverseVowels('Aa'));