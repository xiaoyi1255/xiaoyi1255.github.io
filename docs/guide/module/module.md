---
theme: channing-cyan
---
# 模块化
## 一、什么是模块化？
**把复杂的系统分拆成不同模块，并使模块之间通过标准化接口进行信息沟通的动态整合过程**就叫做模块化。

本文主要介绍了：CommonJS、AMD、CMD、UMD、ES Module等模块化规范。

## 二、模块化解决的问题
1. **全局变量污染**：在大型项目中，全局变量过多会导致命名冲突，难以维护。
2. 代码复用：模块化可以将代码封装成独立的模块，方便在其他项目中复用。
3. 代码组织：模块化可以将代码按照功能、业务模块进行组织，提高代码的可读性和可维护性。
4. **依赖管理**：模块化可以明确模块之间的依赖关系，避免循环依赖等问题。

**没有模块化之前怎么处理的**
1. 全局function：将功能封装在全局函数中，通过全局函数名调用。
2. namespace命名空间：将功能封装在命名空间中，通过命名空间调用。(全局对象)
3. IIFE：立即执行函数表达式，将功能封装在立即执行函数中，通过函数自调用。(闭包)
```js
// 全局函数
function add(a, b) {
  return a + b;
}

// 命名空间
var math = {
  add: function(a, b) {
    return a + b;
  },
  count: 6,
  name: '小易'
}

// IIFE
var math = (function() {
  var add = function(a, b) {
    return a + b;
  }
  return {
    add: add
  }
})();
```

## 三、模块化规范有哪些？
1. **CommonJS**：Node.js的模块化规范，通过require引入模块，通过module.exports导出模块。(2009)
3. **AMD**：RequireJS实现的模块化规范，通过define定义模块，通过require引入模块。(2010)
4. **CMD**：SeaJS实现的模块化规范，通过define定义模块，通过require引入模块。(2011)
5. **UMD**：通用模块定义规范，兼容CommonJS、AMD和全局变量方式。(2012)
6. **ES6** Module：ES6引入的模块化规范，通过import引入模块，通过export导出模块。(2015)

### CommonJS（Node.js）
1. 一个单独文件，就是一个模块
1. 通过require引入模块，通过module.exports导出模块。
2. 模块是**同步加载**的，适用于服务器端。(运行时加载)
3. 模块加载时，会缓存模块的导出结果，再次加载时直接返回缓存结果。
4. 模块导出的是值的浅拷贝，模块内部修改导出的值不会影响外部。


```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = {
  add: add
}

// main.js
const math = require('./math.js');
console.log(math.add(1, 2)); // 3
```

### AMD（RequireJS）
1. 通过define定义模块，通过require引入模块。
2. 模块是异步加载的，适用于**浏览器端**。
3. AMD兼容CommonJS规范。
4. 延迟加载，按需加载。
```js
// 定义  有依赖模块
// a.js
define([], function() {
  const message = "Hello from Module 1";
  return {
    message,
  };
})

// 引入 a.js
require(['./a.js'], function(a) {
  console.log(a.message); // Hello from Module 1
})
```

### CMD（SeaJS）
1. 通过define定义模块，通过require引入模块。
2. 模块是异步加载的，适用于浏览器端。
3. CMD兼容CommonJS规范。
4. 依赖就近
5. 加载方式：**seajs.use('./app.js')**
```js
// a.js
define(function(require, exports, module) {
  const message = "Hello from Module 1";
  module.exports = {
    message
  };
});

// app.js
define(function(require) {
  const a = require('./a');
  console.log(a.message);
  return {
      name: '小易'
  }
});

```
加载入口文件
```html
<!-- // index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CMD Example</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/seajs/3.0.0/sea.js"></script>
</head>
<body>
    <h1>Check the console for output</h1>
    <script>
        seajs.use('./app.js', app => {
            console.log(app.name) // 小易
        });
    </script>
</body>
</html>
```

### UMD（兼容模式）
2. 模块是异步加载的。
3. UMD兼容**CommonJS**和**AMD**规范,都不满足 => **全局变量方式**。
4. 适用于浏览器和Node.js环境。
```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD 模块系统 (RequireJS)
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        // CommonJS 模块系统 (Node.js)
        module.exports = factory();
    } else {
        // 作为全局变量暴露
        root.myModule = factory();
    }
}(this, function () {
  // 模块代码
  const message = "Hello, UMD!";
  return {
    getMessage: function() {
      return message;
    }
  };
}));
```

### ES6 Module(官方)
1. 通过export导出模块，通过import引入模块。

3. 模块是静态加载的，在编译时确定模块的依赖关系。
4. 适用于浏览器和Node.js环境（v6.10.3 版本就开始支持）。
5. 不同于CommenJS，ES6 Module输出的是值的引用，而不是浅复制。
6. ES6 Module是**官方提供的模块化方案**，，其它都是社区实现的。（ES2015）
7. 指定加载某个输出值，而不是整个模块，有利于代码分割和**tree shaking**。
8. import 导入的的变量存在 **声明提升**

```js
// a.js
export const message = "Hello from Module 1";

// app.js
import { message } from './a';
console.log(message); // Hello from Module 1
```

## 总结
其实我们只需要掌握CommonJS和ES6 Module两种规范即可，因为它们是目前最主流的两种模块化方案。

### 区别


区别   | CommonJS                 | AMD            | CMD                             | UMD               | ES Module           |
| ---- | ------------------------ | -------------- | ------------------------------- | ----------------- | ------------------- |
| 规范实现 | Nodejs（社区）               | RequireJs（社区）  | SeaJs（社区）                       | 社区                | ECMAScript(官方）      |
| 运行环境 | 服务器                      | 浏览器            | 浏览器                             | 浏览器、服务器           | 浏览器、服务器（node6.10.3） |
| 加载方式 | 同步（运行时）                  | 异步加载           | 异步加载                            | 同、异步              | 异步（编译时）             |
| 导入导出 | module.export={}\require | define\require | define\seajs.use(module,(m)={}) | AMD、CommonJs、全局变量 | export\import       |
| 导出值  | 值的浅拷贝(副本）                | 值的浅拷贝          | 值的浅拷贝                           | 值的浅拷贝、引用          | 引用                  |
| 依赖   | 同步加载依赖                   | 依赖前置（2.0 依赖延迟） | 依赖就近                            | 整合                | 动态加载依赖              |
| 出现   | 2009年                    | 2010年          | 2011年                           | 2012年             | 2015年
### CommonJS中循环依赖
```js
// a.js
const b = require('./b.js');
console.log('a文件内访问b:', b);
  foo: () => {
    b.bar();
  },
};

// b.js
const a = require('./a.js');
console.log('b文件内访问a: ', a);
module.exports = {
  bar: () => {
    a.foo();
  },
};
```

引用地方
```js
require('./a.js');
require('./b.js');
```
先引入a.js，再引入b.js，输出结果如下：
```js
// b文件内访问a:  {}
// a文件内访问b:  [Function: bar]
```
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1a8f8af4272042489c490e73c4480234~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1724638316&x-orig-sign=uTUW%2Bn7zJpWBVvFPsfmVMPi2qXc%3D)

结果解析：
- 先引入的a.js, 在a.js中引用了b.js，此时b.js还未执行，所以b.js中的a是空对象
- b.js执行完毕后，a.js继续执行，输出a文件内访问b: [Function: bar]

### ES6 Module中循环依赖
```js
// a.js
import b from './b.mjs';
console.log('a文件内访问b:', b);
export default {
  foo: () => {
    b.bar();
  },
};

// b.js
import a from './a.mjs';
console.log('b文件内访问a: ', a);
export default {
  bar: () => {
    a.foo();
  },
};
```
引用地方
```js
import a from './a.mjs';
import b from './b.mjs';
```
- 先引入a.js，再引入b.js，
- 报错了：
```js
console.log('b文件内访问a: ', a); 
// ReferenceError: Cannot access 'a' before initialization
```
解决：因为ES6 Module输出的是值的引用，所有延迟访问 setTimeout
```js
// b.js
import a from './a.mjs';
setTimeout(() => {
  console.log('b文件内访问a: ', a);
}, 1000)
export default {
  bar: () => {
    a.foo();
  },
};
```
完结撒花🎃，工程中尽量避免循环引用问题。。。。
## 源码
[xiaoyi1255](https://github.com/xiaoyi1255/xiaoyi1255.github.io/tree/master/docs/guide/module)
## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾
