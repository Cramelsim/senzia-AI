import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  Trash2,
} from 'lucide-react';
import AppShell from './AppShell';
import Modal from '../Modal';
import { useToast } from '../Toast';
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

const CONNECTION_TYPES = ['API', 'OAuth 2.0'];
const ICON_BY_NAME = Object.fromEntries(availableIntegrations.map((i) => [i.name, i.icon]));
const COLORS = ['#8b5cf6', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#6366f1'];

const nowStamp = () => `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

const statusPill = { connected: 'pill-success', warning: 'pill-warning', error: 'pill-danger' };
const statusLabel = { connected: 'Active', warning: 'Warning', error: 'Error' };

const DataSources = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sources, setSources] = useState(dataSources);
  const [available, setAvailable] = useState(availableIntegrations);
  const [isSyncing, setIsSyncing] = useState(false);
  const [modal, setModal] = useState(null); // { kind: 'add', preset? } | { kind: 'manage', id }
  const [addForm, setAddForm] = useState({ name: availableIntegrations[0].name, connection: 'API' });
  const syncTimer = useRef(null);

  useEffect(() => () => clearTimeout(syncTimer.current), []);

  const closeModal = () => setModal(null);
  const managed = modal?.kind === 'manage' ? sources.find((s) => s.id === modal.id) : null;

  const openAdd = (preset) => {
    const name = preset || available[0]?.name || '';
    setAddForm({ name, connection: 'API' });
    setModal({ kind: 'add' });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const integration = available.find((i) => i.name === addForm.name);
    if (!integration) {
      toast('Every available integration is already connected.', 'info');
      closeModal();
      return;
    }
    setSources((list) => [
      ...list,
      {
        id: Date.now(), name: integration.name, type: 'Integration', connection: addForm.connection, status: 'connected',
        lastSync: nowStamp(), records: '0', icon: ICON_BY_NAME[integration.name], color: COLORS[list.length % COLORS.length],
      },
    ]);
    setAvailable((list) => list.filter((i) => i.name !== integration.name));
    closeModal();
    toast(`${integration.name} connected.`);
  };

  const handleRefreshAll = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    syncTimer.current = setTimeout(() => {
      const stamp = nowStamp();
      setSources((list) => list.map((src) => (src.status === 'connected' ? { ...src, lastSync: stamp } : src)));
      setIsSyncing(false);
      toast('All active sources are up to date.');
    }, 1200);
  };

  // Syncing a source with a warning is how it gets "fixed": the reconnect succeeds and clears the warning.
  const handleSyncOne = (src) => {
    const wasWarning = src.status === 'warning';
    setSources((list) => list.map((x) => (x.id === src.id ? { ...x, status: 'connected', lastSync: nowStamp() } : x)));
    closeModal();
    toast(wasWarning ? `${src.name} reconnected.` : `${src.name} synced.`);
  };

  const handleDisconnect = (src) => {
    if (!window.confirm(`Disconnect ${src.name}? Its data will stop syncing.`)) return;
    setSources((list) => list.filter((x) => x.id !== src.id));
    if (ICON_BY_NAME[src.name]) {
      const original = availableIntegrations.find((i) => i.name === src.name);
      setAvailable((list) => [...list, original]);
    }
    closeModal();
    toast(`${src.name} disconnected.`);
  };

  const filteredSources = sources.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* Stats derived live from the actual dataset, instead of the hardcoded
     "16 total / 14 active" your source had (which didn't match its own 8-item array). */
  const { total, active, warning } = useMemo(() => {
    const active = sources.filter((s) => s.status === 'connected').length;
    const warning = sources.filter((s) => s.status === 'warning').length;
    return { total: sources.length, active, warning };
  }, [sources]);

  const typeBreakdown = useMemo(() => {
    const map = {};
    sources.forEach((s) => { map[s.type] = (map[s.type] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [sources]);

  const donutSegments = [
    { label: 'Active', count: active, pct: total ? Math.round((active / total) * 100) : 0, color: 'var(--success)' },
    { label: 'Warning', count: warning, pct: total ? Math.round((warning / total) * 100) : 0, color: 'var(--warning)' },
  ];

  const stats = [
    { label: 'Total Data Sources', value: String(total), sub: 'Connected and active', icon: Database, color: 'var(--accent)', bg: 'var(--accent-soft)' },
    { label: 'Active Sources', value: String(active), sub: `${total ? Math.round((active / total) * 100) : 0}% of total sources`, icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-soft)' },
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
          <button className="btn btn-ghost" onClick={handleRefreshAll} disabled={isSyncing}>
            <RefreshCw size={16} className={isSyncing ? 'spin' : undefined} /> {isSyncing ? 'Syncing...' : 'Refresh All'}
          </button>
          <button className="btn btn-violet" onClick={() => openAdd()}><Plus size={16} /> Add Data Source</button>
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
                        <button className="btn btn-ghost btn-sm" onClick={() => setModal({ kind: 'manage', id: s.id })}>{s.status === 'connected' ? 'Manage' : 'Fix'}</button>
                        <button className="icon-btn" aria-label={`More options for ${s.name}`} onClick={() => setModal({ kind: 'manage', id: s.id })}><MoreVertical size={14} /></button>
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
              <span>Showing {filteredSources.length === 0 ? 0 : 1} to {filteredSources.length} of {sources.length} results</span>
            </div>
          </div>

          {/* ---- Available integrations ---- */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>Available Integrations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {available.length === 0 && (
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', margin: 0 }}>Every available integration is connected.</p>
              )}
              {available.map((i) => (
                <div
                  className="available-ds-row"
                  key={i.name}
                  role="button"
                  tabIndex={0}
                  style={{ cursor: 'pointer' }}
                  onClick={() => openAdd(i.name)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAdd(i.name); } }}
                >
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

      {modal?.kind === 'add' && (
        <Modal
          title="Add Data Source"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button type="submit" form="add-source-form" className="btn btn-violet" disabled={available.length === 0}>Connect</button>
            </>
          }
        >
          <form id="add-source-form" onSubmit={handleAdd} style={{ display: 'grid', gap: '0.9rem' }}>
            <div className="modal-field">
              <label htmlFor="ds-name">Integration</label>
              <select id="ds-name" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}>
                {available.map((i) => <option key={i.name}>{i.name}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label htmlFor="ds-connection">Connection method</label>
              <select id="ds-connection" value={addForm.connection} onChange={(e) => setAddForm({ ...addForm, connection: e.target.value })}>
                {CONNECTION_TYPES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </form>
        </Modal>
      )}

      {managed && (
        <Modal
          title={managed.name}
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-outline-danger" onClick={() => handleDisconnect(managed)}><Trash2 size={15} /> Disconnect</button>
              <button type="button" className="btn btn-primary" onClick={() => handleSyncOne(managed)}>
                <RefreshCw size={15} /> {managed.status === 'warning' ? 'Reconnect' : 'Sync Now'}
              </button>
            </>
          }
        >
          {managed.status === 'warning' && (
            <p style={{ margin: 0, color: 'var(--warning)', fontSize: '0.85rem' }}>
              The last sync did not complete. Reconnect to resume syncing.
            </p>
          )}
          <div className="modal-detail-row"><span>Type</span><span>{managed.type}</span></div>
          <div className="modal-detail-row"><span>Connection</span><span>{managed.connection}</span></div>
          <div className="modal-detail-row"><span>Status</span><span className={`pill ${statusPill[managed.status]}`}>{statusLabel[managed.status]}</span></div>
          <div className="modal-detail-row"><span>Last sync</span><span>{managed.lastSync}</span></div>
          <div className="modal-detail-row"><span>Records</span><span>{managed.records}</span></div>
        </Modal>
      )}
    </AppShell>
  );
};

export default DataSources;