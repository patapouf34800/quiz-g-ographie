// Service Worker pour Géo Quiz - Mode hors ligne
const CACHE_NAME = 'geo-quiz-v1.0.5';

// Liste des fichiers essentiels (chargés lors de l'installation)
const ESSENTIAL_FILES = [
    './',
    './index.html',
    './manifest.json',
    './countries_fr_complet.json',
    './icon-192.png',
    './icon-512.png',
    './map-manager.js'
];

// Liste des SVG des cartes (zones géographiques)
const MAP_SVGS = [
    './worldLow.svg',
    './region_world_europeLow.svg',
    './region_world_asiaLow.svg',
    './region_world_africaLow.svg',
    './region_world_northAmericaLow.svg',
    './region_world_southAmericaLow.svg',
    './region_world_oceaniaLow.svg',
    './continentsLow.svg',
    './region_world_latinAmericaLow.svg'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installation...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async (cache) => {
                console.log('[Service Worker] Mise en cache des fichiers essentiels');
                
                // Mettre en cache les fichiers essentiels
                await cache.addAll(ESSENTIAL_FILES);
                console.log('[Service Worker] ✅ Fichiers essentiels en cache');
                
                // Mettre en cache les SVG des cartes
                console.log('[Service Worker] Mise en cache des cartes SVG...');
                for (const svgUrl of MAP_SVGS) {
                    try {
                        await cache.add(svgUrl);
                        console.log(`[Service Worker] ✅ ${svgUrl}`);
                    } catch (err) {
                        console.error(`[Service Worker] ❌ Erreur ${svgUrl}:`, err);
                    }
                }
                console.log('[Service Worker] ✅ Cartes SVG terminées');
                
                // Charger le JSON pour connaître tous les pays
                try {
                    const response = await fetch('./countries_fr_complet.json');
                    const countries = await response.json();
                    console.log(`[Service Worker] ${countries.length} pays trouvés`);
                    
                    // Mettre en cache tous les drapeaux
                    const flagUrls = countries.map(c => `./flags/${c.iso2.toLowerCase()}.png`);
                    console.log('[Service Worker] Mise en cache des drapeaux...');
                    
                    // Mettre en cache par lots de 20 pour éviter les erreurs
                    for (let i = 0; i < flagUrls.length; i += 20) {
                        const batch = flagUrls.slice(i, i + 20);
                        await Promise.all(
                            batch.map(url => 
                                cache.add(url).catch(err => {
                                    console.warn(`[Service Worker] ⚠️ Impossible de cacher ${url}:`, err);
                                    return null;
                                })
                            )
                        );
                        console.log(`[Service Worker] Drapeaux ${i + 1}-${Math.min(i + 20, flagUrls.length)} en cache`);
                    }
                    
                    console.log('[Service Worker] 🎉 Tous les fichiers sont en cache !');
                    console.log('[Service Worker] ✈️ L\'application fonctionne maintenant hors ligne');
                } catch (error) {
                    console.error('[Service Worker] ❌ Erreur lors de la mise en cache complète:', error);
                }
            })
            .catch((error) => {
                console.error('[Service Worker] ❌ Erreur lors de l\'installation:', error);
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
                    // Supprimer UNIQUEMENT les anciens caches Géo (qui commencent par "geo-quiz-")
                    if (cacheName.startsWith('geo-quiz-') && cacheName !== CACHE_NAME) {
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

// Interception des requêtes - Stratégie Cache First (hors ligne d'abord)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si en cache, retourner immédiatement
                if (cachedResponse) {
                    // En parallèle, mettre à jour le cache en arrière-plan
                    fetch(event.request)
                        .then((networkResponse) => {
                            if (networkResponse && networkResponse.status === 200) {
                                caches.open(CACHE_NAME).then((cache) => {
                                    cache.put(event.request, networkResponse);
                                });
                            }
                        })
                        .catch(() => {
                            // Pas grave si le réseau échoue, on a déjà le cache
                        });
                    
                    return cachedResponse;
                }
                
                // Si pas en cache, tenter le réseau
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Mettre en cache pour la prochaine fois
                        if (networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Ni cache ni réseau disponible
                        // Retourner une page d'erreur pour les pages HTML
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
                                    </style>
                                </head>
                                <body>
                                    <div class="offline-message">
                                        <div class="offline-icon">📡</div>
                                        <h1>Ressource non disponible</h1>
                                        <p>
                                            Cette ressource n'a pas pu être chargée et n'est pas disponible hors ligne.
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
                        
                        // Pour les autres ressources, retourner une erreur
                        return new Response('Ressource non disponible hors ligne', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
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
