"use strict";var precacheConfig=[["./index.html","5046bb68e2cadbe9a890b3d1cc820230"],["./static/css/main.fa180f5c.css","5b6d24003c7cba456beef64b0571d20f"],["./static/js/main.02567ac7.js","98d4413519a8d27c58b34a4e3969d951"],["./static/media/0e12b13c359d4803021dc4e17cecc311.0e12b13c.woff2","0e12b13c359d4803021dc4e17cecc311"],["./static/media/5476b40d543260503fbccbbab305b1f9.5476b40d.woff2","5476b40d543260503fbccbbab305b1f9"],["./static/media/61f6c62eb1065d00c9a2bcf85e090fe4.61f6c62e.woff2","61f6c62eb1065d00c9a2bcf85e090fe4"],["./static/media/SalmonRun_Title.a185b309.png","a185b309f5cdad94942849070de04ce2"],["./static/media/Wst_Charger_CoopSpark.850562d2.png","850562d25de562d1c4a2f71476475c54"],["./static/media/Wst_Slosher_CoopVase.d8262224.png","d8262224f5287f33a57848781b2ea2ca"],["./static/media/b426a8e06ebdfcb82b481ab57922d6b4.b426a8e0.woff","b426a8e06ebdfcb82b481ab57922d6b4"],["./static/media/b4fab2f6ac35a758f6aeb5b7054ab121.b4fab2f6.woff","b4fab2f6ac35a758f6aeb5b7054ab121"],["./static/media/background.8c15ceb6.png","8c15ceb605300fbc22963fabcb09fb22"],["./static/media/eb82d017016045bf998cade4dac1ec22.eb82d017.woff2","eb82d017016045bf998cade4dac1ec22"],["./static/media/f25982b8ab52a929938cd63f15656ecf.f25982b8.woff","f25982b8ab52a929938cd63f15656ecf"],["./static/media/f85b6b75e658c1758ee0b3f2262c9522.f85b6b75.woff","f85b6b75e658c1758ee0b3f2262c9522"],["./static/media/gold.002f67fd.png","002f67fd9b3b9792b89bb663ee2c3fe9"],["./static/media/gold.efbc0960.jpg","efbc0960ae8d0f21bdf36a6752e755ca"],["./static/media/splat1.5d40ca56.svg","5d40ca5647632b0253a4cdeee682bfc2"],["./static/media/splat2.ed3ce989.svg","ed3ce989cf7dfbed48333d0e3247288f"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,c),e=urlsToCacheKeys.has(a));var n="./index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});