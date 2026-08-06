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
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './AIConsulting.css';

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
      color: '#4f8cff'
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
      color: '#a855f7'
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
      color: '#e8a94d'
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
      color: '#4f8cff'
    },
    {
      icon: Shield,
      title: 'Reduce Risk',
      description: 'Implement AI with confidence and mitigate potential risks.',
      color: '#e8a94d'
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
      quote: "SENZIA's AI consulting team transformed our approach to data. We're now making decisions faster and with more confidence.",
      author: 'David Kimani',
      role: 'Managing Director, Urban Bites Restaurant',
      initials: 'DK'
    },
    {
      quote: 'The training program was exceptional. Our team is now equipped to leverage AI for real business impact.',
      author: 'Jane Mwangi',
      role: 'CTO, TechHub Africa',
      initials: 'JM'
    }
  ];

  return (
    <div className="ai-page">
      <Navbar />

      {/* Hero Section */}
      <section className="ai-hero">
        <div className="container">
          <div className="ai-hero-inner">
            <p className="ai-eyebrow">AI CONSULTING & TRAINING</p>
            <h1 className="ai-hero-title">AI Consulting & Training</h1>
            <p className="ai-hero-desc">
              Upskill your team and implement AI the right way with our expert
              consulting and training programs designed for African businesses.
            </p>
            <Link to="/demo" className="ai-btn-primary">
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="ai-section">
        <div className="container">
          <div className="ai-section-header">
            <h2 className="ai-section-title">Our Services</h2>
            <p className="ai-section-desc">
              Comprehensive AI consulting and training solutions for your business.
            </p>
          </div>

          <div className="ai-services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="ai-service-card">
                  <div
                    className="ai-service-icon"
                    style={{ background: `${service.color}1f` }}
                  >
                    <Icon size={24} color={service.color} />
                  </div>

                  <h3 className="ai-service-title">{service.title}</h3>
                  <p className="ai-service-desc">{service.description}</p>

                  <ul className="ai-service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <span style={{ color: service.color }}>▸</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="ai-service-link"
                    style={{ color: service.color }}
                  >
                    Learn more <ChevronRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="ai-section">
        <div className="container">
          <div className="ai-section-header">
            <h2 className="ai-section-title">Why Choose SENZIA Consulting?</h2>
            <p className="ai-section-desc">
              We help you navigate the AI landscape with confidence and expertise.
            </p>
          </div>

          <div className="ai-benefits-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="ai-benefit-card">
                  <div
                    className="ai-benefit-icon"
                    style={{ background: `${benefit.color}1f` }}
                  >
                    <Icon size={28} color={benefit.color} />
                  </div>
                  <h3 className="ai-benefit-title">{benefit.title}</h3>
                  <p className="ai-benefit-desc">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="ai-section">
        <div className="container">
          <div className="ai-section-header">
            <h2 className="ai-section-title">Training Programs</h2>
            <p className="ai-section-desc">
              Structured learning programs for every level of AI maturity.
            </p>
          </div>

          <div className="ai-programs-grid">
            {programs.map((program, index) => (
              <div key={index} className="ai-program-card">
                <div className="ai-program-header">
                  <h3 className="ai-program-title">{program.title}</h3>
                  <span className="ai-program-badge">{program.duration}</span>
                </div>

                <p className="ai-program-desc">{program.description}</p>

                <p className="ai-program-audience">
                  <Users size={13} /> {program.audience}
                </p>

                <div className="ai-program-modules">
                  <p className="ai-program-modules-label">What you'll learn:</p>
                  <ul>
                    {program.modules.map((module, idx) => (
                      <li key={idx}>
                        <CheckCircle size={14} color="#22c55e" />
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" className="ai-program-link">
                  Enroll Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="ai-section">
        <div className="container">
          <div className="ai-section-header">
            <h2 className="ai-section-title">What Our Clients Say</h2>
          </div>

          <div className="ai-testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="ai-testimonial-card">
                <p className="ai-testimonial-quote">"{testimonial.quote}"</p>
                <div className="ai-testimonial-author-row">
                  <div className="ai-testimonial-avatar">{testimonial.initials}</div>
                  <div>
                    <p className="ai-testimonial-name">{testimonial.author}</p>
                    <p className="ai-testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ai-cta-section">
        <div className="container">
          <h2 className="ai-cta-title">Ready to Transform Your Business with AI?</h2>
          <p className="ai-cta-desc">
            Let's discuss how SENZIA can help you implement AI the right way.
          </p>
          <div className="ai-cta-buttons">
            <Link to="/contact" className="ai-btn-primary">
              Contact Us <ArrowRight size={18} />
            </Link>
            <Link to="/demo" className="ai-btn-outline">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIConsulting;