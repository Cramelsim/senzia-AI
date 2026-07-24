import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  Database,
  Building2,
  SlidersHorizontal,
  Shield,
  Palette,
  Monitor,
  UserCog,
  Bell,
  ChevronRight,
  Check,
  Key,
  Eye,
  EyeOff,
  Clock,
  Download,
  UserX,
  Trash2,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import AppShell from './AppShell';
import './Settings.css';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'data', label: 'Data & Privacy' },
  { id: 'system', label: 'System' },
];

const OVERVIEW_CARDS = [
  {
    icon: Building2,
    title: 'Company Profile',
    desc: 'Update your company information, logo and contact details.',
    rows: [
      { label: 'Company', value: 'Senzia Limited' },
      { label: 'Business ID', value: 'SEN-2024-001' },
    ],
    cta: 'Edit Profile',
  },
  {
    icon: SlidersHorizontal,
    title: 'Preferences',
    desc: 'Customize your experience and set your default preferences.',
    rows: [
      { label: 'Language', value: 'English (US)' },
      { label: 'Currency', value: 'KES - Kenyan Shilling' },
    ],
    cta: 'Configure Preferences',
  },
  {
    icon: Database,
    title: 'Data Settings',
    desc: 'Manage data import, retention and synchronization settings.',
    rows: [
      { label: 'Data Retention', value: '13 Months' },
      { label: 'Auto Sync', value: 'On' },
    ],
    cta: 'Manage Data Settings',
  },
  {
    icon: UserCog,
    title: 'User Management',
    desc: 'Manage users, roles and permissions.',
    rows: [
      { label: 'Total Users', value: '48' },
      { label: 'Pending Invites', value: '3' },
    ],
    cta: 'Manage Users',
  },
  {
    icon: Shield,
    title: 'Security',
    desc: 'Manage password, 2FA and security preferences.',
    rows: [
      { label: 'Two-Factor Auth', value: 'Enabled' },
      { label: 'Login Sessions', value: 'Active (3)' },
    ],
    cta: 'Security Settings',
  },
  {
    icon: Bell,
    title: 'Notifications',
    desc: 'Configure how you receive alerts and notifications.',
    rows: [
      { label: 'Email Notifications', value: 'On' },
      { label: 'SMS Notifications', value: 'Off' },
    ],
    cta: 'Notification Settings',
  },
  {
    icon: Palette,
    title: 'Appearance',
    desc: 'Customize the look and feel of the Senzia platform.',
    rows: [
      { label: 'Theme', value: 'Dark' },
      { label: 'Compact Mode', value: 'Off' },
    ],
    cta: 'Customize Appearance',
  },
  {
    icon: Monitor,
    title: 'System Settings',
    desc: 'Configure system behavior and default values.',
    rows: [
      { label: 'Default Dashboard', value: 'Executive' },
      { label: 'Items per page', value: '10' },
    ],
    cta: 'System Configuration',
  },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: 'Senzia Limited',
    businessId: 'SEN-2024-001',
    email: 'info@senzia.com',
    phone: '+254 700 123 456',
    address: 'WestPark Towers, 7th Floor, Waiyaki Way, Nairobi, Kenya',
    language: 'English (US)',
    timezone: 'EAT (UTC+3) Nairobi',
    currency: 'KES - Kenyan Shilling',
    theme: 'dark',
    primaryColor: '#f0a828',
    compactMode: false,
    twoFactorAuth: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [activityLog] = useState([
    { user: 'John M.', initials: 'JM', action: 'Updated company profile', module: 'General', details: 'Changed company logo and contact information', time: 'Today, 09:15 AM' },
    { user: 'Alice N.', initials: 'AN', action: 'Enabled two-factor authentication', module: 'Security', details: 'Two-factor authentication enabled', time: 'Today, 08:45 AM' },
    { user: 'Brian O.', initials: 'BO', action: 'Added new user', module: 'Users', details: 'Invited user: Cynthia Wanjiku', time: 'Yesterday, 04:30 PM' },
    { user: 'Jane K.', initials: 'JK', action: 'Changed data retention policy', module: 'Data Settings', details: 'Retention period updated to 13 months', time: 'Yesterday, 02:10 PM' },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Settings saved:', formData);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log('Password updated');
    setFormData((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  return (
    <AppShell
      active="Settings"
      pageIcon={SettingsIcon}
      title="Settings"
      subtitle="Manage your account, preferences, and system configurations."
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className="settings-layout">
        <div className="content-stack">

          {/* ---------- GENERAL: overview card grid ---------- */}
          {activeTab === 'general' && (
            <>
              <div className="card-grid">
                {OVERVIEW_CARDS.map(({ icon: Icon, title, desc, rows, cta }) => (
                  <div className="settings-card" key={title} tabIndex={0}>
                    <div className="settings-card-top">
                      <div className="settings-card-icon"><Icon size={18} /></div>
                      <ChevronRight size={16} color="var(--text-tertiary)" />
                    </div>
                    <div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                    <div className="card-rows">
                      {rows.map((r) => (
                        <div className="card-row" key={r.label}>
                          <span className="card-row-label">{r.label}</span>
                          <span className="card-row-value">{r.value}</span>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-outline-accent btn-sm card-footer-btn">{cta}</button>
                  </div>
                ))}
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h3>Activity Log</h3>
                    <p>Recent changes made to your system settings.</p>
                  </div>
                  <Link to="/settings/activity" className="link-accent">
                    View All Activity <ChevronRight size={14} />
                  </Link>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Action</th>
                      <th>Module</th>
                      <th>Details</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLog.map((log) => (
                      <tr key={`${log.user}-${log.time}`}>
                        <td>
                          <div className="activity-user">
                            <div className="avatar sm">{log.initials}</div>
                            {log.user}
                          </div>
                        </td>
                        <td>{log.action}</td>
                        <td><span className="activity-module">{log.module}</span></td>
                        <td style={{ color: 'var(--text-secondary)' }}>{log.details}</td>
                        <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ---------- SECURITY ---------- */}
          {activeTab === 'security' && (
            <div className="form-section">
              <div>
                <h2>Security Settings</h2>
                <p className="lead">Manage password, 2FA and security preferences.</p>
              </div>

              <div className="field-block">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="field-grid single">
                    <div className="field field-with-icon">
                      <label>Current Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter current password"
                      />
                      <button type="button" className="field-icon-btn" style={{ top: '2.15rem' }} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="field-grid" style={{ marginTop: '1.1rem' }}>
                    <div className="field">
                      <label>New Password</label>
                      <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Enter new password" />
                    </div>
                    <div className="field">
                      <label>Confirm Password</label>
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ marginTop: '1.1rem' }}>
                    <Key size={15} /> Update Password
                  </button>
                </form>
              </div>

              <div className="field-block">
                <h3>Two-Factor Authentication</h3>
                <div className="toggle-row">
                  <div>
                    <p>Two-Factor Auth</p>
                    <p>{formData.twoFactorAuth ? 'Enabled' : 'Disabled'}</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" name="twoFactorAuth" checked={formData.twoFactorAuth} onChange={handleChange} />
                    <span className="switch-track"><span className="switch-thumb" /></span>
                  </label>
                </div>
              </div>

              <div className="field-block">
                <h3>Security Status</h3>
                <div className="status-chip-grid">
                  <div className="status-chip good"><Check size={15} /> Strong Password</div>
                  <div className="status-chip good"><Check size={15} /> 2FA Enabled</div>
                  <div className="status-chip warn"><Clock size={15} /> Last Login: Today, 08:32 AM</div>
                </div>
              </div>
            </div>
          )}

          {/* ---------- NOTIFICATIONS ---------- */}
          {activeTab === 'notifications' && (
            <div className="form-section">
              <div>
                <h2>Notifications</h2>
                <p className="lead">Configure how you receive alerts and notifications.</p>
              </div>
              <div className="field-block" style={{ display: 'grid', gap: '0.75rem' }}>
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', sub: 'Get updates sent to info@senzia.com', on: true },
                  { key: 'inAppNotifications', label: 'In-App Notifications', sub: 'Show alerts inside the Senzia dashboard', on: true },
                  { key: 'smsNotifications', label: 'SMS Notifications', sub: 'Text alerts to +254 700 123 456', on: false },
                ].map((item) => (
                  <div className="toggle-row" key={item.key}>
                    <div>
                      <p>{item.label}</p>
                      <p>{item.sub}</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked={item.on} />
                      <span className="switch-track"><span className="switch-thumb" /></span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- APPEARANCE ---------- */}
          {activeTab === 'appearance' && (
            <div className="form-section">
              <div>
                <h2>Appearance</h2>
                <p className="lead">Customize the look and feel of the Senzia platform.</p>
              </div>
              <div className="field-block">
                <div className="field-grid">
                  <div className="field">
                    <label>Theme</label>
                    <select name="theme" value={formData.theme} onChange={handleChange}>
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: '1.1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Primary Color</label>
                  <div className="color-swatch-row">
                    {['#f0a828', '#4f8bf0', '#34c98e', '#ef5a5a', '#a855f7', '#ec4899'].map((color) => (
                      <button
                        key={color}
                        className={`color-swatch${formData.primaryColor === color ? ' selected' : ''}`}
                        style={{ background: color }}
                        onClick={() => setFormData((p) => ({ ...p, primaryColor: color }))}
                        aria-label={`Use ${color} as primary color`}
                      />
                    ))}
                  </div>
                </div>
                <label className="checkbox-row" style={{ marginTop: '1.1rem' }}>
                  <input type="checkbox" name="compactMode" checked={formData.compactMode} onChange={handleChange} />
                  Compact Mode
                </label>
              </div>
            </div>
          )}

          {/* ---------- DATA & PRIVACY ---------- */}
          {activeTab === 'data' && (
            <div className="form-section">
              <div>
                <h2>Data & Privacy</h2>
                <p className="lead">Configure your data preferences, retention and export options.</p>
              </div>
              <div className="field-block">
                <div className="field-grid">
                  <div className="field">
                    <label>Language</label>
                    <select name="language" value={formData.language} onChange={handleChange}>
                      <option value="English (US)">English (US)</option>
                      <option value="Swahili">Swahili</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Timezone</label>
                    <select name="timezone" value={formData.timezone} onChange={handleChange}>
                      <option value="EAT (UTC+3) Nairobi">EAT (UTC+3) Nairobi</option>
                      <option value="CAT (UTC+2)">CAT (UTC+2)</option>
                      <option value="WAT (UTC+1)">WAT (UTC+1)</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Currency</label>
                    <select name="currency" value={formData.currency} onChange={handleChange}>
                      <option value="KES - Kenyan Shilling">KES - Kenyan Shilling</option>
                      <option value="USD - US Dollar">USD - US Dollar</option>
                      <option value="EUR - Euro">EUR - Euro</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Data Retention</label>
                    <select name="dataRetention" defaultValue="13 Months">
                      <option>6 Months</option>
                      <option>13 Months</option>
                      <option>24 Months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rail-card danger-card">
                <h4>Danger Zone</h4>
                <p>These actions are irreversible. Please proceed with caution.</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-outline-danger"><Download size={15} /> Export All Data</button>
                  <button className="btn btn-outline-danger"><UserX size={15} /> Deactivate Account</button>
                  <button className="btn btn-outline-danger"><Trash2 size={15} /> Delete Account</button>
                </div>
              </div>
            </div>
          )}

          {/* ---------- SYSTEM ---------- */}
          {activeTab === 'system' && (
            <div className="form-section">
              <div>
                <h2>System Settings</h2>
                <p className="lead">Configure system behavior and default values.</p>
              </div>
              <div className="field-block">
                <div className="field-grid">
                  <div className="field">
                    <label>Default Dashboard</label>
                    <select defaultValue="Executive">
                      <option>Executive</option>
                      <option>Operational</option>
                      <option>Financial</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Items per page</label>
                    <select defaultValue="10">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Date Format</label>
                    <select defaultValue="MMM D, YYYY">
                      <option>MMM D, YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Account Overview</h4>
            <div className="rail-row">
              <span className="rail-row-label">Plan</span>
              <span className="rail-row-value">Professional <span className="pill pill-success" style={{ marginLeft: '0.4rem' }}>Active</span></span>
            </div>
            <div className="rail-row">
              <span className="rail-row-label">Member Since</span>
              <span className="rail-row-value">January 15, 2024</span>
            </div>
            <div className="rail-row">
              <span className="rail-row-label">Next Billing Date</span>
              <span className="rail-row-value">June 12, 2025</span>
            </div>
            <button className="btn btn-outline-accent btn-sm btn-block" style={{ marginTop: '0.85rem' }}>Manage Subscription</button>
          </div>

          <div className="rail-card">
            <h4>Storage Usage</h4>
            <div className="storage-donut-wrap">
              <div className="donut" style={{ '--pct': 42 }}>
                <div className="donut-inner">
                  <strong>42%</strong>
                  <span>Used</span>
                </div>
              </div>
              <div className="storage-meta">
                <p>21.4 GB Used</p>
                <p>of 50 GB</p>
              </div>
            </div>
            <button className="btn btn-outline-accent btn-sm btn-block">Manage Storage</button>
          </div>

          <div className="rail-card">
            <h4>Security Status</h4>
            <div className="security-status-banner">
              <Shield size={16} /> Your account is secure
            </div>
            <div className="security-item">
              <span className="security-item-label"><Check size={14} color="var(--success)" /> Two-Factor Authentication</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>Enabled</span>
            </div>
            <div className="security-item">
              <span className="security-item-label"><Check size={14} color="var(--success)" /> Strong Password</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>Enabled</span>
            </div>
            <div className="security-item">
              <span className="security-item-label"><Check size={14} color="var(--success)" /> Active Sessions</span>
              <span>3</span>
            </div>
            <div className="security-item">
              <span className="security-item-label"><Check size={14} color="var(--success)" /> Last Login</span>
              <span>Today, 08:32 AM</span>
            </div>
            <button className="btn btn-outline-accent btn-sm btn-block" style={{ marginTop: '0.6rem' }}>View Security Center</button>
          </div>

          <div className="rail-card danger-card">
            <h4>Danger Zone</h4>
            <p>These actions are irreversible. Please proceed with caution.</p>
            <div className="danger-actions">
              <button className="btn btn-outline-danger btn-sm btn-block"><Download size={14} /> Export All Data</button>
              <button className="btn btn-outline-danger btn-sm btn-block"><UserX size={14} /> Deactivate Account</button>
              <button className="btn btn-outline-danger btn-sm btn-block"><Trash2 size={14} /> Delete Account</button>
            </div>
          </div>
        </div>
      </div>

      {/* Need help footer strip */}
      <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <HelpCircle size={22} color="var(--accent)" />
          <div>
            <p style={{ fontWeight: 600, margin: 0 }}>Need Help?</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.1rem 0 0' }}>
              Our support team is here to help you 24/7.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-whatsapp"><MessageCircle size={16} /> Chat on WhatsApp</button>
          <button className="btn btn-primary">Contact Support</button>
        </div>
      </div>

      {isEditing && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </AppShell>
  );
};

export default Settings;