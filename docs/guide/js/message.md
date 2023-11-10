---
title: SSE
titleTemplate: 站内信
date: 2023-11-08T00:00:00.000Z
theme: channing-cyan
---

## 前言
> 昨天在掘金页面上无操作，发现右上角**可以自己收到更新消息**（点赞、收藏）类的。于是乎就在想它是怎么在**用户无任何操作**，实现的消息推送。于是就有这篇文章。
> 
> 本文主要介绍了：**SSE**的前后端实现、注意点、踩坑实录。大佬可直接跳到**实战部分**。
>
> 主要实现了：服务器推送消息给客户端(站内信)，**精准推送**给某一个用户、**系统推送**给所有用户。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e19854c7ef104d2597c8ce5cd12ee962~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=669&h=190&s=12456&e=png&b=ffffff)

- [线上体验地址😍😍](http://xiaoyi.pub/message?uid=1)

![站内信5.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbc2c0164eee4114baf297f19e14fb18~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1626&h=939&s=1544477&e=gif&f=291&b=fdfdfd)


## 前置知识😈

* 服务端推送的几种实现方式
    - SSE 服务器单方面推送（本文）
    - webSocket 双向通信
    - 轮询 前端不断向服务器发送请求是否有新消息

### 什么是SSE？

Server-Sent Events（SSE）是一种用于实现服务器向客户端推送数据的Web技术。

特点：
* 相比websocket，SSE 更轻量，更简单易用
* 单向通信：只能服务器向客户端推送
* 数据格式：只能发送文本数据，websocket 还支持二进制
* 有重连机制（在监听到error之后，浏览器会自动重连）
* 相比传统轮询 更节省服务器资源

### EventSource
[官网](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource): 
> **EventSource** 接口是 web 内容与服务器发送事件通信的接口。
>
> 一个 EventSource 实例会对 HTTP 服务器开启一个持久化的连接，以 text/event-stream 格式发送事件，此连接会一直保持开启直到通过调用 EventSource.close() 关闭。
>
```js
new EventSource(url, {withCredentials: true});
```
参数：    
* url : 服务器地址
* withCredentials: 它允许发送跨源凭证 可选 默认false      

属性：只读
* readyState : 0 表示连接中； 1 表示已连接 2 表示连接已关闭
* withCredentials : 表示是否发送跨域凭证，默认false
* url : 表示当前连接的URL    

默认事件：    

* open() : 打开连接
* message : 监听服务器推送的消息
* error : 监听服务器推送的错误    

方法：   
* close() : 关闭连接
* addEventListener 监听message、error、open、close事件、自定义事件

```ts
const ES = new EventSource('/push');

// 监听自定义事件
ES.addEventListener('notify', notifyHandle, false);
const notifyHandle = (e: MessageEvent) => {
  console.log('自定义事件notify：', e.data);
}
```
推送自定义事件notify的消息

```js
res.write(`event: notify\n`);
res.write(`data: 站内信链接成功！\n\n`);
```


### 事件流

* 设置响应头
```js
res.setHeader("Content-Type", "text/event-stream"); // 必须
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');
```
推送消息： 
* \n 换行， \n\n为一条消息的结束标识
* id 消息的id
* data 消息的内容字 对象可以先
* event 事件名称， 默认是message, 可以自定义
* retry 浏览器发起重试时间，单位是毫秒

```js
res.write(`retry: 15000\n`);
res.write(`event: notify\n`);
res.write(`id: ${+new Date()}\n`);
res.write(`data: 新消息：${+new Date()}\n\n`);
```
ok 了解了这些，就可以实现消息推送了。上菜上菜！！！

## 整体流程😈

* 前端发起一个http请求（EventSource对象建立SSE连接）
* 前端监听message事件（服务器推送消息的处理逻辑）
* 服务器设置响应头
* 服务器发现有新消息（redis更新、数据库更新...）就推送给客户端
* 客户端收到消息后，会触发message事件，然后执行回调函数

## 前端部分
```ts

const ES: EventSource = new EventSource('/push');

// 监听收到推送处理逻辑
ES.onmessage = (e: MessageEvent) => {
  console.log(e.data);
}
// 监听建立连接
ES.onopen = () => {
  console.log('建立连接');
}
ES.onerror = (e: MessageEvent) => {
  console.log(e);
}

```
## 服务器部分

```js
const express = require('express');
const router = express.Router();

router.get('/push', (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 推送消息
  res.write(`data: 站内信链接成功！\n\n`);

  req.on('close', () => {
  });
});

module.exports = router;
```

这样一个极简的SSE连接就完成了。
为了看到效果，可以在设置定时器，一定时间自动发送消息。
```js
const express = require('express');
const router = express.Router();

router.get('/push', (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 推送消息
  res.write(`retry: 3000\n`);
  res.write(`id: ${+new Date()}\n`);
  res.write(`data: 站内信链接成功！\n\n`);

  // 测试代码
  setInterval(() => {
    const timeStamp = +new Date()
    res.write(`id: ${timeStamp}\n`);
    res.write(`data: 新消息：${timeStamp}\n\n`);
  }, 5000)

  req.on('close', () => {
  });
});

module.exports = router;

```

效果图如下：
![站内信1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d81ccdfc95a043c38aabe8e8068ba7cf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1820&h=808&s=1399222&e=gif&f=260&b=fefefe)


细心的伙伴肯定会问了：
* 这个推送是给所有用户吧？怎么精准推送？
* 服务端： 数据库、redis更新，你触发这里的消息推送？
* 除了SSE，还有其他方式可以实现？

## 实战😈
### 1. 精准推送 和 系统推送
基础流程：
* 建立连接时 获取用户唯一标识如uid
* 服务端存储用户唯一标识和连接的res响应对象的Map（每个请求是新的请求对象和响应对象）
* 推送给某一个用户时，根据uid获取连接对象，发送消息
* 系统推送（所有人），遍历推送
* 客户端端口连接 => 清理连接对象

```js
// 声明一个map来管理 key: uis；value: res对象
const events = new Map()

router.get('/push', (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 存在进map
  const uid = req.query.uid;
  if (!events.has(uid)) {
    events.set(uid, res);
  }
  // 精准推送给用户
  function handleMsg2User(data ={}, uid, event='message') {
    const timeStamp = new Date().getTime();
    // const uid = req.query.uid;
    const resEvent = events.get(uid);
    if (resEvent) { // 精准推送
      resEvent.write(`id: ${timeStamp}\n`);
      resEvent.write(`event: ${event}\n`);
      resEvent.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  }

  // 推送给所有人
  function handleMsg2All(data ={}, event='message') {
    const timeStamp = new Date().getTime();
    events.forEach((resEvent) => {
      resEvent.write(`id: ${timeStamp}\n`);
      resEvent.write(`event: ${event}\n`);
      resEvent.write(`data: ${JSON.stringify(data)}\n\n`);
    })
  }

  // 推送消息
  res.write(`data: 站内信链接成功！\n\n`);

  setInterval(() => {
    handleMsg2All({msg: '推送给所有人的消息'})
    handleMsg2User({msg: '推送给1的消息'}, '1')
    handleMsg2User({msg: '推送给2的消息'}, '2')
  }, 3000)

  // 客户端断开连接 
  req.on('close', () => {
    console.log('close前', events.size);
    events.delete(uid);
    console.log('close后', events.size);
  });
});
```
看一下效果，OK~ 能做到精准推送和全部推送了

![站内信3.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ac6ac0f9bfb40dea3bb8aae3ea59f79~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1858&h=823&s=1170314&e=gif&f=124&b=fdfdfd)

那接下来看看如何实现其它场景下的推送了。

### 2. 其它场景下推送
使用发布订阅模式来实现

1. 建立SSE链接时，监听推送消息的事件
2. 其它模块触发时，触发这个推送事件
3. 断开连接时，取消监听事件

需要保证：
* 推送给某一用户的消息，每个用户注册一次
* 推送给所有用户的消息。整个系统注册一次

```js
const EventEmitter = require('../utils/EventEmitter')

const events = new Map()
let flag = false
router.get('/push', (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const uid = req.query.uid;
  if (!events.has(uid)) {
    events.set(uid, res);
    // 精准推送给某一用户
    EventEmitter.on('sseMsg2User' + uid, handleMsg2User);
  }
  if (!flag) {
    //推送给所有用户
    EventEmitter.on('sseMsg2UAll', handleMsg2All);
    flag =true
  }

  function handleMsg2User(data ={}, event='message') {
    const uid = data.uid
    const timeStamp = new Date().getTime();
    const resEvent = events.get(uid);
    if (resEvent) { // 精准推送
      resEvent.write(`id: ${timeStamp}\n`);
      resEvent.write(`event: ${event}\n`);
      resEvent.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  }

  function handleMsg2All(data ={}, event='message') {
    const timeStamp = new Date().getTime();
    events.forEach((resEvent) => {
      resEvent.write(`id: ${timeStamp}\n`);
      resEvent.write(`event: ${event}\n`);
      resEvent.write(`data: ${JSON.stringify(data)}\n\n`);
    })
  }

  // 推送消息
  res.write(`data: 站内信链接成功！\n\n`);

  req.on('close', () => {
    events.delete(uid);
    EventEmitter.removeListener('sseMsg2User' + uid, handleMsg2User)
  });
});

```
模拟其它模块触发更新
```js
const EventEmitter = require('../utils/EventEmitter')

router.post('/update', (req, res) => {
  const { uid, msg, isAll = false } =req.body;
  if (isAll) {
    EventEmitter.emit('sseMsg2UAll', {msg: '给所有人的消息>>' + msg, uid}, )
  } else {
    EventEmitter.emit('sseMsg2User' + uid, {msg: '给' + uid + '的消息>>' + msg, uid}, )
  }
  res.send({code: 0})
})
```

## 总结 和 踩坑实录
* 注意点
    - 其它场景触发：精准推送和全部推送 监听事件的注册
    - 发布订阅模式的实现
    - 响应头的设置 text/event-stream
    - EventSource（兼容性问题，平替方案）

* 踩坑实录（前端收到重复消息）
    - 客户端离开页面：需要关闭连接 ES.close()   
    - 服务器检测到客户端断开：移除事件对象、移除监听事件   

## 源码
[xiaoyi1255](https://gitee.com/jingmingt/chat)


## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾

## 参考链接👻👻
[ -- 阮一峰 -- Server-Sent Events 教程 ](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
