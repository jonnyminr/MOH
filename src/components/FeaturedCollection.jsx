import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Eye, Sliders, ShoppingBag, Sparkles, MessageCircle } from 'lucide-react';

export default function FeaturedCollection({ 
  onViewProduct, 
  onCustomizeProduct, 
  onAddToCart,
  onEnquireProduct,
  selectedCategory,
  onResetCategory 
}) {
  const [activeFilter, setActiveFilter] = useState(selectedCategory || 'All');

  const categories = ['All', 'Necklaces', 'Earrings', 'Bangles', 'Rings', 'Mangalsutra', 'Bracelets'];

  const filteredProducts = activeFilter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <section 
      style={{
        backgroundColor: 'var(--bg-deep-black)',
        color: 'var(--text-ivory-white)',
        padding: '6rem 1.5rem',
        borderBottom: '1px solid rgba(201, 164, 92, 0.2)'
      }}
      id="shop-section"
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={14} color="var(--accent-antique-gold)" />
            <span style={{ 
              fontSize: '0.75rem', 
              letterSpacing: '0.28em', 
              color: 'var(--accent-antique-gold)', 
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              FEATURED CATALOGUE
            </span>
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '2.6rem', 
            fontWeight: 600, 
            color: 'var(--text-ivory-white)',
            marginBottom: '1rem'
          }}>
            Curated For You
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#B3AAA0', letterSpacing: '0.02em' }}>
            Handcrafted luxury ornaments celebrating India's rich artisanal heritage.
          </p>
          <div className="gold-divider" style={{ width: '80px', margin: '1.25rem auto 0 auto' }} />
        </div>

        {/* Category Filters */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3.5rem'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                backgroundColor: activeFilter === cat ? 'var(--accent-antique-gold)' : 'var(--bg-charcoal)',
                color: activeFilter === cat ? 'var(--bg-deep-black)' : 'var(--text-ivory-white)',
                border: activeFilter === cat ? '1px solid var(--accent-antique-gold)' : '1px solid rgba(201, 164, 92, 0.25)',
                padding: '0.55rem 1.25rem',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: activeFilter === cat ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 200ms ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '2rem'
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="dark-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Product Image Box */}
              <div style={{ position: 'relative', height: '310px', backgroundColor: '#000', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 500ms ease'
                  }}
                  className="product-img"
                />
                
                {/* ID Tag */}
                <span 
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    backgroundColor: 'rgba(8, 8, 8, 0.85)',
                    color: 'var(--accent-champagne-gold)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    padding: '0.25rem 0.6rem',
                    border: '1px solid rgba(201, 164, 92, 0.3)'
                  }}
                >
                  {product.id}
                </span>

                {/* Quick Action Overlay Buttons */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    right: '0.75rem',
                    display: 'flex',
                    gap: '0.5rem',
                    opacity: 0,
                    transform: 'translateY(10px)',
                    transition: 'all 300ms ease'
                  }}
                  className="card-quick-actions"
                >
                  <button 
                    onClick={() => onViewProduct(product)}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(8, 8, 8, 0.9)',
                      color: 'var(--text-ivory-white)',
                      border: '1px solid var(--accent-antique-gold)',
                      padding: '0.5rem',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Eye size={13} /> DETAILS
                  </button>
                  
                  <button 
                    onClick={() => onCustomizeProduct(product)}
                    style={{
                      flex: 1,
                      backgroundColor: 'var(--accent-antique-gold)',
                      color: 'var(--bg-deep-black)',
                      border: '1px solid var(--accent-antique-gold)',
                      padding: '0.5rem',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Sliders size={13} /> CUSTOMIZE
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase' }}>
                      {product.category}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#999', letterSpacing: '0.05em' }}>
                      {product.purity}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onViewProduct(product)}
                    style={{ 
                      fontFamily: 'var(--font-heading)', 
                      fontSize: '1.25rem', 
                      color: 'var(--text-ivory-white)',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    {product.name}
                  </h3>

                  <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem', lineHeight: 1.4 }}>
                    {product.material} • Approx {product.weight}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.8rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Starting at</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent-champagne-gold)', fontFamily: 'var(--font-body)' }}>
                      ₹{product.startingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button 
                      onClick={() => onAddToCart(product)}
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--text-ivory-white)',
                        border: '1px solid rgba(201, 164, 92, 0.4)',
                        padding: '0.6rem 0.4rem',
                        fontSize: '0.72rem',
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem'
                      }}
                      className="btn-add-cart"
                    >
                      <ShoppingBag size={13} /> ADD TO CART
                    </button>

                    <button 
                      onClick={() => onEnquireProduct(product)}
                      style={{
                        backgroundColor: 'rgba(201, 164, 92, 0.12)',
                        color: 'var(--accent-champagne-gold)',
                        border: '1px solid var(--accent-antique-gold)',
                        padding: '0.6rem 0.4rem',
                        fontSize: '0.72rem',
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <MessageCircle size={13} /> ENQUIRE
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .dark-card:hover .product-img {
          transform: scale(1.06);
        }
        .dark-card:hover .card-quick-actions {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .btn-add-cart:hover {
          background: rgba(201, 164, 92, 0.2) !important;
          border-color: var(--accent-antique-gold) !important;
        }
      `}</style>
    </section>
  );
}
