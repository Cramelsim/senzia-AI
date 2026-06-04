import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ borderBottom: '1px solid var(--border-subtle)', background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SENZIA <span style={{ fontWeight: 400, color: '#a1a1aa' }}>AI</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
            <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Pricing</Link>
          </div>
          <Link to="/demo">
            <button style={{ background: 'var(--accent-purple)', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '40px', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
              Book Demo
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;