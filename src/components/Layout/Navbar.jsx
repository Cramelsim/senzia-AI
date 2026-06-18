import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path
      d="M9 9 L27 9 L27 16 L13 16 L13 20 L27 20 L27 27 L9 27 L9 20 L23 20 L23 16 L9 16 Z"
      fill="var(--accent-gold)"
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'var(--accent-purple)', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: 'white'
          }}>
            S
          </div>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#1a1a1a',
            letterSpacing: '-0.02em'
          }}>
            SENZIA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/product" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>Product</Link>
          <Link to="/ai-consulting" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>AI Consulting & Training</Link>
          <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>About Us</Link>
          <Link to="/pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>Pricing</Link>
          <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>Contact</Link>
          <Link to="/demo">
            <button className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.95rem' }}>
              Book a Demo
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;