---
title: 代码混淆
titleTemplate: webpack-obfuscator
---

> Vue项目中的代码混淆方案：webpack-obfuscator + javascript-obfuscator
## 前言
代码混淆(Obfuscated code)亦称花指令，是将计算机程序的代码，转换成一种功能上等价，但是**难于阅读和理解**的形式的**行为**。   

将代码中的各种元素，如变量，函数，类的名字改写成无意义的名字。

简单理解就是：代码逻辑不变，只是使代码**难以阅读**。  

你可能会疑问？为什么需要进行混淆？它会**增加代码体积**、**增加调试成本**、还可能**损耗性能**...

当你需要的时候自会知晓，嘿嘿~

## 安装依赖
[webpack-obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator)    
[javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)   
先查看对应的webpack版本，再对应安装依赖
```sh
yarn list webpack
```
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79f76e95fc91401a85f3b32ed712e620~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=845&h=126&s=13136&e=png&b=282c34)
>webpack4.x 使用2.x的 webpack-obfuscator
>
>webpack5.x 使用3.x的 webpack-obfuscator
### webpack4.x
```sh
yarn add webpack-obfuscator@2.6.0 javascript-obfuscator -D
```
### webpack5.x
```sh
yarn add webpack-obfuscator javascript-obfuscator -D

```
版本不对会报错
* **TypeError:** Cannot read properties of undefined (reading 'tap')
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c67e999db04471eb85218837ad755d5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1166&h=201&s=24280&e=png&b=282c34)

## vue中使用
```js
// vue.config.js
var JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  configureWebpack: {
    plugins: [
      new JavaScriptObfuscator({
        rotateStringArray: true,
        /**[] 可以配置 排除混淆的文件 */
      }, [])
    ]
  },
}

```
### 配置属性参考
[官方配置详解](https://obfuscator.io/#output)
```js
{
  // 压缩,无换行
  compact: true,
  // 是否启用控制流扁平化(降低1.5倍的运行速度)
  controlFlowFlattening: false,
  // 应用概率;在较大的代码库中，建议降低此值，因为大量的控制流转换可能会增加代码的大小并降低代码的速度。
  controlFlowFlatteningThreshold: 0.75,
  // 随机的死代码块(增加了混淆代码的大小)
  deadCodeInjection: false,
  // 死代码块的影响概率
  deadCodeInjectionThreshold: 0.4,
  // 此选项几乎不可能使用开发者工具的控制台选项卡
  debugProtection: false,
  // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
  debugProtectionInterval: false,
  // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
  disableConsoleOutput: false,
  //锁定混淆的源代码，使其仅在特定域和/或子域上运行。这使得某人只需复制并粘贴您的源代码并在其他地方运行就变得非常困难。
  domainLock: [],
  //标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
  identifierNamesGenerator: 'hexadecimal',
  //全局标识符添加特定前缀,在混淆同一页面上加载的多个文件时使用此选项。此选项有助于避免这些文件的全局标识符之间发生冲突。为每个文件使用不同的前缀
  identifiersPrefix: '',
  inputFileName: '',
  // 允许将信息记录到控制台。
  log: false,
  // 是否启用全局变量和函数名称的混淆
  renameGlobals: false,
  // 禁用模糊处理和生成标识符
  reservedNames: [],
  // 禁用字符串文字的转换
  reservedStrings: [],
  // 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
  rotateStringArray: true,
  // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
  seed: 0,
  selfDefending: false,
  sourceMap: false,
  sourceMapBaseUrl: '',
  sourceMapFileName: '',
  sourceMapMode: 'separate',
  // 删除字符串文字并将它们放在一个特殊的数组中
  stringArray: true,
  // 编码的所有字符串文字stringArray使用base64或rc4并插入即用其解码回在运行时的特殊代码。true（boolean）：stringArray使用编码值base64;false（boolean）：不编码stringArray值;'base64'（string）：stringArray使用编码值base64;'rc4'（string）：stringArray使用编码值rc4。大约慢30-50％base64，但更难获得初始值。建议禁用unicodeEscapeSequence带rc4编码的选项以防止非常大的混淆代码。
  stringArrayEncoding: false,
  // 调整字符串文字将插入stringArray的概率
  stringArrayThreshold: 0.75,
  // 您可以将混淆代码的目标环境设置为以下之一：Browser;Browser No Eval;Node
  target: 'browser',
  // 是否启用混淆对象键
  transformObjectKeys: false,
  // 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
  unicodeEscapeSequence: false
}
```

## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、可以优化的地方欢迎在评论区指出，谢谢👾👾👾