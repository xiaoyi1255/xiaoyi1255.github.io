---
title: JS
titleTemplate: 两数组内容是否相等
---

## 题目
给定两个数组，判断两数组**内容**是否相等。
* 不使用排序
* 不考虑元素位置

例：
```js
[1, 2, 3] 和 [1, 3, 2] // true
[1, 2, 3] 和 [1, 2, 4] // false

```
思考几秒：有了😀😀
### 1. 直接遍历✍
* 直接遍历第一个数组，并判断是否存在于在第二个数组中
* 求差集, 如果差集数组有长度，也说明两数组不等（个人感觉比上面的麻烦就不举例了）
```js
const arr1 =  ["apple", "banana", 1]
const arr2 =  ["apple", 1, "banana"]

function fn(arr1, arr2) {
  // Arrary.some: 有一项不满足 返回false
  // Arrary.indexOf: 查到返回下标，查不到返回 -1
  if (arr1.length !== arr2.length) {
    return false;
  }
  return !arr1.some(item => arr2.indexOf(item)===-1)
}

fn(arr1,arr2) // true
```
* 细心的小伙伴就会发现：**NaN 会有问题**
```js
const arr1 =  ["apple", "banana", NaN]
const arr2 =  ["apple", NaN, "banana"]

function fn(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return !arr1.some(item => arr2.indexOf(item)===-1)
}

fn(arr1,arr2) // false
```
> Arrary.prototype.indexOf() 是使用的严格相等算法 => NaN值永远不相等
>
> Array.prototype.includes() 是使用的零值相等算法 => NaN值视作相等
* 严格相等算法: 与 === 运算符使用的算法相同
* **零值相等**不作为 JavaScript API 公开， -0和0 视作相等，NaN值视作相等，具体参考[mdn:](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9B%B6%E5%80%BC%E7%9B%B8%E7%AD%89) 

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/591f547122a0444594403e609f10762f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=617&h=225&s=9810&e=png&b=ffffff)


* 使用includes

```js
const arr1 =  ["apple", "banana", NaN]
const arr2 =  ["apple", NaN, "banana"]

function fn(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return !arr1.some(item => !arr2.includes(item))
}

fn(arr1,arr2) // true
```
使用includes 确实可以判断NaN了，如果数组元素有重复呢？

```js
// 重复的元素都是banana
const array1 = ["apple", "banana", "cherry", "banana"];
const array2 = ["banana", "apple", "banana", "cherry"];
// 或者
// 一个重复的元素是banana， 一个是apple
const array1 = ["apple", "banana", "cherry", "banana"];
const array2 = ["banana", "apple", "apple", "cherry"];

```
由上可知：这种行不通，接下来看看是否能从给数组元素添加标识入手
### 2. 把重复元素标识编号✍
这个简单：数组 元素重复 转换成val1, val2
```js
function areArraysContentEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // 重复数组元素 加1、2、3
  const countArr1 = updateArray(arr1)
  const countArr2 = updateArray(arr2)

  /**
   * 
   * @param {*} arr 数组 元素重复 转换成val1, val2
   * @returns 
   */
  function updateArray(arr) {
    const countMap = new Map();
    const updatedArr = [];

    for (const item of arr) {
      if (!countMap.has(item)) {
        // 如果元素是第一次出现，直接添加到结果数组
        countMap.set(item, 0);
        updatedArr.push(item);
      } else {
        // 如果元素已经出现过，添加带有编号的新元素到结果数组
        const count = countMap.get(item) + 1;
        countMap.set(item, count);
        updatedArr.push(`${item}${count}`);
      }
    }
    return updatedArr;
  }
  const flag = countArr1.some(item => !countArr2.includes(item))
  return !flag
}

const array1 = ["apple", "banana", "cherry", "banana"];
const array2 = ["banana", "apple", "banana", "cherry"];

areArraysContentEqual(array1, array2) // true

// 其实这种存在漏洞的
const array3 = ["apple", "banana", "cherry", "banana", 1, '1', '1' ];
const array4 = ["banana", "apple", "banana", "cherry", '1', 1, 1];
// 应该是false
areArraysContentEqual(array3, array4) // true
```
因为把判断的 转为了字符串 updatedArr.push(`${item}${count}`) 所以出问题了

### 3. 统计元素次数(最终方案)✍
```js
function areArraysContentEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  // 创建计数对象，用于记录每个元素在数组中的出现次数
  const countMap1 = count(arr1)
  const countMap2 = count(arr2)

  // 统计数组中的元素出现次数
  function count(arr = []) {
    const resMap = new Map();
    for (const item of arr) {
      resMap.set(item, (resMap.get(item) || 0) + 1);
    }
    return resMap
  }
  // 检查计数对象是否相等
  for (const [key, count] of countMap1) {
    if (countMap2.get(key) !== count) {
      return false;
    }
  }

  return true;
}

const array1 = ["apple", "banana", "cherry", "banana", 1, '1', '11', 11];
const array2 = ["banana", "apple", "banana", "cherry", '1', 1, '11', 11];

areArraysContentEqual(array1, array2) // true

```
### 4. 评论区大佬的方案（+1、-1）
1. 只需要一个对象
2. 遍历第一个数组就 +1
3. 遍历第二个数组就 - 1
4. 最后遍历对象，只要不是都是 0 就等于不匹配
> 这样就不需要俩个对象了，而且第二个遍历的时候如果找不到这个值的话也可以直接退出了

```js
function areArraysContentEqual3(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const countMap = new Map();

  // 计数第一个数组的元素
  for (const item of arr1) {
    countMap.set(item, (countMap.get(item) || 0) + 1);
  }

  // 比较第二个数组与计数
  for (const item of arr2) {
    const val = countMap.get(item);
    if (val === undefined || val <= 0) {
      return false;
    } else if (val === 1) {
      map.delete(item);
    } else {
      countMap.set(item, val - 1);
    }
  }

  return map.size === 0;
}

```
### 5. 评论区大佬的方案（操作第二个数组）
> 遍历第一个数组，在第二个数组找到就删除第二个数组中对应的元素，没有找到直接不等，最后再判断一下第二个数组的长度即可。实际使用中一般不直接操作原数组，浅复制一下就好
```js
function areArraysContentEqual2(arr1=[], arr2=[]) {
  arr2 = [...arr2]
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1.some(item => {
    // 找到元素在第二个数组中的位置
    const index = arr2.findIndex(item1 => {
      if (isNaN(item) && isNaN(item1)) {
        return true
      }
      return item ===item1
    })
    if (index !== -1 ) {
      arr2.splice(index, 1)
    }
  })
  return !arr2.length
}

```
！！哇这里有个坑
> NaN 判断的时候， 被被隐式转换
> Number.isNaN 判断才是严格相等

```js
isNaN('11') // false
isNaN('ccc') // true
isNaN('a') // true
isNaN(NaN) // true

Number.isNaN('11') // false
Number.isNaN('ccc') // false
Number.isNaN('a') // false
Number.isNaN(NaN) // true
```
### 优化后的第五点
```js
function areArraysContentEqual(arr1=[], arr2=[]) {
  arr2 = [...arr2]
  if (arr1.length !== arr2.length) {
    return false;
  }

  const compare = (item1, item2) => {
    if (Number.isNaN(item1) && Number.isNaN(item2)) {
      return true;
    }
    return item1 === item2;
  };

  arr1.some(item => {
    // 找到元素在第二个数组中的位置
    const index = arr2.findIndex(item1 => compare(item, item1))
    if (index !== -1 ) {
      arr2.splice(index, 1)
    }
  })
  return !arr2.length
}
```

### 6. 评论区大佬的方案（计数+转字符串比较）
1. 先判断数组长度
2. 求两数组的并集并去重
3. 分别遍历并集，在遍历中找到元素出现次数并转为字符串
4. 比较两个字符串是否相等

```js
function isArrSame(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  const set = [...new Set([...arr1, ...arr2])]
  function getCounts(arr) {
    return set.map(item => arr.filter(ele => [ele].includes(item)).length).join('')
  }
  return getCounts(arr1) === getCounts(arr2)
}
```
> 求数组并集，然后去去重，(解决顺序问题)
> 统计元素出现的次数（解决重复元素问题）： arr.filter(ele => [ele].includes(item)).length
> 
2024.01.05更新

## 注意事项
这个题需要注意：
* 先判断长度，长度不等 必然不等
* 元素可重复
* 边界情况考虑
    - '1' 和 1 (Object的key是字符串， Map的key没有限制)
    - NaN 
    - null undefined

## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾

