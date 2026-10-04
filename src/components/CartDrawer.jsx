import React from 'react';
import { X, Trash2, Calendar, FileText, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem,
  onOpenBooking,
  onRequestQuote 
}) {
  if (!isOpen) return null;

  const totalEstimate = cartItems.reduce((sum, item) => sum + (item.startingPrice * item.quantity), 0);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100vh',
          backgroundColor: 'var(--bg-charcoal)',
          borderLeft: '1px solid var(--accent-antique-gold)',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          padding: '2rem 1.5rem',
          position: 'relative',
          boxShadow: 'var(--shadow-dark)'
        }}
        className="fade-in"
      >
        {/* Header */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(201, 164, 92, 0.25)', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShoppingBag size={20} color="var(--accent-antique-gold)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-ivory-white)' }}>
                Guest Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-ivory-white)', cursor: 'pointer' }}>
              <X size={22} />
            </button>
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <ShoppingBag size={48} color="#444" style={{ margin: '0 auto 1rem auto' }} />
              <p style={{ color: '#AAA', fontSize: '0.95rem' }}>Your shopping bag is currently empty.</p>
              <button 
                onClick={onClose} 
                className="btn-gold-outline"
                style={{ marginTop: '1.5rem', fontSize: '0.75rem' }}
              >
                DISCOVER COLLECTIONS
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '60vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {cartItems.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    backgroundColor: '#080808',
                    border: '1px solid rgba(201, 164, 92, 0.2)',
                    padding: '0.85rem'
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '75px', height: '75px', objectFit: 'cover' }} 
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-ivory-white)' }}>
                          {item.name}
                        </h4>
                        <button 
                          onClick={() => onRemoveItem(idx)}
                          style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer' }}
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-antique-gold)' }}>
                        {item.purity} • {item.material}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #333' }}>
                        <button 
                          onClick={() => onUpdateQty(idx, item.quantity - 1)}
                          style={{ background: '#111', color: '#FFF', border: 'none', padding: '0.2rem 0.6rem', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0 0.6rem', fontSize: '0.8rem', color: '#FFF' }}>{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(idx, item.quantity + 1)}
                          style={{ background: '#111', color: '#FFF', border: 'none', padding: '0.2rem 0.6rem', cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-champagne-gold)', fontFamily: 'var(--font-body)' }}>
                        ₹{(item.startingPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & CTAs */}
        {cartItems.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(201, 164, 92, 0.25)', paddingTop: '1.25rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estimated Total</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-champagne-gold)', fontFamily: 'var(--font-body)' }}>
                ₹{totalEstimate.toLocaleString('en-IN')}
              </span>
            </div>

            <p style={{ fontSize: '0.72rem', color: '#888', marginBottom: '1.25rem', textAlign: 'center' }}>
              For high-value & bespoke jewellery, request an official quotation or reserve showroom viewing.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                onClick={() => { onClose(); onRequestQuote(cartItems); }}
                className="btn-gold-primary"
                style={{ width: '100%', padding: '0.95rem' }}
              >
                <FileText size={16} /> REQUEST OFFICIAL QUOTE
              </button>

              <button 
                onClick={() => { onClose(); onOpenBooking(); }}
                className="btn-gold-outline"
                style={{ width: '100%', padding: '0.95rem' }}
              >
                <Calendar size={16} /> BOOK SHOWROOM VIEWING
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
