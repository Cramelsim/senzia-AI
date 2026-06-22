import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/product', label: 'Product' },
    { path: '/about', label: 'About Us' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ 
      background: 'white', 
      borderBottom: '1px solid #e5e7eb',
      padding: '0.75rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        {/* Logo */}
        <Link to="/" style={{ 
          textDecoration: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem' 
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', 
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.2rem',
            color: 'white',
            letterSpacing: '-0.02em',
            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
          }}>
            SZ
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
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          alignItems: 'center',
          display: { xs: 'none', md: 'flex' }
        }}>
          {/* Product Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <Link 
              to="/product" 
              style={{ 
                color: isActive('/product') ? '#7c3aed' : 'var(--text-secondary)', 
                textDecoration: 'none', 
                fontSize: '0.95rem', 
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'color 0.2s ease'
              }}
            >
              Product
              <ChevronDown size={16} style={{ 
                transform: isProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} />
            </Link>
            
            {/* Dropdown Menu */}
            {isProductsOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                left: '0',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                border: '1px solid #f0f0f0',
                minWidth: '220px',
                padding: '0.5rem',
                zIndex: 100
              }}>
                <Link to="/product" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  borderRadius: '8px',
                  transition: 'background 0.2s ease'
                }}>
                  Overview
                </Link>
                <Link to="/product#features" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  borderRadius: '8px',
                  transition: 'background 0.2s ease'
                }}>
                  Features
                </Link>
                <Link to="/product#capabilities" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  borderRadius: '8px',
                  transition: 'background 0.2s ease'
                }}>
                  Capabilities
                </Link>
                <div style={{ 
                  height: '1px', 
                  background: '#f0f0f0', 
                  margin: '0.25rem 0' 
                }} />
                <Link to="/ai-consulting" style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  borderRadius: '8px',
                  transition: 'background 0.2s ease'
                }}>
                  AI Consulting & Training
                </Link>
              </div>
            )}
          </div>

          {/* Other Nav Links */}
          {navLinks.map((link) => {
            if (link.label === 'Product') return null; // Skip Product since we have dropdown
            return (
              <Link 
                key={link.path}
                to={link.path} 
                style={{ 
                  color: isActive(link.path) ? '#7c3aed' : 'var(--text-secondary)', 
                  textDecoration: 'none', 
                  fontSize: '0.95rem', 
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  position: 'relative'
                }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '0',
                    right: '0',
                    height: '2px',
                    background: '#7c3aed',
                    borderRadius: '2px'
                  }} />
                )}
              </Link>
            );
          })}

          {/* Book Demo Button */}
          <Link to="/demo">
            <button style={{ 
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              border: 'none',
              padding: '0.6rem 1.75rem',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(124, 58, 237, 0.25)'
            }}>
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
            display: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            '@media (max-width: 768px)': { display: 'block' }
          }}
        >
          {isOpen ? <X size={24} color="#1a1a1a" /> : <Menu size={24} color="#1a1a1a" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          padding: '1rem 0',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          display: 'none',
          '@media (max-width: 768px)': { display: 'block' }
        }}>
          <div className="container">
            <Link to="/product" style={{
              display: 'block',
              padding: '0.75rem 0',
              color: '#1a1a1a',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #f3f4f6'
            }}>
              Product
            </Link>
            <Link to="/ai-consulting" style={{
              display: 'block',
              padding: '0.75rem 0',
              color: '#1a1a1a',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #f3f4f6'
            }}>
              AI Consulting & Training
            </Link>
            <Link to="/about" style={{
              display: 'block',
              padding: '0.75rem 0',
              color: '#1a1a1a',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #f3f4f6'
            }}>
              About Us
            </Link>
            <Link to="/pricing" style={{
              display: 'block',
              padding: '0.75rem 0',
              color: '#1a1a1a',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #f3f4f6'
            }}>
              Pricing
            </Link>
            <Link to="/contact" style={{
              display: 'block',
              padding: '0.75rem 0',
              color: '#1a1a1a',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #f3f4f6'
            }}>
              Contact
            </Link>
            <Link to="/demo">
              <button style={{ 
                width: '100%',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                marginTop: '1rem',
                cursor: 'pointer'
              }}>
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