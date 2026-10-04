import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import FeaturedCollection from './components/FeaturedCollection';
import CustomizerSection from './components/CustomizerSection';
import AboutView from './components/AboutView';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ShowroomSection from './components/ShowroomSection';
import ProductModal from './components/ProductModal';
import CustomRequestModal from './components/CustomRequestModal';
import BookingSection from './components/BookingSection';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import EnquiryModal from './components/EnquiryModal';
import AdminModal from './components/AdminModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Modals & Drawers State
  const [activeProduct, setActiveProduct] = useState(null);
  const [customizerInitialProduct, setCustomizerInitialProduct] = useState(null);
  const [enquiringProduct, setEnquiringProduct] = useState(null);
  const [pendingCustomRequestData, setPendingCustomRequestData] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Persistent Guest Data Stores (localStorage)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('moh_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('moh_bookings');
      return saved ? JSON.parse(saved) : [
        {
          bookingId: "MOH-APT-1082",
          service: "Bridal Jewellery Consultation",
          date: "2026-10-18",
          time: "04:00 PM",
          customerName: "Aryan Sharma",
          phone: "+91 98765 43210",
          email: "aryan@example.com",
          status: "Confirmed",
          createdAt: "05/10/2026, 10:15 AM"
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [customRequests, setCustomRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('moh_custom_requests');
      return saved ? JSON.parse(saved) : [
        {
          requestId: "MOH-REQ-4819",
          customerName: "Priya Patel",
          phone: "+91 98123 45678",
          email: "priya@example.com",
          ornamentType: "Necklace",
          material: "Gold",
          purity: "22K",
          stone: "Emerald",
          style: "Bridal",
          size: "16\" Princess",
          estimatedPrice: 620000,
          estimatedWeight: "68.5",
          notes: "Need extra emerald drops on choker edge",
          preferredContact: "WhatsApp",
          status: "Pending",
          createdAt: "05/10/2026, 11:30 AM"
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('moh_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('moh_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('moh_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('moh_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem('moh_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  // Cart Actions
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Nav Handlers
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView('shop');
    setTimeout(() => {
      const elem = document.getElementById('shop-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCustomizeProductTrigger = (product) => {
    setCustomizerInitialProduct(product);
    setCurrentView('customize');
    setTimeout(() => {
      const elem = document.getElementById('customizer-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookAppointmentTrigger = () => {
    setCurrentView('booking');
    setTimeout(() => {
      const elem = document.getElementById('booking-section');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Submission Handlers
  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleAddCustomRequest = (newRequest) => {
    setCustomRequests(prev => [newRequest, ...prev]);
  };

  const handleAddEnquiry = (newEnquiry) => {
    setEnquiries(prev => [newEnquiry, ...prev]);
  };

  const handleUpdateAdminStatus = (type, index, newStatus) => {
    if (type === 'bookings') {
      setBookings(prev => {
        const copy = [...prev];
        copy[index].status = newStatus;
        return copy;
      });
    } else if (type === 'requests') {
      setCustomRequests(prev => {
        const copy = [...prev];
        copy[index].status = newStatus;
        return copy;
      });
    }
  };

  const handleResetDemoData = () => {
    localStorage.clear();
    setCartItems([]);
    setBookings([]);
    setCustomRequests([]);
    setEnquiries([]);
    alert('Demo storage reset.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky Navbar */}
      <Navbar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={handleBookAppointmentTrigger}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main View Router / Layout */}
      <main style={{ flex: 1 }}>
        
        {currentView === 'home' && (
          <>
            <Hero 
              onShopClick={() => setCurrentView('shop')}
              onCustomizeClick={() => setCurrentView('customize')}
            />
            <CategorySection onSelectCategory={handleCategorySelect} />
            <FeaturedCollection 
              onViewProduct={(p) => setActiveProduct(p)}
              onCustomizeProduct={handleCustomizeProductTrigger}
              onAddToCart={handleAddToCart}
              onEnquireProduct={(p) => setEnquiringProduct(p)}
              selectedCategory={selectedCategory}
            />
            <WhyChooseUsSection />
            <ShowroomSection onBookAppointment={handleBookAppointmentTrigger} />
          </>
        )}

        {currentView === 'shop' && (
          <>
            <FeaturedCollection 
              onViewProduct={(p) => setActiveProduct(p)}
              onCustomizeProduct={handleCustomizeProductTrigger}
              onAddToCart={handleAddToCart}
              onEnquireProduct={(p) => setEnquiringProduct(p)}
              selectedCategory={selectedCategory}
              onResetCategory={() => setSelectedCategory(null)}
            />
            <CategorySection onSelectCategory={handleCategorySelect} />
          </>
        )}

        {currentView === 'customize' && (
          <CustomizerSection 
            initialProduct={customizerInitialProduct}
            onRequestCustomDesign={(data) => setPendingCustomRequestData(data)}
          />
        )}

        {currentView === 'booking' && (
          <BookingSection 
            onBookingComplete={handleAddBooking}
            existingBookings={bookings}
          />
        )}

        {currentView === 'about' && (
          <>
            <AboutView onBookClick={handleBookAppointmentTrigger} />
            <WhyChooseUsSection />
          </>
        )}

        {currentView === 'contact' && (
          <ShowroomSection onBookAppointment={handleBookAppointmentTrigger} />
        )}

      </main>

      {/* Modals & Sliders */}
      <ProductModal 
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onCustomize={handleCustomizeProductTrigger}
        onBook={handleBookAppointmentTrigger}
        onEnquire={(p) => setEnquiringProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {pendingCustomRequestData && (
        <CustomRequestModal 
          designData={pendingCustomRequestData}
          onClose={() => setPendingCustomRequestData(null)}
          onSubmitSuccess={handleAddCustomRequest}
        />
      )}

      {enquiringProduct && (
        <EnquiryModal 
          product={enquiringProduct}
          onClose={() => setEnquiringProduct(null)}
          onSubmitEnquiry={handleAddEnquiry}
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onOpenBooking={handleBookAppointmentTrigger}
        onRequestQuote={() => alert('Official quote request sent to MOH concierge.')}
      />

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onViewProduct={(p) => setActiveProduct(p)}
        onCustomizeProduct={handleCustomizeProductTrigger}
      />

      <AdminModal 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bookings={bookings}
        customRequests={customRequests}
        enquiries={enquiries}
        onUpdateStatus={handleUpdateAdminStatus}
        onClearAll={handleResetDemoData}
      />

      <FloatingWhatsApp />

      {/* Footer */}
      <Footer 
        onNavClick={(view) => setCurrentView(view)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

    </div>
  );
}
