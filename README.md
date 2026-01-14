# 🎨 QRCode Generator Plus

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
  <img src="https://img.shields.io/badge/Made%20with-JavaScript-yellow?style=for-the-badge&logo=javascript" alt="JavaScript"/>
</p>

<p align="center">
  <strong>Générateur de QR Codes moderne et élégant avec personnalisation avancée</strong>
</p>

<p align="center">
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#-démo">Démo</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-utilisation">Utilisation</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-auteur">Auteur</a>
</p>

---

## ✨ Fonctionnalités

### 🎨 Création de QR Codes
- **Personnalisation complète** : Couleurs, styles de points, coins personnalisables
- **Logo intégré** : Ajoutez votre logo au centre du QR Code
- **Templates prédéfinis** : URL, Email, Téléphone, SMS, WiFi, vCard
- **Export multi-format** : PNG, JPG, SVG
- **Aperçu en temps réel** : Visualisation instantanée des modifications

### 📱 Scanner de QR Codes
- **Upload d'image** : Glissez-déposez ou sélectionnez une image
- **Décodage instantané** : Extraction rapide du contenu
- **Détection automatique** : Reconnaissance des URLs pour ouverture directe

### 🎯 Interface Moderne
- **Design professionnel** : Interface élégante et intuitive
- **Mode sombre/clair** : Thème adaptatif selon vos préférences
- **Responsive** : Fonctionne parfaitement sur mobile, tablette et desktop
- **FAQ intégrée** : 10 questions fréquentes avec accordéon interactif
- **Bouton scroll-to-top** : Navigation fluide avec retour en haut

### 💾 Gestion
- **Sauvegarde de configuration** : Enregistrez vos paramètres favoris
- **Copie rapide** : Copiez le QR Code dans le presse-papiers
- **Export par lots** : Générez plusieurs QR Codes simultanément
- **Historique local** : Aucune donnée envoyée au serveur

### 🌍 Multilingue
- **Français** 🇫🇷
- **English** 🇬🇧

---

## 🚀 Démo

🔗 **Demo Live:** [qrcode.connectapps.org](https://qr.connectapps.org) *(à venir)*

---

## 📦 Installation

### Prérequis
- Serveur web (Apache, Nginx, ou serveur local)
- Navigateur moderne (Chrome, Firefox, Safari, Edge)

### Méthode 1 : Clone du repository
```bash
# Cloner le repository
git clone https://github.com/naoufalnajim01/QRCode-Generator-Plus.git

# Accéder au dossier
cd QRCode-Generator-Plus

# Ouvrir dans le navigateur
# Ouvrez public/index.html dans votre navigateur
```

### Méthode 2 : Téléchargement direct
1. Téléchargez le [ZIP du projet](https://github.com/naoufalnajim01/QRCode-Generator-Plus/archive/refs/heads/main.zip)
2. Extrayez l'archive
3. Ouvrez `public/index.html` dans votre navigateur

### Méthode 3 : Hébergement web
Uploadez simplement le contenu du dossier `public/` vers votre hébergement web.

---

## 🎯 Utilisation

### Créer un QR Code

1. **Entrez vos données** dans le champ de texte
2. **Personnalisez** :
   - Couleurs (fond, points, coins)
   - Dimensions (largeur, hauteur)
   - Style des points (dots, rounded, square, etc.)
   - Logo (URL ou upload)
3. **Exportez** au format souhaité (PNG, JPG, SVG)

### Utiliser les Templates

1. Cliquez sur **"Modèles de données"**
2. Sélectionnez un template :
   - **URL** : Lien web
   - **Email** : Adresse email
   - **Téléphone** : Numéro de téléphone
   - **SMS** : Message texte
   - **WiFi** : Connexion WiFi
   - **vCard** : Carte de visite
3. Le champ se remplit automatiquement

### Scanner un QR Code

1. Passez en mode **"Analyser"**
2. **Glissez-déposez** une image ou cliquez pour sélectionner
3. Le contenu s'affiche instantanément
4. **Copiez** ou **ouvrez** le lien si c'est une URL

---

## 🛠️ Technologies

### Frontend
- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec variables CSS
- **JavaScript (Vanilla)** - Logique applicative

### Bibliothèques
- **[QR Code Styling](https://github.com/kozakdenys/qr-code-styling)** - Génération de QR Codes stylisés
- **[jsQR](https://github.com/cozmo/jsQR)** - Décodage de QR Codes
- **[JSZip](https://stuk.github.io/jszip/)** - Export par lots

### Design
- **Google Fonts** - Typographie (Inter, Pacifico)
- **Design System** - Variables CSS personnalisées
- **Responsive Design** - Mobile-first approach

---

## 📁 Structure du Projet

```
QRCode-Generator-Plus/
├── public/
│   ├── index.html              # Page principale
│   ├── css/
│   │   ├── style.css           # Styles principaux
│   │   ├── faq.css             # Styles FAQ
│   │   └── footer.css          # Styles footer
│   ├── js/
│   │   ├── generator.js        # Logique génération QR
│   │   ├── scroll-top.js       # Bouton scroll-to-top
│   │   ├── main.js             # Script principal
│   │   └── i18n.js             # Internationalisation
│   ├── locales/
│   │   ├── fr.json             # Traductions françaises
│   │   └── en.json             # Traductions anglaises
│   ├── images/
│   │   └── favicon.ico         # Icône du site
│   └── .htaccess               # Configuration Apache
├── LICENSE                     # Licence MIT
├── .gitignore                  # Fichiers ignorés par Git
└── README.md                   # Ce fichier
```

---

## 🎨 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `public/css/style.css` :

```css
:root {
    --bg-main: #ffffff;
    --text-primary: #18181b;
    /* ... autres variables */
}
```

### Ajouter des templates
Modifiez la méthode `showDataTemplates()` dans `public/js/generator.js` :

```javascript
const templates = {
    url: 'https://example.com',
    // Ajoutez vos templates ici
};
```

---

## 🔒 Sécurité & Confidentialité

- ✅ **100% Client-Side** : Toutes les opérations se font localement
- ✅ **Aucune donnée envoyée** : Vos informations restent sur votre appareil
- ✅ **Pas de tracking** : Aucun cookie ou analytics
- ✅ **Open Source** : Code transparent et auditable

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. Créez une **branche** (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une **Pull Request**

---

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Naoufal Najim**

- 🌐 GitHub: [@naoufalnajim01](https://github.com/naoufalnajim01)
- 💼 LinkedIn: [Naoufal Najim](https://www.linkedin.com/in/naoufalnajim01/)
- 🐦 X/Twitter: [@naoufalnajim01](https://x.com/naoufalnajim01)
- 📧 Email: [naoufal.najim19@gmail.com](mailto:naoufal.najim19@gmail.com)

---

## 🙏 Remerciements

- [QR Code Styling](https://github.com/kozakdenys/qr-code-styling) - Bibliothèque de génération
- [jsQR](https://github.com/cozmo/jsQR) - Bibliothèque de décodage
- [Google Fonts](https://fonts.google.com/) - Typographie
- Inspiré par [mini-qr](https://github.com/lyqht/mini-qr) de Estee Tey

---

## ⭐ Support

Si vous trouvez ce projet utile, n'hésitez pas à lui donner une ⭐ sur GitHub !

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" alt="Footer"/>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/naoufalnajim01">Naoufal Najim</a>
</p>
