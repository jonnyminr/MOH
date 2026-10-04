import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, UserCheck, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  cartCount, 
  onOpenCart, 
  onOpenSearch,
  onOpenAdmin 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'Customize', id: 'customize' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id) => {
    setCurrentView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'rgba(8, 8, 8, 0.96)' : 'var(--bg-deep-black)',
        backdropFilter: 'blur(12px)',
        transition: 'all 300ms ease',
        padding: isScrolled ? '0.5rem 0' : '0.85rem 0',
        borderBottom: '1px solid rgba(201, 164, 92, 0.25)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Official Brand Logo Image */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
        >
          <img 
            src="/images/logo.jpg" 
            alt="MOH By Manali Logo" 
            style={{
              height: isScrolled ? '46px' : '56px',
              width: 'auto',
              objectFit: 'contain',
              transition: 'all 300ms ease',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentView === item.id ? 'var(--accent-antique-gold)' : 'var(--text-ivory-white)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: currentView === item.id ? '600' : '400',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                position: 'relative',
                padding: '0.5rem 0',
                transition: 'color 200ms ease'
              }}
            >
              {item.label}
              {currentView === item.id && (
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent-antique-gold)'
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Utility Icons & Guest Indicator (Book Appointment Removed per request) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          
          {/* Search Button */}
          <button 
            onClick={onOpenSearch}
            title="Search Catalogue"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-ivory-white)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.4rem'
            }}
          >
            <Search size={20} strokeWidth={1.8} />
          </button>

          {/* Guest Shopping Badge */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              padding: '0.35rem 0.75rem', 
              borderRadius: '999px',
              backgroundColor: 'rgba(23, 21, 19, 0.8)',
              border: '1px solid rgba(201, 164, 92, 0.3)',
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              color: 'var(--text-ivory-white)'
            }}
            title="Guest Shopping Mode - No Login Required"
          >
            <UserCheck size={14} color="var(--accent-antique-gold)" />
            <span style={{ fontWeight: 500 }}>Guest</span>
          </div>

          {/* Cart Icon */}
          <button 
            onClick={onOpenCart}
            title="View Shopping Bag"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-ivory-white)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              padding: '0.4rem'
            }}
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="badge-red" style={{ position: 'absolute', top: -2, right: -4 }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-ivory-white)',
              cursor: 'pointer',
              padding: '0.4rem'
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-charcoal)',
          borderTop: '1px solid rgba(201, 164, 92, 0.2)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: currentView === item.id ? 'var(--accent-antique-gold)' : 'var(--text-ivory-white)',
                fontSize: '1rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.5rem 0'
              }}
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
            style={{
              background: 'transparent',
              border: '1px dashed rgba(201, 164, 92, 0.4)',
              color: 'var(--accent-champagne-gold)',
              padding: '0.6rem',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <ShieldCheck size={14} />
            SHOWROOM CONCIERGE PORTAL
          </button>
        </div>
      )}

      {/* Inline styles for responsive layout toggles */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
