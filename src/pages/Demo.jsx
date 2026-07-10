import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const Demo = ({ onLogin }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState('professional');
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    branches: '',
    revenue: '',
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = {
    starter: { name: 'Starter', price: 'KES 15,000', period: '/mo' },
    professional: { name: 'Professional', price: 'KES 35,000', period: '/mo' },
    enterprise: { name: 'Enterprise', price: 'Custom', period: '' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlanSelect = (selectedPlan) => {
    setPlan(selectedPlan);
    setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Create user account
      const userData = {
        name: formData.fullName,
        email: formData.email,
        businessName: formData.businessName,
        industry: formData.industry,
        plan: plans[plan].name,
        planPrice: plans[plan].price,
        joinedDate: new Date().toLocaleDateString()
      };
      
      // Call login function from App
      onLogin(userData);
      setIsSubmitting(false);
      
      // Navigate to onboarding
      navigate('/onboarding');
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>
            {step === 1 ? 'Choose Your Plan' : 'Complete Your Account Setup'}
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            marginBottom: '2rem'
          }}>
            {step === 1 ? 'Select the perfect plan for your business needs' : 'Fill in your details to get started'}
          </p>

          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {Object.entries(plans).map(([key, planData]) => (
                <div key={key} style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  border: plan === key ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                onClick={() => handlePlanSelect(key)}>
                  {key === 'professional' && (
                    <span style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '20px',
                      background: '#7c3aed',
                      color: 'white',
                      padding: '0.25rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      Most Popular
                    </span>
                  )}
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>{planData.name}</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: '#7c3aed', margin: '0.5rem 0' }}>
                    {planData.price}
                    <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>{planData.period}</span>
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                    {key === 'starter' && (
                      <>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Up to 5 users</li>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Basic AI Insights</li>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Daily Email Reports</li>
                      </>
                    )}
                    {key === 'professional' && (
                      <>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Up to 20 users</li>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Advanced AI Insights</li>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Real-time WhatsApp Reports</li>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Fraud Detection</li>
                      </>
                    )}
                    {key === 'enterprise' && (
                      <>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Unlimited everything</li>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Custom AI Models</li>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ Dedicated Support Team</li>
                        <li style={{ padding: '0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>✓ On-premise Deployment</li>
                      </>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Account Creation */}
          {step === 2 && (
            <form onSubmit={handlePayment} style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#1a1a1a' }}>
                Create Your Account - {plans[plan].name} Plan
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#1a1a1a' }}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#1a1a1a' }}>Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@business.com"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#1a1a1a' }}>Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    placeholder="Your Business"
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#1a1a1a' }}>Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                  >
                    <option value="">Select Industry</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="retail">Retail</option>
                    <option value="hotel">Hotel</option>
                    <option value="logistics">Logistics</option>
                    <option value="fuel">Fuel Station</option>
                    <option value="supermarket">Supermarket</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#1a1a1a' }}>Create Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Minimum 8 characters"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isSubmitting ? 'Processing Payment...' : `Start Your ${plans[plan].name} Plan →`}
                </button>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  🔒 Secure payment • No hidden fees • Cancel anytime
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;