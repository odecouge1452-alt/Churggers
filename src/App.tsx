/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { FeaturesAndMap } from './components/FeaturesAndMap';
import { MenuSearchSection } from './components/MenuSearchSection';
import { CommunitySection } from './components/CommunitySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqAndContactSection } from './components/FaqAndContactSection';
import { Footer } from './components/Footer';
import { MenuModal } from './components/MenuModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { JoinCommunityModal } from './components/JoinCommunityModal';
import { CartItem, MenuItem, MapPinData } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (item: MenuItem, quantity: number = 1, options?: string[]) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === item.id &&
          JSON.stringify(ci.selectedOptions || []) === JSON.stringify(options || [])
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { item, quantity, selectedOptions: options }];
    });
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index);
    } else {
      setCartItems((prev) => {
        const next = [...prev];
        next[index].quantity = quantity;
        return next;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocationSearch = (params: { location: string; orderType: string }) => {
    setIsMenuOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] flex flex-col selection:bg-[#E63946] selection:text-white">
      {/* Top Fixed Glassmorphism Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onOpenMenu={() => setIsMenuOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* SECTION A: HERO */}
        <HeroSection
          onOrderNow={() => setIsMenuOpen(true)}
          onExploreMenu={() => setIsMenuOpen(true)}
          onAddToCart={(item) => handleAddToCart(item, 1)}
        />

        {/* SECTION B: STATS BAR */}
        <StatsBar />

        {/* SECTION C: FEATURES + WORLD MAP */}
        <FeaturesAndMap
          onSelectLocation={() => setIsMenuOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        {/* SECTION D: MENU & LOCATION SEARCH */}
        <MenuSearchSection onSearch={handleLocationSearch} />

        {/* SECTION E: COMMUNITY CLUSTER */}
        <CommunitySection onJoinCommunity={() => setIsCommunityModalOpen(true)} />

        {/* SECTION F: TESTIMONIALS */}
        <TestimonialsSection />

        {/* SECTION G: FAQ / CONTACT */}
        <FaqAndContactSection />
      </main>

      {/* SECTION H: FOOTER */}
      <Footer
        onNavigate={scrollToSection}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Interactive Full Menu Modal */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Cart Tray Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
      />

      {/* Join Community VIP Modal */}
      <JoinCommunityModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
      />
    </div>
  );
}
