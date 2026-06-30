import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  ArrowRight,
  Download,
  RefreshCw,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';

const DataSources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dataSources = [
    {
      id: 1,
      name: 'POS System',
      type: 'Point of Sale',
      status: 'connected',
      lastSync: 'Today, 08:45 AM',
      records: '45,230',
      icon: '💳',
      color: '#7c3aed'
    },
    {
      id: 2,
      name: 'M-Pesa Business',
      type: 'Mobile Money',
      status: 'connected',
      lastSync: 'Today, 08:30 AM',
      records: '12,540',
      icon: '📱',
      color: '#22c55e'
    },
    {
      id: 3,
      name: 'Shopify',
      type: 'E-Commerce',
      status: 'connected',
      lastSync: 'Today, 08:15 AM',
      records: '8,920',
      icon: '🛍️',
      color: '#f59e0b'
    },
    {
      id: 4,
      name: 'Google Analytics 4',
      type: 'Analytics',
      status: 'connected',
      lastSync: 'Today, 07:50 AM',
      records: '156,780',
      icon: '📊',
      color: '#3b82f6'
    },
    {
      id: 5,
      name: 'Xero Accounting',
      type: 'Accounting',
      status: 'warning',
      lastSync: 'Yesterday, 11:20 PM',
      records: '23,450',
      icon: '📒',
      color: '#ec4899'
    },
    {
      id: 6,
      name: 'Stripe',
      type: 'Payments',
      status: 'connected',
      lastSync: 'Today, 08:40 AM',
      records: '5,670',
      icon: '💳',
      color: '#6366f1'
    },
    {
      id: 7,
      name: 'Mailchimp',
      type: 'Marketing',
      status: 'warning',
      lastSync: 'Yesterday, 09:10 PM',
      records: '34,890',
      icon: '✉️',
      color: '#f43f5e'
    },
    {
      id: 8,
      name: 'Google Sheets',
      type: 'Spreadsheet',
      status: 'connected',
      lastSync: 'Today, 08:05 AM',
      records: '2,340',
      icon: '📋',
      color: '#8b5cf6'
    }
  ];

  const availableIntegrations = [
    { name: 'Slack', icon: '💬', description: 'Streamline team communication.' },
    { name: 'SharePoint', icon: '📁', description: 'Collaborate and share documents.' },
    { name: 'Zendesk', icon: '🎫', description: 'Sync support tickets and customer data.' },
    { name: 'HubSpot', icon: '📈', description: 'Manage CRM and marketing automation.' },
    { name: 'WooCommerce', icon: '🛒', description: 'Sync orders, customers and products.' }
  ];

  const stats = [
    { label: 'Total Integrations', value: '16', change: '+33%', icon: Database },
    { label: 'Active Connections', value: '14', change: '88% healthy', icon: CheckCircle },
    { label: 'Data Sync Status', value: '98.7%', change: 'Success Rate', icon: RefreshCw },
    { label: 'Time Saved', value: '125 hrs', change: '+18% this month', icon: Clock }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'connected':
        return { color: '#22c55e', bg: '#dcfce7', label: 'Connected' };
      case 'warning':
        return { color: '#f59e0b', bg: '#fef3c7', label: 'Warning' };
      case 'error':
        return { color: '#ef4444', bg: '#fee2e2', label: 'Error' };
      default:
        return { color: '#6b7280', bg: '#f3f4f6', label: 'Disconnected' };
    }
  };

  const filteredSources = dataSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Link to="/data-sources" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Data Sources</Link>
              <Link to="/reports" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Reports</Link>
              <Link to="/ai-assistant" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>AI Assistant</Link>
              <Link to="/insights" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Insights</Link>
              <Link to="/settings" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Settings</Link>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Data Sources</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Connect your favorite tools and platforms with SENZIA.</p>
          </div>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            <Plus size={18} />
            Add Integration
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <Icon size={20} color="#7c3aed" />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{stat.label}</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>{stat.value}</p>
                <p style={{ fontSize: '0.85rem', color: '#22c55e' }}>{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: 'white',
            cursor: 'pointer'
          }}>
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Data Sources Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {filteredSources.map((source) => {
            const status = getStatusBadge(source.status);
            return (
              <div key={source.id} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: `${source.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {source.icon}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600, color: '#1a1a1a' }}>{source.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{source.type}</p>
                    </div>
                  </div>
                  <span style={{
                    background: status.bg,
                    color: status.color,
                    padding: '0.2rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {status.label}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Last Sync</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a1a' }}>{source.lastSync}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Records</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1a1a1a' }}>{source.records}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: source.status === 'connected' ? 'transparent' : '#7c3aed',
                    border: source.status === 'connected' ? '1px solid #7c3aed' : 'none',
                    borderRadius: '6px',
                    color: source.status === 'connected' ? '#7c3aed' : 'white',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}>
                    {source.status === 'connected' ? 'Manage' : 'Connect'}
                  </button>
                  <button style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}>
                    ⋮
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Integrations */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
          Available Integrations
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {availableIntegrations.map((integration, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <span style={{ fontSize: '2rem' }}>{integration.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, color: '#1a1a1a' }}>{integration.name}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{integration.description}</p>
              </div>
              <ArrowRight size={18} color="#7c3aed" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataSources;