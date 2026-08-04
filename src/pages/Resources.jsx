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
  Grid,
  ArrowRight,
  ArrowLeft,
  Clock
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './Resources.css';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const featuredResources = [
    {
      id: 1,
      type: 'GUIDE',
      title: 'The Business Intelligence Playbook for 2024',
      description: 'A step-by-step guide to building a data-driven organization and maximizing ROI.',
      link: '/resources/playbook',
      accent: '#4f8cff',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
    },
    {
      id: 2,
      type: 'CASE STUDY',
      title: 'How a Restaurant Group Increased Profit by 28%',
      description: 'See how real-time insights and automation transformed operations and boosted margins.',
      link: '/resources/case-study',
      accent: '#22c55e',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80'
    },
    {
      id: 3,
      type: 'WHITEPAPER',
      title: 'The Future of AI in Business Intelligence',
      description: 'Key trends, predictions, and strategies shaping the future of data-driven businesses.',
      link: '/resources/whitepaper',
      accent: '#a855f7',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80'
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: '5 Metrics Every Business Owner Should Track',
      date: 'May 20, 2024',
      category: 'Analytics',
      excerpt: 'Learn the key metrics that drive business success and how to track them effectively.',
      link: '/blog/metrics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80'
    },
    {
      id: 2,
      title: 'How Real-Time Data Drives Better Decisions',
      date: 'May 15, 2024',
      category: 'Data',
      excerpt: 'Discover how real-time data can transform your decision-making process.',
      link: '/blog/real-time-data',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80'
    },
    {
      id: 3,
      title: 'Automating Operations: Where to Start',
      date: 'May 8, 2024',
      category: 'Automation',
      excerpt: 'A practical guide to getting started with business process automation.',
      link: '/blog/automation',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
    },
    {
      id: 4,
      title: 'The ROI of Business Intelligence Platforms',
      date: 'May 1, 2024',
      category: 'ROI',
      excerpt: 'Calculate the return on investment for implementing business intelligence.',
      link: '/blog/roi',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80'
    }
  ];

  const resourceCategories = [
    { icon: Grid, label: 'All Resources', sub: 'View all' },
    { icon: FileText, label: 'Blog', sub: 'Latest insights' },
    { icon: BookOpen, label: 'Guides', sub: 'In-depth guides' },
    { icon: File, label: 'Case Studies', sub: 'Customer stories' },
    { icon: Video, label: 'Webinars', sub: 'Live & on-demand' },
    { icon: Download, label: 'Tools & Templates', sub: 'Free resources' },
    { icon: Calendar, label: 'Whitepapers', sub: 'Research & reports' }
  ];

  const filteredBlogs = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="resources-page">
      <Navbar />

      {/* Hero Section */}
      <section className="resources-hero">
        <div className="container">
          <p className="resources-eyebrow">RESOURCES</p>

          <h1 className="resources-hero-title">
            Insights that drive smarter decisions.
          </h1>

          <p className="resources-hero-subtitle">
            Explore expert insights, guides, and tools to help you unlock the full
            potential of your business data.
          </p>

          <div className="resources-search">
            <Search size={18} className="resources-search-icon" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="resources-categories-section">
        <div className="container">
          <div className="resources-categories-bar">
            {resourceCategories.map((category, index) => {
              const Icon = category.icon;
              const active = index === 0;
              return (
                <Link
                  key={index}
                  to={`/resources/${category.label.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                  className="resources-category"
                >
                  <Icon size={18} color={active ? 'var(--resources-gold)' : 'var(--resources-text-secondary)'} />
                  <div>
                    <p className={`resources-category-label ${active ? 'active' : ''}`}>
                      {category.label}
                    </p>
                    <p className="resources-category-sub">{category.sub}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="resources-section">
        <div className="container">
          <div className="resources-section-header">
            <div>
              <p className="resources-eyebrow">FEATURED RESOURCES</p>
              <h2 className="resources-section-title">
                Handpicked insights to help you grow.
              </h2>
              <p className="resources-section-desc">
                Dive into our most popular resources chosen to help you make smarter
                decisions and achieve better results.
              </p>
              <Link to="/resources/all" className="resources-view-all-btn">
                View All Resources <ArrowRight size={15} />
              </Link>
            </div>

            <div className="resources-nav-buttons">
              <button className="resources-circle-btn">
                <ArrowLeft size={16} />
              </button>
              <button className="resources-circle-btn">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="resources-featured-grid">
            {featuredResources.map((resource) => (
              <Link key={resource.id} to={resource.link} className="resources-featured-card">
                <div
                  className="resources-featured-image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(10,14,26,0.1) 0%, rgba(10,14,26,0.85) 100%), url(${resource.image})`
                  }}
                >
                  <span
                    className="resources-featured-badge"
                    style={{ background: `${resource.accent}22`, color: resource.accent }}
                  >
                    {resource.type}
                  </span>
                </div>

                <div className="resources-featured-body">
                  <h3 className="resources-featured-title">{resource.title}</h3>
                  <p className="resources-featured-desc">{resource.description}</p>
                  <div className="resources-featured-cta">
                    Read {resource.type.charAt(0) + resource.type.slice(1).toLowerCase()}
                    <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="resources-section">
        <div className="container">
          <div className="resources-section-header">
            <div>
              <p className="resources-eyebrow">LATEST FROM OUR BLOG</p>
              <h2 className="resources-section-title">
                Fresh insights and expert perspectives.
              </h2>
              <Link to="/blog" className="resources-link">
                Visit Our Blog <ArrowRight size={15} />
              </Link>
            </div>

            <button className="resources-circle-btn">
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="resources-blog-grid">
            {filteredBlogs.map((post) => (
              <Link key={post.id} to={post.link} className="resources-blog-card">
                <div
                  className="resources-blog-image"
                  style={{ backgroundImage: `url(${post.image})` }}
                />

                <div className="resources-blog-body">
                  <div className="resources-blog-meta">
                    <Clock size={13} color="var(--resources-text-secondary)" />
                    <span className="resources-blog-date">{post.date}</span>
                  </div>

                  <h3 className="resources-blog-title">{post.title}</h3>

                  <div className="resources-blog-cta">
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="resources-cta-section">
        <div className="container">
          <h2 className="resources-cta-title">Ready to Transform Your Business?</h2>
          <p className="resources-cta-desc">
            Join 15,000+ businesses already using SENZIA to drive performance and grow.
          </p>
          <Link to="/demo">
            <button className="resources-cta-btn">Get Started →</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Resources;