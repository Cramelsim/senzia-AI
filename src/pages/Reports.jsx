import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  Download,
  Share2,
  Clock,
  Plus,
  Eye,
  Mail,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  MoreVertical,
  FileDown,
} from 'lucide-react';
import AppShell from './AppShell';
import './Reports.css';

const reportTypes = [
  { id: 'financial', title: 'Financial Performance Report', items: ['Revenue', 'Profit', 'Expenses', 'Cash Flow', 'Margins'], lastGenerated: 'Today 8:00 AM', icon: TrendingUp, color: 'var(--success)', bg: 'var(--success-soft)' },
  { id: 'fraud', title: 'Fraud & Risk Report', items: ['Suspicious transactions', 'Inventory discrepancies', 'Risk alerts', 'Employee activity anomalies'], lastGenerated: 'Today 7:30 AM', icon: Shield, color: 'var(--violet)', bg: 'var(--violet-soft)' },
  { id: 'forecast', title: 'Forecast Report', items: ['Revenue forecast', 'Inventory forecast', 'Demand forecast', 'Cash flow prediction'], lastGenerated: 'Today 8:15 AM', icon: BarChart3, color: 'var(--info)', bg: 'rgba(79,139,240,0.12)' },
  { id: 'opportunity', title: 'Opportunity Report', items: ['Profit opportunities', 'Upselling opportunities', 'Pricing recommendations', 'Cost reduction opportunities'], lastGenerated: 'Today 8:15 AM', icon: Zap, color: 'var(--warning)', bg: 'var(--warning-soft)', potentialImpact: 'KES 185,000' },
];

const scheduledReports = [
  { id: 1, name: 'Executive Summary', frequency: 'Daily', delivery: 'Email', nextRun: 'Today, 5:00 PM', recipients: '3', status: 'active' },
  { id: 2, name: 'Financial Report', frequency: 'Weekly', delivery: 'PDF', nextRun: 'Tomorrow, 8:00 AM', recipients: '5', status: 'active' },
  { id: 3, name: 'Forecast Report', frequency: 'Weekly', delivery: 'WhatsApp', nextRun: 'Tomorrow, 9:00 AM', recipients: '2', status: 'active' },
  { id: 4, name: 'Opportunity Report', frequency: 'Monthly', delivery: 'Email', nextRun: 'Jun 1, 2025, 8:00 AM', recipients: '4', status: 'pending' },
];

/* Transcribed from the reference screenshot — your source code has no "recent reports"
   list distinct from the report types above, so this is new UI, not new business logic. */
const recentReports = [
  { name: 'Executive Summary - May 2025', generated: 'Generated Today 8:00 AM', pages: 12 },
  { name: 'Monthly Business Performance', generated: 'Generated Yesterday, 4:30 PM', pages: 18 },
  { name: 'Sales & Revenue Analysis', generated: 'Generated May 11, 2025', pages: 15 },
  { name: 'Cash Flow & Expenses Report', generated: 'Generated May 10, 2025', pages: 20 },
  { name: 'Opportunity Analysis Report', generated: 'Generated May 9, 2025', pages: 16 },
];

const overviewStats = [
  { label: 'Reports Generated', sub: 'This Month', value: '127', trend: '+18% vs last month', icon: FileText, color: 'var(--success)', bg: 'var(--success-soft)' },
  { label: 'Scheduled Reports', sub: 'Active schedules', value: '12', trend: '+9% vs last month', icon: Clock, color: 'var(--violet)', bg: 'var(--violet-soft)' },
  { label: 'Downloads', sub: 'This Month', value: '348', trend: '+21% vs last month', icon: Download, color: 'var(--info)', bg: 'rgba(79,139,240,0.12)' },
  { label: 'Shared Reports', sub: 'This Month', value: '95', trend: '+14% vs last month', icon: Share2, color: 'var(--warning)', bg: 'var(--warning-soft)' },
];

const aiInsights = [
  { type: 'positive', title: 'Revenue increased 12% this week', description: 'Driven by strong performance in E-Commerce and Retail channels.' },
  { type: 'warning', title: 'Inventory losses detected in Branch 2', description: 'Value: KES 23,450 — review stock handling procedures.' },
  { type: 'positive', title: 'Forecast indicates 18% growth next month', description: 'Expected revenue to reach KES 2.4M in June.' },
  { type: 'opportunity', title: 'Opportunity Engine identified', description: 'KES 75,000 additional profit potential — 5 high-impact opportunities.' },
];

const statusPill = { active: 'pill-success', pending: 'pill-warning', inactive: 'pill-danger' };
const statusLabel = { active: 'Active', pending: 'Pending', inactive: 'Inactive' };

const Reports = () => {
  return (
    <AppShell
      active="Reports"
      pageIcon={FileText}
      title="Reports Center"
      subtitle="Generate, schedule, download and share business intelligence reports across your organization."
      headerActions={
        <>
          <button className="btn btn-violet"><Plus size={16} /> Generate Report</button>
          <button className="btn btn-ghost"><Clock size={16} /> Schedule Report</button>
          <button className="btn btn-ghost"><FileDown size={16} /> Export PDF</button>
          <button className="btn btn-ghost"><FileDown size={16} /> Export Excel</button>
        </>
      }
    >
      <div className="reports-layout">
        <div className="content-stack">

          {/* ---- Report type cards ---- */}
          <div className="report-type-grid">
            {reportTypes.map(({ id, title, items, lastGenerated, icon: Icon, color, bg, potentialImpact }) => (
              <div className="report-type-card" key={id}>
                <div className="report-type-icon" style={{ background: bg, color }}><Icon size={19} /></div>
                <h4>{title}</h4>
                <div className="report-checklist">
                  {items.map((item) => (
                    <div className="report-checklist-item" key={item}>
                      <CheckCircle size={13} color={color} /> {item}
                    </div>
                  ))}
                </div>
                <div className="report-generated"><Clock size={12} /> Last Generated: {lastGenerated}</div>
                {potentialImpact && <span className="report-impact">Potential Impact: {potentialImpact}</span>}
                <button className="btn btn-outline-accent btn-sm btn-block">View Report →</button>
              </div>
            ))}
          </div>

          {/* ---- Scheduled + Recent ---- */}
          <div className="two-col-reports">
            <div className="panel">
              <div className="panel-head">
                <h3>Scheduled Reports</h3>
                <button className="btn btn-ghost btn-sm"><Plus size={14} /> Schedule</button>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Report</th>
                    <th>Frequency</th>
                    <th>Delivery</th>
                    <th>Next Run</th>
                    <th className="center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledReports.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 500 }}>{r.name}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{r.frequency}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          {r.delivery === 'WhatsApp' ? <MessageCircle size={13} /> : <Mail size={13} />} {r.delivery}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{r.nextRun}</td>
                      <td className="center"><span className={`pill ${statusPill[r.status]}`}>{statusLabel[r.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-footer">
                <span>Showing 1 to {scheduledReports.length} of {scheduledReports.length} results</span>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Recent Reports</h3>
                <Link to="/reports/all" className="link-accent">View All</Link>
              </div>
              {recentReports.map((r) => (
                <div className="recent-report-row" key={r.name}>
                  <div className="recent-report-icon"><FileText size={16} /></div>
                  <div style={{ minWidth: 0 }}>
                    <p>{r.name}</p>
                    <p>{r.generated} · Pages: {r.pages}</p>
                  </div>
                  <div className="recent-report-actions">
                    <button className="icon-btn" aria-label="View"><Eye size={14} /></button>
                    <button className="icon-btn" aria-label="Share"><Share2 size={14} /></button>
                    <button className="icon-btn" aria-label="More"><MoreVertical size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card">
            <h4>Reports Overview</h4>
            {overviewStats.map(({ label, sub, value, trend, icon: Icon, color, bg }) => (
              <div className="overview-row" key={label}>
                <div className="overview-icon" style={{ background: bg, color }}><Icon size={16} /></div>
                <div>
                  <p className="overview-row-value">{value}</p>
                  <p className="overview-row-label">{label} · {sub}</p>
                </div>
                <span className="overview-row-trend">↑ {trend.replace('+', '').replace(' vs last month', '')}</span>
              </div>
            ))}
          </div>

          <div className="rail-card violet-card">
            <div className="violet-card-title-row">
              <h4>AI Insights</h4>
            </div>
            {aiInsights.map(({ type, title, description }) => (
              <div key={title} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.9rem', alignItems: 'flex-start' }}>
                {type === 'positive' ? <CheckCircle size={15} color="var(--success)" style={{ marginTop: '0.1rem', flexShrink: 0 }} /> :
                  type === 'warning' ? <AlertCircle size={15} color="var(--danger)" style={{ marginTop: '0.1rem', flexShrink: 0 }} /> :
                  <Zap size={15} color="var(--warning)" style={{ marginTop: '0.1rem', flexShrink: 0 }} />}
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{title}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0' }}>{description}</p>
                </div>
              </div>
            ))}
            <Link to="/insights">
              <button className="btn btn-violet btn-block">View All Insights →</button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Reports;