import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const Onboarding = ({ user, onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [businessData, setBusinessData] = useState({
    businessType: '',
    goals: [],
    metrics: [],
    branches: '1-5',
    focusArea: ''
  });

  const goals = [
    'Increase Profitability',
    'Reduce Costs',
    'Improve Cash Flow',
    'Forecast Growth',
    'Reduce Fraud',
    'Optimize Inventory'
  ];

  const metrics = [
    'Revenue',
    'Gross Profit',
    'Net Profit',
    'Cash Flow',
    'COGS',
    'Expenses',
    'Inventory',
    'Customer Count',
    'Average Order Value'
  ];

  const handleGoalToggle = (goal) => {
    setBusinessData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleMetricToggle = (metric) => {
    setBusinessData(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metric)
        ? prev.metrics.filter(m => m !== metric)
        : [...prev.metrics, metric]
    }));
  };

  const handleComplete = () => {
    onComplete();
    navigate('/dashboard');
  };

  const steps = [
    { number: 1, label: 'Welcome', active: step === 1, completed: step > 1 },
    { number: 2, label: 'Business Setup', active: step === 2, completed: step > 2 },
    { number: 3, label: 'AI Configuration', active: step === 3, completed: step > 3 },
    { number: 4, label: 'Complete', active: step === 4, completed: step > 4 }
  ];

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Progress Bar */}
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              {steps.map((s) => (
                <div key={s.number} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: s.completed ? '#22c55e' : s.active ? '#7c3aed' : '#e5e7eb',
                    color: s.completed || s.active ? 'white' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {s.completed ? '✓' : s.number}
                  </div>
                  <span style={{
                    fontSize: '0.85rem',
                    color: s.active ? '#1a1a1a' : 'var(--text-secondary)',
                    fontWeight: s.active ? 600 : 400
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${(step / steps.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Welcome Step */}
          {step === 1 && (
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                Welcome to SENZIA, {user?.name || 'John'}! 🎉
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Your {user?.plan || 'Professional'} plan is now active. Let's get you set up so you can start making smarter business decisions.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Plan</p>
                  <p style={{ fontWeight: 700, color: '#1a1a1a' }}>{user?.plan || 'Professional'}</p>
                </div>
                <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Business</p>
                  <p style={{ fontWeight: 700, color: '#1a1a1a' }}>{user?.businessName || 'Senzia Limited'}</p>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>What happens next:</h4>
                <ol style={{ color: 'var(--text-secondary)', lineHeight: '2' }}>
                  <li>1. <strong>Tell us about your business</strong> - We'll personalize SENZIA for your industry</li>
                  <li>2. <strong>Connect your data</strong> - Link POS, M-Pesa, and other data sources</li>
                  <li>3. <strong>AI Configuration</strong> - Our AI learns your business</li>
                  <li>4. <strong>Get insights</strong> - Start making data-driven decisions</li>
                </ol>
              </div>

              <button
                onClick={() => setStep(2)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
              >
                Continue Setup →
              </button>
            </div>
          )}

          {/* Business Setup Step */}
          {step === 2 && (
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                Tell us about your business
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                This helps us personalize SENZIA for your industry and goals.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#1a1a1a' }}>Business Type *</label>
                <select
                  value={businessData.businessType}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, businessType: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                >
                  <option value="">Select your industry</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="retail">Retail</option>
                  <option value="hotel">Hotel</option>
                  <option value="logistics">Logistics</option>
                  <option value="fuel">Fuel Station</option>
                  <option value="supermarket">Supermarket</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                  Primary Business Goals (Select up to 3)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: businessData.goals.includes(goal) ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                        background: businessData.goals.includes(goal) ? '#f3e8ff' : 'white',
                        color: businessData.goals.includes(goal) ? '#7c3aed' : '#1a1a1a',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: businessData.goals.includes(goal) ? 600 : 400
                      }}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                  Key Metrics You Care About (Select up to 5)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {metrics.map((metric) => (
                    <button
                      key={metric}
                      onClick={() => handleMetricToggle(metric)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        border: businessData.metrics.includes(metric) ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                        background: businessData.metrics.includes(metric) ? '#f3e8ff' : 'white',
                        color: businessData.metrics.includes(metric) ? '#7c3aed' : '#1a1a1a',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: businessData.metrics.includes(metric) ? 600 : 400
                      }}
                    >
                      {metric}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* AI Configuration Step */}
          {step === 3 && (
            <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                AI Configuration
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Customize SENZIA AI to understand your business better.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#1a1a1a' }}>
                  Number of Branches
                </label>
                <select
                  value={businessData.branches}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, branches: e.target.value }))}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem' }}
                >
                  <option value="1">Single Branch</option>
                  <option value="1-5">2 – 5 Branches</option>
                  <option value="6-20">6 – 20 Branches</option>
                  <option value="20+">20+ Branches</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#1a1a1a' }}>
                  Anything specific you want AI to focus on?
                </label>
                <textarea
                  value={businessData.focusArea}
                  onChange={(e) => setBusinessData(prev => ({ ...prev, focusArea: e.target.value }))}
                  placeholder="e.g., I want to improve food cost, reduce wastage and increase weekend sales."
                  rows="3"
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1a1a1a' }}>How AI Will Help You</h4>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                  <li style={{ padding: '0.25rem 0' }}>✓ Personalized Insights tailored to your business goals</li>
                  <li style={{ padding: '0.25rem 0' }}>✓ Smart Recommendations to improve performance</li>
                  <li style={{ padding: '0.25rem 0' }}>✓ Anomaly Detection for unusual trends and risks</li>
                  <li style={{ padding: '0.25rem 0' }}>✓ Natural Conversations - Ask questions in plain English</li>
                </ul>
              </div>

              <button
                onClick={handleComplete}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
              >
                Complete Setup →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;