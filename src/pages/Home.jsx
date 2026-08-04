import React from 'react';
import Navbar from '../components/Layout/Navbar';
import { Link } from 'react-router-dom';
import { Brain, Settings, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    { icon: Brain, title: 'Intelligence', desc: 'Turning data into actionable insights for smarter decisions.' },
    { icon: Settings, title: 'Automation', desc: 'Streamlining operations and reducing manual work.' },
    { icon: TrendingUp, title: 'Growth', desc: 'Identifying opportunities and driving sustainable growth.' },
    { icon: ShieldCheck, title: 'Integrity', desc: 'Building trust through security, transparency and reliability.' }
  ];

  const trustedLogos = ['Safaricom', 'Equity', 'KCB', 'NCBA', 'Absa'];

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-inner">
            <h1 className="home-hero-title">
              Intelligence.<br />
              Automation.<br />
              <span className="accent">Growth.</span>
            </h1>

            <p className="home-hero-subtitle">
              Senzia is an AI-powered Business Intelligence platform that combines
              real-time data, advanced analytics, and financial expertise to help
              businesses increase profitability, detect risks, automate operations,
              and uncover new growth opportunities.
            </p>

            <Link to="/demo" className="home-hero-btn">
              Get Started <ArrowRight size={18} />
            </Link>

            <p className="home-hero-trust">
              Trusted by 15,000+ businesses to drive performance and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Trusted Logos */}
      <section className="home-logos-section">
        <div className="container">
          <div className="home-logos-row">
            <p className="home-logos-label">
              Trusted by 15,000+ businesses to drive performance and grow.
            </p>
            <div className="home-logos-list">
              {trustedLogos.map((logo) => (
                <span key={logo} className="home-logo">{logo}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features-section">
        <div className="container">
          <div className="home-features-grid">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="home-feature-card">
                  <div className="home-feature-icon">
                    <Icon size={22} color="var(--home-gold)" />
                  </div>
                  <h3 className="home-feature-title">{item.title}</h3>
                  <p className="home-feature-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;