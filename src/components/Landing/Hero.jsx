import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const companies = ['Safaricom', 'EQUITY', 'KCB', 'NCBA', 'absa'];

  const features = [
    { icon: 'brain', title: 'Intelligence', desc: 'Turning data into actionable insights for smarter decisions.' },
    { icon: 'gear', title: 'Automation', desc: 'Streamlining operations and reducing manual work.' },
    { icon: 'chart', title: 'Growth', desc: 'Identifying opportunities and driving sustainable growth.' },
    { icon: 'shield', title: 'Integrity', desc: 'Building trust through security, transparency and reliability.' },
  ];

  return (
    <section className="hero-section">
      {/* decorative concentric ring backdrop */}
      <svg className="hero-rings" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[90, 170, 250, 330, 410, 490, 570, 650].map((r) => (
          <circle key={r} cx="1060" cy="300" r={r} fill="none" stroke="rgba(150, 180, 230, 0.14)" strokeWidth="1" />
        ))}
      </svg>

      <div className="container hero-content">
        <div className="hero-copy">
          <h1 className="hero-heading">
            Intelligence.<br />
            Automation.<br />
            <span className="hero-heading-accent">Growth.</span>
          </h1>

          <p className="hero-lead">
            Senzia is an AI-powered Business Intelligence platform that combines real-time data,
            advanced analytics, and financial expertise to help businesses increase profitability,
            detect risks, automate operations, and uncover new growth opportunities.
          </p>

          <Link to="/get-started">
            <button className="btn-primary hero-cta">
              Get Started <span aria-hidden="true">→</span>
            </button>
          </Link>
        </div>

        {/* Trust strip */}
        <div className="hero-trust-strip">
          <p className="hero-trust-copy">
            Trusted by 15,000+ businesses to drive performance and grow.
          </p>
          {companies.map((company) => (
            <div className="hero-trust-logo" key={company}>
              {company}
            </div>
          ))}
        </div>

        {/* Feature pillars card */}
        <div className="hero-features-card">
          {features.map((f) => (
            <div className="hero-feature" key={f.title}>
              <div className="hero-feature-icon-box">
                <FeatureIcon type={f.icon} />
              </div>
              <h3 className="hero-feature-title">{f.title}</h3>
              <p className="hero-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureIcon = ({ type }) => {
  const common = { width: 22, height: 22, stroke: 'var(--accent-gold, #f0c987)', strokeWidth: 1.8, fill: 'none' };
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