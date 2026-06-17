import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const companies = ['Safaricom', 'EQUITY', 'KCB', 'NCBA', 'absa'];

  return (
    <section style={{ 
      padding: '5rem 0 4rem',
      background: 'linear-gradient(135deg, #faf5ff 0%, #ffffff 50%, #f3f4f6 100%)'
    }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            color: '#1a1a1a'
          }}>
            Intelligence. <br />Automation. Growth.
          </h1>
          
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.6'
          }}>
            Senzia is an AI-powered Business Intelligence platform that combines real-time data, 
            advanced analytics, and financial expertise to help businesses increase profitability, 
            detect risks, automate operations, and uncover new growth opportunities.
          </p>

          <Link to="/get-started">
            <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '0.875rem 2.5rem' }}>
              Get Started →
            </button>
          </Link>

          <p style={{ 
            marginTop: '2rem', 
            color: 'var(--text-muted)',
            fontSize: '0.95rem'
          }}>
            Trusted by 15,000+ businesses to drive performance and grow.
          </p>

          {/* Company Logos */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '3rem', 
            marginTop: '3rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            {companies.map((company, index) => (
              <div key={index} style={{ 
                fontSize: '1.1rem', 
                fontWeight: 600,
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                opacity: 0.7
              }}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;