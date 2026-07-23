import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Lock,
  Globe,
  DollarSign,
  Palette,
  Monitor,
  Database,
  AlertTriangle,
  ChevronRight,
  Check,
  Edit,
  Key,
  LogOut,
  Calendar,
  Users,
  HardDrive,
  Activity,
  Eye,
  EyeOff,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Building,
  Clock,
  Download,
  Trash2,
  RefreshCw,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

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
    language: 'English',
    timezone: 'EAT (UTC+3)',
    currency: 'KES - Kenyan Shilling',
    theme: 'dark',
    compactMode: false,
    twoFactorAuth: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activityLog, setActivityLog] = useState([
    { action: 'User permissions updated', user: 'Alice Nijuguna', time: 'Today, 09:15 AM' },
    { action: 'New user invited', user: 'Brian Otieno', time: 'Yesterday, 04:45 PM' },
    { action: 'User deactivated', user: 'Cynthia Wanjiku', time: 'May 11, 2025, 02:30 PM' },
    { action: 'System settings updated', user: 'John M.', time: 'May 10, 2025, 11:20 AM' },
    { action: 'Data export requested', user: 'Sarah K.', time: 'May 9, 2025, 09:45 AM' }
  ]);

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'data', label: 'Data Settings', icon: Database },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend
    console.log('Settings saved:', formData);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // In a real app, update password
    console.log('Password updated');
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
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
              <Link to="/reports" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Reports</Link>
              <Link to="/ai-assistant" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>AI Assistant</Link>
              <Link to="/insights" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Insights</Link>
              <Link to="/settings" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Settings</Link>
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Settings</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Manage your account, preferences, and system configurations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              {isEditing ? <X size={16} /> : <Edit size={16} />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1.5rem',
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Save size={16} />
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Settings Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '2rem'
        }}>
          {/* Sidebar */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #f0f0f0',
            padding: '1rem',
            height: 'fit-content'
          }}>
            <div style={{ marginBottom: '1rem', padding: '0 0.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                Settings
              </p>
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: activeTab === tab.id ? '#f3e8ff' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: activeTab === tab.id ? '#7c3aed' : 'var(--text-secondary)',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={18} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <span style={{ marginLeft: 'auto', color: '#7c3aed' }}>
                      <ChevronRight size={16} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #f0f0f0',
            padding: '2rem'
          }}>
            {/* General Settings */}
            {activeTab === 'general' && (
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                  General Settings
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Update your company information, logo and contact details.
                </p>

                {/* Company Profile */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem' }}>
                    Company Profile
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: isEditing ? 'white' : '#f9fafb',
                          color: isEditing ? '#1a1a1a' : '#6b7280'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Business ID</label>
                      <input
                        type="text"
                        name="businessId"
                        value={formData.businessId}
                        disabled
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: '#f9fafb',
                          color: '#6b7280'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: isEditing ? 'white' : '#f9fafb',
                          color: isEditing ? '#1a1a1a' : '#6b7280'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: isEditing ? 'white' : '#f9fafb',
                          color: isEditing ? '#1a1a1a' : '#6b7280'
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        background: isEditing ? 'white' : '#f9fafb',
                        color: isEditing ? '#1a1a1a' : '#6b7280'
                      }}
                    />
                  </div>
                </div>

                {/* Account Overview */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem' }}>
                    Account Overview
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Plan</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>Professional</p>
                      <Link to="/pricing" style={{ fontSize: '0.8rem', color: '#7c3aed', textDecoration: 'none' }}>Manage Subscription →</Link>
                    </div>
                    <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Member Since</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>May 12, 2025</p>
                    </div>
                    <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Storage Usage</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a' }}>21.4 GB</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>of 50 GB used</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                  Security Settings
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Manage password, 2FA and security preferences.
                </p>

                {/* Change Password */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem' }}>
                    Change Password
                  </h3>
                  <form onSubmit={handlePasswordChange}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Current Password</label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              paddingRight: '2.5rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '1rem'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: 'absolute',
                              right: '0.75rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Enter new password"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm new password"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      style={{
                        marginTop: '1rem',
                        padding: '0.5rem 1.5rem',
                        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Two-Factor Authentication */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem' }}>
                    Two-Factor Authentication
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#fafafa',
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0'
                  }}>
                    <div>
                      <p style={{ fontWeight: 500, color: '#1a1a1a' }}>Two-Factor Auth</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {formData.twoFactorAuth ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                      <input
                        type="checkbox"
                        name="twoFactorAuth"
                        checked={formData.twoFactorAuth}
                        onChange={handleChange}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: formData.twoFactorAuth ? '#7c3aed' : '#ccc',
                        borderRadius: '24px',
                        transition: '0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: '0.3s',
                          transform: formData.twoFactorAuth ? 'translateX(20px)' : 'none'
                        }} />
                      </span>
                    </label>
                  </div>
                </div>

                {/* Security Status */}
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem' }}>
                    Security Status
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div style={{ padding: '1rem', background: '#dcfce7', borderRadius: '8px', border: '1px solid #22c55e' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={16} color="#22c55e" />
                        <span style={{ fontWeight: 600, color: '#065f46' }}>Strong Password</span>
                      </div>
                    </div>
                    <div style={{ padding: '1rem', background: '#dcfce7', borderRadius: '8px', border: '1px solid #22c55e' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={16} color="#22c55e" />
                        <span style={{ fontWeight: 600, color: '#065f46' }}>2FA Enabled</span>
                      </div>
                    </div>
                    <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} color="#d97706" />
                        <span style={{ fontWeight: 600, color: '#92400e' }}>Last Login: Today, 08:32 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Log */}
            {activeTab === 'general' && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem' }}>
                  Activity Log
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Recent changes made to your system settings.
                </p>
                <div style={{ background: '#fafafa', borderRadius: '8px', overflow: 'hidden' }}>
                  {activityLog.map((log, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        borderBottom: index < activityLog.length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '0.9rem' }}>{log.action}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          by {log.user}
                        </p>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{log.time}</span>
                    </div>
                  ))}
                </div>
                <button style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1.5rem',
                  background: 'transparent',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 500
                }}>
                  View All Activity
                </button>
              </div>
            )}

            {/* Danger Zone */}
            {activeTab === 'general' && (
              <div style={{ marginTop: '2rem', borderTop: '1px solid #f0f0f0', paddingTop: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ef4444', marginBottom: '1rem' }}>
                  Danger Zone
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  These actions are irreversible. Please proceed with caution.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1.5rem',
                    background: 'transparent',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}>
                    <Download size={16} />
                    Export All Data
                  </button>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1.5rem',
                    background: 'transparent',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}>
                    <Trash2 size={16} />
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Data Settings */}
            {activeTab === 'data' && (
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                  Data Settings
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Configure your data preferences and storage.
                </p>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Language</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="English">English</option>
                      <option value="Swahili">Swahili</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Timezone</label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="EAT (UTC+3)">EAT (UTC+3)</option>
                      <option value="CAT (UTC+2)">CAT (UTC+2)</option>
                      <option value="WAT (UTC+1)">WAT (UTC+1)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Currency</label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="KES - Kenyan Shilling">KES - Kenyan Shilling</option>
                      <option value="USD - US Dollar">USD - US Dollar</option>
                      <option value="EUR - Euro">EUR - Euro</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                  System Settings
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Customize the look and feel of the Senzia platform.
                </p>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Theme</label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.25rem', color: '#1a1a1a' }}>Primary Color</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {['#7c3aed', '#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#ec4899'].map((color) => (
                        <button
                          key={color}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: color,
                            border: '2px solid #fff',
                            boxShadow: '0 0 0 1px #e5e7eb',
                            cursor: 'pointer'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="compactMode"
                        checked={formData.compactMode}
                        onChange={handleChange}
                      />
                      Compact Mode
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Need Help Section */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle size={24} color="#7c3aed" />
            <div>
              <p style={{ fontWeight: 600, color: '#1a1a1a' }}>Need Help?</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Our support team is here to help you 24/7.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              background: '#25D366',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              <MessageCircle size={16} />
              Chat on WhatsApp
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              background: '#7c3aed',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;