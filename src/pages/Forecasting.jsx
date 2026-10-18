import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  Download,
  Activity,
  DollarSign,
  Package,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import AppShell from './AppShell';
import Modal from '../Modal';
import { useToast } from '../Toast';
import { downloadFile, toCsv } from '../download';
import './Forecasting.css';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'revenue', label: 'Revenue Forecast' },
  { id: 'expense', label: 'Expense Forecast' },
  { id: 'cashflow', label: 'Cash Flow Forecast' },
  { id: 'inventory', label: 'Inventory Forecast' },
];

const forecastMetrics = [
  { key: 'revenue', title: 'Revenue Forecast', amount: 2850000, change: 16.3, confidence: 94, icon: DollarSign, color: 'var(--accent)', bg: 'var(--accent-soft)', trend: 'up' },
  { key: 'profit', title: 'Profit Forecast', amount: 742500, change: 18.7, confidence: 91, icon: TrendingUp, color: 'var(--success)', bg: 'var(--success-soft)', trend: 'up' },
  { key: 'expense', title: 'Expense Forecast', amount: 612000, change: -4.2, confidence: 89, icon: TrendingDown, color: 'var(--danger)', bg: 'var(--danger-soft)', trend: 'down' },
  { key: 'cashflow', title: 'Cash Flow Forecast', amount: 1245000, change: 12.8, confidence: 93, icon: Activity, color: 'var(--info)', bg: 'rgba(79,139,240,0.12)', trend: 'up' },
];

// Figures above are for the next month; longer horizons scale the amount and are forecast with less certainty.
const PERIODS = {
  month: { label: 'Next Month', scale: 1, confidencePenalty: 0 },
  quarter: { label: 'Next Quarter', scale: 3, confidencePenalty: 3 },
  year: { label: 'Next Year', scale: 12, confidencePenalty: 8 },
};

// Which sections each tab shows. Metric keys limit the metric cards; the rest are on/off.
const TAB_SECTIONS = {
  overview: { metrics: null, chart: true, inventory: true, demand: true, insights: true },
  revenue: { metrics: ['revenue', 'profit'], chart: true, inventory: false, demand: true, insights: true },
  expense: { metrics: ['expense'], chart: false, inventory: false, demand: false, insights: true },
  cashflow: { metrics: ['cashflow'], chart: true, inventory: false, demand: false, insights: true },
  inventory: { metrics: [], chart: false, inventory: true, demand: true, insights: true },
};

const formatKes = (amount) => `KES ${Math.round(amount).toLocaleString('en-US')}`;
const formatChange = (change) => `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;

const monthlyForecast = [
  { month: 'Jan', actual: 1800000, forecast: 1850000 },
  { month: 'Feb', actual: 1950000, forecast: 1900000 },
  { month: 'Mar', actual: 2100000, forecast: 2150000 },
  { month: 'Apr', actual: 2250000, forecast: 2300000 },
  { month: 'May', actual: 2450000, forecast: 2400000 },
  { month: 'Jun', actual: null, forecast: 2850000 },
  { month: 'Jul', actual: null, forecast: 3100000 },
  { month: 'Aug', actual: null, forecast: 3350000 },
];

const inventoryForecast = [
  { product: 'Product A', current: 450, forecast: 380, change: '-15.6%', status: 'optimize' },
  { product: 'Product B', current: 230, forecast: 310, change: '+34.8%', status: 'increase' },
  { product: 'Product C', current: 180, forecast: 160, change: '-11.1%', status: 'optimize' },
  { product: 'Product D', current: 560, forecast: 590, change: '+5.4%', status: 'increase' },
  { product: 'Product E', current: 120, forecast: 95, change: '-20.8%', status: 'reduce' },
];

const demandForecast = [
  { category: 'Food & Beverages', current: 45, forecast: 52, change: '+15.6%' },
  { category: 'Liquor', current: 30, forecast: 28, change: '-6.7%' },
  { category: 'Accommodation', current: 15, forecast: 18, change: '+20.0%' },
  { category: 'Other Services', current: 10, forecast: 12, change: '+20.0%' },
];

const forecastInsights = [
  { title: 'Revenue Growth Expected', description: 'Based on current trends, revenue is forecasted to grow 16.3% next month.', type: 'positive', icon: TrendingUp },
  { title: 'Inventory Optimization Opportunity', description: 'Product E has 20.8% excess stock. Consider reducing orders.', type: 'opportunity', icon: Package },
  { title: 'Cash Flow Healthy', description: 'Cash flow forecast shows positive momentum with 12.8% growth expected.', type: 'positive', icon: Activity },
];

const statusChip = {
  increase: { label: 'Increase Stock', color: 'var(--success)', bg: 'var(--success-soft)' },
  reduce: { label: 'Reduce Stock', color: 'var(--danger)', bg: 'var(--danger-soft)' },
  optimize: { label: 'Optimize', color: 'var(--warning)', bg: 'var(--warning-soft)' },
};

/* ---- Actual vs Forecast chart, with a confidence band on the forecast-only months ---- */
const ForecastChart = () => {
  const width = 700, height = 260, padL = 46, padR = 10, padT = 10, padB = 26;
  const plotW = width - padL - padR, plotH = height - padT - padB;
  const yMax = 4000000;
  const n = monthlyForecast.length;
  const sx = (i) => padL + (i * plotW) / (n - 1);
  const sy = (v) => padT + plotH - (v / yMax) * plotH;
  const yTicks = [0, 1000000, 2000000, 3000000, 4000000];
  const firstForecastOnlyIndex = monthlyForecast.findIndex((d) => d.actual === null);

  const actualPts = monthlyForecast
    .map((d, i) => (d.actual !== null ? `${sx(i)},${sy(d.actual)}` : null))
    .filter(Boolean)
    .join(' ');

  const forecastPts = monthlyForecast.map((d, i) => `${sx(i)},${sy(d.forecast)}`).join(' ');

  const bandUpper = monthlyForecast.map((d, i) => `${sx(i)},${sy(d.forecast * 1.08)}`);
  const bandLower = monthlyForecast.map((d, i) => `${sx(i)},${sy(d.forecast * 0.92)}`).reverse();
  const bandPts = [...bandUpper, ...bandLower].join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ display: 'block', minWidth: 520 }}>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={width - padR} y1={sy(t)} y2={sy(t)} stroke="var(--border-soft)" strokeWidth="1" />
          <text x={padL - 8} y={sy(t) + 3} textAnchor="end" fontSize="10" fill="var(--text-tertiary)">
            {t === 0 ? '0' : `${t / 1000000}M`}
          </text>
        </g>
      ))}

      {monthlyForecast.map((d, i) => (
        <text key={d.month} x={sx(i)} y={height - 6} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
          {d.month}{d.actual === null ? '*' : ''}
        </text>
      ))}

      {/* forecast starts divider */}
      {firstForecastOnlyIndex > 0 && (
        <line
          x1={sx(firstForecastOnlyIndex - 0.5)} x2={sx(firstForecastOnlyIndex - 0.5)}
          y1={padT} y2={padT + plotH}
          stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3"
        />
      )}

      {/* confidence band around forecast-only months */}
      <polygon points={bandPts} fill="var(--accent)" opacity="0.08" />

      {/* forecast line (dashed, full range) */}
      <polyline fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 4" points={forecastPts} />

      {/* actual line (solid, historical only) */}
      <polyline fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={actualPts} />
      {monthlyForecast.map((d, i) => d.actual !== null && (
        <circle key={i} cx={sx(i)} cy={sy(d.actual)} r="3.5" fill="var(--success)" />
      ))}
    </svg>
  );
};

const Forecasting = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const refreshTimer = useRef(null);

  useEffect(() => () => clearTimeout(refreshTimer.current), []);

  const period = PERIODS[selectedPeriod];
  const sections = TAB_SECTIONS[activeTab];
  const metrics = forecastMetrics
    .filter((m) => !sections.metrics || sections.metrics.includes(m.key))
    .map((m) => ({
      ...m,
      value: formatKes(m.amount * period.scale),
      confidenceLabel: `${m.confidence - period.confidencePenalty}%`,
    }));

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    refreshTimer.current = setTimeout(() => {
      setIsRefreshing(false);
      setRefreshedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      toast('Forecast refreshed with the latest data.');
    }, 1000);
  };

  const handleExport = () => {
    const metricRows = forecastMetrics.map((m) => ({
      section: 'Metric', name: m.title, period: period.label,
      current: '', forecast: m.amount * period.scale, change: formatChange(m.change),
      confidence: `${m.confidence - period.confidencePenalty}%`,
    }));
    const monthRows = monthlyForecast.map((d) => ({
      section: 'Revenue by month', name: d.month, period: '', current: d.actual ?? '', forecast: d.forecast, change: '', confidence: '',
    }));
    const inventoryRows = inventoryForecast.map((i) => ({
      section: 'Inventory', name: i.product, period: '', current: i.current, forecast: i.forecast, change: i.change, confidence: '',
    }));
    const csv = toCsv([...metricRows, ...monthRows, ...inventoryRows], [
      { key: 'section', label: 'Section' }, { key: 'name', label: 'Name' }, { key: 'period', label: 'Period' },
      { key: 'current', label: 'Current / Actual' }, { key: 'forecast', label: 'Forecast' },
      { key: 'change', label: 'Change' }, { key: 'confidence', label: 'Confidence' },
    ]);
    downloadFile('senzia-forecast.csv', csv, 'text/csv');
    toast('Forecast exported.');
  };

  return (
    <AppShell
      active="Forecasting"
      pageIcon={TrendingUp}
      title="Forecasting Center"
      subtitle="AI-powered predictions to help you plan, prepare and grow."
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerActions={
        <>
          <button className="btn btn-ghost" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw size={16} className={isRefreshing ? 'spin' : undefined} /> {isRefreshing ? 'Refreshing...' : 'Refresh Forecast'}
          </button>
          <button className="btn btn-violet" onClick={handleExport}><Download size={16} /> Export Forecast</button>
        </>
      }
    >
      <div className="forecasting-layout">
        <div className="content-stack">

          {/* ---- Period selector ---- */}
          <div className="period-selector">
            {['Month', 'Quarter', 'Year'].map((p) => (
              <button
                key={p}
                className={`btn btn-sm ${selectedPeriod === p.toLowerCase() ? 'btn-outline-accent' : 'btn-ghost'}`}
                onClick={() => setSelectedPeriod(p.toLowerCase())}
              >
                {p}
              </button>
            ))}
            {refreshedAt && <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Updated {refreshedAt}</span>}
          </div>

          {/* ---- Forecast metric cards ---- */}
          {metrics.length > 0 && (
          <div className="forecast-metric-grid">
            {metrics.map(({ title, value, change, confidenceLabel, icon: Icon, color, bg, trend }) => (
              <div className="forecast-metric-card" key={title}>
                <div className="forecast-metric-top">
                  <div className="forecast-metric-icon" style={{ background: bg, color }}><Icon size={16} /></div>
                  <span>{title}</span>
                </div>
                <p className="forecast-metric-value">{value}</p>
                <div className="forecast-metric-foot">
                  <span className="forecast-metric-change" style={{ color: trend === 'up' ? 'var(--success)' : 'var(--danger)' }}>{formatChange(change)}</span>
                  <span className="confidence-chip">Confidence: {confidenceLabel}</span>
                </div>
                <p className="forecast-metric-period">{period.label}</p>
              </div>
            ))}
          </div>
          )}

          {/* ---- Revenue forecast chart ---- */}
          {sections.chart && (
          <div className="panel">
            <div className="chart-panel-top">
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Revenue Forecast</h3>
                <p>Actual vs Forecasted Revenue</p>
              </div>
              <div className="chart-legend-row" style={{ marginBottom: 0 }}>
                <div className="chart-legend-item"><span className="chart-legend-swatch" style={{ background: 'var(--success)' }} /> Actual</div>
                <div className="chart-legend-item"><span className="chart-legend-swatch" style={{ background: 'var(--accent)' }} /> Forecast</div>
              </div>
            </div>
            <ForecastChart />
            <p className="forecast-note">* Forecasted values</p>
          </div>
          )}

          {/* ---- Inventory + Demand ---- */}
          {(sections.inventory || sections.demand) && (
          <div className="two-col">
            {sections.inventory && (
            <div className="panel">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>Inventory Forecast</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="num">Current</th>
                    <th className="num">Forecast</th>
                    <th className="num">Change</th>
                    <th className="center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryForecast.map((item) => {
                    const chip = statusChip[item.status];
                    return (
                      <tr key={item.product}>
                        <td style={{ fontWeight: 500 }}>{item.product}</td>
                        <td className="num">{item.current}</td>
                        <td className="num">{item.forecast}</td>
                        <td className="num" style={{ color: item.change.startsWith('+') ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{item.change}</td>
                        <td className="center"><span className="status-chip-sm" style={{ background: chip.bg, color: chip.color }}>{chip.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            )}

            {sections.demand && (
            <div className="panel">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>Demand Forecast</h3>
              {demandForecast.map((item) => (
                <div className="demand-row" key={item.category}>
                  <div className="demand-row-top">
                    <span>{item.category}</span>
                    <span style={{ fontWeight: 600 }}>
                      {item.forecast}% <span style={{ color: item.change.startsWith('+') ? 'var(--success)' : 'var(--danger)', fontWeight: 400 }}>({item.change})</span>
                    </span>
                  </div>
                  <div className="demand-bars">
                    <div className="demand-bar-track"><div className="demand-bar-fill" style={{ width: `${item.current}%`, background: 'var(--text-tertiary)' }} /></div>
                    <div className="demand-bar-track"><div className="demand-bar-fill" style={{ width: `${item.forecast}%`, background: 'var(--accent)' }} /></div>
                  </div>
                  <div className="demand-row-labels">
                    <span>Current: {item.current}%</span>
                    <span>Forecast: {item.forecast}%</span>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
          )}

          {/* ---- AI insights ---- */}
          {sections.insights && (
          <div className="panel">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem' }}>AI Forecast Insights</h3>
            <div className="insight-grid">
              {forecastInsights.map(({ title, description, type, icon: Icon }) => (
                <div className={`forecast-insight-card ${type}`} key={title}>
                  <Icon size={18} color={type === 'positive' ? 'var(--success)' : 'var(--warning)'} />
                  <div>
                    <p>{title}</p>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* ---- Need help ---- */}
          <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <HelpCircle size={22} color="var(--accent)" />
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
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card violet-card">
            <div className="violet-card-title-row">
              <h4>Forecast Summary</h4>
              <span className="pill" style={{ background: 'var(--violet-soft)', color: 'var(--violet)' }}>AI Generated</span>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 1rem' }}>
              Overall outlook is positive. Revenue is expected to grow steadily next month, driven by consistent demand.
              Keep an eye on inventory levels for Product E and operational expenses.
            </p>
            <button className="btn btn-violet btn-block" onClick={() => setShowSummary(true)}>View Full Summary →</button>
          </div>
        </div>
      </div>

      {showSummary && (
        <Modal title="Forecast Summary" onClose={() => setShowSummary(false)} footer={<button type="button" className="btn btn-ghost" onClick={() => setShowSummary(false)}>Close</button>}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Outlook for {PERIODS[selectedPeriod].label.toLowerCase()}. Figures are scaled from the monthly model, so longer horizons carry lower confidence.
          </p>
          {forecastMetrics.map((m) => (
            <div className="modal-detail-row" key={m.key}>
              <span>{m.title}</span>
              <span>{formatKes(m.amount * period.scale)} ({formatChange(m.change)})</span>
            </div>
          ))}
          {forecastInsights.map((insight) => (
            <p key={insight.title} style={{ margin: 0, fontSize: '0.84rem' }}>
              <strong>{insight.title}.</strong> <span style={{ color: 'var(--text-secondary)' }}>{insight.description}</span>
            </p>
          ))}
        </Modal>
      )}
    </AppShell>
  );
};

export default Forecasting;