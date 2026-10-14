# Artisanat Malagasy - Site E-commerce

Un site web moderne et élégant pour une boutique d'artisanat malgache spécialisée dans les produits faits main.

## 🌿 À propos

Ce site présente une collection authentique d'artisanat malgache, mettant en valeur le savoir-faire ancestral des artisans de Madagascar. Chaque produit est créé à la main avec des matériaux naturels et durables.

## ✨ Caractéristiques

### Design
- **Palette de couleurs naturelle** : beige, marron bois, vert tropical, orange terre, blanc cassé
- **Design responsive** : optimisé pour mobile, tablette et desktop
- **Animations fluides** : transitions douces et effets hover élégants
- **Style premium** : interface e-commerce moderne et minimaliste

### Sections
1. **Hero Section** : Présentation immersive avec image d'artisans au travail
2. **Catalogue** : 6 produits avec photos, descriptions et prix
3. **Notre Histoire** : Présentation des artisans et du savoir-faire
4. **Galerie** : Processus de fabrication en 4 étapes
5. **Témoignages** : Avis clients avec design premium

### Fonctionnalités
- ✅ Panier d'achat interactif avec gestion des quantités
- ✅ Notifications d'ajout au panier
- ✅ Navigation fluide avec scroll smooth
- ✅ Menu mobile responsive
- ✅ Animations au scroll (Intersection Observer)
- ✅ Compteurs dynamiques
- ✅ Modal de panier avec détails complets

## 🛠️ Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Styles personnalisés et animations
- **Tailwind CSS** : Framework CSS via CDN pour un styling rapide
- **JavaScript Vanilla** : Interactivité sans dépendances
- **Images optimisées** : Photos générées par IA reflétant l'artisanat malgache

## 📦 Structure du projet

```
artesanat-malagasy/
├── index.html              # Page principale
├── styles.css              # Styles personnalisés
├── script.js               # Logique interactive
├── public/
│   └── images/            # Images du site
│       ├── hero-artisans.jpg
│       ├── product-hat.jpg
│       ├── product-bag.jpg
│       ├── product-basket.jpg
│       ├── product-jewelry.jpg
│       ├── product-decor.jpg
│       ├── gallery-harvest.jpg
│       ├── gallery-weaving.jpg
│       ├── gallery-patterns.jpg
│       └── about-artisans.jpg
└── README.md              # Documentation
```

## 🚀 Installation et utilisation

### Option 1 : Serveur local simple

```bash
# Avec Python 3
python -m http.server 8000

# Avec Python 2
python -m SimpleHTTPServer 8000

# Avec Node.js (http-server)
npx http-server
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

### Option 2 : Ouverture directe

Ouvrez simplement `index.html` dans votre navigateur web.

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `index.html` dans la configuration Tailwind :

```javascript
colors: {
    'malagasy': {
        'beige': '#E8DCC4',
        'brown': '#8B6F47',
        'dark-brown': '#5C4033',
        'green': '#6B8E4E',
        'orange': '#D97642',
        'cream': '#F5F1E8'
    }
}
```

### Produits
Pour ajouter ou modifier des produits, éditez la section catalogue dans `index.html`. Chaque produit suit cette structure :

```html
<div class="product-card group bg-white rounded-2xl overflow-hidden shadow-lg">
    <img src="images/product-name.jpg" alt="Description">
    <h3>Nom du produit</h3>
    <p>Description</p>
    <span class="price">Prix€</span>
    <button class="add-to-cart" data-product="Nom" data-price="Prix">
        Ajouter au panier
    </button>
</div>
```

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints :
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🌐 Compatibilité navigateurs

- Chrome (recommandé)
- Firefox
- Safari
- Edge
- Opera

## 📝 Licence

Ce projet est créé à des fins de démonstration.

## 👥 Crédits

- **Design & Développement** : Artisanat Malagasy
- **Images** : Générées par IA pour refléter l'authenticité de l'artisanat malgache
- **Framework CSS** : Tailwind CSS

## 📞 Contact

Pour toute question ou collaboration :
- Email : contact@artisanat-malagasy.com
- Téléphone : +33 1 23 45 67 89
- Adresse : Antananarivo, Madagascar

---

**Fait avec ❤️ pour célébrer l'artisanat malgache**
