// Rand ATM v2 — Service Worker
const CACHE = 'rand-v2-1';
const BASE = self.registration.scope;

const SHELL = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Supabase API — always network
  if (url.hostname.includes('supabase.co')) {
    e.respondWith(fetch(e.request).catch(() =>
      new Response('{"error":"offline"}', { headers: { 'Content-Type': 'application/json' } })
    ));
    return;
  }

  // Telegram API — always network
  if (url.hostname.includes('telegram.org')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // CDN libs and fonts — cache first
  if (url.hostname.includes('fonts.g') || url.hostname.includes('cdn.jsdelivr.net') || url.hostname.includes('gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(r => {
        caches.open(CACHE).then(c => c.put(e.request, r.clone()));
        return r;
      }).catch(() => new Response('', { status: 503 })))
    );
    return;
  }

  // Same-origin — network first with cache fallback
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok) caches.open(CACHE).then(c => c.put(e.request, r.clone()));
      return r;
    }).catch(() =>
      caches.match(e.request).then(c => c ||
        caches.match(BASE + 'index.html').then(h => h || new Response('Offline', { status: 503 }))
      )
    )
  );
});

// Push notifications
self.addEventListener('push', e => {
  if (!e.data) return;
  let p; try { p = e.data.json(); } catch { p = { title: 'Rand ATM', body: e.data.text() }; }
  e.waitUntil(self.registration.showNotification(p.title || 'Rand ATM 🌐', {
    body: p.body || 'إشعار جديد',
    icon: BASE + 'icon-192.png',
    badge: BASE + 'icon-192.png',
    tag: p.tag || 'rand-atm',
    data: p.data || {},
    dir: 'rtl',
    lang: 'ar',
    vibrate: [200, 100, 200],
    requireInteraction: p.requireInteraction || false
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || BASE;
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const ex = list.find(c => c.url.startsWith(BASE));
      if (ex) return ex.focus();
      return clients.openWindow(url);
    })
  );
});
