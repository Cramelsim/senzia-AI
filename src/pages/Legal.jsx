import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './Content.css';

const COPY = {
  privacy: { title: 'Privacy Policy', subject: 'how we collect, use and protect your data' },
  terms: { title: 'Terms of Service', subject: 'the terms that apply when you use Senzia' },
};

// Placeholder page so the links on the contact form resolve. The real policy text must come from the business / legal counsel.
const Legal = ({ kind }) => {
  const { title, subject } = COPY[kind];
  return (
    <div className="content-page">
      <Navbar />
      <main className="content-main">
        <div className="content-narrow">
          <p className="content-eyebrow">Legal</p>
          <h1 className="content-title">{title}</h1>
          <p className="content-lead">
            Our full {title.toLowerCase()}, covering {subject}, is being finalised and will be published here.
          </p>
          <p className="content-note">
            If you have questions in the meantime, email support@senzia.ai or use the contact form and we'll respond within 24 hours.
          </p>
          <div className="content-actions">
            <Link to="/contact" className="content-btn primary">Contact us <ArrowRight size={15} /></Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Legal;
