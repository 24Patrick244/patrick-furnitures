import React, { useState, useEffect } from "react";

const API_BASE_URL = 'http://localhost:5000';

const TransactionHistory = ({ currency, convert, symbol }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/transactions`);
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.transactions);
        setSummary(data.summary);
      } else {
        setError('Failed to fetch transactions');
      }
    } catch (error) {
      setError('Error loading transactions');
      console.error('Fetch transactions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTransactions = async (phoneNumber) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/transactions/phone/${phoneNumber}`);
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.transactions);
        setSummary(data.summary);
      } else {
        setError('Failed to fetch user transactions');
      }
    } catch (error) {
      setError('Error loading user transactions');
      console.error('Fetch user transactions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchPhone.trim()) {
      fetchUserTransactions(searchPhone);
    } else {
      fetchTransactions();
    }
  };

  const handleFilter = (status) => {
    setFilter(status);
    if (status === 'all') {
      fetchTransactions();
    } else {
      const filtered = transactions.filter(t => t.status === status.toUpperCase());
      setTransactions(filtered);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESSFUL':
        return '#10b981';
      case 'PENDING':
        return '#f59e0b';
      case 'FAILED':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESSFUL':
        return '✅';
      case 'PENDING':
        return '⏳';
      case 'FAILED':
        return '❌';
      default:
        return '❓';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount, currency) => {
    return `${symbol}${convert(amount)}`;
  };

  const openTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
  };

  const closeTransactionDetails = () => {
    setShowDetails(false);
    setSelectedTransaction(null);
  };

  if (loading) {
    return (
      <div className="transaction-history">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-history">
      <div className="transaction-header">
        <h2>📊 Transaction History</h2>
        <p>Complete record of all payment transactions</p>
      </div>

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={fetchTransactions}>Retry</button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Transactions</h3>
          <p className="summary-number">{summary.total || 0}</p>
        </div>
        <div className="summary-card success">
          <h3>Successful</h3>
          <p className="summary-number">{summary.successful || 0}</p>
        </div>
        <div className="summary-card pending">
          <h3>Pending</h3>
          <p className="summary-number">{summary.pending || 0}</p>
        </div>
        <div className="summary-card failed">
          <h3>Failed</h3>
          <p className="summary-number">{summary.failed || 0}</p>
        </div>
        <div className="summary-card total">
          <h3>Total Amount</h3>
          <p className="summary-number">{formatCurrency(summary.totalAmount || 0, currency)}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="transaction-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by phone number..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">Search</button>
          <button onClick={fetchTransactions} className="clear-btn">Clear</button>
        </div>
        
        <div className="filter-section">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'successful' ? 'active' : ''}`}
            onClick={() => handleFilter('successful')}
          >
            Successful
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => handleFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'failed' ? 'active' : ''}`}
            onClick={() => handleFilter('failed')}
          >
            Failed
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="no-transactions">
            <p>📭 No transactions found</p>
            <p>Make some payments to see transaction history</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-header-row">
                <div className="transaction-id">
                  <span className="transaction-number">#{transaction.id}</span>
                  <span className="reference-id">{transaction.referenceId}</span>
                </div>
                <div className="transaction-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(transaction.status) + '20', color: getStatusColor(transaction.status) }}
                  >
                    {getStatusIcon(transaction.status)} {transaction.status}
                  </span>
                </div>
              </div>
              
              <div className="transaction-details">
                <div className="detail-row">
                  <span className="detail-label">Phone Number:</span>
                  <span className="detail-value">{transaction.phoneNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value amount">{formatCurrency(transaction.amount, transaction.currency)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method:</span>
                  <span className="detail-value">{transaction.paymentDetails?.provider || transaction.paymentMethod}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formatDate(transaction.createdAt)}</span>
                </div>
                {transaction.cartItems && transaction.cartItems.length > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">Items:</span>
                    <span className="detail-value">{transaction.cartItems.length} items</span>
                  </div>
                )}
              </div>
              
              <div className="transaction-actions">
                <button 
                  onClick={() => openTransactionDetails(transaction)}
                  className="view-details-btn"
                >
                  View Full Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transaction Details Modal */}
      {showDetails && selectedTransaction && (
        <div className="modal-overlay" onClick={closeTransactionDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Transaction Details</h3>
              <button onClick={closeTransactionDetails} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h4>📋 Basic Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Transaction ID:</label>
                    <span>{selectedTransaction.id}</span>
                  </div>
                  <div className="detail-item">
                    <label>Reference ID:</label>
                    <span>{selectedTransaction.referenceId}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span style={{ color: getStatusColor(selectedTransaction.status) }}>
                      {getStatusIcon(selectedTransaction.status)} {selectedTransaction.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Amount:</label>
                    <span className="amount">{formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>👤 Customer Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Phone Number:</label>
                    <span>{selectedTransaction.customerInfo?.phoneNumber}</span>
                  </div>
                  <div className="detail-item">
                    <label>Country Code:</label>
                    <span>{selectedTransaction.customerInfo?.countryCode}</span>
                  </div>
                  <div className="detail-item">
                    <label>Payment Provider:</label>
                    <span>{selectedTransaction.customerInfo?.paymentProvider}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>💳 Payment Details</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Provider:</label>
                    <span>{selectedTransaction.paymentDetails?.provider}</span>
                  </div>
                  <div className="detail-item">
                    <label>Method:</label>
                    <span>{selectedTransaction.paymentDetails?.method}</span>
                  </div>
                  <div className="detail-item">
                    <label>Transaction Type:</label>
                    <span>{selectedTransaction.paymentDetails?.transactionType}</span>
                  </div>
                  <div className="detail-item">
                    <label>Merchant:</label>
                    <span>{selectedTransaction.paymentDetails?.merchantName}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>📦 Order Details</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Order Number:</label>
                    <span>{selectedTransaction.orderDetails?.orderNumber}</span>
                  </div>
                  <div className="detail-item">
                    <label>Total Items:</label>
                    <span>{selectedTransaction.orderDetails?.totalItems}</span>
                  </div>
                  <div className="detail-item">
                    <label>Subtotal:</label>
                    <span>{formatCurrency(selectedTransaction.orderDetails?.subtotal, selectedTransaction.currency)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Total:</label>
                    <span className="amount">{formatCurrency(selectedTransaction.orderDetails?.total, selectedTransaction.currency)}</span>
                  </div>
                </div>
              </div>

              {selectedTransaction.cartItems && selectedTransaction.cartItems.length > 0 && (
                <div className="detail-section">
                  <h4>🛒 Cart Items</h4>
                  <div className="cart-items-list">
                    {selectedTransaction.cartItems.map((item, index) => (
                      <div key={index} className="cart-item">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">{formatCurrency(item.price * item.quantity, selectedTransaction.currency)}</span>
                          <span className="item-quantity">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-section">
                <h4>⏰ Timestamps</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Created:</label>
                    <span>{formatDate(selectedTransaction.createdAt)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Updated:</label>
                    <span>{formatDate(selectedTransaction.updatedAt)}</span>
                  </div>
                  {selectedTransaction.completedAt && (
                    <div className="detail-item">
                      <label>Completed:</label>
                      <span>{formatDate(selectedTransaction.completedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory; 