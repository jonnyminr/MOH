import React, { useState, useMemo } from 'react';
import { Sliders, Sparkles, Check, RefreshCw, Send, ShieldCheck, Scale, DollarSign } from 'lucide-react';

export default function CustomizerSection({ initialProduct, onRequestCustomDesign }) {
  
  // Customization State Options
  const ornamentTypes = ['Necklace', 'Earrings', 'Bangles', 'Ring', 'Mangalsutra', 'Bracelet'];
  const materials = ['Gold', 'White Gold', 'Rose Gold', 'Silver', 'Platinum'];
  const purities = ['18K', '20K', '22K', '24K'];
  const stones = ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'No Stone'];
  const styles = ['Classic', 'Minimal', 'Royal', 'Modern', 'Bridal', 'Traditional'];

  // Current Selections
  const [ornament, setOrnament] = useState(initialProduct ? (initialProduct.category.slice(0, -1) || 'Necklace') : 'Necklace');
  const [material, setMaterial] = useState('Gold');
  const [purity, setPurity] = useState('22K');
  const [stone, setStone] = useState('Emerald');
  const [style, setStyle] = useState('Royal');
  const [size, setSize] = useState('Medium / Standard');

  // Sizes based on Ornament
  const sizeOptions = useMemo(() => {
    switch (ornament) {
      case 'Ring':
        return ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10'];
      case 'Necklace':
        return ['14" Choker', '16" Princess', '18" Matinee', '24" Opera / Haar'];
      case 'Bangles':
        return ['Size 2.2', 'Size 2.4', 'Size 2.6', 'Size 2.8'];
      case 'Bracelet':
        return ['6.5 Inches', '7.0 Inches', '7.5 Inches', '8.0 Inches'];
      case 'Earrings':
        return ['Petite (15mm)', 'Medium (30mm)', 'Heavy Statement (55mm)'];
      case 'Mangalsutra':
        return ['18 Inches', '22 Inches', '26 Inches', '30 Inches'];
      default:
        return ['Standard'];
    }
  }, [ornament]);

  // Set default size when ornament changes
  React.useEffect(() => {
    if (sizeOptions && sizeOptions.length > 0) {
      setSize(sizeOptions[1] || sizeOptions[0]);
    }
  }, [ornament, sizeOptions]);

  // Realistic Calculation Engine
  const calculation = useMemo(() => {
    // Base Gold Weight (Grams)
    let baseWeight = 25;
    if (ornament === 'Necklace') baseWeight = 65;
    if (ornament === 'Bangles') baseWeight = 48;
    if (ornament === 'Earrings') baseWeight = 22;
    if (ornament === 'Ring') baseWeight = 9;
    if (ornament === 'Mangalsutra') baseWeight = 30;
    if (ornament === 'Bracelet') baseWeight = 24;

    // Purity & Material Factor
    let goldRatePerGram = 6850; // INR base
    let purityFactor = 0.92; // 22K
    if (purity === '24K') purityFactor = 1.0;
    if (purity === '20K') purityFactor = 0.84;
    if (purity === '18K') purityFactor = 0.75;

    let materialMultiplier = 1.0;
    if (material === 'Platinum') materialMultiplier = 1.35;
    if (material === 'White Gold') materialMultiplier = 1.1;
    if (material === 'Rose Gold') materialMultiplier = 1.05;
    if (material === 'Silver') materialMultiplier = 0.08;

    // Stone Additions
    let stoneCost = 0;
    let stoneWeightGrams = 0;
    if (stone === 'Diamond') { stoneCost = 85000; stoneWeightGrams = 1.8; }
    if (stone === 'Emerald') { stoneCost = 55000; stoneWeightGrams = 2.5; }
    if (stone === 'Ruby') { stoneCost = 48000; stoneWeightGrams = 2.2; }
    if (stone === 'Sapphire') { stoneCost = 60000; stoneWeightGrams = 2.0; }
    if (stone === 'Pearl') { stoneCost = 22000; stoneWeightGrams = 3.0; }

    // Style Complexity Factor
    let styleFactor = 1.1;
    if (style === 'Royal' || style === 'Bridal') styleFactor = 1.3;
    if (style === 'Minimal') styleFactor = 1.0;
    if (style === 'Traditional') styleFactor = 1.2;

    const totalWeight = (baseWeight * materialMultiplier + stoneWeightGrams).toFixed(1);
    const metalCost = baseWeight * goldRatePerGram * purityFactor * materialMultiplier;
    const makingCharges = metalCost * (0.15 * styleFactor);
    const estimatedPrice = Math.round(metalCost + makingCharges + stoneCost);

    return {
      weight: totalWeight,
      price: estimatedPrice
    };
  }, [ornament, material, purity, stone, style]);

  // Color Mapping for Live SVG Preview
  const getMetalColor = () => {
    if (material === 'Gold') return '#C9A45C';
    if (material === 'White Gold') return '#E2E8F0';
    if (material === 'Rose Gold') return '#E0A996';
    if (material === 'Silver') return '#CBD5E1';
    if (material === 'Platinum') return '#94A3B8';
    return '#C9A45C';
  };

  const getGemColor = () => {
    if (stone === 'Diamond') return '#F8FAFC';
    if (stone === 'Ruby') return '#D71920';
    if (stone === 'Emerald') return '#10B981';
    if (stone === 'Sapphire') return '#3B82F6';
    if (stone === 'Pearl') return '#FFFBEB';
    return 'transparent';
  };

  const handleRequestSubmit = () => {
    onRequestCustomDesign({
      ornamentType: ornament,
      material,
      purity,
      stone,
      style,
      size,
      estimatedPrice: calculation.price,
      estimatedWeight: calculation.weight
    });
  };

  return (
    <section 
      style={{
        backgroundColor: 'var(--bg-deep-black)',
        color: 'var(--text-ivory-white)',
        padding: '6rem 1.5rem',
        borderBottom: '1px solid rgba(201, 164, 92, 0.2)'
      }}
      id="customizer-section"
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={14} color="var(--accent-antique-gold)" />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.28em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
              BESPOKE SHOWROOM ATELIER
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--text-ivory-white)', marginBottom: '1rem' }}>
            Design Your Ornament
          </h2>
          <p style={{ fontSize: '1rem', color: '#B3AAA0', letterSpacing: '0.02em' }}>
            Select your preferred precious metal, purity, gemstone, and style to visualize your custom MOH creation in real-time.
          </p>
          <div className="gold-divider" style={{ width: '80px', margin: '1.25rem auto 0 auto' }} />
        </div>

        {/* Grid: Left Options Controls | Right Live Preview & Price */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="customizer-grid">
          
          {/* Options Selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* 1. ORNAMENT TYPE */}
            <div>
              <label style={{ fontSize: '0.8rem', letterSpacing: '0.14em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                1. Ornament Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
                {ornamentTypes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setOrnament(item)}
                    style={{
                      backgroundColor: ornament === item ? 'var(--accent-antique-gold)' : 'var(--bg-charcoal)',
                      color: ornament === item ? 'var(--bg-deep-black)' : 'var(--text-ivory-white)',
                      border: ornament === item ? '1px solid var(--accent-antique-gold)' : '1px solid rgba(201, 164, 92, 0.2)',
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: ornament === item ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. MATERIAL */}
            <div>
              <label style={{ fontSize: '0.8rem', letterSpacing: '0.14em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                2. Material
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
                {materials.map((item) => (
                  <button
                    key={item}
                    onClick={() => setMaterial(item)}
                    style={{
                      backgroundColor: material === item ? 'var(--accent-antique-gold)' : 'var(--bg-charcoal)',
                      color: material === item ? 'var(--bg-deep-black)' : 'var(--text-ivory-white)',
                      border: material === item ? '1px solid var(--accent-antique-gold)' : '1px solid rgba(201, 164, 92, 0.2)',
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: material === item ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. PURITY */}
            <div>
              <label style={{ fontSize: '0.8rem', letterSpacing: '0.14em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                3. Gold Purity
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
                {purities.map((item) => (
                  <button
                    key={item}
                    onClick={() => setPurity(item)}
                    style={{
                      backgroundColor: purity === item ? 'var(--accent-antique-gold)' : 'var(--bg-charcoal)',
                      color: purity === item ? 'var(--bg-deep-black)' : 'var(--text-ivory-white)',
                      border: purity === item ? '1px solid var(--accent-antique-gold)' : '1px solid rgba(201, 164, 92, 0.2)',
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: purity === item ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. STONE */}
            <div>
              <label style={{ fontSize: '0.8rem', letterSpacing: '0.14em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                4. Gemstone Accent
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
                {stones.map((item) => (
                  <button
                    key={item}
                    onClick={() => setStone(item)}
                    style={{
                      backgroundColor: stone === item ? 'var(--accent-antique-gold)' : 'var(--bg-charcoal)',
                      color: stone === item ? 'var(--bg-deep-black)' : 'var(--text-ivory-white)',
                      border: stone === item ? '1px solid var(--accent-antique-gold)' : '1px solid rgba(201, 164, 92, 0.2)',
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: stone === item ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. STYLE */}
            <div>
              <label style={{ fontSize: '0.8rem', letterSpacing: '0.14em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                5. Aesthetic Style
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
                {styles.map((item) => (
                  <button
                    key={item}
                    onClick={() => setStyle(item)}
                    style={{
                      backgroundColor: style === item ? 'var(--accent-antique-gold)' : 'var(--bg-charcoal)',
                      color: style === item ? 'var(--bg-deep-black)' : 'var(--text-ivory-white)',
                      border: style === item ? '1px solid var(--accent-antique-gold)' : '1px solid rgba(201, 164, 92, 0.2)',
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.8rem',
                      fontWeight: style === item ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. SIZE */}
            <div>
              <label style={{ fontSize: '0.8rem', letterSpacing: '0.14em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                6. Custom Size / Length
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-charcoal)',
                  color: 'var(--text-ivory-white)',
                  border: '1px solid rgba(201, 164, 92, 0.3)',
                  padding: '0.85rem 1rem',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Right Live Preview Canvas & Dynamic Price Card */}
          <div 
            style={{
              backgroundColor: 'var(--bg-charcoal)',
              border: '1px solid var(--accent-antique-gold)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.14em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                  LIVE BESPOKE PREVIEW
                </span>
                <span style={{ fontSize: '0.72rem', color: '#888', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={12} /> Auto-Calculated
                </span>
              </div>

              {/* Dynamic SVG Visual Preview Box */}
              <div 
                style={{
                  height: '280px',
                  backgroundColor: '#080808',
                  border: '1px solid rgba(201, 164, 92, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(201, 164, 92, 0.15) 0%, transparent 70%)'
                }} />

                {/* SVG Render Engine based on Ornament & Colors */}
                <svg width="220" height="220" viewBox="0 0 200 200" style={{ position: 'relative', zIndex: 5 }}>
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Ornament Specific Shapes */}
                  {ornament === 'Necklace' && (
                    <g filter="url(#glow)">
                      {/* Outer Arch */}
                      <path d="M 30,70 Q 100,160 170,70" fill="none" stroke={getMetalColor()} strokeWidth="6" />
                      <path d="M 45,85 Q 100,175 155,85" fill="none" stroke={getMetalColor()} strokeWidth="3" />
                      {/* Gem Drops */}
                      {stone !== 'No Stone' && (
                        <>
                          <circle cx="100" cy="172" r="8" fill={getGemColor()} stroke={getMetalColor()} strokeWidth="2" />
                          <circle cx="75" cy="150" r="6" fill={getGemColor()} stroke={getMetalColor()} strokeWidth="2" />
                          <circle cx="125" cy="150" r="6" fill={getGemColor()} stroke={getMetalColor()} strokeWidth="2" />
                          <circle cx="55" cy="115" r="5" fill={getGemColor()} stroke={getMetalColor()} strokeWidth="1.5" />
                          <circle cx="145" cy="115" r="5" fill={getGemColor()} stroke={getMetalColor()} strokeWidth="1.5" />
                        </>
                      )}
                    </g>
                  )}

                  {ornament === 'Earrings' && (
                    <g filter="url(#glow)">
                      {/* Pair of Jhumka/Drop Earrings */}
                      {/* Left Earring */}
                      <circle cx="65" cy="50" r="8" fill={getMetalColor()} />
                      <line x1="65" y1="58" x2="65" y2="80" stroke={getMetalColor()} strokeWidth="3" />
                      <path d="M 45,95 Q 65,75 85,95 Z" fill={getMetalColor()} />
                      {stone !== 'No Stone' && (
                        <>
                          <circle cx="65" cy="50" r="4" fill={getGemColor()} />
                          <circle cx="55" cy="102" r="4" fill={getGemColor()} />
                          <circle cx="65" cy="104" r="4" fill={getGemColor()} />
                          <circle cx="75" cy="102" r="4" fill={getGemColor()} />
                        </>
                      )}

                      {/* Right Earring */}
                      <circle cx="135" cy="50" r="8" fill={getMetalColor()} />
                      <line x1="135" y1="58" x2="135" y2="80" stroke={getMetalColor()} strokeWidth="3" />
                      <path d="M 115,95 Q 135,75 155,95 Z" fill={getMetalColor()} />
                      {stone !== 'No Stone' && (
                        <>
                          <circle cx="135" cy="50" r="4" fill={getGemColor()} />
                          <circle cx="125" cy="102" r="4" fill={getGemColor()} />
                          <circle cx="135" cy="104" r="4" fill={getGemColor()} />
                          <circle cx="145" cy="102" r="4" fill={getGemColor()} />
                        </>
                      )}
                    </g>
                  )}

                  {ornament === 'Ring' && (
                    <g filter="url(#glow)">
                      <circle cx="100" cy="110" r="55" fill="none" stroke={getMetalColor()} strokeWidth="12" />
                      <rect x="86" y="46" width="28" height="18" fill={getMetalColor()} rx="2" />
                      {stone !== 'No Stone' && (
                        <polygon points="100,35 112,50 100,60 88,50" fill={getGemColor()} stroke={getMetalColor()} strokeWidth="1.5" />
                      )}
                    </g>
                  )}

                  {ornament === 'Bangles' && (
                    <g filter="url(#glow)">
                      <ellipse cx="90" cy="90" rx="60" ry="25" fill="none" stroke={getMetalColor()} strokeWidth="10" />
                      <ellipse cx="110" cy="115" rx="60" ry="25" fill="none" stroke={getMetalColor()} strokeWidth="10" />
                      {stone !== 'No Stone' && (
                        <>
                          <circle cx="90" cy="65" r="4" fill={getGemColor()} />
                          <circle cx="145" cy="88" r="4" fill={getGemColor()} />
                          <circle cx="110" cy="90" r="4" fill={getGemColor()} />
                          <circle cx="165" cy="113" r="4" fill={getGemColor()} />
                        </>
                      )}
                    </g>
                  )}

                  {ornament === 'Mangalsutra' && (
                    <g filter="url(#glow)">
                      <path d="M 20,40 Q 100,160 180,40" fill="none" stroke="#222" strokeWidth="4" strokeDasharray="6,4" />
                      <path d="M 20,40 Q 100,160 180,40" fill="none" stroke={getMetalColor()} strokeWidth="2" />
                      <path d="M 85,135 Q 100,165 115,135 Z" fill={getMetalColor()} />
                      {stone !== 'No Stone' && (
                        <circle cx="100" cy="145" r="6" fill={getGemColor()} stroke={getMetalColor()} strokeWidth="1.5" />
                      )}
                    </g>
                  )}

                  {ornament === 'Bracelet' && (
                    <g filter="url(#glow)">
                      <ellipse cx="100" cy="100" rx="70" ry="35" fill="none" stroke={getMetalColor()} strokeWidth="8" />
                      {stone !== 'No Stone' && (
                        <>
                          <circle cx="100" cy="65" r="5" fill={getGemColor()} />
                          <circle cx="165" cy="95" r="5" fill={getGemColor()} />
                          <circle cx="35" cy="95" r="5" fill={getGemColor()} />
                          <circle cx="100" cy="135" r="5" fill={getGemColor()} />
                        </>
                      )}
                    </g>
                  )}
                </svg>

                <span style={{ position: 'absolute', bottom: '0.75rem', fontSize: '0.7rem', color: 'var(--accent-champagne-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {material} ({purity}) • {stone} • {style}
                </span>
              </div>

              {/* Summary Parameters List */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem', marginBottom: '2rem' }}>
                <div><span style={{ color: '#888' }}>Ornament:</span> <strong style={{ color: 'var(--text-ivory-white)' }}>{ornament}</strong></div>
                <div><span style={{ color: '#888' }}>Purity:</span> <strong style={{ color: 'var(--text-ivory-white)' }}>{purity}</strong></div>
                <div><span style={{ color: '#888' }}>Material:</span> <strong style={{ color: 'var(--text-ivory-white)' }}>{material}</strong></div>
                <div><span style={{ color: '#888' }}>Gemstone:</span> <strong style={{ color: 'var(--text-ivory-white)' }}>{stone}</strong></div>
                <div><span style={{ color: '#888' }}>Aesthetic:</span> <strong style={{ color: 'var(--text-ivory-white)' }}>{style}</strong></div>
                <div><span style={{ color: '#888' }}>Size:</span> <strong style={{ color: 'var(--text-ivory-white)' }}>{size}</strong></div>
              </div>

              {/* Dynamic Price & Weight Calculation Box */}
              <div 
                style={{
                  backgroundColor: 'rgba(8, 8, 8, 0.8)',
                  border: '1px solid rgba(201, 164, 92, 0.4)',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Scale size={14} color="var(--accent-antique-gold)" /> Estimated Weight
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-ivory-white)' }}>
                    {calculation.weight} grams
                  </span>
                </div>

                <div className="gold-divider-subtle" style={{ margin: '0.75rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.8rem', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <DollarSign size={14} color="var(--accent-antique-gold)" /> Estimated Price
                  </span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-champagne-gold)', fontFamily: 'var(--font-body)' }}>
                    ₹{calculation.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>

            {/* Request CTA Button */}
            <button
              onClick={handleRequestSubmit}
              className="btn-gold-primary"
              style={{ width: '100%', padding: '1.1rem' }}
            >
              <Send size={16} /> REQUEST THIS CUSTOM DESIGN
            </button>

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .customizer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
