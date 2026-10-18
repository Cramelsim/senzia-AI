import React, { useState } from 'react';
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
  FileDown,
} from 'lucide-react';
import AppShell from './AppShell';
import Modal from '../Modal';
import { useToast } from '../Toast';
import { downloadFile, toCsv, slugify, copyText } from '../download';
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
  { name: 'Fraud & Risk Review - Q1', generated: 'Generated May 2, 2025', pages: 22 },
  { name: 'Inventory Forecast - April', generated: 'Generated Apr 30, 2025', pages: 14 },
  { name: 'Weekly Revenue Snapshot', generated: 'Generated Apr 28, 2025', pages: 6 },
];

const RECENT_PREVIEW = 5;
const FREQUENCIES = ['Daily', 'Weekly', 'Monthly'];
const DELIVERIES = ['Email', 'PDF', 'WhatsApp'];
const PERIODS = ['Today', 'Last 7 days', 'Last 30 days', 'This quarter'];

const formatStamp = () =>
  `Today ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;

const reportBody = (title, items, generated) =>
  [title, '='.repeat(title.length), `${generated}`, '', 'Includes:', ...items.map((i) => `  - ${i}`), ''].join('\n');

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
  const toast = useToast();
  const [types, setTypes] = useState(reportTypes);
  const [recent, setRecent] = useState(recentReports);
  const [scheduled, setScheduled] = useState(scheduledReports);
  const [showAllRecent, setShowAllRecent] = useState(false);
  const [modal, setModal] = useState(null); // { kind: 'generate' | 'schedule' | 'view', report? }
  const [generateForm, setGenerateForm] = useState({ typeId: reportTypes[0].id, period: PERIODS[1] });
  const [scheduleForm, setScheduleForm] = useState({ typeId: reportTypes[0].id, frequency: 'Weekly', delivery: 'Email', recipients: '1' });

  const visibleRecent = showAllRecent ? recent : recent.slice(0, RECENT_PREVIEW);
  const closeModal = () => setModal(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    const type = types.find((t) => t.id === generateForm.typeId);
    const stamp = formatStamp();
    setTypes((list) => list.map((t) => (t.id === type.id ? { ...t, lastGenerated: stamp } : t)));
    setRecent((list) => [
      { name: `${type.title} - ${generateForm.period}`, generated: `Generated ${stamp}`, pages: 8 + Math.floor(Math.random() * 14), typeId: type.id },
      ...list,
    ]);
    closeModal();
    toast(`${type.title} generated.`);
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    const type = types.find((t) => t.id === scheduleForm.typeId);
    const recipients = Number.parseInt(scheduleForm.recipients, 10);
    if (!Number.isInteger(recipients) || recipients < 1) {
      toast('Enter at least one recipient.', 'error');
      return;
    }
    const nextRun = { Daily: 'Tomorrow, 8:00 AM', Weekly: 'Next week, 8:00 AM', Monthly: 'Next month, 8:00 AM' }[scheduleForm.frequency];
    setScheduled((list) => [
      ...list,
      { id: Date.now(), name: type.title.replace(' Report', '') + ' Report', frequency: scheduleForm.frequency, delivery: scheduleForm.delivery, nextRun, recipients: String(recipients), status: 'active' },
    ]);
    closeModal();
    toast(`${type.title} scheduled ${scheduleForm.frequency.toLowerCase()}.`);
  };

  const toggleSchedule = (id) => {
    const target = scheduled.find((r) => r.id === id);
    if (!target) return;
    const status = target.status === 'active' ? 'inactive' : 'active';
    setScheduled((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
    toast(`${target.name} ${status === 'active' ? 'resumed' : 'paused'}.`, 'info');
  };

  const downloadType = (type) => {
    downloadFile(`${slugify(type.title)}.txt`, reportBody(type.title, type.items, `Last generated: ${type.lastGenerated}`));
    toast('Report downloaded.');
  };

  const downloadRecent = (report) => {
    downloadFile(`${slugify(report.name)}.txt`, reportBody(report.name, [`${report.pages} pages`], report.generated));
    toast('Report downloaded.');
  };

  const shareRecent = async (report) => {
    const copied = await copyText(`${window.location.origin}/reports#${slugify(report.name)}`);
    toast(copied ? 'Report link copied to clipboard.' : 'Could not copy the link.', copied ? 'success' : 'error');
  };

  const exportExcel = () => {
    const csv = toCsv(scheduled, [
      { key: 'name', label: 'Report' },
      { key: 'frequency', label: 'Frequency' },
      { key: 'delivery', label: 'Delivery' },
      { key: 'nextRun', label: 'Next Run' },
      { key: 'recipients', label: 'Recipients' },
      { key: 'status', label: 'Status' },
    ]);
    downloadFile('senzia-reports.csv', csv, 'text/csv');
    toast('Exported as CSV (opens in Excel).');
  };

  const exportPdf = () => {
    toast('Choose "Save as PDF" in the print dialog.', 'info');
    setTimeout(() => window.print(), 300);
  };

  return (
    <AppShell
      active="Reports"
      pageIcon={FileText}
      title="Reports Center"
      subtitle="Generate, schedule, download and share business intelligence reports across your organization."
      headerActions={
        <>
          <button className="btn btn-violet" onClick={() => setModal({ kind: 'generate' })}><Plus size={16} /> Generate Report</button>
          <button className="btn btn-ghost" onClick={() => setModal({ kind: 'schedule' })}><Clock size={16} /> Schedule Report</button>
          <button className="btn btn-ghost" onClick={exportPdf}><FileDown size={16} /> Export PDF</button>
          <button className="btn btn-ghost" onClick={exportExcel}><FileDown size={16} /> Export Excel</button>
        </>
      }
    >
      <div className="reports-layout">
        <div className="content-stack">

          {/* ---- Report type cards ---- */}
          <div className="report-type-grid">
            {types.map((type) => { const { id, title, items, lastGenerated, icon: Icon, color, bg, potentialImpact } = type; return (
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
                <button className="btn btn-outline-accent btn-sm btn-block" onClick={() => setModal({ kind: 'view', report: type })}>View Report →</button>
              </div>
            ); })}
          </div>

          {/* ---- Scheduled + Recent ---- */}
          <div className="two-col-reports">
            <div className="panel">
              <div className="panel-head">
                <h3>Scheduled Reports</h3>
                <button className="btn btn-ghost btn-sm" onClick={() => setModal({ kind: 'schedule' })}><Plus size={14} /> Schedule</button>
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
                  {scheduled.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 500 }}>{r.name}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{r.frequency}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          {r.delivery === 'WhatsApp' ? <MessageCircle size={13} /> : <Mail size={13} />} {r.delivery}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{r.nextRun}</td>
                      <td className="center">
                        <button
                          type="button"
                          className={`pill ${statusPill[r.status]}`}
                          style={{ border: 'none', cursor: 'pointer', font: 'inherit', fontSize: '0.68rem', fontWeight: 700 }}
                          title={r.status === 'active' ? 'Click to pause' : 'Click to resume'}
                          onClick={() => toggleSchedule(r.id)}
                        >
                          {statusLabel[r.status]}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="table-footer">
                <span>Showing 1 to {scheduled.length} of {scheduled.length} results</span>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Recent Reports</h3>
                {recent.length > RECENT_PREVIEW && (
                  <button type="button" className="link-accent" onClick={() => setShowAllRecent((v) => !v)}>
                    {showAllRecent ? 'Show Less' : 'View All'}
                  </button>
                )}
              </div>
              {visibleRecent.map((r) => (
                <div className="recent-report-row" key={`${r.name}-${r.generated}`}>
                  <div className="recent-report-icon"><FileText size={16} /></div>
                  <div style={{ minWidth: 0 }}>
                    <p>{r.name}</p>
                    <p>{r.generated} · Pages: {r.pages}</p>
                  </div>
                  <div className="recent-report-actions">
                    <button className="icon-btn" aria-label={`View ${r.name}`} onClick={() => setModal({ kind: 'view', report: { title: r.name, items: [`${r.pages} pages`], lastGenerated: r.generated.replace('Generated ', ''), recent: r } })}><Eye size={14} /></button>
                    <button className="icon-btn" aria-label={`Share ${r.name}`} onClick={() => shareRecent(r)}><Share2 size={14} /></button>
                    <button className="icon-btn" aria-label={`Download ${r.name}`} onClick={() => downloadRecent(r)}><Download size={14} /></button>
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

      {modal?.kind === 'generate' && (
        <Modal
          title="Generate Report"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button type="submit" form="generate-report-form" className="btn btn-violet">Generate</button>
            </>
          }
        >
          <form id="generate-report-form" onSubmit={handleGenerate} style={{ display: 'grid', gap: '0.9rem' }}>
            <div className="modal-field">
              <label htmlFor="gen-type">Report type</label>
              <select id="gen-type" value={generateForm.typeId} onChange={(e) => setGenerateForm({ ...generateForm, typeId: e.target.value })}>
                {types.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label htmlFor="gen-period">Period</label>
              <select id="gen-period" value={generateForm.period} onChange={(e) => setGenerateForm({ ...generateForm, period: e.target.value })}>
                {PERIODS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </form>
        </Modal>
      )}

      {modal?.kind === 'schedule' && (
        <Modal
          title="Schedule Report"
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button type="submit" form="schedule-report-form" className="btn btn-violet">Schedule</button>
            </>
          }
        >
          <form id="schedule-report-form" onSubmit={handleSchedule} style={{ display: 'grid', gap: '0.9rem' }}>
            <div className="modal-field">
              <label htmlFor="sch-type">Report type</label>
              <select id="sch-type" value={scheduleForm.typeId} onChange={(e) => setScheduleForm({ ...scheduleForm, typeId: e.target.value })}>
                {types.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label htmlFor="sch-frequency">Frequency</label>
              <select id="sch-frequency" value={scheduleForm.frequency} onChange={(e) => setScheduleForm({ ...scheduleForm, frequency: e.target.value })}>
                {FREQUENCIES.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label htmlFor="sch-delivery">Delivery</label>
              <select id="sch-delivery" value={scheduleForm.delivery} onChange={(e) => setScheduleForm({ ...scheduleForm, delivery: e.target.value })}>
                {DELIVERIES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label htmlFor="sch-recipients">Recipients</label>
              <input id="sch-recipients" type="number" min="1" value={scheduleForm.recipients} onChange={(e) => setScheduleForm({ ...scheduleForm, recipients: e.target.value })} />
            </div>
          </form>
        </Modal>
      )}

      {modal?.kind === 'view' && (
        <Modal
          title={modal.report.title}
          onClose={closeModal}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={closeModal}>Close</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => (modal.report.recent ? downloadRecent(modal.report.recent) : downloadType(modal.report))}
              >
                <Download size={15} /> Download
              </button>
            </>
          }
        >
          <div className="modal-detail-row"><span>Last generated</span><span>{modal.report.lastGenerated}</span></div>
          <div>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{modal.report.recent ? 'Details' : 'Includes'}</p>
            {modal.report.items.map((item) => (
              <div className="report-checklist-item" key={item}><CheckCircle size={13} color="var(--success)" /> {item}</div>
            ))}
          </div>
        </Modal>
      )}
    </AppShell>
  );
};

export default Reports;