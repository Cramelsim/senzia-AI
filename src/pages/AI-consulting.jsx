
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Users, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Clock, 
  Award,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const AIConsulting = () => {
  const services = [
    {
      icon: Lightbulb,
      title: 'AI Strategy Consulting',
      description: 'Develop a comprehensive AI roadmap tailored to your business goals and industry.',
      features: [
        'AI readiness assessment',
        'Strategic roadmap development',
        'Use case identification',
        'ROI analysis'
      ],
      color: '#7c3aed'
    },
    {
      icon: Users,
      title: 'Team Training',
      description: 'Upskill your team with practical AI knowledge and hands-on experience.',
      features: [
        'Customized training programs',
        'Hands-on workshops',
        'Practical use cases',
        'Ongoing support'
      ],
      color: '#8b5cf6'
    },
    {
      icon: Target,
      title: 'Workshops',
      description: 'Interactive sessions designed to solve specific business challenges with AI.',
      features: [
        'Problem-solving workshops',
        'AI ideation sessions',
        'Implementation planning',
        'Best practices sharing'
      ],
      color: '#f59e0b'
    },
    {
      icon: BookOpen,
      title: 'Ongoing Support',
      description: 'Continuous guidance and support to ensure your AI initiatives succeed.',
      features: [
        'Dedicated support team',
        'Regular check-ins',
        'Performance reviews',
        'Continuous improvement'
      ],
      color: '#22c55e'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Drive Business Growth',
      description: 'Leverage AI to identify new opportunities and accelerate growth.',
      color: '#7c3aed'
    },
    {
      icon: Shield,
      title: 'Reduce Risk',
      description: 'Implement AI with confidence and mitigate potential risks.',
      color: '#f59e0b'
    },
    {
      icon: Clock,
      title: 'Save Time & Resources',
      description: 'Streamline operations and free up your team for strategic work.',
      color: '#22c55e'
    },
    {
      icon: Award,
      title: 'Stay Ahead of Competition',
      description: 'Gain a competitive edge with cutting-edge AI capabilities.',
      color: '#ec4899'
    }
  ];

  const programs = [
    {
      title: 'AI Fundamentals',
      duration: '2 Days',
      description: 'Understand the basics of AI and how it applies to your business.',
      audience: 'Business leaders and managers',
      modules: [
        'Introduction to AI',
        'Business applications of AI',
        'Data fundamentals',
        'AI ethics and governance'
      ]
    },
    {
      title: 'Data-Driven Decision Making',
      duration: '3 Days',
      description: 'Learn how to leverage data and AI to make better business decisions.',
      audience: 'Business analysts and decision-makers',
      modules: [
        'Data analytics fundamentals',
        'Predictive analytics',
        'AI-powered insights',
        'Decision-making frameworks'
      ]
    },
    {
      title: 'AI Implementation',
      duration: '5 Days',
      description: 'Master the art of implementing AI solutions in your organization.',
      audience: 'IT managers and implementation teams',
      modules: [
        'AI project management',
        'Technical implementation',
        'Integration strategies',
        'Change management'
      ]
    },
    {
      title: 'Custom AI Program',
      duration: 'Custom',
      description: 'Tailored training and consulting for your specific business needs.',
      audience: 'Organizations with unique requirements',
      modules: [
        'Custom curriculum design',
        'Industry-specific applications',
        'Hands-on projects',
        'Ongoing mentorship'
      ]
    }
  ];

  const testimonials = [
    {
      quote: 'SENZIA\'s AI consulting team transformed our approach to data. We\'re now making decisions faster and with more confidence.',
      author: 'David Kimani',
      role: 'Managing Director, Urban Bites Restaurant',
      image: '👨‍💼'
    },
    {
      quote: 'The training program was exceptional. Our team is now equipped to leverage AI for real business impact.',
      author: 'Jane Mwangi',
      role: 'CTO, TechHub Africa',
      image: '👩‍💻'
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
              AI Consulting & Training
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Upskill your team and implement AI the right way with our expert consulting 
              and training programs designed for African businesses.
            </p>

            <Link to="/demo">
              <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '0.875rem 2.5rem' }}>
                Get Started →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#1a1a1a'
          }}>
            Our Services
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontSize: '1.1rem'
          }}>
            Comprehensive AI consulting and training solutions for your business.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem'
          }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} style={{ 
                  padding: '2rem',
                  background: '#fafafa',
                  borderRadius: '16px',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ 
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${service.color}10`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={24} color={service.color} />
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: '#1a1a1a'
                  }}>
                    {service.title}
                  </h3>
                  
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    marginBottom: '1rem'
                  }}>
                    {service.description}
                  </p>

                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '1.5rem'
                  }}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.25rem 0',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                      }}>
                        <span style={{ color: service.color }}>▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" style={{ 
                    color: service.color,
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    Learn more <ChevronRight size={16} />
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
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#1a1a1a'
          }}>
            Why Choose SENZIA Consulting?
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontSize: '1.1rem'
          }}>
            We help you navigate the AI landscape with confidence and expertise.
          </p>

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
                  border: '1px solid #f0f0f0'
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#1a1a1a'
          }}>
            Training Programs
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontSize: '1.1rem'
          }}>
            Structured learning programs for every level of AI maturity.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }}>
            {programs.map((program, index) => (
              <div key={index} style={{ 
                padding: '2rem',
                background: '#fafafa',
                borderRadius: '16px',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 700,
                    color: '#1a1a1a'
                  }}>
                    {program.title}
                  </h3>
                  <span style={{ 
                    background: '#7c3aed',
                    color: 'white',
                    padding: '0.15rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    {program.duration}
                  </span>
                </div>

                <p style={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  {program.description}
                </p>

                <p style={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  fontWeight: 500
                }}>
                  👤 {program.audience}
                </p>

                <div style={{ 
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '1rem'
                }}>
                  <p style={{ 
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#1a1a1a',
                    marginBottom: '0.5rem'
                  }}>
                    What you'll learn:
                  </p>
                  <ul style={{ 
                    listStyle: 'none',
                    padding: 0
                  }}>
                    {program.modules.map((module, idx) => (
                      <li key={idx} style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.2rem 0',
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem'
                      }}>
                        <CheckCircle size={14} color="#22c55e" />
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" style={{ 
                  display: 'inline-block',
                  marginTop: '1rem',
                  color: '#7c3aed',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}>
                  Enroll Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '4rem 0', background: '#fafafa' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#1a1a1a'
          }}>
            What Our Clients Say
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={{ 
                padding: '2rem',
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #f0f0f0'
              }}>
                <p style={{ 
                  fontSize: '1rem',
                  color: '#1a1a1a',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </p>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f3f4f6',
                    borderRadius: '50%'
                  }}>
                    {testimonial.image}
                  </div>
                  <div>
                    <p style={{ 
                      fontWeight: 700,
                      color: '#1a1a1a'
                    }}>
                      {testimonial.author}
                    </p>
                    <p style={{ 
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem'
                    }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
            Ready to Transform Your Business with AI?
          </h2>
          <p style={{ 
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Let's discuss how SENZIA can help you implement AI the right way.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact">
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
                Contact Us →
              </button>
            </Link>
            <Link to="/demo">
              <button style={{ 
                background: 'transparent',
                border: '2px solid white',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                Book a Demo
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIConsulting;