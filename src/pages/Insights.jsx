import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  DollarSign,
  PieChart,
  BarChart3,
  ChevronRight,
  Calendar,
  MoreHorizontal,
  Brain,
  ShoppingBag,
  ArrowUpRight,
} from 'lucide-react';
import AppShell from './AppShell';
import { useToast } from '../Toast';
import { downloadFile, toCsv } from '../download';
import './Insights.css';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'trends', label: 'Trends', caret: true },
  { id: 'anomalies', label: 'Anomalies' },
  { id: 'opportunities', label: 'Opportunities', caret: true },
  { id: 'benchmarks', label: 'Benchmarks', caret: true },
  { id: 'alerts', label: 'Smart Alerts' },
];

const insightCards = [
  {
    tone: 'critical',
    tag: 'Critical Insight',
    title: 'Expense Spike Detected',
    desc: 'Office Supplies expenses are 32% higher than usual.',
    action: 'Investigate',
    link: '/reports',
    icon: AlertCircle,
    spark: 'down',
  },
  {
    tone: 'growth',
    tag: 'Growth Insight',
    title: 'Revenue Up 18.6%',
    desc: 'Your revenue this week is higher compared to last week.',
    action: 'View Details',
    link: '/reports',
    icon: TrendingUp,
    spark: 'up',
  },
  {
    tone: 'efficiency',
    tag: 'Efficiency Insight',
    title: 'Profit Margin Improved',
    desc: 'Gross profit margin improved by 4.7% this week.',
    action: 'View Analysis',
    link: '/reports',
    icon: Target,
    spark: 'up',
  },
  {
    tone: 'warning',
    tag: 'Warning Insight',
    title: 'Low Stock Alert',
    desc: '5 products are running low on inventory.',
    action: 'Check Inventory',
    link: '/data-sources',
    icon: AlertTriangle,
    spark: 'bars',
  },
];

const keyMetrics = [
  { label: 'Total Revenue', value: 'KES 248,420', change: '+18.6%', up: true, icon: DollarSign, tone: 'good' },
  { label: 'Gross Profit', value: 'KES 98,540', change: '+14.3%', up: true, icon: PieChart, tone: 'accent' },
  { label: 'Net Profit', value: 'KES 36,190', change: '+27.4%', up: true, icon: BarChart3, tone: 'info' },
  { label: 'Total Expenses', value: 'KES 62,350', change: '-7.8%', up: false, icon: TrendingDown, tone: 'warning' },
];

/* ---- Trend chart data (Apr 15 – May 12) ---- */
const trendSeries = [
  { key: 'revenue', label: 'Revenue', value: 'KES 248,420', change: '+18.6%', color: '#34c98e', data: [118000, 132000, 127000, 148000, 162000, 178000, 205000, 222000, 248420] },
  { key: 'grossProfit', label: 'Gross Profit', value: 'KES 98,540', change: '+14.3%', color: '#a855f7', data: [58000, 63000, 60000, 70000, 76000, 84000, 90000, 95000, 98540] },
  { key: 'netProfit', label: 'Net Profit', value: 'KES 36,190', change: '+27.4%', color: '#4f8bf0', data: [16000, 18000, 15500, 20000, 23000, 27000, 30000, 33000, 36190] },
  { key: 'expenses', label: 'Expenses', value: 'KES 62,350', change: '-7.8%', color: '#f0a828', data: [68000, 66000, 70000, 64000, 67000, 63000, 65000, 60000, 62350] },
];

const pointLabels = ['Apr 15', 'Apr 19', 'Apr 22', 'Apr 26', 'Apr 29', 'May 3', 'May 6', 'May 9', 'May 12'];

// How many of the most recent data points each range shows, and the header label for it.
const RANGES = [
  { id: '7d', label: 'Last 7 days', points: 3, text: 'May 6 – May 12, 2025' },
  { id: '14d', label: 'Last 14 days', points: 5, text: 'Apr 29 – May 12, 2025' },
  { id: '28d', label: 'Last 28 days', points: 9, text: 'Apr 15 – May 12, 2025' },
];

const GRANULARITY_STEP = { Daily: 1, Weekly: 2, Monthly: 4 };

// Indexes of the points to plot: the window ending at the latest point, thinned out by granularity.
const visibleIndexes = (rangePoints, granularity) => {
  const last = pointLabels.length - 1;
  const first = last - rangePoints + 1;
  const step = GRANULARITY_STEP[granularity];
  const picked = [];
  for (let i = last; i >= first; i -= step) picked.unshift(i);
  if (picked.length < 2) picked.unshift(first);
  return picked;
};

const TrendChart = ({ indexes }) => {
  const width = 680;
  const height = 260;
  const padL = 46;
  const padR = 14;
  const padT = 10;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const yMax = 300000;
  const n = indexes.length;

  const sx = (i) => padL + (i * plotW) / (n - 1);
  const sy = (v) => padT + plotH - (v / yMax) * plotH;

  const yTicks = [0, 50000, 100000, 150000, 200000, 250000, 300000];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block', minWidth: 520 }}>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={width - padR} y1={sy(t)} y2={sy(t)} stroke="var(--border-soft)" strokeWidth="1" />
          <text x={padL - 8} y={sy(t) + 3} textAnchor="end" fontSize="10" fill="var(--text-tertiary)">
            {t === 0 ? '0' : `${t / 1000}K`}
          </text>
        </g>
      ))}

      {indexes.map((dataIndex, i) => (
        <text key={dataIndex} x={sx(i)} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
          {pointLabels[dataIndex]}
        </text>
      ))}

      {trendSeries.map((s) => (
        <g key={s.key}>
          <polyline
            fill="none"
            stroke={s.color}
            strokeWidth="2.25"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={indexes.map((d, i) => `${sx(i)},${sy(s.data[d])}`).join(' ')}
          />
          {indexes.map((d, i) => (
            <circle key={d} cx={sx(i)} cy={sy(s.data[d])} r="3" fill={s.color} />
          ))}
        </g>
      ))}
    </svg>
  );
};

/* ---- Mini sparkline for the 4 top insight cards ---- */
const MiniSpark = ({ type, color }) => {
  if (type === 'bars') {
    const bars = [8, 14, 10, 18, 22];
    return (
      <svg width="64" height="28" viewBox="0 0 64 28">
        {bars.map((h, i) => (
          <rect key={i} x={i * 13} y={28 - h} width="8" height={h} rx="1.5" fill={color} opacity={0.4 + i * 0.12} />
        ))}
      </svg>
    );
  }
  const points = type === 'up'
    ? [22, 18, 20, 12, 14, 6, 2]
    : [6, 10, 8, 14, 12, 18, 22];
  const pts = points.map((y, i) => `${i * 10},${y}`).join(' ');
  return (
    <svg width="64" height="28" viewBox="0 0 64 28">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
};

/* ---- Donut chart ---- */
const donutSegments = [
  { name: 'E-Commerce Sales', pct: 64, color: '#34c98e' },
  { name: 'New Customers', pct: 18, color: '#a855f7' },
  { name: 'Product Mix Improvement', pct: 12, color: '#4f8bf0' },
  { name: 'Marketing Campaigns', pct: 6, color: '#f0a828' },
];

const Donut = () => {
  const r = 46;
  const stroke = 15;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <g transform="rotate(-90 60 60)">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--border-soft)" strokeWidth={stroke} />
        {donutSegments.map((seg) => {
          const dash = (seg.pct / 100) * c;
          const offset = -(acc / 100) * c;
          acc += seg.pct;
          return (
            <circle
              key={seg.name}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
      </g>
      <text x="60" y="56" textAnchor="middle" fontSize="19" fontWeight="700" fill="var(--text-primary)">64%</text>
      <text x="60" y="72" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">Total Impact</text>
    </svg>
  );
};

const opportunities = [
  { title: 'Reduce Office Supplies Cost', sub: 'Potential Savings', amount: 'KES 18,500', impact: 'High Impact', icon: DollarSign },
  { title: 'Optimize Low Performing Products', sub: 'Potential Profit Increase', amount: 'KES 24,000', impact: 'High Impact', icon: ShoppingBag },
  { title: 'Increase E-Commerce Ad Spend', sub: 'Potential Revenue Increase', amount: 'KES 35,000', impact: 'Medium Impact', icon: ArrowUpRight },
];

const anomalies = [
  { title: 'Expense Anomaly', desc: 'Office Supplies expense spiked by 32%', date: 'May 12, 2025', severity: 'High', color: 'var(--danger)', bg: 'var(--danger-soft)', icon: AlertCircle },
  { title: 'Sales Anomaly', desc: 'Product D sales dropped by 18%', date: 'May 11, 2025', severity: 'Medium', color: 'var(--warning)', bg: 'var(--warning-soft)', icon: TrendingDown },
  { title: 'Inventory Anomaly', desc: 'Slow moving inventory increased by 23%', date: 'May 10, 2025', severity: 'Medium', color: 'var(--info)', bg: 'rgba(79,139,240,0.12)', icon: ShoppingBag },
];

const impactPill = (impact) => (impact === 'High Impact' ? 'pill-danger' : 'pill-warning');
const severityPill = (sev) => (sev === 'High' ? 'pill-danger' : 'pill-warning');

const Insights = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [granularity, setGranularity] = useState('Daily');
  const [rangeId, setRangeId] = useState('28d');
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rangeRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onMouseDown = (event) => {
      if (rangeRef.current && !rangeRef.current.contains(event.target)) setIsRangeOpen(false);
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const range = RANGES.find((r) => r.id === rangeId);
  const indexes = visibleIndexes(range.points, granularity);

  // "Smart Alerts" lives on its own page; every other tab swaps the content below.
  const handleTabChange = (id) => {
    if (id === 'alerts') navigate('/alerts');
    else setActiveTab(id);
  };

  const exportTrend = () => {
    const rows = indexes.map((d) => ({
      date: pointLabels[d],
      ...Object.fromEntries(trendSeries.map((series) => [series.key, series.data[d]])),
    }));
    downloadFile(
      'senzia-performance-trend.csv',
      toCsv(rows, [{ key: 'date', label: 'Date' }, ...trendSeries.map((series) => ({ key: series.key, label: series.label }))]),
      'text/csv'
    );
    setIsMenuOpen(false);
    toast('Trend data exported.');
  };

  const showCards = activeTab === 'overview';
  const showTrend = activeTab === 'overview' || activeTab === 'trends';
  const showTopAreas = activeTab === 'overview' || activeTab === 'trends';
  const showOpportunities = activeTab === 'overview' || activeTab === 'opportunities';
  const showAnomalies = activeTab === 'anomalies';
  const showBenchmarks = activeTab === 'benchmarks';

  return (
    <AppShell
      active="Insights"
      pageIcon={Sparkles}
      title="Insights Hub"
      subtitle="Discover what's happening in your business. Powered by AI."
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      headerActions={
        <div ref={rangeRef} style={{ position: 'relative' }}>
          <button className="btn btn-ghost" aria-haspopup="true" aria-expanded={isRangeOpen} onClick={() => setIsRangeOpen((open) => !open)}>
            <Calendar size={16} /> {range.text}
          </button>
          {isRangeOpen && (
            <div className="notif-dropdown-menu" role="menu" style={{ width: 200, top: 'calc(100% + 0.4rem)' }}>
              {RANGES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={r.id === rangeId}
                  className="search-result-row"
                  style={r.id === rangeId ? { color: 'var(--accent)', fontWeight: 600 } : undefined}
                  onClick={() => { setRangeId(r.id); setIsRangeOpen(false); }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      }
    >
      <div className="insights-layout">
        <div className="content-stack">

          {/* ---- Critical insight cards ---- */}
          {showCards && (
          <div className="insight-cards-row">
            {insightCards.map(({ tone, tag, title, desc, action, link, icon: Icon, spark }) => (
              <div className={`insight-card tone-${tone}`} key={title}>
                <div className="insight-card-top">
                  <div className="insight-card-icon"><Icon size={18} /></div>
                  <div>
                    <p className="insight-card-tag">{tag}</p>
                  </div>
                </div>
                <h4>{title}</h4>
                <p className="desc">{desc}</p>
                <MiniSpark type={spark} color={
                  tone === 'critical' ? 'var(--danger)' :
                  tone === 'growth' ? 'var(--success)' :
                  tone === 'efficiency' ? 'var(--info)' : 'var(--warning)'
                } />
                <Link to={link} className="insight-card-action">
                  {action} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          )}

          {/* ---- Business performance trend ---- */}
          {showTrend && (
          <div className="panel">
            <div className="trend-panel-top">
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.2rem' }}>Business Performance Trend</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>Key metrics trend over the selected period</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="segmented-control">
                  {['Daily', 'Weekly', 'Monthly'].map((g) => (
                    <button key={g} className={granularity === g ? 'active' : ''} onClick={() => setGranularity(g)}>{g}</button>
                  ))}
                </div>
                <div ref={menuRef} style={{ position: 'relative' }}>
                  <button className="icon-btn" aria-label="More options" aria-haspopup="true" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}>
                    <MoreHorizontal size={18} />
                  </button>
                  {isMenuOpen && (
                    <div className="notif-dropdown-menu" role="menu" style={{ width: 200, top: 'calc(100% + 0.4rem)' }}>
                      <button type="button" role="menuitem" className="search-result-row" onClick={exportTrend}>Export data (CSV)</button>
                      <button type="button" role="menuitem" className="search-result-row" onClick={() => { setIsMenuOpen(false); navigate('/reports'); }}>Open Reports</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="trend-body">
              <div className="trend-legend">
                {trendSeries.map((s) => (
                  <div className="trend-legend-item" key={s.key}>
                    <div className="trend-legend-dot-row">
                      <span className="trend-legend-dot" style={{ background: s.color }} />
                      <span className="trend-legend-label">{s.label}</span>
                    </div>
                    <div>
                      <span className="trend-legend-value">{s.value}</span>
                      <span className="trend-legend-change" style={{ color: s.change.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>
                        {s.change.startsWith('+') ? '↑' : '↓'} {s.change.replace(/[+-]/, '')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="trend-chart-wrap">
                <TrendChart indexes={indexes} />
              </div>
            </div>
          </div>
          )}

          {/* ---- Top performing areas + Opportunity spotlight ---- */}
          {(showTopAreas || showOpportunities) && (
          <div className="two-col" style={!showTopAreas || !showOpportunities ? { gridTemplateColumns: '1fr' } : undefined}>
            {showTopAreas && (
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h3>Top Performing Areas</h3>
                  <p>Areas contributing most to your growth</p>
                </div>
                {activeTab === 'overview' && (
                  <button type="button" className="link-accent" onClick={() => setActiveTab('trends')}>View All</button>
                )}
              </div>
              <div className="donut-legend-wrap">
                <Donut />
                <div className="donut-legend">
                  {donutSegments.map((seg) => (
                    <div className="donut-legend-row" key={seg.name}>
                      <div className="donut-legend-row-left">
                        <span className="donut-legend-swatch" style={{ background: seg.color }} />
                        {seg.name}
                      </div>
                      <span className="donut-legend-pct">{seg.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}

            {showOpportunities && (
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h3>Opportunity Spotlight</h3>
                  <p>High impact opportunities for your business</p>
                </div>
                {activeTab === 'overview' && (
                  <button type="button" className="link-accent" onClick={() => setActiveTab('opportunities')}>View All</button>
                )}
              </div>
              {opportunities.map(({ title, sub, amount, impact, icon: Icon }) => (
                <div className="opportunity-row" key={title}>
                  <div className="opportunity-left">
                    <div className="opportunity-icon"><Icon size={16} /></div>
                    <div>
                      <p>{title}</p>
                      <p>{sub}</p>
                    </div>
                  </div>
                  <div className="opportunity-right">
                    <p>&nbsp;</p>
                    <p className="opportunity-amount">{amount}</p>
                    <span className={`pill ${impactPill(impact)}`}>{impact}</span>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
          )}

          {showAnomalies && (
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h3>Anomalies</h3>
                  <p>Unusual changes Senzia AI has flagged in your data</p>
                </div>
              </div>
              {anomalies.map(({ title, desc, date, severity, color, bg, icon: Icon }) => (
                <div className="anomaly-row" key={title}>
                  <div className="anomaly-left">
                    <div className="anomaly-icon" style={{ background: bg }}>
                      <Icon size={15} color={color} />
                    </div>
                    <div>
                      <p>{title}</p>
                      <p>{desc}</p>
                    </div>
                  </div>
                  <div className="anomaly-right">
                    <span className={`pill ${severityPill(severity)}`}>{severity}</span>
                    <p className="anomaly-date">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showBenchmarks && (
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h3>Period-over-period Benchmarks</h3>
                  <p>How each key metric compares with the previous period</p>
                </div>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th className="num">Current</th>
                    <th className="num">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {keyMetrics.map(({ label, value, change, up }) => (
                    <tr key={label}>
                      <td style={{ fontWeight: 500 }}>{label}</td>
                      <td className="num">{value}</td>
                      <td className="num" style={{ color: up ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{up ? '↑' : '↓'} {change.replace(/[+-]/, '')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Key Metrics Snapshot</h4>
            {keyMetrics.map(({ label, value, change, up, icon: Icon, tone }) => (
              <div className="rail-row" key={label} style={{ alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: tone === 'good' ? 'var(--success-soft)' : tone === 'accent' ? 'rgba(168,85,247,0.14)' : tone === 'info' ? 'rgba(79,139,240,0.14)' : 'var(--warning-soft)',
                    color: tone === 'good' ? 'var(--success)' : tone === 'accent' ? '#a855f7' : tone === 'info' ? 'var(--info)' : 'var(--warning)',
                  }}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>{label}</p>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0.1rem 0 0' }}>{value}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: up ? 'var(--success)' : 'var(--danger)', whiteSpace: 'nowrap' }}>
                  {up ? '↑' : '↓'} {change.replace(/[+-]/, '')}
                </span>
              </div>
            ))}
          </div>

          <div className="rail-card ai-summary-card">
            <div className="ai-summary-top">
              <div className="ai-summary-icon"><Brain size={17} color="white" /></div>
              <h4 style={{ margin: 0 }}>AI Insight Summary</h4>
            </div>
            <p className="lead-text">
              Your business is performing well this week with strong revenue growth and improved profitability.
            </p>
            <div className="ai-summary-list">
              <div className="ai-summary-list-item"><ArrowUpRight size={14} color="var(--success)" /> Revenue is above target by 12%</div>
              <div className="ai-summary-list-item"><ArrowUpRight size={14} color="var(--success)" /> Marketing spend is delivering good ROI</div>
              <div className="ai-summary-list-item"><ArrowUpRight size={14} color="var(--success)" /> 2 cost saving opportunities identified</div>
              <div className="ai-summary-list-item"><ArrowUpRight size={14} color="var(--success)" /> Inventory turnover rate is healthy</div>
            </div>
            <Link to="/ai-assistant">
              <button className="btn btn-ai btn-block">View Full AI Analysis <ChevronRight size={14} /></button>
            </Link>
          </div>

          <div className="rail-card">
            <div className="panel-head" style={{ marginBottom: '0.6rem' }}>
              <h4 style={{ margin: 0 }}>Recent Anomalies</h4>
              {!showAnomalies && (
                <button type="button" className="link-accent" onClick={() => setActiveTab('anomalies')}>View All</button>
              )}
            </div>
            {anomalies.map(({ title, desc, date, severity, color, bg, icon: Icon }) => (
              <div className="anomaly-row" key={title}>
                <div className="anomaly-left">
                  <div className="anomaly-icon" style={{ background: bg }}>
                    <Icon size={15} color={color} />
                  </div>
                  <div>
                    <p>{title}</p>
                    <p>{desc}</p>
                  </div>
                </div>
                <div className="anomaly-right">
                  <span className={`pill ${severityPill(severity)}`}>{severity}</span>
                  <p className="anomaly-date">{date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Pro tip ---- */}
      <div className="panel pro-tip-banner">
        <div className="pro-tip-icon">💡</div>
        <div className="pro-tip-text">
          <p>Pro Tip from Senzia AI</p>
          <p>Consider negotiating with your Office Supplies vendor. Similar businesses are paying 15-20% less.</p>
        </div>
        <Link to="/ai-assistant" className="link-accent">Learn More <ChevronRight size={14} /></Link>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/reports" className="link-accent" style={{ justifyContent: 'center' }}>
          View All Analysis <ChevronRight size={16} />
        </Link>
      </div>
    </AppShell>
  );
};

export default Insights;