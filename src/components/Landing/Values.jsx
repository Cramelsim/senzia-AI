import React from 'react';

const Values = () => {
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

  return (
    <section style={{ padding: '4rem 0', background: 'white' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem'
        }}>
          {values.map((value, index) => (
            <div key={index} style={{ 
              textAlign: 'center',
              padding: '2rem 1.5rem',
              borderRadius: '12px',
              background: '#faf5ff',
              border: '1px solid #f3e8ff',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '1rem',
                display: 'block'
              }}>
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
  );
};

export default Values;