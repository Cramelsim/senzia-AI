import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { TrendingUp, TrendingDown, AlertCircle, MessageCircle, Zap, FileText, Settings, Bell } from 'lucide-react';

const Dashboard = () => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const metrics = [
    { label: 'Revenue (MTD)', value: 'KES 2,450,000', change: '+18.6%', trend: 'up', vs: 'vs Apr' },
    { label: 'Gross Profit', value: 'KES 1,125,000', change: '+14.3%', trend: 'up', vs: 'vs Apr' },
    { label: 'Net Profit', value: 'KES 540,000', change: '+21.7%', trend: 'up', vs: 'vs Apr' },
    { label: 'Operating Expenses', value: 'KES 710,000', change: '-6.4%', trend: 'down', vs: 'vs Apr' }
  ];

  const alerts = [
    { title: 'High supplier payment detected', time: 'May 31, 2025 - 10:32 AM', type: 'warning' },
    { title: 'Unusual discount given', time: 'May 31, 2025 - 9:15 AM', type: 'danger' },
    { title: 'Inventory variance detected', time: 'May 31, 2025 - 8:06 AM', type: 'warning' }
  ];

  const handleAskAI = () => {
    if (aiQuery.trim()) {
      setAiResponse(`Based on your data, ${aiQuery}. Your revenue is up 18.6% MTD, and we recommend optimizing supplier payments to reduce expenses further.`);
    }
  };

  return (
    <Layout>
      <div className="container" style={{ padding: '2rem' }}>
        {/* Welcome Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2>Good morning, James 👋</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening with your business today.</p>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {metrics.map((metric, idx) => (
            <div key={idx} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{metric.label}</p>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{metric.value}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {metric.trend === 'up' ? <TrendingUp size={16} color="#22c55e" /> : <TrendingDown size={16} color="#ef4444" />}
                <span style={{ color: metric.trend === 'up' ? '#22c55e' : '#ef4444', fontWeight: 500 }}>{metric.change}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{metric.vs}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          {/* Left Column */}
          <div>
            {/* AI Insights */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3>AI Insights</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <FileText size={20} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
                  <Settings size={20} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
                </div>
              </div>
              <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <Zap size={20} color="var(--accent-purple)" />
                  <strong>Smart Recommendation</strong>
                </div>
                <p>Reduce operational costs by 12% by renegotiating supplier contracts for high-volume items.</p>
              </div>
              <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <AlertCircle size={20} color="#f59e0b" />
                  <strong>Anomaly Detection</strong>
                </div>
                <p>Unusual expense spike detected in marketing category - 45% above average.</p>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ marginBottom: '1rem' }}>Predictive Analytics</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Forecast revenue, expenses and cash flow with high accuracy</p>
              <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Next Month Revenue Forecast</span>
                  <strong>KES 2,850,000</strong>
                </div>
                <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'var(--accent-purple)' }}></div>
                </div>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#22c55e' }}>↑ 16.3% confidence score: 94%</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Recent Alerts */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={20} /> Recent Alerts
              </h3>
              {alerts.map((alert, idx) => (
                <div key={idx} style={{ padding: '0.75rem 0', borderBottom: idx < alerts.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <p style={{ fontWeight: 500 }}>{alert.title}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{alert.time}</p>
                </div>
              ))}
            </div>

            {/* Ask SENZIA AI */}
            <div style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageCircle size={20} /> Ask SENZIA AI
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Ask anything about your business..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                  style={{ flex: 1, padding: '0.75rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '12px', color: 'white' }}
                />
                <button onClick={handleAskAI} style={{ background: 'var(--accent-purple)', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', color: 'white', cursor: 'pointer' }}>
                  Ask
                </button>
              </div>
              {aiResponse && (
                <div style={{ background: 'var(--bg-elevated)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{aiResponse}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;