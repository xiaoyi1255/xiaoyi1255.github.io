---
title: 网络
titleTemplate: 前端缓存
---
## 前言 {#前言}

大家好！我是程序员小易！这是我的第一篇文章，一些的不足或描述不清晰是地方，欢迎大家评论区指正。一起学习、一起进步！
_____________________________________________________________________________________
**本文：** 介绍了什么是http缓存、优先级、优缺点及代码实现

**资源**：可以是访问过的静态资源（css、js、图片、页面、时效不高的接口）

**分类**：服务器缓存、CDN缓存、http缓存
### 我们为什么需要http缓存？
    因为缓存可以节省网络资源、提高网页性能、降低服务器压力
### 什么是http缓存
HTTP缓存是指在客户端（如浏览器）或者代理服务器（如CDN）中存储之前获取的Web资源的副本，当客户端或代理服务器再次请求该资源时，直接从本地缓存中获取，避免了重复的网络请求和服务器响应。常见的HTTP缓存包括强制缓存和协商缓存。
先上思维导图

![http缓存思路导图.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6d722cb3ebc4f66978255108deb2453~tplv-k3u1fbpfcp-watermark.image?)

   http缓存也称浏览器缓存，就是：服务器通过header头告诉浏览器是否使用缓存，使用什么样的缓存规则？我们先认识一下缓存的优先级和请求头。

| 优先级 | pragma>Cache-Control>Expire 强缓存>协商缓存（也称弱缓存）|
| --- | --- |
| pragma | no-cache，用于请求头，效果和 Cache-control:no-cache 一致  |
| Last-Modified/if-modified-since | 表示服务器上资源的最后修改时间, 格林尼治时间 前者为响应头、后者为请求头 |
| ETag/If-None-Match | 表示资源的唯一标识，可以根据文件的内容自定义生成hash;前者为响应头、后者为请求头 |
|  | 1、private：私有缓存：指令表明响应只能存储在私有缓存中（例如浏览器中的本地缓存）|
|  | 2、public：共享缓存：客户端和服务器、代理服务器都可以缓存；表示响应可以存储在共享缓存中。带有标头字段的请求的响应Authorization不能存储在共享缓存中；但是，该public指令将导致此类响应存储在共享缓存中 |
|  | 3、max-age=seconds:相对时间：响应指令指示响应在生成响应后N秒之前保持新 |
|  | 4、s-maxage: 指令还指示响应的新鲜时间（类似于max-age） - 但它特定于共享缓存，max-age当它存在时它们将被忽略 |
| Cache-Control | 5no-cache: 响应可以存储在缓存中，但响应必须在每次重用之前与源服务器进行验证，即使缓存与源服务器断开连接也是如此 |
|  | 6、no-store: 所以内容都不会被缓存，强制缓存和协商缓存也不会触发 |
|  | 7、no-transform: 代理不可更改媒体类型 |
|  | 8、must-revalidate |
|  | 9、proxy-revalidate |
|  | 10、min-fresh |
|  | 11、max-stale |   



## http缓存流程 {#http缓存流程}

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc17bf22cba149a6b019c735ad16f6f7~tplv-k3u1fbpfcp-watermark.image?)


## 怎样实现http缓存 {#怎样实现http缓存}

### 准备工作

这里使用 node 简单地搭建了个服务器，使用了node的fs模块和crypto模块

#### crypto

```typescript
const crypto = require('crypto');
const hash = crypto.createHash('md5'); // 'md5' | 'sha1' | 'sha256' | 'ha512'
hash.update('Hello'); // 传入我们要生成hash 的内容
const str = hash.digest('hex'); // 'bin' | 'base64' 按照指定的格式进行加密
```
`fs`
```typescript
const fs = require('fs'); // 引入fs模块
const stats = fs.statSync(path); // 通过传入路径，同步读取系统文件信息[修改时间、文件大小]
// fs.stat(path, callback); // 异步读取，回调形式处理，读取结果
// 1.stats.isFile(): 如果是文件则返回true,否则返回false;
// 2.stats.isDirectiory(): 如果是目录则返回true,否则返回false;
// 3.stats.isBlockDevice(): 如果是块设备则返回true，否则返回false;
// 4.stats.isCharacterDevice(): 如果是字符设备返回true,否则返回false;
// 5.stats.isSymbolicLink(): 如果是软链接返回true,否则返回false;
// 6.stats.isFIFO(): 如果是FIFO,则返回true,否则返回false.FIFO是UNIX中的一种特殊类型的命令管道
// 7.stats.isSocket(): 如果是Socket则返回true,否则返回false;
// 8.stats.size(): 文件的大小（以字节为单位）。

fs.readFileSync(path); // 同步读取 文件
// fs.readFile(path,callback); // 异步读取文件
```
`服务器`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c93eb6eaaa143b8ae3357b73132c4ab~tplv-k3u1fbpfcp-watermark.image?)
`读取资源：`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01e61807a3554f548addc57873b3a00f~tplv-k3u1fbpfcp-watermark.image?)
## 强制缓存 {#强制缓存}
强缓存主要使用`Expires`、`Cache-Control` 两个头字段，两者同时存在`Cache-Control`优先级更高。当命中强缓存的时候，客户端不会再求，直接从缓存中读取内容，并返回HTTP状态码`200`。这里就是无论 服务端的资源有没有发生改变，没有过期之前，都不会重新发送请求。
#### Expires
Expires：绝对时间，表明直到这个时间为止，都不需要找我。注意避坑：时间格式为：格林尼治时间：GMT。这是http1.0的产物，存在问题，所以在1.1版本推出了Cache-Control。\
先来看代码的实现：在请求`index.css`的时候给设置了`Expires`请求头。下面是第一请求`index.css`和第一次请求的浏览器截图。第一次请求图片，返回的状态码是200。表示改资源是从服务器读取的。

 `设置Expires`
 
```typescript
res.setHeader('Expires', new Date(now + 5 * 60 * 1000).toUTCString())
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dca2310b83c1422a9ecaa053228da26f~tplv-k3u1fbpfcp-watermark.image?)

我们再看看第二次请求和第三次请求，状态码也是为200，但是服务器实际上没有接收到请求。读的是磁盘里面的缓存。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c5f7d57898d497aabc3656f02c60516~tplv-k3u1fbpfcp-watermark.image?)
#### Expires的不足
看到这，是不是觉得`Expires`太好用了，为什么还要在http1.1中新增`Cache-Control`?你可能想问：那如果资源设置了一个很长的过期时间，比如1年，但是期间，该资源被改变了，而前端是无感知的，前端还在用着旧版本。解决方案？请求资源拼上 版本号、时间戳等手段，就可以了。最致命的问题是：过期时间设置的是一个绝对时间，它没有发请求，在本地判断是否过期，用的客户端的时间和响应的`Expires`做判断。那么问题就来了：假如客户端的时间被修改了、就算时间没有被修改，也存在跨时区问题，不就乱套了么？所以`Cache-Control`还是很有必要滴。
#### Cache-Control
：相对时间, 响应后N秒，资源保持新鲜，如1分钟之内，都不要找我，max-age="60",单位为秒、我们通过`max-age`设置的强制缓存,`header`头代码如下

```typescript
res.setHeader('Cache-Control', 'max-age=120' )
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5976280e4eaf46b5ad8419512568bab6~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d7aa19c24194272b9b9def4a90de073~tplv-k3u1fbpfcp-watermark.image?)
由上图可知：设置了max-age 在没有到期之前，服务器也是没有接收到请求 的，直接在前端拿的缓存，并且返回的是`200`，接下来，去看看协商缓存。
## 协商缓存 {#协商缓存}
协商缓存：顾名思义，它没有强制缓存那么硬气，需要去和服务端协商，到底用缓存？还是重新访问资源？协商缓存是希望通过对比文件的最后一次修改时间、文件内容hash来判断。这里涉及的两组header头：
#### Last-Modified / If-Modify-Since
表示：服务器对资源文件的最后一次修改时间

```typescript
const fileModifyTime = fs.statSync(url).ctime.toUTCString() // 拿到系统文件修改时间
res.setHeader('Cache-Control', 'no-cache')
res.setHeader('last-modified', fileModifyTime)
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c17e897b250d4841a33117a5c19c007f~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d35c5b95d2fc468ba975cfcd1eb786e8~tplv-k3u1fbpfcp-watermark.image?)
第二次请求的时候，请求头携带了`if-modified-since`，就是第一次请求响应头的`last-modified`,服务器通过重新获取文件的最后一次修改时间，来对比。对比结果：文件未被修改，所以我们可以发现状态码为`304`，服务器也接收到了请求，这时候可能就有疑问了，协商缓存都又请求了一次，还不是浪费了网络资源，答案是：是！但是又不全是，因为，服务器是接收到请求了，也做了判断，但是结果是，可以继续使用缓存，所以服务器的响应体，并没有把资源返回给前端，**资源还是从前端的缓存中读取的**
#### Last-Modified的不足
前面的`Expires`遗留的，客户端时间可能被修改的问题，那么加上`Last-Modified`在服务器判断该文件的最后修改时间，这下应该没有啥问题了吧？还是会存在两个问题：\
1、`Last-Modified`颗粒度是秒级的，操作该文件资源的时间如果是毫秒、甚至纳秒，那不是也完犊子了么？\
2、我就是不改文件内容，我只把文件的最后修改时间改了，欸，干得漂亮！！！所以这时候我们就不得不引出另一组`header`头了。
#### ETag
强`ETag`生成hash字符串 需要大量的算法计算,根据文件的内容生成，如果文件几个G，那就。。。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6e82674dd384eaf94f87dc852aa11cb~tplv-k3u1fbpfcp-watermark.image?) \
弱`ETag`表现形式就是`W/ +hash`, W的大小写敏感，弱`Etag`一般：文件最后修改时间+时间戳+部分内容生成`hash`\

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8374519bc7b648d795d7ceada56ea5a0~tplv-k3u1fbpfcp-watermark.image?)\
**ETag是可以根据场景自定义**\
`ETag`﻿ =》`If-None-Match`表示资源内容是否被更改，一般为`hash`值\
`设置ETag头`\

```typescript
res.setHeader('Cache-Control', 'no-cache')
res.setHeader('etag', etag)
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11fff46309904082a806280e3913d11d~tplv-k3u1fbpfcp-watermark.image?)\
这里我们发现，第一次请求，响应头里面有了`etag`,是个`hash`值, 状态码为`200`

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddcd35676c654105b6caf945bfd7ff03~tplv-k3u1fbpfcp-watermark.image?)\
我们第二次请求时，服务器接收到了请求，通过请求头携带的`if-modified-since
`也就是第一次请求的响应头`etag`,对比结果为一致，表明，该资源未发生变化，所以可以继续使用缓存。这时候，小伙伴们可能又问了：`etag`是怎么生成的`hash`值，怎么确保这个`hash`值，没有改变，内容就一定没有发生改变呀？我们先放放，先来看看缓存优先级的问题。
### 缓存优先级的校验
#### 1、Expires 和ETag
`Expires 和ETag`\
```typescript
...
const hash = crypto.createHash('md5')
const etag = hash.update(fs.readFileSync(url)).digest('hex')
if (headers?.['if-none-match'] ) {
  if (headers?.['if-none-match'] == etag) {
    res.statusCode = 304
    resolve({data:''})
  }
}
res.setHeader('Expires', new Date(now + 5 * 60 * 1000).toUTCString())
res.setHeader('etag', etag);
...
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ffa9108ff6a4c4489c0e3c21ce84f2f~tplv-k3u1fbpfcp-watermark.image?)\
上图为请求`img3`图片的结果图，响应头同时设置了`Etag`和`Expires`，第一次请求走到了服务器，第二次就取的缓存了。`Expires`强制缓存优先级 大于`Etag`协商缓存。当然`Expires`和`last-modified`也是一样的结果，我这里就不做演示了。
#### 2、Expires 和 Cache-Control

```typescript
res.setHeader('Expires', new Date(now + 5 * 60 * 1000).toUTCString())
res.setHeader('Cache-Control', 'no-cache')
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7902e43094644cd483619f1686032a65~tplv-k3u1fbpfcp-watermark.image?)\
从代码来看，我同时设置了`Expires`和`Cache-Control`，强制缓存给的 5分钟后过期，`Cache-Control:'no-cache'`给的是每次使用缓存都去服务端校验，请求了两次，后端接收到了两次请求，说明，`Cache-Control`优先级是比`Expires`高的。
#### 3、max-age 和 etag

```typescript
const hash = crypto.createHash('md5')
const etag = hash.update(fs.readFileSync(url)).digest('hex')
if (headers?.['if-none-match'] ) {
  if (headers?.['if-none-match'] == etag) {
    res.statusCode = 304
    resolve({data:''})
  }
}
res.setHeader('Cache-Control', 'max-age=120');
res.setHeader('etag', etag);
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a4c1a92b48417cbde50660c5d7d83c~tplv-k3u1fbpfcp-watermark.image?)\
同时设的`max-age=120`，也就是强制缓存2分钟，然后又设置了`Etag`，每次请求的状态码都为`200`。并且服务器只在第一次接收到了请求，后续的多次都是从缓存中取的，这里验证了：强制缓存优先级高于协商缓存。
## 源码地址 {#源码地址}
[xiaoyi1255/cache](https://github.com/xiaoyi1255/cache)
## 结论 {#结论}
1. 强制缓存 > 协商缓存
2. Cache-Control > Expires
## 思考 {#思考}
1. 缓存是存在浏览器端的，那具体是存在什么位置的呢？
2. 缓存在`memory cache`和`disk cache`有什么区别，什么场景使用那种？
3. serviceWorker 又是什么？

