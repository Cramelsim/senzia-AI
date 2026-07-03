import React from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Navigation */}
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
           