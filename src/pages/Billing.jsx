import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Modal from '../Modal';
import { useToast } from '../Toast';
import { downloadFile } from '../download';
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
  {
    label: 'Next Billing',
    value: 'June 12, 2025',
    subtext: 'KES 24,999',
    icon: Calendar,
  },
  {
    label: 'Amount Due',
    value: 'KES 0',
    subtext: "You're all caught up!",
    icon: CreditCard,
    tone: 'good',
  },
  {
    label: 'Total Paid',
    value: 'KES 149,994',
    subtext: 'This Year',
    icon: DollarSign,
  },
];

const invoices = [
  {
    id: 'INV-2025-0052',
    date: 'May 12, 2025',
    description: 'Professional Plan - Monthly',
    amount: 'KES 24,999',
    status: 'Paid',
  },
  {
    id: 'INV-2025-0041',
    date: 'Apr 12, 2025',
    description: 'Professional Plan - Monthly',
    amount: 'KES 24,999',
    status: 'Paid',
  },
  {
    id: 'INV-2025-0030',
    date: 'Mar 12, 2025',
    description: 'Professional Plan - Monthly',
    amount: 'KES 24,999',
    status: 'Paid',
  },
  {
    id: 'INV-2025-0019',
    date: 'Feb 12, 2025',
    description: 'Professional Plan - Monthly',
    amount: 'KES 24,999',
    status: 'Paid',
  },
  {
    id: 'INV-2025-0008',
    date: 'Jan 12, 2025',
    description: 'Professional Plan - Monthly',
    amount: 'KES 24,999',
    status: 'Paid',
  },
  {
    id: 'INV-2024-0097',
    date: 'Dec 12, 2024',
    description: 'Professional Plan - Monthly',
    amount: 'KES 24,999',
    status: 'Paid',
  },
  {
    id: 'INV-2024-0086',
    date: 'Nov 12, 2024',
    description: 'Professional Plan - Monthly',
    amount: 'KES 24,999',
    status: 'Paid',
  },
  {
    id: 'INV-2024-0075',
    date: 'Oct 12, 2024',
    description: 'Professional Plan - Monthly',
    amount: 'KES 24,999',
    status: 'Paid',
  },
];

const INVOICE_PREVIEW = 5;
const BILLING_INFO_KEY = 'senzia_billing_info';
const ADDON_STEPS = { 'Additional Users': 5, 'Extra Data Sources': 5, 'Additional AI Requests': 1000 };

const loadBillingInfo = (fallback) => {
  try {
    const saved = JSON.parse(localStorage.getItem(BILLING_INFO_KEY));
    return saved && typeof saved === 'object' ? { ...fallback, ...saved } : fallback;
  } catch {
    return fallback;
  }
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

const invoiceHtml = (invoice, billing) => `<!doctype html>
<html><head><meta charset="utf-8"><title>${invoice.id}</title>
<style>body{font-family:sans-serif;max-width:640px;margin:2rem auto;color:#14171d}table{width:100%;border-collapse:collapse;margin-top:1.5rem}td,th{padding:.6rem;border-bottom:1px solid #ddd;text-align:left}</style>
</head><body>
<h1>Senzia</h1>
<p><strong>Invoice ${invoice.id}</strong><br>Date: ${invoice.date}<br>Status: ${invoice.status}</p>
<p><strong>Billed to</strong><br>${escapeHtml(billing.name)}<br>${escapeHtml(billing.address)}<br>${escapeHtml(billing.email)}</p>
<table><tr><th>Description</th><th>Amount</th></tr><tr><td>${invoice.description}</td><td>${invoice.amount}</td></tr></table>
<p style="margin-top:1.5rem"><strong>Total: ${invoice.amount}</strong></p>
</body></html>`;

const usageStats = [
  {
    label: 'Users',
    used: 12,
    total: 20,
    icon: Users,
  },
  {
    label: 'Data Sources',
    used: 15,
    total: 25,
    icon: Database,
  },
  {
    label: 'Reports',
    used: 8,
    total: 15,
    icon: FileText,
  },
  {
    label: 'AI Requests',
    used: 2450,
    total: 5000,
    icon: Zap,
  },
];

const addons = [
  {
    name: 'Additional Users',
    used: 12,
    total: 20,
    price: 'KES 5,000',
    icon: Users,
  },
  {
    name: 'Extra Data Sources',
    used: 15,
    total: 25,
    price: 'KES 3,000',
    icon: Database,
  },
  {
    name: 'Additional AI Requests',
    used: 2450,
    total: 5000,
    price: 'KES 2,500',
    icon: Zap,
  },
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
    case 'Paid':
      return 'pill-success';
    case 'Pending':
      return 'pill-warning';
    case 'Failed':
      return 'pill-danger';
    default:
      return 'pill-warning';
  }
};

const Billing = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showAllInvoices, setShowAllInvoices] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [billing, setBilling] = useState(() => loadBillingInfo(paymentMethod));
  const [billingForm, setBillingForm] = useState(billing);
  const [addonList, setAddonList] = useState(addons);
  const [modal, setModal] = useState(null); // 'plan' | 'addons' | 'billing'
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const invoicesRef = useRef(null);

  useEffect(() => {
    const onMouseDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const visibleInvoices = showAllInvoices ? invoices : invoices.slice(0, INVOICE_PREVIEW);
  const closeModal = () => setModal(null);

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const downloadInvoice = (invoice) => {
    downloadFile(`${invoice.id}.html`, invoiceHtml(invoice, billing), 'text/html');
    toast(`${invoice.id} downloaded.`);
  };

  const viewAllInvoices = () => {
    setShowAllInvoices(true);
    invoicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancelToggle = () => {
    if (!cancelling && !window.confirm(`Cancel your subscription? You keep access until ${currentPlan.renews}.`)) return;
    setCancelling(!cancelling);
    closeModal();
    toast(cancelling ? 'Subscription resumed.' : `Subscription will end on ${currentPlan.renews}.`, cancelling ? 'success' : 'info');
  };

  const handleAddAddon = (name) => {
    const step = ADDON_STEPS[name];
    setAddonList((list) => list.map((a) => (a.name === name ? { ...a, total: a.total + step } : a)));
    toast(`Added ${step.toLocaleString()} to ${name}.`);
  };

  const handleBillingSave = (e) => {
    e.preventDefault();
    const next = Object.fromEntries(Object.entries(billingForm).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
    if (!next.name) return toast('Enter a billing name.', 'error');
    if (!/^\S+@\S+\.\S+$/.test(next.email)) return toast('Enter a valid billing email.', 'error');
    setBilling(next);
    try {
      localStorage.setItem(BILLING_INFO_KEY, JSON.stringify(next));
    } catch {
      // storage unavailable - the update still applies for this session
    }
    closeModal();
    toast('Billing information updated.');
  };

  const openBillingModal = () => {
    setBillingForm(billing);
    setMenuOpen(false);
    setModal('billing');
  };

  return (
    <AppShell
      active="Billing"
      pageIcon={CreditCard}
      title="Billing Center"
      subtitle="Manage your subscription, invoices, payments and billing preferences."
      userName={user?.name || 'John M.'}
      businessName={user?.businessName || 'Senzia Limited'}
      onLogout={onLogout}
      headerActions={
        <>
          <button className="btn btn-ghost" onClick={viewAllInvoices}>
            <FileText size={16} />
            View All Invoices
          </button>

          <button
            className="btn btn-primary"
            onClick={handleUpgrade}
          >
            <Plus size={16} />
            Upgrade Plan
          </button>
        </>
      }
    >
      {/* ---- Current plan banner ---- */}
      <div className="panel plan-banner">
        <div className="plan-banner-top">
          <div>
            <div className="plan-banner-title">
              <h2>{currentPlan.name}</h2>
              <span className={`pill ${cancelling ? 'pill-warning' : 'pill-success'}`}>
                {cancelling ? 'Cancelling' : currentPlan.status}
              </span>
            </div>

            <p className="plan-price">
              {currentPlan.price}
              <span>{currentPlan.period}</span>
            </p>

            <p className="plan-renews-text">
              {cancelling ? 'Ends on' : 'Renews on'} {currentPlan.renews}
            </p>
          </div>

          <div className="plan-banner-actions">
            <button className="btn btn-outline-accent" onClick={() => setModal('plan')}>
              Manage Plan
            </button>

            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                className="btn btn-ghost btn-icon-only"
                aria-label="More options"
                aria-haspopup="true"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <MoreVertical size={18} />
              </button>
              {menuOpen && (
                <div className="notif-dropdown-menu" role="menu" style={{ width: 220, top: 'calc(100% + 0.4rem)' }}>
                  <button type="button" role="menuitem" className="search-result-row" onClick={() => { setMenuOpen(false); downloadInvoice(invoices[0]); }}>
                    <Download size={15} /> Download latest invoice
                  </button>
                  <button type="button" role="menuitem" className="search-result-row" onClick={openBillingModal}>
                    <CreditCard size={15} /> Update billing info
                  </button>
                  <button type="button" role="menuitem" className="search-result-row" onClick={() => { setMenuOpen(false); handleUpgrade(); }}>
                    <Plus size={15} /> Change plan
                  </button>
                </div>
              )}
            </div>
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
        {billingStats.map(
          ({ label, value, subtext, icon: Icon, tone }) => (
            <div className="rail-card stat-card" key={label}>
              <div className="stat-card-top">
                <Icon
                  size={20}
                  color={
                    tone === 'good'
                      ? 'var(--success)'
                      : 'var(--accent)'
                  }
                />
                <span>{label}</span>
              </div>

              <p className="stat-card-value">{value}</p>
              <p className="stat-card-subtext">{subtext}</p>
            </div>
          )
        )}
      </div>

      {/* ---- Two column layout ---- */}
      <div className="billing-layout">
        <div className="content-stack">
          {/* Invoices */}
          <div className="panel" ref={invoicesRef}>
            <div className="panel-head">
              <div>
                <h3>{showAllInvoices ? 'All Invoices' : 'Recent Invoices'}</h3>
                <p>{showAllInvoices ? 'Every billing statement on your account.' : 'Your last five billing statements.'}</p>
              </div>

              <button
                type="button"
                className="link-accent"
                onClick={() => setShowAllInvoices((v) => !v)}
              >
                {showAllInvoices ? 'Show Less' : 'View All'} <ChevronRight size={14} />
              </button>
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
                {visibleInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td style={{ fontWeight: 500 }}>
                      {invoice.id}
                    </td>

                    <td
                      style={{
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {invoice.date}
                    </td>

                    <td
                      style={{
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {invoice.description}
                    </td>

                    <td
                      className="num"
                      style={{ fontWeight: 600 }}
                    >
                      {invoice.amount}
                    </td>

                    <td className="center">
                      <span
                        className={`pill ${statusPill(
                          invoice.status
                        )}`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    <td className="center">
                      <button
                        className="icon-btn"
                        aria-label={`Download ${invoice.id}`}
                        onClick={() => downloadInvoice(invoice)}
                      >
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="table-footer">
              <span>Showing 1 to {visibleInvoices.length} of {invoices.length} results</span>
            </div>
          </div>

          {/* Usage this month */}
          <div className="panel">
            <div className="panel-head">
              <div>
                <h3>Usage This Month</h3>
                <p>
                  How much of your plan's limits you've used so far.
                </p>
              </div>
            </div>

            <div className="usage-grid">
              {usageStats.map(
                ({ label, used, total, icon: Icon }) => {
                  const pct = Math.round((used / total) * 100);

                  return (
                    <div className="usage-item" key={label}>
                      <div className="usage-item-top">
                        <div className="usage-item-label">
                          <Icon
                            size={16}
                            color="var(--accent)"
                          />
                          <span>{label}</span>
                        </div>

                        <span className="usage-item-count">
                          {used.toLocaleString()}/
                          {total.toLocaleString()}
                        </span>
                      </div>

                      <div className="usage-bar-track">
                        <div
                          className="usage-bar-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="rail-stack">
          {/* Add-ons */}
          <div className="rail-card">
            <h4>Add-ons & Extras</h4>

            {addonList.map(
              ({ name, used, total, price, icon: Icon }) => (
                <div className="addon-row" key={name}>
                  <div className="addon-row-left">
                    <Icon
                      size={16}
                      color="var(--accent)"
                    />

                    <div>
                      <p>{name}</p>

                      <p className="addon-row-usage">
                        {used.toLocaleString()}/
                        {total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <span className="addon-row-price">
                    {price}
                  </span>
                </div>
              )
            )}

            <button
              className="btn btn-ghost btn-sm btn-block"
              style={{ marginTop: '0.9rem' }}
              onClick={() => setModal('addons')}
            >
              Manage Add-ons
            </button>
          </div>

          {/* Payment method */}
          <div className="rail-card">
            <h4>Payment Method</h4>

            <div className="payment-card">
              <div className="payment-card-top">
                <div className="payment-brand">VISA</div>

                <div>
                  <p className="payment-card-name">
                    Visa ending in {paymentMethod.last4}
                  </p>

                  <p className="payment-card-expiry">
                    Expires {paymentMethod.expiry}
                  </p>
                </div>
              </div>

              <div className="payment-billing-info">
                <p className="payment-billing-label">
                  Billing Information
                </p>

                <p>{billing.name}</p>
                <p>{billing.address}</p>
                <p>{billing.email}</p>
                <p>{billing.phone}</p>
              </div>
            </div>

            <button
              className="btn btn-ghost btn-sm btn-block"
              style={{ marginTop: '0.9rem' }}
              onClick={openBillingModal}
            >
              Update Billing Info
            </button>
          </div>

          {/* Upgrade banner */}
          <div className="rail-card upgrade-banner">
            <h4>Need More Power?</h4>

            <p>
              Upgrade your plan for more users, higher limits and
              advanced features.
            </p>

            <button
              className="btn btn-primary btn-block"
              onClick={handleUpgrade}
            >
              Upgrade Plan <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Need help footer strip */}
      <div
        className="panel"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <HelpCircle
            size={22}
            color="var(--accent)"
          />

          <div>
            <p
              style={{
                fontWeight: 600,
                margin: 0,
              }}
            >
              Need Help?
            </p>

            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                margin: '0.1rem 0 0',
              }}
            >
              Our support team is here to help you 24/7.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
          }}
        >
          <button className="btn btn-whatsapp" onClick={() => window.open('https://wa.me/254700123456', '_blank', 'noopener,noreferrer')}>
            <MessageCircle size={16} />
            Chat on WhatsApp
          </button>

          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Contact Support
          </button>
        </div>
      </div>

      {modal === 'plan' && (
        <Modal
          title="Manage Plan"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={handleCancelToggle}>
                {cancelling ? 'Resume Subscription' : 'Cancel Subscription'}
              </button>
              <button type="button" className="btn btn-primary" onClick={() => { closeModal(); handleUpgrade(); }}>Change Plan</button>
            </>
          }
        >
          <div className="modal-detail-row"><span>Plan</span><span>{currentPlan.name}</span></div>
          <div className="modal-detail-row"><span>Price</span><span>{currentPlan.price}{currentPlan.period}</span></div>
          <div className="modal-detail-row"><span>{cancelling ? 'Ends on' : 'Renews on'}</span><span>{currentPlan.renews}</span></div>
          <div>
            {currentPlan.features.map((feature) => (
              <div className="report-checklist-item" key={feature} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.84rem', marginBottom: '0.3rem' }}>
                <Check size={14} color="var(--success)" /> {feature}
              </div>
            ))}
          </div>
        </Modal>
      )}

      {modal === 'addons' && (
        <Modal title="Manage Add-ons" onClose={closeModal} footer={<button type="button" className="btn btn-ghost" onClick={closeModal}>Done</button>}>
          {addonList.map(({ name, used, total, price }) => (
            <div className="modal-detail-row" key={name} style={{ alignItems: 'center' }}>
              <span style={{ color: 'var(--text-primary)' }}>
                {name}
                <br />
                <small style={{ color: 'var(--text-tertiary)' }}>{used.toLocaleString()}/{total.toLocaleString()} used · {price}/pack</small>
              </span>
              <button type="button" className="btn btn-outline-accent btn-sm" onClick={() => handleAddAddon(name)}>
                + {ADDON_STEPS[name].toLocaleString()}
              </button>
            </div>
          ))}
        </Modal>
      )}

      {modal === 'billing' && (
        <Modal
          title="Update Billing Info"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button type="submit" form="billing-info-form" className="btn btn-primary">Save</button>
            </>
          }
        >
          <form id="billing-info-form" onSubmit={handleBillingSave} style={{ display: 'grid', gap: '0.9rem' }}>
            {[
              ['name', 'Billing name', 'text'],
              ['address', 'Address', 'text'],
              ['email', 'Billing email', 'email'],
              ['phone', 'Phone', 'tel'],
            ].map(([key, label, type]) => (
              <div className="modal-field" key={key}>
                <label htmlFor={`bill-${key}`}>{label}</label>
                <input id={`bill-${key}`} type={type} value={billingForm[key]} onChange={(e) => setBillingForm({ ...billingForm, [key]: e.target.value })} />
              </div>
            ))}
          </form>
        </Modal>
      )}
    </AppShell>
  );
};

export default Billing;