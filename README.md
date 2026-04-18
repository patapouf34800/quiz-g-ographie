# 🌍 Géo Quiz - Découvre les pays du monde

Jeu éducatif pour apprendre la géographie mondiale - **195 pays à découvrir !**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple)

## 📱 Application PWA

Géo Quiz est une **Progressive Web App** qui fonctionne :
- ✅ **En ligne** - Expérience complète
- ✅ **Hors ligne** - Grâce au Service Worker
- ✅ **Sur ordinateur** - Desktop et laptop
- ✅ **Sur mobile** - Smartphone et tablette
- ✅ **Installable** - Comme une vraie application

## 🎮 Modes de jeu

### Jeux Classiques
1. **🗺️ Nomme les pays** - Identifie les pays par leur drapeau et silhouette
2. **🏛️ Capitales** - Trouve les capitales du monde
3. **🎓 Expert** - Pays + capitale simultanément
4. **🏴 Drapeaux** - Quiz de 10 drapeaux aléatoires

### Jeu Spécial
**👥 Ne dépasse pas la limite !** - Jeu de stratégie où tu dois atteindre une population cible sans la dépasser

#### 3 Niveaux de difficulté
- 😊 **Facile** : Max 15 pays
- 😰 **Difficile** : Max 10 pays  
- 🔥 **Enfer** : Max 10 pays + contrainte des 6 continents

## 🏆 Système de progression

### Cadres dorés
Maîtrise un pays en le validant 6+ fois en mode "Nomme" ou "Expert"

### Rubans
- 🥉 **Bronze** : 1-5 validations capitale
- 🥈 **Argent** : 6+ validations capitale
- 🥇 **Or** : 6+ validations en mode Expert uniquement

### 18 Badges à débloquer
Du badge "Découverte" (1 pays) au badge "Dieu de la géographie" (195 pays) !

## 📊 Fonctionnalités

- ✅ **Multi-joueurs** - Créez plusieurs profils
- ✅ **Sauvegarde automatique** - Données stockées localement
- ✅ **Export/Import** - Sauvegardez vos progrès en JSON
- ✅ **Collection complète** - Suivez votre progression sur 195 pays
- ✅ **Statistiques détaillées** - Scores, moyennes, pénalités, efficacité
- ✅ **Mode hors ligne** - Jouez sans connexion Internet

## 🚀 Installation

### Méthode 1 : Cloner le repository

```bash
git clone https://github.com/votre-username/geo-quiz.git
cd geo-quiz
```

### Méthode 2 : Télécharger le ZIP

Téléchargez directement depuis GitHub et décompressez.

## 📁 Structure des fichiers

```
geo-quiz/
├── index.html                      # Application principale
├── service-worker.js               # Service Worker pour PWA
├── manifest.json                   # Manifest PWA
├── countries_fr_complet.json       # Base de données des 195 pays
├── icon-192.png                    # Icône PWA 192x192
├── icon-512.png                    # Icône PWA 512x512
├── flags/                          # Dossier des drapeaux
│   ├── fr.png
│   ├── de.png
│   └── ... (195 fichiers)
└── badges/                         # Dossier des badges
    ├── decouverte.png
    ├── globe-trotteur.png
    └── ... (18 fichiers)
```

## 🔧 Prérequis

### Fichiers obligatoires

1. **countries_fr_complet.json** - Base de données des pays
   - Format : `[{ "nom": "France", "capitale": "Paris", "iso2": "FR", ... }]`
   - 195 pays avec données complètes

2. **Dossier flags/** - 195 drapeaux
   - Format : `XX.png` (code ISO2 en minuscules)
   - Exemple : `fr.png`, `de.png`, `us.png`
   - Taille recommandée : 64×64 ou 128×128 px

3. **Dossier badges/** - 18 images de badges
   - Format : `nom-badge.png`
   - Liste complète dans `AUDIT_COMPLET.md`

4. **Icônes PWA**
   - `icon-192.png` (192×192 px)
   - `icon-512.png` (512×512 px)

### Serveur web

L'application doit être servie via HTTP/HTTPS pour que le Service Worker fonctionne.

**Options simples :**

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (avec npx)
npx serve

# PHP
php -S localhost:8000
```

Puis ouvrir : `http://localhost:8000`

## 🌐 Déploiement

### GitHub Pages

1. Pusher le code sur GitHub
2. Aller dans Settings → Pages
3. Sélectionner la branche `main` et le dossier `/` (root)
4. Cliquer sur Save
5. L'application sera disponible à : `https://votre-username.github.io/geo-quiz/`

### Netlify / Vercel

Simple glisser-déposer du dossier sur leur interface web !

## 🎯 Utilisation

1. **Lancer l'application** - Ouvrir `index.html` dans un navigateur
2. **Créer un profil** - Entrer votre nom
3. **Choisir un mode** - Sélectionner un jeu
4. **Jouer !** - Découvrir les pays du monde

## 💾 Données

### LocalStorage

Les données sont sauvegardées localement dans le navigateur :
- Profils joueurs
- Statistiques
- Scores
- Collection de pays
- Badges débloqués

### Export/Import

Utilisez les fonctions dans la console :
```javascript
exportData()  // Télécharge un JSON
importData()  // Importe un JSON
```

## 🛠️ Développement

### Fonctions de debug

Ouvrir la console du navigateur :

```javascript
// Inspecter le localStorage
debugStorage()

// Nettoyer les données
cleanStorage()

// Exporter les données
exportData()

// Importer des données
importData()
```

### Structure du code

- **Lines:** 6 430 lignes
- **Functions:** 68 fonctions JavaScript
- **CSS Classes:** 363 classes
- **No dependencies** - Vanilla JavaScript uniquement

## 📈 Roadmap

### Version actuelle : 1.0.0
- ✅ 5 modes de jeu
- ✅ 195 pays
- ✅ 18 badges
- ✅ Mode hors ligne
- ✅ Multi-joueurs

### Futures améliorations possibles
- [ ] Mode multijoueur en temps réel
- [ ] Classements globaux
- [ ] Plus de langues (EN, ES, DE...)
- [ ] Mode challenge quotidien
- [ ] Achievements supplémentaires
- [ ] Support complet clavier
- [ ] Mode sombre

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT - voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

Votre nom - [@votre-twitter](https://twitter.com/votre-twitter)

## 🙏 Remerciements

- Données des pays : Sources publiques
- Drapeaux : [Source à préciser]
- Icônes : [Source à préciser]

## 📞 Support

Des questions ? Besoin d'aide ?

- 📧 Email : votre-email@example.com
- 🐛 Issues : [GitHub Issues](https://github.com/votre-username/geo-quiz/issues)

## 🌟 Show your support

Si vous aimez ce projet, n'hésitez pas à lui donner une ⭐️ sur GitHub !

---

**Fait avec ❤️ pour l'éducation géographique**
