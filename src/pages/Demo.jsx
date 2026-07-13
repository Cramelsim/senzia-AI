import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const Demo = ({ onLogin }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    industry: '',
    phone: '',
    password: ''
  });

  const plans = {
    starter: { name: 'Starter', price: 'KES 15,000', period: '/mo' },
    professional: { name: 'Professional', price: 'KES 35,000', period: '/mo' },
    enterprise: { name: 'Enterprise', price: 'Custom', period: '' }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        businessName: formData.businessName,
        industry: formData.industry,
        plan: plans[selectedPlan].name,
        planPrice: plans[selectedPlan].price,
        joinedDate: new Date().toLocaleDateString()
      };

      // Store user in localStorage first
      localStorage.setItem('senzia_user', JSON.stringify(userData));
      localStorage.setItem('senzia_onboarding_complete', 'false');

      // Call the login function from App
      if (onLogin) {
        onLogin(userData);
      }

      setIsSubmitting(false);
      
      // Navigate to onboarding
      navigate('/onboarding');
    }, 1500);
  };

  // If already authenticated, redirect to dashboard
  const isAuthenticated = localStorage.getItem('senzia_user') !== null;
  const onboardingComplete = localStorage.getItem('senzia_onboarding_complete') === 'true';

  if (isAuthenticated && onboardingComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isAuthenticated && !onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div>
      <Navbar />
      
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Show current step indicator */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginBottom: '2rem',
            alignItems: 'center'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: step >= 1 ? '#7c3aed' : '#e5e7eb',
                color: step >= 1 ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}>
                1
              </div>
              <span style={{ color: step >= 1 ? '#1a1a1a' : 'var(--text-secondary)' }}>Choose Plan</span>
            </div>
            <div style={{ 
              width: '40px', 
              height: '2px', 
              background: step >= 2 ? '#7c3aed' : '#e5e7eb' 
            }} />
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem'
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: step >= 2 ? '#7c3aed' : '#e5e7eb',
                color: step >= 2 ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8rem'
              }}>
                2
              </div>
              <span style={{ color: step >= 2 ? '#1a1a1a' : 'var(--text-secondary)' }}>Create Account</span>
            </div>
          </div>

          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>
            {step === 1 ? 'Choose Your Plan' : 'Create Your Account'}
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            marginBottom: '2rem'
          }}>
            {step === 1 ? 'Select the perfect plan for your business' : 'Fill in your details to get started'}
          </p>

          {/* Step 1: Plan Selection */}
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {Object.entries(plans).map(([key, plan]) => (
                <div 
                  key={key}
                  onClick={() => handlePlanSelect(key)}
                  style={{
                    background: selectedPlan === key ? '#faf5ff' : 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: selectedPlan === key ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
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
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>{plan.name}</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: '#7c3aed', margin: '0.5rem 0' }}>
                    {plan.price}
                    <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>{plan.period}</span>
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
                  {selectedPlan === key && (
                    <div style={{
                      marginTop: '1rem',
                      textAlign: 'center',
                      color: '#7c3aed',
                      fontWeight: 600
                    }}>
                      ✓ Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Account Creation */}
          {step === 2 && (
            <form onSubmit={handleSubmit} style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                background: '#f3e8ff', 
                padding: '1rem', 
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                <p style={{ color: '#7c3aed', fontWeight: 600 }}>
                  You've selected: <strong>{plans[selectedPlan].name} Plan</strong> - {plans[selectedPlan].price}/month
                </p>
              </div>

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

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  marginTop: '1.5rem',
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
                {isSubmitting ? 'Creating Account...' : `Start ${plans[selectedPlan].name} Plan →`}
              </button>
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                🔒 Secure • No hidden fees • Cancel anytime
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;