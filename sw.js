const CACHE_NAME =
    "okshealthcare-v1";


const OFFLINE_FILES = [

    "./",

    "./index.html",

    "./specialist.html",

    "./offline.html",

    "./css/style.css",

    "./app.js",

    "./manifest.webmanifest",

    "./images/icon-192.png",

    "./images/icon-512.png"

];



// =========================================
// INSTALL
// =========================================

self.addEventListener(
    "install",
    function (event) {

        event.waitUntil(

            caches
                .open(CACHE_NAME)

                .then(
                    function (cache) {

                        return cache.addAll(
                            OFFLINE_FILES
                        );

                    }
                )

        );


        self.skipWaiting();

    }
);



// =========================================
// ACTIVATE
// =========================================

self.addEventListener(
    "activate",
    function (event) {

        event.waitUntil(

            caches
                .keys()

                .then(
                    function (cacheNames) {

                        return Promise.all(

                            cacheNames.map(
                                function (cacheName) {

                                    if (
                                        cacheName !==
                                        CACHE_NAME
                                    ) {

                                        return caches.delete(
                                            cacheName
                                        );

                                    }

                                }
                            )

                        );

                    }
                )

        );


        self.clients.claim();

    }
);



// =========================================
// FETCH
// =========================================

self.addEventListener(
    "fetch",
    function (event) {


        if (
            event.request.method !== "GET"
        ) {

            return;

        }


        event.respondWith(

            caches.match(
                event.request
            )

            .then(
                function (
                    cachedResponse
                ) {


                    if (cachedResponse) {

                        return cachedResponse;

                    }


                    return fetch(
                        event.request
                    )

                    .then(
                        function (
                            networkResponse
                        ) {


                            const responseClone =
                                networkResponse.clone();


                            caches
                                .open(CACHE_NAME)

                                .then(
                                    function (cache) {

                                        cache.put(
                                            event.request,
                                            responseClone
                                        );

                                    }
                                );


                            return networkResponse;

                        }
                    )

                    .catch(
                        function () {


                            if (
                                event.request.mode ===
                                "navigate"
                            ) {

                                return caches.match(
                                    "./offline.html"
                                );

                            }

                        }
                    );

                }
            )

        );

    }
);