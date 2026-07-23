import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Zap,
  Lightbulb,
  Target,
  BarChart3,
  PieChart,
  Clock,
  ChevronRight,
  Eye,
  CheckCircle,
  DollarSign,
  ShoppingBag,
  Users,
  Activity,
  Filter,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  MessageCircle,
  Settings,
  HelpCircle,
  Menu,
  X,
  Search
} from 'lucide-react';

const Insights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');

  // Key metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: 'KES 248,420',
      change: '+18.6%',
      trend: 'up',
      // vs: 'vs last week'
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      title: 'Gross Profit',
      value: 'KES 98,540',
      change: '+14.3%',
      trend: 'up',
      vs: 'vs last week',
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      title: 'Net Profit',
      value: 'KES 36,190',
      change: '+27.4%',
      trend: 'up',
      vs: 'vs last week',
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      title: 'Total Expenses',
      value: 'KES 62,350',
      change: '-7.8%',
      trend: 'down',
      vs: 'vs last week',
      icon: TrendingDown,
      color: '#ef4444',
      bgColor: '#fee2e2'
    }
  ];

  // Critical insights
  const criticalInsights = [
    {
      type: 'critical',
      title: 'Expense Spike Detected',
      description: 'Office Supplies expenses are 32% higher than usual.',
      action: 'Investigate',
      link: '/reports',
      icon: AlertCircle,
      color: '#ef4444',
      bgColor: '#fee2e2'
    },
    {
      type: 'opportunity',
      title: 'Revenue Up 18.6%',
      description: 'Your revenue this week is higher compared to last week.',
      action: 'View Analysis',
      link: '/reports',
      icon: TrendingUp,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      type: 'efficiency',
      title: 'Profit Margin Improved',
      description: 'Gross profit margin improved by 4.7% this week.',
      action: 'View Analysis',
      link: '/reports',
      icon: Target,
      color: '#8b5cf6',
      bgColor: '#ede9fe'
    }
  ];

  // Top performing areas
  const topAreas = [
    { name: 'E-Commerce Sales', percentage: 64, color: '#7c3aed' },
    { name: 'New Customers', percentage: 18, color: '#8b5cf6' },
    { name: 'Product Mix Improvement', percentage: 12, color: '#a78bfa' },
    { name: 'Marketing Campaigns', percentage: 6, color: '#c4b5fd' }
  ];

  // Opportunities
  const opportunities = [
    {
      title: 'Reduce Office Supplies Cost',
      potential: 'KES 18,500',
      impact: 'High Impact',
      color: '#ef4444'
    },
    {
      title: 'Optimize Low Performing Products',
      potential: 'KES 24,000',
      impact: 'High Impact',
      color: '#f59e0b'
    },
    {
      title: 'Increase E-Commerce Ad Spend',
      potential: 'KES 35,000',
      impact: 'Medium Impact',
      color: '#22c55e'
    }
  ];

  // Recent anomalies
  const anomalies = [
    {
      title: 'Expense Anomaly',
      description: 'Office Supplies expense spiked by 32%',
      date: 'May 12, 2025',
      icon: AlertCircle,
      color: '#ef4444'
    },
    {
      title: 'Sales Anomaly',
      description: 'Product D sales dropped by 18%',
      date: 'May 11, 2025',
      icon: TrendingDown,
      color: '#f59e0b'
    },
    {
      title: 'Inventory Anomaly',
      description: 'Slow moving inventory increased by 23%',
      date: 'May 10, 2025',
      icon: ShoppingBag,
      color: '#3b82f6'
    }
  ];

  // Business performance trend
  const trendData = [
    { label: 'Revenue', value: 'KES 248,420', change: '+18.6%', color: '#7c3aed' },
    { label: 'Gross Profit', value: 'KES 98,540', change: '+14.3%', color: '#22c55e' },
    { label: 'Net Profit', value: 'KES 36,190', change: '+27.4%', color: '#8b5cf6' },
    { label: 'Expenses', value: 'KES 62,350', change: '-7.8%', color: '#ef4444' }
  ];

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'High Impact': return '#ef4444';
      case 'Medium Impact': return '#f59e0b';
      default: return '#22c55e';
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
              <Link to="/insights" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Insights</Link>
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
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Insights Hub</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Discover what's happening in your business. Powered by AI.
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
              Filter
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
              Export Insights
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '0.5rem',
          marginBottom: '2rem'
        }}>
          {['Overview', 'Critical', 'Opportunities', 'Benchmarks', 'Alerts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{
                padding: '0.5rem 1.5rem',
                border: 'none',
                borderBottom: activeTab === tab.toLowerCase() ? '2px solid #7c3aed' : '2px solid transparent',
                background: 'transparent',
                color: activeTab === tab.toLowerCase() ? '#7c3aed' : 'var(--text-secondary)',
                fontWeight: activeTab === tab.toLowerCase() ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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

        {/* Critical Insights */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
            Critical Insights
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {criticalInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '12px',
                  border: `1px solid ${insight.color}25`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: insight.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} color={insight.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <h4 style={{ fontWeight: 600, color: '#1a1a1a' }}>{insight.title}</h4>
                        <span style={{
                          background: insight.type === 'critical' ? '#fee2e2' : insight.type === 'opportunity' ? '#dcfce7' : '#ede9fe',
                          color: insight.color,
                          padding: '0.1rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          textTransform: 'uppercase'
                        }}>
                          {insight.type}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{insight.description}</p>
                      <Link to={insight.link} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        marginTop: '0.75rem',
                        color: insight.color,
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}>
                        {insight.action} <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Left Column */}
          <div>
            {/* Business Performance Trend */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Business Performance Trend
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {trendData.map((item, index) => (
                  <div key={index} style={{
                    padding: '0.75rem',
                    background: '#fafafa',
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                      <span style={{
                        color: item.change.startsWith('+') ? '#22c55e' : '#ef4444',
                        fontWeight: 600,
                        fontSize: '0.8rem'
                      }}>
                        {item.change}
                      </span>
                    </div>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Anomalies */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Recent Anomalies
              </h3>
              {anomalies.map((anomaly, index) => {
                const Icon = anomaly.icon;
                return (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    padding: '0.75rem 0',
                    borderBottom: index < anomalies.length - 1 ? '1px solid #f5f5f5' : 'none'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: `${anomaly.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={16} color={anomaly.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>{anomaly.title}</p>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{anomaly.date}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{anomaly.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Top Performing Areas */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Top Performing Areas
              </h3>
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1a1a' }}>Total Impact</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1a1a' }}>100%</span>
                </div>
                <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #7c3aed, #8b5cf6, #a78bfa, #c4b5fd)',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
              {topAreas.map((area, index) => (
                <div key={index} style={{ marginBottom: index < topAreas.length - 1 ? '0.75rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#1a1a1a' }}>{area.name}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>{area.percentage}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${area.percentage}%`,
                      height: '100%',
                      background: area.color,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Opportunities Spotlight */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Opportunities Spotlight
              </h3>
              {opportunities.map((opp, index) => (
                <div key={index} style={{
                  padding: '0.75rem',
                  marginBottom: index < opportunities.length - 1 ? '0.75rem' : 0,
                  background: '#fafafa',
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>{opp.title}</p>
                    <span style={{
                      background: getImpactColor(opp.impact) === '#ef4444' ? '#fee2e2' : getImpactColor(opp.impact) === '#f59e0b' ? '#fef3c7' : '#dcfce7',
                      color: getImpactColor(opp.impact),
                      padding: '0.1rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.65rem',
                      fontWeight: 600
                    }}>
                      {opp.impact}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Potential: {opp.potential}</span>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#7c3aed',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}>
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pro Tip from Senzia AI */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              💡
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: '#1a1a1a' }}>Pro Tip from Senzia AI</p>
              <p style={{ color: 'var(--text-secondary)' }}>
                Consider negotiating with your Office Supplies vendor. Similar businesses are paying 15-20% less.
              </p>
            </div>
            <Link to="/ai-assistant" style={{
              color: '#7c3aed',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}>
              Learn More →
            </Link>
          </div>
        </div>

        {/* View All Analysis Link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/reports" style={{
            color: '#7c3aed',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            View All Analysis <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Insights;