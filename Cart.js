import React from "react";
import { useTranslation } from 'react-i18next';

const Cart = ({ cartItems, onRemoveFromCart, onCheckout, currency, convert, symbol }) => {
  const { t } = useTranslation();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>{t('cart.title')}</h2>
      {cartItems.length === 0 ? (
        <p>{t('cart.empty')}</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <span>{item.name}</span>
                  <span>{t('cart.quantity')}: {item.quantity}</span>
                  <span>{symbol}{convert(item.price * item.quantity)}</span>
                  <button onClick={() => onRemoveFromCart(item.id)}>{t('cart.remove')}</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>{t('cart.total')}: {symbol}{convert(total)}</strong>
          </div>
          <button onClick={onCheckout}>{t('cart.checkout')}</button>
        </div>
      )}
    </div>
  );
};

export default Cart; 