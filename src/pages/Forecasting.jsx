import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  ChevronRight,
  Clock,
  BarChart3,
  PieChart,
  DollarSign,
  Package,
  Users,
  Activity,
  Eye,
  MoreVertical,
  HelpCircle,
  MessageCircle,
  Zap,
  Target,
  LineChart,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Forecasting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Forecast metrics
  const forecastMetrics = [
    {
      title: 'Revenue Forecast',
      value: 'KES 2,850,000',
      change: '+16.3%',
      confidence: '94%',
      period: 'Next Month',
      icon: DollarSign,
      color: '#7c3aed',
      trend: 'up'
    },
    {
      title: 'Profit Forecast',
      value: 'KES 742,500',
      change: '+18.7%',
      confidence: '91%',
      period: 'Next Month',
      icon: TrendingUp,
      color: '#22c55e',
      trend: 'up'
    },
    {
      title: 'Expense Forecast',
      value: 'KES 612,000',
      change: '-4.2%',
      confidence: '89%',
      period: 'Next Month',
      icon: TrendingDown,
      color: '#ef4444',
      trend: 'down'
    },
    {
      title: 'Cash Flow Forecast',
      value: 'KES 1,245,000',
      change: '+12.8%',
      confidence: '93%',
      period: 'Next Month',
      icon: Activity,
      color: '#3b82f6',
      trend: 'up'
    }
  ];

  // Monthly forecast data
  const monthlyForecast = [
    { month: 'Jan', actual: 1800000, forecast: 1850000 },
    { month: 'Feb', actual: 1950000, forecast: 1900000 },
    { month: 'Mar', actual: 2100000, forecast: 2150000 },
    { month: 'Apr', actual: 2250000, forecast: 2300000 },
    { month: 'May', actual: 2450000, forecast: 2400000 },
    { month: 'Jun', actual: null, forecast: 2850000 },
    { month: 'Jul', actual: null, forecast: 3100000 },
    { month: 'Aug', actual: null, forecast: 3350000 }
  ];

  // Inventory forecast
  const inventoryForecast = [
    { product: 'Product A', current: 450, forecast: 380, change: '-15.6%', status: 'optimize' },
    { product: 'Product B', current: 230, forecast: 310, change: '+34.8%', status: 'increase' },
    { product: 'Product C', current: 180, forecast: 160, change: '-11.1%', status: 'optimize' },
    { product: 'Product D', current: 560, forecast: 590, change: '+5.4%', status: 'increase' },
    { product: 'Product E', current: 120, forecast: 95, change: '-20.8%', status: 'reduce' }
  ];

  // Demand forecast
  const demandForecast = [
    { category: 'Food & Beverages', current: 45, forecast: 52, change: '+15.6%' },
    { category: 'Liquor', current: 30, forecast: 28, change: '-6.7%' },
    { category: 'Accommodation', current: 15, forecast: 18, change: '+20.0%' },
    { category: 'Other Services', current: 10, forecast: 12, change: '+20.0%' }
  ];

  // AI Insights for forecasting
  const forecastInsights = [
    {
      title: 'Revenue Growth Expected',
      description: 'Based on current trends, revenue is forecasted to grow 16.3% next month.',
      type: 'positive',
      icon: TrendingUp,
      color: '#22c55e'
    },
    {
      title: 'Inventory Optimization Opportunity',
      description: 'Product E has 20.8% excess stock. Consider reducing orders.',
      type: 'opportunity',
      icon: Package,
      color: '#f59e0b'
    },
    {
      title: 'Cash Flow Healthy',
      description: 'Cash flow forecast shows positive momentum with 12.8% growth expected.',
      type: 'positive',
      icon: Activity,
      color: '#22c55e'
    }
  ];

  const maxValue = Math.max(...monthlyForecast.map(d => Math.max(d.actual || 0, d.forecast || 0)));

  const getStatusBadge = (status) => {
    switch(status) {
      case 'increase':
        return { color: '#22c55e', bg: '#dcfce7', label: 'Increase Stock' };
      case 'reduce':
        return { color: '#ef4444', bg: '#fee2e2', label: 'Reduce Stock' };
      case 'optimize':
        return { color: '#f59e0b', bg: '#fef3c7', label: 'Optimize' };
      default:
        return { color: '#6b7280', bg: '#f3f4f6', label: 'Monitor' };
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
              <Link to="/forecasting" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Forecasting</Link>
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Forecasting</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Predict future revenue, expenses, inventory and cash flow with high accuracy.
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
              Refresh Forecast
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
              <Download size={16} />
              Export Forecast
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {['Month', 'Quarter', 'Year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period.toLowerCase())}
              style={{
                padding: '0.5rem 1.5rem',
                border: selectedPeriod === period.toLowerCase() ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                borderRadius: '8px',
                background: selectedPeriod === period.toLowerCase() ? '#f3e8ff' : 'white',
                color: selectedPeriod === period.toLowerCase() ? '#7c3aed' : 'var(--text-secondary)',
                fontWeight: selectedPeriod === period.toLowerCase() ? 600 : 400,
                cursor: 'pointer'
              }}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Forecast Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {forecastMetrics.map((metric, index) => {
            const Icon = metric.icon;
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
                    background: `${metric.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} color={metric.color} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{metric.title}</span>
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>{metric.value}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                  <span style={{
                    color: metric.trend === 'up' ? '#22c55e' : '#ef4444',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}>
                    {metric.change}
                  </span>
                  <span style={{
                    background: '#f3f4f6',
                    padding: '0.1rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)'
                  }}>
                    Confidence: {metric.confidence}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {metric.period}
                </p>
              </div>
            );
          })}
        </div>

        {/* Forecast Chart */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Revenue Forecast</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Actual vs Forecasted Revenue
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#7c3aed', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Actual</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Forecast</span>
              </span>
            </div>
          </div>

          {/* Chart */}
          <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '0.5rem', paddingTop: '1rem' }}>
            {monthlyForecast.map((data, index) => {
              const actualHeight = data.actual ? (data.actual / maxValue) * 100 : 0;
              const forecastHeight = (data.forecast / maxValue) * 100;
              const isForecast = !data.actual;
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                  <div style={{ display: 'flex', gap: '2px', width: '100%', justifyContent: 'center', height: '100%', alignItems: 'flex-end' }}>
                    {!isForecast && (
                      <div style={{
                        width: '35%',
                        height: `${actualHeight}%`,
                        background: '#7c3aed',
                        borderRadius: '4px 4px 0 0',
                        minHeight: '4px',
                        transition: 'height 0.3s ease'
                      }} />
                    )}
                    <div style={{
                      width: isForecast ? '70%' : '35%',
                      height: `${forecastHeight}%`,
                      background: isForecast ? '#22c55e' : '#22c55e',
                      borderRadius: '4px 4px 0 0',
                      minHeight: '4px',
                      opacity: isForecast ? 0.6 : 0.4,
                      transition: 'height 0.3s ease',
                      border: isForecast ? '2px dashed #22c55e' : 'none'
                    }} />
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.5rem',
                    fontWeight: isForecast ? 600 : 400
                  }}>
                    {data.month}
                    {isForecast && '*'}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '0.5rem', textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            * Forecasted values
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Inventory Forecast */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Inventory Forecast
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Product</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Forecast</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Change</th>
                    <th style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryForecast.map((item, index) => {
                    const status = getStatusBadge(item.status);
                    return (
                      <tr key={index} style={{ borderBottom: index < inventoryForecast.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 500, color: '#1a1a1a' }}>{item.product}</td>
                        <td style={{ padding: '0.5rem', textAlign: 'right', color: '#1a1a1a' }}>{item.current}</td>
                        <td style={{ padding: '0.5rem', textAlign: 'right', color: '#1a1a1a' }}>{item.forecast}</td>
                        <td style={{
                          padding: '0.5rem',
                          textAlign: 'right',
                          color: item.change.startsWith('+') ? '#22c55e' : '#ef4444',
                          fontWeight: 600
                        }}>
                          {item.change}
                        </td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                          <span style={{
                            background: status.bg,
                            color: status.color,
                            padding: '0.1rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.65rem',
                            fontWeight: 600
                          }}>
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Demand Forecast */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
              Demand Forecast
            </h3>
            {demandForecast.map((item, index) => (
              <div key={index} style={{
                marginBottom: index < demandForecast.length - 1 ? '1rem' : 0
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#1a1a1a' }}>{item.category}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>
                    {item.forecast}% <span style={{
                      color: item.change.startsWith('+') ? '#22c55e' : '#ef4444',
                      fontWeight: 400
                    }}>
                      ({item.change})
                    </span>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: '6px',
                      background: '#f3f4f6',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${item.current}%`,
                        height: '100%',
                        background: '#7c3aed',
                        borderRadius: '4px',
                        opacity: 0.5
                      }} />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: '6px',
                      background: '#f3f4f6',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${item.forecast}%`,
                        height: '100%',
                        background: '#22c55e',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  <span>Current: {item.current}%</span>
                  <span>Forecast: {item.forecast}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
            AI Forecast Insights
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {forecastInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} style={{
                  padding: '1rem',
                  background: insight.type === 'positive' ? '#f0fdf4' : '#fef3c7',
                  borderRadius: '8px',
                  border: insight.type === 'positive' ? '1px solid #dcfce7' : '1px solid #fef3c7'
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

export default Forecasting;