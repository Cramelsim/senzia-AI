import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './Content.css';

const ApiDocs = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <div className="content-page">
      <Navbar />
      <main className="content-main">
        <div className="content-narrow">
          <p className="content-eyebrow">Developers</p>
          <h1 className="content-title">API documentation</h1>
          <p className="content-lead">
            The public Senzia API reference is still being finalised. Leave your email and we'll let you know as soon as it's ready,
            or tell us what you want to build and we'll help you directly.
          </p>

          <div className="content-card">
            {sent ? (
              <p className="content-success">Thanks. We'll email {email.trim()} when the documentation is published.</p>
            ) : (
              <form className="content-form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="api-email" style={{ fontSize: '0.85rem', color: 'var(--content-muted)' }}>Email address</label>
                <input id="api-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
                {error && <p className="content-error" role="alert">{error}</p>}
                <button type="submit" className="content-btn primary" style={{ justifySelf: 'start' }}>Notify me</button>
              </form>
            )}
          </div>

          <div className="content-actions">
            <Link to="/contact" className="content-btn outline">Talk to our team <ArrowRight size={15} /></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiDocs;
