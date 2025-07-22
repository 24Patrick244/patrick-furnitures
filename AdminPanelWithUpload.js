import React, { useState, useEffect } from "react";

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
    category: "",
    stock: "",
    description: "",
    image: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Modern Chair", price: 720, category: "Chairs", stock: 15, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400" },
        { id: 2, name: "Dining Table", price: 840, category: "Tables", stock: 8, image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=400" },
        { id: 3, name: "Comfortable Sofa", price: 1200, category: "Sofas", stock: 12, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" }
      ]);
      setLoading(false);
    }, 1000);
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

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const newId = products.length + 1;
    const productToAdd = {
      ...newProduct,
      id: newId,
      price: parseFloat(newProduct.price)
    };
    setProducts([...products, productToAdd]);
    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      image: ""
    });
    setSelectedImage(null);
    setImagePreview(null);
    alert("Product added successfully!");
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== productId));
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
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-price">${product.price}</p>
                    <p className="product-category">{product.category}</p>
                    <p className="product-stock">Stock: {product.stock}</p>
                  </div>
                  <div className="product-actions">
                    <button className="edit-btn">✏️ Edit</button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
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
                  <label>Price ($):</label>
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
                <div className="form-group">
                  <label>Stock Quantity:</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    required
                  />
                </div>
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