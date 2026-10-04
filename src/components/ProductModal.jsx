import React, { useState } from 'react';
import { X, Sliders, Calendar, MessageCircle, ShoppingBag, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function ProductModal({ 
  product, 
  onClose, 
  onCustomize, 
  onBook, 
  onEnquire, 
  onAddToCart 
}) {
  if (!product) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Gallery view mock thumbnails
  const galleryImages = [
    product.image,
    '/images/hero.jpg',
    '/images/jhumka.jpg'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '0', overflow: 'hidden' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 20,
            background: 'rgba(8, 8, 8, 0.8)',
            border: '1px solid rgba(201, 164, 92, 0.4)',
            color: 'var(--text-ivory-white)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0' }} className="product-modal-grid">
          
          {/* Left: Gallery */}
          <div style={{ backgroundColor: '#000', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '100%', height: '380px', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={galleryImages[selectedImgIndex] || product.image} 
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  style={{
                    width: '64px',
                    height: '64px',
                    border: selectedImgIndex === idx ? '2px solid var(--accent-antique-gold)' : '1px solid rgba(255,255,255,0.2)',
                    background: '#000',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    padding: 0
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--bg-charcoal)' }}>
            <div>
              
              {/* Product ID & Category */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                  {product.category}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#999', letterSpacing: '0.1em' }}>
                  ID: {product.id}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-ivory-white)', marginBottom: '1rem', lineHeight: 1.2 }}>
                {product.name}
              </h2>

              {/* Price */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-champagne-gold)', fontFamily: 'var(--font-body)' }}>
                  ₹{product.startingPrice.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>
                  (Taxes Included)
                </span>
              </div>

              {/* Specs Grid */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '1rem', 
                  backgroundColor: 'rgba(8, 8, 8, 0.5)', 
                  padding: '1.25rem', 
                  border: '1px solid rgba(201, 164, 92, 0.2)',
                  marginBottom: '1.5rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#888', display: 'block', textTransform: 'uppercase' }}>Material</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-ivory-white)', fontWeight: 500 }}>{product.material}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#888', display: 'block', textTransform: 'uppercase' }}>Purity</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-ivory-white)', fontWeight: 500 }}>{product.purity}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#888', display: 'block', textTransform: 'uppercase' }}>Approx Weight</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-ivory-white)', fontWeight: 500 }}>{product.weight}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#888', display: 'block', textTransform: 'uppercase' }}>Availability</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent-champagne-gold)', fontWeight: 500 }}>{product.availability}</span>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.9rem', color: '#C2B8AD', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              {/* Trust Badges */}
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.75rem', color: '#A0988E' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} color="var(--accent-antique-gold)" /> BIS 916 Hallmarked
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Truck size={16} color="var(--accent-antique-gold)" /> Insured Shipping
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={16} color="var(--accent-antique-gold)" /> Lifetime Care
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button 
                  onClick={() => { onClose(); onCustomize(product); }}
                  className="btn-gold-primary"
                  style={{ width: '100%', fontSize: '0.78rem', padding: '0.85rem' }}
                >
                  <Sliders size={15} /> CUSTOMIZE DESIGN
                </button>

                <button 
                  onClick={() => { onClose(); onBook(); }}
                  className="btn-gold-outline"
                  style={{ width: '100%', fontSize: '0.78rem', padding: '0.85rem' }}
                >
                  <Calendar size={15} /> BOOK APPOINTMENT
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button 
                  onClick={() => { onAddToCart(product); onClose(); }}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: 'var(--text-ivory-white)',
                    border: '1px solid rgba(201, 164, 92, 0.3)',
                    padding: '0.85rem',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <ShoppingBag size={15} /> ADD TO CART
                </button>

                <button 
                  onClick={() => { onClose(); onEnquire(product); }}
                  style={{
                    backgroundColor: 'rgba(201, 164, 92, 0.15)',
                    color: 'var(--accent-champagne-gold)',
                    border: '1px solid var(--accent-antique-gold)',
                    padding: '0.85rem',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <MessageCircle size={15} /> ENQUIRE NOW
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
