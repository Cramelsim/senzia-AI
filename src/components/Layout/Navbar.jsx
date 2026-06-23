import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/product', label: 'Product' },
    { to: '/ai-consulting', label: 'AI Consulting & Training' },
    { to: '/about', label: 'About Us' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/contact', label: 'Contact' },
  ];

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
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/demo">
            <button className="btn-outline" style={{ padding: '0.5rem 1.5rem', fontSize: '0.95rem' }}>
              Book a Demo
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const LogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <path
      d="M9 9 L27 9 L27 16 L13 16 L13 20 L27 20 L27 27 L9 27 L9 20 L23 20 L23 16 L9 16 Z"
      fill="var(--accent-gold)"
    />
  </svg>
);

export default Navbar;