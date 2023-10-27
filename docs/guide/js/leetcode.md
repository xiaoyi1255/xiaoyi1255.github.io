### 1.力扣简单题：有效的括号
题目：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

* 左括号必须用相同类型的右括号闭合。
* 左括号必须以正确的顺序闭合。
* 每个右括号都有一个对应的相同类型的左括号。
 
示例 1：

输入：s = "()"   
输出：true
示例 2：

输入：s = "()[]{}"   
输出：true
示例 3：

输入：s = "(]"   
输出：false
 

提示：

* 1 <= s.length <= 104
* s 仅由括号 '()[]{}' 组成

```typescript
/**
 * @param {string} s  '()[]{}'
 * @return {boolean}
 * 思路：
 * 1.先判断字符串长度，奇数直接返回false
 * 2. 遍历字符串，
 *  遇到左括号入栈【对应的右括号，因为一会遇到右括号判断是否匹配】，遇到右括号出栈，如果出栈的括号不匹配，则返回false
 *  最后判断栈是否为空，为空则返回true
 *  比如： '()[]'
 *  1. '(' 遇到左括号入栈  => [')']
 *  2. ')' 遇到右括号出栈  => 栈顶元素 ')'  => 与栈顶元素匹配 出栈： []
 *  3. '[' 遇到左括号入栈  => [ ']' ]
 *  4. ']' 遇到右括号出栈  => 栈顶元素 ']'  => 与栈顶元素匹配 出栈： []
 *  以此类推
 *  规律就是 遇到一个右括号 必须有匹配的左括号，否则返回false
 */
function isValid(s='') {
  if (s.length % 2 !== 0) return false;
  
  const stack= []
  const map = {
      '{': '}',
      '(': ')',
      '[': ']',
  }
  for (const item of s) {
    let chart = map[item]
    if (chart) {
      stack.push(chart)
    } else {
      const top = stack.pop();
      if (top !== item) {
        return false
      }
    }
  }
  return !stack.length
};

console.log(isValid('({})'))

```

### 2. 删除有序数组中的重复项
给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd2fb233db784aab9ee5b5deec827cc9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=922&h=452&s=35670&e=png&b=ffffff)

解析： 
* 非严格递增排列 从小到大但是相邻可以相等
* 删除重复元素
* 返回数组长度

```js
/**
 * 
 * @param {*} nums []
 * @returns nums.length
 * 数组已经是排好序的，说明左边永远小于或等于右边元素
 * 判断num[i] == num[i+1] 就删除当前
 * i--是为了如果相邻且相等，splice之后会跳过下一个
 */
function removeDuplicates(nums=[]) {
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (item === nums[i + 1]) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};

removeDuplicates([1, 1, 2])
```

### 3. 移除数组元素
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49c41bea58a44f67a97aab984d2e6a1a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=925&h=817&s=81796&e=png&b=fffefe)

```js
// 删除指定元素，返回数组长度
var removeElement = function(nums=[], val) {
  for (let i = 0, len=nums.length; i < len; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};

removeElement([0,1,2,2,3,0,4,2], 2)
```

### 4. 找出字符串中第一个匹配项的下标
给你两个字符串 haystack 和 needle ，
请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。
如果 needle 不是 haystack 的一部分，则返回  -1 。

```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 * 妈呀现成的api => indexOf
 */
var strStr = function(haystack='', needle='') {
  // return haystack.indexOf(needle); 现成的轮子能不用么？？？
  if (needle === '') return 0;
  if (haystack === '') return -1;
  for (let i = 0, len = haystack.length; i < len; i++) {
    if (haystack[i] === needle[0]) { // 判断第一个字母相等 截取子串长度，与子串对比
      if (haystack.substr(i, needle.length) === needle) {
        return i;
      }
    }
  }
  return -1;
};

```
