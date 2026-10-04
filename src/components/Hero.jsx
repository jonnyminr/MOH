import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onShopClick }) {
  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#000000',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(201, 164, 92, 0.2)'
      }}
      className="hero-section-root"
    >
      {/* Desktop Background Photo: Shifted to right so traditional bride is 100% visible */}
      <div 
        className="hero-bg-photo"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '54%',
          backgroundImage: `url('/images/hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.95
        }}
      />

      {/* Desktop Gradient: Pure Black on Left, Smooth Transition to Visible Bride on Right */}
      <div 
        className="hero-bg-gradient"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #000000 0%, #000000 48%, rgba(0,0,0,0.65) 66%, transparent 92%)'
        }}
      />

      {/* Main Content Container */}
      <div 
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          position: 'relative',
          zIndex: 10,
          width: '100%'
        }}
        className="hero-main-container"
      >
        <div style={{ maxWidth: '640px' }} className="fade-in hero-text-box">
          
          {/* Official Logo */}
          <div style={{ marginBottom: '1.75rem' }}>
            <img 
              src="/images/logo.jpg" 
              alt="MOH By Manali Official Logo" 
              className="hero-logo-img"
              style={{
                height: '145px',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* Small Gold Uppercase Tag */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              letterSpacing: '0.28em', 
              color: 'var(--accent-antique-gold)', 
              textTransform: 'uppercase',
              fontWeight: 600,
              fontFamily: 'var(--font-body)'
            }}>
              TRADITIONAL MEETS TIMELESS
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 
            className="hero-headline"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '3.8rem',
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'var(--text-ivory-white)',
              marginBottom: '1.75rem',
              letterSpacing: '0.01em'
            }}
          >
            Jewellery that <br />
            speaks your story
          </h1>

          {/* Gold Horizontal Snippet Line + Supporting Text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '45px', height: '1.5px', backgroundColor: 'var(--accent-antique-gold)', flexShrink: 0 }} />
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-ivory-white)', 
              opacity: 0.88,
              fontWeight: 300,
              letterSpacing: '0.03em'
            }}>
              Authentic designs. Eternal elegance.
            </p>
          </div>

          {/* Single Primary Gold CTA Button */}
          <div>
            <button 
              onClick={onShopClick}
              className="btn-gold-primary"
              style={{
                padding: '1rem 2.4rem',
                fontSize: '0.85rem',
                letterSpacing: '0.16em'
              }}
            >
              SHOP NOW <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile-Only Dedicated Traditional Girl Showcase Card */}
      <div className="mobile-bride-card-wrapper" style={{ display: 'none' }}>
        <div 
          style={{
            width: '100%',
            height: '320px',
            backgroundImage: `url('/images/hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            position: 'relative',
            borderBottom: '2px solid var(--accent-antique-gold)'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, #000000 100%)'
          }} />
        </div>
      </div>

      {/* Bottom Right Subtle Indicator Lines (Desktop Only) */}
      <div 
        className="desktop-indicators"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '3rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}
      >
        <div style={{ width: '20px', height: '2px', backgroundColor: 'var(--accent-antique-gold)' }} />
        <div style={{ width: '12px', height: '2px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
        <div style={{ width: '12px', height: '2px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
      </div>

    </section>
  );
}
