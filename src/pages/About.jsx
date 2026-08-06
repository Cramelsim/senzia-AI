import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Globe, ShieldCheck, Lightbulb, Leaf, Brain } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './About.css';

const About = () => {
  const stats = [
    { icon: Users, number: '15,000+', label: 'Businesses Trust Senzia', note: 'Across multiple industries' },
    { icon: TrendingUp, number: '50M+', label: 'Data Points Processed Daily', note: 'Real-time. Accurate. Reliable.' },
    { icon: TrendingUp, number: '98%', label: 'Customer Satisfaction', note: 'Trusted by business leaders' },
    { icon: Globe, number: '5+', label: 'Countries', note: 'Global presence, local impact' }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'Integrity',
      description: 'We build trust through transparency, security, and reliability.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace AI and technology to solve real business problems.'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: "Your success is our success. We're with you every step."
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We help businesses grow today while building a better tomorrow.'
    }
  ];

  return (
    <div className="about-page">
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-content">
            <span className="eyebrow">About Us</span>
            <h1 className="about-hero-title">
              Intelligence behind <br /> better business.
            </h1>
            <p className="about-hero-subtitle">
              Senzia was built with a simple mission: to help businesses turn data into clarity,
              automate operations, and unlock sustainable growth. We combine AI, real-time data,
              and financial expertise to give leaders the confidence to make smarter
              decisions—every day.
            </p>
            <button className="about-btn-primary">
              Our Story <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="about-hero-visual">
            <svg viewBox="0 0 640 360" className="skyline-svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d1730" />
                  <stop offset="100%" stopColor="#060810" />
                </linearGradient>
                <linearGradient id="meshGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f0b23c" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <rect width="640" height="360" fill="url(#skyGrad)" />
              {[
                [40, 220, 30, 140], [80, 180, 26, 180], [115, 240, 22, 120],
                [150, 140, 34, 220], [195, 190, 24, 170], [230, 100, 40, 260],
                [280, 210, 26, 150], [315, 160, 30, 200], [355, 120, 36, 240],
                [400, 200, 24, 160], [435, 170, 28, 190], [472, 140, 22, 220],
                [505, 220, 30, 140], [545, 190, 26, 170], [580, 230, 24, 130]
              ].map(([x, y, w, h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} fill="#0f1626" stroke="#1c2438" strokeWidth="1" />
              ))}
              <path
                d="M0,260 C120,300 220,220 320,250 C420,280 520,210 640,240"
                fill="none"
                stroke="url(#meshGrad)"
                strokeWidth="1.2"
                opacity="0.7"
              />
              <path
                d="M0,290 C130,240 240,310 340,280 C440,250 540,300 640,270"
                fill="none"
                stroke="url(#meshGrad)"
                strokeWidth="1"
                opacity="0.5"
              />
              {[
                [60, 268], [140, 252], [230, 262], [310, 244], [400, 268],
                [470, 250], [540, 272], [600, 256], [200, 300], [360, 292]
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 2.6 : 1.6} fill={i % 2 === 0 ? '#f0b23c' : '#818cf8'} />
              ))}
            </svg>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="about-stats">
        <div className="container about-stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div className="about-stat" key={index}>
                <div className="about-stat-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="about-stat-number">{stat.number}</p>
                  <p className="about-stat-label">{stat.label}</p>
                  <p className="about-stat-note">{stat.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission + Values */}
      <section className="about-mission">
        <div className="mission-glow" aria-hidden="true" />
        <div className="container about-mission-grid">
          <div className="mission-content">
            <span className="eyebrow">Our Mission</span>
            <h2 className="mission-title">
              Empowering businesses <br /> with intelligence.
            </h2>
            <p className="mission-text">
              We empower organizations with the insights and automation they need to reduce
              risk, improve efficiency, and maximize profitability. Senzia is more than a
              platform—it's a partner in your growth journey.
            </p>
          </div>

          <div className="values-content">
            <span className="eyebrow">Our Values</span>
            <div className="values-grid">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div className="value-card" key={index}>
                    <div className="value-icon">
                      <Icon size={22} />
                    </div>
                    <h3 className="value-title">{value.title}</h3>
                    <p className="value-description">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA bar */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-bar">
            <div className="cta-bar-left">
              <div className="cta-bar-icon">
                <Brain size={20} />
              </div>
              <div>
                <p className="cta-bar-title">We're here to help you grow smarter.</p>
                <p className="cta-bar-subtitle">Join thousands of businesses already transforming with Senzia.</p>
              </div>
            </div>
            <Link to="/demo">
              <button className="about-btn-primary">
                Book a Demo <span aria-hidden="true">→</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;