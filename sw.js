// ============================================================
// sw.js — Service Worker para Q-Trainer CBMAP
// Estratégia: Cache-First para assets estáticos (offline 100%)
// ============================================================

const CACHE_NAME = 'q-trainer-cbmap-v1.0.0';

// Lista de todos os arquivos que serão cacheados na instalação
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  // Ícones gerados via Canvas inline — não precisam de cache externo
];

// ── INSTALL: Cachear todos os assets no primeiro acesso ─────
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando e cacheando assets...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
      console.log('[SW] Todos os assets cacheados com sucesso.');
      return self.skipWaiting(); // Ativa o SW imediatamente
    })
  );
});

// ── ACTIVATE: Limpar caches antigos ─────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando novo Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME) // Qualquer cache diferente do atual
          .map((name) => {
            console.log('[SW] Removendo cache antigo:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim()) // Assumir controle imediato de todas as páginas
  );
});

// ── FETCH: Estratégia Cache-First → depois Network ──────────
self.addEventListener('fetch', (event) => {
  // Ignorar requisições non-GET e requests de extensões do navegador
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Retornar do cache (modo offline garante resposta imediata)
        return cachedResponse;
      }

      // Se não estiver no cache, buscar na rede e armazenar
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
          return networkResponse;
        }

        // Clonar a resposta (pois ela é um stream que só pode ser lido uma vez)
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Se offline e não há cache: retornar página de fallback (a própria index)
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ── MESSAGE: Forçar atualização do Service Worker via UI ────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
