// Service Worker pour Géo Quiz - Mode hors ligne
const CACHE_NAME = 'geo-quiz-v1.0.0';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './countries_fr_complet.json',
    './icon-192.png',
    './icon-512.png'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installation...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Mise en cache des fichiers principaux');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('[Service Worker] Erreur lors de la mise en cache:', error);
            })
    );
    // Force l'activation immédiate
    self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activation...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Supprimer les anciens caches
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Prendre le contrôle immédiatement
    return self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Stratégie pour les drapeaux et badges : CacheFirst (ils ne changent jamais)
    if (url.pathname.includes('/flags/') || url.pathname.includes('/badges/')) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                }
                // Si pas en cache, télécharger et mettre en cache
                return fetch(event.request).then((fetchResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
        return;
    }
    
    // Stratégie Network First pour les autres fichiers
    // (tente d'abord le réseau, sinon utilise le cache)
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Si la requête réussit, mettre à jour le cache
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(() => {
                // En cas d'échec réseau, utiliser le cache
                return caches.match(event.request).then((response) => {
                    if (response) {
                        console.log('[Service Worker] Récupération depuis le cache:', event.request.url);
                        return response;
                    }
                    // Si pas de cache non plus, retourner une page d'erreur pour les pages HTML
                    if (event.request.headers.get('accept').includes('text/html')) {
                        return new Response(
                            `<!DOCTYPE html>
                            <html lang="fr">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Hors ligne - Géo Quiz</title>
                                <style>
                                    body {
                                        font-family: 'Segoe UI', Arial, sans-serif;
                                        background: linear-gradient(135deg, #00838F, #00ACC1);
                                        min-height: 100vh;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        margin: 0;
                                        padding: 20px;
                                    }
                                    .offline-message {
                                        background: white;
                                        padding: 40px;
                                        border-radius: 20px;
                                        text-align: center;
                                        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                                        max-width: 500px;
                                    }
                                    .offline-icon {
                                        font-size: 4em;
                                        margin-bottom: 20px;
                                    }
                                    h1 {
                                        color: #00838F;
                                        margin-bottom: 15px;
                                    }
                                    p {
                                        color: #666;
                                        line-height: 1.6;
                                    }
                                    .retry-btn {
                                        background: linear-gradient(135deg, #00ACC1, #00838F);
                                        color: white;
                                        border: none;
                                        padding: 15px 30px;
                                        border-radius: 10px;
                                        font-size: 1em;
                                        font-weight: bold;
                                        cursor: pointer;
                                        margin-top: 20px;
                                    }
                                    .retry-btn:hover {
                                        transform: translateY(-2px);
                                        box-shadow: 0 5px 15px rgba(0,172,193,0.4);
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="offline-message">
                                    <div class="offline-icon">📡</div>
                                    <h1>Mode Hors Ligne</h1>
                                    <p>
                                        Tu n'es pas connecté à Internet et cette page n'est pas disponible hors ligne.
                                    </p>
                                    <p>
                                        Vérifie ta connexion et réessaie.
                                    </p>
                                    <button class="retry-btn" onclick="window.location.reload()">
                                        🔄 Réessayer
                                    </button>
                                </div>
                            </body>
                            </html>`,
                            {
                                headers: { 'Content-Type': 'text/html' }
                            }
                        );
                    }
                });
            })
    );
});

// Écouter les messages du client (pour forcer la mise à jour si besoin)
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
