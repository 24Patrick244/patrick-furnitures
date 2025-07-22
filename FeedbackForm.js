import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const FeedbackForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && message) {
      onSubmit({ email, message });
      setEmail("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="feedback-form">
      <h3>{t('feedback.title')}</h3>
      {submitted && <div className="feedback-success">{t('feedback.success')}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={t('feedback.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder={t('feedback.message')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">{t('feedback.submit')}</button>
      </form>
    </div>
  );
};

export default FeedbackForm; 