import React, { useState, useMemo } from 'react';
import { APPOINTMENT_SERVICES, SHOWROOM_INFO } from '../data/mockData';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, ChevronRight, ChevronLeft, MapPin, Phone, MessageCircle, Download, Sparkles } from 'lucide-react';

export default function BookingSection({ onBookingComplete, existingBookings = [] }) {
  const [step, setStep] = useState(1);

  // Form State
  const [selectedService, setSelectedService] = useState(APPOINTMENT_SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('02:00 PM');
  
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notes, setNotes] = useState('');

  const [completedBooking, setCompletedBooking] = useState(null);

  const availableSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

  // Double booking checker logic
  const isSlotBooked = (time) => {
    return existingBookings.some(b => b.date === selectedDate && b.time === time);
  };

  // Generate calendar dates for Step 2
  const minDate = new Date().toISOString().split('T')[0];

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('Please provide your name and phone number');
      return;
    }

    const uniqueId = 'MOH-APT-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      bookingId: uniqueId,
      service: selectedService.name,
      date: selectedDate,
      time: selectedSlot,
      customerName,
      phone,
      email: email || 'N/A',
      whatsapp: whatsapp || phone,
      notes: notes || 'None',
      status: 'Confirmed',
      createdAt: new Date().toLocaleString()
    };

    onBookingComplete(newBooking);
    setCompletedBooking(newBooking);
    setStep(6); // Confirmation screen
  };

  // Download ICS File for Add to Calendar feature
  const downloadCalendarFile = () => {
    if (!completedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MOH Jewellery Showroom//EN
BEGIN:VEVENT
SUMMARY:MOH VIP Appointment - ${completedBooking.service}
DESCRIPTION:Showroom appointment for ${completedBooking.customerName}. Address: ${SHOWROOM_INFO.address}
LOCATION:${SHOWROOM_INFO.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${completedBooking.bookingId}-MOH-Appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      style={{
        backgroundColor: 'var(--bg-warm-ivory)',
        color: 'var(--text-warm-dark)',
        padding: '6rem 1.5rem',
        borderBottom: '1px solid rgba(201, 164, 92, 0.3)'
      }}
      id="booking-section"
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <Sparkles size={14} color="var(--accent-gold-dark)" />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.28em', color: 'var(--accent-gold-dark)', textTransform: 'uppercase', fontWeight: 600 }}>
              PRIVATE CONCIERGE
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', fontWeight: 600, color: 'var(--text-warm-dark)', marginBottom: '1rem' }}>
            Book an Appointment
          </h2>
          <p style={{ fontSize: '1rem', color: '#554E46' }}>
            Experience personalized hospitality and private viewing at our flagship showroom. No login required.
          </p>
          <div className="gold-divider" style={{ width: '80px', margin: '1.25rem auto 0 auto' }} />
        </div>

        {/* Step Indicator Bar */}
        {step <= 5 && (
          <div 
            style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(201, 164, 92, 0.3)',
              padding: '1rem 1.5rem',
              marginBottom: '2.5rem',
              overflowX: 'auto'
            }}
          >
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date' },
              { num: 3, label: 'Time Slot' },
              { num: 4, label: 'Guest Details' },
              { num: 5, label: 'Summary' }
            ].map((s) => (
              <div 
                key={s.num}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  opacity: step === s.num ? 1 : step > s.num ? 0.8 : 0.4
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: step >= s.num ? 'var(--accent-gold-dark)' : '#DDD',
                  color: step >= s.num ? '#FFF' : '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}>
                  {step > s.num ? <CheckCircle2 size={16} /> : s.num}
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: step === s.num ? 600 : 400, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step Cards Content Container */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(201, 164, 92, 0.3)', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Select Preferred Service
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '2rem' }}>
                Choose the focus of your private consultation session.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {APPOINTMENT_SERVICES.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    style={{
                      border: selectedService.id === srv.id ? '2px solid var(--accent-gold-dark)' : '1px solid #E0D9CD',
                      backgroundColor: selectedService.id === srv.id ? '#FAF7F0' : '#FFFFFF',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 200ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-warm-dark)' }}>
                        {srv.name}
                      </h4>
                      <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--bg-warm-ivory)', padding: '0.2rem 0.5rem', color: 'var(--accent-gold-dark)', fontWeight: 600 }}>
                        {srv.duration}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.5 }}>
                      {srv.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setStep(2)}
                  className="btn-dark-outline"
                >
                  NEXT: CHOOSE DATE <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DATE */}
          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Select Appointment Date
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '2rem' }}>
                Choose your preferred date. Past dates are automatically disabled.
              </p>

              <div style={{ maxWidth: '400px', margin: '0 auto 2.5rem auto' }}>
                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#555', display: 'block', marginBottom: '0.5rem' }}>
                  Appointment Date *
                </label>
                <input 
                  type="date"
                  min={minDate}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '1px solid var(--accent-gold-dark)',
                    backgroundColor: '#FAF7F0',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} className="btn-dark-outline">
                  <ChevronLeft size={16} /> BACK
                </button>
                <button onClick={() => setStep(3)} className="btn-dark-outline">
                  NEXT: TIME SLOT <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: TIME SLOT */}
          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Select Time Slot
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '2rem' }}>
                Available consultation slots for <strong>{selectedDate}</strong>:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                {availableSlots.map((slot) => {
                  const booked = isSlotBooked(slot);
                  return (
                    <button
                      key={slot}
                      disabled={booked}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '1rem',
                        border: selectedSlot === slot ? '2px solid var(--accent-gold-dark)' : '1px solid #DDD',
                        backgroundColor: booked ? '#F5F5F5' : selectedSlot === slot ? '#FAF7F0' : '#FFF',
                        color: booked ? '#AAA' : selectedSlot === slot ? 'var(--accent-gold-dark)' : '#333',
                        fontWeight: selectedSlot === slot ? 700 : 400,
                        cursor: booked ? 'not-allowed' : 'pointer',
                        textDecoration: booked ? 'line-through' : 'none'
                      }}
                    >
                      {slot} {booked && '(Booked)'}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} className="btn-dark-outline">
                  <ChevronLeft size={16} /> BACK
                </button>
                <button onClick={() => setStep(4)} className="btn-dark-outline">
                  NEXT: GUEST DETAILS <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {step === 4 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Guest Information
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '2rem' }}>
                No account or login required. Provide details so our concierge can welcome you.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #CCC', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Mobile Number *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #CCC', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Email Address
                  </label>
                  <input 
                    type="email"
                    placeholder="aryan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #CCC', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    WhatsApp Number (Optional)
                  </label>
                  <input 
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    style={{ width: '100%', padding: '0.8rem', border: '1px solid #CCC', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                  Optional Message / Special Requests
                </label>
                <textarea 
                  rows="3"
                  placeholder="e.g., Interested in viewing high Kundan bridal sets..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #CCC', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(3)} className="btn-dark-outline">
                  <ChevronLeft size={16} /> BACK
                </button>
                <button 
                  onClick={() => {
                    if (!customerName || !phone) alert('Please provide your name and phone number');
                    else setStep(5);
                  }} 
                  className="btn-dark-outline"
                >
                  NEXT: SUMMARY <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUMMARY & CONFIRMATION */}
          {step === 5 && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Appointment Summary
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '2rem' }}>
                Please review your private appointment details before confirming.
              </p>

              <div style={{ backgroundColor: '#FAF7F0', border: '1px solid var(--accent-gold-dark)', padding: '1.75rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.95rem' }}>
                  <div><span style={{ color: '#666' }}>Service:</span> <strong>{selectedService.name}</strong></div>
                  <div><span style={{ color: '#666' }}>Date:</span> <strong>{selectedDate}</strong></div>
                  <div><span style={{ color: '#666' }}>Time:</span> <strong>{selectedSlot}</strong></div>
                  <div><span style={{ color: '#666' }}>Guest Name:</span> <strong>{customerName}</strong></div>
                  <div><span style={{ color: '#666' }}>Phone:</span> <strong>{phone}</strong></div>
                  <div><span style={{ color: '#666' }}>Email:</span> <strong>{email || 'N/A'}</strong></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(4)} className="btn-dark-outline">
                  <ChevronLeft size={16} /> BACK
                </button>
                <button onClick={handleConfirm} className="btn-gold-primary" style={{ padding: '0.9rem 2rem' }}>
                  CONFIRM APPOINTMENT
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: FINAL BOOKING CONFIRMATION SCREEN */}
          {step === 6 && completedBooking && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <CheckCircle2 size={60} color="var(--accent-gold-dark)" style={{ margin: '0 auto 1rem auto' }} />
              
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--text-warm-dark)', marginBottom: '0.5rem' }}>
                Your Appointment Has Been Requested
              </h3>

              <p style={{ fontSize: '1rem', color: '#554E46', marginBottom: '2rem' }}>
                We look forward to hosting you at our MOH Flagship Showroom.
              </p>

              {/* Card Summary Box */}
              <div 
                style={{
                  backgroundColor: '#FAF7F0',
                  border: '1px solid var(--accent-gold-dark)',
                  padding: '2rem',
                  maxWidth: '540px',
                  margin: '0 auto 2.5rem auto',
                  textAlign: 'left'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(201, 164, 92, 0.4)', paddingBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#666' }}>Booking ID</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-gold-dark)', letterSpacing: '0.1em' }}>
                    {completedBooking.bookingId}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <div><strong>Customer Name:</strong> {completedBooking.customerName}</div>
                  <div><strong>Service:</strong> {completedBooking.service}</div>
                  <div><strong>Date & Time:</strong> {completedBooking.date} at {completedBooking.time}</div>
                  <div><strong>Showroom Address:</strong> {SHOWROOM_INFO.address}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                
                <button 
                  onClick={downloadCalendarFile}
                  className="btn-dark-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={16} /> ADD TO CALENDAR
                </button>

                <a
                  href={`https://wa.me/919876543210?text=Hi%20MOH,%20I%20have%20booked%20Appointment%20${completedBooking.bookingId}%20for%20${completedBooking.date}%20at%20${completedBooking.time}.`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#FFF',
                    textDecoration: 'none',
                    padding: '0.85rem 1.5rem',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    letterSpacing: '0.1em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <MessageCircle size={16} /> WHATSAPP US
                </a>

                <button 
                  onClick={() => setStep(1)}
                  className="btn-gold-primary"
                >
                  BACK TO HOME
                </button>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
