import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '../AuthContext';
import { useToast } from '../Toast';
import { loadSettings, saveSettings, applyAppearance, DEFAULT_SETTINGS, SETTINGS_KEY } from '../appearance';
import './Settings.css';

const ACTIVITY_KEY = 'senzia_settings_activity';
const ACTIVITY_PREVIEW = 4;
const SETTING_KEYS = Object.keys(DEFAULT_SETTINGS);
const CONTACT_WHATSAPP = 'https://wa.me/254700123456';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'data', label: 'Data & Privacy' },
  { id: 'system', label: 'System' },
];

const yesNo = (value) => (value ? 'On' : 'Off');

// `tab` switches the settings tab, `to` navigates to another page, `profile` scrolls to the profile form.
const buildOverviewCards = (f) => [
  {
    icon: Building2,
    title: 'Company Profile',
    desc: 'Update your company information, logo and contact details.',
    rows: [
      { label: 'Company', value: f.companyName },
      { label: 'Business ID', value: f.businessId },
    ],
    cta: 'Edit Profile',
    target: { profile: true },
  },
  {
    icon: SlidersHorizontal,
    title: 'Preferences',
    desc: 'Customize your experience and set your default preferences.',
    rows: [
      { label: 'Language', value: f.language },
      { label: 'Currency', value: f.currency },
    ],
    cta: 'Configure Preferences',
    target: { tab: 'data' },
  },
  {
    icon: Database,
    title: 'Data Settings',
    desc: 'Manage data import, retention and synchronization settings.',
    rows: [
      { label: 'Data Retention', value: f.dataRetention },
      { label: 'Auto Sync', value: 'On' },
    ],
    cta: 'Manage Data Settings',
    target: { tab: 'data' },
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
    target: { to: '/users' },
  },
  {
    icon: Shield,
    title: 'Security',
    desc: 'Manage password, 2FA and security preferences.',
    rows: [
      { label: 'Two-Factor Auth', value: f.twoFactorAuth ? 'Enabled' : 'Disabled' },
      { label: 'Login Sessions', value: 'Active (3)' },
    ],
    cta: 'Security Settings',
    target: { tab: 'security' },
  },
  {
    icon: Bell,
    title: 'Notifications',
    desc: 'Configure how you receive alerts and notifications.',
    rows: [
      { label: 'Email Notifications', value: yesNo(f.emailNotifications) },
      { label: 'SMS Notifications', value: yesNo(f.smsNotifications) },
    ],
    cta: 'Notification Settings',
    target: { tab: 'notifications' },
  },
  {
    icon: Palette,
    title: 'Appearance',
    desc: 'Customize the look and feel of the Senzia platform.',
    rows: [
      { label: 'Theme', value: f.theme === 'system' ? 'System' : f.theme.charAt(0).toUpperCase() + f.theme.slice(1) },
      { label: 'Compact Mode', value: yesNo(f.compactMode) },
    ],
    cta: 'Customize Appearance',
    target: { tab: 'appearance' },
  },
  {
    icon: Monitor,
    title: 'System Settings',
    desc: 'Configure system behavior and default values.',
    rows: [
      { label: 'Default Dashboard', value: f.defaultDashboard },
      { label: 'Items per page', value: f.itemsPerPage },
    ],
    cta: 'System Configuration',
    target: { tab: 'system' },
  },
];

const DEFAULT_ACTIVITY = [
  { user: 'John M.', initials: 'JM', action: 'Updated company profile', module: 'General', details: 'Changed company logo and contact information', time: 'Today, 09:15 AM' },
  { user: 'Alice N.', initials: 'AN', action: 'Enabled two-factor authentication', module: 'Security', details: 'Two-factor authentication enabled', time: 'Today, 08:45 AM' },
  { user: 'Brian O.', initials: 'BO', action: 'Added new user', module: 'Users', details: 'Invited user: Cynthia Wanjiku', time: 'Yesterday, 04:30 PM' },
  { user: 'Jane K.', initials: 'JK', action: 'Changed data retention policy', module: 'Data Settings', details: 'Retention period updated to 13 months', time: 'Yesterday, 02:10 PM' },
];

const loadActivity = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(ACTIVITY_KEY));
    return Array.isArray(saved) ? [...saved, ...DEFAULT_ACTIVITY] : DEFAULT_ACTIVITY;
  } catch {
    return DEFAULT_ACTIVITY;
  }
};

// Only entries created in this session/browser are persisted; the seeded ones always follow them.
const persistActivity = (entries) => {
  const own = entries.filter((e) => !DEFAULT_ACTIVITY.includes(e));
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(own.slice(0, 50)));
};

const SETTING_LABELS = {
  companyName: 'Company name', businessId: 'Business ID', email: 'Email', phone: 'Phone', address: 'Address',
  language: 'Language', timezone: 'Timezone', currency: 'Currency', dataRetention: 'Data retention',
  defaultDashboard: 'Default dashboard', itemsPerPage: 'Items per page', dateFormat: 'Date format',
  theme: 'Theme', primaryColor: 'Primary color', compactMode: 'Compact mode', twoFactorAuth: 'Two-factor auth',
  emailNotifications: 'Email notifications', inAppNotifications: 'In-app notifications', smsNotifications: 'SMS notifications',
};

const moduleFor = (key) => {
  if (['language', 'timezone', 'currency', 'dataRetention'].includes(key)) return 'Data Settings';
  if (['theme', 'primaryColor', 'compactMode'].includes(key)) return 'Appearance';
  if (key === 'twoFactorAuth') return 'Security';
  if (key.endsWith('Notifications')) return 'Notifications';
  if (['defaultDashboard', 'itemsPerPage', 'dateFormat'].includes(key)) return 'System';
  return 'General';
};

const formatNow = () => {
  const d = new Date();
  return `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

const Settings = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user, onLogout } = useAuth();
  const profileRef = useRef(null);

  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [saved, setSaved] = useState(loadSettings);
  const [formData, setFormData] = useState(() => ({
    ...loadSettings(),
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }));
  const [activityLog, setActivityLog] = useState(loadActivity);
  const [showAllActivity, setShowAllActivity] = useState(false);

  const changedKeys = SETTING_KEYS.filter((key) => formData[key] !== saved[key]);
  const isEditing = changedKeys.length > 0;
  const overviewCards = buildOverviewCards(saved);
  const visibleActivity = showAllActivity ? activityLog : activityLog.slice(0, ACTIVITY_PREVIEW);

  const actorName = user?.name || 'John M.';
  const actorInitials = actorName.split(/\s+/).filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();

  const logActivity = (action, module, details) => {
    const entry = { user: actorName, initials: actorInitials, action, module, details, time: formatNow() };
    setActivityLog((entries) => {
      const next = [entry, ...entries];
      persistActivity(next);
      return next;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = () => {
    if (!formData.companyName.trim()) {
      toast('Company name is required.', 'error');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      toast('Enter a valid email address.', 'error');
      return;
    }

    const next = {};
    SETTING_KEYS.forEach((key) => {
      next[key] = typeof formData[key] === 'string' ? formData[key].trim() : formData[key];
    });

    saveSettings(next);
    applyAppearance(next);
    setSaved(next);
    setFormData((prev) => ({ ...prev, ...next }));
    logActivity(
      'Updated settings',
      moduleFor(changedKeys[0]),
      changedKeys.map((key) => SETTING_LABELS[key]).join(', ')
    );
    toast('Settings saved.');
  };

  const handleCancel = () => {
    setFormData((prev) => ({ ...prev, ...saved }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    let error = '';
    if (!currentPassword) error = 'Enter your current password.';
    else if (newPassword.length < 8) error = 'New password must be at least 8 characters.';
    else if (newPassword === currentPassword) error = 'New password must be different from the current one.';
    else if (newPassword !== confirmPassword) error = 'New password and confirmation do not match.';

    setPasswordError(error);
    if (error) return;

    // Demo accounts have no server-side password, so there is nothing to verify the current one against.
    setFormData((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    logActivity('Changed password', 'Security', 'Account password updated');
    toast('Password updated.');
  };

  const handleCardTarget = ({ tab, to, profile }) => {
    if (to) {
      navigate(to);
    } else if (tab) {
      setActiveTab(tab);
    } else if (profile) {
      setActiveTab('general');
      profileRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      profileRef.current?.querySelector('input:not([disabled])')?.focus({ preventScroll: true });
    }
  };

  const openSecurityCenter = () => {
    setActiveTab('security');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportData = () => {
    const payload = { exportedAt: new Date().toISOString(), user, settings: saved };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'senzia-account-data.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast('Account data exported.');
  };

  const handleDeactivate = () => {
    if (!window.confirm('Deactivate your account? You will be signed out.')) return;
    if (onLogout) onLogout();
  };

  const handleDeleteAccount = () => {
    if (!window.confirm('Permanently delete your account and all saved settings? This cannot be undone.')) return;
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(ACTIVITY_KEY);
    if (onLogout) onLogout();
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
                {overviewCards.map(({ icon: Icon, title, desc, rows, cta, target }) => (
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
                    <button type="button" className="btn btn-outline-accent btn-sm card-footer-btn" onClick={() => handleCardTarget(target)}>{cta}</button>
                  </div>
                ))}
              </div>

              <div className="panel" ref={profileRef}>
                <div className="panel-head">
                  <div>
                    <h3>Company Profile</h3>
                    <p>Update your company information and contact details.</p>
                  </div>
                </div>
                <div className="field-grid">
                  <div className="field">
                    <label htmlFor="companyName">Company Name</label>
                    <input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="businessId">Business ID</label>
                    <input id="businessId" name="businessId" value={formData.businessId} disabled />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="field" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="address">Address</label>
                    <input id="address" name="address" value={formData.address} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <h3>Activity Log</h3>
                    <p>Recent changes made to your system settings.</p>
                  </div>
                  {activityLog.length > ACTIVITY_PREVIEW && (
                    <button type="button" className="link-accent" onClick={() => setShowAllActivity((v) => !v)}>
                      {showAllActivity ? 'Show Less' : 'View All Activity'} <ChevronRight size={14} />
                    </button>
                  )}
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
                    {visibleActivity.map((log, i) => (
                      <tr key={`${log.user}-${log.time}-${log.action}-${i}`}>
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
                  {passwordError && (
                    <p role="alert" style={{ color: 'var(--danger)', fontSize: '0.82rem', margin: '0.85rem 0 0' }}>{passwordError}</p>
                  )}
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
                  {saved.twoFactorAuth
                    ? <div className="status-chip good"><Check size={15} /> 2FA Enabled</div>
                    : <div className="status-chip warn"><Shield size={15} /> 2FA Disabled</div>}
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
                  { key: 'emailNotifications', label: 'Email Notifications', sub: `Get updates sent to ${saved.email}` },
                  { key: 'inAppNotifications', label: 'In-App Notifications', sub: 'Show alerts inside the Senzia dashboard' },
                  { key: 'smsNotifications', label: 'SMS Notifications', sub: `Text alerts to ${saved.phone}` },
                ].map((item) => (
                  <div className="toggle-row" key={item.key}>
                    <div>
                      <p>{item.label}</p>
                      <p>{item.sub}</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" name={item.key} checked={formData[item.key]} onChange={handleChange} />
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
                        type="button"
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
                    <select name="dataRetention" value={formData.dataRetention} onChange={handleChange}>
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
                  <button type="button" className="btn btn-outline-danger" onClick={handleExportData}><Download size={15} /> Export All Data</button>
                  <button type="button" className="btn btn-outline-danger" onClick={handleDeactivate}><UserX size={15} /> Deactivate Account</button>
                  <button type="button" className="btn btn-outline-danger" onClick={handleDeleteAccount}><Trash2 size={15} /> Delete Account</button>
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
                    <select name="defaultDashboard" value={formData.defaultDashboard} onChange={handleChange}>
                      <option>Executive</option>
                      <option>Operational</option>
                      <option>Financial</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Items per page</label>
                    <select name="itemsPerPage" value={formData.itemsPerPage} onChange={handleChange}>
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Date Format</label>
                    <select name="dateFormat" value={formData.dateFormat} onChange={handleChange}>
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
              <span className="rail-row-value">{user?.plan || 'Professional'} <span className="pill pill-success" style={{ marginLeft: '0.4rem' }}>Active</span></span>
            </div>
            <div className="rail-row">
              <span className="rail-row-label">Member Since</span>
              <span className="rail-row-value">January 15, 2024</span>
            </div>
            <div className="rail-row">
              <span className="rail-row-label">Next Billing Date</span>
              <span className="rail-row-value">June 12, 2025</span>
            </div>
            <button type="button" className="btn btn-outline-accent btn-sm btn-block" style={{ marginTop: '0.85rem' }} onClick={() => navigate('/billing')}>Manage Subscription</button>
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
            <button type="button" className="btn btn-outline-accent btn-sm btn-block" onClick={() => navigate('/data-sources')}>Manage Storage</button>
          </div>

          <div className="rail-card">
            <h4>Security Status</h4>
            <div className="security-status-banner">
              <Shield size={16} /> Your account is secure
            </div>
            <div className="security-item">
              <span className="security-item-label"><Check size={14} color="var(--success)" /> Two-Factor Authentication</span>
              <span style={{ color: saved.twoFactorAuth ? 'var(--success)' : 'var(--warning)', fontWeight: 600 }}>{saved.twoFactorAuth ? 'Enabled' : 'Disabled'}</span>
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
            <button type="button" className="btn btn-outline-accent btn-sm btn-block" style={{ marginTop: '0.6rem' }} onClick={openSecurityCenter}>View Security Center</button>
          </div>

          <div className="rail-card danger-card">
            <h4>Danger Zone</h4>
            <p>These actions are irreversible. Please proceed with caution.</p>
            <div className="danger-actions">
              <button type="button" className="btn btn-outline-danger btn-sm btn-block" onClick={handleExportData}><Download size={14} /> Export All Data</button>
              <button type="button" className="btn btn-outline-danger btn-sm btn-block" onClick={handleDeactivate}><UserX size={14} /> Deactivate Account</button>
              <button type="button" className="btn btn-outline-danger btn-sm btn-block" onClick={handleDeleteAccount}><Trash2 size={14} /> Delete Account</button>
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
          <button type="button" className="btn btn-whatsapp" onClick={() => window.open(CONTACT_WHATSAPP, '_blank', 'noopener,noreferrer')}><MessageCircle size={16} /> Chat on WhatsApp</button>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/contact')}>Contact Support</button>
        </div>
      </div>

      {isEditing && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.75rem' }}>
          <button type="button" className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </AppShell>
  );
};

export default Settings;