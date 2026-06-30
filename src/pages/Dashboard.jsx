import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Bell,
  MessageCircle,
  Calendar,
  ChevronDown,
  Filter,
  Download
} from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');

  // Metrics data
  const metrics = [
    {
      title: 'Total Revenue',
      value: 'KES 1,254,650',
      change: '+18.6%',
      trend: 'up',
      vs: 'vs last week',
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      title: 'Gross Profit',
      value: 'KES 642,250',
      change: '+22.1%',
      trend: 'up',
      vs: 'vs last week',
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      title: 'Operating Expenses',
      value: 'KES 812,400',
      change: '-8.4%',
      trend: 'down',
      vs: 'vs last week',
      icon: TrendingDown,
      color: '#ef4444',
      bgColor: '#fee2e2'
    },
    {
      title: 'Cash Balance',
      value: 'KES 1,820,450',
      change: '+15.3%',
      trend: 'up',
      vs: 'vs last week',
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      title: 'Net Profit',
      value: 'KES 642,250',
      change: '+19.8%',
      trend: 'up',
      vs: 'vs last week',
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      title: 'Profit Margin',
      value: '19.8%',
      change: '+2.6%',
      trend: 'up',
      vs: 'vs last week',
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    }
  ];

  // Revenue sources
  const revenueSources = [
    { name: 'Food & Beverages', percentage: 45, color: '#7c3aed' },
    { name: 'Liquor', percentage: 30, color: '#8b5cf6' },
    { name: 'Accommodation', percentage: 15, color: '#a78bfa' },
    { name: 'Other Services', percentage: 10, color: '#c4b5fd' }
  ];

  // Recent alerts
  const alerts = [
    {
      type: 'warning',
      title: 'Low Stock Alert',
      description: 'Chicken (5kg) is running low',
      time: '2 hours ago',
      icon: '📦'
    },
    {
      type: 'danger',
      title: 'Unusual Expense',
      description: 'Electricity bill is 25% higher than usual',
      time: '4 hours ago',
      icon: '⚡'
    },
    {
      type: 'success',
      title: 'Sales Opportunity',
      description: 'Weekend sales are 40% higher',
      time: '6 hours ago',
      icon: '📈'
    },
    {
      type: 'info',
      title: 'Data Sync Completed',
      description: 'All data sources synchronized successfully',
      time: '8 hours ago',
      icon: '🔄'
    }
  ];

  // AI Insights
  const aiInsights = [
    {
      title: 'Revenue is 18.6% higher than last week',
      description: 'Great job! Your revenue is trending up consistently.',
      type: 'positive'
    },
    {
      title: 'Weekend sales are your strongest',
      description: 'Consider increasing inventory and staff on weekends.',
      type: 'opportunity'
    },
    {
      title: 'Food cost is 32% of COGS',
      description: 'This is higher than the industry average of 28%.',
      type: 'warning'
    }
  ];

  // Week data for chart
  const weekData = [
    { day: 'Mon', revenue: 320000, expenses: 180000 },
    { day: 'Tue', revenue: 380000, expenses: 195000 },
    { day: 'Wed', revenue: 420000, expenses: 210000 },
    { day: 'Thu', revenue: 460000, expenses: 230000 },
    { day: 'Fri', revenue: 580000, expenses: 290000 },
    { day: 'Sat', revenue: 720000, expenses: 310000 },
    { day: 'Sun', revenue: 650000, expenses: 280000 }
  ];

  const maxValue = Math.max(...weekData.map(d => d.revenue));

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
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
  <Link to="/dashboard" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Dashboard</Link>
  <Link to="/data-sources" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Data Sources</Link>
  <Link to="/reports" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Reports</Link>
  <Link to="/ai-assistant" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>AI Assistant</Link>
  <Link to="/insights" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Insights</Link>
  <Link to="/settings" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Settings</Link>
</div>
  <button
    style={{
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem'
    }}
  >
    <Bell size={20} color="#4a4a4a" />
  </button>

  <button
    style={{
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem'
    }}
  >
    <MessageCircle size={20} color="#4a4a4a" />
  </button>

  <div
    style={{
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
    }}
  >
    {user?.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'JM'}
  </div>

  <button
    onClick={onLogout}
    style={{
      padding: '0.5rem 1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      background: 'white',
      cursor: 'pointer'
    }}
  >
    Logout
  </button>
</div>


</div>
</nav>

<div className="container" style={{ padding: '1.5rem 2rem' }}>

  <button
    onClick={onLogout}
    style={{
      padding: '0.5rem 1rem',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      background: 'white',
      cursor: 'pointer'
    }}
  >
    Logout
  </button>
</div>

      <div className="container" style={{ padding: '1.5rem 2rem' }}>
        {/* Header with Welcome and Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
  Welcome back, {user?.name || 'John'}! 🎉
</h1>

<p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
  Here's what's happening with {user?.businessName || 'Senzia Limited'} today.
</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: '#1a1a1a',
              cursor: 'pointer'
            }}>
              <Calendar size={16} />
              May 12 – May 19, 2025
              <ChevronDown size={16} />
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: '#1a1a1a',
              cursor: 'pointer'
            }}>
              <Filter size={16} />
              Filters
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: '#7c3aed',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: 'white',
              cursor: 'pointer'
            }}>
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #f0f0f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>{metric.title}</p>
                  <div style={{
                    padding: '0.25rem 0.5rem',
                    background: metric.bgColor,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Icon size={14} color={metric.color} />
                    <span style={{ color: metric.color, fontSize: '0.8rem', fontWeight: 600 }}>{metric.change}</span>
                  </div>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.25rem' }}>
                  {metric.value}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{metric.vs}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1.5rem'
        }}>
          {/* Left Column - Chart and Revenue Sources */}
          <div>
            {/* Revenue Chart */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Revenue Overview</h3>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                    <button style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '0.2rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>This Week</button>
                    <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', padding: '0.2rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer' }}>Last Week</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#7c3aed', borderRadius: '4px' }}></span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Revenue</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#f59e0b', borderRadius: '4px' }}></span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Expenses</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '0.5rem', paddingTop: '1rem' }}>
                {weekData.map((day, index) => (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    <div style={{ display: 'flex', gap: '2px', width: '100%', justifyContent: 'center', height: '100%', alignItems: 'flex-end' }}>
                      <div style={{
                        width: '35%',
                        height: `${(day.revenue / maxValue) * 100}%`,
                        background: '#7c3aed',
                        borderRadius: '4px 4px 0 0',
                        minHeight: '4px',
                        transition: 'height 0.3s ease'
                      }} />
                      <div style={{
                        width: '35%',
                        height: `${(day.expenses / maxValue) * 100}%`,
                        background: '#f59e0b',
                        borderRadius: '4px 4px 0 0',
                        minHeight: '4px',
                        transition: 'height 0.3s ease'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{day.day}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Revenue</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>KES 2,450,000</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>vs last week</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#22c55e' }}>↑ 18.6%</p>
                </div>
              </div>
            </div>

            {/* Revenue Sources */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Top Revenue Sources
              </h3>
              {revenueSources.map((source, index) => (
                <div key={index} style={{ marginBottom: index < revenueSources.length - 1 ? '1rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#1a1a1a' }}>{source.name}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>{source.percentage}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${source.percentage}%`,
                      height: '100%',
                      background: source.color,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - AI Insights, Alerts, Cash Flow */}
          <div>
            {/* AI Insights */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>AI Insights</h3>
                <Link to="/insights" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>View All →</Link>
              </div>
              {aiInsights.map((insight, index) => (
                <div key={index} style={{
                  padding: '0.75rem',
                  background: insight.type === 'positive' ? '#f0fdf4' : insight.type === 'opportunity' ? '#fef3c7' : '#fef2f2',
                  borderRadius: '8px',
                  marginBottom: index < aiInsights.length - 1 ? '0.75rem' : 0
                }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.2rem' }}>
                    {insight.title}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Alerts */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Recent Alerts</h3>
                <Link to="/alerts" style={{ color: '#7c3aed', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>View All →</Link>
              </div>
              {alerts.map((alert, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.75rem 0',
                  borderBottom: index < alerts.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{alert.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a' }}>{alert.title}</p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{alert.time}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cash Flow Overview */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Cash Flow Overview</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>This Week</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Net Cash Flow</p>
                  <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#22c55e' }}>KES 320,450</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#22c55e', borderRadius: '2px' }}></span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Inflow</span>
                  <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px', marginLeft: '0.5rem' }}></span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Outflow</span>
                </div>
              </div>

              {/* Mini bar chart for cash flow */}
              <div style={{ display: 'flex', gap: '0.5rem', height: '60px', alignItems: 'flex-end' }}>
                {weekData.map((day, index) => (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '2px', width: '100%', justifyContent: 'center', height: '100%', alignItems: 'flex-end' }}>
                      <div style={{
                        width: '40%',
                        height: `${(day.revenue / 720000) * 100}%`,
                        background: '#22c55e',
                        borderRadius: '2px',
                        minHeight: '4px'
                      }} />
                      <div style={{
                        width: '40%',
                        height: `${(day.expenses / 720000) * 100}%`,
                        background: '#ef4444',
                        borderRadius: '2px',
                        minHeight: '4px'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {[
            { icon: '📊', label: 'Generate Report', color: '#7c3aed' },
            { icon: '🤖', label: 'Ask AI Assistant', color: '#8b5cf6' },
            { icon: '📈', label: 'View Forecast', color: '#22c55e' },
            { icon: '⚙️', label: 'Manage Settings', color: '#f59e0b' }
          ].map((action, index) => (
            <button key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              background: 'white',
              border: '1px solid #f0f0f0',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#1a1a1a'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;