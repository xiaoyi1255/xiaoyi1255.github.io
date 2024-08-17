---
theme: channing-cyan
---
# 前端性能优化之web woker
系列文章：

[前端项目优化之 取消请求](https://juejin.cn/post/7403606630695714855)

## 什么是web worker
因为js是单线程，往往不能满足需求，所以提供了web worker.

Web Worker 使得在一个独立于 Web 应用程序主执行线程的后台线程中运行脚本操作成为可能。

这样做的好处是可以在独立线程中执行费时的处理任务，使主线程（通常是 UI 线程）的运行不会被阻塞/放慢。

本文主要介绍：Worker、SharedWorker、serviceWorker的基本使用、注意事项及总结


## 一、Woker
- 用于处理单一页面**耗时操作**
- 与创建它的页面脚步对应，不能被其它页面共享
- 通常用于**复杂计算**、**数据处理**、异步
- 在主动终止、页面关闭之前 一致运行
- 不能访问window、document、parent等全局对象
- 可以使用XMLHttpRequest、fetch、setTimeout、setInterval
- 可以使用importScripts加载外部脚本

### 1. Worker的使用
主线程
```js
// 创建worker
const worker = new Worker('worker.js');

// 向worker发送消息
worker.postMessage('hello');

// 监听worker发送的消息
worker.onmessage = function(event) {
  console.log(event.data);
}

// 监听worker的错误
worker.onerror = function(event) {
  console.log(event.message);
}

worker.onmessageerror = function(event) {
  console.log(event.message);
}

// 终止worker
console.log('worker terminated');
worker.terminate();

```
worker.js
```js
// 监听主线程发送的消息
self.onmessage = function(event) {
  // 向主线程发送消息
  self.postMessage('hello');
  setTimeout(() => {
    self.postMessage('world');
    // 终止worker
    self.close();
  }, 1000)
}
```
### 2. 终止worker
- 主线程调用worker.terminate()
- worker调用self.close()
- worker线程终止、页面关闭之前 一直运行(所有如果不是太复杂的任务，不建议使用worker)


## 二、SharedWorker
- 可以被多个页面共享 （同源）
- 可以使用XMLHttpRequest、fetch进行异步请求
- 可以使用setTimeout、setInterval进行定时操作
- 可以使用importScripts加载外部脚本


### 1. 语法和参数说明
mdn参考：[SharedWorker](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker/SharedWorker)
语法
```js
var myWorker = new SharedWorker(aURL, name);
var myWorker = new SharedWorker(aURL, options);
```
参数
- aURL：worker脚本的URL
- name：worker的名称，可选 （**注册多个页面时注意name一致，不然会有问题**）
- options：worker的选项，可选，包括name、type、credentials、data

### 2. 具体使用
主线程
```js
// 创建SharedWorker
const worker = new SharedWorker('worker.js',{name: 'woker1'});

// 向SharedWorker发送消息
worker.port.postMessage('hello');

// 监听SharedWorker发送的消息
worker.port.onmessage = function(event) {
  console.log(event.data);
}

// 监听SharedWorker的错误
worker.port.onerror = function(event) {
  console.log(event.message);
}

// 终止SharedWorker
console.log('SharedWorker terminated');
worker.port.close();

```
worker.js
```js
// 保存 多个页面的连接
const connections = [];

self.addEventListener('connect', function(event) {
  const port = event.ports[0];
  connections.push(port);

  port.start();
  port.addEventListener('message', function(e) {
      const message = e.data;
      // 广播到多个页面
      connections.forEach(function(conn) {
          console.log('Sending message to connection:', conn);
          conn.postMessage('Received: ' + message);
      });
  });
});

```
vue中的使用

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3a0d5cc13da649b9a7a2b14d012076a6~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1723958116&x-orig-sign=btUXM8wdxue8UmINiDF%2BsFU%2BelM%3D)
下面vue中是运行效果
![shareworker.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f619f2ffbfc341e18f92fae9f3b578cb~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1723958011&x-orig-sign=nAoF1H163FlBwAXVQMk4U%2F9mEKA%3D)
### 3.注意事项
- SharedWorker脚本的打印在 chrome://inspect/#workers
- 多个页面注册共用一个name，才能正确响应
- 页面同源
![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5fb5ef1a412a422aa289d52126acf1de~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1723958384&x-orig-sign=mfAICIgjqMSx%2FXMA%2BJ6IAs%2BVTFU%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1eea9c3ff6c840ecaeb74dd47ac47300~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1723958625&x-orig-sign=kJPcxwiIs9VERLjF8tHArQmgKdQ%3D)


## 三、service Worker
### 1. 介绍
本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器
- 作用：缓存资源，离线使用
- 生命周期：install -> waiting -> activate -> fetch -> 是否命中缓存（返回）
- 使用场景：缓存静态资源，离线使用，请求拦截，应用无网络体验优化

- 缓存逻辑：
    1. 监听页面请求（xhr、fetch都可以）
    2. 判断请求是否是缓存列表中的路径，是再进行处理
    3. 匹配缓存，查看缓存是否过期，未过期直接返回缓存
    4. 过期，重新发起请求，并把响应结果推到缓存，并返回

### 2. service Worker 的使用
主线程
```js
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js", {
        scope: "./",
      });
      if (registration.installing) {
        console.log("正在安装 Service worker", registration);
      } else if (registration.waiting) {
        console.log("已安装 Service worker installed", registration);
      } else if (registration.active) {
        console.log("激活 Service worker", registration);
      }
      registration.addEventListener("updatefound", () => {
        console.log("更新 Service worker", registration);
      });
      setInterval(() => {
        fetch("http://localhost:3001/api/user/getJSON").then((res) => {
          console.log("fetch success: ", res.data);
        })
      }, 10000);
  } catch (error) {
    console.error(`注册失败：${error}`);
  }
}
};
registerServiceWorker()
```

service worker
```js
// sw.js
const CACHE_NAME = 'cache-v1.0';
const expirationTime = 1000 * 60 * 60 * 24 * 7; // 缓存过期时间为一周
// 安装 Service Worker
const cssList = [
    
]
const jsList = [
    '/docs/guide/js/worker/js/test.js',
    '/api/user/getJSON'
]
const urlsToCache = [...jsList, ...cssList]

// 监听 install 事件
self.addEventListener('install', event => {
  try {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          // 如果 urlsToCache 存在不可访问路径会报错
          return cache.addAll(urlsToCache);
        })
        .then(() => self.skipWaiting()).catch(err => {
          console.log('Service Worker install error', err);
        })
    );
  } catch (error) {
  }
});

// 监听 activate 事件
self.addEventListener('activate', event => {
  console.log('Service Worker activate');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 监听 fetch 事件
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  if (urlsToCache.includes(requestUrl.pathname )) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.match(event.request)
            .then(response => {
              if (response) {
                const metadata = response.headers.get('x-metadata');
                const cacheTime = metadata ? parseInt(metadata) : 0;
                if (!cacheTime || cacheTime && (Date.now() - cacheTime) > (expirationTime)) { // 如果缓存过期则重新请求
                  console.log('缓存过期', response);
                  return fetch(event.request)
                    .then(fetchResponse => {
                      const headers = new Headers(fetchResponse.headers);
                      headers.append('x-metadata', Date.now());
                      const responseWithMetadata = new Response(fetchResponse.body, { status: fetchResponse.status, statusText: fetchResponse.statusText, headers });
                      cache.put(event.request, responseWithMetadata.clone());
                      return responseWithMetadata;
                    });
                } else { // 否则直接返回缓存
                  return response;
                }
              } else { // 如果缓存中不存在，则先请求资源并缓存
                return fetch(event.request)
                  .then(fetchResponse => {
                    const headers = new Headers(fetchResponse.headers);
                    headers.append('x-metadata', Date.now());
                    const responseWithMetadata = new Response(fetchResponse.body, { status: fetchResponse.status, statusText: fetchResponse.statusText, headers });
                    cache.put(event.request, responseWithMetadata.clone());
                    return responseWithMetadata;
                  });
              }
            });
        })
    );
  }
});
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/52056f2a02a24f71ab235e3683663bce~tplv-73owjymdk6-jj-mark:0:0:0:0:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjAzMjM0NDc0NDg1NzEyNyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1723980532&x-orig-sign=OSkA1Khxzk4M%2Fjr%2B%2BWai9ZMH2Bg%3D)

### 3.实战参考
项目实战可以参考：[浏览器缓存之Service Worker](https://juejin.cn/post/7203911920638165052)


## 总结
**worker**: 一般用于复杂、大量的数据计算，不会阻塞主线程，可以提升性能

**service worker**: 一般用于缓存资源，提升性能，离线访问，无网络情况的基本内容展示

**shared worker**: 一般用于多页面的通信，可以共享数据，提升性能
此外多页面通信的方式还有：service worker、localStorage、cookie、BroadcastChannel、open、postMessage等

## 结语：
如果本文对你有收获，麻烦动动发财的小手，点点关注、点点赞！！！👻👻👻

因为收藏===会了

如果有不对、更好的方式实现、可以优化的地方欢迎在评论区指出，谢谢👾👾👾