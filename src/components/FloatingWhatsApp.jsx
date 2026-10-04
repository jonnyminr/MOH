import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SHOWROOM_INFO } from '../data/mockData';

export default function FloatingWhatsApp() {
  const defaultText = encodeURIComponent("Hi MOH By Manali Team, I would like to enquire about your luxury Indian jewellery collections.");

  return (
    <a
      href={`https://wa.me/${SHOWROOM_INFO.whatsapp}?text=${defaultText}`}
      target="_blank"
      rel="noreferrer"
      title="WhatsApp Concierge (+91 93243 87096)"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 40,
        backgroundColor: '#171513',
        border: '1px solid var(--accent-antique-gold)',
        color: '#25D366',
        borderRadius: '50%',
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-dark)',
        transition: 'transform 300ms ease, box-shadow 300ms ease',
        cursor: 'pointer'
      }}
      className="floating-wa"
    >
      <MessageCircle size={28} />
      
      <style>{`
        .floating-wa:hover {
          transform: scale(1.1);
          box-shadow: 0 0 25px rgba(201, 164, 92, 0.4);
          background-color: #080808 !important;
        }
      `}</style>
    </a>
  );
}
