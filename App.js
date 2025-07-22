import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import FeedbackForm from "./components/FeedbackForm";
import Footer from "./components/Footer";
import LanguageSelector from "./components/LanguageSelector";
import productsData from "./data/products";
import "./App.css";
import "./i18n.js";
import axios from "axios";


const currencyRates = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.93 },
  GBP: { symbol: "£", rate: 0.8 },
  RWF: { symbol: "Frw", rate: 1300 },
  KES: { symbol: "Ksh", rate: 130 },
  UGX: { symbol: "USh", rate: 3800 },
  TZS: { symbol: "TSh", rate: 2500 },
  ZAR: { symbol: "R", rate: 18 },
  CAD: { symbol: "C$", rate: 1.35 },
  AUD: { symbol: "A$", rate: 1.5 },
  CNY: { symbol: "¥", rate: 7.2 },
  INR: { symbol: "₹", rate: 83 },
  JPY: { symbol: "¥", rate: 155 },
  NGN: { symbol: "₦", rate: 1400 },
  GHS: { symbol: "₵", rate: 13 },
  XAF: { symbol: "FCFA", rate: 600 },
  XOF: { symbol: "CFA", rate: 600 }
};

const API_URL = "https://patrick-furnitures.onrender.com/api/products";

function App() {
  const [page, setPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [currency, setCurrency] = useState("RWF");
  const [feedbacks, setFeedbacks] = useState([]);
  const [language, setLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Fetch products from backend on mount
    axios.get(API_URL)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setPage("checkout");
  };

  const handlePaymentConfirm = () => {
    setCartItems([]);
    setTimeout(() => setPage("home"), 2000);
  };

  const handleAdminLogin = () => {
    setAdminAuth(true);
  };

  const handleAdminLogout = () => {
    setAdminAuth(false);
    setPage("home");
  };

  const handleFeedbackSubmit = (feedback) => {
    setFeedbacks((prev) => [...prev, feedback]);
    // Simulate sending email to admin
    // In real app, send to backend/email service
  };

  const currencyInfo = currencyRates[currency];
  const convert = (usd) => (usd * currencyInfo.rate).toFixed(2);

  return (
    <div className="App">
      <nav className="navbar">
        <span className="nav-logo" onClick={() => setPage("home")}>{t('nav.home')}</span>
        <button onClick={() => setPage("products")}>{t('nav.products')}</button>
        <button onClick={() => setPage("cart")}>{t('nav.cart')} ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})</button>
        <button onClick={() => setPage("admin")}>{t('nav.admin')}</button>
        <select
          className="currency-selector"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        >
          {Object.keys(currencyRates).map((cur) => (
            <option key={cur} value={cur}>{cur} ({currencyRates[cur].symbol})</option>
          ))}
        </select>
        <LanguageSelector 
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
        <button className="dark-toggle" onClick={() => setDarkMode((d) => !d)}>
          {darkMode ? t('nav.lightMode') : t('nav.darkMode')}
        </button>
        {adminAuth && page === "admin" && (
          <button onClick={handleAdminLogout}>{t('admin.logout')}</button>
        )}
      </nav>
      <main>
        {page === "home" && (
          <div className="home">
            <h1>{t('home.title')}</h1>
            <p>{t('home.subtitle')}</p>
            <div className="home-buttons">
              <button onClick={() => setPage("products")}>{t('home.exploreButton')}</button>
              <button className="secondary" onClick={() => setPage("products")}>{t('home.galleryButton')}</button>
            </div>
            <div className="feature-cards">
              <div className="feature-card">
                <h3>{t('home.feature1.title')}</h3>
                <p>{t('home.feature1.desc')}</p>
              </div>
              <div className="feature-card">
                <h3>{t('home.feature2.title')}</h3>
                <p>{t('home.feature2.desc')}</p>
              </div>
              <div className="feature-card">
                <h3>{t('home.feature3.title')}</h3>
                <p>{t('home.feature3.desc')}</p>
              </div>
            </div>
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>
        )}
        {page === "products" && (
          <ProductList products={products} onAddToCart={handleAddToCart} currency={currency} convert={convert} symbol={currencyInfo.symbol} />
        )}
        {page === "cart" && (
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
            currency={currency}
            convert={convert}
            symbol={currencyInfo.symbol}
          />
        )}
        {page === "checkout" && (
          <Checkout
            total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            onConfirm={handlePaymentConfirm}
            currency={currency}
            convert={convert}
            symbol={currencyInfo.symbol}
          />
        )}

        {page === "admin" && (
          adminAuth ? (
            <AdminPanel products={products} setProducts={setProducts} feedbacks={feedbacks} />
          ) : (
            <AdminLogin onLogin={handleAdminLogin} />
          )
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
