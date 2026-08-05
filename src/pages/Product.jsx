import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Zap,
  Brain,
  Bell,
  Database,
  Users,
  Shield,
  TrendingUp,
  Layout,
  Headphones
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './Product.css';

const Product = () => {
  const modules = [
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Get real-time insights into your business performance.',
      features: ['Interactive Dashboards', 'Custom Reports', 'KPI Tracking', 'Data Visualization'],
      link: '/product/bi',
      color: '#60a5fa'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Automate repetitive tasks and streamline your operations.',
      features: ['Workflow Automation', 'Scheduled Reports', 'Data Sync & Integration', 'Task Automation'],
      link: '/product/automation',
      color: '#34d399'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Leverage AI to uncover trends, predict outcomes, and get smarter recommendations.',
      features: ['AI-Powered Analytics', 'Predictive Forecasting', 'Anomaly Detection', 'Smart Recommendations'],
      link: '/product/ai-insights',
      color: '#a78bfa'
    },
    {
      icon: Bell,
      title: 'Alerts & Notifications',
      description: 'Stay informed with real-time alerts on what matters.',
      features: ['Threshold Alerts', 'Email Notifications', 'WhatsApp Alerts', 'Custom Notifications'],
      link: '/product/alerts',
      color: '#fb923c'
    },
    {
      icon: Database,
      title: 'Data Integration',
      description: 'Connect all your data sources in one central platform.',
      features: ['Multiple Data Sources', 'Real-time Sync', 'Data Cleaning', 'Secure Storage'],
      link: '/product/integrations',
      color: '#22d3ee'
    },
    {
      icon: Users,
      title: 'AI Consulting & Training',
      description: 'Upskill your team and implement AI the right way.',
      features: ['AI Strategy Consulting', 'Team Training', 'Workshops', 'Ongoing Support'],
      link: '/product/consulting',
      color: '#f472b6'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security to protect your data.'
    },
    {
      icon: TrendingUp,
      title: 'Scalable',
      description: 'Built to grow with your business needs.'
    },
    {
      icon: Layout,
      title: 'User-Friendly',
      description: 'Easy to use, with a clean and intuitive interface.'
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      description: "We're here to help you succeed every step of the way."
    }
  ];

  const revenuePoints = '0,55 40,48 80,50 120,32 160,38 200,20 240,26 280,6';

  return (
    <div className="product-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">Our Product</h1>
            <p className="hero-subtitle">
              Senzia is an all-in-one AI-powered Business Intelligence platform designed to help
              businesses transform data into actionable insights, automate operations, and drive
              sustainable growth.
            </p>
          </div>

          <div className="hero-visual">
            <div className="dashboard-glow" aria-hidden="true" />
            <div className="dashboard-mockup">
              <div className="dashboard-titlebar">
                <span className="dashboard-brand">
                  <span className="dashboard-logo-mark">S</span> SENZIA
                </span>
                <span className="dashboard-admin">Admin ▾</span>
              </div>

              <div className="dashboard-body">
                <nav className="dashboard-nav">
                  {['Overview', 'Reports', 'Data Sources', 'Alerts', 'Automation', 'AI Insights', 'Settings'].map(
                    (item, i) => (
                      <span key={item} className={`dashboard-nav-item${i === 0 ? ' active' : ''}`}>
                        {item}
                      </span>
                    )
                  )}
                </nav>

                <div className="dashboard-main">
                  <p className="dashboard-section-label">Overview</p>

                  <div className="dashboard-stats">
                    <div className="dashboard-stat">
                      <span className="stat-label">Total Revenue</span>
                      <span className="stat-value">KSh 245.8M</span>
                      <span className="stat-delta up">▲ 12.9% vs last month</span>
                    </div>
                    <div className="dashboard-stat">
                      <span className="stat-label">Total Profit</span>
                      <span className="stat-value">KSh 68.4M</span>
                      <span className="stat-delta up">▲ 15.3% vs last month</span>
                    </div>
                    <div className="dashboard-stat">
                      <span className="stat-label">Total Expenses</span>
                      <span className="stat-value">KSh 117.3M</span>
                      <span className="stat-delta down">▼ 4.6% vs last month</span>
                    </div>
                    <div className="dashboard-stat">
                      <span className="stat-label">Active Users</span>
                      <span className="stat-value">1,842</span>
                      <span className="stat-delta up">▲ 8.2% vs last month</span>
                    </div>
                  </div>

                  <div className="dashboard-charts">
                    <div className="dashboard-chart-card">
                      <span className="dashboard-section-label small">Revenue Trend</span>
                      <svg viewBox="0 0 280 60" className="revenue-line" preserveAspectRatio="none">
                        <polyline points={revenuePoints} fill="none" stroke="#818cf8" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="dashboard-chart-card donut-card">
                      <span className="dashboard-section-label small">Top Performing Areas</span>
                      <div className="donut-row">
                        <div className="donut">
                          <span className="donut-value">45%</span>
                        </div>
                        <ul className="donut-legend">
                          <li><span className="dot" style={{ background: '#818cf8' }} />Sales<em>45%</em></li>
                          <li><span className="dot" style={{ background: '#34d399' }} />Operations<em>25%</em></li>
                          <li><span className="dot" style={{ background: '#a78bfa' }} />Marketing<em>20%</em></li>
                          <li><span className="dot" style={{ background: '#fb923c' }} />Other<em>10%</em></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules">
        <div className="container">
          <h2 className="section-title">Everything You Need to Run Smarter</h2>
          <p className="section-subtitle">
            Powerful modules built to give you intelligence, automation, and growth.
          </p>

          <div className="modules-grid">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div className="module-card" key={index} style={{ '--accent': module.color }}>
                  <div className="module-icon">
                    <Icon size={24} color={module.color} />
                  </div>

                  <h3 className="module-title">{module.title}</h3>
                  <p className="module-description">{module.description}</p>

                  <ul className="module-features">
                    {module.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to={module.link} className="module-link">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container benefits-grid">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div className="benefit-card" key={index}>
                <div className="benefit-icon">
                  <Icon size={28} />
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container cta-inner">
          <h2 className="cta-title">Ready to Transform Your Business?</h2>
          <p className="cta-subtitle">
            Join 15,000+ businesses using SENZIA to drive performance and grow.
          </p>
          <Link to="/demo">
            <button className="cta-button">Start Free Trial →</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Product;