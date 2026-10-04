import React, { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import { Search, X, ArrowRight, Eye, Sliders } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onViewProduct, onCustomizeProduct }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const results = query.trim() === '' 
    ? PRODUCTS.slice(0, 4) 
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '750px' }}
      >
        {/* Search Header Input */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search 
            size={22} 
            color="var(--accent-antique-gold)" 
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input 
            type="text"
            autoFocus
            placeholder="Search by product name, category, material or ID (e.g. 'gold necklace', 'jhumka', 'MOH-NK-101')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#080808',
              border: '1px solid var(--accent-antique-gold)',
              color: 'var(--text-ivory-white)',
              padding: '1.1rem 3rem 1.1rem 3.2rem',
              fontSize: '1rem',
              outline: 'none',
              fontFamily: 'var(--font-body)'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Quick Tag Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Popular:</span>
          {['Gold Necklace', 'Jhumka', 'Temple Bangles', 'Polki Choker', 'Emerald', 'Mangalsutra'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              style={{
                backgroundColor: 'rgba(201, 164, 92, 0.1)',
                border: '1px solid rgba(201, 164, 92, 0.3)',
                color: 'var(--accent-champagne-gold)',
                fontSize: '0.72rem',
                padding: '0.25rem 0.65rem',
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div style={{ fontSize: '0.8rem', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          {query ? `Search Results (${results.length})` : 'Popular Showroom Featured Pieces'}
        </div>

        {/* Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '50vh', overflowY: 'auto' }}>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#888' }}>
              No matching jewellery found for "{query}". Try searching for 'Necklace', 'Gold', or 'Earrings'.
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#080808',
                  border: '1px solid rgba(201, 164, 92, 0.2)',
                  padding: '1rem',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-antique-gold)', textTransform: 'uppercase' }}>
                      {item.id} • {item.category}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-ivory-white)' }}>
                      {item.name}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                      {item.material} • ₹{item.startingPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => { onClose(); onViewProduct(item); }}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--accent-antique-gold)',
                      color: 'var(--accent-champagne-gold)',
                      padding: '0.5rem 0.8rem',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Eye size={13} /> VIEW
                  </button>

                  <button
                    onClick={() => { onClose(); onCustomizeProduct(item); }}
                    style={{
                      backgroundColor: 'var(--accent-antique-gold)',
                      border: '1px solid var(--accent-antique-gold)',
                      color: 'var(--bg-deep-black)',
                      fontWeight: 600,
                      padding: '0.5rem 0.8rem',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Sliders size={13} /> CUSTOMIZE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
