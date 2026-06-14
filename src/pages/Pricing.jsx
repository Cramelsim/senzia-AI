import React from 'react';
import Navbar from '../components/Layout/Navbar';

const Pricing = () => {
  const plans = [
    { name: 'Starter', price: 'KES 4,999', period: '/month', features: ['Up to 5,000 transactions/month', 'Basic fraud detection', 'AI dashboard (basic)', 'WhatsApp reports (daily)'] },
    { name: 'Growth', price: 'KES 9,999', period: '/month', features: ['Up to 25,000 transactions/month', 'Advanced fraud detection', 'AI dashboard (advanced)', 'WhatsApp reports (real-time)'], popular: true },
    { name: 'Business', price: 'KES 19,999', period: '/month', features: ['Up to 100,000 transactions/month', 'Custom AI models', 'Dedicated account manager', 'Phone support'] }
  ];

  return (
    <div>
      <Navbar />
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Simple. Transparent. Built for Growth.</h2>
          <p style={{ textAlign: 'center', color: '#a1a1aa', marginBottom: '3rem' }}>Choose the plan that fits your business needs.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {plans.map((plan, idx) => (
              <div key={idx} style={{ 
                background: '#111113', 
                borderRadius: '20px', 
                padding: '2rem',
                border: plan.popular ? '2px solid #a855f7' : '1px solid #2a2a2f',
                position: 'relative'
              }}>
                {plan.popular && (
                  <span style={{ 
                    position: 'absolute', 
                    top: '-12px', 
                    right: '20px', 
                    background: '#a855f7', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem' 
                  }}>Popular</span>
                )}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'white' }}>{plan.name}</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                  {plan.price}<span style={{ fontSize: '1rem', color: '#a1a1aa' }}>{plan.period}</span>
                </p>
                <button style={{ 
                  width: '100%', 
                  background: plan.popular ? '#a855f7' : 'transparent', 
                  border: `1px solid ${plan.popular ? '#a855f7' : '#2a2a2f'}`,
                  padding: '0.75rem', 
                  borderRadius: '12px', 
                  color: plan.popular ? 'white' : 'white',
                  marginBottom: '1.5rem'
                }}>
                  Start Free Trial
                </button>
                {plan.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span style={{ color: '#22c55e' }}>✓</span>
                    <span style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>{feature}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;