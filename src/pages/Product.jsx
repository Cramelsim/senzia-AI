import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, ShieldCheck, LineChart, Target, Bot, Plug,
  CheckCircle2, ArrowRight
} from 'lucide-react';

// Swap these paths to wherever you place the images in your project,
// e.g. src/assets/product/dashboard-overview.jpeg
import dashboardImg from '../assets/product/dashboard-overview.jpeg';
import forecastingImg from '../assets/product/forecasting-center.jpeg';
import insightsImg from '../assets/product/insights-hub.jpeg';
import integrationsImg from '../assets/product/integrations-hub.jpeg';
import alertsImg from '../assets/product/alerts-center.jpeg';

const Product = () => {
  const features = [
    {
      icon: Brain,
      tag: 'FINANCIAL INTELLIGENCE',
      title: 'See exactly where profit comes from — and where it leaks.',
      desc: 'Senzia pulls together revenue, expenses, margins and cash flow into one live view, so you always know the real financial health of your business.',
      points: [
        'Real-time revenue, profit & expense tracking',
        'Automatic margin and cash flow analysis',
        'Breakdown by branch, channel and product',
      ],
      image: dashboardImg,
      color: '#a78bfa',
      bg: 'rgba(124, 58, 237, 0.12)',
      reverse: false,
    },
    {
      icon: ShieldCheck,
      tag: 'FRAUD & RISK INTELLIGENCE',
      title: 'Catch suspicious activity before it costs you.',
      desc: 'AI continuously scans transactions, inventory and user activity for anomalies — flagging risks in real time instead of after the damage is done.',
      points: [
        'Anomaly detection on transactions & expenses',
        'Inventory discrepancy and shrinkage alerts',
        'Unusual login and user-activity monitoring',
      ],
      image: alertsImg,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)',
      reverse: true,
    },
    {
      icon: LineChart,
      tag: 'FORECASTING INTELLIGENCE',
      title: 'Plan ahead with AI-powered forecasts you can trust.',
      desc: 'Predict revenue, expenses, cash flow and inventory needs 30, 60 or 90 days out — with confidence scores so you know how much to rely on each forecast.',
      points: [
        'Revenue, expense & cash flow forecasting',
        'Inventory demand prediction',
        'Scenario planning ("what if I increase ad spend 20%?")',
      ],
      image: forecastingImg,
      color: '#60a5fa',
      bg: 'rgba(59, 130, 246, 0.12)',
      reverse: false,
    },
    {
      icon: Target,
      tag: 'BUSINESS OPPORTUNITY ENGINE',
      title: 'Discover hidden revenue you didn\u2019t know you had.',
      desc: 'Senzia analyzes your performance trends to surface concrete opportunities — from underpriced products to high-potential marketing channels.',
      points: [
        'Opportunity Spotlight with potential KES impact',
        'Top-performing area breakdown',
        'Pricing and cost-saving recommendations',
      ],
      image: insightsImg,
      color: '#4ade80',
      bg: 'rgba(34, 197, 94, 0.12)',
      reverse: true,
    },
    {
      icon: Plug,
      tag: 'INTEGRATIONS',
      title: 'Connects to the tools you already use.',
      desc: 'POS systems, M-Pesa, banks, accounting software, e-commerce platforms and more — Senzia plugs into your existing stack in minutes, not months.',
      points: [
        '16+ native integrations (QuickBooks, M-Pesa, Shopify, Stripe...)',
        '98.7% data sync success rate',
        'Custom integrations via open API',
      ],
      image: integrationsImg,
      color: '#22d3ee',
      bg: 'rgba(34, 211, 238, 0.12)',
      reverse: false,
    },
  ];

  const pillars = [
    { icon: Brain, title: 'Intelligence', desc: 'Turning data into actionable insights for smarter decisions.' },
    { icon: LineChart, title: 'Automation', desc: 'Streamlining operations and reducing manual work.' },
    { icon: Target, title: 'Growth', desc: 'Identifying opportunities and driving sustainable growth.' },
    { icon: ShieldCheck, title: 'Integrity', desc: 'Building trust through security, transparency and reliability.' },
  ];

  return (
    <div style={{ background: 'var(--bg-dark)' }}>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 0 4rem',
          background: 'radial-gradient(circle at 75% 20%, #14213d 0%, #05070d 55%, #05070d 100%)',
        }}
      >
        <div className="container">
          <p style={{ color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1rem' }}>
            PRODUCT
          </p>
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              maxWidth: '700px',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }}
          >
            One platform. Every part of your business intelligence.
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: '1.6', marginBottom: '2rem' }}>
            Senzia brings financial intelligence, fraud detection, forecasting, opportunity discovery
            and an AI assistant into a single dashboard — so you stop switching tools and start making
            faster decisions.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/get-started">
              <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.875rem 2.25rem' }}>
                Get Started →
              </button>
            </Link>
            <Link to="/demo">
              <button className="btn-outline" style={{ fontSize: '1.05rem', padding: '0.85rem 2rem' }}>
                Book a Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Four pillars strip */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              background: 'var(--bg-dark-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '2.5rem',
            }}
          >
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i}>
                  <Icon size={28} color="var(--accent-gold)" style={{ marginBottom: '0.75rem' }} strokeWidth={1.8} />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature sections */}
      {features.map((f, idx) => {
        const Icon = f.icon;
        return (
          <section key={idx} style={{ padding: '3rem 0', borderTop: idx === 0 ? '1px solid var(--border-subtle)' : 'none' }}>
            <div className="container">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '3.5rem',
                  alignItems: 'center',
                  direction: f.reverse ? 'rtl' : 'ltr',
                }}
              >
                <div style={{ direction: 'ltr' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: f.bg,
                      color: f.color,
                      padding: '0.4rem 0.9rem',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <Icon size={15} />
                    {f.tag}
                  </div>
                  <h2
                    style={{
                      fontSize: '1.85rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: '1.25',
                      marginBottom: '1rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {f.title}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                    {f.desc}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {f.points.map((point, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <CheckCircle2 size={18} color={f.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ direction: 'ltr' }}>
                  <div
                    style={{
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    }}
                  >
                    <img
                      src={f.image}
                      alt={f.title}
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* AI Assistant callout */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(5,7,13,0.4))',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <div style={{ maxWidth: '560px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <Bot size={22} color="var(--accent-gold)" />
                <span style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                  AI BUSINESS ASSISTANT
                </span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Ask your business anything. Get answers in plain English.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                "Why did sales drop last Tuesday?" "Which branch has the highest fraud risk?"
                Senzia's AI assistant understands your data and responds instantly — no SQL, no spreadsheets.
              </p>
            </div>
            <Link to="/get-started">
              <button className="btn-primary" style={{ fontSize: '1.05rem', padding: '0.875rem 2.25rem', whiteSpace: 'nowrap' }}>
                Try It Free <ArrowRight size={18} style={{ display: 'inline', marginLeft: '0.4rem', verticalAlign: 'middle' }} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '3rem 0 5rem' }}>
        <div className="container">
          <div
            style={{
              background: 'var(--bg-dark-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              padding: '2.5rem 3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                See SENZIA in action.
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Book a personalized demo and discover what it can do for your business.
              </p>
            </div>
            <Link to="/demo">
              <button className="btn-primary" style={{ fontSize: '1rem', padding: '0.8rem 2rem', whiteSpace: 'nowrap' }}>
                Book a Demo →
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;