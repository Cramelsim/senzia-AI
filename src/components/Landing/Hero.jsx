import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const companies = ['Safaricom', 'EQUITY', 'KCB', 'NCBA', 'absa'];

  const features = [
    { icon: 'brain', title: 'Intelligence', desc: 'Turning data into actionable insights for smarter decisions.' },
    { icon: 'gear', title: 'Automation', desc: 'Streamlining operations and reducing manual work.' },
    { icon: 'chart', title: 'Growth', desc: 'Identifying opportunities and driving sustainable growth.' },
    { icon: 'shield', title: 'Integrity', desc: 'Building trust through security, transparency and reliability.' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        padding: '4rem 0 0',
        background: 'radial-gradient(circle at 75% 30%, #14213d 0%, #05070d 55%, #05070d 100%)',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '640px', paddingTop: '2rem' }}>
          <h1
            style={{
              fontSize: '3.25rem',
              fontWeight: 800,
              marginBottom: '1.5rem',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Intelligence.<br />
            Automation.<br />
            Growth.
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              marginBottom: '2rem',
              lineHeight: '1.6',
            }}
          >
            Senzia is an AI-powered Business Intelligence platform that combines real-time data,
            advanced analytics, and financial expertise to help businesses increase profitability,
            detect risks, automate operations, and uncover new growth opportunities.
          </p>

          <Link to="/get-started">
            <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.875rem 2.25rem' }}>
              Get Started →
            </button>
          </Link>
        </div>

        {/* Trust strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginTop: '5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '160px', lineHeight: '1.4' }}>
            Trusted by 15,000+ businesses to drive performance and grow.
          </p>
          {companies.map((company, index) => (
            <div
              key={index}
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.03em',
                opacity: 0.8,
              }}
            >
              {company}
            </div>
          ))}
        </div>

        {/* Feature pillars card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            background: 'var(--bg-dark-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '2.5rem',
            margin: '2.5rem 0',
          }}
        >
          {features.map((f, i) => (
            <div key={i}>
              <div style={{ marginBottom: '0.75rem' }}>
                <FeatureIcon type={f.icon} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureIcon = ({ type }) => {
  const common = { width: 28, height: 28, stroke: 'var(--accent-gold)', strokeWidth: 1.8, fill: 'none' };
  switch (type) {
    case 'brain':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5h1m3-13a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5h-1m-3-13v13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'gear':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 13a7.97 7.97 0 0 0 0-2l2-1.5-2-3.4-2.4.6a8 8 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a8 8 0 0 0-1.7 1l-2.4-.6-2 3.4L6.6 11a7.97 7.97 0 0 0 0 2l-2 1.5 2 3.4 2.4-.6a8 8 0 0 0 1.7 1l.3 2.5h4l.3-2.5a8 8 0 0 0 1.7-1l2.4.6 2-3.4-2-1.5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 19V5M4 19h16M8 15l3-3 3 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 3l7 3v6c0 4.5-3 7-7 9-4-2-7-4.5-7-9V6l7-3Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

export default Hero;