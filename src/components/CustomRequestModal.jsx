import React, { useState } from 'react';
import { X, CheckCircle2, Send, MessageCircle, Sparkles, Copy, Check } from 'lucide-react';

export default function CustomRequestModal({ designData, onClose, onSubmitSuccess }) {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [preferredContact, setPreferredContact] = useState('WhatsApp');

  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !mobile) {
      alert('Please fill in your name and mobile number.');
      return;
    }

    const uniqueId = 'MOH-REQ-' + Math.floor(1000 + Math.random() * 9000);
    const newRequest = {
      requestId: uniqueId,
      customerName: fullName,
      phone: mobile,
      email: email || 'N/A',
      ornamentType: designData.ornamentType,
      material: designData.material,
      purity: designData.purity,
      stone: designData.stone,
      style: designData.style,
      size: designData.size,
      estimatedPrice: designData.estimatedPrice,
      estimatedWeight: designData.estimatedWeight,
      notes: notes || 'No additional notes provided.',
      preferredContact,
      status: 'Pending',
      createdAt: new Date().toLocaleString()
    };

    onSubmitSuccess(newRequest);
    setSubmittedRequest(newRequest);
  };

  const copyRequestId = () => {
    if (submittedRequest) {
      navigator.clipboard.writeText(submittedRequest.requestId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2.5rem', maxWidth: '650px' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-ivory-white)',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        {!submittedRequest ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Sparkles size={14} color="var(--accent-antique-gold)" />
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                  GUEST DESIGN REQUEST
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-ivory-white)' }}>
                Request Custom Design
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#AAA', marginTop: '0.3rem' }}>
                No account or login required. Our master jewellers will review your specifications.
              </p>
            </div>

            {/* Design Specs Summary Pill */}
            <div style={{ backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.3)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--accent-champagne-gold)', marginBottom: '0.4rem' }}>
                Selected Specifications:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', color: '#DDD' }}>
                <div>• Ornament: {designData.ornamentType}</div>
                <div>• Material: {designData.material} ({designData.purity})</div>
                <div>• Gemstone: {designData.stone}</div>
                <div>• Style: {designData.style}</div>
                <div>• Weight: Approx {designData.estimatedWeight}g</div>
                <div>• Est. Price: ₹{designData.estimatedPrice?.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                  Full Name *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#080808',
                    border: '1px solid rgba(201, 164, 92, 0.3)',
                    color: 'var(--text-ivory-white)',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                    Mobile Number *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#080808',
                      border: '1px solid rgba(201, 164, 92, 0.3)',
                      color: 'var(--text-ivory-white)',
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                    Email Address
                  </label>
                  <input 
                    type="email"
                    placeholder="aryan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#080808',
                      border: '1px solid rgba(201, 164, 92, 0.3)',
                      color: 'var(--text-ivory-white)',
                      padding: '0.75rem',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                  Preferred Contact Method
                </label>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
                  {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                    <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="contact" 
                        checked={preferredContact === method}
                        onChange={() => setPreferredContact(method)}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                  Customization Details / Special Instructions
                </label>
                <textarea 
                  rows="3"
                  placeholder="Mention any custom engravings, specific stone shade preferences, or occasion date..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#080808',
                    border: '1px solid rgba(201, 164, 92, 0.3)',
                    color: 'var(--text-ivory-white)',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button 
                type="submit"
                className="btn-gold-primary"
                style={{ width: '100%', marginTop: '0.5rem', padding: '1rem' }}
              >
                <Send size={16} /> SEND DESIGN REQUEST
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle2 size={54} color="var(--accent-antique-gold)" style={{ margin: '0 auto 1rem auto' }} />
            
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-ivory-white)', marginBottom: '0.5rem' }}>
              Request Received
            </h3>
            
            <p style={{ fontSize: '0.95rem', color: '#BBB', marginBottom: '1.5rem' }}>
              Your custom design request has been received by our MOH Showroom Atelier.
            </p>

            <div style={{ backgroundColor: '#080808', border: '1px solid var(--accent-antique-gold)', padding: '1.5rem', marginBottom: '2rem', display: 'inline-block', width: '100%' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#888', textTransform: 'uppercase' }}>Unique Request ID</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.3rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-champagne-gold)', letterSpacing: '0.1em' }}>
                  {submittedRequest.requestId}
                </span>
                <button 
                  onClick={copyRequestId}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-antique-gold)', cursor: 'pointer' }}
                  title="Copy Request ID"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '2rem' }}>
              Our senior jewellery designer will contact <strong>{submittedRequest.customerName}</strong> via {submittedRequest.preferredContact} within 4 business hours.
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href={`https://wa.me/919876543210?text=Hi%20MOH%20Team,%20I%20just%20submitted%20Custom%20Design%20Request%20${submittedRequest.requestId}%20for%20a%20customized%20${submittedRequest.ornamentType}.`}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  backgroundColor: '#25D366',
                  color: '#FFF',
                  textDecoration: 'none',
                  padding: '0.85rem',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <MessageCircle size={16} /> WHATSAPP CONCIERGE
              </a>

              <button
                onClick={onClose}
                className="btn-gold-primary"
                style={{ flex: 1, padding: '0.85rem' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
