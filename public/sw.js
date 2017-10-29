// NOTE: When SW is installed (brand new or updated version)
self.addEventListener('install', function(event) {
  console.log("SW Installed");

  // NOTE: Make sure that caching will finish
  event.waitUntil(
    caches.open('static')
    .then(function(cache) {
      // NOTE: Add an asset to cache
      // cache.add('/');
      // cache.add('/index.html');
      // cache.add('/src/js/app.js');
      cache.addAll([
        '/',
        '/index.html',
        '/src/js/app.js',
        '/src/css/app.css',
        '/src/images/pwa.jpg',
        'https://fonts.googleapis.com/css?family=Raleway:400,700'
      ]);
    })
  );
});

// NOTE: When other pages are closed
self.addEventListener('activate', function() {
  console.log("SW Activated");
});

// NOTE: Find cached data
self.addEventListener('fetch', function(event) {
  // execute even if doesn't find anything
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});
