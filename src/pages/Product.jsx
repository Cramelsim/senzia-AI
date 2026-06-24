import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Zap, 
  Brain, 
  Bell, 
  Database, 
  Users, 
  Shield, 
  TrendingUp, 
  Layout, 
  Headphones 
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const Product = () => {
  const modules = [
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Get real-time insights into your business performance.',
      features: ['Interactive Dashboards', 'Custom Reports', 'KPI Tracking', 'Data Visualization'],
      link: '/product/bi',
      color: '#7c3aed'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Automate repetitive tasks and streamline your operations.',
      features: ['Workflow Automation', 'Scheduled Reports', 'Data Sync & Integration', 'Task Automation'],
      link: '/product/automation',
      color: '#f59e0b'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Leverage AI to uncover trends, predict outcomes, and get smarter recommendations.',
      features: ['AI-Powered Analytics', 'Predictive Forecasting', 'Anomaly Detection', 'Smart Recommendations'],
      link: '/product/ai-insights',
      color: '#8b5cf6'
    },
    {
      icon: Bell,
      title: 'Alerts & Notifications',
      description: 'Stay informed with real-time alerts on what matters.',
      features: ['Threshold Alerts', 'Email Notifications', 'WhatsApp Alerts', 'Custom Notifications'],
      link: '/product/alerts',
      color: '#ef4444'
    },
    {
      icon: Database,
      title: 'Data Integration',
      description: 'Connect all your data sources in one central platform.',
      features: ['Multiple Data Sources', 'Real-time Sync', 'Data Cleaning', 'Secure Storage'],
      link: '/product/integrations',
      color: '#22c55e'
    },
    {
      icon: Users,
      title: 'AI Consulting & Training',
      description: 'Upskill your team and implement AI the right way.',
      features: ['AI Strategy Consulting', 'Team Training', 'Workshops', 'Ongoing Support'],
      link: '/product/consulting',
      color: '#ec4899'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security to protect your data.',
      color: '#3b82f6'
    },
    {
      icon: TrendingUp,
      title: 'Scalable',
      description: 'Built to grow with your business needs.',
      color: '#22c55e'
    },
    {
      icon: Layout,
      title: 'User-Friendly',
      description: 'Easy to use, with a clean and intuitive interface.',
      color: '#8b5cf6'
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      description: 'We\'re here to help you succeed every step of the way.',
      color: '#ec4899'
    }
  ];

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        padding: '5rem 0 4rem',
        background: 'linear-gradient(135deg, #faf5ff 0%, #ffffff 50%, #f3f4f6 100%)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: 800, 
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              color: '#1a1a1a'
            }}>
              Our Product
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Senzia is an all-in-one AI-powered Business Intelligence platform designed to help 
              businesses transform data into actionable insights, automate operations, and drive 
              sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#1a1a1a'
          }}>
            Everything You Need to Run Smarter
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontSize: '1.1rem'
          }}>
            Powerful modules built to give you intelligence, automation, and growth.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem'
          }}>
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div key={index} style={{ 
                  padding: '2rem',
                  background: '#fafafa',
                  borderRadius: '16px',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}>
                  <div style={{ 
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${module.color}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={24} color={module.color} />
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: '#1a1a1a'
                  }}>
                    {module.title}
                  </h3>
                  
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    marginBottom: '1rem'
                  }}>
                    {module.description}
                  </p>

                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '1.5rem'
                  }}>
                    {module.features.map((feature, idx) => (
                      <li key={idx} style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.25rem 0',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                      }}>
                        <span style={{ color: module.color }}>▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to={module.link} style={{ 
                    color: module.color,
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    Learn more →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '4rem 0', background: '#fafafa' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem'
          }}>
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} style={{ 
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ 
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: `${benefit.color}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <Icon size={28} color={benefit.color} />
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: '#1a1a1a'
                  }}>
                    {benefit.title}
                  </h3>
                  
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {benefit.description}
                  </p>

                  <Link to="/product" style={{ 
                    display: 'inline-block',
                    marginTop: '1rem',
                    color: benefit.color,
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}>
                    Learn more →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem'
          }}>
            Ready to Transform Your Business?
          </h2>
          <p style={{ 
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Join 15,000+ businesses using SENZIA to drive performance and grow.
          </p>
          <Link to="/demo">
            <button style={{ 
              background: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              color: '#7c3aed',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              Start Free Trial →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Product;