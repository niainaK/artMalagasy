import { useState, useEffect, useRef } from "react";

type CartItem = {
  product: string;
  price: number;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  badgeColor?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Chapeau en Raphia",
    description: "Chapeau traditionnel tressé à la main",
    price: 45,
    image: "/images/product-hat.jpg",
    badge: "Nouveau",
    badgeColor: "bg-malagasy-orange",
  },
  {
    id: 2,
    name: "Sac Artisanal",
    description: "Sac tissé en fibres naturelles",
    price: 65,
    image: "/images/product-bag.jpg",
  },
  {
    id: 3,
    name: "Panier Tressé",
    description: "Panier décoratif fait main",
    price: 38,
    image: "/images/product-basket.jpg",
  },
  {
    id: 4,
    name: "Bijoux Traditionnels",
    description: "Parures en fibres et perles naturelles",
    price: 28,
    image: "/images/product-jewelry.jpg",
    badge: "Populaire",
    badgeColor: "bg-malagasy-green",
  },
  {
    id: 5,
    name: "Décoration Murale",
    description: "Objets décoratifs en raphia",
    price: 52,
    image: "/images/product-decor.jpg",
  },
  {
    id: 6,
    name: "Chapeau Élégant",
    description: "Chapeau de soleil premium",
    price: 55,
    image: "/images/product-hat.jpg",
    badge: "Bestseller",
    badgeColor: "bg-malagasy-orange",
  },
];

const gallerySteps = [
  {
    image: "/images/gallery-harvest.jpg",
    title: "1. Récolte",
    description: "Sélection et récolte du raphia dans les plantations",
  },
  {
    image: "/images/gallery-weaving.jpg",
    title: "2. Tressage",
    description: "Techniques ancestrales de tissage à la main",
  },
  {
    image: "/images/gallery-patterns.jpg",
    title: "3. Motifs",
    description: "Création de motifs traditionnels malgaches",
  },
  {
    image: "/images/product-basket.jpg",
    title: "4. Finition",
    description: "Produit final prêt à être expédié",
  },
];

const testimonials = [
  {
    name: "Marie Laurent",
    location: "Paris, France",
    initials: "ML",
    color: "bg-malagasy-orange",
    text: "La qualité exceptionnelle de ces produits artisanaux m'a impressionnée. On sent vraiment le savoir-faire et l'amour du travail bien fait dans chaque détail.",
  },
  {
    name: "Sophie Chen",
    location: "Lyon, France",
    initials: "SC",
    color: "bg-malagasy-green",
    text: "Mon sac en raphia est devenu mon accessoire préféré ! Il est à la fois élégant et durable. Je recommande vivement cette boutique.",
  },
  {
    name: "Jean Dupont",
    location: "Bordeaux, France",
    initials: "JD",
    color: "bg-malagasy-brown",
    text: "Soutenir l'artisanat local tout en ayant des produits magnifiques, c'est exactement ce que je cherchais. Livraison rapide et service impeccable.",
  },
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [animateCart, setAnimateCart] = useState(false);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToCart = (product: string, price: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product === product);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product === product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, price, quantity: 1 }];
    });

    setNotification(`${product} ajouté au panier !`);
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 300);
    setTimeout(() => setNotification(null), 2000);
  };

  const updateQuantity = (index: number, action: "increase" | "decrease") => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (action === "increase") {
        newCart[index].quantity++;
      } else {
        newCart[index].quantity--;
        if (newCart[index].quantity <= 0) {
          newCart.splice(index, 1);
        }
      }
      return newCart;
    });
  };

  const removeItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-malagasy-cream min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🌿</span>
              <h1 className="text-2xl font-bold text-malagasy-dark-brown">
                Artisanat Malagasy
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a
                href="#accueil"
                className="text-malagasy-dark-brown hover:text-malagasy-orange transition-colors duration-300 font-medium"
              >
                Accueil
              </a>
              <a
                href="#catalogue"
                className="text-malagasy-dark-brown hover:text-malagasy-orange transition-colors duration-300 font-medium"
              >
                Catalogue
              </a>
              <a
                href="#histoire"
                className="text-malagasy-dark-brown hover:text-malagasy-orange transition-colors duration-300 font-medium"
              >
                Notre Histoire
              </a>
              <a
                href="#galerie"
                className="text-malagasy-dark-brown hover:text-malagasy-orange transition-colors duration-300 font-medium"
              >
                Galerie
              </a>
              <a
                href="#temoignages"
                className="text-malagasy-dark-brown hover:text-malagasy-orange transition-colors duration-300 font-medium"
              >
                Témoignages
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-malagasy-dark-brown hover:text-malagasy-orange transition-colors duration-300"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span
                  className={`absolute -top-2 -right-2 bg-malagasy-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ${
                    animateCart ? "animate-pop" : ""
                  }`}
                >
                  {totalItems}
                </span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-malagasy-dark-brown"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {[
                { href: "#accueil", label: "Accueil" },
                { href: "#catalogue", label: "Catalogue" },
                { href: "#histoire", label: "Notre Histoire" },
                { href: "#galerie", label: "Galerie" },
                { href: "#temoignages", label: "Témoignages" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-malagasy-dark-brown hover:text-malagasy-orange transition-colors duration-300 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="accueil"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/hero-artisans.jpg"
            alt="Artisans malgaches au travail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-malagasy-dark-brown/80 to-malagasy-dark-brown/50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              L'art malagasy
              <br />
              <span className="text-malagasy-orange">entre vos mains</span>
            </h2>
            <p className="text-xl md:text-2xl text-malagasy-beige mb-8 max-w-3xl mx-auto">
              Découvrez l'authenticité de l'artisanat malgache, créé avec
              passion et savoir-faire ancestral
            </p>
            <a
              href="#catalogue"
              className="inline-block bg-malagasy-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Découvrir nos créations
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Catalogue Section */}
      <section id="catalogue" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-malagasy-dark-brown mb-4">
              Notre Catalogue
            </h2>
            <p className="text-lg text-malagasy-brown max-w-2xl mx-auto">
              Des créations uniques, façonnées à la main par nos artisans
              malgaches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => {
                  revealRefs.current[index] = el;
                }}
                className="reveal group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <div
                      className={`absolute top-4 right-4 ${
                        product.badgeColor || "bg-malagasy-orange"
                      } text-white px-3 py-1 rounded-full text-sm font-semibold`}
                    >
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-malagasy-dark-brown mb-2">
                    {product.name}
                  </h3>
                  <p className="text-malagasy-brown mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-malagasy-orange">
                      {product.price}€
                    </span>
                    <button
                      onClick={() => addToCart(product.name, product.price)}
                      className="bg-malagasy-dark-brown hover:bg-malagasy-brown text-white px-6 py-2 rounded-full transition-colors duration-300 font-medium"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Histoire Section */}
      <section id="histoire" className="py-20 bg-malagasy-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/about-artisans.jpg"
                alt="Nos artisans"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-malagasy-dark-brown mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-malagasy-dark-brown text-lg leading-relaxed">
                <p>
                  Depuis des générations, nos artisans perpétuent un savoir-faire
                  unique transmis de maître à apprenti. Chaque pièce raconte
                  l'histoire de Madagascar, de ses traditions et de son peuple.
                </p>
                <p>
                  Nous travaillons avec plus de 50 artisans locaux,
                  principalement des femmes, qui maîtrisent l'art ancestral du
                  tressage du raphia et des fibres naturelles.
                </p>
                <p>
                  Notre engagement : préserver ces techniques traditionnelles
                  tout en offrant des conditions de travail équitables et en
                  utilisant des matériaux durables issus de sources
                  responsables.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-malagasy-orange mb-2">
                    50+
                  </div>
                  <div className="text-malagasy-dark-brown font-medium">
                    Artisans
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-malagasy-orange mb-2">
                    100%
                  </div>
                  <div className="text-malagasy-dark-brown font-medium">
                    Fait Main
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-malagasy-orange mb-2">
                    20+
                  </div>
                  <div className="text-malagasy-dark-brown font-medium">
                    Ans d'expérience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie Section */}
      <section id="galerie" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-malagasy-dark-brown mb-4">
              L'Art de la Fabrication
            </h2>
            <p className="text-lg text-malagasy-brown max-w-2xl mx-auto">
              Découvrez les étapes de création de nos produits artisanaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallerySteps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  revealRefs.current[products.length + index] = el;
                }}
                className="reveal group relative overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-malagasy-dark-brown/90 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section id="temoignages" className="py-20 bg-malagasy-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-malagasy-dark-brown mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-malagasy-brown max-w-2xl mx-auto">
              Découvrez les expériences de ceux qui ont adopté l'artisanat
              malgasy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-malagasy-orange text-xl">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
                <p className="text-malagasy-dark-brown mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-malagasy-dark-brown">
                      {testimonial.name}
                    </div>
                    <div className="text-malagasy-brown text-sm">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-malagasy-dark-brown text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🌿</span>
                <h3 className="text-2xl font-bold">Artisanat Malagasy</h3>
              </div>
              <p className="text-malagasy-beige">
                L'authenticité de l'artisanat malgache à portée de main
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#accueil"
                    className="text-malagasy-beige hover:text-malagasy-orange transition-colors"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="#catalogue"
                    className="text-malagasy-beige hover:text-malagasy-orange transition-colors"
                  >
                    Catalogue
                  </a>
                </li>
                <li>
                  <a
                    href="#histoire"
                    className="text-malagasy-beige hover:text-malagasy-orange transition-colors"
                  >
                    Notre Histoire
                  </a>
                </li>
                <li>
                  <a
                    href="#galerie"
                    className="text-malagasy-beige hover:text-malagasy-orange transition-colors"
                  >
                    Galerie
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-malagasy-beige">
                <li>📧 contact@artisanat-malagasy.com</li>
                <li>📞 +33 1 23 45 67 89</li>
                <li>📍 Antananarivo, Madagascar</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-malagasy-beige hover:text-malagasy-orange transition-colors text-2xl"
                >
                  📘
                </a>
                <a
                  href="#"
                  className="text-malagasy-beige hover:text-malagasy-orange transition-colors text-2xl"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="text-malagasy-beige hover:text-malagasy-orange transition-colors text-2xl"
                >
                  🐦
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-malagasy-brown pt-8 text-center text-malagasy-beige">
            <p>
              &copy; 2026 Artisanat Malagasy. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-malagasy-dark-brown">
                  Mon Panier
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-malagasy-dark-brown hover:text-malagasy-orange text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4 mb-6">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Votre panier est vide
                  </p>
                ) : (
                  cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-malagasy-cream rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-malagasy-dark-brown">
                          {item.product}
                        </h4>
                        <p className="text-malagasy-orange font-bold">
                          {item.price}€ x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(index, "decrease")}
                          className="bg-malagasy-beige hover:bg-malagasy-brown text-malagasy-dark-brown w-8 h-8 rounded-full"
                        >
                          -
                        </button>
                        <span className="font-bold text-malagasy-dark-brown">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, "increase")}
                          className="bg-malagasy-beige hover:bg-malagasy-brown text-malagasy-dark-brown w-8 h-8 rounded-full"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-malagasy-dark-brown">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-malagasy-orange">
                    {totalPrice}€
                  </span>
                </div>
                <button className="w-full bg-malagasy-orange hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition-colors duration-300">
                  Passer la commande
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="cart-notification">{notification}</div>
      )}
    </div>
  );
}

export default App;
