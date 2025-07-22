import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Patrick Furnitures',
      'nav.products': 'Products',
      'nav.cart': 'Cart',
      'nav.admin': 'Admin',
      'nav.darkMode': 'Dark Mode',
      'nav.lightMode': 'Light Mode',
      
      // Home page
      'home.title': 'Patrick Furnitures',
      'home.subtitle': 'Crafting timeless elegance with premium wood furniture. Discover our handcrafted collection designed to transform your living spaces into havens of comfort and style.',
      'home.exploreButton': 'Explore Collection',
      'home.galleryButton': 'View Gallery',
      
      // Feature cards
      'home.feature1.title': 'Premium Quality',
      'home.feature1.desc': 'Handcrafted from the finest hardwoods with attention to every detail',
      'home.feature2.title': 'Timeless Design',
      'home.feature2.desc': 'Classic and contemporary pieces that never go out of style',
      'home.feature3.title': 'Expert Craftsmanship',
      'home.feature3.desc': 'Built to last generations with traditional woodworking techniques',
      
      // Products
      'products.title': 'Our Collection',
      'products.addToCart': 'Add to Cart',
      'products.price': 'Price',
      'products.description': 'Description',
      'products.rate': 'Rate',
      'products.star': 'star',
      'products.avg': 'Avg',
      
      // Cart
      'cart.title': 'Shopping Cart',
      'cart.empty': 'Your cart is empty.',
      'cart.quantity': 'Qty',
      'cart.remove': 'Remove',
      'cart.total': 'Total',
      'cart.checkout': 'Proceed to Checkout',
      
      // Checkout
      'checkout.title': 'Checkout',
      'checkout.total': 'Total Amount',
      'checkout.confirm': 'Confirm Payment',
      'checkout.success': 'Payment successful!',
      'checkout.selectPayment': 'Please select a payment method',
      
      // Admin
      'admin.login.title': 'Admin Login',
      'admin.login.username': 'Username',
      'admin.login.password': 'Password',
      'admin.login.submit': 'Login',
      'admin.login.email': 'Email',
      'admin.login.emailPlaceholder': 'Enter your email',
      'admin.login.passwordPlaceholder': 'Enter your password',
      'admin.login.error': 'Invalid email or password. Please try again.',
      'admin.login.demoCredentials': 'Demo Credentials',
      'admin.login.demoEmail': 'Email',
      'admin.login.demoPassword': 'Password',
      'admin.logout': 'Logout',
      'admin.upload.title': 'Upload Product',
      'admin.upload.name': 'Product Name',
      'admin.upload.price': 'Price',
      'admin.upload.description': 'Description',
      'admin.upload.image': 'Product Image',
      'admin.upload.uploadImage': 'Upload Image',
      'admin.upload.submit': 'Add Product',
      'admin.feedback.title': 'Customer Feedback',
      
      // Feedback
      'feedback.title': 'Send us your feedback',
      'feedback.name': 'Your Name',
      'feedback.email': 'Your Email',
      'feedback.message': 'Your Message',
      'feedback.submit': 'Send Feedback',
      'feedback.success': 'Thank you for your feedback!',
      
      // Footer
      'footer.copyright': '© 2024 Patrick Furnitures. All rights reserved.',
      'footer.contact': 'Contact Us',
      'footer.about': 'About Us',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service'
    }
  },
  fr: {
    translation: {
      // Navigation
      'nav.home': 'Patrick Meubles',
      'nav.products': 'Produits',
      'nav.cart': 'Panier',
      'nav.admin': 'Admin',
      'nav.darkMode': 'Mode Sombre',
      'nav.lightMode': 'Mode Clair',
      
      // Home page
      'home.title': 'Patrick Meubles',
      'home.subtitle': 'Création d\'élégance intemporelle avec des meubles en bois premium. Découvrez notre collection artisanale conçue pour transformer vos espaces de vie en havres de confort et de style.',
      'home.exploreButton': 'Explorer la Collection',
      'home.galleryButton': 'Voir la Galerie',
      
      // Feature cards
      'home.feature1.title': 'Qualité Premium',
      'home.feature1.desc': 'Artisanat des meilleurs bois durs avec attention à chaque détail',
      'home.feature2.title': 'Design Intemporel',
      'home.feature2.desc': 'Pièces classiques et contemporaines qui ne se démodent jamais',
      'home.feature3.title': 'Savoir-faire Expert',
      'home.feature3.desc': 'Construit pour durer des générations avec des techniques traditionnelles',
      
      // Products
      'products.title': 'Notre Collection',
      'products.addToCart': 'Ajouter au Panier',
      'products.price': 'Prix',
      'products.description': 'Description',
      'products.rate': 'Évaluer',
      'products.star': 'étoile',
      'products.avg': 'Moy',
      
      // Cart
      'cart.title': 'Panier d\'Achats',
      'cart.empty': 'Votre panier est vide.',
      'cart.quantity': 'Qté',
      'cart.remove': 'Supprimer',
      'cart.total': 'Total',
      'cart.checkout': 'Procéder au Paiement',
      
      // Checkout
      'checkout.title': 'Paiement',
      'checkout.total': 'Montant Total',
      'checkout.confirm': 'Confirmer le Paiement',
      'checkout.success': 'Paiement réussi !',
      'checkout.selectPayment': 'Veuillez sélectionner une méthode de paiement',
      
      // Admin
      'admin.login.title': 'Connexion Admin',
      'admin.login.username': 'Nom d\'utilisateur',
      'admin.login.password': 'Mot de passe',
      'admin.login.submit': 'Se connecter',
      'admin.login.email': 'Email',
      'admin.login.emailPlaceholder': 'Entrez votre email',
      'admin.login.passwordPlaceholder': 'Entrez votre mot de passe',
      'admin.login.error': 'Email ou mot de passe invalide. Veuillez réessayer.',
      'admin.login.demoCredentials': 'Identifiants de démonstration',
      'admin.login.demoEmail': 'Email',
      'admin.login.demoPassword': 'Mot de passe',
      'admin.logout': 'Se déconnecter',
      'admin.upload.title': 'Télécharger un Produit',
      'admin.upload.name': 'Nom du Produit',
      'admin.upload.price': 'Prix',
      'admin.upload.description': 'Description',
      'admin.upload.image': 'Image du Produit',
      'admin.upload.uploadImage': 'Télécharger une Image',
      'admin.upload.submit': 'Ajouter le Produit',
      'admin.feedback.title': 'Retour Client',
      
      // Feedback
      'feedback.title': 'Envoyez-nous votre avis',
      'feedback.name': 'Votre Nom',
      'feedback.email': 'Votre Email',
      'feedback.message': 'Votre Message',
      'feedback.submit': 'Envoyer l\'Avis',
      'feedback.success': 'Merci pour votre avis !',
      
      // Footer
      'footer.copyright': '© 2024 Patrick Meubles. Tous droits réservés.',
      'footer.contact': 'Nous Contacter',
      'footer.about': 'À Propos',
      'footer.privacy': 'Politique de Confidentialité',
      'footer.terms': 'Conditions de Service'
    }
  },
  es: {
    translation: {
      // Navigation
      'nav.home': 'Patrick Muebles',
      'nav.products': 'Productos',
      'nav.cart': 'Carrito',
      'nav.admin': 'Admin',
      'nav.darkMode': 'Modo Oscuro',
      'nav.lightMode': 'Modo Claro',
      
      // Home page
      'home.title': 'Patrick Muebles',
      'home.subtitle': 'Creando elegancia atemporal con muebles de madera premium. Descubre nuestra colección artesanal diseñada para transformar tus espacios de vida en refugios de comodidad y estilo.',
      'home.exploreButton': 'Explorar Colección',
      'home.galleryButton': 'Ver Galería',
      
      // Feature cards
      'home.feature1.title': 'Calidad Premium',
      'home.feature1.desc': 'Artesanía de las mejores maderas duras con atención a cada detalle',
      'home.feature2.title': 'Diseño Atemporal',
      'home.feature2.desc': 'Piezas clásicas y contemporáneas que nunca pasan de moda',
      'home.feature3.title': 'Artesanía Experta',
      'home.feature3.desc': 'Construido para durar generaciones con técnicas tradicionales',
      
      // Products
      'products.title': 'Nuestra Colección',
      'products.addToCart': 'Agregar al Carrito',
      'products.price': 'Precio',
      'products.description': 'Descripción',
      'products.rate': 'Calificar',
      'products.star': 'estrella',
      'products.avg': 'Prom',
      
      // Cart
      'cart.title': 'Carrito de Compras',
      'cart.empty': 'Tu carrito está vacío.',
      'cart.quantity': 'Cant',
      'cart.remove': 'Eliminar',
      'cart.total': 'Total',
      'cart.checkout': 'Proceder al Pago',
      
      // Checkout
      'checkout.title': 'Pago',
      'checkout.total': 'Monto Total',
      'checkout.confirm': 'Confirmar Pago',
      'checkout.success': '¡Pago exitoso!',
      'checkout.selectPayment': 'Por favor selecciona un método de pago',
      
      // Admin
      'admin.login.title': 'Inicio de Sesión Admin',
      'admin.login.username': 'Nombre de Usuario',
      'admin.login.password': 'Contraseña',
      'admin.login.submit': 'Iniciar Sesión',
      'admin.login.email': 'Email',
      'admin.login.emailPlaceholder': 'Ingresa tu email',
      'admin.login.passwordPlaceholder': 'Ingresa tu contraseña',
      'admin.login.error': 'Email o contraseña inválidos. Por favor intenta de nuevo.',
      'admin.login.demoCredentials': 'Credenciales de Demostración',
      'admin.login.demoEmail': 'Email',
      'admin.login.demoPassword': 'Contraseña',
      'admin.logout': 'Cerrar Sesión',
      'admin.upload.title': 'Subir Producto',
      'admin.upload.name': 'Nombre del Producto',
      'admin.upload.price': 'Precio',
      'admin.upload.description': 'Descripción',
      'admin.upload.image': 'Imagen del Producto',
      'admin.upload.uploadImage': 'Subir Imagen',
      'admin.upload.submit': 'Agregar Producto',
      'admin.feedback.title': 'Comentarios del Cliente',
      
      // Feedback
      'feedback.title': 'Envíanos tu comentario',
      'feedback.name': 'Tu Nombre',
      'feedback.email': 'Tu Email',
      'feedback.message': 'Tu Mensaje',
      'feedback.submit': 'Enviar Comentario',
      'feedback.success': '¡Gracias por tu comentario!',
      
      // Footer
      'footer.copyright': '© 2024 Patrick Muebles. Todos los derechos reservados.',
      'footer.contact': 'Contáctanos',
      'footer.about': 'Acerca de Nosotros',
      'footer.privacy': 'Política de Privacidad',
      'footer.terms': 'Términos de Servicio'
    }
  },
  rw: {
    translation: {
      // Navigation
      'nav.home': 'Patrick Ibikoresho',
      'nav.products': 'Ibicuruzwa',
      'nav.cart': 'Iguriro',
      'nav.admin': 'Umuyobozi',
      'nav.darkMode': 'Uburyo bw\'Ijoro',
      'nav.lightMode': 'Uburyo bw\'Umutaga',
      
      // Home page
      'home.title': 'Patrick Ibikoresho',
      'home.subtitle': 'Gukora ubwiza bw\'igihe kose hamwe n\'ibikoresho by\'ibiti by\'agaciro. Menya urutonde rwacu rw\'ibikoresho byakozwe n\'amaboko byateguwe kuguhindura ahantu hawe h\'ubuzima kuba ahantu h\'ubwiza n\'uburyo.',
      'home.exploreButton': 'Shakisha Urutonde',
      'home.galleryButton': 'Reba Amashusho',
      
      // Feature cards
      'home.feature1.title': 'Agaciro Gahambaye',
      'home.feature1.desc': 'Ibikoresho byakozwe n\'amaboko by\'ibiti by\'agaciro by\'amaboko hamwe n\'ubwitonzi ku buryo bwose',
      'home.feature2.title': 'Ubwubatsi bw\'Igihe Kose',
      'home.feature2.desc': 'Ibice by\'ubwubatsi bw\'igihe kose n\'ibya none bihora by\'uburyo',
      'home.feature3.title': 'Ubumenyi bw\'Umwuga',
      'home.feature3.desc': 'Byubatswe kugira ngo bihagaze imiryango myinshi hamwe n\'uburyo bw\'umwuga bw\'ibikoresho',
      
      // Products
      'products.title': 'Urutonde Rwacu',
      'products.addToCart': 'Gura',
      'products.price': 'Igiciro',
      'products.description': 'Ibisobanura',
      'products.rate': 'Gereranya',
      'products.star': 'inyenyeri',
      'products.avg': 'Moy',
      
      // Cart
      'cart.title': 'Iguriro ry\'Ibicuruzwa',
      'cart.empty': 'Iguriro ryawe nta kintu kiriho.',
      'cart.quantity': 'Umubare',
      'cart.remove': 'Kuraho',
      'cart.total': 'Igiteranyo',
      'cart.checkout': 'Komeza Kwishyura',
      
      // Checkout
      'checkout.title': 'Kwishyura',
      'checkout.total': 'Igiteranyo Cyose',
      'checkout.confirm': 'Emeza Kwishyura',
      'checkout.success': 'Kwishyura byagenze neza!',
      'checkout.selectPayment': 'Urugero rw\'uburyo bwo kwishyura',
      
      // Admin
      'admin.login.title': 'Kwinjira Umuyobozi',
      'admin.login.username': 'Izina ry\'Ukoze',
      'admin.login.password': 'Ijambo ry\'Ibanga',
      'admin.login.submit': 'Injira',
      'admin.login.email': 'Imeili',
      'admin.login.emailPlaceholder': 'Andika imeyili yawe',
      'admin.login.passwordPlaceholder': 'Andika ijambo ryawe ry\'ibanga',
      'admin.login.error': 'Imeili cyangwa ijambo ry\'ibanga sibyo. Ongera ugerageze.',
      'admin.login.demoCredentials': 'Amakuru yo Kugerageza',
      'admin.login.demoEmail': 'Imeili',
      'admin.login.demoPassword': 'Ijambo ry\'Ibanga',
      'admin.logout': 'Sohoka',
      'admin.upload.title': 'Shyiramo Ibicuruzwa',
      'admin.upload.name': 'Izina ry\'Ibicuruzwa',
      'admin.upload.price': 'Igiciro',
      'admin.upload.description': 'Ibisobanura',
      'admin.upload.image': 'Ifoto y\'Ibicuruzwa',
      'admin.upload.uploadImage': 'Shyiramo Ifoto',
      'admin.upload.submit': 'Ongeraho Ibicuruzwa',
      'admin.feedback.title': 'Ibisobanura by\'Abakiriya',
      
      // Feedback
      'feedback.title': 'Ohereza ibisobanura byawe',
      'feedback.name': 'Izina Ryawe',
      'feedback.email': 'Imeyili Yawe',
      'feedback.message': 'Ubutumwa Bwawe',
      'feedback.submit': 'Ohereza Ibisobanura',
      'feedback.success': 'Urakoze ibisobanura byawe!',
      
      // Footer
      'footer.copyright': '© 2024 Patrick Ibikoresho. Amahoro yose yarangiye.',
      'footer.contact': 'Twandikire',
      'footer.about': 'Ibyerekeye Twe',
      'footer.privacy': 'Politiki y\'Ibanga',
      'footer.terms': 'Amabwiriza y\'Umutekano'
    }
  },
  sw: {
    translation: {
      // Navigation
      'nav.home': 'Patrick Samani',
      'nav.products': 'Bidhaa',
      'nav.cart': 'Mkokoteni',
      'nav.admin': 'Msimamizi',
      'nav.darkMode': 'Hali ya Giza',
      'nav.lightMode': 'Hali ya Mwangaza',
      
      // Home page
      'home.title': 'Patrick Samani',
      'home.subtitle': 'Kutengeneza uzuri wa milele na samani za mbao za hali ya juu. Gundua mkusanyiko wetu wa mkono uliotengenezwa kwa kubadilisha nafasi zako za maisha kuwa makimbilio ya faraja na mtindo.',
      'home.exploreButton': 'Chunguza Mkusanyiko',
      'home.galleryButton': 'Tazama Picha',
      
      // Feature cards
      'home.feature1.title': 'Ubora wa Hali ya Juu',
      'home.feature1.desc': 'Imetengenezwa kwa mkono kutoka kwa mbao bora zaidi za ngumu kwa umakini kwa kila undani',
      'home.feature2.title': 'Muundo wa Milele',
      'home.feature2.desc': 'Vipande vya kitamaduni na vya kisasa ambavyo haviendi nje ya mtindo',
      'home.feature3.title': 'Ufundi wa Mtaalamu',
      'home.feature3.desc': 'Imejengwa kudumu vizazi na mbinu za jadi za ufundi wa mbao',
      
      // Products
      'products.title': 'Mkusanyiko Wetu',
      'products.addToCart': 'Ongeza kwenye Mkokoteni',
      'products.price': 'Bei',
      'products.description': 'Maelezo',
      'products.rate': 'Tathmini',
      'products.star': 'nyota',
      'products.avg': 'Wastani',
      
      // Cart
      'cart.title': 'Mkokoteni wa Ununuzi',
      'cart.empty': 'Mkokoteni wako ni tupu.',
      'cart.quantity': 'Idadi',
      'cart.remove': 'Ondoa',
      'cart.total': 'Jumla',
      'cart.checkout': 'Endelea kwenye Malipo',
      
      // Checkout
      'checkout.title': 'Malipo',
      'checkout.total': 'Jumla ya Kiasi',
      'checkout.confirm': 'Thibitisha Malipo',
      'checkout.success': 'Malipo yamefanikiwa!',
      'checkout.selectPayment': 'Tafadhali chagua njia ya malipo',
      
      // Admin
      'admin.login.title': 'Kuingia Msimamizi',
      'admin.login.username': 'Jina la Mtumiaji',
      'admin.login.password': 'Nywila',
      'admin.login.submit': 'Ingia',
      'admin.login.email': 'Barua pepe',
      'admin.login.emailPlaceholder': 'Weka barua pepe yako',
      'admin.login.passwordPlaceholder': 'Weka nywila yako',
      'admin.login.error': 'Barua pepe au nywila si sahihi. Tafadhali jaribu tena.',
      'admin.login.demoCredentials': 'Maelezo ya Onyesho',
      'admin.login.demoEmail': 'Barua pepe',
      'admin.login.demoPassword': 'Nywila',
      'admin.logout': 'Ondoka',
      'admin.upload.title': 'Pakia Bidhaa',
      'admin.upload.name': 'Jina la Bidhaa',
      'admin.upload.price': 'Bei',
      'admin.upload.description': 'Maelezo',
      'admin.upload.image': 'Picha ya Bidhaa',
      'admin.upload.uploadImage': 'Pakia Picha',
      'admin.upload.submit': 'Ongeza Bidhaa',
      'admin.feedback.title': 'Maoni ya Mteja',
      
      // Feedback
      'feedback.title': 'Tutume maoni yako',
      'feedback.name': 'Jina Lako',
      'feedback.email': 'Barua pepe yako',
      'feedback.message': 'Ujumbe wako',
      'feedback.submit': 'Tuma Maoni',
      'feedback.success': 'Asante kwa maoni yako!',
      
      // Footer
      'footer.copyright': '© 2024 Patrick Samani. Haki zote zimehifadhiwa.',
      'footer.contact': 'Wasiliana Nasi',
      'footer.about': 'Kuhusu Sisi',
      'footer.privacy': 'Sera ya Faragha',
      'footer.terms': 'Sheria za Huduma'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n; 