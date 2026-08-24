import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  LayoutDashboard,
  Database,
  FileBarChart2,
  Bot,
  Lightbulb,
  TrendingUp,
  Users,
  Plug,
  Bell,
  CreditCard,
  ChevronDown,
  Search,
  HelpCircle,
  Gauge,
  LogOut,
  AlertTriangle,
  CheckCircle,
  TrendingUp as TrendingUpIcon,
} from 'lucide-react';
import './tokens.css';

const notifications = [
  { id: 1, icon: AlertTriangle, tone: 'warning', title: 'Low Stock Alert', description: '5 products are running low on inventory.', time: '2 hours ago', unread: true },
  { id: 2, icon: TrendingUpIcon, tone: 'success', title: 'Revenue up 18.6%', description: 'This week is trending higher than last week.', time: '6 hours ago', unread: true },
  { id: 3, icon: CheckCircle, tone: 'info', title: 'Data sync completed', description: 'All data sources synchronized successfully.', time: '8 hours ago', unread: true },
  { id: 4, icon: AlertTriangle, tone: 'danger', title: 'Unusual expense detected', description: 'Electricity bill is 25% higher than usual.', time: 'Yesterday', unread: false },
];

const NAV_MAIN = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Data Sources', icon: Database, to: '/data-sources' },
  { label: 'Reports', icon: FileBarChart2, to: '/reports' },
  { label: 'AI Assistant', icon: Bot, to: '/ai-assistant' },
  { label: 'Insights', icon: Lightbulb, to: '/insights' },
  { label: 'Forecasting', icon: TrendingUp, to: '/forecasting' },
];

const NAV_MANAGEMENT = [
  { label: 'Users', icon: Users, to: '/users' },
  { label: 'Integrations', icon: Plug, to: '/integrations' },
  { label: 'Alerts', icon: Bell, to: '/alerts' },
  { label: 'Settings', icon: SettingsIcon, to: '/settings' },
  { label: 'Billing', icon: CreditCard, to: '/billing' },
];

/**
 * Shared page shell: sidebar + topbar + page header (+ optional tabs).
 *
 * Props:
 * - active: string matching a nav item label (e.g. "Settings", "Billing") — highlights it
 * - pageIcon: lucide icon component shown next to the title
 * - title, subtitle: page header text
 * - headerActions: optional node rendered top-right of the header (buttons)
 * - tabs: optional [{ id, label }] — renders a tab strip under the header
 * - activeTab / onTabChange: control the tab strip
 * - children: page body content, rendered below the header/tabs
 */
const AppShell = ({
  active,
  pageIcon: PageIcon,
  title,
  subtitle,
  headerActions,
  tabs,
  activeTab,
  onTabChange,
  userName = 'John M.',
  businessName = 'Senzia Limited',
  onLogout,
  children,
}) => {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="senzia-app">
      {/* ============ SIDEBAR ============ */}
      <aside className="sidebar">
        <Link to="/" className="brand">
          <div className="brand-mark"><Gauge size={17} /></div>
          <span className="brand-name">SENZIA</span>
        </Link>

        <div className="plan-widget">
          <div className="plan-widget-top">
            <span>Professional Plan</span>
            <span className="pill pill-success">Active</span>
          </div>
          <p className="plan-renews">Renews on June 12, 2025</p>
          <button className="btn btn-ghost btn-sm btn-block">Manage Plan</button>
        </div>

        <nav className="nav-section">
          <p className="nav-label">Main</p>
          {NAV_MAIN.map(({ label, icon: Icon, to }) => (
            <Link key={label} to={to} className={`nav-link${active === label ? ' active' : ''}`}>
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        <nav className="nav-section">
          <p className="nav-label">Management</p>
          {NAV_MANAGEMENT.map(({ label, icon: Icon, to }) => (
            <Link key={label} to={to} className={`nav-link${active === label ? ' active' : ''}`}>
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="help-card">
            <div className="help-card-top">
              <HelpCircle size={20} color="var(--accent)" />
              <div>
                <p>Need Help?</p>
                <p>Our support team is here to help you 24/7.</p>
              </div>
            </div>
            <button className="btn btn-outline-accent btn-sm btn-block">Contact Support</button>
          </div>
        </div>
      </aside>

      {/* ============ MAIN COLUMN ============ */}
      <div className="main-col">
        <header className="topbar">
          <div className="search-bar">
            <Search size={16} />
            <input placeholder="Search settings, preferences, security..." />
            <span className="kbd">⌘K</span>
          </div>
          <div className="topbar-right">
            <div className="notif-dropdown" ref={notifRef}>
              <button
                className="icon-btn"
                aria-label="Notifications"
                aria-haspopup="true"
                aria-expanded={isNotifOpen}
                onClick={() => setIsNotifOpen((open) => !open)}
              >
                <Bell size={19} />
                {unreadCount > 0 && <span className="badge-dot">{unreadCount}</span>}
              </button>

              {isNotifOpen && (
                <div className="notif-dropdown-menu" role="menu">
                  <div className="notif-dropdown-header">
                    <span>Notifications</span>
                    {unreadCount > 0 && <span className="notif-unread-label">{unreadCount} new</span>}
                  </div>
                  <div className="notif-list">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div className={`notif-row${n.unread ? ' unread' : ''}`} key={n.id}>
                          <div className={`notif-row-icon tone-${n.tone}`}><Icon size={15} /></div>
                          <div className="notif-row-body">
                            <p>{n.title}</p>
                            <p>{n.description}</p>
                            <span>{n.time}</span>
                          </div>
                          {n.unread && <span className="notif-unread-dot" />}
                        </div>
                      );
                    })}
                  </div>
                  <Link to="/alerts" className="notif-view-all" onClick={() => setIsNotifOpen(false)}>
                    View All Alerts
                  </Link>
                </div>
              )}
            </div>
            <button className="icon-btn" aria-label="Help">
              <HelpCircle size={19} />
            </button>
            <div className="user-chip">
              <div className="avatar">{initials}</div>
              <div className="user-chip-text">
                <p>{userName}</p>
                <p>{businessName}</p>
              </div>
              <ChevronDown size={15} color="var(--text-tertiary)" />
            </div>
            {onLogout && (
              <button className="btn btn-ghost btn-sm" onClick={onLogout}>
                <LogOut size={14} /> Logout
              </button>
            )}
          </div>
        </header>

        <div className="page-body">
          <div className="page-header-row">
            <div className="page-header">
              {PageIcon && <div className="page-header-icon"><PageIcon size={22} /></div>}
              <div>
                <h1 className="page-title">{title}</h1>
                {subtitle && <p className="page-subtitle">{subtitle}</p>}
              </div>
            </div>
            {headerActions && <div className="page-header-actions">{headerActions}</div>}
          </div>

          {tabs && (
            <div className="tabbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-item${activeTab === tab.id ? ' active' : ''}`}
                  onClick={() => onTabChange && onTabChange(tab.id)}
                >
                  {tab.label}
                  {tab.caret && <ChevronDown size={13} style={{ marginLeft: '0.3rem', verticalAlign: '-2px' }} />}
                </button>
              ))}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default AppShell;