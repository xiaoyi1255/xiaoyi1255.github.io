const CACHE_NAME = 'cache-v1.0.2';
const expirationTime = 1000 * 30; // 缓存过期时间为一周
// 安装 Service Worker
const cssList = [
    
]
const jsList = [
    './test.js'
]
const urlsToCache = [...jsList, ...cssList]

self.addEventListener('install', event => {
  console.log('Service Worker install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activate');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log(cacheName, 'cacheName');
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  console.log('Service Worker fetch', event.request.url);
  const requestUrl = new URL(event.request.url);
  if (urlsToCache.includes(requestUrl.pathname + requestUrl.search)) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.match(event.request)
            .then(response => {
              if (response) {
                const metadata = response.headers.get('x-metadata');
                const cacheTime = metadata ? parseInt(metadata) : 0;
                if (cacheTime && (Date.now() - cacheTime) > (expirationTime)) { // 如果缓存过期则重新请求
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

self.addEventListener('message', event => {
  console.log('Service Worker message');
  self.clients.matchAll()
  .then(all => 
    all.map(
      client => client.postMessage(data)
   )
  );
})
