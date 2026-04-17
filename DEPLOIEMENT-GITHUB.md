# 🚀 Déployer Géo Quiz sur GitHub Pages

## Étape 1 : Créer un dépôt GitHub

1. Va sur [GitHub](https://github.com)
2. Clique sur **New repository** (bouton vert)
3. Nom du dépôt : `geo-quiz`
4. Description : `Jeu éducatif de géographie mondiale`
5. Public ✅
6. Clique sur **Create repository**

## Étape 2 : Uploader les fichiers

### Option A : Interface Web (plus simple)

1. Dans ton nouveau dépôt, clique sur **Add file** > **Upload files**
2. Glisse-dépose TOUS ces fichiers :
   - `index.html`
   - `map-manager.js`
   - `countries_fr_complet.json`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`
   - `icon-512.png`
   - `worldLow.svg`
   - `region_world_europeLow.svg`
   - `region_world_asiaLow.svg`
   - `region_world_africaLow.svg`
   - `region_world_northAmericaLow.svg`
   - `region_world_southAmericaLow.svg`
   - `region_world_oceaniaLow.svg`
   - `README-GITHUB.md` (renommer en `README.md`)

3. Message du commit : `🌍 Initial commit - Géo Quiz`
4. Clique sur **Commit changes**

### Option B : Git en ligne de commande

```bash
# Dans le dossier contenant tous les fichiers
git init
git add .
git commit -m "🌍 Initial commit - Géo Quiz"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/geo-quiz.git
git push -u origin main
```

## Étape 3 : Activer GitHub Pages

1. Dans ton dépôt, va dans **Settings** (⚙️)
2. Dans le menu de gauche, clique sur **Pages**
3. Sous **Source**, sélectionne :
   - Branch : `main`
   - Folder : `/ (root)`
4. Clique sur **Save**
5. Attends 1-2 minutes ⏱️

## Étape 4 : Tester !

Ton site sera disponible à :
```
https://VOTRE-USERNAME.github.io/geo-quiz/
```

Exemple : Si ton username est `jean-dupont`, l'URL sera :
```
https://jean-dupont.github.io/geo-quiz/
```

## ✅ Vérifications

Une fois déployé, vérifie que :
- ✅ Le site s'affiche correctement
- ✅ Les cartes SVG se chargent
- ✅ Tu peux créer un joueur
- ✅ Tu peux lancer une partie
- ✅ Les pays se colorent quand tu les trouves
- ✅ Ta progression est sauvegardée
- ✅ Le PWA s'installe (sur mobile/Chrome)

## 📱 Installer comme PWA

### Sur Chrome (ordinateur)
1. Va sur ton site
2. Regarde dans la barre d'adresse : icône d'installation
3. Clique dessus et installe !

### Sur mobile (iOS/Android)
1. Ouvre le site dans Safari (iOS) ou Chrome (Android)
2. Menu > **Ajouter à l'écran d'accueil**
3. L'app apparaît sur ton écran d'accueil !

## 🔄 Mettre à jour

Pour mettre à jour le jeu :
1. Modifie les fichiers localement
2. Upload les nouveaux fichiers sur GitHub (ou push avec Git)
3. GitHub Pages se met à jour automatiquement (1-2 minutes)

## 🐛 Problèmes courants

### Les cartes ne s'affichent pas
- Vérifie que TOUS les fichiers SVG sont uploadés
- Vérifie les noms de fichiers (sensible à la casse)
- Vide le cache du navigateur (Ctrl+Shift+R)

### Le JSON ne charge pas
- Vérifie que `countries_fr_complet.json` est bien uploadé
- Vérifie le nom du fichier (pas de faute de frappe)

### Le Service Worker ne s'enregistre pas
- C'est normal en HTTP (fonctionne seulement en HTTPS)
- GitHub Pages utilise HTTPS automatiquement ✅

## 🎉 C'est tout !

Ton Géo Quiz est maintenant en ligne et accessible partout dans le monde ! 🌍

Partage le lien avec tes amis : `https://VOTRE-USERNAME.github.io/geo-quiz/`
