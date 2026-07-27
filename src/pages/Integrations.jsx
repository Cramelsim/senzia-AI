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
  TrendingUp,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  Plug,
  Settings,
  HelpCircle,
  MessageCircle,
  Activity,
  BarChart3,
  Users,
  ShoppingBag,
  Mail,
  CreditCard,
  FileSpreadsheet,
  Smartphone,
  Building,
  Cloud,
  Code,
  Link as LinkIcon
} from 'lucide-react';

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Connected integrations
  const connectedIntegrations = [
    {
      id: 1,
      name: 'QuickBooks Online',
      description: 'Sync your financial data, invoices, expenses and more.',
      status: 'connected',
      lastSync: 'Today, 08:45 AM',
      icon: '📊',
      color: '#2ca01c'
    },
    {
      id: 2,
      name: 'M-Pesa Business',
      description: 'Automatically import M-Pesa transactions and statements.',
      status: 'connected',
      lastSync: 'Today, 08:30 AM',
      icon: '📱',
      color: '#22c55e'
    },
    {
      id: 3,
      name: 'Shopify',
      description: 'Sync orders, customers, products and inventory in real-time.',
      status: 'connected',
      lastSync: 'Today, 08:15 AM',
      icon: '🛍️',
      color: '#96bf48'
    },
    {
      id: 4,
      name: 'Google Analytics 4',
      description: 'Track website performance and customer behavior.',
      status: 'connected',
      lastSync: 'Today, 07:50 AM',
      icon: '📈',
      color: '#4285f4'
    },
    {
      id: 5,
      name: 'Xero Accounting',
      description: 'Sync accounting data, bills, payments and contacts.',
      status: 'warning',
      lastSync: 'Yesterday, 11:20 PM',
      icon: '📒',
      color: '#13b5ea'
    },
    {
      id: 6,
      name: 'Stripe',
      description: 'Sync payments, refunds and transactions seamlessly.',
      status: 'connected',
      lastSync: 'Today, 08:40 AM',
      icon: '💳',
      color: '#635bff'
    },
    {
      id: 7,
      name: 'Mailchimp',
      description: 'Sync contacts and automate marketing campaigns.',
      status: 'warning',
      lastSync: 'Yesterday, 09:10 PM',
      icon: '✉️',
      color: '#ffe01b'
    },
    {
      id: 8,
      name: 'Google Sheets',
      description: 'Import and export data to Google Sheets.',
      status: 'connected',
      lastSync: 'Today, 08:05 AM',
      icon: '📋',
      color: '#0f9d58'
    }
  ];

  // Available integrations
  const availableIntegrations = [
    { 
      name: 'Slack', 
      icon: '💬', 
      description: 'Streamline team communication.',
      color: '#4a154b'
    },
    { 
      name: 'SharePoint', 
      icon: '📁', 
      description: 'Collaborate and share documents.',
      color: '#0078d4'
    },
    { 
      name: 'Zendesk', 
      icon: '🎫', 
      description: 'Sync support tickets and customer data.',
      color: '#03363d'
    },
    { 
      name: 'HubSpot', 
      icon: '📈', 
      description: 'Manage CRM and marketing automation.',
      color: '#ff7a59'
    },
    { 
      name: 'WooCommerce', 
      icon: '🛒', 
      description: 'Sync orders, customers and products.',
      color: '#96588a'
    },
    { 
      name: 'API Access', 
      icon: '🔌', 
      description: 'Build custom connections using Senzia API.',
      color: '#7c3aed'
    }
  ];

  // Integration stats
  const stats = [
    { 
      label: 'Total Integrations', 
      value: '16', 
      change: '+33% vs last month', 
      icon: Plug,
      color: '#7c3aed',
      bgColor: '#f3e8ff'
    },
    { 
      label: 'Active Connections', 
      value: '14', 
      change: '88% healthy', 
      icon: CheckCircle,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    { 
      label: 'Data Sync Status', 
      value: '98.7%', 
      change: 'Success Rate', 
      icon: RefreshCw,
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    { 
      label: 'Time Saved', 
      value: '125 hrs', 
      change: '+18% vs last month', 
      icon: Clock,
      color: '#f59e0b',
      bgColor: '#fef3c7'
    }
  ];

  // Integration health
  const healthData = [
    { status: 'Healthy', count: 14, percentage: 88, color: '#22c55e' },
    { status: 'Warning', count: 1, percentage: 6, color: '#f59e0b' },
    { status: 'Error', count: 1, percentage: 6, color: '#ef4444' }
  ];

  // Recent activity
  const recentActivity = [
    { integration: 'QuickBooks Online', action: 'Data synced successfully', time: '2 min ago' },
    { integration: 'M-Pesa Business', action: 'New transactions imported', time: '15 min ago' },
    { integration: 'Shopify', action: '25 new orders imported', time: '45 min ago' },
    { integration: 'Stripe', action: 'Payments synced', time: '1 hour ago' },
    { integration: 'Google Sheets', action: 'Data exported successfully', time: '2 hours ago' }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'connected':
        return { color: '#22c55e', bg: '#dcfce7', label: 'Connected', icon: CheckCircle };
      case 'warning':
        return { color: '#f59e0b', bg: '#fef3c7', label: 'Warning', icon: AlertCircle };
      case 'error':
        return { color: '#ef4444', bg: '#fee2e2', label: 'Error', icon: AlertCircle };
      default:
        return { color: '#6b7280', bg: '#f3f4f6', label: 'Disconnected', icon: AlertCircle };
    }
  };

  const filteredIntegrations = connectedIntegrations.filter(integration =>
    integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Link to="/data-sources" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Data Sources</Link>
              <Link to="/reports" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Reports</Link>
              <Link to="/ai-assistant" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>AI Assistant</Link>
              <Link to="/insights" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Insights</Link>
              <Link to="/integrations" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Integrations</Link>
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Integrations Hub</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Connect your favorite tools and platforms with SENZIA.
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
              <RefreshCw size={16} />
              Sync All
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
              Add Integration
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} color={stat.color} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{stat.label}</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>{stat.value}</p>
                <p style={{ fontSize: '0.85rem', color: stat.color }}>{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '250px' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} />
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
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['All', 'Connected', 'Warning', 'Error'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter.toLowerCase())}
                style={{
                  padding: '0.5rem 1rem',
                  border: activeFilter === filter.toLowerCase() ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  background: activeFilter === filter.toLowerCase() ? '#f3e8ff' : 'white',
                  color: activeFilter === filter.toLowerCase() ? '#7c3aed' : 'var(--text-secondary)',
                  fontWeight: activeFilter === filter.toLowerCase() ? 600 : 400,
                  cursor: 'pointer'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Connected Integrations Grid */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
          Connected Integrations
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {filteredIntegrations.map((integration) => {
            const status = getStatusBadge(integration.status);
            const StatusIcon = status.icon;
            return (
              <div key={integration.id} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      background: `${integration.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {integration.icon}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600, color: '#1a1a1a' }}>{integration.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.1rem' }}>
                        <span style={{
                          background: status.bg,
                          color: status.color,
                          padding: '0.1rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem'
                        }}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}>
                    <MoreVertical size={18} />
                  </button>
                </div>

                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.4',
                  marginBottom: '1rem'
                }}>
                  {integration.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f5f5f5'
                }}>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Last Sync</p>
                    <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#1a1a1a' }}>
                      {integration.lastSync}
                    </p>
                  </div>
                  <button style={{
                    padding: '0.4rem 1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '0.8rem'
                  }}>
                    Manage
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Integrations */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
          Available Integrations
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
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
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: `${integration.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                {integration.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, color: '#1a1a1a' }}>{integration.name}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {integration.description}
                </p>
              </div>
              <button style={{
                padding: '0.4rem 1rem',
                background: 'transparent',
                border: '1px solid #7c3aed',
                borderRadius: '6px',
                color: '#7c3aed',
                fontWeight: 500,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}>
                Connect
              </button>
            </div>
          ))}
        </div>

        {/* Two Column Layout - Health & Activity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '2rem'
        }}>
          {/* Integration Health */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Integration Health
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {healthData.map((item, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#1a1a1a' }}>{item.status}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${item.percentage}%`,
                      height: '100%',
                      background: item.color,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <Link to="/integrations/health" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginTop: '1rem',
              color: '#7c3aed',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              View Health Details <ChevronRight size={16} />
            </Link>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Recent Integration Activity
            </h3>
            {recentActivity.map((activity, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 0',
                borderBottom: index < recentActivity.length - 1 ? '1px solid #f5f5f5' : 'none'
              }}>
                <div>
                  <p style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '0.9rem' }}>
                    {activity.integration}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {activity.action}
                  </p>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Integration CTA */}
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
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#f3e8ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              🔌
            </div>
            <div>
              <p style={{ fontWeight: 600, color: '#1a1a1a' }}>Need Custom Integration?</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Can't find the integration you need? Our team can help you build a custom integration.
              </p>
            </div>
          </div>
          <button style={{
            padding: '0.5rem 1.5rem',
            background: '#7c3aed',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Request Custom Integration
          </button>
        </div>

        {/* API Access */}
        <div style={{
          marginTop: '1rem',
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
            <Code size={24} color="#7c3aed" />
            <div>
              <p style={{ fontWeight: 600, color: '#1a1a1a' }}>API Access</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Build custom connections using Senzia API.
              </p>
            </div>
          </div>
          <Link to="/api-docs" style={{
            color: '#7c3aed',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            View API Documentation <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Integrations;