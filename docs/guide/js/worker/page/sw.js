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

