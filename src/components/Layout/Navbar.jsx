import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoMark, Wordmark } from './Logo';
import './Navbar.css';

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
          <LogoMark size={32} />
          <Wordmark size="1.4rem" />
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