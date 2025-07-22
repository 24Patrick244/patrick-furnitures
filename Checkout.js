import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const Checkout = ({ total, onConfirm, currency, convert, symbol, cartItems }) => {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [processing, setProcessing] = useState(false);
  const [showUssd, setShowUssd] = useState(false);
  const [error, setError] = useState(null);
  const [completedTransaction, setCompletedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // USSD codes for direct payment
  const ussdCodes = {
    momo: "*182*1*1*0783722764#",
    tigo: "*150*1*1*0724348302#"
  };

  const paymentOptions = [
    { value: "momo", label: "MTN Mobile Money", ussd: ussdCodes.momo },
    { value: "tigo", label: "Tigo Cash", ussd: ussdCodes.tigo }
  ];

  // const selectedPayment = paymentOptions.find(option => option.value === paymentMethod);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError(t('checkout.selectPayment'));
      return;
    }
    
    // Show USSD code immediately
    setShowUssd(true);
    setProcessing(false);
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
              <span class="detail-value status-success">${transaction.status}</span>
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
                    <td>
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${item.image}" alt="${item.name}" class="item-image" />
                        <span>${item.name}</span>
                      </div>
                    </td>
                    <td>$${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price * item.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : ''}
          
          <div class="total-section">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>$${transaction.orderDetails?.subtotal || transaction.amount}</span>
            </div>
            <div class="total-row">
              <span>Tax:</span>
              <span>$${transaction.orderDetails?.tax || 0}</span>
            </div>
            <div class="total-row final">
              <span>Total Amount:</span>
              <span class="amount">$${transaction.orderDetails?.total || transaction.amount}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing Patrick Furnitures!</p>
            <p>For any questions, please contact us at +250783722764</p>
            <p>This receipt serves as proof of payment</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
  };

  const handlePaymentComplete = (transaction) => {
    setCompletedTransaction(transaction);
    setShowReceipt(true);
    setTimeout(() => {
      onConfirm();
    }, 3000);
  };

  const handleUssdConfirm = async () => {
    setProcessing(true);
    
    try {
      // Create a demo transaction
      const transaction = {
        id: Date.now(),
        referenceId: `PATRICK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        phoneNumber: paymentMethod === 'momo' ? '+250783722764' : '+250724348302',
        amount: total,
        status: 'SUCCESSFUL',
        paymentMethod: paymentMethod,
        createdAt: new Date().toISOString(),
        customerInfo: {
          phoneNumber: paymentMethod === 'momo' ? '+250783722764' : '+250724348302',
          countryCode: '+250',
          paymentProvider: paymentOptions.find(option => option.value === paymentMethod)?.label
        },
        paymentDetails: {
          provider: paymentOptions.find(option => option.value === paymentMethod)?.label,
          transactionType: 'PAYMENT',
          merchantName: 'Patrick Furnitures',
          confirmationCode: `CONF${Date.now()}`
        },
        orderDetails: {
          orderNumber: `ORD${Date.now()}`,
          subtotal: total,
          tax: 0,
          total: total
        },
        cartItems: cartItems
      };

      // Simulate payment processing
    setTimeout(() => {
        setProcessing(false);
        handlePaymentComplete(transaction);
      }, 2000);

    } catch (error) {
      setProcessing(false);
      setError('Payment processing failed. Please try again.');
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>Total: <strong>{symbol}{convert(total)}</strong></p>
      
      {error && (
        <div className="payment-error">
          <p>❌ {error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      {showReceipt && completedTransaction ? (
        <div className="receipt-section">
          <div className="receipt-success">
            <h3>🎉 Payment Successful!</h3>
            <p>Your payment has been completed successfully.</p>
            <div className="receipt-actions">
              <button 
                onClick={() => generateReceipt(completedTransaction)}
                className="receipt-btn"
              >
                🧾 View & Print Receipt
              </button>
              <button 
                onClick={() => {
                  setShowReceipt(false);
                  onConfirm();
                }}
                className="continue-btn"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : showUssd ? (
        <div className="ussd-payment">
          <h3>{paymentOptions.find(option => option.value === paymentMethod)?.label} Payment</h3>
          <div className="ussd-code">
            <p>Please dial this USSD code on your phone:</p>
            <div className="ussd-display">
              <span className="ussd-number">{paymentOptions.find(option => option.value === paymentMethod)?.ussd}</span>
              <button 
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(paymentOptions.find(option => option.value === paymentMethod)?.ussd || '');
                  alert('USSD code copied to clipboard!');
                }}
              >
                Copy
              </button>
            </div>
            <div className="ussd-instructions">
              <h4>Instructions:</h4>
              <ol>
                <li>Dial the USSD code above on your phone</li>
                <li>Enter the amount: <strong>{symbol}{convert(total)}</strong></li>
                <li>Enter your PIN to confirm payment</li>
                <li>Click "Confirm Payment" below once completed</li>
              </ol>
            </div>
            <div className="payment-details">
              <p><strong>Amount:</strong> {symbol}{convert(total)}</p>
              <p><strong>Recipient:</strong> Patrick Furnitures</p>
              <p><strong>Reference:</strong> PATRICK-{Date.now()}</p>
            </div>
            <div className="ussd-actions">
              <button 
                className="ussd-confirm-btn"
                onClick={handleUssdConfirm}
                disabled={processing}
              >
                {processing ? "Processing..." : "Confirm Payment"}
              </button>
              <button 
                className="ussd-cancel-btn"
                onClick={() => {
                  setShowUssd(false);
                  setProcessing(false);
                  setPaymentMethod("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePayment}>
          <div className="payment-options">
            {paymentOptions.map((option) => (
              <label key={option.value} className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={() => setPaymentMethod(option.value)}
                  required
                />
                <span className="payment-label">{option.label}</span>
                <span className="payment-note">(USSD payment)</span>
              </label>
            ))}
          </div>
          <button type="submit" disabled={processing || !paymentMethod} className="pay-btn">
            {processing ? "Processing..." : "Get USSD Code"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout; 