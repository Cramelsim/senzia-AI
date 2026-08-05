import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './Pricing.css';

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
    users: { used: 12, total: 20, percentage: 60, color: 'indigo' },
    dataSources: { used: 15, total: 25, percentage: 60, color: 'green' },
    reports: { used: 8, total: 15, percentage: 53, color: 'gold' },
    aiRequests: { used: 2450, total: 5000, percentage: 49, color: 'red' }
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
    <div className="pricing-page">
      <Navbar />

      {/* Current Plan Banner */}
      <section className="current-plan-banner">
        <div className="container current-plan-row">
          <div>
            <h2 className="current-plan-name">{currentPlan.name}</h2>
            <div className="current-plan-meta">
              <span className="status-badge">{currentPlan.status}</span>
              <span className="current-plan-renews">Renews on {currentPlan.renews}</span>
            </div>
          </div>
          <div className="current-plan-actions">
            <p className="current-plan-price">
              {currentPlan.price}
              <span className="current-plan-period">{currentPlan.period}</span>
            </p>
            <button className="btn-outline">Manage Plan</button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-heading">
            <span className="eyebrow">Pricing</span>
            <h1 className="pricing-title">Simple, Transparent Pricing</h1>
            <p className="pricing-subtitle">Choose the plan that fits your business needs.</p>
          </div>

          <div className="billing-toggle">
            <button
              className={`toggle-btn${billingCycle === 'monthly' ? ' active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`toggle-btn${billingCycle === 'yearly' ? ' active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <span className="save-badge">Save 16%</span>
            </button>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => {
              const price = getPrice(plan);
              const period = getPeriod(plan);
              const isExpanded = expandedPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`plan-card${plan.popular ? ' popular' : ''}${plan.isEnterprise ? ' enterprise' : ''}`}
                >
                  {plan.popular && <span className="plan-tag popular-tag">Most Popular</span>}
                  {plan.isEnterprise && <span className="plan-tag enterprise-tag">Enterprise</span>}

                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>

                  <div className="plan-price-block">
                    {plan.isEnterprise ? (
                      <p className="plan-price">Custom</p>
                    ) : (
                      <>
                        <p className="plan-price">
                          {formatPrice(price)}
                          <span className="plan-period">{period}</span>
                        </p>
                        {billingCycle === 'yearly' && (
                          <p className="plan-savings">Save {plan.savings} vs monthly</p>
                        )}
                      </>
                    )}
                  </div>

                  <Link to={plan.isEnterprise ? '/contact' : '/demo'}>
                    <button className={`plan-btn${plan.popular ? ' filled' : ''}`}>
                      {plan.buttonText}
                    </button>
                  </Link>

                  <div className="plan-features">
                    <p className="plan-features-label">Features included:</p>
                    {plan.features.slice(0, isExpanded ? plan.features.length : 5).map((feature, index) => (
                      <div className="plan-feature" key={index}>
                        <Check size={16} className="feature-check" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 5 && (
                      <button
                        className="show-more-btn"
                        onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
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
      <section className="billing-center">
        <div className="container">
          <h2 className="section-title left">Billing Center</h2>

          <div className="billing-summary-grid">
            <div className="summary-card">
              <p className="summary-label">Current Plan</p>
              <p className="summary-value">KES 24,999 / month</p>
              <p className="summary-note">Renews on June 12, 2025</p>
              <button className="btn-outline small">View Subscription</button>
            </div>

            <div className="summary-card">
              <p className="summary-label">Next Billing</p>
              <p className="summary-value">June 12, 2025</p>
              <p className="summary-note">KES 24,999 · Monthly subscription</p>
            </div>

            <div className="summary-card">
              <p className="summary-label">Amount Due</p>
              <p className="summary-value good">KES 0</p>
              <p className="summary-note">You're all caught up!</p>
            </div>

            <div className="summary-card">
              <p className="summary-label">Total Paid</p>
              <p className="summary-value">KES 149,994</p>
              <p className="summary-note">This Year · 2025 total payments</p>
            </div>
          </div>

          {/* Usage Stats */}
          <div className="usage-card">
            <h3 className="card-heading">Usage This Month</h3>
            <div className="usage-grid">
              <div className="usage-item">
                <div className="usage-row">
                  <span>Users</span>
                  <span className="usage-count">{usageStats.users.used}/{usageStats.users.total}</span>
                </div>
                <div className="usage-track">
                  <div className={`usage-fill ${usageStats.users.color}`} style={{ width: `${usageStats.users.percentage}%` }} />
                </div>
              </div>
              <div className="usage-item">
                <div className="usage-row">
                  <span>Data Sources</span>
                  <span className="usage-count">{usageStats.dataSources.used}/{usageStats.dataSources.total}</span>
                </div>
                <div className="usage-track">
                  <div className={`usage-fill ${usageStats.dataSources.color}`} style={{ width: `${usageStats.dataSources.percentage}%` }} />
                </div>
              </div>
              <div className="usage-item">
                <div className="usage-row">
                  <span>Reports</span>
                  <span className="usage-count">{usageStats.reports.used}/{usageStats.reports.total}</span>
                </div>
                <div className="usage-track">
                  <div className={`usage-fill ${usageStats.reports.color}`} style={{ width: `${usageStats.reports.percentage}%` }} />
                </div>
              </div>
              <div className="usage-item">
                <div className="usage-row">
                  <span>AI Requests</span>
                  <span className="usage-count">{usageStats.aiRequests.used}/{usageStats.aiRequests.total}</span>
                </div>
                <div className="usage-track">
                  <div className={`usage-fill ${usageStats.aiRequests.color}`} style={{ width: `${usageStats.aiRequests.percentage}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Invoices Table */}
          <div className="invoices-card">
            <h3 className="card-heading">Recent Invoices</h3>
            <div className="table-scroll">
              <table className="invoices-table">
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th className="align-right">Amount</th>
                    <th className="align-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="mono">{invoice.id}</td>
                      <td>{invoice.date}</td>
                      <td>{invoice.description}</td>
                      <td className="align-right strong">{invoice.amount}</td>
                      <td className="align-center">
                        <span className="status-badge">{invoice.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <div className="container cta-inner">
          <h2 className="cta-title">Need More Power?</h2>
          <p className="cta-subtitle">
            Upgrade your plan for more users, higher limits and advanced features.
          </p>
          <Link to="/demo">
            <button className="cta-button">Upgrade Plan →</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;