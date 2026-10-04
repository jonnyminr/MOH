import React from 'react';
import { Award, Compass, Heart, ShieldCheck } from 'lucide-react';

export default function WhyChooseUsSection() {
  const pillars = [
    {
      icon: <Award size={32} strokeWidth={1.5} color="var(--accent-gold-dark)" />,
      title: 'Premium Quality',
      subtitle: 'Crafted with care',
      description: 'Certified 22K/18K BIS 916 hallmarked gold and ethically sourced conflict-free natural diamonds.'
    },
    {
      icon: <Compass size={32} strokeWidth={1.5} color="var(--accent-gold-dark)" />,
      title: 'Authentic Designs',
      subtitle: 'Traditional meets modern',
      description: 'Heirloom Kundan, Polki, and Nakshi temple motifs fused with comfortable contemporary weight distribution.'
    },
    {
      icon: <Heart size={32} strokeWidth={1.5} color="var(--accent-gold-dark)" />,
      title: 'Personalized Service',
      subtitle: 'Made for you',
      description: 'Private showroom consultation, bespoke CAD 3D previews, and custom metal/stone personalization.'
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} color="var(--accent-gold-dark)" />,
      title: 'Trusted Craftsmanship',
      subtitle: 'Quality you can depend on',
      description: 'Lifetime maintenance, complimentary cleaning, official valuation certificate, and transparent gold weight pricing.'
    }
  ];

  return (
    <section 
      style={{
        backgroundColor: 'var(--bg-warm-ivory)',
        color: 'var(--text-warm-dark)',
        padding: '6rem 1.5rem',
        borderBottom: '1px solid rgba(201, 164, 92, 0.3)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem auto' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.28em', color: 'var(--accent-gold-dark)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            THE MOH COMMITMENT
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 600, color: 'var(--text-warm-dark)', marginBottom: '0.75rem' }}>
            Why Choose Us
          </h2>
          <div className="gold-divider" style={{ width: '80px', margin: '1rem auto 0 auto' }} />
        </div>

        {/* 4 Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
          {pillars.map((item, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(201, 164, 92, 0.25)',
                padding: '2.25rem 1.75rem',
                textAlign: 'center',
                transition: 'all 300ms ease'
              }}
              className="why-card"
            >
              <div style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--text-warm-dark)', marginBottom: '0.3rem', fontWeight: 600 }}>
                {item.title}
              </h3>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--accent-gold-dark)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
                "{item.subtitle}"
              </span>
              <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .why-card:hover {
          border-color: var(--accent-gold-dark) !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(201, 164, 92, 0.12);
        }
      `}</style>
    </section>
  );
}
