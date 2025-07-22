import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = ({ onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
  name: "",
    price: "",
    currency: "RWF",
    category: "",
    stock: "",
  description: "",
  image: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [language, setLanguage] = useState("en");
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  const API_URL = "https://patrick-furnitures.onrender.com/api/products";

  // Available currencies with scrollbar
  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "RWF", name: "Rwandan Franc", symbol: "₣" },
    { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
    { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
    { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
    { code: "MAD", name: "Moroccan Dirham", symbol: "MAD" },
    { code: "XOF", name: "West African CFA", symbol: "CFA" },
    { code: "XAF", name: "Central African CFA", symbol: "FCFA" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "ARS", name: "Argentine Peso", symbol: "$" },
    { code: "CLP", name: "Chilean Peso", symbol: "$" },
    { code: "COP", name: "Colombian Peso", symbol: "$" },
    { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
    { code: "UYU", name: "Uruguayan Peso", symbol: "$" },
    { code: "PYG", name: "Paraguayan Guarani", symbol: "₲" },
    { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs" },
    { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
    { code: "THB", name: "Thai Baht", symbol: "฿" },
    { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
    { code: "PHP", name: "Philippine Peso", symbol: "₱" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺" },
    { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
    { code: "SAR", name: "Saudi Riyal", symbol: "ر.س" },
    { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق" },
    { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
    { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
    { code: "OMR", name: "Omani Rial", symbol: "ر.ع." },
    { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا" },
    { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل" },
    { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
    { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
    { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
    { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨" },
    { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
    { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
    { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
    { code: "LAK", name: "Lao Kip", symbol: "₭" },
    { code: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
    { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
    { code: "UZS", name: "Uzbekistani Som", symbol: "so'm" },
    { code: "TJS", name: "Tajikistani Somoni", symbol: "ЅМ" },
    { code: "KGS", name: "Kyrgyzstani Som", symbol: "с" },
    { code: "TMT", name: "Turkmenistani Manat", symbol: "T" },
    { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
    { code: "GEL", name: "Georgian Lari", symbol: "₾" },
    { code: "AMD", name: "Armenian Dram", symbol: "֏" },
    { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
    { code: "MDL", name: "Moldovan Leu", symbol: "L" },
    { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
    { code: "PLN", name: "Polish Złoty", symbol: "zł" },
    { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
    { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
    { code: "RON", name: "Romanian Leu", symbol: "lei" },
    { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
    { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
    { code: "RSD", name: "Serbian Dinar", symbol: "дин" },
    { code: "ALL", name: "Albanian Lek", symbol: "L" },
    { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
    { code: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
    { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
    { code: "LAK", name: "Lao Kip", symbol: "₭" },
    { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
    { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
    { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨" },
    { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
    { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
    { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
    { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل" },
    { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا" },
    { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
    { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
    { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق" },
    { code: "SAR", name: "Saudi Riyal", symbol: "ر.س" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
    { code: "ILS", name: "Israeli Shekel", symbol: "₪" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "PHP", name: "Philippine Peso", symbol: "₱" },
    { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
    { code: "THB", name: "Thai Baht", symbol: "฿" },
    { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
    { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs" },
    { code: "PYG", name: "Paraguayan Guarani", symbol: "₲" },
    { code: "UYU", name: "Uruguayan Peso", symbol: "$" },
    { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
    { code: "COP", name: "Colombian Peso", symbol: "$" },
    { code: "CLP", name: "Chilean Peso", symbol: "$" },
    { code: "ARS", name: "Argentine Peso", symbol: "$" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "XAF", name: "Central African CFA", symbol: "FCFA" },
    { code: "XOF", name: "West African CFA", symbol: "CFA" },
    { code: "MAD", name: "Moroccan Dirham", symbol: "MAD" },
    { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
    { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
    { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
    { code: "RWF", name: "Rwandan Franc", symbol: "₣" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "USD", name: "US Dollar", symbol: "$" }
  ];

  // Language translations
  const translations = {
    en: {
      adminLogin: "Admin Login",
      secureAccess: "Secure access to admin panel",
      email: "Email:",
      password: "Password:",
      login: "Login",
      logout: "Logout",
      dashboard: "Dashboard",
      transactions: "Transactions",
      visitors: "Visitors",
      products: "Products",
      upload: "Upload",
      dashboardOverview: "Dashboard Overview",
      totalTransactions: "Total Transactions",
      successfulPayments: "Successful Payments",
      pendingPayments: "Pending Payments",
      totalRevenue: "Total Revenue",
      websiteVisitors: "Website Visitors",
      totalProducts: "Total Products",
      recentTransactions: "Recent Transactions",
      transactionHistory: "Transaction History",
      refresh: "Refresh",
      loading: "Loading...",
      productManagement: "Product Management",
      uploadNewProduct: "Upload New Product",
      productName: "Product Name:",
      price: "Price:",
      currency: "Currency:",
      category: "Category:",
      selectCategory: "Select Category",
      chairs: "Chairs",
      tables: "Tables",
      sofas: "Sofas",
      beds: "Beds",
      storage: "Storage",
      stockQuantity: "Stock Quantity:",
      description: "Description:",
      productImage: "Product Image:",
      addProduct: "Add Product",
      edit: "Edit",
      delete: "Delete",
      receipt: "Receipt",
      view: "View",
      language: "Language:",
      selectLanguage: "Select Language"
    },
    fr: {
      adminLogin: "Connexion Admin",
      secureAccess: "Accès sécurisé au panneau d'administration",
      email: "Email:",
      password: "Mot de passe:",
      login: "Se connecter",
      logout: "Se déconnecter",
      dashboard: "Tableau de bord",
      transactions: "Transactions",
      visitors: "Visiteurs",
      products: "Produits",
      upload: "Télécharger",
      dashboardOverview: "Aperçu du tableau de bord",
      totalTransactions: "Total des transactions",
      successfulPayments: "Paiements réussis",
      pendingPayments: "Paiements en attente",
      totalRevenue: "Revenus totaux",
      websiteVisitors: "Visiteurs du site",
      totalProducts: "Total des produits",
      recentTransactions: "Transactions récentes",
      transactionHistory: "Historique des transactions",
      refresh: "Actualiser",
      loading: "Chargement...",
      productManagement: "Gestion des produits",
      uploadNewProduct: "Télécharger un nouveau produit",
      productName: "Nom du produit:",
      price: "Prix:",
      currency: "Devise:",
      category: "Catégorie:",
      selectCategory: "Sélectionner une catégorie",
      chairs: "Chaises",
      tables: "Tables",
      sofas: "Canapés",
      beds: "Lits",
      storage: "Stockage",
      stockQuantity: "Quantité en stock:",
      description: "Description:",
      productImage: "Image du produit:",
      addProduct: "Ajouter le produit",
      edit: "Modifier",
      delete: "Supprimer",
      receipt: "Reçu",
      view: "Voir",
      language: "Langue:",
      selectLanguage: "Sélectionner la langue"
    },
    rw: {
      adminLogin: "Kwinjira Admin",
      secureAccess: "Kwinjira kw'ububiko bw'ubuyobozi",
      email: "Imeyili:",
      password: "Ijambo ry'ibanga:",
      login: "Kwinjira",
      logout: "Sohoka",
      dashboard: "Ikibaho",
      transactions: "Ibikorwa",
      visitors: "Abasura",
      products: "Ibicuruzwa",
      upload: "Ohereza",
      dashboardOverview: "Inyandiko y'ikibaho",
      totalTransactions: "Igiteranyo cy'ibikorwa",
      successfulPayments: "Kwishyura byagenze neza",
      pendingPayments: "Kwishyura biracyari",
      totalRevenue: "Amafaranga yose",
      websiteVisitors: "Abasura urubuga",
      totalProducts: "Igiteranyo cy'ibicuruzwa",
      recentTransactions: "Ibikorwa biheruka",
      transactionHistory: "Amateka y'ibikorwa",
      refresh: "Vugurura",
      loading: "Birakora...",
      productManagement: "Gukurikirana ibicuruzwa",
      uploadNewProduct: "Ohereza igicuruzwa gishya",
      productName: "Izina ry'igicuruzwa:",
      price: "Igiciro:",
      currency: "Ifaranga:",
      category: "Umutekano:",
      selectCategory: "Hitamo umutekano",
      chairs: "Intebe",
      tables: "Ama meza",
      sofas: "Ama sofa",
      beds: "Ama buriri",
      storage: "Ububiko",
      stockQuantity: "Umubare w'ibicuruzwa:",
      description: "Ibisobanura:",
      productImage: "Ifoto y'igicuruzwa:",
      addProduct: "Ongeraho igicuruzwa",
      edit: "Hindura",
      delete: "Siba",
      receipt: "Inyemezabuguzi",
      view: "Reba",
      language: "Ururimi:",
      selectLanguage: "Hitamo ururimi"
    }
  };

  const t = translations[language] || translations.en;

  // Mock data for demo
  useEffect(() => {
    if (isLoggedIn) {
      fetchTransactions();
      fetchVisitors();
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchTransactions = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTransactions([
        {
          id: "TXN001",
          phoneNumber: "+250783722764",
          amount: 720,
          status: "SUCCESSFUL",
          createdAt: new Date(),
          paymentDetails: { provider: "MTN Mobile Money" },
          customerInfo: { phoneNumber: "+250783722764", countryCode: "+250" },
          cartItems: [{ name: "Modern Chair", price: 720, quantity: 1 }],
          referenceId: "PATRICK_001"
        },
        {
          id: "TXN002", 
          phoneNumber: "+250724348302",
          amount: 840,
          status: "PENDING",
          createdAt: new Date(Date.now() - 86400000),
          paymentDetails: { provider: "Tigo Cash" },
          customerInfo: { phoneNumber: "+250724348302", countryCode: "+250" },
          cartItems: [{ name: "Dining Table", price: 840, quantity: 1 }],
          referenceId: "PATRICK_002"
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const fetchVisitors = async () => {
    setLoading(true);
    setTimeout(() => {
      setVisitors([
        { id: 1, ip: "192.168.1.100", country: "Rwanda", city: "Kigali", page: "/products", visitTime: new Date() },
        { id: 2, ip: "192.168.1.101", country: "Rwanda", city: "Butare", page: "/cart", visitTime: new Date(Date.now() - 3600000) },
        { id: 3, ip: "192.168.1.102", country: "Rwanda", city: "Gisenyi", page: "/", visitTime: new Date(Date.now() - 7200000) }
      ]);
      setLoading(false);
    }, 1000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch products");
    }
      setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "izabayopatrick24@gmail.com" && password === "Patrick@24") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView("dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, newProduct);
      setProducts((prev) => [...prev, res.data]);
    setNewProduct({
      name: "",
      price: "",
        currency: "RWF",
      category: "",
      stock: "",
      description: "",
      image: ""
    });
    setSelectedImage(null);
    setImagePreview(null);
    alert("Product added successfully!");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product: " + (err.response?.data?.error || err.message));
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/${productId}`);
        setProducts(products.filter(p => p._id !== productId && p.id !== productId));
        alert("Product deleted successfully!");
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product: " + (err.response?.data?.error || err.message));
      }
    }
  };

  const generateReceipt = (transaction) => {
    const receiptWindow = window.open('', '_blank', 'width=800,height=600');
    const receiptContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt - Patrick Furnitures</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f8f9fa;
          }
          .receipt {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 2rem;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 10px;
          }
          .receipt-title {
            font-size: 1.5rem;
            color: #1f2937;
            margin-bottom: 5px;
          }
          .receipt-subtitle {
            color: #6b7280;
            font-size: 1rem;
          }
          .receipt-number {
            background: #f3f4f6;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            margin-bottom: 20px;
            font-family: monospace;
            font-weight: bold;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 1.2rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 15px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
          }
          .detail-label {
            font-weight: 600;
            color: #6b7280;
          }
          .detail-value {
            color: #1f2937;
            font-weight: 500;
          }
          .amount {
            font-weight: 700;
            color: #059669;
            font-size: 1.1rem;
          }
          .status-success {
            color: #059669;
            font-weight: 600;
          }
          .status-pending {
            color: #d97706;
            font-weight: 600;
          }
          .status-failed {
            color: #dc2626;
            font-weight: 600;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .items-table th,
          .items-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }
          .items-table th {
            background: #f9fafb;
            font-weight: 600;
            color: #374151;
          }
          .item-image {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 4px;
          }
          .total-section {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .total-row.final {
            font-size: 1.2rem;
            font-weight: 700;
            color: #059669;
            border-top: 2px solid #e5e7eb;
            padding-top: 10px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 0.9rem;
          }
          .print-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
          }
          .print-btn:hover {
            background: #2563eb;
          }
          @media print {
            .print-btn {
              display: none;
            }
            body {
              background: white;
            }
            .receipt {
              box-shadow: none;
              border: 1px solid #e5e7eb;
            }
          }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">🖨️ Print Receipt</button>
        <div class="receipt">
          <div class="header">
            <div class="logo">🪑 Patrick Furnitures</div>
            <div class="receipt-title">Payment Receipt</div>
            <div class="receipt-subtitle">Thank you for your purchase!</div>
          </div>
          
          <div class="receipt-number">
            Receipt #${transaction.referenceId}
          </div>
          
          <div class="section">
            <div class="section-title">📋 Transaction Information</div>
            <div class="detail-row">
              <span class="detail-label">Transaction ID:</span>
              <span class="detail-value">#${transaction.id}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${new Date(transaction.createdAt).toLocaleString()}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="detail-value status-${transaction.status.toLowerCase()}">${transaction.status}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Order Number:</span>
              <span class="detail-value">${transaction.orderDetails?.orderNumber || 'N/A'}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">👤 Customer Information</div>
            <div class="detail-row">
              <span class="detail-label">Phone Number:</span>
              <span class="detail-value">${transaction.customerInfo?.phoneNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Country:</span>
              <span class="detail-value">${transaction.customerInfo?.countryCode || 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment Provider:</span>
              <span class="detail-value">${transaction.customerInfo?.paymentProvider}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">💳 Payment Details</div>
            <div class="detail-row">
              <span class="detail-label">Payment Method:</span>
              <span class="detail-value">${transaction.paymentDetails?.provider}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Transaction Type:</span>
              <span class="detail-value">${transaction.paymentDetails?.transactionType}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Merchant:</span>
              <span class="detail-value">${transaction.paymentDetails?.merchantName}</span>
            </div>
            ${transaction.paymentDetails?.confirmationCode ? `
            <div class="detail-row">
              <span class="detail-label">Confirmation Code:</span>
              <span class="detail-value">${transaction.paymentDetails.confirmationCode}</span>
            </div>
            ` : ''}
          </div>
          
          ${transaction.cartItems && transaction.cartItems.length > 0 ? `
          <div class="section">
            <div class="section-title">🛒 Items Purchased</div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${transaction.cartItems.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price * item.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="total-section">
              <div class="total-row final">
                <span>Total Amount:</span>
                <span class="amount">$${transaction.amount}</span>
              </div>
            </div>
          </div>
          ` : ''}
          
          <div class="footer">
            <p>Thank you for choosing Patrick Furnitures!</p>
            <p>For support: izabayopatrick24@gmail.com | +250783722764</p>
            <p>© 2024 Patrick Furnitures. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
  };

  const handleEditClick = (product) => {
    setEditProductId(product._id || product.id);
    setEditProduct({ ...product });
    setCurrentView('edit-product');
  };

  const handleEditProductChange = (field, value) => {
    setEditProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/${editProductId}`, editProduct);
      setProducts((prev) => prev.map((p) => (p._id === editProductId || p.id === editProductId) ? res.data : p));
      setEditProductId(null);
      setEditProduct(null);
      setCurrentView('products');
      alert("Product updated successfully!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product: " + (err.response?.data?.error || err.message));
    }
  };

  const handleCancelEdit = () => {
    setEditProductId(null);
    setEditProduct(null);
    setCurrentView('products');
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>🔐 Admin Login</h2>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Secure access to admin panel
          </p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button type="submit" className="login-btn">🔑 Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>🪑 Patrick Furnitures - Admin Panel</h2>
        <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
      </div>
      
      <div className="admin-nav">
        <button 
          className={`nav-btn ${currentView === "dashboard" ? "active" : ""}`}
          onClick={() => setCurrentView("dashboard")}
        >
          📊 Dashboard
        </button>
        <button 
          className={`nav-btn ${currentView === "transactions" ? "active" : ""}`}
          onClick={() => setCurrentView("transactions")}
        >
          💰 Transactions
        </button>
        <button 
          className={`nav-btn ${currentView === "visitors" ? "active" : ""}`}
          onClick={() => setCurrentView("visitors")}
        >
          👥 Visitors
        </button>
        <button 
          className={`nav-btn ${currentView === "products" ? "active" : ""}`}
          onClick={() => setCurrentView("products")}
        >
          📦 Products
        </button>
        <button 
          className={`nav-btn ${currentView === "upload" ? "active" : ""}`}
          onClick={() => setCurrentView("upload")}
        >
          📤 Upload
        </button>
      </div>
      
      <div className="admin-content">
        {currentView === "dashboard" && (
          <div className="dashboard">
            <h3>📊 Dashboard Overview</h3>
            
            <div className="dashboard-stats">
              <div className="stat-card">
                <h4>Total Transactions</h4>
                <div className="stat-number">{transactions.length}</div>
              </div>
              <div className="stat-card">
                <h4>Successful Payments</h4>
                <div className="stat-number success">
                  {transactions.filter(t => t.status === "SUCCESSFUL").length}
                </div>
              </div>
              <div className="stat-card">
                <h4>Pending Payments</h4>
                <div className="stat-number pending">
                  {transactions.filter(t => t.status === "PENDING").length}
                </div>
              </div>
              <div className="stat-card">
                <h4>Total Revenue</h4>
                <div className="stat-number revenue">
                  ${transactions.reduce((sum, t) => sum + t.amount, 0)}
                </div>
              </div>
              <div className="stat-card">
                <h4>Website Visitors</h4>
                <div className="stat-number visitors">{visitors.length}</div>
              </div>
              <div className="stat-card">
                <h4>Total Products</h4>
                <div className="stat-number products">{products.length}</div>
              </div>
            </div>
            
            <div className="recent-transactions">
              <h4>🕒 Recent Transactions</h4>
              {transactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="recent-transaction">
                  <div className="transaction-info">
                    <span className="transaction-id">#{transaction.id}</span>
                    <span className="customer-phone">{transaction.phoneNumber}</span>
                    <span className="amount">${transaction.amount}</span>
                    <span className={`status status-${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => generateReceipt(transaction)}
                    className="receipt-btn"
                  >
                    🧾 Receipt
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === "transactions" && (
          <div className="transactions-view">
            <div className="transactions-header">
              <h3>💰 Transaction History</h3>
              <button onClick={fetchTransactions} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
            
            {loading && <div className="loading">Loading transactions...</div>}
            
            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>#{transaction.id}</td>
                      <td>{transaction.phoneNumber}</td>
                      <td>${transaction.amount}</td>
                      <td>{transaction.paymentDetails?.provider}</td>
                      <td>
                        <span className={`status-badge status-${transaction.status.toLowerCase()}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          onClick={() => generateReceipt(transaction)}
                          className="action-btn receipt-btn"
                        >
                          🧾 Receipt
                        </button>
                        <button 
                          onClick={() => setCurrentView("transaction-details")}
                          className="action-btn view-btn"
                        >
                          👁️ View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentView === "visitors" && (
          <div className="visitors-view">
            <div className="visitors-header">
              <h3>👥 Website Visitors</h3>
              <button onClick={fetchVisitors} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
            
            {loading && <div className="loading">Loading visitors...</div>}
            
            <div className="visitors-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>IP Address</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Page Visited</th>
                    <th>Visit Time</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((visitor) => (
                    <tr key={visitor.id}>
                      <td>#{visitor.id}</td>
                      <td>{visitor.ip}</td>
                      <td>{visitor.country}</td>
                      <td>{visitor.city}</td>
                      <td>{visitor.page}</td>
                      <td>{new Date(visitor.visitTime).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentView === "products" && (
          <div className="products-view">
            <div className="products-header">
              <h3>📦 Product Management</h3>
              <button onClick={fetchProducts} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
            
            {loading && <div className="loading">Loading products...</div>}
            
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id || product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-price">${product.price}</p>
                    <p className="product-category">{product.category}</p>
                    <p className="product-stock">Stock: {product.stock}</p>
                  </div>
                  <div className="product-actions">
                    <button className="edit-btn" onClick={() => handleEditClick(product)}>✏️ Edit</button>
                    <button 
                      onClick={() => deleteProduct(product._id || product.id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === "edit-product" && editProduct && (
          <div className="edit-section">
            <h3>✏️ Edit Product</h3>
            <form onSubmit={handleEditProductSubmit} className="edit-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name:</label>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={e => handleEditProductChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    value={editProduct.price}
                    onChange={e => handleEditProductChange('price', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Currency:</label>
                  <select
                    value={editProduct.currency}
                    onChange={e => handleEditProductChange('currency', e.target.value)}
                    required
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} - {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    value={editProduct.category}
                    onChange={e => handleEditProductChange('category', e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Tables">Tables</option>
                    <option value="Sofas">Sofas</option>
                    <option value="Beds">Beds</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Stock Quantity:</label>
                <input
                  type="number"
                  value={editProduct.stock}
                  onChange={e => handleEditProductChange('stock', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={editProduct.description}
                  onChange={e => handleEditProductChange('description', e.target.value)}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Product Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setEditProduct(prev => ({ ...prev, image: e.target.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {editProduct.image && (
                  <div style={{ marginTop: '10px' }}>
                    <img 
                      src={editProduct.image} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '200px', 
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb'
                      }} 
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="edit-btn">💾 Save Changes</button>
              <button type="button" className="cancel-btn" onClick={handleCancelEdit} style={{marginLeft: '10px'}}>Cancel</button>
            </form>
          </div>
        )}

        {currentView === "upload" && (
          <div className="upload-section">
            <h3>📤 Upload New Product</h3>
            <form onSubmit={handleProductSubmit} className="upload-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name:</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Currency:</label>
                  <select
                    value={newProduct.currency}
                    onChange={(e) => setNewProduct({...newProduct, currency: e.target.value})}
                    required
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} - {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Chairs">Chairs</option>
                    <option value="Tables">Tables</option>
                    <option value="Sofas">Sofas</option>
                    <option value="Beds">Beds</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Stock Quantity:</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Product Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedImage(file);
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setImagePreview(e.target.result);
                        setNewProduct({...newProduct, image: e.target.result});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  required
                />
                {imagePreview && (
                  <div style={{ marginTop: '10px' }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '200px', 
                        maxHeight: '200px', 
                        borderRadius: '8px',
                        border: '2px solid #e5e7eb'
                      }} 
                    />
                  </div>
                )}
              </div>
              
              <button type="submit" className="upload-btn">📤 Add Product</button>
            </form>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminPanel;