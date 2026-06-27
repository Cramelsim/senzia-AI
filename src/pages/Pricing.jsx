import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [expandedPlan, setExpandedPlan] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses getting started with AI.',
      monthlyPrice: 4999,
      yearlyPrice: 49990,
      savings: '16%',
      features: [
        'Up to 5,000 transactions/month',
        'Basic fraud detection',
        'AI dashboard (basic)',
        'WhatsApp reports (daily)',
        'Email support',
        '1 data source connection',
        'Basic analytics'
      ],
      buttonText: 'Start Free Trial',
      popular: false
    },
    {
      id: 'growth',
      name: 'Growth',
      description: 'Designed for growing businesses scaling their operations.',
      monthlyPrice: 9999,
      yearlyPrice: 99990,
      savings: '16%',
      features: [
        'Up to 25,000 transactions/month',
        'Advanced fraud detection',
        'AI dashboard (advanced)',
        'WhatsApp reports (real-time)',
        'Priority email support',
        '5 data source connections',
        'Advanced analytics',
        'Basic forecasting'
      ],
      buttonText: 'Start Free Trial',
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For established businesses requiring advanced AI capabilities.',
      monthlyPrice: 19999,
      yearlyPrice: 199990,
      savings: '16%',
      features: [
        'Up to 100,000 transactions/month',
        'Custom AI models',
        'Custom report scheduling',
        'Dedicated account manager',
        'Phone & WhatsApp support',
        'Unlimited data sources',
        'Advanced forecasting',
        'API access'
      ],
      buttonText: 'Start Free Trial',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Complete AI solution for data-driven enterprises.',
      monthlyPrice: 24999,
      yearlyPrice: 249990,
      savings: '16%',
      features: [
        'Unlimited transactions',
        'Custom AI models',
        'Real-time analytics',
        'Dedicated support team',
        '24/7 phone support',
        'Unlimited data sources',
        'Advanced forecasting',
        'API access',
        'Custom integrations',
        'On-premise deployment'
      ],
      buttonText: 'Start Free Trial',
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom solutions for large organizations with unique needs.',
      monthlyPrice: null,
      yearlyPrice: null,
      features: [
        'Unlimited everything',
        'Custom AI solutions',
        'Full API access',
        'On-premise deployment',
        'SLA & compliance support',
        'Dedicated support team',
        'Custom integrations',
        'White-label options'
      ],
      buttonText: 'Contact Sales',
      popular: false,
      isEnterprise: true
    }
  ];

  const currentPlan = {
    name: 'Professional Plan',
    price: 'KES 24,999',
    period: '/month',
    renews: 'June 12, 2025',
    status: 'Active'
  };

  const recentInvoices = [
    { id: 'INV-2025-0052', date: 'May 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
    { id: 'INV-2025-0041', date: 'Apr 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
    { id: 'INV-2025-0030', date: 'Mar 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
    { id: 'INV-2025-0019', date: 'Feb 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
    { id: 'INV-2025-0008', date: 'Jan 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' }
  ];

  const usageStats = {
    users: { used: 12, total: 20, percentage: 60 },
    dataSources: { used: 15, total: 25, percentage: 60 },
    reports: { used: 8, total: 15, percentage: 53 },
    aiRequests: { used: 2450, total: 5000, percentage: 49 }
  };

  const getPrice = (plan) => {
    if (plan.isEnterprise) return 'Custom';
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const formatPrice = (price) => {
    if (price === 'Custom') return 'Custom';
    return `KES ${price.toLocaleString()}`;
  };

  const getPeriod = (plan) => {
    if (plan.isEnterprise) return '';
    return billingCycle === 'monthly' ? '/month' : '/year';
  };

  return (
    <div>
      <Navbar />
      
      {/* Current Plan Banner */}
      <section style={{ 
        padding: '2rem 0',
        background: 'linear-gradient(135deg, #faf5ff 0%, #ffffff 50%)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
                {currentPlan.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                <span style={{
                  background: '#d1fae5',
                  color: '#065f46',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}>
                  {currentPlan.status}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Renews on {currentPlan.renews}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
                  {currentPlan.price}
                  <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>
                    {currentPlan.period}
                  </span>
                </p>
              </div>
              <button style={{
                background: 'transparent',
                border: '1px solid #7c3aed',
                padding: '0.5rem 1.5rem',
                borderRadius: '8px',
                color: '#7c3aed',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                Manage Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section style={{ padding: '2rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              color: '#1a1a1a',
              marginBottom: '0.5rem'
            }}>
              Simple, Transparent Pricing
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Choose the plan that fits your business needs.
            </p>
          </div>

          {/* Billing Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '0.5rem 2rem',
                borderRadius: '8px',
                border: billingCycle === 'monthly' ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                background: billingCycle === 'monthly' ? '#faf5ff' : 'white',
                color: billingCycle === 'monthly' ? '#7c3aed' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '0.5rem 2rem',
                borderRadius: '8px',
                border: billingCycle === 'yearly' ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                background: billingCycle === 'yearly' ? '#faf5ff' : 'white',
                color: billingCycle === 'yearly' ? '#7c3aed' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              Yearly
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#22c55e',
                color: 'white',
                padding: '0.15rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.65rem',
                fontWeight: 700
              }}>
                Save 16%
              </span>
            </button>
          </div>

          {/* Pricing Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {plans.map((plan) => {
              const price = getPrice(plan);
              const period = getPeriod(plan);
              const isExpanded = expandedPlan === plan.id;

              return (
                <div key={plan.id} style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: plan.popular ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                  padding: '2rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxShadow: plan.popular ? '0 4px 20px rgba(124, 58, 237, 0.12)' : 'none'
                }}>
                  {plan.popular && (
                    <span style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '20px',
                      background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                      color: 'white',
                      padding: '0.25rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      Most Popular
                    </span>
                  )}
                  
                  {plan.isEnterprise && (
                    <span style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '20px',
                      background: '#1a1a1a',
                      color: 'white',
                      padding: '0.25rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      Enterprise
                    </span>
                  )}

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                    {plan.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {plan.description}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    {plan.isEnterprise ? (
                      <p style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a1a' }}>
                        Custom
                      </p>
                    ) : (
                      <>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a' }}>
                          {formatPrice(price)}
                          <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-secondary)' }}>
                            {period}
                          </span>
                        </p>
                        {billingCycle === 'yearly' && !plan.isEnterprise && (
                          <p style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 600 }}>
                            Save {plan.savings} vs monthly
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <Link to={plan.isEnterprise ? '/contact' : '/demo'}>
                    <button style={{
                      width: '100%',
                      background: plan.popular ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'transparent',
                      border: plan.popular ? 'none' : '1px solid #7c3aed',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      color: plan.popular ? 'white' : '#7c3aed',
                      fontWeight: 600,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      marginBottom: '1.5rem'
                    }}>
                      {plan.buttonText}
                    </button>
                  </Link>

                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
                    <p style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#1a1a1a' }}>
                      Features included:
                    </p>
                    {plan.features.slice(0, isExpanded ? plan.features.length : 5).map((feature, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Check size={16} color="#22c55e" />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 5 && (
                      <button
                        onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#7c3aed',
                          fontWeight: 600,
                          cursor: 'pointer',
                          marginTop: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                      >
                        {isExpanded ? 'Show less' : `Show ${plan.features.length - 5} more features`}
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Billing Center Section */}
      <section style={{ padding: '4rem 0', background: '#fafafa' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: '#1a1a1a',
            marginBottom: '2rem'
          }}>
            Billing Center
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Current Plan</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a' }}>
                KES 24,999 / month
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Renews on June 12, 2025
              </p>
              <button style={{
                marginTop: '1rem',
                background: 'transparent',
                border: '1px solid #7c3aed',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                color: '#7c3aed',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                View Subscription
              </button>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Next Billing</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a' }}>
                June 12, 2025
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                KES 24,999 · Monthly subscription
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Amount Due</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22c55e' }}>
                KES 0
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                You're all caught up!
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Paid</p>
              <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a' }}>
                KES 149,994
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                This Year · 2025 total payments
              </p>
            </div>
          </div>

          {/* Usage Stats */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Usage This Month
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Users</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>
                    {usageStats.users.used}/{usageStats.users.total}
                  </span>
                </div>
                <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${usageStats.users.percentage}%`, height: '100%', background: '#7c3aed' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Data Sources</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>
                    {usageStats.dataSources.used}/{usageStats.dataSources.total}
                  </span>
                </div>
                <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${usageStats.dataSources.percentage}%`, height: '100%', background: '#22c55e' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Reports</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>
                    {usageStats.reports.used}/{usageStats.reports.total}
                  </span>
                </div>
                <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${usageStats.reports.percentage}%`, height: '100%', background: '#f59e0b' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>AI Requests</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>
                    {usageStats.aiRequests.used}/{usageStats.aiRequests.total}
                  </span>
                </div>
                <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${usageStats.aiRequests.percentage}%`, height: '100%', background: '#ef4444' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Invoices Table */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            overflowX: 'auto'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Recent Invoices
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Invoice ID</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Description</th>
                  <th style={{ textAlign: 'right', padding: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Amount</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 500 }}>{invoice.id}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{invoice.date}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{invoice.description}</td>
                    <td style={{ padding: '0.75rem', fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 600, textAlign: 'right' }}>{invoice.amount}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{
                        background: '#d1fae5',
                        color: '#065f46',
                        padding: '0.15rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem'
          }}>
            Need More Power?
          </h2>
          <p style={{ 
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Upgrade your plan for more users, higher limits and advanced features.
          </p>
          <Link to="/demo">
            <button style={{ 
              background: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              color: '#7c3aed',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              Upgrade Plan →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;