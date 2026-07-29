import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plug,
  Plus,
  Search,
  RefreshCw,
  CheckCircle,
  Clock,
  Code,
  ExternalLink,
} from 'lucide-react';
import AppShell from './AppShell';
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

const stats = [
  { label: 'Total Integrations', value: '16', change: '+33% vs last month', icon: Plug, color: 'var(--violet)', bg: 'var(--violet-soft)' },
  { label: 'Active Connections', value: '14', change: '88% healthy', icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-soft)' },
  { label: 'Data Sync Status', value: '98.7%', change: 'Success Rate', icon: RefreshCw, color: 'var(--info)', bg: 'rgba(79,139,240,0.12)' },
  { label: 'Time Saved', value: '125 hrs', change: '+18% vs last month', icon: Clock, color: 'var(--warning)', bg: 'var(--warning-soft)' },
];

const connectedIntegrations = [
  { id: 1, name: 'QuickBooks Online', description: 'Sync your financial data, invoices, expenses and more.', status: 'connected', lastSync: 'Today, 08:45 AM', icon: '📊', color: '#2ca01c' },
  { id: 2, name: 'M-Pesa Business', description: 'Automatically import M-Pesa transactions and statements.', status: 'connected', lastSync: 'Today, 08:30 AM', icon: '📱', color: '#22c55e' },
  { id: 3, name: 'Shopify', description: 'Sync orders, customers, products and inventory in real-time.', status: 'connected', lastSync: 'Today, 08:15 AM', icon: '🛍️', color: '#96bf48' },
  { id: 4, name: 'Google Analytics 4', description: 'Track website performance and customer behavior.', status: 'connected', lastSync: 'Today, 07:50 AM', icon: '📈', color: '#4285f4' },
  { id: 5, name: 'Xero Accounting', description: 'Sync accounting data, bills, payments and contacts.', status: 'warning', lastSync: 'Yesterday, 11:20 PM', icon: '📒', color: '#13b5ea' },
  { id: 6, name: 'Stripe', description: 'Sync payments, refunds and transactions seamlessly.', status: 'connected', lastSync: 'Today, 08:40 AM', icon: '💳', color: '#635bff' },
  { id: 7, name: 'Mailchimp', description: 'Sync contacts and automate marketing campaigns.', status: 'warning', lastSync: 'Yesterday, 09:10 PM', icon: '✉️', color: '#ffe01b' },
  { id: 8, name: 'Google Sheets', description: 'Import and export data to Google Sheets.', status: 'connected', lastSync: 'Today, 08:05 AM', icon: '📋', color: '#0f9d58' },
];

const availableIntegrations = [
  { name: 'Slack', icon: '💬', description: 'Streamline team communication.', color: '#4a154b' },
  { name: 'SharePoint', icon: '📁', description: 'Collaborate and share documents.', color: '#0078d4' },
  { name: 'Zendesk', icon: '🎫', description: 'Sync support tickets and customer data.', color: '#03363d' },
  { name: 'HubSpot', icon: '📈', description: 'Manage CRM and marketing automation.', color: '#ff7a59' },
  { name: 'WooCommerce', icon: '🛒', description: 'Sync orders, customers and products.', color: '#96588a' },
  { name: 'API Access', icon: '🔌', description: 'Build custom connections using Senzia API.', color: '#8b5cf6' },
];

const healthData = [
  { status: 'Healthy', count: 14, pct: 88, color: 'var(--success)' },
  { status: 'Warning', count: 1, pct: 6, color: 'var(--warning)' },
  { status: 'Error', count: 1, pct: 6, color: 'var(--danger)' },
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

const HealthDonut = () => {
  const r = 46, stroke = 15, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <g transform="rotate(-90 65 65)">
        <circle cx="65" cy="65" r={r} fill="none" stroke="var(--border-soft)" strokeWidth={stroke} />
        {healthData.map((seg) => {
          const dash = (seg.pct / 100) * c;
          const offset = -(acc / 100) * c;
          acc += seg.pct;
          return <circle key={seg.status} cx="65" cy="65" r={r} fill="none" stroke={seg.color} strokeWidth={stroke} strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={offset} />;
        })}
      </g>
      <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--text-primary)">14</text>
      <text x="65" y="78" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Healthy</text>
    </svg>
  );
};

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredConnected = connectedIntegrations.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showConnected = activeTab === 'all' || activeTab === 'connected';
  const showAvailable = activeTab === 'all' || activeTab === 'available';

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
          <button className="btn btn-ghost"><RefreshCw size={16} /> Sync All</button>
          <button className="btn btn-violet"><Plus size={16} /> Add Integration</button>
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
                      <button className="btn btn-ghost btn-sm btn-block">Manage</button>
                    </div>
                  </div>
                ))}
                {filteredConnected.length === 0 && (
                  <p style={{ color: 'var(--text-tertiary)' }}>No integrations match your search.</p>
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
                {availableIntegrations.map((integration) => (
                  <div className="available-card" key={integration.name}>
                    <div className="available-card-top">
                      <div className="int-badge" style={{ background: `${integration.color}26`, width: 32, height: 32, fontSize: '1rem' }}>
                        {integration.icon}
                      </div>
                      <p>{integration.name}</p>
                    </div>
                    <p className="available-card-desc">{integration.description}</p>
                    <button className="btn btn-outline-accent btn-sm btn-block">Connect</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Integration Health</h4>
            <div className="health-donut-wrap">
              <HealthDonut />
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
            <Link to="/integrations/health" className="link-violet" style={{ marginTop: '1rem' }}>View Health Details →</Link>
          </div>

          <div className="rail-card">
            <h4>Recent Integration Activity</h4>
            {recentActivity.map((a) => (
              <div className="activity-item-row" key={a.integration + a.time}>
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
            <button className="btn btn-violet btn-block"><Plug size={14} /> Request Custom Integration</button>
          </div>

          <div className="rail-card">
            <h4>API Access</h4>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', margin: '0 0 1rem', lineHeight: 1.4 }}>
              Build custom connections using Senzia API.
            </p>
            <Link to="/api-docs">
              <button className="btn btn-violet btn-block"><Code size={14} /> View API Documentation <ExternalLink size={13} /></button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Integrations;