import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Sparkles, LineChart as LineChartIcon,
  Wallet, Banknote, ArrowUpRight, AlertTriangle, Info, CheckCircle2,
  Send, Filter, Calendar
} from 'lucide-react';

const Dashboard = () => {
  const [aiQuery, setAiQuery] = useState('');

  // --- Stat cards ---
  const metrics = [
    {
      label: 'Total Revenue', value: 'KES 3,245,850', change: '+18.6%', trend: 'up',
      icon: DollarSign, iconBg: 'rgba(124, 58, 237, 0.15)', iconColor: '#a78bfa',
      sparkline: [{ v: 20 }, { v: 35 }, { v: 28 }, { v: 45 }, { v: 40 }, { v: 60 }, { v: 75 }],
      sparkColor: '#a78bfa'
    },
    {
      label: 'Gross Profit', value: 'KES 1,254,650', change: '+22.1%', trend: 'up',
      icon: Sparkles, iconBg: 'rgba(236, 72, 153, 0.15)', iconColor: '#f472b6',
      sparkline: [{ v: 15 }, { v: 25 }, { v: 20 }, { v: 38 }, { v: 30 }, { v: 50 }, { v: 65 }],
      sparkColor: '#f472b6'
    },
    {
      label: 'Net Profit', value: 'KES 642,250', change: '+19.8%', trend: 'up',
      icon: LineChartIcon, iconBg: 'rgba(59, 130, 246, 0.15)', iconColor: '#60a5fa',
      sparkline: [{ v: 30 }, { v: 28 }, { v: 40 }, { v: 35 }, { v: 50 }, { v: 48 }, { v: 62 }],
      sparkColor: '#60a5fa'
    },
    {
      label: 'Operating Expenses', value: 'KES 812,400', change: '-8.4%', trend: 'down',
      icon: Wallet, iconBg: 'rgba(249, 115, 22, 0.15)', iconColor: '#fb923c',
      sparkline: [{ v: 60 }, { v: 55 }, { v: 58 }, { v: 45 }, { v: 48 }, { v: 38 }, { v: 32 }],
      sparkColor: '#fb923c'
    },
    {
      label: 'Cash Balance', value: 'KES 1,820,450', change: '+15.3%', trend: 'up',
      icon: Banknote, iconBg: 'rgba(34, 197, 94, 0.15)', iconColor: '#4ade80',
      sparkline: [{ v: 25 }, { v: 30 }, { v: 28 }, { v: 42 }, { v: 38 }, { v: 55 }, { v: 58 }],
      sparkColor: '#4ade80'
    },
  ];

  // --- Revenue Overview bar chart ---
  const revenueData = [
    { day: 'Mon', thisWeek: 720000, lastWeek: 580000 },
    { day: 'Tue', thisWeek: 610000, lastWeek: 540000 },
    { day: 'Wed', thisWeek: 890000, lastWeek: 600000 },
    { day: 'Thu', thisWeek: 870000, lastWeek: 690000 },
    { day: 'Fri', thisWeek: 540000, lastWeek: 610000 },
    { day: 'Sat', thisWeek: 960000, lastWeek: 700000 },
    { day: 'Sun', thisWeek: 880000, lastWeek: 640000 },
  ];

  // --- Profit margin gauge ---
  const profitMargin = 19.8;
  const gaugeData = [{ name: 'margin', value: profitMargin, fill: '#22c55e' }];

  // --- Top revenue sources ---
  const revenueSources = [
    { label: 'Food & Beverages', value: 'KES 1,845,200', pct: 56.8, color: '#f97316' },
    { label: 'Liquor', value: 'KES 876,300', pct: 27.0, color: '#a855f7' },
    { label: 'Accommodation', value: 'KES 324,500', pct: 10.0, color: '#3b82f6' },
    { label: 'Other Services', value: 'KES 199,850', pct: 6.2, color: '#06b6d4' },
  ];

  // --- AI insights ---
  const aiInsights = [
    { icon: TrendingUp, color: '#4ade80', tag: 'Positive', tagBg: 'rgba(34,197,94,0.15)', title: 'Revenue is 18.6% higher than last week', desc: 'Great job! Your revenue is trending up consistently.' },
    { icon: Sparkles, color: '#a78bfa', tag: 'Recommendation', tagBg: 'rgba(124,58,237,0.15)', title: 'Weekend sales are your strongest', desc: 'Consider increasing inventory and staff on weekends.' },
    { icon: AlertTriangle, color: '#f59e0b', tag: 'Attention', tagBg: 'rgba(245,158,11,0.15)', title: 'Food cost is 32% of COGS', desc: 'This is higher than the industry average of 28%.' },
  ];

  // --- Cash flow line chart ---
  const cashFlowData = [
    { day: 'Mon', value: 1100000 }, { day: 'Tue', value: 1450000 },
    { day: 'Wed', value: 1300000 }, { day: 'Thu', value: 1700000 },
    { day: 'Fri', value: 1500000 }, { day: 'Sat', value: 1850000 },
    { day: 'Sun', value: 2000000 },
  ];

  // --- Recent alerts ---
  const alerts = [
    { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', title: 'Low Stock Alert', desc: 'Chicken (5kg) is running low', time: '2m ago' },
    { icon: Info, color: '#60a5fa', bg: 'rgba(59,130,246,0.15)', title: 'Unusual Expense', desc: 'Electricity bill is 25% higher than usual', time: '1h ago' },
    { icon: TrendingUp, color: '#a78bfa', bg: 'rgba(124,58,237,0.15)', title: 'Sales Opportunity', desc: 'Weekend sales are 40% higher', time: '3h ago' },
    { icon: CheckCircle2, color: '#4ade80', bg: 'rgba(34,197,94,0.15)', title: 'Data Sync Completed', desc: 'All data sources synchronized successfully', time: '5h ago' },
  ];

  const handleAskAI = () => {
    if (aiQuery.trim()) {
      // wire this up to your AI assistant route/endpoint
      setAiQuery('');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Welcome back, John! 👋
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening with Senzia Limited today.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={pillButtonStyle}>
              <Calendar size={16} />
              May 12 – May 19, 2025
            </button>
            <button style={pillButtonStyle}>
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '10px', background: m.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={17} color={m.iconColor} />
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{m.label}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{m.value}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.6rem' }}>
                  {m.trend === 'up' ? <TrendingUp size={14} color="#4ade80" /> : <TrendingDown size={14} color="#f87171" />}
                  <span style={{ color: m.trend === 'up' ? '#4ade80' : '#f87171', fontWeight: 600, fontSize: '0.85rem' }}>{m.change}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>vs last week</span>
                </div>
                <ResponsiveContainer width="100%" height={36}>
                  <LineChart data={m.sparkline}>
                    <Line type="monotone" dataKey="v" stroke={m.sparkColor} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {/* Revenue Overview */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={sectionTitleStyle}>Revenue Overview</h3>
              <select style={selectStyle}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} /> This Week
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4b5563', display: 'inline-block' }} /> Last Week
              </span>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={revenueData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)' }}
                  formatter={(v) => `KES ${v.toLocaleString()}`}
                />
                <Bar dataKey="lastWeek" fill="#374151" radius={[4, 4, 0, 0]} />
                <Bar dataKey="thisWeek" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Profit Margin gauge */}
          <div style={cardStyle}>
            <h3 style={{ ...sectionTitleStyle, marginBottom: '1rem' }}>Profit Margin</h3>
            <div style={{ position: 'relative', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={gaugeData}
                  innerRadius="70%"
                  outerRadius="100%"
                  startAngle={180}
                  endAngle={0}
                  barSize={16}
                >
                  <PolarAngleAxis type="number" domain={[0, 40]} angleAxisId={0} tick={false} />
                  <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'var(--border-subtle)' }} angleAxisId={0} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{profitMargin}%</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: 30, width: '100%', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span>0%</span><span>10%</span><span>20%</span><span>30%</span><span>40%</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#4ade80', marginTop: '0.5rem' }}>
              <ArrowUpRight size={14} /> 2.6% vs last week
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              <span style={{ color: '#4ade80' }}>●</span> Your profit margin is healthy
            </p>
          </div>

          {/* Top Revenue Sources */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
              <h3 style={sectionTitleStyle}>Top Revenue Sources</h3>
              <a href="#" style={linkStyle}>View all</a>
            </div>
            {revenueSources.map((s, idx) => (
              <div key={idx} style={{ marginBottom: idx < revenueSources.length - 1 ? '1rem' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{s.value}</span>
                </div>
                <div style={{ height: 6, background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {/* AI Insights */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={sectionTitleStyle}>AI Insights</h3>
              <a href="#" style={linkStyle}>View all insights</a>
            </div>
            {aiInsights.map((insight, idx) => {
              const Icon = insight.icon;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem 0', borderBottom: idx < aiInsights.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '8px', background: insight.tagBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={insight.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{insight.title}</p>
                      <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: insight.tagBg, color: insight.color, whiteSpace: 'nowrap' }}>
                        {insight.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{insight.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cash Flow */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={sectionTitleStyle}>Cash Flow Overview</h3>
              <select style={selectStyle}>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000000}M`} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)' }}
                  formatter={(v) => `KES ${v.toLocaleString()}`}
                />
                <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net Cash Flow</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>KES 320,450</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>vs last week</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#4ade80' }}>↑ 12.4%</p>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={sectionTitleStyle}>Recent Alerts</h3>
              <a href="#" style={linkStyle}>View all</a>
            </div>
            {alerts.map((alert, idx) => {
              const Icon = alert.icon;
              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '0.65rem 0', borderBottom: idx < alerts.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '8px', background: alert.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} color={alert.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{alert.title}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{alert.desc}</p>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{alert.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ask SENZIA AI bar */}
        <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'rgba(124,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} color="#a78bfa" />
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Ask SENZIA Anything</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Get instant answers to your business questions.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flex: 1, maxWidth: '500px' }}>
            <input
              type="text"
              placeholder="e.g., Why did sales drop last Tuesday?"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              style={{ flex: 1, padding: '0.7rem 1rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '0.9rem' }}
            />
            <button
              onClick={handleAskAI}
              style={{ background: 'var(--accent-gold)', border: 'none', padding: '0.7rem 1.25rem', borderRadius: '10px', color: '#1a1408', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}
            >
              <Send size={16} /> Ask AI Assistant
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const cardStyle = {
  background: 'var(--bg-card)',
  padding: '1.5rem',
  borderRadius: '16px',
  border: '1px solid var(--border-subtle)',
};

const sectionTitleStyle = {
  fontSize: '1rem',
  fontWeight: 700,
  color: 'var(--text-primary)',
};

const linkStyle = {
  fontSize: '0.82rem',
  color: 'var(--accent-gold)',
  textDecoration: 'none',
};

const pillButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '10px',
  padding: '0.55rem 1rem',
  color: 'var(--text-secondary)',
  fontSize: '0.85rem',
  cursor: 'pointer',
};

const selectStyle = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '8px',
  color: 'var(--text-secondary)',
  fontSize: '0.82rem',
  padding: '0.4rem 0.6rem',
};

export default Dashboard;