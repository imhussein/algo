import "regenerator-runtime";

const version = 3;
var isOnline = true;
var isLoggedIn = false;
var cacheName = `orders-${version}`;
var urlsToCache = {
  loggedOut: [
    "index.html",
    "login.html",
    "app.css",
    "http://localhost:3000/data",
  ],
};
self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);
self.addEventListener("fetch", onFetch);

main().catch((err) => {
  console.log(err);
});

async function main() {
  await sendMessage({ requestStatusUpdate: true });
  await cacheLoggedoutFiles();
}

async function sendMessage(message) {
  const allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map(function clientMessage(client) {
      var channel = new MessageChannel();
      channel.port1.onmessage = onMessage;
      return client.postMessage(message, channel.port2);
    })
  );
}

function onMessage(e) {
  if (e.data.statusUpdate) {
    ({ isOnline, isLoggedIn } = e.data.statusUpdate);
    console.log(
      `Service Worker $(${version}) status update isOnline: ${isOnline}, isLoggedin ${isLoggedIn}`
    );
  }
}

function onFetch(event) {
  event.respondWith(router(event.request));
}

async function router(request) {
  var url = new URL(request.url);
  var reqURL = url.pathname;
  var cache = await caches.open(cacheName);
  if (url.origin == location.origin) {
    let res;
    try {
      let fetchOptions = {
        method: request.method,
        headers: request.headers,
        credentials: "omit",
        cache: "no-store",
      };
      res = await fetch(request.url, fetchOptions);
      if (res && res.ok) {
        await cache.put(reqURL, res.clone());
        return res;
      }
      res = await cache.match(reqURL);
      if (res) {
        return res.clone();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function onInstall(e) {
  console.log(`Service Worker ($${version}) Installing`);
  self.skipWaiting();
}

function onActivate(e) {
  e.waitUntil(handleActivation());
}

async function handleActivation() {
  await clearCaches();
  await cacheLoggedoutFiles(true);
  await clients.claim();

  console.log(`Service Worker ($${version}) Activated`);
}

async function cacheLoggedoutFiles(forceReload = false) {
  var cache = await caches.open(cacheName);

  return Promise.all(
    urlsToCache.loggedOut.map(async function requestFile(url) {
      try {
        let res;
        if (!forceReload) {
          res = await cache.match(url);
          if (res) {
            return res;
          }
        }
        let fetchOptions = {
          method: "GET",
          credentials: "omit",
          cache: "no-cache",
        };
        res = await fetch(url, fetchOptions);
        if (res.ok) {
          await cache.put(url, res);
        }
      } catch (error) {}
    })
  );
}

async function clearCaches() {
  var cacheNames = await caches.keys();
  var oldCacheNames = cacheNames.filter(function matchOldCaches(cacheName) {
    if (/^orders-\d+$/.test(cacheName)) {
      let [, cacheVersion] = cacheName.match(/^orders-(\d+)$/);
      cacheVersion = cacheVersion != null ? Number(cacheVersion) : cacheVersion;
      return cacheVersion > 0 && cacheVersion != version;
    }
  });
  return Promise.all(
    oldCacheNames.map(function deleteCacheName(cacheName) {
      return caches.delete(cacheName);
    })
  );
}
