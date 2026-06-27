import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Senzia Limited', 'Nairobi, Kenya', 'PO Box 12345'],
      link: 'https://maps.google.com',
      linkText: 'Get Directions'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@senzia.com', 'support@senzia.com'],
      link: 'mailto:info@senzia.com',
      linkText: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+254 700 123 456', '+254 700 123 457'],
      link: 'tel:+254700123456',
      linkText: 'Call Now'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM', 'Sunday: Closed'],
      link: null,
      linkText: null
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Chat on WhatsApp',
      description: 'Get instant support on WhatsApp',
      action: 'Chat Now',
      link: 'https://wa.me/254700123456',
      color: '#25D366'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Email us and we\'ll respond within 24 hours',
      action: 'Send Email',
      link: 'mailto:support@senzia.com',
      color: '#7c3aed'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      action: 'Call Now',
      link: 'tel:+254700123456',
      color: '#3b82f6'
    }
  ];

  const faqs = [
    {
      question: 'What is the response time for support queries?',
      answer: 'We typically respond to all support queries within 24 hours. For urgent issues, we provide immediate assistance through our WhatsApp support.'
    },
    {
      question: 'Do you offer on-site training and consulting?',
      answer: 'Yes, we provide on-site training and consulting services for businesses in Kenya and across East Africa. Contact us to schedule a consultation.'
    },
    {
      question: 'Can I book a free consultation?',
      answer: 'Absolutely! We offer free consultations for businesses interested in learning more about SENZIA. Book a demo through our website.'
    },
    {
      question: 'What industries do you serve?',
      answer: 'We serve restaurants, clubs, supermarkets, hotels, fuel stations, logistics, manufacturing, retail, healthcare, and more.'
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
              Get in Touch
            </h1>
            
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Have questions about SENZIA? We're here to help. Reach out to us and 
              let's start a conversation about your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{ padding: '2rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '1.5rem'
          }}>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} style={{ 
                  padding: '1.5rem',
                  background: '#fafafa',
                  borderRadius: '16px',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ 
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#f3e8ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Icon size={24} color="#7c3aed" />
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: '#1a1a1a'
                  }}>
                    {info.title}
                  </h3>
                  
                  {info.details.map((detail, idx) => (
                    <p key={idx} style={{ 
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      fontSize: '0.95rem',
                      margin: '0.15rem 0'
                    }}>
                      {detail}
                    </p>
                  ))}

                  {info.link && (
                    <a href={info.link} target="_blank" rel="noopener noreferrer" style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginTop: '0.75rem',
                      color: '#7c3aed',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}>
                      {info.linkText} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{ padding: '4rem 0', background: '#fafafa' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '4rem',
            '@media (max-width: 768px)': { gridTemplateColumns: '1fr' }
          }}>
            {/* Form */}
            <div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                marginBottom: '0.5rem',
                color: '#1a1a1a'
              }}>
                Send Us a Message
              </h2>
              <p style={{ 
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                fontSize: '1rem'
              }}>
                Fill in the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div style={{ 
                  padding: '2rem',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #d1fae5',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#d1fae5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <CheckCircle size={32} color="#22c55e" />
                  </div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '0.5rem'
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    style={{
                      marginTop: '1.5rem',
                      background: 'transparent',
                      border: '1px solid #7c3aed',
                      padding: '0.5rem 2rem',
                      borderRadius: '8px',
                      color: '#7c3aed',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      color: '#1a1a1a',
                      fontSize: '0.95rem'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                        background: 'white'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      color: '#1a1a1a',
                      fontSize: '0.95rem'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                        background: 'white'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      color: '#1a1a1a',
                      fontSize: '0.95rem'
                    }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                        background: 'white'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      color: '#1a1a1a',
                      fontSize: '0.95rem'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                        background: 'white'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      color: '#1a1a1a',
                      fontSize: '0.95rem'
                    }}>
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        background: 'white',
                        color: '#1a1a1a'
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Demo">Product Demo</option>
                      <option value="Consulting Services">Consulting Services</option>
                      <option value="Training Programs">Training Programs</option>
                      <option value="Support">Support</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ 
                      display: 'block',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      color: '#1a1a1a',
                      fontSize: '0.95rem'
                    }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you"
                      rows="5"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease',
                        background: 'white',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                      border: 'none',
                      padding: '0.875rem',
                      borderRadius: '8px',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={18} />}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column - Support Options & FAQ */}
            <div>
              <h2 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                marginBottom: '0.5rem',
                color: '#1a1a1a'
              }}>
                Get Support
              </h2>
              <p style={{ 
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                fontSize: '1rem'
              }}>
                Our support team is available 24/7 to help you.
              </p>

              {/* Support Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {supportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <a
                      key={index}
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1.25rem',
                        background: 'white',
                        borderRadius: '12px',
                        border: '1px solid #f0f0f0',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ 
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: `${option.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem',
                        flexShrink: 0
                      }}>
                        <Icon size={20} color={option.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 700,
                          color: '#1a1a1a',
                          marginBottom: '0.2rem'
                        }}>
                          {option.title}
                        </h4>
                        <p style={{ 
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)'
                        }}>
                          {option.description}
                        </p>
                      </div>
                      <ChevronRight size={20} color="#7c3aed" />
                    </a>
                  );
                })}
              </div>

              {/* FAQ Section */}
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #f0f0f0'
              }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 700,
                  color: '#1a1a1a',
                  marginBottom: '1rem'
                }}>
                  Frequently Asked Questions
                </h3>
                {faqs.map((faq, index) => (
                  <div key={index} style={{
                    padding: '0.75rem 0',
                    borderBottom: index < faqs.length - 1 ? '1px solid #f0f0f0' : 'none'
                  }}>
                    <h4 style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      marginBottom: '0.25rem'
                    }}>
                      {faq.question}
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
              Book a Demo →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;