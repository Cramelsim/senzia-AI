import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/product', label: 'Product' },
    { to: '/ai-consulting', label: 'AI Consulting & Training' },
    { to: '/about', label: 'About Us' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/resources', label: 'Resources' },
    { to: '/contact', label: 'Contact' },
  ];

  const LogoMark = () => (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#7c3aed" />
      <text x="18" y="26" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="800" fill="white" textAnchor="middle">S</text>
    </svg>
  );

  return (
    <nav
      style={{
        background: 'var(--bg-dark)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.75rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <LogoMark />
          <span
            style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '0.08em',
            }}
          >
            SENZIA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: isActive(link.to) ? '#7c3aed' : 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                position: 'relative'
              }}
            >
              {link.label}
              {isActive(link.to) && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#7c3aed',
                    borderRadius: '2px'
                  }}
                />
              )}
            </Link>
          ))}

          <Link to="/demo">
            <button className="btn-outline" style={{ padding: '0.5rem 1.5rem', fontSize: '0.95rem' }}>
              Book a Demo
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'none'
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-dark)',
            padding: '1rem 0',
            borderBottom: '1px solid var(--border-subtle)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'block'
          }}
        >
          <div className="container">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem 0',
                  color: isActive(link.to) ? '#7c3aed' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/demo" onClick={() => setIsOpen(false)}>
              <button className="btn-outline" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}>
                Book a Demo
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;