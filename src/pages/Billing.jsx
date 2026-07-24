import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Calendar,
  Download,
  FileText,
  TrendingUp,
  Users,
  Database,
  Zap,
  Mail,
  Phone,
  MapPin,
  Building,
  ChevronRight,
  Check,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Eye,
  Printer,
  Plus,
  Settings,
  HelpCircle,
  MessageCircle,
  DollarSign,
  Receipt,
  BarChart3,
  PieChart
} from 'lucide-react';

const Billing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');

  // Current plan info
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
      'Phone, Email & Chat Support'
    ]
  };

  // Billing overview stats
  const billingStats = [
    {
      label: 'Next Billing',
      value: 'June 12, 2025',
      subtext: 'KES 24,999',
      icon: Calendar,
      color: '#7c3aed'
    },
    {
      label: 'Amount Due',
      value: 'KES 0',
      subtext: 'You\'re all caught up!',
      icon: CreditCard,
      color: '#22c55e'
    },
    {
      label: 'Total Paid',
      value: 'KES 149,994',
      subtext: 'This Year',
      icon: DollarSign,
      color: '#f59e0b'
    }
  ];

  // Recent invoices
  const invoices = [
    { id: 'INV-2025-0052', date: 'May 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
    { id: 'INV-2025-0041', date: 'Apr 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
    { id: 'INV-2025-0030', date: 'Mar 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
    { id: 'INV-2025-0019', date: 'Feb 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' },
    { id: 'INV-2025-0008', date: 'Jan 12, 2025', description: 'Professional Plan - Monthly', amount: 'KES 24,999', status: 'Paid' }
  ];

  // Usage stats
  const usageStats = [
    { label: 'Users', used: 12, total: 20, percentage: 60, icon: Users, color: '#7c3aed' },
    { label: 'Data Sources', used: 15, total: 25, percentage: 60, icon: Database, color: '#22c55e' },
    { label: 'Reports', used: 8, total: 15, percentage: 53, icon: FileText, color: '#f59e0b' },
    { label: 'AI Requests', used: 2450, total: 5000, percentage: 49, icon: Zap, color: '#3b82f6' }
  ];

  // Add-ons
  const addons = [
    { name: 'Additional Users', used: 12, total: 20, price: 'KES 5,000', icon: Users },
    { name: 'Extra Data Sources', used: 15, total: 25, price: 'KES 3,000', icon: Database },
    { name: 'Additional AI Requests', used: 2,450, total: 5,000, price: 'KES 2,500', icon: Zap }
  ];

  // Payment method
  const paymentMethod = {
    type: 'VISA',
    last4: '4242',
    expiry: '08/27',
    name: 'Senzia Limited',
    address: 'PO Box 12345, Nairobi, Kenya',
    email: 'info@senzia.com',
    phone: '+254 700 000 000'
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Paid':
        return { color: '#22c55e', bg: '#dcfce7', label: 'Paid' };
      case 'Pending':
        return { color: '#f59e0b', bg: '#fef3c7', label: 'Pending' };
      case 'Failed':
        return { color: '#ef4444', bg: '#fee2e2', label: 'Failed' };
      default:
        return { color: '#6b7280', bg: '#f3f4f6', label: 'Unknown' };
    }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.75rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'white'
              }}>
                SZ
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>SENZIA</span>
            </Link>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginLeft: '1rem' }}>
              <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
              <Link to="/data-sources" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Data Sources</Link>
              <Link to="/reports" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Reports</Link>
              <Link to="/ai-assistant" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>AI Assistant</Link>
              <Link to="/insights" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Insights</Link>
              <Link to="/settings" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Settings</Link>
              <Link to="/billing" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Billing</Link>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}>
              JM
            </div>
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Billing Center</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Manage your subscription, invoices, payments and billing preferences.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              <FileText size={16} />
              View All Invoices
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              <Plus size={16} />
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Current Plan Banner */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a' }}>
                  {currentPlan.name}
                </h2>
                <span style={{
                  background: '#dcfce7',
                  color: '#22c55e',
                  padding: '0.15rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {currentPlan.status}
                </span>
              </div>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginTop: '0.25rem' }}>
                {currentPlan.price}
                <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-secondary)' }}>
                  {currentPlan.period}
                </span>
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Renews on {currentPlan.renews}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{
                padding: '0.5rem 1.5rem',
                border: '1px solid #7c3aed',
                borderRadius: '8px',
                background: 'transparent',
                color: '#7c3aed',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Manage Plan
              </button>
              <button style={{
                padding: '0.5rem 1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer'
              }}>
                <MoreVertical size={18} color="#6b7280" />
              </button>
            </div>
          </div>

          {/* Plan Features */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '1rem',
            flexWrap: 'wrap',
            borderTop: '1px solid #f0f0f0',
            paddingTop: '1rem'
          }}>
            {currentPlan.features.map((feature, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={16} color="#22c55e" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {billingStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <Icon size={20} color={stat.color} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{stat.label}</span>
                </div>
                <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a' }}>{stat.value}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{stat.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem'
        }}>
          {/* Left Column - Invoices */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>Recent Invoices</h2>
              <Link to="/billing/invoices" style={{
                color: '#7c3aed',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                View All →
              </Link>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              overflow: 'hidden'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Invoice ID</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Description</th>
                      <th style={{ textAlign: 'right', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Amount</th>
                      <th style={{ textAlign: 'center', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Status</th>
                      <th style={{ textAlign: 'center', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => {
                      const status = getStatusBadge(invoice.status);
                      return (
                        <tr key={invoice.id} style={{ borderBottom: index < invoices.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: '#1a1a1a', fontSize: '0.85rem' }}>{invoice.id}</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{invoice.date}</td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{invoice.description}</td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#1a1a1a', fontSize: '0.85rem', textAlign: 'right' }}>{invoice.amount}</td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                            <span style={{
                              background: status.bg,
                              color: status.color,
                              padding: '0.15rem 0.75rem',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}>
                              {status.label}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                            <button style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#6b7280'
                            }}>
                              <Download size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid #f0f0f0',
                background: '#fafafa',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Showing 1 to 5 of 5 results</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Previous</button>
                  <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #7c3aed', borderRadius: '4px', background: '#7c3aed', color: 'white', cursor: 'pointer' }}>1</button>
                  <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Next</button>
                </div>
              </div>
            </div>

            {/* Usage This Month */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginTop: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Usage This Month
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {usageStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Icon size={16} color={stat.color} />
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{stat.label}</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>
                          {stat.used}/{stat.total}
                        </span>
                      </div>
                      <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${stat.percentage}%`,
                          height: '100%',
                          background: stat.color,
                          borderRadius: '4px'
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Add-ons */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Add-ons & Extras
              </h3>
              {addons.map((addon, index) => {
                const Icon = addon.icon;
                return (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: index < addons.length - 1 ? '1px solid #f5f5f5' : 'none'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon size={16} color="#7c3aed" />
                      <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a1a' }}>{addon.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {addon.used}/{addon.total}
                        </p>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>
                      {addon.price}
                    </span>
                  </div>
                );
              })}
              <button style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: 'transparent',
                cursor: 'pointer',
                fontWeight: 500
              }}>
                Manage Add-ons
              </button>
            </div>

            {/* Payment Method */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Payment Method
              </h3>
              <div style={{
                padding: '1rem',
                background: '#fafafa',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '28px',
                    background: '#1a1a1a',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.6rem'
                  }}>
                    VISA
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#1a1a1a' }}>
                      Visa ending in {paymentMethod.last4}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Expires {paymentMethod.expiry}
                    </p>
                  </div>
                </div>
                <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Billing Information</p>
                  <p style={{ fontSize: '0.85rem', color: '#1a1a1a' }}>{paymentMethod.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{paymentMethod.address}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{paymentMethod.email}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{paymentMethod.phone}</p>
                </div>
              </div>
              <button style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: 'transparent',
                cursor: 'pointer',
                fontWeight: 500
              }}>
                Update Billing Info
              </button>
            </div>

            {/* Need More Power? */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f59e0b'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#92400e', marginBottom: '0.5rem' }}>
                Need More Power?
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#78350f' }}>
                Upgrade your plan for more users, higher limits and advanced features.
              </p>
              <Link to="/pricing">
                <button style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1.5rem',
                  background: '#92400e',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Upgrade Plan →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Need Help Section */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle size={24} color="#7c3aed" />
            <div>
              <p style={{ fontWeight: 600, color: '#1a1a1a' }}>Need Help?</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Our support team is here to help you 24/7.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              background: '#25D366',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              <MessageCircle size={16} />
              Chat on WhatsApp
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              background: '#7c3aed',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;