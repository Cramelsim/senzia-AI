import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const SetupComplete = () => {
  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.5rem' }}>
            Setup Complete!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Your AI-powered business intelligence system is ready to help you grow.
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            {['Account Created', 'Plan Activated', 'Onboarding', 'Data Connected', 'AI Configuration'].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f0fdf4', borderRadius: '8px' }}>
                <span style={{ color: '#22c55e', fontSize: '1.2rem' }}>✓</span>
                <span style={{ color: '#1a1a1a' }}>{item}</span>
              </div>
            ))}
          </div>
          
          <Link to="/dashboard">
            <button style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}>
              Go to Dashboard →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SetupComplete;