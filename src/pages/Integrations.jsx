import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plug,
  Plus,
  Search,
  RefreshCw,
  CheckCircle,
  Clock,
  Code,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import AppShell from './AppShell';
import Modal from '../Modal';
import { useToast } from '../Toast';
import './Integrations.css';

const TABS = [
  { id: 'all', label: 'All Integrations' },
  { id: 'connected', label: 'Connected' },
  { id: 'available', label: 'Available' },
  { id: 'accounting', label: 'Accounting' },
  { id: 'payments', label: 'Payments' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'marketing', label: 'Marketing & CRM' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'custom', label: 'Custom' },
];

const connectedIntegrations = [
  { id: 1, name: 'QuickBooks Online', category: 'accounting', description: 'Sync your financial data, invoices, expenses and more.', status: 'connected', lastSync: 'Today, 08:45 AM', icon: '📊', color: '#2ca01c' },
  { id: 2, name: 'M-Pesa Business', category: 'payments', description: 'Automatically import M-Pesa transactions and statements.', status: 'connected', lastSync: 'Today, 08:30 AM', icon: '📱', color: '#22c55e' },
  { id: 3, name: 'Shopify', category: 'ecommerce', description: 'Sync orders, customers, products and inventory in real-time.', status: 'connected', lastSync: 'Today, 08:15 AM', icon: '🛍️', color: '#96bf48' },
  { id: 4, name: 'Google Analytics 4', category: 'analytics', description: 'Track website performance and customer behavior.', status: 'connected', lastSync: 'Today, 07:50 AM', icon: '📈', color: '#4285f4' },
  { id: 5, name: 'Xero Accounting', category: 'accounting', description: 'Sync accounting data, bills, payments and contacts.', status: 'warning', lastSync: 'Yesterday, 11:20 PM', icon: '📒', color: '#13b5ea' },
  { id: 6, name: 'Stripe', category: 'payments', description: 'Sync payments, refunds and transactions seamlessly.', status: 'connected', lastSync: 'Today, 08:40 AM', icon: '💳', color: '#635bff' },
  { id: 7, name: 'Mailchimp', category: 'marketing', description: 'Sync contacts and automate marketing campaigns.', status: 'warning', lastSync: 'Yesterday, 09:10 PM', icon: '✉️', color: '#ffe01b' },
  { id: 8, name: 'Google Sheets', category: 'analytics', description: 'Import and export data to Google Sheets.', status: 'connected', lastSync: 'Today, 08:05 AM', icon: '📋', color: '#0f9d58' },
];

const availableIntegrations = [
  { name: 'Slack', category: 'custom', icon: '💬', description: 'Streamline team communication.', color: '#4a154b' },
  { name: 'SharePoint', category: 'custom', icon: '📁', description: 'Collaborate and share documents.', color: '#0078d4' },
  { name: 'Zendesk', category: 'marketing', icon: '🎫', description: 'Sync support tickets and customer data.', color: '#03363d' },
  { name: 'HubSpot', category: 'marketing', icon: '📈', description: 'Manage CRM and marketing automation.', color: '#ff7a59' },
  { name: 'WooCommerce', category: 'ecommerce', icon: '🛒', description: 'Sync orders, customers and products.', color: '#96588a' },
  { name: 'API Access', category: 'custom', icon: '🔌', description: 'Build custom connections using Senzia API.', color: '#8b5cf6' },
];

const recentActivity = [
  { integration: 'QuickBooks Online', action: 'Data synced successfully', time: '2 min ago' },
  { integration: 'M-Pesa Business', action: 'New transactions imported', time: '15 min ago' },
  { integration: 'Shopify', action: '25 new orders imported', time: '45 min ago' },
  { integration: 'Stripe', action: 'Payments synced', time: '1 hour ago' },
  { integration: 'Google Sheets', action: 'Data exported successfully', time: '2 hours ago' },
];

const statusPill = { connected: 'pill-success', warning: 'pill-warning', error: 'pill-danger' };
const statusLabel = { connected: 'Connected', warning: 'Warning', error: 'Error' };

const nowStamp = () => `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
const pct = (count, total) => (total ? Math.round((count / total) * 100) : 0);

const HealthDonut = ({ segments, healthy }) => {
  const r = 46, stroke = 15, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <g transform="rotate(-90 65 65)">
        <circle cx="65" cy="65" r={r} fill="none" stroke="var(--border-soft)" strokeWidth={stroke} />
        {segments.map((seg) => {
          const dash = (seg.pct / 100) * c;
          const offset = -(acc / 100) * c;
          acc += seg.pct;
          return <circle key={seg.status} cx="65" cy="65" r={r} fill="none" stroke={seg.color} strokeWidth={stroke} strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={offset} />;
        })}
      </g>
      <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--text-primary)">{healthy}</text>
      <text x="65" y="78" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Healthy</text>
    </svg>
  );
};

const Integrations = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [connected, setConnected] = useState(connectedIntegrations);
  const [available, setAvailable] = useState(availableIntegrations);
  const [activity, setActivity] = useState(recentActivity);
  const [isSyncing, setIsSyncing] = useState(false);
  const [modal, setModal] = useState(null); // { kind: 'manage', id } | { kind: 'health' } | { kind: 'request' }
  const [requestForm, setRequestForm] = useState({ name: '', details: '' });
  const syncTimer = useRef(null);

  useEffect(() => () => clearTimeout(syncTimer.current), []);

  const closeModal = () => setModal(null);
  const logActivity = (integration, action) =>
    setActivity((list) => [{ integration, action, time: 'Just now' }, ...list].slice(0, 6));
  const managed = modal?.kind === 'manage' ? connected.find((i) => i.id === modal.id) : null;

  const matchesSearch = (i) => {
    const term = searchTerm.trim().toLowerCase();
    return !term || i.name.toLowerCase().includes(term) || i.description.toLowerCase().includes(term);
  };
  const isCategoryTab = !['all', 'connected', 'available'].includes(activeTab);
  const inTab = (i) => !isCategoryTab || i.category === activeTab;

  const filteredConnected = connected.filter((i) => matchesSearch(i) && inTab(i));
  const filteredAvailable = available.filter((i) => matchesSearch(i) && inTab(i));
  const showConnected = activeTab !== 'available';
  const showAvailable = activeTab !== 'connected';

  const healthy = connected.filter((i) => i.status === 'connected').length;
  const warnings = connected.filter((i) => i.status === 'warning').length;
  const errors = connected.filter((i) => i.status === 'error').length;
  const healthData = [
    { status: 'Healthy', count: healthy, pct: pct(healthy, connected.length), color: 'var(--success)' },
    { status: 'Warning', count: warnings, pct: pct(warnings, connected.length), color: 'var(--warning)' },
    { status: 'Error', count: errors, pct: pct(errors, connected.length), color: 'var(--danger)' },
  ];

  const stats = [
    { label: 'Total Integrations', value: String(connected.length + available.length), change: `${connected.length} connected`, icon: Plug, color: 'var(--violet)', bg: 'var(--violet-soft)' },
    { label: 'Active Connections', value: String(healthy), change: `${pct(healthy, connected.length)}% healthy`, icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-soft)' },
    { label: 'Data Sync Status', value: '98.7%', change: 'Success Rate', icon: RefreshCw, color: 'var(--info)', bg: 'rgba(79,139,240,0.12)' },
    { label: 'Time Saved', value: '125 hrs', change: '+18% vs last month', icon: Clock, color: 'var(--warning)', bg: 'var(--warning-soft)' },
  ];

  const handleConnect = (integration) => {
    setAvailable((list) => list.filter((i) => i.name !== integration.name));
    setConnected((list) => [
      ...list,
      { id: Date.now(), ...integration, status: 'connected', lastSync: nowStamp() },
    ]);
    logActivity(integration.name, 'Connected successfully');
    toast(`${integration.name} connected.`);
  };

  const handleSyncAll = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    syncTimer.current = setTimeout(() => {
      const stamp = nowStamp();
      setConnected((list) => list.map((i) => (i.status === 'connected' ? { ...i, lastSync: stamp } : i)));
      logActivity('All integrations', 'Sync completed');
      setIsSyncing(false);
      toast('All healthy integrations are up to date.');
    }, 1200);
  };

  const handleSyncOne = (integration) => {
    const wasWarning = integration.status === 'warning';
    setConnected((list) => list.map((i) => (i.id === integration.id ? { ...i, status: 'connected', lastSync: nowStamp() } : i)));
    logActivity(integration.name, wasWarning ? 'Reconnected successfully' : 'Data synced successfully');
    closeModal();
    toast(wasWarning ? `${integration.name} reconnected.` : `${integration.name} synced.`);
  };

  const handleDisconnect = (integration) => {
    if (!window.confirm(`Disconnect ${integration.name}? Its data will stop syncing.`)) return;
    setConnected((list) => list.filter((i) => i.id !== integration.id));
    setAvailable((list) => [
      ...list,
      { name: integration.name, category: integration.category, icon: integration.icon, description: integration.description, color: integration.color },
    ]);
    logActivity(integration.name, 'Disconnected');
    closeModal();
    toast(`${integration.name} disconnected.`);
  };

  const handleRequest = (e) => {
    e.preventDefault();
    if (!requestForm.name.trim()) {
      toast('Tell us which tool you want to connect.', 'error');
      return;
    }
    toast(`Request for ${requestForm.name.trim()} sent. We'll be in touch.`);
    setRequestForm({ name: '', details: '' });
    closeModal();
  };

  return (
    <AppShell
      active="Integrations"
      pageIcon={Plug}
      title="Integrations Hub"
      subtitle="Connect your favorite tools and platforms with Senzia."
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerActions={
        <>
          <button className="btn btn-ghost" onClick={handleSyncAll} disabled={isSyncing}>
            <RefreshCw size={16} className={isSyncing ? 'spin' : undefined} /> {isSyncing ? 'Syncing...' : 'Sync All'}
          </button>
          <button className="btn btn-violet" onClick={() => { setActiveTab('available'); setSearchTerm(''); }}><Plus size={16} /> Add Integration</button>
        </>
      }
    >
      <div className="integrations-layout">
        <div className="content-stack">

          {/* ---- Stat cards ---- */}
          <div className="int-stat-grid">
            {stats.map(({ label, value, change, icon: Icon, color, bg }) => (
              <div className="int-stat-card" key={label}>
                <div className="int-stat-top">
                  <div className="int-stat-icon" style={{ background: bg, color }}><Icon size={16} /></div>
                  <span>{label}</span>
                </div>
                <p className="int-stat-value">{value}</p>
                <p className="int-stat-trend" style={{ color }}>{change}</p>
              </div>
            ))}
          </div>

          {/* ---- Search ---- */}
          <div className="search-bar" style={{ maxWidth: 420 }}>
            <Search size={16} />
            <input
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* ---- Connected integrations ---- */}
          {showConnected && (
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>Connected Integrations</h3>
              <div className="connected-grid">
                {filteredConnected.map((integration) => (
                  <div className="int-card" key={integration.id}>
                    <div className="int-card-top">
                      <div className="int-card-top-left">
                        <div className="int-badge" style={{ background: `${integration.color}26`, fontSize: '1.3rem' }}>
                          {integration.icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="int-card-name">{integration.name}</p>
                      <span className={`pill ${statusPill[integration.status]}`}>{statusLabel[integration.status]}</span>
                    </div>
                    <p className="int-card-desc">{integration.description}</p>
                    <div className="int-card-sync">
                      <span>Last Sync: {integration.lastSync}</span>
                    </div>
                    <div className="int-card-actions">
                      <button className="btn btn-ghost btn-sm btn-block" onClick={() => setModal({ kind: 'manage', id: integration.id })}>Manage</button>
                    </div>
                  </div>
                ))}
                {filteredConnected.length === 0 && (
                  <p style={{ color: 'var(--text-tertiary)' }}>
                    {searchTerm.trim() ? 'No integrations match your search.' : 'No connected integrations in this category yet.'}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ---- Available integrations ---- */}
          {showAvailable && (
            <div className="panel">
              <div className="panel-head">
                <h3>Available Integrations</h3>
              </div>
              <div className="available-scroll">
                {filteredAvailable.map((integration) => (
                  <div className="available-card" key={integration.name}>
                    <div className="available-card-top">
                      <div className="int-badge" style={{ background: `${integration.color}26`, width: 32, height: 32, fontSize: '1rem' }}>
                        {integration.icon}
                      </div>
                      <p>{integration.name}</p>
                    </div>
                    <p className="available-card-desc">{integration.description}</p>
                    <button className="btn btn-outline-accent btn-sm btn-block" onClick={() => handleConnect(integration)}>Connect</button>
                  </div>
                ))}
                {filteredAvailable.length === 0 && (
                  <p style={{ color: 'var(--text-tertiary)', margin: 0 }}>
                    {searchTerm.trim() ? 'No integrations match your search.' : 'Nothing left to connect in this category.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Integration Health</h4>
            <div className="health-donut-wrap">
              <HealthDonut segments={healthData} healthy={healthy} />
              <div style={{ display: 'grid', gap: '0.55rem', flex: 1 }}>
                {healthData.map((seg) => (
                  <div key={seg.status} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: seg.color, display: 'inline-block' }} /> {seg.status}
                    </div>
                    <span>{seg.count} ({seg.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="link-violet" style={{ marginTop: '1rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }} onClick={() => setModal({ kind: 'health' })}>
              View Health Details →
            </button>
          </div>

          <div className="rail-card">
            <h4>Recent Integration Activity</h4>
            {activity.map((a) => (
              <div className="activity-item-row" key={`${a.integration}-${a.action}-${a.time}`}>
                <div>
                  <p>{a.integration}</p>
                  <p>{a.action}</p>
                </div>
                <span className="activity-item-time">{a.time}</span>
              </div>
            ))}
          </div>

          <div className="rail-card">
            <h4>Need Custom Integration?</h4>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', margin: '0 0 1rem', lineHeight: 1.4 }}>
              Can't find the integration you need? Our team can help you build a custom integration.
            </p>
            <button className="btn btn-violet btn-block" onClick={() => setModal({ kind: 'request' })}><Plug size={14} /> Request Custom Integration</button>
          </div>

          <div className="rail-card">
            <h4>API Access</h4>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', margin: '0 0 1rem', lineHeight: 1.4 }}>
              Build custom connections using Senzia API.
            </p>
            <button className="btn btn-violet btn-block" onClick={() => navigate('/api-docs')}><Code size={14} /> View API Documentation <ExternalLink size={13} /></button>
          </div>
        </div>
      </div>

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
            <p style={{ margin: 0, color: 'var(--warning)', fontSize: '0.85rem' }}>The last sync did not complete. Reconnect to resume syncing.</p>
          )}
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{managed.description}</p>
          <div className="modal-detail-row"><span>Status</span><span className={`pill ${statusPill[managed.status]}`}>{statusLabel[managed.status]}</span></div>
          <div className="modal-detail-row"><span>Last sync</span><span>{managed.lastSync}</span></div>
        </Modal>
      )}

      {modal?.kind === 'health' && (
        <Modal title="Integration Health" onClose={closeModal} footer={<button type="button" className="btn btn-ghost" onClick={closeModal}>Close</button>}>
          {connected.length === 0 && <p style={{ margin: 0, color: 'var(--text-tertiary)' }}>No integrations connected.</p>}
          {connected.map((i) => (
            <div className="modal-detail-row" key={i.id}>
              <span>{i.name}</span>
              <span className={`pill ${statusPill[i.status]}`}>{statusLabel[i.status]}</span>
            </div>
          ))}
        </Modal>
      )}

      {modal?.kind === 'request' && (
        <Modal
          title="Request Custom Integration"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button type="submit" form="request-integration-form" className="btn btn-violet">Send Request</button>
            </>
          }
        >
          <form id="request-integration-form" onSubmit={handleRequest} style={{ display: 'grid', gap: '0.9rem' }}>
            <div className="modal-field">
              <label htmlFor="req-name">Tool or platform</label>
              <input id="req-name" autoFocus value={requestForm.name} onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })} placeholder="e.g. Sage, Odoo, Tally" />
            </div>
            <div className="modal-field">
              <label htmlFor="req-details">What should it do?</label>
              <textarea id="req-details" rows={3} value={requestForm.details} onChange={(e) => setRequestForm({ ...requestForm, details: e.target.value })} />
            </div>
          </form>
        </Modal>
      )}
    </AppShell>
  );
};

export default Integrations;
