import React from 'react';
import { SHOWROOM_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, MessageCircle, ArrowRight, Shield } from 'lucide-react';

export default function ShowroomSection({ onBookAppointment }) {
  return (
    <section 
      style={{
        backgroundColor: 'var(--bg-deep-black)',
        color: 'var(--text-ivory-white)',
        padding: '6rem 1.5rem',
        borderBottom: '1px solid rgba(201, 164, 92, 0.2)'
      }}
      id="contact-section"
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem auto' }}>
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.28em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
            FLAGSHIP STORE & ATELIER
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 600, color: 'var(--text-ivory-white)', marginBottom: '0.75rem' }}>
            Visit Our Showroom
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#AAA' }}>
            Immerse yourself in high Indian jewellery hospitality. Private valet & VIP suite sessions.
          </p>
          <div className="gold-divider" style={{ width: '80px', margin: '1rem auto 0 auto' }} />
        </div>

        {/* Content Grid: Left Contact Info | Right Interactive Map Box */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="showroom-grid">
          
          {/* Info Card */}
          <div 
            style={{
              backgroundColor: 'var(--bg-charcoal)',
              border: '1px solid var(--accent-antique-gold)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-ivory-white)', marginBottom: '1.5rem' }}>
                {SHOWROOM_INFO.name}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.95rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <MapPin size={20} color="var(--accent-antique-gold)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#888', display: 'block' }}>Address</span>
                    <span>{SHOWROOM_INFO.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Phone size={20} color="var(--accent-antique-gold)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#888', display: 'block' }}>Concierge Hotline</span>
                    <span>{SHOWROOM_INFO.phone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <MessageCircle size={20} color="var(--accent-antique-gold)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#888', display: 'block' }}>WhatsApp Enquiry</span>
                    <span>{SHOWROOM_INFO.whatsapp}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Mail size={20} color="var(--accent-antique-gold)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#888', display: 'block' }}>Email</span>
                    <span>{SHOWROOM_INFO.email}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Clock size={20} color="var(--accent-antique-gold)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#888', display: 'block' }}>Opening Hours</span>
                    <span>{SHOWROOM_INFO.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={onBookAppointment}
              className="btn-gold-primary"
              style={{ width: '100%', padding: '1rem' }}
            >
              VISIT OUR SHOWROOM <ArrowRight size={16} />
            </button>
          </div>

          {/* Interactive Map Visual */}
          <div 
            style={{
              backgroundColor: '#000',
              border: '1px solid rgba(201, 164, 92, 0.3)',
              position: 'relative',
              minHeight: '400px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justify: 'center',
              alignItems: 'center',
              padding: '2rem'
            }}
          >
            {/* Visual Styled Map Overlay */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(1) invert(0.9) brightness(0.6) contrast(1.2)'
              }}
            />

            {/* Dark Vignette Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, transparent 40%, rgba(8,8,8,0.9) 100%)' }} />

            {/* Map Pin Marker */}
            <div 
              style={{
                position: 'relative',
                zIndex: 10,
                backgroundColor: 'var(--bg-charcoal)',
                border: '2px solid var(--accent-antique-gold)',
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: 'var(--gold-glow)',
                maxWidth: '320px'
              }}
            >
              <MapPin size={32} color="var(--accent-antique-gold)" style={{ margin: '0 auto 0.5rem auto' }} />
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-ivory-white)' }}>
                MOH Flagship Store
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#BBB', marginTop: '0.3rem' }}>
                South Mumbai • Private Valet Parking
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  color: 'var(--accent-champagne-gold)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Get Directions →
              </a>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .showroom-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
