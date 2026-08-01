import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  TrendingUp,
  DollarSign,
  Zap,
  Bot,
  User,
  Sparkles,
  BarChart3,
  PieChart,
  Search,
  CheckCircle,
  ChevronRight,
  Database,
  Activity,
  FileText,
  ShieldCheck,
  Radio,
} from 'lucide-react';
import AppShell from './AppShell';
import './AIAssistant.css';

const suggestedActions = [
  { icon: BarChart3, label: 'Sales Performance Analysis', description: "Get a detailed analysis of your sales performance with key insights.", color: 'var(--success)', cta: 'Run Analysis' },
  { icon: PieChart, label: 'Profitability Insights', description: "Discover what's driving your profits and where you can improve.", color: 'var(--violet)', cta: 'Explore' },
  { icon: DollarSign, label: 'Expense Breakdown', description: 'Understand your expenses and identify cost saving opportunities.', color: 'var(--warning)', cta: 'Analyze' },
  { icon: Activity, label: 'Cash Flow Forecast', description: 'Predict your cash flow and get recommendations.', color: 'var(--info)', cta: 'Forecast' },
];

const recentConversations = [
  { question: 'Why did my profits drop last month?', time: 'May 12, 2025 – 10:30 AM' },
  { question: 'Show me sales trends for the last 6 months', time: 'May 12, 2025 – 09:15 AM' },
  { question: 'Which products are most profitable?', time: 'May 11, 2025 – 04:45 PM' },
  { question: 'What are my top expense categories?', time: 'May 11, 2025 – 02:20 PM' },
];

const dataHealth = [
  { label: 'Financial Analysis', icon: Database },
  { label: 'Sales Analysis', icon: BarChart3 },
  { label: 'Product Analysis', icon: PieChart },
  { label: 'Expense Analysis', icon: DollarSign },
];

const quickActions = [
  { icon: FileText, label: 'Generate Report' },
  { icon: TrendingUp, label: 'Create Forecast' },
  { icon: Search, label: 'Analyze Data' },
  { icon: Zap, label: 'Optimize Performance' },
  { icon: Bot, label: 'Ask Senzia AI' },
];

const aiInsights = [
  { title: 'Revenue increased 18.6% this week', description: 'Driven by strong performance in E-Commerce and Retail channels.', icon: TrendingUp, color: 'var(--success)' },
  { title: 'Inventory losses detected', description: 'Branch 2 has 32% higher losses than usual. Review recommended.', icon: Zap, color: 'var(--warning)' },
  { title: 'Forecast indicates 18% growth', description: 'Expected revenue to reach KES 2.4M in June.', icon: BarChart3, color: 'var(--info)' },
];

const botResponses = [
  "Based on your data, I can see that your revenue is up 18.6% this week. Your E-Commerce sales are driving growth. 📈",
  "I've analyzed your expenses. Office Supplies are 32% higher than usual - this is a key area to review. 💡",
  'Great question! Your top 3 performing products are Product A, Product B, and Product C. They account for 62% of your revenue. 🏆',
  'Looking at your cash flow, I predict a 15% increase next month based on current trends. Your cash position is healthy. 💰',
];

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello John! 🎉 How can I help you grow your business today?',
      timestamp: '10:30 AM',
      suggestions: ['Analyze my sales performance', 'Why did expenses increase?', 'Show revenue forecast', 'Find growth opportunities'],
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendText = (text) => {
    if (!text.trim()) return;
    const userMessage = { id: Date.now(), type: 'user', content: text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = () => sendText(inputMessage);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AppShell active="AI Assistant" pageIcon={Sparkles} title="AI Assistant" subtitle="Your intelligent business partner powered by advanced AI">
      <div className="ai-layout">
        <div className="content-stack">

          <div className="ai-header-row">
            <div className="ai-badge-row">
              <span className="ai-badge"><Zap size={12} /> Powered by Senzia AI 3.0</span>
              <span className="ai-badge"><Radio size={12} /> Real-time data</span>
              <span className="ai-badge"><ShieldCheck size={12} /> Secure & Private</span>
            </div>
            <div className="ai-mascot">🙂</div>
          </div>

          {/* ---- Chat ---- */}
          <div className="chat-panel">
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`chat-row ${message.type}`}>
                    <div className={`chat-avatar ${message.type}`}>
                      {message.type === 'bot' ? <Bot size={15} /> : <User size={15} />}
                    </div>
                    <div className={`chat-bubble ${message.type}`}>
                      <p>{message.content}</p>
                      <p className="chat-time">{message.timestamp}</p>
                    </div>
                  </div>
                  {message.suggestions && (
                    <div className="chat-suggestions" style={{ marginLeft: '2.4rem' }}>
                      {message.suggestions.map((s) => (
                        <button key={s} className="chat-suggestion-chip" onClick={() => sendText(s)}>{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="chat-row bot">
                  <div className="chat-avatar bot"><Bot size={15} /></div>
                  <div className="chat-bubble bot">
                    <div className="typing-dots"><span /><span /><span /></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-row">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about your business..."
              />
              <button className="chat-send-btn" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send size={17} />
              </button>
            </div>
          </div>

          {/* ---- Suggested for you ---- */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.85rem' }}>Suggested for You</h3>
            <div className="suggested-grid">
              {suggestedActions.map(({ icon: Icon, label, description, color, cta }) => (
                <button className="suggested-card" key={label} onClick={() => sendText(label)}>
                  <Icon size={20} color={color} />
                  <h4>{label}</h4>
                  <p>{description}</p>
                  <span className="suggested-card-action" style={{ color }}>{cta} →</span>
                </button>
              ))}
            </div>
          </div>

          {/* ---- Recent conversations ---- */}
          <div className="panel">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Recent Conversations</h3>
            {recentConversations.map((c) => (
              <div className="conv-row" key={c.question} onClick={() => sendText(c.question)}>
                <p>{c.question}</p>
                <p>{c.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ============ RIGHT RAIL ============ */}
        <div className="rail-stack">
          <div className="rail-card violet-card">
            <div className="violet-card-title-row">
              <h4>AI Insights</h4>
              <span className="pill" style={{ background: 'var(--violet-soft)', color: 'var(--violet)' }}>New</span>
              <Link to="/insights" className="link-violet" style={{ marginLeft: 'auto' }}>View all</Link>
            </div>
            {aiInsights.map(({ title, description, icon: Icon, color }) => (
              <div className="ai-insight-row" key={title} style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.9rem', alignItems: 'flex-start' }}>
                <Icon size={16} color={color} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>{title}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0' }}>{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rail-card">
            <h4>Quick Actions</h4>
            {quickActions.map(({ icon: Icon, label }) => (
              <div className="quick-action-row" key={label} onClick={() => sendText(label)}>
                <div className="quick-action-row-left"><Icon size={15} color="var(--accent)" /> {label}</div>
                <ChevronRight size={14} color="var(--text-tertiary)" />
              </div>
            ))}
          </div>

          <div className="rail-card">
            <div className="systems-banner">
              <div className="systems-banner-icon"><CheckCircle size={17} /></div>
              <div>
                <p>Systems Operational</p>
                <p>Your data is fresh and up to date.</p>
              </div>
            </div>
            <div className="health-meta-row"><span>Last Data Sync</span><strong>2 min ago</strong></div>
            <div className="health-meta-row"><span>Data Sources</span><strong>24 Active</strong></div>
            <div className="health-meta-row" style={{ borderTop: 'none', paddingTop: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
              {dataHealth.map(({ label, icon: Icon }) => (
                <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>
                  <Icon size={12} color="var(--success)" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default AIAssistant;