import React from 'react';
import { Link } from 'react-router-dom';

const Insights = () => {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.75rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'white'
              }}>
                SZ
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>SENZIA</span>
            </Link>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginLeft: '1rem' }}>
              <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
              <Link to="/data-sources" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Data Sources</Link>
              <Link to="/reports" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Reports</Link>
              <Link to="/ai-assistant" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>AI Assistant</Link>
              <Link to="/insights" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Insights</Link>
              <Link to="/settings" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Settings</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Insights</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Discover what's happening in your business.</p>
        
        <div style={{ 
          marginTop: '2rem',
          padding: '4rem 2rem',
          textAlign: 'center',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💡</div>
          <h2 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>Insights Coming Soon</h2>
          <p style={{ color: 'var(--text-secondary)' }}>This page is under development. Check back soon!</p>
        </div>
      </div>
    </div>
  );
};
