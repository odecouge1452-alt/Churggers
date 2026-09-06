import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenMenu }) => {
  return (
    <footer className="w-full bg-[#E63946] text-white rounded-t-[24px] overflow-hidden pt-16 pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-column Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 mb-12">
          
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-white text-[#E63946] flex items-center justify-center shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight font-display text-white">
                Churggers.
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-normal">
              We always make our customers happy by providing as many choices as possible.
            </p>
          </div>

          {/* Column 2: Company */}
          <div>
            <h5 className="text-base font-bold font-display uppercase tracking-wider mb-4 text-white">
              Company
            </h5>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h5 className="text-base font-bold font-display uppercase tracking-wider mb-4 text-white">
              Resources
            </h5>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li>
                <a href="#hero" className="hover:text-white hover:underline transition-colors">
                  Events & Catering
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white hover:underline transition-colors">
                  Promo & Deals
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white hover:underline transition-colors">
                  Find Stores
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white hover:underline transition-colors">
                  Request Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h5 className="text-base font-bold font-display uppercase tracking-wider mb-4 text-white">
              Support
            </h5>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li>
                <a href="#faq" className="hover:text-white hover:underline transition-colors">
                  Account
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white hover:underline transition-colors">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white hover:underline transition-colors">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white hover:underline transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white hover:underline transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Info + Socials */}
          <div>
            <h5 className="text-base font-bold font-display uppercase tracking-wider mb-4 text-white">
              Contact Info
            </h5>
            <p className="text-sm text-white/90 mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-white/80" />
              <span>Churggers@gmail.com</span>
            </p>

            {/* Social Icons in White Circular Buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Churggers Instagram"
                className="w-10 h-10 rounded-full bg-white text-[#111827] hover:bg-[#E9C46A] hover:text-black flex items-center justify-center transition-colors shadow-md"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Churggers Facebook"
                className="w-10 h-10 rounded-full bg-white text-[#111827] hover:bg-[#E9C46A] hover:text-black flex items-center justify-center transition-colors shadow-md"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Churggers Twitter / X"
                className="w-10 h-10 rounded-full bg-white text-[#111827] hover:bg-[#E9C46A] hover:text-black flex items-center justify-center transition-colors shadow-md"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/80 font-normal">
            Copyright 2026 Churggers. All right reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
