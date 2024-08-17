---
title: JS
titleTemplate: 两数之和
theme: channing-cyan
---

## 前言
> 
> JS最大安全整数是**2的53次方减一**，两个超大整数数相加、相减时往往需要借助ES11新出的BigInt。本文介绍了如果不使用BigInt来实现超大数之间的相加和相减、相乘...
>
> 


## 1.加一 (小试牛刀😈)
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
思考几秒，有了😹😹
* 直接把数组转成数字，加一，再转成数组。
```js
var plusOne = function(digits) {
  // 注意js计算超过最大安全整数会丢失精度
  // return (String(Number(digits.join('')) +1)).split('')
  // 数组拼接成字符串 => 强转 BigInt 类型 => 加一 => 强转字符串 => 拆分成数组
  return (BigInt(digits.join(''))+1n).toString().split('')
};
```

* [js整数区间: ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)：只有在 -2^53 + 1 到 2^53 - 1 范围内（闭区间）的整数才能在不丢失精度的情况下被表示（可通过 Number.MIN_SAFE_INTEGER 和 Number.MAX_SAFE_INTEGER 获得）  

* [BigInt: ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 类型是 ECMAScript 2020 引入的，用于表示任意大的整数。

* 好吧！我承认，投机取巧了。
* 不！难道有现成的api不用吗？还要造轮子么？
* 面试官：不使用BigInt，如何实现？
* 我 ....  好吧~骂骂咧咧都去实现了😒😒😒

### 第一版🤩
* 倒序遍历数组，最后一位加一, 然后放入数组
* 考虑进位，如果 >= 10，则**进位**
* 需要一个变量来保存进位值,一个数组保存计算的值
* 考虑边界，遍历完到最后一项，>=10，需要补位1 如[1,9] => [2,0]
* 说白了就一个**大数 +1**，进位问题
```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits=[]) {
  let len = digits.length;
  let resArr = [];
  let carry = 1; // 进位标识

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
### 第二版🤩
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
### 第三版🤩
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

## 2.两大整数之和👍
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
    str2 = str2.padStart(maxLen, '0')
  } else if (str1.length < str2.length) {
    str1 = str1.padStart(maxLen, '0')
  }
  console.log(str1,str2,maxLen)
  let carry = 0
  let result = []
  for (let i = str1.length-1; i >=0; i--) {
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

## 3. 两大整数之差👍
思路：
* ~~还是先补0，保证位数一致~~
* ~~遍历字符串，从后往前，对位相减~~
* ~~如果小于0，就 +10，并设置进位标识为 -1 => 借位；同时存进新数组~~
* ~~处理遍历结束后的进位标识如果为 -1 说明计算结果为负数，需要补一个负号~~
* ~~数组拼接成字符串并返回结果~~

感谢评论区大量指正：上面确实考虑不周：
* a>b  => a-b ;   如 2-1 => 2-1=1
* a<b  => -(b-a)  如 1-2 => -(2-1)
* 可以先判断a 和 b 哪个大，**长度长**者大，长度一致者，**取第一位**比较
* 定义计算函数 sub =>  a-b 还是 b-a
* 借位逻辑不变
* 最后判断是否需要添加 '-' 号
* 
* 细心的小伙伴肯定发现：如果数带了负号，还有问题👻
* 如果带了正负号，还需要加一些逻辑，题目**两个大数** 所以忽略了负号情况👀
* 有兴趣可以下来补上（核心不变，判断长度、第一位是否为‘-’，再决定sub函数）

```js
function subtract(str1='', str2='') {
  if (!str1) return str2 || "0";
  if (!str2) return str1 || "0";
  let carry = 0;
  let isMin = false;
  const result = [];
  let sub = (a,b) => a-b;
  if (str1.length > str2.length) {
    str2 = str2.padStart(str1.length, '0');
  } else {
    if (str1.slice(0, 1) <= str2.slice(0, 1)) {
      isMin = true;
      sub = (a,b) => b-a;
    }
    str1 = str1.padStart(str2.length, '0');
  }
  for (let i = str1.length-1; i >= 0; i--) {
    const sum = sub(str1[i], str2[i]) + carry;
    if (sum>=0) {
      carry = 0;
      result.unshift(sum);
    } else {
      carry = -1;
      result.unshift(sum + 10);
    }
  }
  let res = result.join('').replace(/^0+/, '')
  if (res === '') return 0
  if (isMin) {
    res = '-' + res;
  }
  return res;
}
```

## 4. 两大整数之积
解析：
1. 两数之积的长度 一定小于等于 两数的长度之和
2. 声明一个数组，长度为两数之和
3. 双重循环 ，从后往前，对位相乘，并把结果存进新数组
4. 需要进位 则前一位 +1
5. 数组转字符串 去除开头0

```ts
function multiply(num1: string, num2: string): string {
   if (+num1 == 0 || +num2 == 0) {
    return '0'
   }
   num1 = num1.replace(/^0*/g, '');
   num2 = num2.replace(/^0*/g, '');
   let len1 = num1.length;
   let len2 = num2.length;
   let res: number[] = new Array(len1 + len2).fill(0);
   for (let i = num1.length-1; i >= 0; i--) {
    for (let j = num2.length-1; j >=0; j--) {
      let sum = Number(num1[i]) * Number(num2[j]) + res[i + j + 1];
      res[i + j + 1] = sum % 10;
      res[i + j] += Math.floor(sum / 10);
    }
   }
   return res.join('').replace(/^0*/, '') || '0';
}

```

## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾

## 推荐阅读
[1. 面试官： 如何判断两数组的内容是否相等](https://juejin.cn/post/7290786959441117243)

[2. 面试官： 如何计算两个超大数相加、相减]()
