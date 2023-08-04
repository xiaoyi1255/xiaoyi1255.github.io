---
title: 网络
titleTemplate: Service WorkerSW
---
在 Web 应用中，为了提高应用的性能和用户体验，我们通常会使用缓存技术。其中，浏览器的缓存机制提供了浏览器级别的缓存，而 Service Worker 则提供了一种更高级别、更自由度的缓存机制。使用 Service Worker 进行缓存可以实现离线访问、更快的页面加载速度和更好的用户体验等。

## 前言 {#前言}

Service Worker 是一种在浏览器后台运行的独立线程，它可以在后台运行。它能够拦截网络请求并控制页面的缓存。因此，Service Worker 可以为网站提供离线缓存、消息推送、后台同步等功能。使用 Service Worker 进行缓存可以大大提高 Web 应用的可靠性和性能。

Service Worker 的使用必须在安全的环境下进行，因此必须使用 HTTPS 协议来部署 Service Worker。此外，Service Worker 一旦被安装，就会一直存在于用户的设备中，因此需要注意清理 Service Worker。

## 缓存策略 {#缓存策略}

在使用 Service Worker 进行缓存时，我们需要考虑如何定义缓存策略。通常有两种缓存策略：Cache First 和 Network First。

#### 2.1 优先请求缓存：

当用户请求一个资源时，Service Worker 首先会查找缓存。如果找到了该资源的缓存，则直接返回缓存中的数据。否则，Service Worker 再向网络请求该资源，并将请求的结果存储到缓存中。

#### 2.2 优先请求服务器：

当用户请求一个资源时，Service Worker 首先会向网络请求该资源。如果请求成功，则将请求的结果存储到缓存中。如果请求失败，则查找缓存。如果找到了缓存，则直接返回缓存中的数据。否则，返回失败信息。

#### 2.3 过期控制

1.  通过响应头的 **date**, 命中缓存的时候取来与现在对比 过期则重发请求
1.  通过 服务端控制：强缓存和协商缓存

根据应用的需求，我们可以选择合适的缓存策略。

## 实战 {#实战}

#### 3.1 注册

前面介绍了 Service Worker 是运行在浏览器的一个独立线程，我需要使用他就必须在运行主线程代码的入口文件中去注册

```typescript
    const registerServiceWorker = async () => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "./",
          });
          if (registration.installing) {
            console.log("正在安装 Service worker", registration);
          } else if (registration.waiting) {
            console.log("已安装 Service worker installed", registration);
          } else if (registration.active) {
            console.log("激活 Service worker", registration);
          }
        } catch (error) {
          console.error(`注册失败：${error}`);
        }
      }
    };
    registerServiceWorker()
```

#### 3.2 编写 service worker 文件

它的用法很多，尤其是断网状态下  
下面我将用 缓存 css、js文件为例 来进行实现

```typescript
// 缓存名称 在devtools 可以区分
const CACHE_NAME = 'CACHE-v1';
// 缓存时效时间
const expirationTime = 1000 * 60 * 60 * 24 * 7;
// 缓存请求url
const urlsToCache = ['/README.md', '/test.js'];

// 注册 install 事件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 注册 activate 事件
self.addEventListener('activate', event => {
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

// 注册 fetch 事件
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  if (urlsToCache.includes(requestUrl.pathname + requestUrl.search)) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              const cacheAge = Date.now() - parseInt(cachedResponse.headers.get('date'));
              if (cacheAge > expirationTime) {
                return fetchAndCache(event.request, cache);
              } else {
                return cachedResponse;
              }
            } else {
              return fetchAndCache(event.request, cache);
            }
          });
        })
    );
  }
});

function fetchAndCache(request, cache) {
  return fetch(request).then(response => {
    const headers = new Headers(response.headers);
    headers.append('date', Date.now());
    const responseWithMetadata = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    cache.put(request, responseWithMetadata.clone());
    return responseWithMetadata;
  });
}
```

## 区别 {#区别}



强缓存和协商缓存是浏览器缓存机制的一部分，它们都是在 HTTP 响应头中设置缓存相关的字段来控制缓存行为。与此不同，Service Worker 是一种完全不同的缓存机制，它可以在 Web 应用中提供更加精细和可控的缓存控制。

强缓存和协商缓存主要通过响应头中的 Expires、Cache-Control、ETag、Last-Modified 等字段来控制，可以指定缓存的存储时间、缓存更新的策略等。这种缓存机制是由浏览器自动完成的，对于 Web 开发者来说，只需要设置相应的 HTTP 响应头就可以了，具体的缓存行为由浏览器控制。

Service Worker 缓存则是由开发者手动控制的，它可以将请求缓存到自己的存储空间中，然后在需要时从缓存中取出数据。开发者可以控制缓存的粒度、缓存的存储时间、缓存的更新策略等，这些都可以通过 Service Worker 的 API 来实现。由于可以手动控制缓存，因此 Service Worker 缓存在一些场景下可以提供更加细致的缓存控制，从而提高应用性能和用户体验。
