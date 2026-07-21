import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, 
  MessageCircle, 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  Zap,
  Clock,
  Bot,
  User,
  Sparkles,
  BarChart3,
  PieChart,
  Search,
  MoreVertical,
  CheckCircle,
  ChevronRight,
  Brain,
  Database,
  Shield,
  Activity,
  FileText
} from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello John! 🎉 How can I help you grow your business today?",
      timestamp: '10:30 AM',
      suggestions: [
        'Analyze my sales performance',
        'Why did expenses increase?',
        'Show revenue forecast',
        'Find growth opportunities'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Suggested actions
  const suggestedActions = [
    { icon: BarChart3, label: 'Sales Performance Analysis', description: 'Get a detailed analysis of your sales performance with key insights.', color: '#7c3aed' },
    { icon: TrendingUp, label: 'Profitability Insights', description: 'Discover what\'s driving your profits and where you can improve.', color: '#22c55e' },
    { icon: DollarSign, label: 'Expense Breakdown', description: 'Understand your expenses and identify cost saving opportunities.', color: '#f59e0b' },
    { icon: Activity, label: 'Cash Flow Forecast', description: 'Predict your cash flow and get recommendations.', color: '#3b82f6' }
  ];

  // Recent conversations
  const recentConversations = [
    { question: 'Why did my profits drop last month?', time: 'May 12, 2025 – 10:30 AM' },
    { question: 'Show me sales trends for the last 6 months', time: 'May 12, 2025 – 09:15 AM' },
    { question: 'Which products are most profitable?', time: 'May 11, 2025 – 04:45 PM' },
    { question: 'What are my top expense categories?', time: 'May 11, 2025 – 02:20 PM' }
  ];

  // Data health metrics
  const dataHealth = [
    { label: 'Financial Analysis', status: 'healthy', icon: Database },
    { label: 'Sales Analysis', status: 'healthy', icon: BarChart3 },
    { label: 'Product Analysis', status: 'healthy', icon: PieChart },
    { label: 'Expense Analysis', status: 'healthy', icon: DollarSign }
  ];

  // Quick actions
  const quickActions = [
    { icon: FileText, label: 'Generate Report', color: '#7c3aed' },
    { icon: TrendingUp, label: 'Create Forecast', color: '#22c55e' },
    { icon: Search, label: 'Analyze Data', color: '#f59e0b' },
    { icon: Zap, label: 'Optimize Performance', color: '#ec4899' },
    { icon: Bot, label: 'Ask Senzia AI', color: '#3b82f6' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your data, I can see that your revenue is up 18.6% this week. Your E-Commerce sales are driving growth. 📈",
        "I've analyzed your expenses. Office Supplies are 32% higher than usual - this is a key area to review. 💡",
        "Great question! Your top 3 performing products are Product A, Product B, and Product C. They account for 62% of your revenue. 🏆",
        "Looking at your cash flow, I predict a 15% increase next month based on current trends. Your cash position is healthy. 💰"
      ];
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    // Auto-send after setting the message
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0.75rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'white'
              }}>
                SZ
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a1a' }}>SENZIA</span>
            </Link>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginLeft: '1rem' }}>
              <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
              <Link to="/data-sources" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Data Sources</Link>
              <Link to="/reports" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Reports</Link>
              <Link to="/ai-assistant" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>AI Assistant</Link>
              <Link to="/insights" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Insights</Link>
              <Link to="/settings" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Settings</Link>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}>
              JM
            </div>
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '2rem'
        }}>
          {/* Main Chat Area */}
          <div>
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a1a' }}>AI Assistant</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Your intelligent business partner powered by advanced AI
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  background: '#f3e8ff',
                  color: '#7c3aed',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  <Sparkles size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  Powered by Senzia AI 3.0
                </span>
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Messages Container */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: message.type === 'bot' ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: message.type === 'bot' ? 'white' : '#6b7280'
                    }}>
                      {message.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div style={{
                      maxWidth: '70%',
                      padding: '0.75rem 1rem',
                      borderRadius: message.type === 'bot' ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                      background: message.type === 'bot' ? '#f3f4f6' : '#7c3aed',
                      color: message.type === 'bot' ? '#1a1a1a' : 'white'
                    }}>
                      <p style={{ fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{message.content}</p>
                      <p style={{
                        fontSize: '0.7rem',
                        color: message.type === 'bot' ? 'var(--text-secondary)' : 'rgba(255,255,255,0.7)',
                        marginTop: '0.25rem',
                        textAlign: message.type === 'user' ? 'right' : 'left'
                      }}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <Bot size={16} />
                    </div>
                    <div style={{
                      padding: '0.75rem 1rem',
                      background: '#f3f4f6',
                      borderRadius: '12px'
                    }}>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#7c3aed',
                          animation: 'bounce 1.4s infinite ease-in-out both',
                          animationDelay: '-0.32s'
                        }} />
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#7c3aed',
                          animation: 'bounce 1.4s infinite ease-in-out both',
                          animationDelay: '-0.16s'
                        }} />
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#7c3aed',
                          animation: 'bounce 1.4s infinite ease-in-out both'
                        }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div style={{
                padding: '1rem',
                borderTop: '1px solid #f0f0f0',
                background: 'white'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything about your business..."
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: inputMessage.trim() ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : '#e5e7eb',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Suggested Actions */}
            <div style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1a1a1a', marginBottom: '0.75rem' }}>
                Suggested for You
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {suggestedActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(action.label)}
                      style={{
                        padding: '0.75rem',
                        background: 'white',
                        border: '1px solid #f0f0f0',
                        borderRadius: '8px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <Icon size={16} color={action.color} />
                        <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.85rem' }}>{action.label}</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                        {action.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div>
            {/* Plan Info */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>Professional Plan</h3>
                <span style={{
                  background: '#dcfce7',
                  color: '#22c55e',
                  padding: '0.15rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  Active
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Renews on June 12, 2025</p>
              <Link to="/pricing">
                <button style={{
                  marginTop: '0.75rem',
                  padding: '0.4rem 1rem',
                  border: '1px solid #7c3aed',
                  borderRadius: '6px',
                  background: 'transparent',
                  color: '#7c3aed',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}>
                  Manage Plan
                </button>
              </Link>
            </div>

            {/* Recent Conversations */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Recent Conversations
              </h3>
              {recentConversations.map((conv, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(conv.question)}
                  style={{
                    padding: '0.75rem 0',
                    borderBottom: index < recentConversations.length - 1 ? '1px solid #f5f5f5' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <p style={{ fontSize: '0.9rem', color: '#1a1a1a', fontWeight: 500 }}>{conv.question}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{conv.time}</p>
                </div>
              ))}
            </div>

            {/* Data Health */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '1rem' }}>
                Data Health
              </h3>
              {dataHealth.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0',
                    borderBottom: index < dataHealth.length - 1 ? '1px solid #f5f5f5' : 'none'
                  }}>
                    <Icon size={16} color="#7c3aed" />
                    <span style={{ flex: 1, fontSize: '0.85rem', color: '#1a1a1a' }}>{item.label}</span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      color: '#22c55e'
                    }}>
                      <CheckCircle size={14} />
                      Healthy
                    </span>
                  </div>
                );
              })}
            </div>

            {/* System Status */}
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #f0f0f0'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                System Status
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e'
                }} />
                <span style={{ fontSize: '0.85rem', color: '#1a1a1a' }}>All Systems Operational</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.25rem 0',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
                <span>Last Data Sync: <strong>2 min ago</strong></span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.25rem 0',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
                <span>Data Sources: <strong>24 Active</strong></span>
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '0.75rem',
                flexWrap: 'wrap'
              }}>
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(action.label)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.3rem 0.75rem',
                        background: `${action.color}15`,
                        border: '1px solid ${action.color}25',
                        borderRadius: '6px',
                        color: action.color,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon size={12} />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;