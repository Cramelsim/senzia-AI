import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowDownRight,
} from 'lucide-react';
import AppShell from './AppShell';
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

const xLabels = { 0: 'Apr 15', 2: 'Apr 22', 4: 'Apr 29', 6: 'May 6', 8: 'May 12' };

const TrendChart = () => {
  const width = 680;
  const height = 260;
  const padL = 46;
  const padR = 14;
  const padT = 10;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const yMax = 300000;
  const n = trendSeries[0].data.length;

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

      {Object.entries(xLabels).map(([i, label]) => (
        <text key={i} x={sx(Number(i))} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
          {label}
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
            points={s.data.map((v, i) => `${sx(i)},${sy(v)}`).join(' ')}
          />
          {s.data.map((v, i) => (
            <circle key={i} cx={sx(i)} cy={sy(v)} r="3" fill={s.color} />
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
  const [activeTab, setActiveTab] = useState('overview');
  const [granularity, setGranularity] = useState('Daily');

  return (
    <AppShell
      active="Insights"
      pageIcon={Sparkles}
      title="Insights Hub"
      subtitle="Discover what's happening in your business. Powered by AI."
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerActions={
        <>
          <button className="btn btn-ghost"><Calendar size={16} /> May 6 – May 12, 2025</button>
        </>
      }
    >
      <div className="insights-layout">
        <div className="content-stack">

          {/* ---- Critical insight cards ---- */}
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

          {/* ---- Business performance trend ---- */}
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
                <button className="icon-btn" aria-label="More options"><MoreHorizontal size={18} /></button>
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
                <TrendChart />
              </div>
            </div>
          </div>

          {/* ---- Top performing areas + Opportunity spotlight ---- */}
          <div className="two-col">
            <div className="panel">
              <div className="panel-head">
                <div>
                  <h3>Top Performing Areas</h3>
                  <p>Areas contributing most to your growth</p>
                </div>
                <Link to="/reports" className="link-accent">View All</Link>
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

            <div className="panel">
              <div className="panel-head">
                <div>
                  <h3>Opportunity Spotlight</h3>
                  <p>High impact opportunities for your business</p>
                </div>
                <Link to="/reports" className="link-accent">View All</Link>
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
          </div>
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
              <Link to="/reports" className="link-accent">View All</Link>
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