<!-- ECMAScript -->

## ECMAScript是什么？
ECMAScript是由网景的布兰登·艾奇开发的一种脚本语言的标准化规范；最初命名为Mocha，后来改名为LiveScript，最后重命名为JavaScript。
ECMAScript是一种由Ecma国际（前身为欧洲计算机制造商协会，European Computer Manufacturers Association）通过ECMA-262标准化的脚本程序设计语言。
- ECMAScript是JavaScript的规范，JavaScript是ECMAScript的实现。


## ECMAScript的发展历程
1997年，第一版ECMAScript发布，即ECMAScript 1.0。
1998年，发布ECMAScript 2.0，对语言进行了扩展。
1999年，发布ECMAScript 3.0，成为JavaScript的标准。
2007年，发布ECMAScript 4.0，但由于改动太大，被废弃。
2009年，发布ECMAScript 5.0，成为JavaScript的标准。
2015年，发布ECMAScript 6.0，即ES6，这是一次重要的更新，引入了类、模块、箭头函数、let/const 变量、模板字符串、Promise、解构赋值等。
2016年，发布ECMAScript 7.0，即ES7，新增了Array.prototype.includes 和指数操作符（**）。
2017年，发布ECMAScript 8.0，即ES8，引入了 async/await、Object.values/Object.entries 等。
2018年，发布ECMAScript 9.0，即ES9，包括异步迭代Promise.finally、for-await-of等。
2019年，发布ECMAScript 10.0，即ES10，flat\mapFlat。
2020年，发布ECMAScript 11.0，即ES11，BigInt\Promise.allSettled、import、可选链?.。
2021年，发布ECMAScript 12.0，即ES12，逻辑赋值运算符&&=、||=、??=、空值合并运算符??、Promise.any、String.prototype.replaceAll、WeakRef、FinalizationRegistry等。
2022年，发布ECMAScript 13.0，顶层await、Arrary.at、Object.hasOwn。

## ECMAScript 6.0（ES6）
### 1. let和const
let和const是ES6新增的变量声明方式，用于替代var。
let声明的变量具有块级作用域，即只在声明它的代码块内有效。
const声明的变量具有块级作用域，且必须初始化，且不能重新赋值。

```js
/**
 * var可以重复声明，let和const不能重复声明
 * var声明的变量会提升到作用域顶部，let和const不会提升
 * var声明的变量没有块级作用域，let和const有块级作用域
 */

console.log(a); // undefined,因为变量提升不会报错
var a = 1;
var a = 2;
console.log(a); // 2

console.log(b); // 报错：ReferenceError: Cannot access 'b' before initialization
let b = 1;
// let b = 2; // 报错：Identifier 'b' has already been declared
console.log(b); // 1

console.log(c); // 报错：ReferenceError: Cannot access 'c' before initialization
const c = 1;
// const c = 2; // 报错：Identifier 'c' has already been declared
// c = 2; // 报错：Assignment to constant variable.
console.log(c); // 1
```
- 注：var声明的变量、函数声明会有变量提升
S引擎的执行分为两个阶段，预解析阶段和执行阶段，预解析阶段就是创建一个函数执行环境，每个执行环境都会关联一个变量对象，环境中定义的变量、函数都会放在这个变量对象里面，创建变量对象的时候，它会扫描代码，找到所有的变量声明，然后把变量存入到变量对象里面，并赋值为undefined，这就导致的变量提升。


