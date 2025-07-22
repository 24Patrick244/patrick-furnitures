import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const AdminLogin = ({ onLogin }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check credentials
    if (email === "izabayopatrick24@gmail.com" && password === "Patrick@24") {
      setError("");
      onLogin();
    } else {
      setError(t('admin.login.error'));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h2>🔐 {t('admin.login.title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t('admin.login.email')}:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('admin.login.emailPlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label>{t('admin.login.password')}:</label>
            <div className="password-input-group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('admin.login.passwordPlaceholder')}
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-btn">{t('admin.login.submit')}</button>
        </form>
        <div className="login-info">
          <p><strong>{t('admin.login.demoCredentials')}:</strong></p>
          <p>{t('admin.login.demoEmail')}: izabayopatrick24@gmail.com</p>
          <p>{t('admin.login.demoPassword')}: Patrick@24</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 