import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Check, ArrowRight,
  Rocket, Building2, ShieldCheck,
  Utensils, Store, Pill, Fuel, Users, ShoppingCart, MapPin, Landmark,
  Clock, Globe, Award,
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './Pricing.css';

const planMeta = {
  starter: { icon: Rocket, color: 'var(--gold)' },
  professional: { icon: Building2, color: 'var(--indigo)' },
  enterprise: { icon: ShieldCheck, color: 'var(--violet)' },
};

const trustItems = [
  { icon: ShieldCheck, title: 'Enterprise-grade security.', sub: 'Your data is always protected.' },
  { icon: Clock, title: '99.9%', sub: 'Uptime SLA' },
  { icon: ShieldCheck, title: 'Bank-level', sub: 'Security' },
  { icon: Award, title: 'ISO 27001', sub: 'Certified' },
  { icon: Globe, title: 'GDPR', sub: 'Compliant' },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      sub: 'For single-branch businesses',
      description: 'Everything you need to get started with smarter business intelligence.',
      monthlyPrice: 15000,
      yearlyPrice: 144000,
      savings: '20%',
      listLabel: 'Includes:',
      features: [
        'Financial Intelligence',
        'Forecasting Intelligence',
        'AI Business Assistant',
        'Daily Email Reports',
        'Manual Data Upload',
        'Basic Integrations',
        'Up to 5 Users'
      ],
      bestFor: [
        { icon: Utensils, label: 'Small restaurants' },
        { icon: Store, label: 'Retail shops' },
        { icon: Pill, label: 'Pharmacies' },
        { icon: Fuel, label: 'Small petrol stations' },
      ],
      buttonText: 'Start Free Trial',
      ctaNote: 'No credit card required',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      sub: 'For growing businesses',
      description: 'Advanced tools and insights to help you optimize operations and grow faster.',
      monthlyPrice: 35000,
      yearlyPrice: 336000,
      savings: '20%',
      listLabel: 'Everything in Starter, plus:',
      features: [
        'Fraud & Risk Intelligence',
        'Business Opportunity Engine',
        'POS Integrations',
        'M-Pesa Integrations',
        'Inventory Intelligence',
        'Advanced Forecasting',
        'Branch Comparison',
        'Up to 20 Users'
      ],
      bestFor: [
        { icon: Utensils, label: 'Medium-sized restaurants' },
        { icon: Users, label: 'Clubs' },
        { icon: ShoppingCart, label: 'Supermarkets' },
        { icon: MapPin, label: 'Multiple outlets' },
      ],
      buttonText: 'Start Free Trial',
      ctaNote: 'No credit card required',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      sub: 'For multi-branch organizations',
      description: 'Tailored solutions with unlimited scale, security, and expert support.',
      monthlyPrice: null,
      yearlyPrice: null,
      listLabel: 'Everything in Professional, plus:',
      features: [
        'Unlimited Branches',
        'Custom Integrations',
        'Bank Integrations',
        'Executive Dashboard',
        'Dedicated Success Manager',
        'AI + Human Expert Reviews',
        'Custom Reports',
        'API Access',
        'Unlimited Users'
      ],
      bestFor: [
        { icon: Building2, label: 'Hotel chains' },
        { icon: Fuel, label: 'Petrol station chains' },
        { icon: ShoppingCart, label: 'Supermarket chains' },
        { icon: Landmark, label: 'Large enterprises' },
      ],
      buttonText: 'Contact Sales',
      ctaNote: 'Personalized demo & pricing',
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
            <button
              className="btn-outline"
              onClick={() => document.getElementById('billing-center')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Manage Plan
            </button>
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
              <span className="save-badge">Save 20%</span>
            </button>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => {
              const price = getPrice(plan);
              const period = getPeriod(plan);
              const { icon: PlanIcon, color: iconColor } = planMeta[plan.id];

              return (
                <div
                  key={plan.id}
                  className={`plan-card${plan.popular ? ' popular' : ''}${plan.isEnterprise ? ' enterprise' : ''}`}
                >
                  {plan.popular && <span className="plan-tag popular-tag">Most Popular</span>}
                  {plan.isEnterprise && <span className="plan-tag enterprise-tag">Enterprise</span>}

                  <div className="plan-card-head-row">
                    <div className="plan-icon-box" style={{ color: iconColor, borderColor: iconColor }}>
                      <PlanIcon size={20} />
                    </div>
                    <div>
                      <h3 className="plan-name">{plan.name}</h3>
                      <p className="plan-sub">{plan.sub}</p>
                    </div>
                  </div>

                  <div className="plan-price-block">
                    {plan.isEnterprise ? (
                      <p className="plan-price">Custom Pricing</p>
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

                  <p className="plan-description">{plan.description}</p>

                  <div className="plan-features">
                    <p className="plan-features-label">{plan.listLabel}</p>
                    {plan.features.map((feature, index) => (
                      <div className="plan-feature" key={index}>
                        <Check size={16} className="feature-check" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="plan-bestfor">
                    <p className="plan-features-label muted">Best for:</p>
                    {plan.bestFor.map(({ icon: BIcon, label }) => (
                      <div className="plan-bestfor-item" key={label}>
                        <BIcon size={14} /> {label}
                      </div>
                    ))}
                  </div>

                  <Link to={plan.isEnterprise ? '/contact' : '/demo'}>
                    <button className={`plan-btn${plan.popular ? ' filled' : ''}`}>
                      {plan.buttonText} <ArrowRight size={16} />
                    </button>
                  </Link>
                  <p className="plan-cta-note">{plan.ctaNote}</p>
                </div>
              );
            })}
          </div>

          {/* Trust strip — new, additive */}
          <div className="pricing-trust-strip">
            {trustItems.map(({ icon: Icon, title, sub }) => (
              <div className="trust-item" key={title + sub}>
                <div className="trust-item-icon"><Icon size={16} /></div>
                <div>
                  <p>{title}</p>
                  <p>{sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="pricing-footer-note">
            Not sure which plan is right for you? <Link to="/contact">Talk to an Expert <ArrowRight size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /></Link>
          </p>
        </div>
      </section>

      {/* Billing Center Section */}
      <section className="billing-center" id="billing-center">
        <div className="container">
          <h2 className="section-title left">Billing Center</h2>

          <div className="billing-summary-grid">
            <div className="summary-card">
              <p className="summary-label">Current Plan</p>
              <p className="summary-value">KES 24,999 / month</p>
              <p className="summary-note">Renews on June 12, 2025</p>
              <button className="btn-outline small" onClick={() => navigate('/billing')}>View Subscription</button>
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