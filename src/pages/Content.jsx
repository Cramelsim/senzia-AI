import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import { productModules, featuredResources, blogPosts, resourceCategoryFilters } from '../data/siteContent';
import './Content.css';

const Shell = ({ backTo, backLabel, children, wide }) => (
  <div className="content-page">
    <Navbar />
    <main className="content-main">
      <div className={wide ? 'content-wide' : 'content-narrow'}>
        {backTo && (
          <Link to={backTo} className="content-back">
            <ArrowLeft size={14} /> {backLabel}
          </Link>
        )}
        {children}
      </div>
    </main>
  </div>
);

const NotFound = ({ backTo, backLabel }) => (
  <Shell backTo={backTo} backLabel={backLabel}>
    <h1 className="content-title">We couldn't find that page</h1>
    <p className="content-lead">The link may be out of date. Head back and pick something from the list.</p>
  </Shell>
);

export const ProductDetail = () => {
  const { slug } = useParams();
  const module = productModules.find((m) => m.slug === slug);
  if (!module) return <NotFound backTo="/product" backLabel="Back to Product" />;

  return (
    <Shell backTo="/product" backLabel="All product modules">
      <p className="content-eyebrow" style={{ color: module.color }}>Product module</p>
      <h1 className="content-title">{module.title}</h1>
      <p className="content-lead">{module.description}</p>

      <div className="content-card">
        <h3>What's included</h3>
        <ul className="content-list">
          {module.features.map((feature) => (
            <li key={feature}><span className="content-check" style={{ color: module.color }}>✓</span> {feature}</li>
          ))}
        </ul>
      </div>

      <div className="content-actions">
        <Link to="/demo" className="content-btn primary">Start Free Trial <ArrowRight size={15} /></Link>
        <Link to="/contact" className="content-btn outline">Talk to our team</Link>
      </div>
    </Shell>
  );
};

const ResourceTile = ({ item }) => (
  <Link to={item.link} className="content-tile">
    <span className="content-tag">{item.type || item.category}</span>
    <h3>{item.title}</h3>
    <p>{item.description || item.excerpt}</p>
  </Link>
);

export const ResourceView = () => {
  const { slug } = useParams();

  const resource = featuredResources.find((r) => r.slug === slug);
  if (resource) {
    return (
      <Shell backTo="/resources" backLabel="Back to Resources">
        <p className="content-eyebrow" style={{ color: resource.accent }}>{resource.type}</p>
        <h1 className="content-title">{resource.title}</h1>
        <p className="content-lead">{resource.description}</p>
        <div className="content-hero-image" style={{ backgroundImage: `url(${resource.image})` }} role="img" aria-label={resource.title} />
        <p className="content-note">
          The full {resource.type.toLowerCase()} is still being prepared. Leave us a message and we'll send it to you as soon as it's published.
        </p>
        <div className="content-actions">
          <Link to="/contact" className="content-btn primary">Request this resource <ArrowRight size={15} /></Link>
          <Link to="/resources/all" className="content-btn outline">Browse all resources</Link>
        </div>
      </Shell>
    );
  }

  const key = slug === 'all' ? 'all-resources' : slug;
  if (key === 'blog') return <Navigate to="/blog" replace />;

  const category = resourceCategoryFilters[key];
  if (!category) return <NotFound backTo="/resources" backLabel="Back to Resources" />;

  const isAll = key === 'all-resources';
  const resources = isAll ? featuredResources : featuredResources.filter((r) => r.type === category.type);
  const posts = isAll ? blogPosts : [];
  const isEmpty = resources.length === 0 && posts.length === 0;

  return (
    <Shell backTo="/resources" backLabel="Back to Resources" wide>
      <p className="content-eyebrow">Resources</p>
      <h1 className="content-title">{category.label}</h1>
      {isEmpty ? (
        <p className="content-note">Nothing has been published in this category yet. Check back soon, or browse everything we have so far.</p>
      ) : (
        <div className="content-grid">
          {resources.map((r) => <ResourceTile key={`r-${r.id}`} item={r} />)}
          {posts.map((p) => <ResourceTile key={`p-${p.id}`} item={p} />)}
        </div>
      )}
      {isEmpty && (
        <div className="content-actions">
          <Link to="/resources/all" className="content-btn outline">Browse all resources</Link>
        </div>
      )}
    </Shell>
  );
};

export const BlogIndex = () => (
  <Shell backTo="/resources" backLabel="Back to Resources" wide>
    <p className="content-eyebrow">Blog</p>
    <h1 className="content-title">Fresh insights and expert perspectives</h1>
    <div className="content-grid">
      {blogPosts.map((post) => <ResourceTile key={post.id} item={post} />)}
    </div>
  </Shell>
);

export const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <NotFound backTo="/blog" backLabel="Back to the blog" />;

  const more = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <Shell backTo="/blog" backLabel="All articles">
      <p className="content-eyebrow">{post.category}</p>
      <h1 className="content-title">{post.title}</h1>
      <p className="content-meta">{post.date}</p>
      <div className="content-hero-image" style={{ backgroundImage: `url(${post.image})` }} role="img" aria-label={post.title} />
      <p className="content-lead">{post.excerpt}</p>
      <p className="content-note">The full article is coming soon. In the meantime, our team is happy to talk it through with you.</p>
      <div className="content-actions">
        <Link to="/contact" className="content-btn primary">Talk to our team <ArrowRight size={15} /></Link>
      </div>

      <h2 style={{ fontSize: '1.15rem', margin: '3rem 0 1rem' }}>More from the blog</h2>
      <div className="content-grid">
        {more.map((p) => <ResourceTile key={p.id} item={p} />)}
      </div>
    </Shell>
  );
};
