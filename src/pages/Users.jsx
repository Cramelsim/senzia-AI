import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users as UsersIcon,
  User,
  UserPlus,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  UserCheck,
  UserX,
  HelpCircle,
  MessageCircle,
  Plus,
  Download,
  RefreshCw,
  ChevronRight,
  Eye,
  Settings,
  Activity
} from 'lucide-react';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // User stats
  const userStats = [
    {
      label: 'Total Users',
      value: '48',
      change: '+12% vs last month',
      icon: UsersIcon,
      color: '#7c3aed',
      bgColor: '#f3e8ff'
    },
    {
      label: 'Active Users',
      value: '42',
      change: '87.5% of total users',
      icon: UserCheck,
      color: '#22c55e',
      bgColor: '#dcfce7'
    },
    {
      label: 'Roles',
      value: '6',
      change: 'System roles created',
      icon: Shield,
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      label: 'Pending Invites',
      value: '3',
      change: 'Awaiting acceptance',
      icon: Clock,
      color: '#f59e0b',
      bgColor: '#fef3c7'
    }
  ];

  // Role distribution
  const roleDistribution = [
    { role: 'Super Admin', count: 1, percentage: 2, color: '#7c3aed' },
    { role: 'Admin', count: 6, percentage: 12, color: '#8b5cf6' },
    { role: 'Manager', count: 8, percentage: 17, color: '#a78bfa' },
    { role: 'Analyst', count: 12, percentage: 25, color: '#c4b5fd' },
    { role: 'User', count: 21, percentage: 44, color: '#ddd6fe' }
  ];

  // Users list
  const users = [
    {
      id: 1,
      name: 'Alice Nijuguna',
      email: 'alice@senzia.com',
      role: 'Admin',
      status: 'active',
      lastActive: 'Today, 09:15 AM',
      avatar: 'AN',
      color: '#7c3aed'
    },
    {
      id: 2,
      name: 'Brian Otieno',
      email: 'brian@senzia.com',
      role: 'Manager',
      status: 'active',
      lastActive: 'Today, 08:45 AM',
      avatar: 'BO',
      color: '#22c55e'
    },
    {
      id: 3,
      name: 'Cynthia Wanjiku',
      email: 'cynthia@senzia.com',
      role: 'Analyst',
      status: 'active',
      lastActive: 'Yesterday, 04:30 PM',
      avatar: 'CW',
      color: '#3b82f6'
    },
    {
      id: 4,
      name: 'David Kimani',
      email: 'david@senzia.com',
      role: 'User',
      status: 'inactive',
      lastActive: 'May 11, 2025, 02:30 PM',
      avatar: 'DK',
      color: '#ef4444'
    },
    {
      id: 5,
      name: 'Eunice Muthoni',
      email: 'eunice@senzia.com',
      role: 'Manager',
      status: 'active',
      lastActive: 'Today, 07:20 AM',
      avatar: 'EM',
      color: '#f59e0b'
    },
    {
      id: 6,
      name: 'Francis Njoroge',
      email: 'francis@senzia.com',
      role: 'Analyst',
      status: 'pending',
      lastActive: 'Invite sent',
      avatar: 'FN',
      color: '#8b5cf6'
    },
    {
      id: 7,
      name: 'Grace Wanjiru',
      email: 'grace@senzia.com',
      role: 'User',
      status: 'active',
      lastActive: 'Yesterday, 11:20 AM',
      avatar: 'GW',
      color: '#ec4899'
    },
    {
      id: 8,
      name: 'Henry Mwangi',
      email: 'henry@senzia.com',
      role: 'Super Admin',
      status: 'active',
      lastActive: 'Today, 10:30 AM',
      avatar: 'HM',
      color: '#7c3aed'
    }
  ];

  // Recent activity
  const recentActivity = [
    { action: 'Updated user permissions', user: 'Alice Nijuguna', time: 'Today, 09:15 AM' },
    { action: 'Invited new user', user: 'Brian Otieno', time: 'Yesterday, 04:45 PM' },
    { action: 'Deactivated user', user: 'Cynthia Wanjiku', time: 'May 11, 2025, 02:30 PM' },
    { action: 'Role permissions updated', user: 'David Kimani', time: 'May 10, 2025, 11:20 AM' }
  ];

  // Role permissions summary
  const rolePermissions = [
    { role: 'Super Admin', permissions: 'Full system access' },
    { role: 'Admin', permissions: 'Manage users, settings & data' },
    { role: 'Manager', permissions: 'View reports, manage team' },
    { role: 'Analyst', permissions: 'View & analyze data' },
    { role: 'User', permissions: 'Limited access' }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return { color: '#22c55e', bg: '#dcfce7', label: 'Active', icon: CheckCircle };
      case 'inactive':
        return { color: '#ef4444', bg: '#fee2e2', label: 'Inactive', icon: XCircle };
      case 'pending':
        return { color: '#f59e0b', bg: '#fef3c7', label: 'Pending', icon: Clock };
      default:
        return { color: '#6b7280', bg: '#f3f4f6', label: 'Unknown', icon: Clock };
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Link to="/users" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Users</Link>
              <Link to="/settings" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Settings</Link>
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
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>Users</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Manage team members, roles and permissions.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              <Download size={16} />
              Export
            </button>
            <button style={{
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
            }}>
              <UserPlus size={16} />
              Invite User
            </button>
          </div>
        </div>

        {/* User Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} style={{
                background: 'white',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} color={stat.color} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{stat.label}</span>
                </div>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>{stat.value}</p>
                <p style={{ fontSize: '0.85rem', color: stat.color }}>{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem'
        }}>
          {/* Left Column - Users List */}
          <div>
            {/* Search and Filter */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
                <Search size={18} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['All', 'Active', 'Inactive', 'Pending'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter.toLowerCase())}
                    style={{
                      padding: '0.5rem 1rem',
                      border: activeFilter === filter.toLowerCase() ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      background: activeFilter === filter.toLowerCase() ? '#f3e8ff' : 'white',
                      color: activeFilter === filter.toLowerCase() ? '#7c3aed' : 'var(--text-secondary)',
                      fontWeight: activeFilter === filter.toLowerCase() ? 600 : 400,
                      cursor: 'pointer'
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Table */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              overflow: 'hidden'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>User</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Role</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Last Active</th>
                      <th style={{ textAlign: 'center', padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => {
                      const status = getStatusBadge(user.status);
                      const StatusIcon = status.icon;
                      return (
                        <tr key={user.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: `${user.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                color: user.color
                              }}>
                                {user.avatar}
                              </div>
                              <div>
                                <p style={{ fontWeight: 500, color: '#1a1a1a' }}>{user.name}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span style={{
                              background: '#f3e8ff',
                              color: '#7c3aed',
                              padding: '0.15rem 0.75rem',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}>
                              {user.role}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span style={{
                              background: status.bg,
                              color: status.color,
                              padding: '0.15rem 0.75rem',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}>
                              <StatusIcon size={12} />
                              {status.label}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            {user.lastActive}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                              <button style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280'
                              }}>
                                <Eye size={16} />
                              </button>
                              <button style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280'
                              }}>
                                <Edit size={16} />
                              </button>
                              <button style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#ef4444'
                              }}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{
                padding: '0.75rem 1rem',
                borderTop: '1px solid #f0f0f0',
                background: '#fafafa',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Showing 1 to {filteredUsers.length} of {users.length} users
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Previous</button>
                  <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #7c3aed', borderRadius: '4px', background: '#7c3aed', color: 'white', cursor: 'pointer' }}>1</button>
                  <button style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Next</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Role Distribution */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Role Distribution
              </h3>
              {roleDistribution.map((role, index) => (
                <div key={index} style={{ marginBottom: index < roleDistribution.length - 1 ? '0.75rem' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#1a1a1a' }}>{role.role}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a1a' }}>
                      {role.count} ({role.percentage}%)
                    </span>
                  </div>
                  <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${role.percentage}%`,
                      height: '100%',
                      background: role.color,
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Role Permissions Summary */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Role Permissions Summary
              </h3>
              {rolePermissions.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: index < rolePermissions.length - 1 ? '1px solid #f5f5f5' : 'none'
                }}>
                  <span style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '0.85rem' }}>{item.role}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.permissions}</span>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Recent Activity
              </h3>
              {recentActivity.map((activity, index) => (
                <div key={index} style={{
                  padding: '0.75rem 0',
                  borderBottom: index < recentActivity.length - 1 ? '1px solid #f5f5f5' : 'none'
                }}>
                  <p style={{ fontWeight: 500, color: '#1a1a1a', fontSize: '0.9rem' }}>{activity.action}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>by {activity.user}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
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

export default Users;