import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  ChevronRight,
  User,
  Briefcase,
  Building2,
  HelpCircle,
  Edit3,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import './Contact.css';

const contactInfo = [
  { icon: Phone, title: 'Call Us', lines: ['+254 700 123 456', 'Mon – Fri, 8:00 AM – 6:00 PM EAT'] },
  { icon: Mail, title: 'Email Us', lines: ['hello@senzia.ai', 'We aim to respond within 24 hours'] },
  { icon: MapPin, title: 'Visit Us', lines: ['WestPark Towers, 7th Floor', 'Waiyaki Way, Nairobi, Kenya', 'By appointment only'] },
  { icon: MessageSquare, title: 'Live Chat', lines: ['Chat with our team in real-time'], link: 'https://wa.me/254700123456', linkText: 'Start Chat' },
];

const supportOptions = [
  { icon: MessageSquare, title: 'Chat on WhatsApp', description: 'Get instant support on WhatsApp', link: 'https://wa.me/254700123456', color: '#25D366', bg: 'rgba(37,211,102,0.12)' },
  { icon: Mail, title: 'Email Support', description: "Email us and we'll respond within 24 hours", link: 'mailto:support@senzia.ai', color: 'var(--accent-gold, #f0c987)', bg: 'rgba(240,201,135,0.12)' },
  { icon: Phone, title: 'Phone Support', description: 'Call us for immediate assistance', link: 'tel:+254700123456', color: '#4f8bf0', bg: 'rgba(79,139,240,0.12)' },
];

const faqs = [
  { question: 'What is the response time for support queries?', answer: 'We typically respond to all support queries within 24 hours. For urgent issues, we provide immediate assistance through our WhatsApp support.' },
  { question: 'Do you offer on-site training and consulting?', answer: 'Yes, we provide on-site training and consulting services for businesses in Kenya and across East Africa. Contact us to schedule a consultation.' },
  { question: 'Can I book a free consultation?', answer: 'Absolutely! We offer free consultations for businesses interested in learning more about SENZIA. Book a demo through our website.' },
  { question: 'What industries do you serve?', answer: 'We serve restaurants, clubs, supermarkets, hotels, fuel stations, logistics, manufacturing, retail, healthcare, and more.' },
];

const industries = ['Restaurant', 'Retail', 'Hospitality', 'Manufacturing', 'Healthcare', 'Logistics', 'Other'];
const helpOptions = ['General Inquiry', 'Product Demo', 'Consulting Services', 'Training Programs', 'Support', 'Partnership', 'Other'];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', businessEmail: '', companyName: '',
    phoneNumber: '', industry: '', helpType: '', message: '', agreeToTerms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', businessEmail: '', companyName: '', phoneNumber: '', industry: '', helpType: '', message: '', agreeToTerms: false });
    }, 1500);
  };

  return (
    <div>
      <Navbar />

      {/* ---- Hero: intro + info + form ---- */}
      <section className="contact-hero">
        <div className="container contact-hero-grid">
          <div>
            <p className="contact-eyebrow">CONTACT US</p>
            <h1 className="contact-heading">
              Let's build smarter<br />
              businesses <span className="contact-heading-accent">together.</span>
            </h1>
            <p className="contact-lead">
              Have a question, want a demo, or ready to get started? We'd love to hear from you.
            </p>

            <div className="contact-info-list">
              {contactInfo.map(({ icon: Icon, title, lines, link, linkText }) => (
                <div className="contact-info-row" key={title}>
                  <div className="contact-info-icon"><Icon size={19} /></div>
                  <div>
                    <h4>{title}</h4>
                    {lines.map((l) => <p key={l}>{l}</p>)}
                    {link && (
                      <a href={link} target="_blank" rel="noopener noreferrer" className="contact-info-link">
                        {linkText} <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-panel">
            {isSubmitted ? (
              <div className="contact-success">
                <div className="contact-success-icon"><CheckCircle size={28} color="var(--success, #34c98e)" /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-outline-gold"
                  style={{ marginTop: '1.4rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2>Send us a message</h2>
                <p>Fill out the form and our team will get back to you shortly.</p>
                <form onSubmit={handleSubmit}>
                  <div className="contact-field-grid">
                    <div className="contact-field">
                      <User size={16} className="contact-field-icon" />
                      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                    </div>
                    <div className="contact-field">
                      <User size={16} className="contact-field-icon" />
                      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                    </div>
                  </div>

                  <div className="contact-field" style={{ marginBottom: '1rem' }}>
                    <Mail size={16} className="contact-field-icon" />
                    <input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} placeholder="Business Email" required />
                  </div>

                  <div className="contact-field" style={{ marginBottom: '1rem' }}>
                    <Building2 size={16} className="contact-field-icon" />
                    <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" />
                  </div>

                  <div className="contact-field-grid">
                    <div className="contact-field">
                      <Phone size={16} className="contact-field-icon" />
                      <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                    </div>
                    <div className="contact-field">
                      <Briefcase size={16} className="contact-field-icon" />
                      <select name="industry" value={formData.industry} onChange={handleChange}>
                        <option value="">Industry</option>
                        {industries.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="contact-field" style={{ marginBottom: '1rem' }}>
                    <HelpCircle size={16} className="contact-field-icon" />
                    <select name="helpType" value={formData.helpType} onChange={handleChange} required>
                      <option value="">How can we help you?</option>
                      {helpOptions.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>

                  <div className="contact-field" style={{ marginBottom: '1rem' }}>
                    <Edit3 size={16} className="contact-field-icon" />
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your needs..." required />
                  </div>

                  <label className="contact-terms-row">
                    <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} required />
                    <span>I agree to the <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.</span>
                  </label>

                  <div className="contact-submit-row">
                    <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send size={17} />}
                    </button>
                    <span className="contact-reply-note"><Clock size={14} /> We typically reply within 24 hours</span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ---- Support options + FAQ ---- */}
      <section className="contact-secondary">
        <div className="container contact-secondary-grid">
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary, #f5f5f7)', margin: '0 0 1.2rem' }}>Get Support</h2>
            {supportOptions.map(({ icon: Icon, title, description, link, color, bg }) => (
              <a href={link} target="_blank" rel="noopener noreferrer" className="support-option-row" key={title}>
                <div className="support-option-icon" style={{ background: bg, color }}><Icon size={19} /></div>
                <div style={{ flex: 1 }}>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
                <ChevronRight size={18} color="var(--accent-gold, #f0c987)" />
              </a>
            ))}
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary, #f5f5f7)', margin: '0 0 1.2rem' }}>FAQs</h2>
            <div className="faq-panel">
              {faqs.map((faq) => (
                <div className="faq-item" key={faq.question}>
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Bottom CTA banner ---- */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="contact-cta-banner">
            <div className="contact-cta-text">
              <h2>Ready to see Senzia in action?</h2>
              <p>Book a personalized demo and discover how Senzia can help you automate, analyze, and grow with confidence.</p>
              <div className="contact-cta-actions">
                <Link to="/dashboard"><button className="btn-primary">Book a Demo <ArrowRight size={16} /></button></Link>
                <Link to="/product"><button className="btn-outline-gold">Explore Our Platform</button></Link>
              </div>
            </div>
            <div className="contact-cta-art">
              <svg width="70%" height="70%" viewBox="0 0 200 100" fill="none">
                <polyline points="10,80 40,60 70,68 100,40 130,50 160,20 190,30" stroke="#f0c987" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                {[10, 40, 70, 100, 130, 160, 190].map((x, i) => (
                  <circle key={x} cx={x} cy={[80, 60, 68, 40, 50, 20, 30][i]} r="2.5" fill="#f0c987" />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;