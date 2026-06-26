import React from 'react';
import Navbar from '../components/Layout/Navbar';

const Demo = () => {
  return (
    <div>
      <Navbar />
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto',
          background: 'var(--bg-card)',
          padding: '3rem',
          borderRadius: '20px',
          border: '1px solid var(--border-subtle)'
        }}>
          <h1 style={{ 
            color: 'white', 
            textAlign: 'center', 
            marginBottom: '0.5rem',
            fontSize: '2.5rem'
          }}>
            Book a Demo 🚀
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            textAlign: 'center', 
            marginBottom: '2rem' 
          }}>
            See how SENZIA AI can transform your business
          </p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Full Name" 
              style={{ 
                padding: '0.75rem', 
                background: 'var(--bg-elevated)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: '12px', 
                color: 'white',
                outline: 'none'
              }}
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              style={{ 
                padding: '0.75rem', 
                background: 'var(--bg-elevated)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: '12px', 
                color: 'white',
                outline: 'none'
              }}
            />
            <input 
              type="text" 
              placeholder="Company Name" 
              style={{ 
                padding: '0.75rem', 
                background: 'var(--bg-elevated)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: '12px', 
                color: 'white',
                outline: 'none'
              }}
            />
            <select 
              style={{ 
                padding: '0.75rem', 
                background: 'var(--bg-elevated)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: '12px', 
                color: 'white',
                outline: 'none'
              }}
            >
              <option value="">Select Industry</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail</option>
              <option value="logistics">Logistics</option>
              <option value="hospitality">Hospitality</option>
              <option value="other">Other</option>
            </select>
            <button 
              type="submit"
              style={{ 
                background: 'var(--accent-purple)', 
                border: 'none', 
                padding: '0.75rem', 
                borderRadius: '12px', 
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              Schedule Demo
            </button>
          </form>
          
          <p style={{ 
            color: 'var(--text-secondary)', 
            textAlign: 'center', 
            marginTop: '1.5rem',
            fontSize: '0.9rem'
          }}>
            No credit card required • Free 14-day trial
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;