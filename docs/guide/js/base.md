<!-- js基础 -->

## 1. js数据类型

基础数据类型：String、Number、Boolean、Null、Undefined、Symbol、BigInt
引用数据类型：Object
存储位置：基础数据类型存储在栈内存中，引用数据类型存储在堆内存中

### 1.1 基本类型

- String：表示字符串 
- Number: 表示数字，有效数字范围[-2^53+1, 2^53-1]
- Boolean: 表示布尔值，true\false
- Null：表示空值
- Undefined: 已声明的变量，未赋值. 访问对象`未声明`的key，返回`undefined`
- Symbol: 表示唯一且不可变的值，通常用作对象属性的唯一标识符。(ES20155新增---es6)
- BigInt: 数字数据类型，可以表示任意精度格式的整数 (ES2020新增---es11)

tips: 
- typeof null 返回`object`
- undefined 是全局对象的一个属性，表示未定义的值，但 undefined 不是关键字，而是一个变量，可以被重新赋值，所以一般在框架内使用undefined时，最好使用void 0来代替undefined

### 1.2 引用类型

- object
  - Array: [数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - Date
  - RegExp
  - Math
  - Function

### 1.3 判断数据类型

- typeof
- instanceof
- constructor
- Object.prototype.toString.call()

```js
function getType(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if(typeof value === 'object' || typeof value === 'function') {
    const typeString = Object.prototype.toString.call(value);
    return typeString.slice(8, -1);
  }
  return typeof value;
}

```
tips: 判断数组可以使用 `Array.isArray([])` 比较好用


## 2.  [Array数组的使用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
### 静态方法
  - [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from): 将类数组对象或可迭代对象转换为数组
  - [Array.isArray()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray): 判断是否为数组
  - [Array.of()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of): 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型
  ```js
  Array.of(1, 2, 3); // [1, 2, 3]
  Array.of(undefined); // [undefined]
  Array.of('1'); // ['1']
  ```
### 实例方法 
1. [Array.prototype.push()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push): 将一个或多个元素添加到数组的末尾，返回新长度
。
2. [Array.prototype.pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop): 删除数组的最后一个元素，返回这个元素
。
23. [Array.prototype.shift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift): 从数组中删除第一个元素，并返回该元素的值
30. [Array.prototype.unshift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift): 将一个或多个元素添加到数组的开头，返回新长度

25. [Array.prototype.some()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some): 测试是否至少有一个元素通过了由提供的函数实现的测试
。返回 true/false
4. [Array.prototype.every()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every): 测试一个数组内的所有元素是否都能通过一个指定函数的测试。返回 true/false
1. [Array.prototype.concat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat): 连接两个或多个数组，返回一个新数组
5. [Array.prototype.fill()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill): 填充数组中从起始索引到终止索引内的全部元素
6. [Array.prototype.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter): 过滤数组，创建一个新数组，其包含通过所提供函数实现的测试的所有元素
7. [Array.prototype.find()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find): 返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined
8. [Array.prototype.findIndex()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex): 返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1
9. [Array.prototype.findLast()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast): 返回数组中满足提供的测试函数的最后一个元素的值，否则返回 undefined
9. [Array.prototype.findLastIndex()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex): 返回数组中满足提供的测试函数的最后一个元素的索引，否则返回-1
9. [Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat): 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
10. [Array.prototype.flatMap()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap): 先对数组中的每个元素依次执行一个由您提供的函数（升维），然后对数组的每个元素执行一个reduce操作（降维），并返回一个新数组
11. [Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach): 对数组的每个元素执行一次提供的函数
12. [Array.prototype.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes): 判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false
13. [Array.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf): 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
14. [Array.prototype.join()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join): 将一个数组的所有元素连接成一个字符串并返回这个字符串
3. [Array.prototype.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries): 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对
15. [Array.prototype.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys): 返回一个包含数组中每个索引键的Array Iterator对象
16. [Array.prototype.lastIndexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf): 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始
。
17. [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map): 遍历数组每一项，并对其进行处理，返回一个新的数组


20. [Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce): 可声明初始值，在迭代中，将上一次计算结果作为参数传入，一般用于累加、累乘等操作
22. [Array.prototype.reverse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse): 翻转数组
23. [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort): 对数组的元素进行排序并返回数组
24. [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice): 返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变, 
。
27. [Array.prototype.splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice): 通过删除现有元素和/或添加新元素来更改一个数组的内容
。
29. [Array.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString): 返回一个字符串，表示指定的数组及其元素
。
31. [Array.prototype.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values): 返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值
32. [Array.prototype.toReversed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed): 翻转数组---不影响原数组
。
33. [Array.prototype.toSorted()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted): 返回一个新的数组，该数组包含调用它的对象的元素排列---不影响原数组。
34. [Array.prototype.toSpliced()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced): 返回一个新的数组，该数组包含调用它的对象的元素，并替换指定位置的元素---不影响原数组
35. [Array.prototype.at()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/at): 返回指定索引处的元素，如果索引为负数，则从数组末尾开始计算

> tips: toReversed、toSorted、toSpliced是ES2023新增，不影响原数组

## 3. string
1. [String.prototype.trim()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim): 去除字符串两端的空白字符
2. [String.prototype.trimStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart): 去除字符串开头的空白字符
3. [String.prototype.trimEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd): 去除字符串结尾的空白字符
4. [String.prototype.replace()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace): 替换字符串中匹配的子串
5. [String.prototype.replaceAll()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll): 替换字符串中所有匹配的子串
6. [String.prototype.repeat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/repeat): 返回一个新的字符串，该字符串包含指定数量的重复调用该字符串的元素
7. [String.prototype.split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split): 将字符串分割成子串，并返回一个数组
8. [String.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice): 提取字符串的某个部分，并返回一个新的字符串
8. [String.prototype.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart): 在字符串的开头填充指定的字符，直到达到指定的长度
9. [String.prototype.padEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd): 在字符串的末尾填充指定的字符，直到达到指定的长度
10. [String.prototype.toUpperCase()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase): 将字符串转换为大写
11. [String.prototype.toLowerCase()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase): 将字符串转换为小写
12. [String.prototype.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes): 判断一个字符串是否包含另一个字符串
13. [String.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf): 返回字符串中指定子串的首次出现的位置
14. [String.prototype.lastIndexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf): 返回字符串中指定子串的最后一次出现的位置
15. [String.prototype.search()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search): 返回一个字符串中一个子串或正则表达式 首次匹配项的索引
,匹配不上  返回 -1

## 4. new 操作符的实现

```js
function _new(fn, ...args) {

  // 1. 创建一个空对象
  const obj = Object.create(null);

  // 2. 将空对象的 __proto__ 指向构造函数的原型
  obj.__proto__ = fn.prototype;

  // 3. 将构造函数的 this 指向 obj，并执行构造函数
  const result = fn.apply(obj, args);

  // 4. 如果构造函数返回的是对象，则返回该对象，否则返回 obj
  return result instanceof Object ? result : obj;

}
```

## 5. 原型和原型链
原型：对象的原型指向构造函数的原型对象，通过原型可以访问到构造函数原型上的属性和方法

原型链：当访问一个对象的属性时，如果该对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以原型链的尽头就是 Object.prototype.__proto__，而 Object.prototype.__proto__ 的值为 null，就表示原型链到顶了。

```js
let obj = {
  name: 'obj'
}

console.log(obj.__proto__ === Object.prototype) // true
```

## 6. 闭包

闭包是js对作用域的一种应用；分为全局作用域和局部作用域；全局作用域声明的变量、函数，局部作用域也能访问，局部作用域声明的则反之。JS引擎又分为：预解析阶段和执行阶段。预解析会创建一个函数执行环境，每个执行环境会关联一个变量对象，该执行环境中创建的变量、函数都在这个变量对象上，创建变量对象时，会扫描代码，找到所有声明的变量存入变量对象中，并赋值为undefined，就会导致变量提升。
 

```js
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}

var baz = foo();
baz(); // 2
```

## 7. 深拷贝和浅拷贝

浅拷贝：只复制对象的第一层属性，如果属性值是引用类型，复制的是引用地址，如果修改了原对象中的引用类型属性，拷贝的对象也会受到影响