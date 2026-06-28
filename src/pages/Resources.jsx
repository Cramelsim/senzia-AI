import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  File,
  Calendar,
  Users,
  TrendingUp,
  ArrowRight,
  Clock,
  Tag
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredResources = [
    {
      id: 1,
      type: 'Guide',
      title: 'The Business Intelligence Playbook for 2024',
      description: 'A step-by-step guide to building a data-driven organization and maximizing ROI.',
      image: '📘',
      link: '/resources/playbook',
      color: '#7c3aed'
    },
    {
      id: 2,
      type: 'Case Study',
      title: 'Real-time Insights & Automation Transformation',
      description: 'See how real-time insights and automation transformed operations and boosted margins.',
      image: '📊',
      link: '/resources/case-study',
      color: '#22c55e'
    },
    {
      id: 3,
      type: 'Whitepaper',
      title: 'The Future of AI in Business Intelligence',
      description: 'Key trends, predictions, and strategies shaping the future of data-driven businesses.',
      image: '🤖',
      link: '/resources/whitepaper',
      color: '#f59e0b'
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '5 Metrics Every Business Owner Should Track',
      date: 'May 20, 2024',
      category: 'Analytics',
      excerpt: 'Learn the key metrics that drive business success and how to track them effectively.',
      link: '/blog/metrics'
    },
    {
      id: 2,
      title: 'How Real-Time Data Drives Better Decisions',
      date: 'May 15, 2024',
      category: 'Data',
      excerpt: 'Discover how real-time data can transform your decision-making process.',
      link: '/blog/real-time-data'
    },
    {
      id: 3,
      title: 'Automating Operations: Where to Start',
      date: 'May 8, 2024',
      category: 'Automation',
      excerpt: 'A practical guide to getting started with business process automation.',
      link: '/blog/automation'
    },
    {
      id: 4,
      title: 'The ROI of Business Intelligence Platforms',
      date: 'May 1, 2024',
      category: 'ROI',
      excerpt: 'Calculate the return on investment for implementing business intelligence.',
      link: '/blog/roi'
    }
  ];

  const resourceCategories = [
    { icon: BookOpen, label: 'Guides', count: 12, color: '#7c3aed' },
    { icon: FileText, label: 'Case Studies', count: 8, color: '#22c55e' },
    { icon: Video, label: 'Webinars', count: 15, color: '#f59e0b' },
    { icon: Download, label: 'Tools & Templates', count: 6, color: '#3b82f6' },
    { icon: File, label: 'Whitepapers', count: 10, color: '#ec4899' },
    { icon: Calendar, label: 'Events', count: 4, color: '#8b5cf6' }
  ];

  const filteredBlogs = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Insights that drive <br />
              <span style={{ color: 'var(--accent-purple)' }}>smarter decisions.</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Explore expert insights, guides, and tools to help you unlock the full 
              potential of your business data.
            </p>

            {/* Search Bar */}
            <div style={{
              display: 'flex',
              maxWidth: '500px',
              margin: '0 auto',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.875rem 1.25rem',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  background: 'transparent'
                }}
              />
              <button style={{
                padding: '0.875rem 1.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)'
              }}>
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section style={{ padding: '2rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem'
          }}>
            {resourceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link 
                  key={index}
                  to={`/resources/${category.label.toLowerCase().replace(/ & /g, '-')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: '#fafafa',
                    borderRadius: '12px',
                    border: '1px solid #f0f0f0',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: `${category.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={18} color={category.color} />
                  </div>
                  <div>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: 600, 
                      color: '#1a1a1a',
                      margin: 0
                    }}>
                      {category.label}
                    </p>
                    <p style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}>
                      {category.count} resources
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section style={{ padding: '4rem 0', background: '#fafafa' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                color: '#1a1a1a',
                marginBottom: '0.25rem'
              }}>
                Featured Resources
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Handpicked insights to help you grow.
              </p>
            </div>
            <Link to="/resources/all" style={{
              color: '#7c3aed',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              View All Resources <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem'
          }}>
            {featuredResources.map((resource) => (
              <Link 
                key={resource.id}
                to={resource.link}
                style={{
                  textDecoration: 'none',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #f0f0f0',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    background: `${resource.color}15`,
                    color: resource.color,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {resource.type}
                  </span>
                  <span style={{ fontSize: '2rem' }}>{resource.image}</span>
                </div>
                
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  marginBottom: '0.5rem'
                }}>
                  {resource.title}
                </h3>
                
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem',
                  marginBottom: '1rem'
                }}>
                  {resource.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#7c3aed',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  Read {resource.type} <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                color: '#1a1a1a',
                marginBottom: '0.25rem'
              }}>
                Latest From Our Blog
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Fresh insights and expert perspectives.
              </p>
            </div>
            <Link to="/blog" style={{
              color: '#7c3aed',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              Visit Our Blog <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem'
          }}>
            {filteredBlogs.map((post) => (
              <Link 
                key={post.id}
                to={post.link}
                style={{
                  textDecoration: 'none',
                  padding: '1.5rem',
                  background: '#fafafa',
                  borderRadius: '16px',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <Tag size={14} color="#7c3aed" />
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#7c3aed',
                    fontWeight: 600
                  }}>
                    {post.category}
                  </span>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    marginLeft: 'auto'
                  }}>
                    <Clock size={14} />
                    {post.date}
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  marginBottom: '0.5rem'
                }}>
                  {post.title}
                </h3>
                
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  marginTop: '1rem',
                  color: '#7c3aed',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  Read Article <ArrowRight size={14} />
                </div>
              </Link>
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
            Ready to Transform Your Business?
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
              Get Started →
            </button>
          </Link>

          <Link to="/resources" style={{ 
  color: isActive('/resources') ? '#7c3aed' : 'var(--text-secondary)', 
  textDecoration: 'none', 
  fontSize: '0.95rem', 
  fontWeight: 500,
  transition: 'color 0.2s ease'
}}>
  Resources
</Link>
        </div>
      </section>
    </div>
  );
};

export default Resources;