import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Modal from '../Modal';
import { useToast } from '../Toast';
import { downloadFile, toCsv } from '../download';
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

const PAGE_SIZE = 5;
const ROLES = roleDistribution.map((r) => r.role);
const AVATAR_COLORS = ['#8b5cf6', '#4f8bf0', '#34c98e', '#f0a828', '#ec4899', '#a855f7'];
// Headline numbers are for the whole organisation (48 users), the table only lists a sample of 8.
const ORG_BASE = { total: 48, active: 42, pending: 3 };

const initialsOf = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((n) => n[0]).join('').toUpperCase();
const countBy = (list, key, value) => list.filter((u) => u[key] === value).length;

const statusPill = { active: 'pill-success', inactive: 'pill-danger', pending: 'pill-warning' };
const statusIcon = { active: CheckCircle, inactive: XCircle, pending: Clock };
const statusLabel = { active: 'Active', inactive: 'Inactive', pending: 'Pending' };

const RoleDonut = ({ roles }) => {
  const r = 46, stroke = 15, c = 2 * Math.PI * r;
  let acc = 0;
  const total = roles.reduce((s, x) => s + x.count, 0);
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <g transform="rotate(-90 65 65)">
        <circle cx="65" cy="65" r={r} fill="none" stroke="var(--border-soft)" strokeWidth={stroke} />
        {roles.map((r2) => {
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
  const navigate = useNavigate();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [team, setTeam] = useState(users);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // { kind: 'invite' | 'view' | 'edit', user? }
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'User' });
  const [editForm, setEditForm] = useState({ role: 'User', status: 'active' });
  const [activity, setActivity] = useState(recentActivity);

  useEffect(() => { setPage(1); }, [searchTerm, activeTab]);

  const closeModal = () => setModal(null);
  const logActivity = (action, userName) =>
    setActivity((list) => [{ action, user: userName, time: 'Just now' }, ...list].slice(0, 6));

  // Rail + stat numbers follow the table: baseline org totals adjusted by what changed in the list.
  const statValues = {
    'Total Users': ORG_BASE.total + team.length - users.length,
    'Active Users': ORG_BASE.active + countBy(team, 'status', 'active') - countBy(users, 'status', 'active'),
    'Pending Invites': ORG_BASE.pending + countBy(team, 'status', 'pending') - countBy(users, 'status', 'pending'),
  };
  const liveRoles = roleDistribution.map((r) => ({
    ...r,
    count: Math.max(0, r.count + countBy(team, 'role', r.role) - countBy(users, 'role', r.role)),
  }));
  const liveTotal = liveRoles.reduce((sum, r) => sum + r.count, 0) || 1;
  const rolesWithPct = liveRoles.map((r) => ({ ...r, pct: Math.round((r.count / liveTotal) * 100) }));

  const handleInvite = (e) => {
    e.preventDefault();
    const name = inviteForm.name.trim();
    const email = inviteForm.email.trim().toLowerCase();
    if (!name) return toast('Enter the person\'s name.', 'error');
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast('Enter a valid email address.', 'error');
    if (team.some((u) => u.email.toLowerCase() === email)) return toast('That email is already on the team.', 'error');

    setTeam((list) => [
      ...list,
      {
        id: Date.now(), name, email, role: inviteForm.role, status: 'pending', lastActive: 'Invite sent',
        avatar: initialsOf(name), color: AVATAR_COLORS[list.length % AVATAR_COLORS.length],
      },
    ]);
    logActivity('Invited new user', name);
    setInviteForm({ name: '', email: '', role: 'User' });
    closeModal();
    toast(`Invitation sent to ${email}.`);
  };

  const openEdit = (user) => {
    setEditForm({ role: user.role, status: user.status });
    setModal({ kind: 'edit', user });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const { user } = modal;
    const losesLastSuperAdmin =
      user.role === 'Super Admin' && editForm.role !== 'Super Admin' && team.filter((u) => u.role === 'Super Admin').length === 1;
    if (losesLastSuperAdmin) return toast('At least one Super Admin is required.', 'error');

    setTeam((list) => list.map((u) => (u.id === user.id ? { ...u, ...editForm } : u)));
    logActivity(editForm.role !== user.role ? 'Role permissions updated' : 'Updated user permissions', user.name);
    closeModal();
    toast(`${user.name} updated.`);
  };

  const handleDelete = (user) => {
    if (user.role === 'Super Admin' && team.filter((u) => u.role === 'Super Admin').length === 1) {
      toast('The only Super Admin cannot be removed.', 'error');
      return;
    }
    if (!window.confirm(`Remove ${user.name} from the team?`)) return;
    setTeam((list) => list.filter((u) => u.id !== user.id));
    logActivity('Removed user', user.name);
    toast(`${user.name} removed.`);
  };

  const handleExport = () => {
    const csv = toCsv(filteredUsers, [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'status', label: 'Status' },
      { key: 'lastActive', label: 'Last Active' },
    ]);
    downloadFile('senzia-users.csv', csv, 'text/csv');
    toast(`Exported ${filteredUsers.length} users.`);
  };

  const filteredUsers = team.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageUsers = filteredUsers.slice(pageStart, pageStart + PAGE_SIZE);

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
          <button className="btn btn-ghost" onClick={handleExport}><Download size={16} /> Export</button>
          <button className="btn btn-violet" onClick={() => setModal({ kind: 'invite' })}><UserPlus size={16} /> Invite User</button>
        </>
      }
    >
      <div className="users-layout">
        <div className="content-stack">

          {/* ---- Stat cards ---- */}
          <div className="user-stat-grid">
            {userStats.map(({ label, value: seededValue, sub, icon: Icon, color, bg }) => {
              const value = statValues[label] ?? seededValue;
              return (
              <div className="user-stat-card" key={label}>
                <div className="user-stat-top">
                  <div className="user-stat-icon" style={{ background: bg, color }}><Icon size={16} /></div>
                  <span>{label}</span>
                </div>
                <p className="user-stat-value">{value}</p>
                <p className="user-stat-sub" style={{ color }}>{sub}</p>
              </div>
              );
            })}
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
                {pageUsers.map((user) => {
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
                          <button className="icon-btn" aria-label={`View ${user.name}`} onClick={() => setModal({ kind: 'view', user })}><Eye size={15} /></button>
                          <button className="icon-btn" aria-label={`Edit ${user.name}`} onClick={() => openEdit(user)}><Edit size={15} /></button>
                          <button className="icon-btn" aria-label={`Delete ${user.name}`} style={{ color: 'var(--danger)' }} onClick={() => handleDelete(user)}><Trash2 size={15} /></button>
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
              <span>
                {filteredUsers.length === 0
                  ? 'Showing 0 users'
                  : `Showing ${pageStart + 1} to ${pageStart + pageUsers.length} of ${filteredUsers.length} users`}
              </span>
              <div className="pager">
                <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <button key={n} className={n === currentPage ? 'active' : ''} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Role Distribution</h4>
            <div className="role-donut-wrap">
              <RoleDonut roles={rolesWithPct} />
              <div style={{ display: 'grid', gap: '0.55rem', flex: 1 }}>
                {rolesWithPct.map((r) => (
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
            {activity.map((a) => (
              <div className="user-activity-row" key={`${a.action}-${a.user}-${a.time}`}>
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
          <button className="btn btn-whatsapp" onClick={() => window.open('https://wa.me/254700123456', '_blank', 'noopener,noreferrer')}>Chat on WhatsApp</button>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>Contact Support</button>
        </div>
      </div>

      {modal?.kind === 'invite' && (
        <Modal
          title="Invite User"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button type="submit" form="invite-user-form" className="btn btn-violet">Send Invite</button>
            </>
          }
        >
          <form id="invite-user-form" onSubmit={handleInvite} style={{ display: 'grid', gap: '0.9rem' }}>
            <div className="modal-field">
              <label htmlFor="invite-name">Full name</label>
              <input id="invite-name" autoFocus value={inviteForm.name} onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })} />
            </div>
            <div className="modal-field">
              <label htmlFor="invite-email">Email</label>
              <input id="invite-email" type="email" value={inviteForm.email} onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} />
            </div>
            <div className="modal-field">
              <label htmlFor="invite-role">Role</label>
              <select id="invite-role" value={inviteForm.role} onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}>
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </form>
        </Modal>
      )}

      {modal?.kind === 'view' && (
        <Modal
          title={modal.user.name}
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => openEdit(modal.user)}>Edit User</button>
            </>
          }
        >
          <div className="modal-detail-row"><span>Email</span><span>{modal.user.email}</span></div>
          <div className="modal-detail-row"><span>Role</span><span>{modal.user.role}</span></div>
          <div className="modal-detail-row"><span>Status</span><span>{statusLabel[modal.user.status]}</span></div>
          <div className="modal-detail-row"><span>Last active</span><span>{modal.user.lastActive}</span></div>
          <div className="modal-detail-row"><span>Permissions</span><span>{rolePermissions.find((p) => p.role === modal.user.role)?.permissions}</span></div>
        </Modal>
      )}

      {modal?.kind === 'edit' && (
        <Modal
          title={`Edit ${modal.user.name}`}
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button type="submit" form="edit-user-form" className="btn btn-primary">Save Changes</button>
            </>
          }
        >
          <form id="edit-user-form" onSubmit={handleEdit} style={{ display: 'grid', gap: '0.9rem' }}>
            <div className="modal-field">
              <label htmlFor="edit-role">Role</label>
              <select id="edit-role" value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label htmlFor="edit-status">Status</label>
              <select id="edit-status" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </form>
        </Modal>
      )}
    </AppShell>
  );
};

export default Users;