import React from 'react';

const Features = () => {
  return (
    <section style={{ padding: '4rem 0', background: '#111113' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem', color: 'white' }}>
          Your Private AI Analyst for Smarter Decisions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#18181b', borderRadius: '16px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
            <h3 style={{ color: 'white' }}>Fraud Detection</h3>
            <p style={{ color: '#a1a1aa' }}>Real-time anomaly detection & alerts</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#18181b', borderRadius: '16px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ color: 'white' }}>AI Dashboards</h3>
            <p style={{ color: '#a1a1aa' }}>Visualize KPIs and business insights</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#18181b', borderRadius: '16px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
            <h3 style={{ color: 'white' }}>AI Assistant</h3>
            <p style={{ color: '#a1a1aa' }}>24/7 AI support for your team</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#18181b', borderRadius: '16px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
            <h3 style={{ color: 'white' }}>WhatsApp Reports</h3>
            <p style={{ color: '#a1a1aa' }}>Automated reports delivered to you</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;