---
title: JS
titleTemplate: 两数之和
---

## 前言
> 本文主要是介绍大数相加：从大数加一（[LeedCode](https://leetcode.cn/problems/plus-one/description/)简单题）到两大数相加，从思考、实现思路到代码的具体实现



## 加一 (小试牛刀😈)
* 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
* 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
* 你可以假设除了整数 0 之外，这个整数不会以零开头。

示例：
```js
示例 1：
输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。

示例 2：
输入：digits = [4,3,2,1]
输出：[4,3,2,2]
解释：输入数组表示数字 4321。

示例 3：
输入：digits = [0]
输出：[1]

```
思考2秒，有了。
* 直接把数组转成数字，加一，再转成数组。
```js
var plusOne = function(digits) {
  // 注意js计算超过最大安全整数会丢失精度
  // return (String(Number(digits.join('')) +1)).split('')
  // 数组拼接成字符串 => 强转 BigInt 类型 => 加一 => 强转字符串 => 拆分成数组
  return (BigInt(digits.join(''))+1n).toString().split('')
};
```

* [js整数区间: ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)：只有在 -253 + 1 到 253 - 1 范围内（闭区间）的整数才能在不丢失精度的情况下被表示（可通过 Number.MIN_SAFE_INTEGER 和 Number.MAX_SAFE_INTEGER 获得）  

* [BigInt: ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 类型是 ECMAScript 2020 引入的，用于表示任意大的整数。

* 好吧！我承认，投机取巧了。
* 不！难道有现成的api不用吗？还要造轮子么？
* 面试官：不使用BigInt，如何实现？
* 我 .... 好吧骂骂咧咧都去实现了

### 第一版
* 倒序遍历数组，最后一位加一, 然后放入数组
* 考虑进位，如果 >= 10，则进位
* 需要一个变量来保存进位值,一个数组保存计算的值
* 考虑边界，遍历完到最后一项，>=10，需要补位1 如[1,9] => [2,0]
```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits=[]) {
  let len = digits.length;
  let resArr = [];
  let carry = 1;

  for (let i = len-1; i >=0; i--) {
    let sum = digits[i] + carry;
    if (sum >= 10) {
      if (i===0) {
        resArr.unshift(1, 0);
      } else {
        resArr.unshift(sum-10);
        carry = 1;
      }
    } else{
      resArr.unshift(sum);
      carry = 0;
    }
  }
  console.log(resArr)
  return resArr
};
```
### 第二版
* 在第一版的基础上优化
* 直接修改原数组 (少使用一个数组)
* 边界的进位，遍历结束再判断
```js
var plusOne = function(digits=[]) {
  digits = digits.slice()
  let carry = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    let sum = digits[i] + carry;
    if (sum >= 10) {
      digits[i] = sum - 10;
      carry = 1;
    } else {
      digits[i] = sum;
      carry = 0;
      break;
    }
  }
  if (carry) {
    digits.unshift(1);
  }
  
  return digits;
};

```
* 看到这里是不是感觉还行！还可以优化，第三版
* 因为我们只加1，数组里面最后一位小于9，压根不需要遍历
* 刚好进位 那就乖乖遍历咯
### 第三版
```js
var plusOne = function(digits = []) {
  const len = digits.length;
  if (len === 0) {
    return [1];
  }

  if (digits[len - 1] < 9) {
    digits[len - 1]++;
    return digits;
  }

  let carry = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    let sum = digits[i] + carry;
    if (sum >= 10) {
      digits[i] = sum - 10;
      carry = 1;
    } else {
      digits[i] = sum;
      carry = 0;
      break;
    }
  }

  if (carry > 0) {
    digits.unshift(carry);
  }

  return digits;
};

```
其实看到这里，你是不是也想到了，还能更简，
* 判断数组是否存在9 => arr.indexOf(9) !== -1
* 存在9就需要遍历9哪里是否需要进位 哈哈~~~

还是上主菜吧！！！

## 两大正整数之和
题目：
```js
const str1 = '123456789';
const str2 = '98765432156464645465';
function add(str1, str2) {
  return str1 + str2 
}
```

有了上面的经验，是不是感觉简单多了。
不同点就是 1 也变成了一个大数

但是整体思路还是一样的
* 可以转成数组来遍历 或者 直接使用字符串也行
* 遍历对位相加(注意点位数可能不一样，不一样就补0)
* [String.prototype.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
* 需要进位，就进位


```js
const str1 = '123456789';
const str2 = '98765432156464645465';

function add(str1='', str2='') {
  if (!str1) return str2 || "0";
  if (!str2) return str1 || "0";

  if (str1.length > str2.length) {
    maxLen = str1.length
    str2 = str2.padStart(maxLen, '0')
  } else if (str1.length < str2.length) {
    maxLen = str2.length
    str1 = str1.padStart(maxLen, '0')
  }
  console.log(str1,str2,maxLen)
  let carry = 0
  let result = []
  for (let i = maxLen-1; i >=0; i--) {
    const sum = Number(str1[i]) + Number(str2[i]) + carry
    if (sum >= 10) {
      result.unshift(sum - 10)
      carry = 1
    } else {
      carry = 0
      result.unshift(sum)
    }
  }
  if (carry) {
    result.unshift(1)
  }
  console.log(result);
  return result.join('')
}
```

解析：

1. 判断两字符串长度，取最大值，小的前面补0（不会影响大小）
2. 声明一个进位标识、一个结果数组
3. 遍历字符串，从后往前，每一位相加
4. 如果大于10，就取余数，并设置进位标识为；同时存进新数组
5. 处理遍历结束后的进位标识
6. 数组拼接成字符串并返回结果



