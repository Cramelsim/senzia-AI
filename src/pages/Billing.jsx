import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Calendar,
  Download,
  FileText,
  Users,
  Database,
  Zap,
  ChevronRight,
  Check,
  MoreVertical,
  Plus,
  HelpCircle,
  MessageCircle,
  DollarSign,
} from 'lucide-react';
import AppShell from './AppShell';
import './Billing.css';

const currentPlan = {
  name: 'Professional Plan',
  price: 'KES 24,999',
  period: '/month',
  renews: 'June 12, 2025',
  status: 'Active',
  features: [
    'Up to 20 users',
    'Up to 20 branches',
    'Unlimited data sources',
    'AI Insights & Recommendations',
    'Phone, Email & Chat Support',
  ],
};

const billingStats = [
  { label: 'Next Billing', value: 'June 12, 2025', subtext: 'KES 24,999', icon: Calendar },
  { label: 'Amount Due', value: 'KES 0', subtext: "You're all caught up!", icon: CreditCard, tone: 'good' },
  { label: 'Total Paid', value: 'KES 149,994', subtext: 'This Year', icon: DollarSign },
];

const invoices = [
  { id: 'INV-2025-0052', date: 'May 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
  { id: 'INV-2025-0041', date: 'Apr 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
  { id: 'INV-2025-0030', date: 'Mar 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
  { id: 'INV-2025-0019', date: 'Feb 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
  { id: 'INV-2025-0008', date: 'Jan 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
];

const usageStats = [
  { label: 'Users', used: 12, total: 20, icon: Users },
  { label: 'Data Sources', used: 15, total: 25, icon: Database },
  { label: 'Reports', used: 8, total: 15, icon: FileText },
  { label: 'AI Requests', used: 2450, total: 5000, icon: Zap },
];

const addons = [
  { name: 'Additional Users', used: 12, total: 20, price: 'KES 5,000', icon: Users },
  { name: 'Extra Data Sources', used: 15, total: 25, price: 'KES 3,000', icon: Database },
  { name: 'Additional AI Requests', used: 2450, total: 5000, price: 'KES 2,500', icon: Zap },
];

const paymentMethod = {
  last4: '4242',
  expiry: '08/27',
  name: 'Senzia Limited',
  address: 'PO Box 12345, Nairobi, Kenya',
  email: 'info@senzia.com',
  phone: '+254 700 000 000',
};

const statusPill = (status) => {
  switch (status) {
    case 'Paid': return 'pill-success';
    case 'Pending': return 'pill-warning';
    case 'Failed': return 'pill-danger';
    default: return 'pill-warning';
  }
};

const Billing = () => {
  const [page] = useState(1);

  return (
    <AppShell
      active="Billing"
      pageIcon={CreditCard}
      title="Billing Center"
      subtitle="Manage your subscription, invoices, payments and billing preferences."
      headerActions={
        <>
          <button className="btn btn-ghost"><FileText size={16} /> View All Invoices</button>
          <button className="btn btn-primary"><Plus size={16} /> Upgrade Plan</button>
        </>
      }
    >
      {/* ---- Current plan banner ---- */}
      <div className="panel plan-banner">
        <div className="plan-banner-top">
          <div>
            <div className="plan-banner-title">
              <h2>{currentPlan.name}</h2>
              <span className="pill pill-success">{currentPlan.status}</span>
            </div>
            <p className="plan-price">
              {currentPlan.price}
              <span>{currentPlan.period}</span>
            </p>
            <p className="plan-renews-text">Renews on {currentPlan.renews}</p>
          </div>
          <div className="plan-banner-actions">
            <button className="btn btn-outline-accent">Manage Plan</button>
            <button className="btn btn-ghost btn-icon-only" aria-label="More options">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
        <div className="plan-features">
          {currentPlan.features.map((feature) => (
            <div className="plan-feature" key={feature}>
              <Check size={16} color="var(--success)" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Stat cards ---- */}
      <div className="stat-grid">
        {billingStats.map(({ label, value, subtext, icon: Icon, tone }) => (
          <div className="rail-card stat-card" key={label}>
            <div className="stat-card-top">
              <Icon size={20} color={tone === 'good' ? 'var(--success)' : 'var(--accent)'} />
              <span>{label}</span>
            </div>
            <p className="stat-card-value">{value}</p>
            <p className="stat-card-subtext">{subtext}</p>
          </div>
        ))}
      </div>

      {/* ---- Two column layout ---- */}
      <div className="billing-layout">
        <div className="content-stack">
          {/* Invoices */}
          <div className="panel">
            <div className="panel-head">
              <div>
                <h3>Recent Invoices</h3>
                <p>Your last five billing statements.</p>
              </div>
              <Link to="/billing/invoices" className="link-accent">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th className="num">Amount</th>
                  <th className="center">Status</th>
                  <th className="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td style={{ fontWeight: 500 }}>{invoice.id}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{invoice.date}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{invoice.description}</td>
                    <td className="num" style={{ fontWeight: 600 }}>{invoice.amount}</td>
                    <td className="center">
                      <span className={`pill ${statusPill(invoice.status)}`}>{invoice.status}</span>
                    </td>
                    <td className="center">
                      <button className="icon-btn" aria-label={`Download ${invoice.id}`}>
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="table-footer">
              <span>Showing 1 to 5 of 5 results</span>
              <div className="pager">
                <button disabled>Previous</button>
                <button className={page === 1 ? 'active' : ''}>1</button>
                <button disabled>Next</button>
              </div>
            </div>
          </div>

          {/* Usage this month */}
          <div className="panel">
            <div className="panel-head">
              <div>
                <h3>Usage This Month</h3>
                <p>How much of your plan's limits you've used so far.</p>
              </div>
            </div>
            <div className="usage-grid">
              {usageStats.map(({ label, used, total, icon: Icon }) => {
                const pct = Math.round((used / total) * 100);
                return (
                  <div className="usage-item" key={label}>
                    <div className="usage-item-top">
                      <div className="usage-item-label">
                        <Icon size={16} color="var(--accent)" />
                        <span>{label}</span>
                      </div>
                      <span className="usage-item-count">{used.toLocaleString()}/{total.toLocaleString()}</span>
                    </div>
                    <div className="usage-bar-track">
                      <div className="usage-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Add-ons & Extras</h4>
            {addons.map(({ name, used, total, price, icon: Icon }) => (
              <div className="addon-row" key={name}>
                <div className="addon-row-left">
                  <Icon size={16} color="var(--accent)" />
                  <div>
                    <p>{name}</p>
                    <p className="addon-row-usage">{used.toLocaleString()}/{total.toLocaleString()}</p>
                  </div>
                </div>
                <span className="addon-row-price">{price}</span>
              </div>
            ))}
            <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: '0.9rem' }}>Manage Add-ons</button>
          </div>

          <div className="rail-card">
            <h4>Payment Method</h4>
            <div className="payment-card">
              <div className="payment-card-top">
                <div className="payment-brand">VISA</div>
                <div>
                  <p className="payment-card-name">Visa ending in {paymentMethod.last4}</p>
                  <p className="payment-card-expiry">Expires {paymentMethod.expiry}</p>
                </div>
              </div>
              <div className="payment-billing-info">
                <p className="payment-billing-label">Billing Information</p>
                <p>{paymentMethod.name}</p>
                <p>{paymentMethod.address}</p>
                <p>{paymentMethod.email}</p>
                <p>{paymentMethod.phone}</p>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: '0.9rem' }}>Update Billing Info</button>
          </div>

          <div className="rail-card upgrade-banner">
            <h4>Need More Power?</h4>
            <p>Upgrade your plan for more users, higher limits and advanced features.</p>
            <Link to="/pricing">
              <button className="btn btn-primary btn-block">Upgrade Plan <ChevronRight size={15} /></button>
            </Link>
          </div>
        </div>
      </div>

      {/* Need help footer strip */}
      <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <HelpCircle size={22} color="var(--accent)" />
          <div>
            <p style={{ fontWeight: 600, margin: 0 }}>Need Help?</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0' }}>
              Our support team is here to help you 24/7.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-whatsapp"><MessageCircle size={16} /> Chat on WhatsApp</button>
          <button className="btn btn-primary">Contact Support</button>
        </div>
      </div>
    </AppShell>
  );
};

export default Billing;