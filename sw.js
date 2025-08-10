self.addEventListener('install', e=>{
  e.waitUntil(caches.open('study-tracker-v1').then(c=>c.addAll([
    './','./index.html','./sw.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'
  ])));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!=='study-tracker-v1').map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
