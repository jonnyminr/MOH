import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

export default function CategorySection({ onSelectCategory }) {
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
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem auto' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            letterSpacing: '0.28em', 
            color: 'var(--accent-gold-dark)', 
            textTransform: 'uppercase',
            fontWeight: 600,
            display: 'block',
            marginBottom: '0.6rem'
          }}>
            COLLECTIONS
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '2.6rem', 
            fontWeight: 600, 
            color: 'var(--text-warm-dark)',
            marginBottom: '1rem'
          }}>
            Timeless Pieces for Every Moment
          </h2>
          <p style={{ 
            fontSize: '1rem', 
            color: '#4A443E', 
            letterSpacing: '0.02em',
            fontWeight: 400
          }}>
            Discover jewellery crafted to become part of your story.
          </p>
          <div className="gold-divider" style={{ width: '80px', margin: '1.5rem auto 0 auto' }} />
        </div>

        {/* Categories Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {CATEGORIES.map((cat, index) => (
            <div
              key={index}
              onClick={() => onSelectCategory(cat.name)}
              className="category-card"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(201, 164, 92, 0.25)',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Image Container */}
              <div style={{ height: '320px', width: '100%', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--bg-charcoal)' }}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="cat-img"
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(8, 8, 8, 0.75) 100%)'
                  }}
                />
                
                {/* Designs Count Pill */}
                <span 
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(8, 8, 8, 0.8)',
                    color: 'var(--accent-champagne-gold)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    padding: '0.35rem 0.75rem',
                    border: '1px solid rgba(201, 164, 92, 0.4)',
                    textTransform: 'uppercase'
                  }}
                >
                  {cat.count}
                </span>
              </div>

              {/* Text Info */}
              <div style={{ padding: '1.75rem' }}>
                <h3 style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '1.5rem', 
                  color: 'var(--text-warm-dark)',
                  marginBottom: '0.4rem',
                  fontWeight: 600
                }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6E655C', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {cat.tagline}
                </p>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    fontSize: '0.82rem', 
                    fontWeight: 600, 
                    letterSpacing: '0.14em',
                    color: 'var(--accent-gold-dark)',
                    textTransform: 'uppercase'
                  }}
                  className="explore-link"
                >
                  Explore <ArrowRight size={15} className="arrow-icon" style={{ transition: 'transform 300ms ease' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Hover FX Styles */}
      <style>{`
        .category-card:hover {
          border-color: var(--accent-antique-gold) !important;
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(201, 164, 92, 0.15) !important;
        }
        .category-card:hover .cat-img {
          transform: scale(1.08);
        }
        .category-card:hover .arrow-icon {
          transform: translateX(6px);
        }
      `}</style>
    </section>
  );
}
