import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Zap, 
  Calendar,
  Download,
  Share2,
  Clock,
  ChevronRight,
  Filter,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Mail,
  MessageCircle,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Report types
  const reportTypes = [
    {
      id: 'financial',
      title: 'Financial Performance Report',
      description: 'Revenue, Profit, Expenses, Cash Flow, Margins',
      lastGenerated: 'Today 8:00 AM',
      icon: TrendingUp,
      color: '#7c3aed',
      bgColor: '#f3e8ff'
    },
    {
      id: 'fraud',
      title: 'Fraud & Risk Report',
      description: 'Suspicious transactions, Inventory discrepancies, Risk alerts, Employee activity anomalies',
      lastGenerated: 'Today 7:30 AM',
      icon: Shield,
      color: '#ef4444',
      bgColor: '#fee2e2'
    },
    {
      id: 'forecast',
      title: 'Forecast Report',
      description: 'Revenue forecast, Inventory forecast, Demand forecast, Cash flow prediction',
      lastGenerated: 'Today 8:15 AM',
      icon: BarChart3,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      id: 'opportunity',
      title: 'Opportunity Report',
      description: 'Profit opportunities, Upselling opportunities, Pricing recommendations, Cost reduction opportunities',
      lastGenerated: 'Today 8:15 AM',
      icon: Zap,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      potentialImpact: 'KES 185,000'
    }
  ];

  // Scheduled reports
  const scheduledReports = [
    {
      id: 1,
      name: 'Executive Summary',
      frequency: 'Daily',
      delivery: 'Email',
      nextRun: 'Today, 5:00 PM',
      recipients: '3',
      status: 'active'
    },
    {
      id: 2,
      name: 'Financial Report',
      frequency: 'Weekly',
      delivery: 'PDF',
      nextRun: 'Tomorrow, 8:00 AM',
      recipients: '5',
      status: 'active'
    },
    {
      id: 3,
      name: 'Forecast Report',
      frequency: 'Weekly',
      delivery: 'WhatsApp',
      nextRun: 'Tomorrow, 9:00 AM',
      recipients: '2',
      status: 'active'
    },
    {
      id: 4,
      name: 'Opportunity Report',
      frequency: 'Monthly',
      delivery: 'Email',
      nextRun: 'Jun 1, 2025, 8:00 AM',
      recipients: '4',
      status: 'pending'
    }
  ];

  // Statistics
  const stats = [
    { 
      label: 'This Month', 
      value: '127', 
      change: '+18%', 
      icon: FileText,
      subtext: 'vs last month'
    },
    { 
      label: 'Scheduled Reports', 
      value: '12', 
      change: '+9%', 
      icon: Clock,
      subtext: 'Active schedules'
    },
    { 
      label: 'Downloads', 
      value: '348', 
      change: '+21%', 
      icon: Download,
      subtext: 'This Month'
    },
    { 
      label: 'Shared Reports', 
      value: '95', 
      change: '+14%', 
      icon: Share2,
      subtext: 'This Month'
    }
  ];

  // AI Insights
  const aiInsights = [
    {
      type: 'positive',
      title: 'Revenue increased 12% this week',
      description: 'Driven by strong performance in E-Commerce and Retail channels.'
    },
    {
      type: 'warning',
      title: 'Inventory losses detected in Branch 2',
      description: 'Value: KES 23,450 - Recommendation: Review stock handling procedures.'
    },
    {
      type: 'positive',
      title: 'Forecast indicates 18% growth next month',
      description: 'Expected revenue to reach KES 2.4M in June.'
    },
    {
      type: 'opportunity',
      title: 'Opportunity Engine identified',
      description: 'KES 75,000 additional profit potential - Review 5 high-impact opportunities.'
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return { color: '#22c55e', bg: '#dcfce7', label: 'Active' };
      case 'pending':
        return { color: '#f59e0b', bg: '#fef3c7', label: 'Pending' };
      default:
        return { color: '#6b7280', bg: '#f3f4f6', label: 'Inactive' };
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
              <Link to="/reports" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Reports</Link>
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
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Reports</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Generate, schedule and manage your business reports.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              <Download size={18} />
              Export All
            </button>
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
              New Report
            </button>
          </div>
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
                <p style={{ fontSize: '0.85rem', color: '#22c55e' }}>{stat.change} <span style={{ color: 'var(--text-secondary)' }}>{stat.subtext}</span></p>
              </div>
            );
          })}
        </div>

        {/* Report Types */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
          Report Types
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <div key={report.id} style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: report.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={20} color={report.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '0.25rem' }}>{report.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{report.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <Clock size={14} color="#9ca3af" />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Last Generated: {report.lastGenerated}</span>
                    </div>
                    {report.potentialImpact && (
                      <div style={{
                        marginTop: '0.5rem',
                        padding: '0.25rem 0.75rem',
                        background: '#fef3c7',
                        borderRadius: '4px',
                        display: 'inline-block'
                      }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d97706' }}>
                          Potential Impact: {report.potentialImpact}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    flex: 1,
                    padding: '0.5rem',
                    background: '#7c3aed',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem'
                  }}>
                    <Eye size={16} />
                    View Report
                  </button>
                  <button style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}>
                    <MoreVertical size={18} color="#6b7280" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scheduled Reports */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a' }}>Scheduled Reports</h2>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            background: 'white',
            cursor: 'pointer'
          }}>
            <Plus size={16} />
            Schedule Report
          </button>
        </div>

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
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Report Name</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Frequency</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Delivery Method</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Next Run</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Recipient(s)</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Status</th>
                  <th style={{ textAlign: 'right', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scheduledReports.map((report, index) => {
                  const status = getStatusBadge(report.status);
                  return (
                    <tr key={report.id} style={{ borderBottom: index < scheduledReports.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 500, color: '#1a1a1a' }}>{report.name}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{report.frequency}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          {report.delivery === 'WhatsApp' ? <MessageCircle size={14} /> : <Mail size={14} />}
                          {report.delivery}
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{report.nextRun}</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{report.recipients}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
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
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                        <button style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#6b7280'
                        }}>
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #f0f0f0', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Showing 1 to 4 of 4 results</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Previous</button>
              <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #7c3aed', borderRadius: '4px', background: '#7c3aed', color: 'white', cursor: 'pointer' }}>1</button>
              <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Next</button>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
          AI Insights
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {aiInsights.map((insight, index) => (
            <div key={index} style={{
              display: 'flex',
              gap: '0.75rem',
              padding: '1rem',
              background: insight.type === 'positive' ? '#f0fdf4' : insight.type === 'warning' ? '#fef2f2' : '#fef3c7',
              borderRadius: '8px',
              border: insight.type === 'positive' ? '1px solid #dcfce7' : insight.type === 'warning' ? '1px solid #fee2e2' : '1px solid #fef3c7'
            }}>
              <div style={{ flexShrink: 0, marginTop: '0.1rem' }}>
                {insight.type === 'positive' ? <CheckCircle size={18} color="#22c55e" /> : 
                 insight.type === 'warning' ? <AlertCircle size={18} color="#ef4444" /> : 
                 <Zap size={18} color="#f59e0b" />}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>{insight.title}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{insight.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Insights Link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/insights" style={{
            color: '#7c3aed',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            View All Insights <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reports;