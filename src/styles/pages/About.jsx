import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const About = () => {
  const values = [
    {
      icon: '💡',
      title: 'Intelligence',
      description: 'Turning data into actionable insights for smarter decisions.'
    },
    {
      icon: '⚡',
      title: 'Automation',
      description: 'Streamlining operations and reducing manual work.'
    },
    {
      icon: '📈',
      title: 'Growth',
      description: 'Identifying opportunities and driving sustainable growth.'
    },
    {
      icon: '🔒',
      title: 'Integrity',
      description: 'Building trust through security, transparency and reliability.'
    }
  ];

  const teamMembers = [
    {
      name: 'David Kimani',
      role: 'CEO & Co-Founder',
      description: 'Former CFO with 15+ years in financial technology and AI.',
      image: '👨‍💼'
    },
    {
      name: 'Sarah Wanjiru',
      role: 'CTO & Co-Founder',
      description: 'AI researcher with a passion for making technology accessible.',
      image: '👩‍💻'
    },
    {
      name: 'Michael Otieno',
      role: 'Head of Product',
      description: 'Product leader focused on creating exceptional user experiences.',
      image: '👨‍💻'
    },
    {
      name: 'Grace Muthoni',
      role: 'Head of Customer Success',
      description: 'Dedicated to ensuring every business succeeds with SENZIA.',
      image: '👩‍💼'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Businesses Trust Us' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Support Available' },
    { number: '50+', label: 'Countries Served' }
  ];

  const milestones = [
    { year: '2022', title: 'Founded', description: 'SENZIA was founded with a vision to democratize AI for African businesses.' },
    { year: '2023', title: 'First 1,000 Users', description: 'Reached 1,000 businesses across East Africa using our platform.' },
    { year: '2024', title: 'Expansion', description: 'Expanded operations to 5 African countries and launched advanced features.' },
    { year: '2025', title: '15,000+ Businesses', description: 'Now serving over 15,000 businesses across multiple industries.' }
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
              We're on a Mission to <br />
              <span style={{ color: 'var(--accent-purple)' }}>Empower African Businesses</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              SENZIA combines AI, financial analytics, and expert validation to help businesses 
              make smarter decisions, faster.
            </p>

            <Link to="/demo">
              <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '0.875rem 2.5rem' }}>
                Join 15,000+ Businesses →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            {stats.map((stat, index) => (
              <div key={index}>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  color: 'var(--accent-purple)',
                  marginBottom: '0.5rem'
                }}>
                  {stat.number}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section style={{ padding: '4rem 0', background: '#fafafa' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 700, 
              marginBottom: '1.5rem',
              color: '#1a1a1a',
              textAlign: 'center'
            }}>
              Our Story
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '1.5rem'
            }}>
              SENZIA was born from a simple observation: African businesses have incredible potential, 
              but they lack access to the data-driven insights that global companies use to grow. 
              We founded SENZIA to democratize AI and business intelligence for businesses of all sizes.
            </p>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              Today, we're proud to serve over 15,000 businesses across Africa, helping them increase 
              profitability, detect risks, automate operations, and uncover new growth opportunities. 
              Our team combines deep expertise in AI, finance, and business operations to deliver 
              practical, actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#1a1a1a'
          }}>
            Our Values
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontSize: '1.1rem'
          }}>
            These principles guide everything we do at SENZIA.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem'
          }}>
            {values.map((value, index) => (
              <div key={index} style={{ 
                textAlign: 'center',
                padding: '2rem',
                background: '#faf5ff',
                borderRadius: '12px',
                border: '1px solid #f3e8ff',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {value.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  color: '#1a1a1a'
                }}>
                  {value.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ padding: '4rem 0', background: '#fafafa' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#1a1a1a'
          }}>
            Our Journey
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem'
          }}>
            {milestones.map((milestone, index) => (
              <div key={index} style={{ 
                padding: '1.5rem',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                position: 'relative'
              }}>
                <div style={{ 
                  position: 'absolute',
                  top: '-12px',
                  left: '20px',
                  background: 'var(--accent-purple)',
                  color: 'white',
                  padding: '0.25rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}>
                  {milestone.year}
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: '#1a1a1a'
                  }}>
                    {milestone.title}
                  </h4>
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            textAlign: 'center',
            marginBottom: '0.5rem',
            color: '#1a1a1a'
          }}>
            Meet Our Team
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontSize: '1.1rem'
          }}>
            Passionate experts dedicated to your success.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem'
          }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{ 
                textAlign: 'center',
                padding: '2rem',
                background: '#fafafa',
                borderRadius: '16px',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ 
                  fontSize: '4rem', 
                  marginBottom: '1rem',
                  display: 'block'
                }}>
                  {member.image}
                </div>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 700,
                  marginBottom: '0.25rem',
                  color: '#1a1a1a'
                }}>
                  {member.name}
                </h3>
                <p style={{ 
                  color: 'var(--accent-purple)',
                  fontWeight: 600,
                  marginBottom: '0.75rem'
                }}>
                  {member.role}
                </p>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {member.description}
                </p>
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
            Ready to Grow Your Business?
          </h2>
          <p style={{ 
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            Join 15,000+ businesses already using SENZIA to drive performance and grow.
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

export default About;