import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Utensils, Sparkles } from 'lucide-react';
import { PillButton } from './PillButton';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenMenu: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenMenu,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Menu', id: 'menu' },
    { label: 'Locations', id: 'locations' },
    { label: 'About', id: 'features' },
    { label: 'Community', id: 'community' },
    { label: 'FAQ', id: 'faq' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'menu') {
      onOpenMenu();
    } else {
      onNavigate(id);
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#E63946] flex items-center justify-center text-white shadow-md shadow-[#E63946]/30 group-hover:rotate-12 transition-transform duration-300">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-black tracking-tight text-[#111827] font-display">
              Churggers<span className="text-[#E63946]">.</span>
            </span>
          </div>
        </button>

        {/* Center: Nav links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative text-[15px] font-medium transition-colors hover:text-[#E63946] cursor-pointer py-1.5 focus:outline-none ${
                  isActive ? 'text-[#E63946] font-semibold' : 'text-[#1F2937]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#E63946] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Cart Icon Button (Always visible) */}
          <button
            id="navbar-cart-button"
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className="relative p-2 sm:p-2.5 rounded-full bg-white border border-gray-200/80 text-[#1F2937] hover:border-[#E63946] hover:text-[#E63946] shadow-sm transition-all duration-200 cursor-pointer focus:outline-none"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E63946] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <div className="hidden sm:flex items-center gap-2.5">
            <PillButton
              id="navbar-register-button"
              variant="outline"
              size="sm"
              onClick={() => onOpenAuth('register')}
            >
              Register
            </PillButton>

            <PillButton
              id="navbar-login-button"
              variant="red"
              size="sm"
              onClick={() => onOpenAuth('login')}
            >
              Login
            </PillButton>
          </div>

          {/* Hamburger button (visible on mobile and tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#111827] hover:bg-gray-100 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/98 backdrop-blur-lg border-b border-gray-100 shadow-xl overflow-hidden px-5 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left text-lg font-medium py-2 px-3 rounded-xl transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#E63946]/10 text-[#E63946] font-semibold'
                      : 'text-[#1F2937] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <PillButton
                  variant="red"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full"
                >
                  Login
                </PillButton>
                <PillButton
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="w-full"
                >
                  Register
                </PillButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
