---
theme: channing-cyan
---
## ES6(2015)
ES6 推荐大家参考阮一峰老师的：[ES6 入门教程](ttps://es6.ruanyifeng.com/)
## ES7(2016)
### 1. Array.prototype.includes
[includes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)： 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
- 参数：includes(searchElement, fromIndex)
  - searchElement：需要查找的元素值。
  - fromIndex：从fromIndex 索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜。默认为 0。
- 返回值：如果数组中存在则返回 true，否则返回 false。
- 下面是一般使用
```js
const array1 = [1, 2, 3];

console.log(array1.includes(2)); // true
console.log(array1.includes(2, 2)); // false, 因为元素2在索引1的位置，而includes从索引2开始查找，所有找不到返回false
console.log(array1.includes(4)); // false
```
- 实战
一般条件语句中会判断 条件是否满足
```js
let num
if (num===1 || num===2 ) {
}
// 可以使用includes
if ([1,2].includes(num)) {
}
```
- 注意点 其比较法是[零值相等算法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9B%B6%E5%80%BC%E7%9B%B8%E7%AD%89),即 [-0].includes(+0) 返回 true，但是NaN可以正常比较[NaN].includes(NaN) 返回 true

### 2. 指数操作符(**)
- 语法 2**3
- 返回值 数值
- 等价于 Math.pow(2, 3)

```js
console.log(2 ** 3) // 8
console.log(2.0 ** 3) // 8
console.log(2 ** -3) // 0.125
```





## ES8(2017)
- Async/Await
- String padStart()和padEnd()方法
- Object values、entries、getOwnPropertyDescriptors()
- 函数参数列表和调用中的尾随逗号支持，使得编辑多行参数列表时更方便。

### 1.async/await
- 返回值：promise
- async 创建一个AsyncFunction对象
- await 关键字只能在 async 函数内部使用，可以存在一个或者多个
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/af761c0e1bb44f8fa9b01166e8eb1e94~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1722933132&x-orig-sign=mpngyzRf3o2v8D%2BCj41m057NwIU%3D)
```js
fuction sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ES8 之前 使用Promise.then
sleep(1000).then(() => console.log('hello world'))

// ES8 之后 使用async/await
async function asyncPrint(value, ms) {
  await sleep(ms)
  console.log(value)
}
asyncPrint('hello world', 50)
```

### 2.String padStart()和padEnd()
- padStart方法用于另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。
- padEnd方法用于在当前字符串的末尾填充另一个字符串，直到达到给定的长度。填充从当前字符串的末尾开始。
- 两个方法都不影响原字符串，返回的是新的字符串。
```js
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

### 3.Object：values、entries、getOwnPropertyDescriptors
- Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
- Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
- Object.getOwnPropertyDescriptors方法返回指定对象所有自身属性（非继承属性）的描述对象。
```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj) // ["bar", 42]

Object.entries(obj) // [ ["foo", "bar"], ["baz", 42] ]

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 'bar',
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   baz:
//    { value: 42,
//      writable: true,
//      enumerable: true,
//      configurable: true } }
```

## ES9(2018)
- for await...of
- ... Rest剩余运算符
- Object扩展
- Promise.finally()
### 1. for await...of
- for await...of语句创建一个循环，该循环会等待每个Promise对象完成，然后使用对象的结果继续。例如，当处理多个Promise对象时，for await...of语句可以等待所有Promise对象完成，然后继续执行。
```js
async function* asyncGenerator() {
  yield 1;
  yield 2;
}

(async function() {
  for await (const x of asyncGenerator()) {
    console.log(x); // 1 2
  }
})();
```
### 2. ... Rest剩余运算符
- ... Rest运算符用于将一个可迭代对象（如数组或字符串）的所有元素展开为单独的元素。例如，可以使用... Rest运算符将一个数组的所有元素作为单独的参数传递给函数。
```js
function sum(...args) {
  // args是一个数组，包含了所有传递给函数的参数
  return args.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

let obj = { a: 1, b: 2, c: 3 };
let { a, ...rest } = obj;
console.log(a); // 1
console.log(rest); // { b: 2, c: 3 }
```
### 3. Promise.finally()
- Promise.finally()方法用于在Promise对象完成（无论是成功还是失败）后执行一个回调函数。例如，可以使用Promise.finally()方法来清理资源或执行一些清理操作。
```js
let promise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Success');
    }, 1000);
  });
}

promise()
  .then(result => {
    console.log(result); // 'Success'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Promise completed');
    // 清理loading \ 重置状态啥的
  });

// 一般我们使用 try catch finally 
try {
  // some asynchronous operation
  await promise();
} catch (error) {
  console.error(error);
} finally {
  console.log('Promise completed');
}
```

## ES10(2019)
- Array: flat、flatMap
- Object.fromEntries
- String：trimStart、trimEnd
- Symbol.prototype.description
- try catch 可以省略catch(err) 直接写catch {}

- 正则拓展
### 1. Array: flat、flatMap
- flat()方法用于将嵌套数组扁平化，即将多维数组转换为一维、低纬数组。例如：
```js
let arr = [1, [2, [3, [4, 5]]]];
let flatArr = arr.flat(Infinity);
console.log(flatArr); // [1, 2, 3, 4, 5]
```
- flatMap()方法用于对数组中的每个元素执行一个函数，并将结果合并为一个新数组。
- 等价于 map() 和 flat(1) 的结合。=》 [].map().flat()
```js
let arr = [1, [1], 2, 3, 4]; 
let flatMapArr = arr.flatMap(x => x * 2);
console.log(flatMapArr); // [ 2, 2, 4, 6, 8]
let flatMapArr1 = arr.map(x =>  x * 2).flat(1);
console.log(flatMapArr); // [ 2, 2, 4, 6, 8]
```
### 2. Object.fromEntries
- Object.fromEntries()方法用于将一个键值对数组转换为对象。例如：
```js
let arr = [['name', 'Alice'], ['age', 25]];
let obj = Object.fromEntries(arr);
console.log(obj); // { name: 'Alice', age: 25 }

// 将对象转换为键值对数组
let arr = Object.entries(obj);
console.log(arr); // [['name', 'Alice'], ['age', 25]]
```
### 3. String：trimStart、trimEnd
- trimStart()方法用于删除字符串开头的空白字符。
- trimEnd()方法用于删除字符串结尾的空白字符。
```js
let str = '  hello world  ';
let trimmedStr = str.trimStart();
console.log(trimmedStr); // 'hello world  '
let trimmedStr1 = str.trimEnd();
console.log(trimmedStr1); // '   hello world

let trim2 = str.trim();
console.log(trim2); // 'hello world'
```
### 4. Symbol.prototype.description
```js
let sym = Symbol('xiaoyi');
console.log(sym.description); // 'xiaoyi'
```
## ES11(2020)
- BigInt：表示任意大的整数
- Promise.allSettled：返回一个在所有给定的promise都已经完成或拒绝后的promise，并带有一个对象数组，每个对象表示对应的promise结果。
- Nullish coalescing operator：空值合并运算符 ?? ，用于处理null和undefined的情况。
- Optional chaining：可选链运算符 ?. ，用于访问对象的属性，如果属性不存在则返回undefined。
- GlobalThis：全局对象，用于获取全局对象。
### 1. BigInt：表示任意大的整数
js安全数：-(2^53-1)到(2^53-1)

```js
let bigInt = 1234567890123456789012345678901234567890n;
let bigInt1 = BigInt('1234567890123456789012345678901234567890');
console.log(bigInt); // 1234567890123456789012345678901234567890n
```
### 2. Promise.allSettled
[Promise手写](https://juejin.cn/post/7399827379052347444)
- 与 Promise.all区别 用法完全一致
等效 Promise.all，但不会因为某个promise失败而拒绝。
- 返回值：
如果所有给定的promise都成功，则返回一个包含所有promise结果的数组。
如果有一个promise失败，则返回一个包含第一个失败promise结果的数组。

```js
let promise1 = Promise.resolve('1');
let promise2 = Promise.reject('2');
const allRes = Promise.allSettled([promise1, promise2]);
allRes.then((res) => {
  console.log(res); // [
//   { status: 'fulfilled', value: '1' },
//   { status: 'rejected', reason: '2' }
// ]
});

```

### 3. Nullish coalescing operator
- ??：当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

```js
let a = null;
let b = undefined;
let c = 0;
let d = '';
let e = NaN;
let g = 1;
let h = 'hello';

console.log(a ?? b); // undefined
console.log(a ?? c); // 0
console.log(a ?? d); // null
console.log(a ?? e); // null
console.log(a ?? g); // 1
console.log(a ?? h); // hello

console.log(a || b); // undefined
console.log(a || c); // 0
console.log(a || d); // ''
console.log(a || e); // NaN
console.log(a || g); // 1
console.log(a || h); // hello
```
- 注意与|| 的区别
```js
console.log(0 ?? null); // 0
console.log(0 ?? 1); // 0
console.log(3 ?? 1); // 3

console.log(0 || null); // null
console.log(0 || 1); // nu1ll

```
### 4. 可选链 ?. 
- 可选链用于访问深层对象属性或者函数调用，即时引用不存在也不会报错，而是返回undefined。
```js
const obj = {
  name: '小易',
  age: 18,
  info: {
    gettAge() {
      return this.age;
    },
    gender: '男',
    address: {
      city: '北京',
      street: '长安街',
      country: '中国',
    },
  },
}

console.log(obj?.name); // 小易
console.log(obj?.info?.gender); // 男
console.log(obj?.info?.address?.city); // 北京
console.log(obj?.info?.address?.street); // 长安街
console.log(obj?.info?.address?.country); // 中国
console.log(obj?.xx?.address?.country); // undefined
console.log(obj?.info?.getAge?.()); // 18
console.log(obj?.info?.getAge?.()); // undefined

```
- 对数组的访问

```js
const arr = [1, 2, 3, { name: '小易'}, 5];
console.log(arr?.[2]); // 3
console.log(arr?.[3]?.name); // 小易
console.log(arr?.[4]?.name); // undefined
console.log(arr?.[6]); // undefined
```
### 5. globalThis
- 用于获取全局对象，在浏览器中是window，webWorker中是self,在node中是global

```js
console.log(globalThis);
```
## ES12（2021）
- String.prototype.replaceAll
- Promise.any
- WeakRef: 对象允许你保留对另一个对象的弱引用，但不会阻止垃圾回收（GC）清理被弱引用的对象。
- 数字分隔符
### 1. String.replaceAll(pattern, replacement)
- pattern: 可以是字符串或正则表达式
- replacement: 替换的字符串或函数
返回所有匹配项的替换字符串，而不仅仅是第一个匹配项。
```js
let str = 'hello world';
let str1 = str.replaceAll('o', 'x');
console.log(str1); // hellx wxrld
let str2 = str.replace('o', 'x');
console.log(str2) // hellx world

let str3 = '1 hello world 1';
let str4 = str3.replaceAll(/a-z/g, 'x'); // / a-z/g 匹配所有小写字母
console.log(str4); // 1 xxxxx xxxxx 1
```
### 2. Promise.any
- 只要有一个Promise成功，就返回那个已经成功的Promise，如果所有的Promise都失败，就返回一个失败的Promise，并带有失败的原因。
- Promise.race：有一个结果，无论成功、失败，都返回这个结果。
```js
const pro1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success1')
    }, 1500)
});
const pro2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('error1')
    }, 0)
});
const pro3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('error2')
    }, 1000)
});
Promise.any([pro1, pro2, pro3]).then((res) => {
    console.log(res); // success1
})
Promise.race([pro1, pro2, pro3]).then((res) => {
    console.log(res, 'race');
}).catch((err) => {
    console.error(err, 'race'); // error1
})
```
### 3. 数字分隔符
- 使用下划线（_）作为数字分隔符，使数字更易读。
```js
let num = 1_000_000_000;
console.log(num); // 1000000000
```
## ES13(2022)
- Top-level await  顶层 await
- Arrary.at
- Object.hasOwn
- Class Fields #作为class私有属性、简写法

### 1. Top-level await
- 在模块的顶层作用域使用await，不再需要将await放在async函数中。
```js
const response = await fetch('https://api.example.com/data');

// 以往可以使用函数嵌套
(async function() {
    const response = await fetch('https://api.example.com/data');
})();
```
### 2. Arrary.at
- Array.at()：返回指定索引处的元素，如果索引为负数，则从数组末尾开始计算。

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.at(2)); // 3
console.log(arr.at(-1)); // 5
```
### 3. Object.hasOwn
- Object.hasOwn()：用于判断对象自身是否具有指定的属性，而不是从原型链上查找。
- 建议使用此方法替代 Object.prototype.hasOwnProperty()，因为它适用于使用 Object.create(null) 创建的对象，以及重写了继承的 hasOwnProperty() 方法的对象。
```js
const obj = { a: 1, b: 2 };
console.log(Object.hasOwn(obj, 'a')); // true
console.log(Object.hasOwn(obj, 'c')); // false

const obj2 = Object.create(null);
obj2.a = 1;
console.log(Object.hasOwn(obj2, 'a')); // true
console.log(Object.hasOwn(obj2, 'b')); // false
console.log(obj2.hasOwnProperty('a')); // TypeError: obj2.hasOwnProperty is not a function
```

### 4. Class 简写法
```js
class Person {
  age = 18;  // 原型属性默认值
}
let person = new Person();
person.age; // 18
Person.name; // 'Person'
```

## ES14(2023)
- Arrary.findLast、findLastIndex()
- 新增几个不会影响原数组，并返回新数组的方法
    - Array.prototype.toReversed() -> Array
    - Array.prototype.toSorted(compareFn) -> Array
    - Array.prototype.toSpliced(start, deleteCount, ...items) -> Array
    - Array.prototype.with(index, value) -> Array
### 1. findLast、findLastIndex
- findLast()：从数组的最后一个元素开始，查找满足条件的元素，并返回第一个匹配的元素。
- findLastIndex()：从数组的最后一个元素开始，查找满足条件的元素，并返回第一个匹配的元素的索引。
```js
const arr = [1, 2, 3, 4, 5];
const lastEven = arr.findLast((value) => value % 2 === 0);
console.log(lastEven); // 4

const lastEvenIndex = arr.findLastIndex((value) => value % 2 === 0);
```
### 2. 新增数组方法
不会影响原数组，并返回新数组的方法,用法和原来一样
- toReversed()：返回一个新数组，该数组是原数组的反转。
- toSorted(compareFn)：返回一个新数组，该数组是原数组的排序。
- toSpliced(start, deleteCount, ...items)：返回一个新数组，该数组是原数组的部分替换。
- with(index, value)：返回一个新数组，该数组是原数组的部分替换。
```js
const arr = [1, 2, 3, 4, 5];
const reversedArr = arr.toReversed(); // [5, 4, 3, 2, 1]
const sortedArr = arr.toSorted();  // [1, 2, 3, 4, 5]
const splicedArr = arr.toSpliced(2, 1, 10);  // [1, 2, 10, 4, 5]
const withArr = arr.with(2, 10);  // [1, 2, 10, 4, 5]
```
