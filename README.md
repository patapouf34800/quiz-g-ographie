# 🌍 Géo Quiz

**Jeu éducatif pour apprendre la géographie mondiale**

Découvre et mémorise les 195 pays du monde avec des cartes interactives !

## 🎮 Jouer maintenant

👉 **[Lancer le jeu](https://VOTRE-USERNAME.github.io/geo-quiz/)** 👈

## ✨ Fonctionnalités

- 🗺️ **7 zones géographiques** : Monde, Europe, Asie, Afrique, Amérique du Nord, Amérique du Sud, Océanie
- 🎯 **Mode "Nomme les pays"** : Tape les noms des pays pour les découvrir
- 🗺️ **Cartes SVG interactives** : Les pays trouvés se colorent progressivement
- 💾 **Sauvegarde automatique** : Ta progression est conservée
- 📚 **Collection personnelle** : Tous les pays découverts restent dans ta collection
- 🏆 **Système de badges** : Débloque des récompenses en progressant
- 📱 **PWA** : Installe l'application sur ton téléphone !

## 🚀 Installation locale

```bash
# Cloner le dépôt
git clone https://github.com/VOTRE-USERNAME/geo-quiz.git
cd geo-quiz

# Lancer un serveur local
python -m http.server 8000

# Ouvrir dans le navigateur
open http://localhost:8000
```

## 📦 Structure du projet

```
geo-quiz/
├── index.html                          # Page principale
├── map-manager.js                      # Gestion des cartes interactives
├── countries_fr_complet.json          # Base de données des 195 pays
├── manifest.json                       # Manifest PWA
├── service-worker.js                   # Service Worker pour le mode hors ligne
├── icon-192.png                        # Icône PWA 192x192
├── icon-512.png                        # Icône PWA 512x512
└── *.svg                              # Cartes SVG des différentes zones
```

## 🗺️ Zones disponibles

| Zone | Pays |
|------|------|
| 🌍 Monde | 195 pays |
| 🇪🇺 Europe | 45 pays |
| 🌏 Asie | 48 pays |
| 🦁 Afrique | 54 pays |
| 🌎 Amérique du Nord | 23 pays |
| 🗺️ Amérique du Sud | 12 pays |
| 🏝️ Océanie | 14 pays |

## 🏆 Badges

- 🎯 **Premier Pas** : Découvre ton premier pays
- 🗺️ **Explorateur** : Découvre 10 pays
- ✈️ **Aventurier** : Découvre 25 pays
- 🌟 **Grand Voyageur** : Découvre 50 pays
- 👑 **Maître Géographe** : Découvre 100 pays
- 🌍 **Tour du Monde** : Découvre les 195 pays
- Plus de badges par continent !

## 🛠️ Technologies

- HTML5 / CSS3 / JavaScript
- SVG pour les cartes interactives
- LocalStorage pour la persistance
- PWA (Progressive Web App)
- Service Worker pour le mode hors ligne

## 📝 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à ouvrir une issue ou une pull request.

## 👨‍💻 Auteur

Créé avec ❤️ pour apprendre la géographie en s'amusant !

---

**Bon voyage autour du monde ! 🌍✈️**
