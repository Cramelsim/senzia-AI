import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  AlertCircle,
  CheckCircle,
  Search,
  Settings as SettingsIcon,
  Plus,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  Info,
  Shield,
  Eye,
} from 'lucide-react';
import AppShell from './AppShell';
import './Alerts.css';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'all', label: 'All Alerts' },
  { id: 'critical', label: 'Critical' },
  { id: 'warning', label: 'Warnings' },
  { id: 'info', label: 'Info' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'settings', label: 'Settings' },
];

const alertStats = [
  { label: 'Critical Alerts', value: '7', change: '+40% vs yesterday', icon: AlertCircle, color: 'var(--danger)', bg: 'var(--danger-soft)' },
  { label: 'Warnings', value: '18', change: '+12% vs yesterday', icon: AlertTriangle, color: 'var(--warning)', bg: 'var(--warning-soft)' },
  { label: 'Info Alerts', value: '32', change: '+8% vs yesterday', icon: Info, color: 'var(--info)', bg: 'rgba(79,139,240,0.12)' },
  { label: 'Resolved Alerts', value: '25', change: '+25% vs yesterday', icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-soft)' },
];

const recentAlerts = [
  { id: 1, title: 'High Expense Detected', module: 'Expenses Module', type: 'critical', time: '10:32 AM', status: 'new', description: 'Office Supplies expense is 32% higher than usual' },
  { id: 2, title: 'Low Stock Alert', module: 'Inventory Module', type: 'warning', time: '09:15 AM', status: 'acknowledged', description: '5 products are running low on inventory' },
  { id: 3, title: 'Large Transaction Alert', module: 'Transactions Module', type: 'warning', time: '08:45 AM', status: 'new', description: 'Transaction exceeds KES 500,000 threshold' },
  { id: 4, title: 'Unusual Activity Detected', module: 'User Activity', type: 'critical', time: '08:10 AM', status: 'investigating', description: 'Abnormal login pattern detected from new location' },
  { id: 5, title: 'Inventory Discrepancy', module: 'Inventory Module', type: 'warning', time: '07:30 AM', status: 'resolved', description: 'Stock variance detected in Branch 2' },
];

const topAlertRules = [
  { name: 'High Expense Detected', description: 'Expenses exceeded threshold', count: 5, color: '#ef5a5a' },
  { name: 'Low Stock Alert', description: 'Inventory below minimum level', count: 4, color: '#f0a828' },
  { name: 'Large Transaction Alert', description: 'Transaction exceeds limit', count: 3, color: '#4f8bf0' },
  { name: 'Inventory Discrepancy', description: 'Stock variance detected', count: 2, color: '#8b5cf6' },
  { name: 'Unusual Activity Detected', description: 'Abnormal pattern detected', count: 2, color: '#ec4899' },
];

const aiInsights = [
  { title: 'Expense Anomaly', description: 'Office Supplies expenses are consistently higher on Mondays.', icon: TrendingUp, color: '#f0a828' },
  { title: 'Inventory Risk', description: 'Branch 2 has the highest risk of stockout in the next 7 days.', icon: AlertTriangle, color: '#ef5a5a' },
  { title: 'Fraud Pattern', description: '3 large transactions follow a similar pattern in past 24 hours.', icon: Shield, color: '#8b5cf6' },
];

const alertSettings = [
  { name: 'Email Notifications', enabled: true },
  { name: 'WhatsApp Alerts', enabled: true },
  { name: 'SMS Alerts', enabled: false },
  { name: 'Push Notifications', enabled: true },
];

const trendDays = ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'];
const trendSeries = [
  { key: 'critical', label: 'Critical', color: '#ef5a5a', data: [5, 8, 6, 9, 7, 10, 9] },
  { key: 'warning', label: 'Warnings', color: '#f0a828', data: [15, 13, 18, 16, 22, 20, 22] },
  { key: 'info', label: 'Info', color: '#4f8bf0', data: [22, 25, 30, 26, 33, 34, 33] },
];

const typeIcon = { critical: AlertCircle, warning: AlertTriangle, info: Info };
const typeColor = { critical: 'var(--danger)', warning: 'var(--warning)', info: 'var(--info)' };
const typeBg = { critical: 'var(--danger-soft)', warning: 'var(--warning-soft)', info: 'rgba(79,139,240,0.12)' };
const statusPill = { new: 'pill-danger', acknowledged: 'pill-warning', investigating: 'pill-info', resolved: 'pill-success' };
const statusLabel = { new: 'New', acknowledged: 'Acknowledged', investigating: 'Investigating', resolved: 'Resolved' };

const TrendChart = () => {
  const width = 700, height = 200, padL = 34, padR = 10, padT = 10, padB = 26;
  const plotW = width - padL - padR, plotH = height - padT - padB;
  const yMax = 40, n = trendDays.length;
  const sx = (i) => padL + (i * plotW) / (n - 1);
  const sy = (v) => padT + plotH - (v / yMax) * plotH;
  const baseline = padT + plotH;
  const yTicks = [0, 10, 20, 30, 40];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block', minWidth: 520 }}>
      <defs>
        {trendSeries.map((s) => (
          <linearGradient id={`grad-${s.key}`} key={s.key} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={width - padR} y1={sy(t)} y2={sy(t)} stroke="var(--border-soft)" strokeWidth="1" />
          <text x={padL - 8} y={sy(t) + 3} textAnchor="end" fontSize="10" fill="var(--text-tertiary)">{t}</text>
        </g>
      ))}
      {trendDays.map((label, i) => (
        <text key={label} x={sx(i)} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">{label}</text>
      ))}
      {trendSeries.map((s) => {
        const linePts = s.data.map((v, i) => `${sx(i)},${sy(v)}`).join(' ');
        const areaPts = `${sx(0)},${baseline} ${linePts} ${sx(n - 1)},${baseline}`;
        return (
          <g key={s.key}>
            <polygon points={areaPts} fill={`url(#grad-${s.key})`} stroke="none" />
            <polyline fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={linePts} />
            {s.data.map((v, i) => <circle key={i} cx={sx(i)} cy={sy(v)} r="3" fill={s.color} />)}
          </g>
        );
      })}
    </svg>
  );
};

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const filteredAlerts = recentAlerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === 'overview' || activeTab === 'all' || activeTab === 'settings'
        ? true
        : activeTab === 'resolved'
        ? alert.status === 'resolved'
        : alert.type === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <AppShell
      active="Alerts"
      pageIcon={Bell}
      title="Alerts Center"
      subtitle="Real-time alerts and notifications to keep your business safe and informed."
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerActions={
        <>
          <button className="icon-btn" aria-label="Refresh"><RefreshCw size={16} /></button>
          <Link to="/alerts/settings"><button className="btn btn-ghost"><SettingsIcon size={16} /> Alert Settings</button></Link>
          <button className="btn btn-violet"><Plus size={16} /> Create Alert Rule</button>
        </>
      }
    >
      <div className="alerts-layout">
        <div className="content-stack">

          {/* ---- Stat cards ---- */}
          <div className="alert-stat-grid">
            {alertStats.map(({ label, value, change, icon: Icon, color, bg }) => (
              <div className="alert-stat-card" key={label}>
                <div className="alert-stat-top">
                  <div className="alert-stat-icon" style={{ background: bg, color }}><Icon size={16} /></div>
                  <span>{label}</span>
                </div>
                <p className="alert-stat-value">{value}</p>
                <p className="alert-stat-trend" style={{ color }}>{change}</p>
              </div>
            ))}
          </div>

          {/* ---- Trend chart ---- */}
          <div className="panel">
            <div className="trend-panel-top">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Alerts Trend</h3>
            </div>
            <div className="chart-legend-row">
              {trendSeries.map((s) => (
                <div className="chart-legend-item" key={s.key}>
                  <span className="chart-legend-swatch" style={{ background: s.color }} /> {s.label}
                </div>
              ))}
            </div>
            <TrendChart />
          </div>

          {/* ---- Search + table ---- */}
          <div className="panel">
            <div className="panel-head">
              <h3>Recent Alerts</h3>
              <div className="search-bar" style={{ maxWidth: 260, padding: '0.4rem 0.7rem' }}>
                <Search size={14} />
                <input
                  placeholder="Search alerts, keywords, modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Alert</th>
                  <th>Module</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th className="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert) => {
                  const Icon = typeIcon[alert.type];
                  return (
                    <tr key={alert.id}>
                      <td>
                        <div className="alert-name-cell">
                          <div className="alert-name-icon" style={{ background: typeBg[alert.type], color: typeColor[alert.type] }}>
                            <Icon size={14} />
                          </div>
                          <div>
                            <p>{alert.title}</p>
                            <p>{alert.description}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{alert.module}</td>
                      <td><span className={`pill ${statusPill[alert.status]}`}>{statusLabel[alert.status]}</span></td>
                      <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{alert.time}</td>
                      <td className="center">
                        <button className="icon-btn" aria-label="View"><Eye size={15} /></button>
                      </td>
                    </tr>
                  );
                })}
                {filteredAlerts.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '1.5rem' }}>No alerts match your search.</td></tr>
                )}
              </tbody>
            </table>
            <div className="table-footer">
              <span>Showing 1 to {filteredAlerts.length} of {recentAlerts.length} alerts</span>
              <div className="pager">
                <button disabled>Previous</button>
                <button className="active">1</button>
                <button disabled>Next</button>
              </div>
            </div>
          </div>

          {/* ---- Top rules + AI insights ---- */}
          <div className="two-col">
            <div className="panel">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Top Triggered Alert Rules</h3>
              {topAlertRules.map((rule) => (
                <div className="rule-row" key={rule.name}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: rule.color, flexShrink: 0 }} />
                  <div>
                    <p>{rule.name}</p>
                    <p>{rule.description}</p>
                  </div>
                  <div className="rule-count">{rule.count} times</div>
                </div>
              ))}
            </div>

            <div className="rail-card violet-card">
              <div className="violet-card-title-row">
                <h4>AI Insights</h4>
                <span className="pill" style={{ background: 'var(--violet-soft)', color: 'var(--violet)' }}>New</span>
                <Link to="/insights" className="link-violet" style={{ marginLeft: 'auto' }}>View All →</Link>
              </div>
              {aiInsights.map(({ title, description, icon: Icon, color }) => (
                <div className="ai-insight-row" key={title}>
                  <div className="ai-insight-icon" style={{ color }}><Icon size={15} /></div>
                  <div>
                    <p>{title}</p>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Alert settings ---- */}
          <div className="panel">
            <div className="panel-head">
              <h3>Alert Settings</h3>
              <Link to="/alerts/settings" className="link-accent">Configure →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
              {alertSettings.map((setting) => (
                <div className="toggle-row" key={setting.name}>
                  <p style={{ fontSize: '0.87rem' }}>{setting.name}</p>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: setting.enabled ? 'var(--success)' : 'var(--danger)' }}>
                    {setting.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- Need help ---- */}
          <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SettingsIcon size={18} color="var(--accent)" />
              </div>
              <div>
                <p style={{ fontWeight: 600, margin: 0 }}>Need Help?</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0' }}>Our support team is here to help you 24/7.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-whatsapp">Chat on WhatsApp</button>
              <button className="btn btn-primary">Contact Support</button>
            </div>
          </div>
        </div>

        {/* ---- Right rail: keep the donut summary from the reference design ---- */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Alert Summary</h4>
            <div className="summary-donut-wrap">
              <svg width="130" height="130" viewBox="0 0 130 130">
                <g transform="rotate(-90 65 65)">
                  <circle cx="65" cy="65" r="46" fill="none" stroke="var(--border-soft)" strokeWidth="15" />
                  {(() => {
                    const c = 2 * Math.PI * 46;
                    let acc = 0;
                    return [
                      { pct: 12, color: '#ef5a5a' },
                      { pct: 32, color: '#f0a828' },
                      { pct: 56, color: '#4f8bf0' },
                    ].map((seg, i) => {
                      const dash = (seg.pct / 100) * c;
                      const offset = -(acc / 100) * c;
                      acc += seg.pct;
                      return <circle key={i} cx="65" cy="65" r="46" fill="none" stroke={seg.color} strokeWidth="15" strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={offset} />;
                    });
                  })()}
                </g>
                <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--text-primary)">57</text>
                <text x="65" y="78" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Total Alerts</text>
              </svg>
              <div className="summary-legend">
                <div className="summary-legend-row"><div className="summary-legend-left"><span className="summary-legend-dot" style={{ background: '#ef5a5a' }} /> Critical</div><span>7 (12%)</span></div>
                <div className="summary-legend-row"><div className="summary-legend-left"><span className="summary-legend-dot" style={{ background: '#f0a828' }} /> Warning</div><span>18 (32%)</span></div>
                <div className="summary-legend-row"><div className="summary-legend-left"><span className="summary-legend-dot" style={{ background: '#4f8bf0' }} /> Info</div><span>32 (56%)</span></div>
              </div>
            </div>
            <button className="btn btn-violet btn-block" style={{ marginTop: '1rem' }}>View Full Report →</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Alerts;