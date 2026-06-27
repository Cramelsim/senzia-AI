import React from 'react';
import Navbar from '../components/Layout/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
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
              color: '#1a1a1a'
            }}>
              Intelligence. <br />Automation. Growth.
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Senzia is an AI-powered Business Intelligence platform that combines real-time data, 
              advanced analytics, and financial expertise to help businesses increase profitability, 
              detect risks, automate operations, and uncover new growth opportunities.
            </p>

            <Link to="/demo">
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem'
          }}>
            {[
              { icon: '💡', title: 'Intelligence', desc: 'Turning data into actionable insights for smarter decisions.' },
              { icon: '⚡', title: 'Automation', desc: 'Streamlining operations and reducing manual work.' },
              { icon: '📈', title: 'Growth', desc: 'Identifying opportunities and driving sustainable growth.' },
              { icon: '🔒', title: 'Integrity', desc: 'Building trust through security, transparency and reliability.' }
            ].map((item, index) => (
              <div key={index} style={{ 
                textAlign: 'center',
                padding: '2rem',
                background: '#faf5ff',
                borderRadius: '12px',
                border: '1px solid #f3e8ff'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;