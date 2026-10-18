import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logoMark from '../assets/logo-mark.png';
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
  LogOut,
  AlertTriangle,
  CheckCircle,
  TrendingUp as TrendingUpIcon,
} from 'lucide-react';
import './tokens.css';

const INITIAL_NOTIFICATIONS = [
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

const ALL_NAV = [...NAV_MAIN, ...NAV_MANAGEMENT];

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
  userName: userNameProp,
  businessName: businessNameProp,
  onLogout: onLogoutProp,
  children,
}) => {
  const navigate = useNavigate();
  const { user, onLogout: contextLogout } = useAuth();
  const userName = userNameProp || user?.name || 'John M.';
  const businessName = businessNameProp || user?.businessName || 'Senzia Limited';
  const onLogout = onLogoutProp || contextLogout;
  const initials = userName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchResults = query.trim()
    ? ALL_NAV.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  const markRead = (id) =>
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  const markAllRead = () =>
    setNotifications((list) => list.map((n) => ({ ...n, unread: false })));

  const goToResult = (to) => {
    setQuery('');
    setIsSearchOpen(false);
    navigate(to);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter' && searchResults.length > 0) {
      goToResult(searchResults[0].to);
    } else if (event.key === 'Escape') {
      setQuery('');
      setIsSearchOpen(false);
      event.target.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsNotifOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="senzia-app">
      {/* ============ SIDEBAR ============ */}
      <aside className="sidebar">
        <Link to="/" className="brand">
          <img className="brand-mark" src={logoMark} alt="" width="32" height="32" />
          <span className="brand-name">SENZIA</span>
        </Link>

        <div className="plan-widget">
          <div className="plan-widget-top">
            <span>Professional Plan</span>
            <span className="pill pill-success">Active</span>
          </div>
          <p className="plan-renews">Renews on June 12, 2025</p>
          <button className="btn btn-ghost btn-sm btn-block" onClick={() => navigate('/billing')}>Manage Plan</button>
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
            <button className="btn btn-outline-accent btn-sm btn-block" onClick={() => navigate('/contact')}>Contact Support</button>
          </div>
        </div>
      </aside>

      {/* ============ MAIN COLUMN ============ */}
      <div className="main-col">
        <header className="topbar">
          <div className="search-wrap" ref={searchRef}>
            <div className="search-bar">
              <Search size={16} />
              <input
                ref={searchInputRef}
                value={query}
                placeholder="Search pages..."
                aria-label="Search pages"
                onChange={(e) => { setQuery(e.target.value); setIsSearchOpen(true); }}
                onFocus={() => setIsSearchOpen(true)}
                onKeyDown={handleSearchKeyDown}
              />
              <span className="kbd">⌘K</span>
            </div>
            {isSearchOpen && query.trim() && (
              <div className="search-results" role="listbox">
                {searchResults.length === 0 ? (
                  <p className="search-empty">No pages match “{query.trim()}”</p>
                ) : (
                  searchResults.map(({ label, icon: Icon, to }) => (
                    <button key={to} type="button" className="search-result-row" onClick={() => goToResult(to)}>
                      <Icon size={15} />
                      {label}
                    </button>
                  ))
                )}
              </div>
            )}
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
                    {unreadCount > 0 && (
                      <button type="button" className="notif-mark-all" onClick={markAllRead}>
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="notif-list">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div
                          className={`notif-row${n.unread ? ' unread' : ''}`}
                          key={n.id}
                          role="menuitem"
                          tabIndex={0}
                          onClick={() => markRead(n.id)}
                          onKeyDown={(e) => { if (e.key === 'Enter') markRead(n.id); }}
                        >
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
            <button className="icon-btn" aria-label="Help" onClick={() => navigate('/resources')}>
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