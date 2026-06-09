import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section style={{ padding: '4rem 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Intelligence that <br />understands your business.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          SENZIA AI analyzes your data, detects what matters, and gives you clear recommendations so you can make better decisions, faster.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link to="/demo">
            <button className="btn-primary">Book a Demo</button>
          </Link>
          <Link to="/dashboard">
            <button style={{ background: 'transparent', border: '1px solid var(--accent-purple)', padding: '0.75rem 1.5rem', borderRadius: '40px', color: 'white', cursor: 'pointer' }}>
              Explore Features
            </button>
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: Brain, text: 'Advanced AI Models', sub: 'Trained on real business data' },
            { icon: Shield, text: 'Secure & Private', sub: 'Bank-grade security' },
            { icon: Zap, text: 'Real-Time Intelligence', sub: 'Instant alerts & insights' }
          ].map((feature, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1rem' }}>
              <feature.icon size={40} color="var(--accent-purple)" style={{ marginBottom: '0.5rem' }} />
              <h3>{feature.text}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{feature.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

