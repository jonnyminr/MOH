import React, { useState } from 'react';
import { X, Calendar, Sliders, MessageCircle, RefreshCw, CheckCircle, Clock, Trash2, Filter } from 'lucide-react';

export default function AdminModal({ 
  isOpen, 
  onClose, 
  bookings = [], 
  customRequests = [], 
  enquiries = [],
  onUpdateStatus,
  onClearAll 
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'requests' | 'enquiries'
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredBookings = filterStatus === 'All' ? bookings : bookings.filter(b => b.status === filterStatus);
  const filteredRequests = filterStatus === 'All' ? customRequests : customRequests.filter(r => r.status === filterStatus);
  const filteredEnquiries = filterStatus === 'All' ? enquiries : enquiries.filter(e => e.status === filterStatus);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem', maxWidth: '950px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(201, 164, 92, 0.3)', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-ivory-white)' }}>
              MOH Concierge Data Portal
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--accent-antique-gold)' }}>
              Live Store Backend • Bookings, Bespoke Custom Requests & Product Enquiries
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('bookings')}
              style={{
                backgroundColor: activeTab === 'bookings' ? 'var(--accent-antique-gold)' : '#111',
                color: activeTab === 'bookings' ? '#000' : '#FFF',
                border: '1px solid var(--accent-antique-gold)',
                padding: '0.55rem 1rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Bookings ({bookings.length})
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              style={{
                backgroundColor: activeTab === 'requests' ? 'var(--accent-antique-gold)' : '#111',
                color: activeTab === 'requests' ? '#000' : '#FFF',
                border: '1px solid var(--accent-antique-gold)',
                padding: '0.55rem 1rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Sliders size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Custom Requests ({customRequests.length})
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              style={{
                backgroundColor: activeTab === 'enquiries' ? 'var(--accent-antique-gold)' : '#111',
                color: activeTab === 'enquiries' ? '#000' : '#FFF',
                border: '1px solid var(--accent-antique-gold)',
                padding: '0.55rem 1rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <MessageCircle size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Enquiries ({enquiries.length})
            </button>
          </div>

          {/* Status Filter Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={14} color="var(--accent-antique-gold)" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                backgroundColor: '#080808',
                color: '#FFF',
                border: '1px solid rgba(201, 164, 92, 0.3)',
                padding: '0.4rem 0.8rem',
                fontSize: '0.78rem'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

        </div>

        {/* Tab 1: BOOKINGS DATA */}
        {activeTab === 'bookings' && (
          <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
            {filteredBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#888' }}>
                No appointment bookings found under filter "{filterStatus}".
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredBookings.map((b, idx) => (
                  <div key={idx} style={{ backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.25)', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #222', paddingBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-champagne-gold)' }}>
                        {b.bookingId} • {b.service}
                      </span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '4px',
                          backgroundColor: b.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.2)' : b.status === 'Completed' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: b.status === 'Confirmed' ? '#34D399' : b.status === 'Completed' ? '#60A5FA' : '#F87171'
                        }}>
                          {b.status}
                        </span>

                        <select
                          value={b.status}
                          onChange={(e) => onUpdateStatus('bookings', idx, e.target.value)}
                          style={{ backgroundColor: '#111', color: '#FFF', border: '1px solid #444', fontSize: '0.7rem', padding: '0.2rem' }}
                        >
                          <option value="Pending">Set Pending</option>
                          <option value="Confirmed">Set Confirmed</option>
                          <option value="Completed">Set Completed</option>
                          <option value="Cancelled">Set Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.82rem', color: '#BBB' }}>
                      <div>Customer: <strong style={{ color: '#FFF' }}>{b.customerName}</strong></div>
                      <div>Phone: <strong style={{ color: '#FFF' }}>{b.phone}</strong></div>
                      <div>Date & Time: <strong style={{ color: 'var(--accent-antique-gold)' }}>{b.date} @ {b.time}</strong></div>
                      <div>Email: {b.email}</div>
                      <div>Notes: {b.notes}</div>
                      <div>Created: {b.createdAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: CUSTOM REQUESTS DATA */}
        {activeTab === 'requests' && (
          <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
            {filteredRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#888' }}>
                No custom ornament requests found.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredRequests.map((r, idx) => (
                  <div key={idx} style={{ backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.25)', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #222', paddingBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-champagne-gold)' }}>
                        {r.requestId} • Custom {r.ornamentType} ({r.material} {r.purity})
                      </span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          padding: '0.25rem 0.6rem', 
                          borderRadius: '4px',
                          backgroundColor: r.status === 'Pending' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                          color: r.status === 'Pending' ? '#FBBF24' : '#34D399'
                        }}>
                          {r.status}
                        </span>

                        <select
                          value={r.status}
                          onChange={(e) => onUpdateStatus('requests', idx, e.target.value)}
                          style={{ backgroundColor: '#111', color: '#FFF', border: '1px solid #444', fontSize: '0.7rem', padding: '0.2rem' }}
                        >
                          <option value="Pending">Set Pending</option>
                          <option value="Confirmed">Set Confirmed</option>
                          <option value="Completed">Set Completed</option>
                          <option value="Cancelled">Set Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.82rem', color: '#BBB' }}>
                      <div>Customer: <strong style={{ color: '#FFF' }}>{r.customerName}</strong></div>
                      <div>Phone: <strong style={{ color: '#FFF' }}>{r.phone}</strong></div>
                      <div>Est. Price: <strong style={{ color: 'var(--accent-champagne-gold)' }}>₹{r.estimatedPrice?.toLocaleString('en-IN')}</strong></div>
                      <div>Gemstone: {r.stone}</div>
                      <div>Style: {r.style}</div>
                      <div>Est Weight: {r.estimatedWeight}g</div>
                      <div>Notes: {r.notes}</div>
                      <div>Contact Via: {r.preferredContact}</div>
                      <div>Date: {r.createdAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: PRODUCT ENQUIRIES DATA */}
        {activeTab === 'enquiries' && (
          <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
            {filteredEnquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#888' }}>
                No product enquiries received yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredEnquiries.map((e, idx) => (
                  <div key={idx} style={{ backgroundColor: '#080808', border: '1px solid rgba(201, 164, 92, 0.25)', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-champagne-gold)' }}>
                        {e.enquiryId} • Enquiry for {e.productName}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#888' }}>{e.createdAt}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#BBB' }}>
                      <div>Customer: {e.customerName} ({e.phone})</div>
                      <div>Message: "{e.message}"</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(201, 164, 92, 0.2)', paddingTop: '1rem' }}>
          <button 
            onClick={onClearAll}
            style={{ backgroundColor: 'transparent', border: '1px solid #555', color: '#888', padding: '0.5rem 1rem', fontSize: '0.75rem', cursor: 'pointer' }}
          >
            Reset Demo Data
          </button>

          <button onClick={onClose} className="btn-gold-primary" style={{ fontSize: '0.75rem', padding: '0.6rem 1.5rem' }}>
            CLOSE CONCIERGE PORTAL
          </button>
        </div>

      </div>
    </div>
  );
}
