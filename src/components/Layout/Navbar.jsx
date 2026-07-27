import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const LogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="8" fill="var(--accent-gold, #f0c987)" />
    <text x="18" y="26" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="800" fill="#1a1408" textAnchor="middle">S</text>
  </svg>
);

const NAV_LINKS = [
  { to: '/product', label: 'Product' },
  { to: '/ai-consulting', label: 'AI Consulting & Training' },
  { to: '/about', label: 'About Us' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="site-navbar">
      <div className="container site-navbar-inner">
        <Link to="/" className="site-navbar-brand">
          <LogoMark />
          <span className="site-navbar-wordmark">SENZIA</span>
        </Link>

        {/* Desktop nav */}
        <div className="site-navbar-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`site-navbar-link${isActive(link.to) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/dashboard">
            <button className="btn-outline-gold">Book a Demo</button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="site-navbar-mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((o) => !o)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="site-navbar-mobile-panel">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`site-navbar-mobile-link${isActive(link.to) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            <button className="btn-outline-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
              Book a Demo
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;