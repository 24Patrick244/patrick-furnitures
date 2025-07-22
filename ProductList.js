import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const ProductList = ({ products, onAddToCart, currency, convert, symbol }) => {
  const { t } = useTranslation();
  const [ratings, setRatings] = useState({});

  const handleRate = (productId, value) => {
    setRatings((prev) => {
      const prevRatings = prev[productId] || [];
      return { ...prev, [productId]: [...prevRatings, value] };
    });
  };

  const getAverage = (arr) => {
    if (!arr || arr.length === 0) return null;
    return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
  };

  return (
    <div className="product-list">
      {products.map((product) => {
        const productRatings = ratings[product.id] || [];
        const avg = getAverage(productRatings);
        return (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="product-footer">
              <span className="product-price">{symbol}{convert(product.price)}</span>
              <button onClick={() => onAddToCart(product)}>{t('products.addToCart')}</button>
            </div>
            <div className="product-rating">
              <span>{t('products.rate')}: </span>
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  className="star-btn"
                  onClick={() => handleRate(product.id, star)}
                  aria-label={`${t('products.rate')} ${star} ${t('products.star')}${star > 1 ? 's' : ''}`}
                >
                  {star}★
                </button>
              ))}
              {avg && <span className="avg-rating">{t('products.avg')}: {avg} / 5</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList; 