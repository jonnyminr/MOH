import React from 'react';
import { Sparkles, Award, Compass, Heart, Shield } from 'lucide-react';

export default function AboutView({ onBookClick }) {
  return (
    <div style={{ backgroundColor: 'var(--bg-deep-black)', color: 'var(--text-ivory-white)' }}>
      
      {/* Editorial About Hero */}
      <section style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(201, 164, 92, 0.2)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="about-hero-grid">
          
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
              <Sparkles size={14} color="var(--accent-antique-gold)" />
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.28em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                THE MOH HERITAGE
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.6rem', fontWeight: 600, color: 'var(--text-ivory-white)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              More Than Jewellery, <br />
              <span className="gold-gradient-text" style={{ fontStyle: 'italic' }}>It's Emotion.</span>
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#C9C0B5', lineHeight: 1.8, marginBottom: '1.5rem', fontWeight: 300 }}>
              Founded on centuries-old goldsmithing traditions, MOH bridges the sacred artistry of royal Indian ornaments with contemporary high-fashion elegance.
            </p>

            <p style={{ fontSize: '0.95rem', color: '#999', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Every creation that bears the MOH mark undergoes hundreds of hours of meticulous hand-forging, stone selection, and hallmarking by master artisans who have preserved hereditary crafts across generations.
            </p>

            <button onClick={onBookClick} className="btn-gold-primary">
              EXPERIENCE OUR SHOWROOM ATELIER
            </button>
          </div>

          {/* Master Craftsman Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ border: '1px solid var(--accent-antique-gold)', padding: '0.75rem', backgroundColor: 'var(--bg-charcoal)' }}>
              <img 
                src="/images/craftsmanship.jpg" 
                alt="Master Goldsmith at MOH Atelier" 
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', backgroundColor: 'var(--accent-antique-gold)', color: 'var(--bg-deep-black)', padding: '1.5rem', display: 'none' }} className="heritage-badge">
              <span style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', lineHeight: 1 }}>100%</span>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Authentic Artisanship</span>
            </div>
          </div>

        </div>
      </section>

      {/* Our Philosophy Callout Section */}
      <section style={{ backgroundColor: 'var(--bg-charcoal)', padding: '6rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(201, 164, 92, 0.2)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
            OUR PHILOSOPHY
          </span>

          <blockquote style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: 'var(--text-ivory-white)', fontStyle: 'italic', lineHeight: 1.35, marginBottom: '1.5rem' }}>
            "Jewellery is not just something you wear. <br />
            It becomes part of your memories."
          </blockquote>

          <div className="gold-divider" style={{ width: '100px', margin: '2rem auto' }} />

          <p style={{ fontSize: '1rem', color: '#B0A79C', lineHeight: 1.8 }}>
            Whether it is an heir-loomed Kundan choker passed down for a wedding, or a custom diamond ring celebrating a personal milestone, MOH ornaments are engineered to outlast generations, preserving stories in gold and gemstone.
          </p>
        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          .about-hero-grid { grid-template-columns: 1fr 1fr !important; }
          .heritage-badge { display: block !important; }
        }
      `}</style>
    </div>
  );
}
