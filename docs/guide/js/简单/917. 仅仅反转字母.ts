/**
 * 给你一个字符串 s ，根据下述规则反转字符串：
  所有非英文字母保留在原有位置。
  所有英文字母（小写或大写）位置反转。
  返回反转后的 s 。

  示例 1：

输入：s = "ab-cd"
输出："dc-ba"
 */

/**
 * 双指针 遇到非字母跳过,只有左遇到
 */

function reverseOnlyLetters1(s: string): string {
  if(!/[a-zA-Z]/.test(s)) return s
  let left = 0;
  let right = s.length - 1;
  const arr = s.split("");
  const reg = /[a-zA-Z]/
  while (left <= right) {
    const ifLeft = reg.test(arr[left]);
    const ifRight = reg.test(arr[right]);
    if (ifLeft && ifRight) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++
      right--;
    } else if (!ifLeft && ifRight) {
      left++
      while (arr[left] !== undefined && !reg.test(arr[left])) {
        left++;
      }
    } else if (!ifRight && ifLeft) {
      right--
      while (arr[right] !== undefined && !reg.test(arr[right])) {
        right--;
      }
    } else {
      left++
      right--
    }
  }
  return arr.join("");
};

function reverseOnlyLetters(s: string): string {
  if(!/[a-zA-Z]/.test(s)) return s
  let left = 0;
  let right = s.length - 1;
  const arr = s.split("");
  const reg = /[a-zA-Z]/
  while (left <= right) {
    while (left <= right && !reg.test(arr[left])) {
      left++;
    }
    while (left <= right && !reg.test(arr[right])) {
      right--;
    }
    const ifLeft = reg.test(arr[left]);
    const ifRight = reg.test(arr[right]);
    if (ifLeft && ifRight) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++
      right--;
    }
  }
  return arr.join("");
};

console.log(reverseOnlyLetters("ab*-cd"));
console.log(reverseOnlyLetters("a-bC-dEf-ghIj")); // j-Ih-gfE-dCba
console.log(reverseOnlyLetters("7_28]"))
console.log(reverseOnlyLetters("Czyr^"))