import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ borderBottom: '1px solid #2a2a2f', background: 'rgba(5,5,5,0.95)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50, padding: '1rem 2rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SENZIA <span style={{ fontWeight: 400, color: '#a1a1aa', WebkitTextFillColor: '#a1a1aa' }}>AI</span>
          </h1>
        </Link>
        <div>
          <Link to="/" style={{ color: '#a1a1aa', textDecoration: 'none', marginLeft: '2rem' }}>Home</Link>
          <Link to="/dashboard" style={{ color: '#a1a1aa', textDecoration: 'none', marginLeft: '2rem' }}>Dashboard</Link>
          <Link to="/pricing" style={{ color: '#a1a1aa', textDecoration: 'none', marginLeft: '2rem' }}>Pricing</Link>
          <Link to="/demo">
            <button style={{ background: '#a855f7', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '40px', color: 'white', fontWeight: 600, marginLeft: '2rem', cursor: 'pointer' }}>
              Book Demo
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;