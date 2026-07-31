import React, { useState } from 'react';
import {
  Users as UsersIcon,
  UserPlus,
  Search,
  Download,
  Clock,
  Shield,
  UserCheck,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import AppShell from './AppShell';
import './Users.css';

const TABS = [
  { id: 'all', label: 'All Users' },
  { id: 'active', label: 'Active' },
  { id: 'inactive', label: 'Inactive' },
  { id: 'pending', label: 'Pending' },
];

const userStats = [
  { label: 'Total Users', value: '48', sub: '+12% vs last month', icon: UsersIcon, color: 'var(--accent)', bg: 'var(--accent-soft)' },
  { label: 'Active Users', value: '42', sub: '87.5% of total users', icon: UserCheck, color: 'var(--success)', bg: 'var(--success-soft)' },
  { label: 'Roles', value: '6', sub: 'System roles created', icon: Shield, color: 'var(--info)', bg: 'rgba(79,139,240,0.12)' },
  { label: 'Pending Invites', value: '3', sub: 'Awaiting acceptance', icon: Clock, color: 'var(--warning)', bg: 'var(--warning-soft)' },
];

const roleDistribution = [
  { role: 'Super Admin', count: 1, pct: 2, color: '#8b5cf6', bg: 'rgba(139,92,246,0.14)' },
  { role: 'Admin', count: 6, pct: 12, color: '#f0a828', bg: 'rgba(240,168,40,0.14)' },
  { role: 'Manager', count: 8, pct: 17, color: '#4f8bf0', bg: 'rgba(79,139,240,0.14)' },
  { role: 'Analyst', count: 12, pct: 25, color: '#34c98e', bg: 'rgba(52,201,142,0.14)' },
  { role: 'User', count: 21, pct: 44, color: '#8b909c', bg: 'rgba(139,144,156,0.14)' },
];

const roleMeta = Object.fromEntries(roleDistribution.map((r) => [r.role, r]));

const users = [
  { id: 1, name: 'Alice Nijuguna', email: 'alice@senzia.com', role: 'Admin', status: 'active', lastActive: 'Today, 09:15 AM', avatar: 'AN', color: '#8b5cf6' },
  { id: 2, name: 'Brian Otieno', email: 'brian@senzia.com', role: 'Manager', status: 'active', lastActive: 'Today, 08:45 AM', avatar: 'BO', color: '#4f8bf0' },
  { id: 3, name: 'Cynthia Wanjiku', email: 'cynthia@senzia.com', role: 'Analyst', status: 'active', lastActive: 'Yesterday, 04:30 PM', avatar: 'CW', color: '#34c98e' },
  { id: 4, name: 'David Kimani', email: 'david@senzia.com', role: 'User', status: 'inactive', lastActive: 'May 11, 2025, 02:30 PM', avatar: 'DK', color: '#ef5a5a' },
  { id: 5, name: 'Eunice Muthoni', email: 'eunice@senzia.com', role: 'Manager', status: 'active', lastActive: 'Today, 07:20 AM', avatar: 'EM', color: '#f0a828' },
  { id: 6, name: 'Francis Njoroge', email: 'francis@senzia.com', role: 'Analyst', status: 'pending', lastActive: 'Invite sent', avatar: 'FN', color: '#8b5cf6' },
  { id: 7, name: 'Grace Wanjiru', email: 'grace@senzia.com', role: 'User', status: 'active', lastActive: 'Yesterday, 11:20 AM', avatar: 'GW', color: '#ec4899' },
  { id: 8, name: 'Henry Mwangi', email: 'henry@senzia.com', role: 'Super Admin', status: 'active', lastActive: 'Today, 10:30 AM', avatar: 'HM', color: '#a855f7' },
];

const recentActivity = [
  { action: 'Updated user permissions', user: 'Alice Nijuguna', time: 'Today, 09:15 AM' },
  { action: 'Invited new user', user: 'Brian Otieno', time: 'Yesterday, 04:45 PM' },
  { action: 'Deactivated user', user: 'Cynthia Wanjiku', time: 'May 11, 2025, 02:30 PM' },
  { action: 'Role permissions updated', user: 'David Kimani', time: 'May 10, 2025, 11:20 AM' },
];

const rolePermissions = [
  { role: 'Super Admin', permissions: 'Full system access' },
  { role: 'Admin', permissions: 'Manage users, settings & data' },
  { role: 'Manager', permissions: 'View reports, manage team' },
  { role: 'Analyst', permissions: 'View & analyze data' },
  { role: 'User', permissions: 'Limited access' },
];

const statusPill = { active: 'pill-success', inactive: 'pill-danger', pending: 'pill-warning' };
const statusIcon = { active: CheckCircle, inactive: XCircle, pending: Clock };
const statusLabel = { active: 'Active', inactive: 'Inactive', pending: 'Pending' };

const RoleDonut = () => {
  const r = 46, stroke = 15, c = 2 * Math.PI * r;
  let acc = 0;
  const total = roleDistribution.reduce((s, x) => s + x.count, 0);
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <g transform="rotate(-90 65 65)">
        <circle cx="65" cy="65" r={r} fill="none" stroke="var(--border-soft)" strokeWidth={stroke} />
        {roleDistribution.map((r2) => {
          const dash = (r2.pct / 100) * c;
          const offset = -(acc / 100) * c;
          acc += r2.pct;
          return <circle key={r2.role} cx="65" cy="65" r={r} fill="none" stroke={r2.color} strokeWidth={stroke} strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={offset} />;
        })}
      </g>
      <text x="65" y="60" textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--text-primary)">{total}</text>
      <text x="65" y="78" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Total</text>
    </svg>
  );
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <AppShell
      active="Users"
      pageIcon={UsersIcon}
      title="Users Management"
      subtitle="Manage users, roles, permissions and access across your organization."
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerActions={
        <>
          <button className="btn btn-ghost"><Download size={16} /> Export</button>
          <button className="btn btn-violet"><UserPlus size={16} /> Invite User</button>
        </>
      }
    >
      <div className="users-layout">
        <div className="content-stack">

          {/* ---- Stat cards ---- */}
          <div className="user-stat-grid">
            {userStats.map(({ label, value, sub, icon: Icon, color, bg }) => (
              <div className="user-stat-card" key={label}>
                <div className="user-stat-top">
                  <div className="user-stat-icon" style={{ background: bg, color }}><Icon size={16} /></div>
                  <span>{label}</span>
                </div>
                <p className="user-stat-value">{value}</p>
                <p className="user-stat-sub" style={{ color }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* ---- Search + table ---- */}
          <div className="panel">
            <div className="panel-head">
              <h3>Team Members</h3>
              <div className="search-bar" style={{ maxWidth: 260, padding: '0.4rem 0.7rem' }}>
                <Search size={14} />
                <input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th className="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const StatusIcon = statusIcon[user.status];
                  const meta = roleMeta[user.role];
                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar-tile" style={{ background: `${user.color}26`, color: user.color }}>
                            {user.avatar}
                          </div>
                          <div>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="role-pill" style={{ background: meta.bg, color: meta.color }}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`pill ${statusPill[user.status]}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <StatusIcon size={11} /> {statusLabel[user.status]}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{user.lastActive}</td>
                      <td className="center">
                        <div className="row-actions">
                          <button className="icon-btn" aria-label="View"><Eye size={15} /></button>
                          <button className="icon-btn" aria-label="Edit"><Edit size={15} /></button>
                          <button className="icon-btn" aria-label="Delete" style={{ color: 'var(--danger)' }}><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '1.5rem' }}>No users match your search.</td></tr>
                )}
              </tbody>
            </table>
            <div className="table-footer">
              <span>Showing 1 to {filteredUsers.length} of {users.length} users</span>
              <div className="pager">
                <button disabled>Previous</button>
                <button className="active">1</button>
                <button disabled>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Role Distribution</h4>
            <div className="role-donut-wrap">
              <RoleDonut />
              <div style={{ display: 'grid', gap: '0.55rem', flex: 1 }}>
                {roleDistribution.map((r) => (
                  <div key={r.role} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: r.color, display: 'inline-block' }} /> {r.role}
                    </div>
                    <span>{r.count} ({r.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rail-card">
            <h4>Role Permissions Summary</h4>
            {rolePermissions.map((p) => (
              <div className="perm-row" key={p.role}>
                <span className="perm-row-role">{p.role}</span>
                <span className="perm-row-desc">{p.permissions}</span>
              </div>
            ))}
          </div>

          <div className="rail-card">
            <h4>Recent Activity</h4>
            {recentActivity.map((a) => (
              <div className="user-activity-row" key={a.action + a.time}>
                <p>{a.action}</p>
                <div className="user-activity-meta">
                  <span>by {a.user}</span>
                  <span>{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Need help ---- */}
      <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UsersIcon size={18} color="var(--accent)" />
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
    </AppShell>
  );
};

export default Users;