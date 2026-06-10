import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    { name: 'Starter', price: 'KES 4,999', period: '/month', features: ['Up to 5,000 transactions/month', 'Basic fraud detection', 'AI dashboard (basic)', 'WhatsApp reports (daily)', 'Email support'] },
    { name: 'Growth', price: 'KES 9,999', period: '/month', features: ['Up to 25,000 transactions/month', 'Advanced fraud detection', 'AI dashboard (advanced)', 'WhatsApp reports (real-time)', 'Priority email support'], popular: true },
    { name: 'Business', price: 'KES 19,999', period: '/month', features: ['Up to 100,000 transactions/month', 'Custom AI models', 'Custom report scheduling', 'Dedicated account manager', 'Phone & WhatsApp support'] },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited transactions', 'Custom integrations', 'On-premise deployment', 'SLA & compliance support', 'Dedicated support team'] }
  ];

  return (
    <section style={{ padding: '4rem 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>Simple. Transparent. Built for Growth.</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>Choose the plan that fits your business needs.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {plans.map((plan, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '2rem', border: plan.popular ? '2px solid var(--accent-purple)' : '1px solid var(--border-subtle)', position: 'relative' }}>
              {plan.popular && <span style={{ position: 'absolute', top: '-12px', right: '20px', background: 'var(--accent-purple)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>Most Popular</span>}
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{plan.price}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{plan.period}</span></p>
              <button style={{ width: '100%', background: plan.popular ? 'var(--accent-purple)' : 'transparent', border: `1px solid ${plan.popular ? 'var(--accent-purple)' : 'var(--border-subtle)'}`, padding: '0.75rem', borderRadius: '12px', color: plan.popular ? 'white' : 'var(--text-primary)', marginBottom: '1.5rem', cursor: 'pointer' }}>
                Start Free Trial
              </button>
              {plan.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Check size={16} color="#22c55e" />
                  <span style={{ fontSize: '0.9rem' }}>{feature}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
