import React, { useState } from 'react';
import { X, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { SHOWROOM_INFO } from '../data/mockData';

export default function EnquiryModal({ product, onClose, onSubmitEnquiry }) {
  if (!product) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Hi, I am interested in ${product.name} (${product.id}). I would like to know more about this jewellery.`);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    const newEnquiry = {
      enquiryId: 'MOH-ENQ-' + Math.floor(1000 + Math.random() * 9000),
      productName: product.name,
      productId: product.id,
      customerName,
      phone,
      email: email || 'N/A',
      message,
      createdAt: new Date().toLocaleString()
    };

    onSubmitEnquiry(newEnquiry);
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(`Hi, I am interested in ${product.name} (${product.id}). Price: ₹${product.startingPrice.toLocaleString('en-IN')}. I would like to know more about this jewellery.`);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2.5rem', maxWidth: '560px' }}
      >
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

        {!submitted ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-antique-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                GUEST PRODUCT ENQUIRY
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', color: 'var(--text-ivory-white)' }}>
                Enquire About {product.name}
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '1rem', backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.3)', padding: '0.75rem', marginBottom: '1.5rem' }}>
              <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--text-ivory-white)' }}>{product.name}</h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-antique-gold)' }}>ID: {product.id} • Starting ₹{product.startingPrice.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                  Full Name *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.3)', color: '#FFF', padding: '0.75rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                    Mobile Number *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.3)', color: '#FFF', padding: '0.75rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                    Email Address
                  </label>
                  <input 
                    type="email"
                    placeholder="aryan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.3)', color: '#FFF', padding: '0.75rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#BBB', display: 'block', marginBottom: '0.3rem' }}>
                  Message / Special Request
                </label>
                <textarea 
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.3)', color: '#FFF', padding: '0.75rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-gold-primary" style={{ flex: 1, padding: '0.9rem' }}>
                  <Send size={15} /> SUBMIT ENQUIRY
                </button>

                <a 
                  href={`https://wa.me/${SHOWROOM_INFO.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#FFF',
                    textDecoration: 'none',
                    padding: '0.9rem 1rem',
                    fontWeight: 600,
                    fontSize: '0.78rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <MessageCircle size={15} /> INSTANT WHATSAPP
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle2 size={54} color="var(--accent-antique-gold)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#FFF', marginBottom: '0.5rem' }}>
              Enquiry Sent
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#AAA', marginBottom: '1.5rem' }}>
              Our showroom team has received your enquiry regarding {product.name} and will get back to you shortly.
            </p>
            <button onClick={onClose} className="btn-gold-primary">
              CLOSE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
