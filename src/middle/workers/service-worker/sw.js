const STATIC_CACHE = 'static-v1';
const API_CACHE = 'api-cache-v1';

const STATIC_ASSETS = [
  '/index.html',
  '/style.css',
  '/app.js'
];

const initCash = () => {
  return caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS), (error) => console.log(error))
}

const tryNetwork = (req, timeout) => {
  console.log(req);
  
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout)
    fetch(req).then((res) => {
      clearTimeout(timeoutId)
      const responseClone = res.clone()
      caches.open(API_CACHE).then((cache) => {
        cache.put(req, responseClone)
      })
      resolve(res)
    }, reject)
  })
}

const getFromCache = (req) => {
  console.log("getting from cache...");
  return caches.open(API_CACHE).then((cache) => {
    return cache.match(req).then((res) => {
      return res || Promise.reject("no-match")
    })
  })
  
}

// Установка: кэшируем статику
self.addEventListener('install', event => {
  console.log('installed');
  
  event.waitUntil(initCash());
});

// Активация: удаляем старые кэши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE && key !== API_CACHE) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Обработка fetch-запросов
self.addEventListener('fetch', event => {
  console.log("Try network and store result or get data from cache");
  
  const { request } = event;

  const isRemoteApi = request.url.includes('jsonplaceholder.typicode.com');

  if (isRemoteApi) {
    event.respondWith(
      tryNetwork(request, 400).catch(() => getFromCache(request))
    );
    return;
  }

  // Для остального — сначала ищем в кэше
  event.respondWith(
    caches.match(request).then(response => response || fetch(request))
  );
});
