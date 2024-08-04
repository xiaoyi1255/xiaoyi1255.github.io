<!-- js基础 -->

## 1. js数据类型

基础数据类型：String、Number、Boolean、Null、Undefined、Symbol、BigInt
引用数据类型：Object
存储位置：基本数据类型存储在栈内存中，引用数据类型存储在堆内存中

### 1.1 基本类型

- String：表示字符串 
- Number: 表示数字，有效数字范围[-2^53+1, 2^53-1]
- Boolean: 表示布尔值，true\false
- Null：表示空值
- Undefined: 已声明的变量，未赋值
- Symbol: 表示唯一且不可变的值，通常用作对象属性的唯一标识符。
- BigInt: 数字数据类型，可以表示任意精度格式的整数

tips: 
- typeof null 返回`object`
- undefined 是全局对象的一个属性，表示未定义的值，但 undefined 不是关键字，而是一个变量，可以被重新赋值，所有一般再框架内使用undefined时，最好使用void 0来代替undefined

### 1.2 引用类型

- object
  - Array
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
tips: 判断数组可以使用 isArray 比较好用


## 2. new 操作符的实现

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

## 3. 原型和原型链
原型：对象的原型指向构造函数的原型对象，通过原型可以访问到构造函数原型上的属性和方法

原型链：当访问一个对象的属性时，如果该对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以原型链的尽头就是 Object.prototype.__proto__，而 Object.prototype.__proto__ 的值为 null，就表示原型链到顶了。

```js
let obj = {
  name: 'obj'
}

console.log(obj.__proto__ === Object.prototype) // true
```

## 4. 闭包

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

## 5. 深拷贝和浅拷贝

浅拷贝：只复制对象的第一层属性，如果属性值是引用类型，复制的是引用地址，如果修改了原对象中的引用类型属性，拷贝的对象也会受到影响