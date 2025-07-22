import React from 'react';
import './Home.css';

const Home = ({ onNavigate }) => {
  return (
    <div className="home">
      {/* Rest of your home page content */}
      <div className="hero-section">
        <h1>Welcome to Patrick Furnitures</h1>
        <p>Quality furniture for your home</p>
        <button onClick={() => onNavigate('products')}>Shop Now</button>
      </div>
      
      {/* Add your existing home page content here */}
    </div>
  );
};

export default Home;
