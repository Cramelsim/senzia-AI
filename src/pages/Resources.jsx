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
import { featuredResources, blogPosts } from '../data/siteContent';
import './Resources.css';

// Rotates a list by one step so the arrow buttons cycle through the cards.
const rotate = (list, direction) =>
  direction > 0 ? [...list.slice(1), list[0]] : [list[list.length - 1], ...list.slice(0, -1)];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featured, setFeatured] = useState(featuredResources);
  const [posts, setPosts] = useState(blogPosts);



  const resourceCategories = [
    { icon: Grid, label: 'All Resources', sub: 'View all' },
    { icon: FileText, label: 'Blog', sub: 'Latest insights' },
    { icon: BookOpen, label: 'Guides', sub: 'In-depth guides' },
    { icon: File, label: 'Case Studies', sub: 'Customer stories' },
    { icon: Video, label: 'Webinars', sub: 'Live & on-demand' },
    { icon: Download, label: 'Tools & Templates', sub: 'Free resources' },
    { icon: Calendar, label: 'Whitepapers', sub: 'Research & reports' }
  ];

  const filteredBlogs = posts.filter(post =>
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
              <button className="resources-circle-btn" aria-label="Previous resource" onClick={() => setFeatured((list) => rotate(list, -1))}>
                <ArrowLeft size={16} />
              </button>
              <button className="resources-circle-btn" aria-label="Next resource" onClick={() => setFeatured((list) => rotate(list, 1))}>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="resources-featured-grid">
            {featured.map((resource) => (
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

            <button className="resources-circle-btn" aria-label="Next article" onClick={() => setPosts((list) => rotate(list, 1))}>
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