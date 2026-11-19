const CACHE_NAME = 'v4-cache-app';
const IMAGE_CACHE_NAME = 'imagenes-supabase-v1';
 
const OFFLINE_PAGE = '/offline.html';
const START_PAGE = '/';
const AUTH_PAGES = ['/inicio', '/producto', '/contacto'];

async function findCachedPage(request, pathname) {
  return (
    await caches.match(request, { ignoreSearch: true }) ||
    await caches.match(pathname) ||
    await Promise.all(
      AUTH_PAGES.map((page) => caches.match(page))
    ).then((responses) => responses.find(Boolean)) ||
    await caches.match(START_PAGE) ||
    await caches.match(OFFLINE_PAGE)
  );
}
 
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('[SW] Cacheando recursos estáticos');
      await Promise.allSettled(
        [
          START_PAGE,
          OFFLINE_PAGE,
          '/images/inicio-1.jpg',
          '/images/inicio-2.jpg',
          '/images/inicio-3.jpg',
        ].map((path) => cache.add(path))
      );
    })
  );
  self.skipWaiting();
});
 
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== IMAGE_CACHE_NAME) {
            console.log('[SW] Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});
 
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;
 
  const url = new URL(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedPage = await findCachedPage(event.request, url.pathname);
          if (cachedPage) return cachedPage;

          return caches.match(OFFLINE_PAGE) || Response.error();
        })
    );
    return;
  }
 
  if (
    url.hostname.includes('supabase.co') ||
    url.pathname.startsWith('/_next/image')
  ) {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) {
        console.log('[SW] Imagen entregada desde caché:', event.request.url);
          return cachedResponse;
        }
 
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(IMAGE_CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }
 
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(async() => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
        const cachedPage = await caches.match(url.pathname);
        if (cachedPage) return cachedPage;
 
        return caches.match(OFFLINE_PAGE);
      })
  );
});