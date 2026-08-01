import React, { useState, useMemo } from 'react';
import {
  Database,
  Plus,
  Search,
  CheckCircle,
  Clock,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  MoreVertical,
} from 'lucide-react';
import AppShell from './AppShell';
import './DataSources.css';

/* Kept from your real source — not swapped for the different fictional list shown
   in the reference screenshot (Salesforce/Snowflake/etc.), since that data doesn't
   exist in your app. "connection" is inferred per source type; add a real field
   if you track it. */
const dataSources = [
  { id: 1, name: 'POS System', type: 'Point of Sale', connection: 'API', status: 'connected', lastSync: 'Today, 08:45 AM', records: '45,230', icon: '💳', color: '#8b5cf6' },
  { id: 2, name: 'M-Pesa Business', type: 'Mobile Money', connection: 'API', status: 'connected', lastSync: 'Today, 08:30 AM', records: '12,540', icon: '📱', color: '#22c55e' },
  { id: 3, name: 'Shopify', type: 'E-Commerce', connection: 'OAuth 2.0', status: 'connected', lastSync: 'Today, 08:15 AM', records: '8,920', icon: '🛍️', color: '#f59e0b' },
  { id: 4, name: 'Google Analytics 4', type: 'Analytics', connection: 'OAuth 2.0', status: 'connected', lastSync: 'Today, 07:50 AM', records: '156,780', icon: '📊', color: '#3b82f6' },
  { id: 5, name: 'Xero Accounting', type: 'Accounting', connection: 'OAuth 2.0', status: 'warning', lastSync: 'Yesterday, 11:20 PM', records: '23,450', icon: '📒', color: '#ec4899' },
  { id: 6, name: 'Stripe', type: 'Payments', connection: 'API', status: 'connected', lastSync: 'Today, 08:40 AM', records: '5,670', icon: '💳', color: '#6366f1' },
  { id: 7, name: 'Mailchimp', type: 'Marketing', connection: 'API', status: 'warning', lastSync: 'Yesterday, 09:10 PM', records: '34,890', icon: '✉️', color: '#f43f5e' },
  { id: 8, name: 'Google Sheets', type: 'Spreadsheet', connection: 'OAuth 2.0', status: 'connected', lastSync: 'Today, 08:05 AM', records: '2,340', icon: '📋', color: '#8b5cf6' },
];

const availableIntegrations = [
  { name: 'Slack', icon: '💬', description: 'Streamline team communication.' },
  { name: 'SharePoint', icon: '📁', description: 'Collaborate and share documents.' },
  { name: 'Zendesk', icon: '🎫', description: 'Sync support tickets and customer data.' },
  { name: 'HubSpot', icon: '📈', description: 'Manage CRM and marketing automation.' },
  { name: 'WooCommerce', icon: '🛒', description: 'Sync orders, customers and products.' },
];

const statusPill = { connected: 'pill-success', warning: 'pill-warning', error: 'pill-danger' };
const statusLabel = { connected: 'Active', warning: 'Warning', error: 'Error' };

const DataSources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSources = dataSources.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* Stats derived live from the actual dataset, instead of the hardcoded
     "16 total / 14 active" your source had (which didn't match its own 8-item array). */
  const { total, active, warning } = useMemo(() => {
    const active = dataSources.filter((s) => s.status === 'connected').length;
    const warning = dataSources.filter((s) => s.status === 'warning').length;
    return { total: dataSources.length, active, warning };
  }, []);

  const typeBreakdown = useMemo(() => {
    const map = {};
    dataSources.forEach((s) => { map[s.type] = (map[s.type] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, []);

  const donutSegments = [
    { label: 'Active', count: active, pct: Math.round((active / total) * 100), color: 'var(--success)' },
    { label: 'Warning', count: warning, pct: Math.round((warning / total) * 100), color: 'var(--warning)' },
  ];

  const stats = [
    { label: 'Total Data Sources', value: String(total), sub: 'Connected and active', icon: Database, color: 'var(--accent)', bg: 'var(--accent-soft)' },
    { label: 'Active Sources', value: String(active), sub: `${Math.round((active / total) * 100)}% of total sources`, icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-soft)' },
    { label: 'Data Sync Status', value: '98.7%', sub: 'Success Rate', icon: RefreshCw, color: 'var(--info)', bg: 'rgba(79,139,240,0.12)' },
    { label: 'Time Saved', value: '125 hrs', sub: '+18% this month', icon: Clock, color: 'var(--warning)', bg: 'var(--warning-soft)' },
  ];

  return (
    <AppShell
      active="Data Sources"
      pageIcon={Database}
      title="Data Sources"
      subtitle="Manage and monitor all your connected data sources."
      headerActions={
        <>
          <button className="btn btn-ghost"><RefreshCw size={16} /> Refresh All</button>
          <button className="btn btn-violet"><Plus size={16} /> Add Data Source</button>
        </>
      }
    >
      <div className="datasources-layout">
        <div className="content-stack">

          {/* ---- Stat cards ---- */}
          <div className="ds-stat-grid">
            {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
              <div className="ds-stat-card" key={label}>
                <div className="ds-stat-top">
                  <div className="ds-stat-icon" style={{ background: bg, color }}><Icon size={16} /></div>
                  <span>{label}</span>
                </div>
                <p className="ds-stat-value">{value}</p>
                <p className="ds-stat-trend" style={{ color }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* ---- Search + table ---- */}
          <div className="panel">
            <div className="panel-head">
              <h3>Connected Sources</h3>
              <div className="search-bar" style={{ maxWidth: 260, padding: '0.4rem 0.7rem' }}>
                <Search size={14} />
                <input
                  placeholder="Search data sources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Data Source</th>
                  <th>Type</th>
                  <th>Connection</th>
                  <th>Last Sync</th>
                  <th className="num">Records</th>
                  <th className="center">Status</th>
                  <th className="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSources.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="ds-name-cell">
                        <div className="ds-icon-badge" style={{ background: `${s.color}26` }}>{s.icon}</div>
                        <div>
                          <p>{s.name}</p>
                          <p>{s.type}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{s.type}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{s.connection}</td>
                    <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{s.lastSync}</td>
                    <td className="num">{s.records}</td>
                    <td className="center"><span className={`pill ${statusPill[s.status]}`}>{statusLabel[s.status]}</span></td>
                    <td className="center">
                      <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
                        <button className="btn btn-ghost btn-sm">{s.status === 'connected' ? 'Manage' : 'Fix'}</button>
                        <button className="icon-btn" aria-label="More"><MoreVertical size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSources.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '1.5rem' }}>No data sources match your search.</td></tr>
                )}
              </tbody>
            </table>
            <div className="table-footer">
              <span>Showing 1 to {filteredSources.length} of {dataSources.length} results</span>
            </div>
          </div>

          {/* ---- Available integrations ---- */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>Available Integrations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {availableIntegrations.map((i) => (
                <div className="available-ds-row" key={i.name}>
                  <span style={{ fontSize: '1.6rem' }}>{i.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p>{i.name}</p>
                    <p>{i.description}</p>
                  </div>
                  <ArrowRight size={16} color="var(--accent)" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Data Sources Overview</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <g transform="rotate(-90 60 60)">
                  <circle cx="60" cy="60" r="46" fill="none" stroke="var(--border-soft)" strokeWidth="14" />
                  {(() => {
                    const r = 46, c = 2 * Math.PI * r;
                    let acc = 0;
                    return donutSegments.map((seg) => {
                      const dash = (seg.pct / 100) * c;
                      const offset = -(acc / 100) * c;
                      acc += seg.pct;
                      return <circle key={seg.label} cx="60" cy="60" r={r} fill="none" stroke={seg.color} strokeWidth="14" strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={offset} />;
                    });
                  })()}
                </g>
                <text x="60" y="56" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text-primary)">{total}</text>
                <text x="60" y="73" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Total</text>
              </svg>
              <div style={{ display: 'grid', gap: '0.5rem', flex: 1 }}>
                {donutSegments.map((seg) => (
                  <div key={seg.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: seg.color, display: 'inline-block' }} /> {seg.label}
                    </div>
                    <span>{seg.count} ({seg.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rail-card">
            <h4>Data Sources by Type</h4>
            {typeBreakdown.map(([type, count]) => (
              <div className="type-row" key={type}>
                <span>{type}</span>
                <span className="type-row-value">{count}</span>
              </div>
            ))}
          </div>

          <div className="rail-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lightbulb size={15} color="var(--accent)" />
              </div>
              <h4 style={{ margin: 0 }}>Quick Tips</h4>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
              Keep your data fresh — ensure all your data sources are syncing regularly for accurate insights.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default DataSources;