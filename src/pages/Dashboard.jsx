import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  Filter,
  Download,
  Check,
  X,
} from 'lucide-react';
import AppShell from './AppShell';
import { useToast } from '../Toast';
import { downloadFile, toCsv } from '../download';
import './Dashboard.css';

const metrics = [
  { title: 'Total Revenue', value: 'KES 1,254,650', change: '+18.6%', trend: 'up', vs: 'vs last week' },
  { title: 'Gross Profit', value: 'KES 642,250', change: '+22.1%', trend: 'up', vs: 'vs last week' },
  { title: 'Operating Expenses', value: 'KES 812,400', change: '-8.4%', trend: 'down', vs: 'vs last week' },
  { title: 'Cash Balance', value: 'KES 1,820,450', change: '+15.3%', trend: 'up', vs: 'vs last week' },
  { title: 'Net Profit', value: 'KES 642,250', change: '+19.8%', trend: 'up', vs: 'vs last week' },
  { title: 'Profit Margin', value: '19.8%', change: '+2.6%', trend: 'up', vs: 'vs last week' },
];

const revenueSources = [
  { name: 'Food & Beverages', percentage: 45, color: 'var(--accent)' },
  { name: 'Liquor', percentage: 30, color: 'var(--info)' },
  { name: 'Accommodation', percentage: 15, color: '#a855f7' },
  { name: 'Other Services', percentage: 10, color: 'var(--success)' },
];

const alerts = [
  { type: 'warning', title: 'Low Stock Alert', description: 'Chicken (5kg) is running low', time: '2 hours ago', icon: '📦' },
  { type: 'danger', title: 'Unusual Expense', description: 'Electricity bill is 25% higher than usual', time: '4 hours ago', icon: '⚡' },
  { type: 'success', title: 'Sales Opportunity', description: 'Weekend sales are 40% higher', time: '6 hours ago', icon: '📈' },
  { type: 'info', title: 'Data Sync Completed', description: 'All data sources synchronized successfully', time: '8 hours ago', icon: '🔄' },
];

const aiInsights = [
  { title: 'Revenue is 18.6% higher than last week', description: 'Great job! Your revenue is trending up consistently.', type: 'positive' },
  { title: 'Weekend sales are your strongest', description: 'Consider increasing inventory and staff on weekends.', type: 'opportunity' },
  { title: 'Food cost is 32% of COGS', description: 'This is higher than the industry average of 28%.', type: 'warning' },
];

const weekData = [
  { day: 'Mon', revenue: 320000, expenses: 180000 },
  { day: 'Tue', revenue: 380000, expenses: 195000 },
  { day: 'Wed', revenue: 420000, expenses: 210000 },
  { day: 'Thu', revenue: 460000, expenses: 230000 },
  { day: 'Fri', revenue: 580000, expenses: 290000 },
  { day: 'Sat', revenue: 720000, expenses: 310000 },
  { day: 'Sun', revenue: 650000, expenses: 280000 },
];

const quickActions = [
  { icon: '📊', label: 'Generate Report', to: '/reports' },
  { icon: '🤖', label: 'Ask AI Assistant', to: '/ai-assistant' },
  { icon: '📈', label: 'View Forecast', to: '/forecasting' },
  { icon: '⚙️', label: 'Manage Settings', to: '/settings' },
];

const dateRangeOptions = [
  'Today',
  'Yesterday',
  'This Week',
  'Last Week',
  'This Month',
  'Last Month',
  'This Year',
];

const alertTypeLabels = {
  warning: 'Warning',
  danger: 'Danger',
  success: 'Success',
  info: 'Info',
};

const insightTypeLabels = {
  positive: 'Positive',
  opportunity: 'Opportunity',
  warning: 'Warning',
};

const allMetricTitles = metrics.map((m) => m.title);
const allSourceNames = revenueSources.map((s) => s.name);
const allAlertTypes = Object.keys(alertTypeLabels);
const allInsightTypes = [...new Set(aiInsights.map((i) => i.type))];

const maxValue = Math.max(...weekData.map((d) => d.revenue));

const Dashboard = ({ user, onLogout }) => {
  const toast = useToast();
  const [chartRange, setChartRange] = useState('This Week');

  // ---- Date dropdown ----
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('May 12 – May 19, 2025');
  const dateDropdownRef = useRef(null);

  // ---- Filters dropdown ----
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterMetrics, setFilterMetrics] = useState(allMetricTitles);
  const [filterSources, setFilterSources] = useState(allSourceNames);
  const [filterAlertTypes, setFilterAlertTypes] = useState(allAlertTypes);
  const [filterInsightTypes, setFilterInsightTypes] = useState(allInsightTypes);
  const filterDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setIsDateOpen(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDateOpen(false);
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelectRange = (label) => {
    setSelectedRange(label);
    setIsDateOpen(false);
  };

  const toggleInList = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const resetFilters = () => {
    setFilterMetrics(allMetricTitles);
    setFilterSources(allSourceNames);
    setFilterAlertTypes(allAlertTypes);
    setFilterInsightTypes(allInsightTypes);
  };

  const totalFilterOptions =
    allMetricTitles.length + allSourceNames.length + allAlertTypes.length + allInsightTypes.length;
  const selectedFilterOptions =
    filterMetrics.length + filterSources.length + filterAlertTypes.length + filterInsightTypes.length;
  const activeFilterCount = totalFilterOptions - selectedFilterOptions;

  const visibleMetrics = metrics.filter((m) => filterMetrics.includes(m.title));
  const visibleSources = revenueSources.filter((s) => filterSources.includes(s.name));
  const visibleAlerts = alerts.filter((a) => filterAlertTypes.includes(a.type));
  const visibleInsights = aiInsights.filter((i) => filterInsightTypes.includes(i.type));

  // Exports exactly what the filters currently show, tagged with the selected date range.
  const handleExport = () => {
    const rows = visibleMetrics.map((m) => ({ metric: m.title, value: m.value, change: m.change, comparison: m.vs, range: selectedRange }));
    if (rows.length === 0) {
      toast('Nothing to export. Adjust your filters first.', 'error');
      return;
    }
    downloadFile(
      'senzia-dashboard.csv',
      toCsv(rows, [
        { key: 'metric', label: 'Metric' },
        { key: 'value', label: 'Value' },
        { key: 'change', label: 'Change' },
        { key: 'comparison', label: 'Compared to' },
        { key: 'range', label: 'Date range' },
      ]),
      'text/csv'
    );
    toast(`Exported ${rows.length} metrics.`);
  };

  return (
    <AppShell
      active="Dashboard"
      pageIcon={LayoutDashboard}
      title={`Welcome back, ${user?.name || 'John'}! 🎉`}
      subtitle={`Here's what's happening with ${user?.businessName || 'Senzia Limited'} today.`}
      userName={user?.name || 'John M.'}
      businessName={user?.businessName || 'Senzia Limited'}
      onLogout={onLogout}
      headerActions={
        <>
          <div className="date-dropdown" ref={dateDropdownRef}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIsDateOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={isDateOpen}
            >
              <Calendar size={16} /> {selectedRange} <ChevronDown size={14} />
            </button>

            {isDateOpen && (
              <div className="date-dropdown-menu" role="menu">
                {dateRangeOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    role="menuitem"
                    className={`date-dropdown-item ${selectedRange === option ? 'active' : ''}`}
                    onClick={() => handleSelectRange(option)}
                  >
                    {option}
                    {selectedRange === option && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="filter-dropdown" ref={filterDropdownRef}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIsFilterOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={isFilterOpen}
            >
              <Filter size={16} /> Filters
              {activeFilterCount > 0 && <span className="filter-count-badge">{activeFilterCount}</span>}
            </button>

            {isFilterOpen && (
              <div className="filter-dropdown-menu" role="menu">
                <div className="filter-dropdown-header">
                  <span>Filters</span>
                  <button type="button" className="filter-reset-btn" onClick={resetFilters}>
                    Reset
                  </button>
                </div>

                <div className="filter-section">
                  <p className="filter-section-label">Metrics</p>
                  {allMetricTitles.map((title) => (
                    <label className="filter-checkbox-row" key={title}>
                      <span
                        className={`filter-checkbox ${filterMetrics.includes(title) ? 'checked' : ''}`}
                        onClick={() => toggleInList(filterMetrics, setFilterMetrics, title)}
                      >
                        {filterMetrics.includes(title) && <Check size={12} />}
                      </span>
                      {title}
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <p className="filter-section-label">Revenue Sources</p>
                  {allSourceNames.map((name) => (
                    <label className="filter-checkbox-row" key={name}>
                      <span
                        className={`filter-checkbox ${filterSources.includes(name) ? 'checked' : ''}`}
                        onClick={() => toggleInList(filterSources, setFilterSources, name)}
                      >
                        {filterSources.includes(name) && <Check size={12} />}
                      </span>
                      {name}
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <p className="filter-section-label">Alert Types</p>
                  {allAlertTypes.map((type) => (
                    <label className="filter-checkbox-row" key={type}>
                      <span
                        className={`filter-checkbox ${filterAlertTypes.includes(type) ? 'checked' : ''}`}
                        onClick={() => toggleInList(filterAlertTypes, setFilterAlertTypes, type)}
                      >
                        {filterAlertTypes.includes(type) && <Check size={12} />}
                      </span>
                      {alertTypeLabels[type]}
                    </label>
                  ))}
                </div>

                <div className="filter-section">
                  <p className="filter-section-label">AI Insight Types</p>
                  {allInsightTypes.map((type) => (
                    <label className="filter-checkbox-row" key={type}>
                      <span
                        className={`filter-checkbox ${filterInsightTypes.includes(type) ? 'checked' : ''}`}
                        onClick={() => toggleInList(filterInsightTypes, setFilterInsightTypes, type)}
                      >
                        {filterInsightTypes.includes(type) && <Check size={12} />}
                      </span>
                      {insightTypeLabels[type]}
                    </label>
                  ))}
                </div>

                <button type="button" className="filter-apply-btn" onClick={() => setIsFilterOpen(false)}>
                  Done
                </button>
              </div>
            )}
          </div>

          <button className="btn btn-primary" onClick={handleExport}><Download size={16} /> Export</button>
        </>
      }
    >
      {/* ---- Active filter chips ---- */}
      {activeFilterCount > 0 && (
        <div className="active-filters-row">
          {filterMetrics.length < allMetricTitles.length && (
            <span className="active-filter-chip">
              {filterMetrics.length} of {allMetricTitles.length} metrics
            </span>
          )}
          {filterSources.length < allSourceNames.length && (
            <span className="active-filter-chip">
              {filterSources.length} of {allSourceNames.length} sources
            </span>
          )}
          {filterAlertTypes.length < allAlertTypes.length && (
            <span className="active-filter-chip">
              {filterAlertTypes.length} of {allAlertTypes.length} alert types
            </span>
          )}
          {filterInsightTypes.length < allInsightTypes.length && (
            <span className="active-filter-chip">
              {filterInsightTypes.length} of {allInsightTypes.length} insight types
            </span>
          )}
          <button type="button" className="active-filters-clear" onClick={resetFilters}>
            <X size={13} /> Clear all
          </button>
        </div>
      )}

      {/* ---- Metrics grid ---- */}
      <div className="metrics-grid">
        {visibleMetrics.map(({ title, value, change, trend, vs }) => (
          <div className="metric-card" key={title}>
            <div className="metric-card-top">
              <p>{title}</p>
              <span className={`metric-chip ${trend === 'up' ? 'pill-success' : 'pill-danger'}`}>
                {trend === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {change}
              </span>
            </div>
            <p className="metric-value">{value}</p>
            <p className="metric-sub">{vs}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-layout">
        <div className="content-stack">
          {/* ---- Revenue chart ---- */}
          <div className="panel">
            <div className="chart-head">
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Revenue Overview</h3>
                <div className="segmented-control">
                  {['This Week', 'Last Week'].map((r) => (
                    <button key={r} className={chartRange === r ? 'active' : ''} onClick={() => setChartRange(r)}>{r}</button>
                  ))}
                </div>
              </div>
              <div className="chart-legend">
                <div className="chart-legend-item"><span className="chart-legend-swatch" style={{ background: 'var(--accent)' }} /> Revenue</div>
                <div className="chart-legend-item"><span className="chart-legend-swatch" style={{ background: 'var(--info)' }} /> Expenses</div>
              </div>
            </div>

            <div className="bar-chart">
              {weekData.map((day) => (
                <div className="bar-col" key={day.day}>
                  <div className="bar-pair">
                    <div className="bar bar-revenue" style={{ height: `${(day.revenue / maxValue) * 100}%` }} />
                    <div className="bar bar-expenses" style={{ height: `${(day.expenses / maxValue) * 100}%` }} />
                  </div>
                  <span className="bar-day-label">{day.day}</span>
                </div>
              ))}
            </div>

            <div className="chart-footer">
              <div>
                <p>Total Revenue</p>
                <p>KES 2,450,000</p>
              </div>
              <div className="right">
                <p>vs last week</p>
                <p style={{ color: 'var(--success)' }}>↑ 18.6%</p>
              </div>
            </div>
          </div>

          {/* ---- Revenue sources ---- */}
          <div className="panel">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>Top Revenue Sources</h3>
            {visibleSources.length === 0 && (
              <p className="filter-empty-state">No revenue sources match your filters.</p>
            )}
            {visibleSources.map((source) => (
              <div className="source-row" key={source.name}>
                <div className="source-row-top">
                  <span>{source.name}</span>
                  <span>{source.percentage}%</span>
                </div>
                <div className="source-bar-track">
                  <div className="source-bar-fill" style={{ width: `${source.percentage}%`, background: source.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right column ---- */}
        <div className="rail-stack">
          <div className="rail-card">
            <div className="panel-head" style={{ marginBottom: '0.6rem' }}>
              <h4 style={{ margin: 0 }}>AI Insights</h4>
              <Link to="/insights" className="link-accent">View All →</Link>
            </div>
            {visibleInsights.length === 0 && (
              <p className="filter-empty-state">No insights match your filters.</p>
            )}
            {visibleInsights.map((insight) => (
              <div className={`ai-note ${insight.type}`} key={insight.title}>
                <p>{insight.title}</p>
                <p>{insight.description}</p>
              </div>
            ))}
          </div>

          <div className="rail-card">
            <div className="panel-head" style={{ marginBottom: '0.4rem' }}>
              <h4 style={{ margin: 0 }}>Recent Alerts</h4>
              <Link to="/alerts" className="link-accent">View All →</Link>
            </div>
            {visibleAlerts.length === 0 && (
              <p className="filter-empty-state">No alerts match your filters.</p>
            )}
            {visibleAlerts.map((alert) => (
              <div className="alert-row" key={alert.title}>
                <div className="alert-icon">{alert.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="alert-row-top">
                    <p>{alert.title}</p>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                  <p className="alert-desc">{alert.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rail-card">
            <div className="cashflow-top">
              <div>
                <p className="cashflow-value-label">Net Cash Flow</p>
                <p className="cashflow-value">KES 320,450</p>
              </div>
              <div className="cashflow-legend">
                <span className="cashflow-swatch" style={{ background: 'var(--success)' }} /> Inflow
                <span className="cashflow-swatch" style={{ background: 'var(--danger)' }} /> Outflow
              </div>
            </div>
            <div className="mini-bar-chart">
              {weekData.map((day) => (
                <div className="mini-bar-col" key={day.day}>
                  <div className="mini-bar-pair">
                    <div className="mini-bar mini-bar-in" style={{ height: `${(day.revenue / 720000) * 100}%` }} />
                    <div className="mini-bar mini-bar-out" style={{ height: `${(day.expenses / 720000) * 100}%` }} />
                  </div>
                  <span className="mini-bar-label">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- Quick actions ---- */}
      <div className="quick-actions-grid">
        {quickActions.map(({ icon, label, to }) => (
          <Link to={to} key={label} style={{ textDecoration: 'none' }}>
            <button className="quick-action-btn">
              <span className="quick-action-emoji">{icon}</span>
              {label}
            </button>
          </Link>
        ))}
      </div>
    </AppShell>
  );
};

export default Dashboard;