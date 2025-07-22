import React, { useState } from 'react';

const LanguageSelector = ({ onLanguageChange, currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="language-selector">
      <button 
        className="language-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flag">{currentLang.flag}</span>
        <span className="language-name">{currentLang.name}</span>
        <span className="arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          <div className="language-search">
            <input 
              type="text" 
              placeholder="Search language..."
              className="search-input"
            />
          </div>
          <div className="language-list">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
                onClick={() => {
                  onLanguageChange(language.code);
                  setIsOpen(false);
                }}
              >
                <span className="flag">{language.flag}</span>
                <span className="language-name">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 