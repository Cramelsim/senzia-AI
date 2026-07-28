import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Settings as SettingsIcon,
  Plus,
  ChevronRight,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  Zap,
  Shield,
  Package,
  DollarSign,
  Users,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  HelpCircle,
  MessageCircle,
  Eye,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  BarChart3,
  PieChart
} from 'lucide-react';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');

  // Alert statistics
  const alertStats = [
    {
      label: 'Critical Alerts',
      value: '7',
      change: '+40% vs yesterday',
      icon: AlertCircle,
      color: '#ef4444',
      bgColor: '#fee2e2'
    },
    {
      label: 'Warnings',
      value: '18',
      change: '+12% vs yesterday',
      icon: AlertTriangle,
      color: '#f59e0b',
      bgColor: '#fef3c7'
    },
    {
      label: 'Info Alerts',
      value: '32',
      change: '+8% vs yesterday',
      icon: Info,
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      label: 'Resolved Alerts',
      value: '25',
      change: '+25% vs yesterday',
      icon: CheckCircle,
      color: '#22c55e',
      bgColor: '#dcfce7'
    }
  ];

  // Recent alerts
  const recentAlerts = [
    {
      id: 1,
      title: 'High Expense Detected',
      module: 'Expenses Module',
      type: 'critical',
      time: '10:32 AM',
      status: 'new',
      description: 'Office Supplies expense is 32% higher than usual'
    },
    {
      id: 2,
      title: 'Low Stock Alert',
      module: 'Inventory Module',
      type: 'warning',
      time: '09:15 AM',
      status: 'acknowledged',
      description: '5 products are running low on inventory'
    },
    {
      id: 3,
      title: 'Large Transaction Alert',
      module: 'Transactions Module',
      type: 'warning',
      time: '08:45 AM',
      status: 'new',
      description: 'Transaction exceeds KES 500,000 threshold'
    },
    {
      id: 4,
      title: 'Unusual Activity Detected',
      module: 'User Activity',
      type: 'critical',
      time: '08:10 AM',
      status: 'investigating',
      description: 'Abnormal login pattern detected from new location'
    },
    {
      id: 5,
      title: 'Inventory Discrepancy',
      module: 'Inventory Module',
      type: 'warning',
      time: '07:30 AM',
      status: 'resolved',
      description: 'Stock variance detected in Branch 2'
    }
  ];

  // Top triggered alert rules
  const topAlertRules = [
    { name: 'High Expense Detected', description: 'Expenses exceeded threshold', count: 5, color: '#ef4444' },
    { name: 'Low Stock Alert', description: 'Inventory below minimum level', count: 4, color: '#f59e0b' },
    { name: 'Large Transaction Alert', description: 'Transaction exceeds limit', count: 3, color: '#3b82f6' },
    { name: 'Inventory Discrepancy', description: 'Stock variance detected', count: 2, color: '#8b5cf6' },
    { name: 'Unusual Activity Detected', description: 'Abnormal pattern detected', count: 2, color: '#ec4899' }
  ];

  // AI Insights
  const aiInsights = [
    {
      title: 'Expense Anomaly',
      description: 'Office Supplies expenses are consistently higher on Mondays.',
      type: 'insight',
      icon: TrendingUp,
      color: '#f59e0b'
    },
    {
      title: 'Inventory Risk',
      description: 'Branch 2 has the highest risk of stockout in the next 7 days.',
      type: 'risk',
      icon: AlertTriangle,
      color: '#ef4444'
    },
    {
      title: 'Fraud Pattern',
      description: '3 large transactions follow a similar pattern in past 24 hours.',
      type: 'fraud',
      icon: Shield,
      color: '#7c3aed'
    }
  ];

  // Alert settings
  const alertSettings = [
    { name: 'Email Notifications', enabled: true },
    { name: 'WhatsApp Alerts', enabled: true },
    { name: 'SMS Alerts', enabled: false },
    { name: 'Push Notifications', enabled: true }
  ];

  const getAlertTypeStyle = (type) => {
    switch(type) {
      case 'critical':
        return { color: '#ef4444', bg: '#fee2e2', icon: AlertCircle };
      case 'warning':
        return { color: '#f59e0b', bg: '#fef3c7', icon: AlertTriangle };
      case 'info':
        return { color: '#3b82f6', bg: '#dbeafe', icon: Info };
      default:
        return { color: '#6b7280', bg: '#f3f4f6', icon: Info };
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return { color: '#ef4444', bg: '#fee2e2', label: 'New' };
      case 'acknowledged':
        return { color: '#f59e0b', bg: '#fef3c7', label: 'Acknowledged' };
      case 'investigating':
        return { color: '#3b82f6', bg: '#dbeafe', label: 'Investigating' };
      case 'resolved':
        return { color: '#22c55e', bg: '#dcfce7', label: 'Resolved' };
      default:
        return { color: '#6b7280', bg: '#f3f4f6', label: 'Unknown' };
    }
  };

  const filteredAlerts = recentAlerts.filter(alert =>
    alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Link to="/alerts" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Alerts</Link>
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
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Alerts Center</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Real-time alerts and notifications to keep your business safe and informed.
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
              Refresh
            </button>
            <Link to="/alerts/settings">
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
                <SettingsIcon size={16} />
                Alert Settings
              </button>
            </Link>
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
              Create Alert Rule
            </button>
          </div>
        </div>

        {/* Alert Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {alertStats.map((stat, index) => {
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

        {/* Alert Trend Chart Placeholder */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>Alerts Trend</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Critical</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Warnings</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Info</span>
              </span>
            </div>
          </div>
          <div style={{
            height: '80px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.5rem',
            padding: '1rem 0'
          }}>
            {['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'].map((day, index) => (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '2px', width: '100%', justifyContent: 'center', height: '60px', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '25%',
                    height: `${Math.random() * 60 + 10}px`,
                    background: '#ef4444',
                    borderRadius: '2px',
                    minHeight: '4px'
                  }} />
                  <div style={{
                    width: '25%',
                    height: `${Math.random() * 50 + 20}px`,
                    background: '#f59e0b',
                    borderRadius: '2px',
                    minHeight: '4px'
                  }} />
                  <div style={{
                    width: '25%',
                    height: `${Math.random() * 40 + 30}px`,
                    background: '#3b82f6',
                    borderRadius: '2px',
                    minHeight: '4px'
                  }} />
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{day}</span>
              </div>
            ))}
          </div>
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
              placeholder="Search alerts, keywords, modules..."
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
            {['All', 'Critical', 'Warning', 'Info', 'Resolved'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTab(filter.toLowerCase())}
                style={{
                  padding: '0.5rem 1rem',
                  border: activeTab === filter.toLowerCase() ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  background: activeTab === filter.toLowerCase() ? '#f3e8ff' : 'white',
                  color: activeTab === filter.toLowerCase() ? '#7c3aed' : 'var(--text-secondary)',
                  fontWeight: activeTab === filter.toLowerCase() ? 600 : 400,
                  cursor: 'pointer'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Alerts Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Alert</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Module</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Time</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert) => {
                  const alertType = getAlertTypeStyle(alert.type);
                  const status = getStatusBadge(alert.status);
                  const AlertIcon = alertType.icon;
                  return (
                    <tr key={alert.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <AlertIcon size={16} color={alertType.color} />
                          <div>
                            <p style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '0.9rem' }}>{alert.title}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{alert.description}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{alert.module}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
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
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{alert.time}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        <button style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6b7280'
                        }}>
                          <Eye size={16} />
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
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Showing 1 to {filteredAlerts.length} of {recentAlerts.length} alerts
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Previous</button>
              <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #7c3aed', borderRadius: '4px', background: '#7c3aed', color: 'white', cursor: 'pointer' }}>1</button>
              <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Next</button>
            </div>
          </div>
        </div>

        {/* Two Column Layout - Top Alert Rules & AI Insights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Top Triggered Alert Rules */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Top Triggered Alert Rules
            </h3>
            {topAlertRules.map((rule, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 0',
                borderBottom: index < topAlertRules.length - 1 ? '1px solid #f5f5f5' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: rule.color
                  }} />
                  <div>
                    <p style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '0.9rem' }}>{rule.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{rule.description}</p>
                  </div>
                </div>
                <span style={{
                  background: '#f3f4f6',
                  padding: '0.15rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#1a1a1a'
                }}>
                  {rule.count} times
                </span>
              </div>
            ))}
          </div>

          {/* AI Insights */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>
                AI Insights <span style={{
                  background: '#7c3aed',
                  color: 'white',
                  padding: '0.1rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  marginLeft: '0.5rem'
                }}>NEW</span>
              </h3>
              <Link to="/insights" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                View All →
              </Link>
            </div>
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} style={{
                  padding: '0.75rem',
                  marginBottom: index < aiInsights.length - 1 ? '0.75rem' : 0,
                  background: '#fafafa',
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Icon size={18} color={insight.color} />
                    <div>
                      <p style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>{insight.title}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{insight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alert Settings Summary */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Alert Settings</h3>
            <Link to="/alerts/settings" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
              Configure →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {alertSettings.map((setting, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                background: '#fafafa',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}>
                <span style={{ fontSize: '0.9rem', color: '#1a1a1a' }}>{setting.name}</span>
                <span style={{
                  color: setting.enabled ? '#22c55e' : '#ef4444',
                  fontWeight: 600,
                  fontSize: '0.8rem'
                }}>
                  {setting.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help Section */}
        <div style={{
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

export default Alerts;