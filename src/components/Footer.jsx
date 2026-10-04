import React from 'react';
import { Sparkles, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import { SHOWROOM_INFO } from '../data/mockData';

export default function Footer({ onNavClick, onOpenAdmin }) {
  return (
    <footer 
      style={{
        backgroundColor: 'var(--bg-deep-black)',
        color: 'var(--text-ivory-white)',
        borderTop: '1px solid rgba(201, 164, 92, 0.25)',
        padding: '5rem 1.5rem 2rem 1.5rem'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Main Footer Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img 
                src="/images/logo.jpg" 
                alt="MOH By Manali Official Logo" 
                style={{ height: '60px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }}
              />
            </div>
            
            <span style={{ 
              fontSize: '0.65rem', 
              letterSpacing: '0.24em', 
              color: 'var(--accent-antique-gold)', 
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1.25rem'
            }}>
              Traditional Meets Timeless
            </span>
            <p style={{ fontSize: '0.88rem', color: '#999', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              MOH BY MANALI — High Indian jewellery atelier hand-forging authentic 22K/18K gold, Kundan, and uncut Polki heirlooms.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--accent-champagne-gold)' }}>
              <Sparkles size={14} /> BIS 916 Certified Jewellery
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-ivory-white)', marginBottom: '1.25rem', letterSpacing: '0.08em' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              {['Home', 'Shop', 'Customize', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => onNavClick(item.toLowerCase())}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#AAA',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color 200ms ease'
                  }}
                  className="footer-link"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-ivory-white)', marginBottom: '1.25rem', letterSpacing: '0.08em' }}>
              Concierge Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: '#AAA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="var(--accent-antique-gold)" /> {SHOWROOM_INFO.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageCircle size={14} color="var(--accent-antique-gold)" /> WhatsApp: {SHOWROOM_INFO.formattedWhatsapp}
              </div>
              <span style={{ cursor: 'pointer' }} className="footer-link">Track Request ID</span>
              <span style={{ cursor: 'pointer' }} className="footer-link">Shipping & Insured Transit</span>
              <span style={{ cursor: 'pointer' }} className="footer-link">Authenticity Guarantee</span>
            </div>
          </div>

          {/* Follow Us & Concierge */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-ivory-white)', marginBottom: '1.25rem', letterSpacing: '0.08em' }}>
              Follow Us
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <a 
                href={SHOWROOM_INFO.instagram} 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-champagne-gold)', textDecoration: 'none' }}
                className="footer-link"
              >
                {/* Inline Instagram SVG Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                {SHOWROOM_INFO.instagramHandle}
              </a>

              <a 
                href={SHOWROOM_INFO.facebook} 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#AAA', textDecoration: 'none' }}
                className="footer-link"
              >
                {/* Inline Facebook SVG Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                {SHOWROOM_INFO.facebookHandle}
              </a>
            </div>

            <button
              onClick={onOpenAdmin}
              style={{
                backgroundColor: 'rgba(23, 21, 19, 0.8)',
                border: '1px dashed rgba(201, 164, 92, 0.4)',
                color: 'var(--accent-antique-gold)',
                padding: '0.6rem 1rem',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <ShieldCheck size={14} /> SHOWROOM CONCIERGE PORTAL
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: '#777' }}>
          <div>
            © 2026 MOH BY MANALI. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Guest Shopping Policy</span>
          </div>
        </div>

      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-antique-gold) !important;
        }
      `}</style>
    </footer>
  );
}
