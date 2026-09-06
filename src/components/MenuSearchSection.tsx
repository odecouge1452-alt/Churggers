import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Search, ChevronDown, Check, Store } from 'lucide-react';
import { FloatingScribble } from './Scribbles';
import { WORLD_PINS } from '../data/mockData';
import { MapPinData } from '../types';

interface MenuSearchSectionProps {
  onSearch: (params: { location: string; orderType: string }) => void;
}

export const MenuSearchSection: React.FC<MenuSearchSectionProps> = ({ onSearch }) => {
  const [selectedCity, setSelectedCity] = useState<string>('New York');
  const [orderType, setOrderType] = useState<string>('Delivery');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [orderTypeDropdownOpen, setOrderTypeDropdownOpen] = useState(false);
  const [activePinId, setActivePinId] = useState<string>('pin-ny');

  // Local storefront spots for the left map
  const storePins = [
    {
      id: 'store-1',
      name: 'Manhattan Flagship',
      neighborhood: 'Downtown Hub',
      coords: { x: 30, y: 35 },
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=80',
      time: '15-20 min',
      status: 'Open Now'
    },
    {
      id: 'store-2',
      name: 'Brooklyn Bridge Kitchen',
      neighborhood: 'DUMBO Waterfront',
      coords: { x: 65, y: 55 },
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300&auto=format&fit=crop&q=80',
      time: '20-25 min',
      status: 'Open Now'
    },
    {
      id: 'store-3',
      name: 'Midtown Express',
      neighborhood: 'Grand Central',
      coords: { x: 50, y: 22 },
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80',
      time: '10-15 min',
      status: 'Open Now'
    }
  ];

  const handleExecuteSearch = () => {
    onSearch({ location: selectedCity, orderType });
  };

  return (
    <section id="locations" className="py-20 sm:py-24 lg:py-32 bg-[#F8F9FA] relative overflow-hidden">
      {/* Decorative floating scribble top-right */}
      <div className="absolute top-8 right-12 opacity-80 pointer-events-none">
        <FloatingScribble variant="loop" color="#F4A261" className="w-24 h-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Local Storefront Map (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#E63946]" />
                <h4 className="font-bold text-[#111827] text-lg font-display">
                  Local Storefronts & Kitchens
                </h4>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
                Live Ordering Active
              </span>
            </div>

            {/* Dotted City Map Stage */}
            <div className="relative w-full h-[360px] sm:h-[400px] bg-[#F1F5F9]/70 rounded-2xl overflow-hidden border border-gray-200/60 flex items-center justify-center">
              
              {/* Dotted Grid Pattern */}
              <svg className="w-full h-full object-cover" viewBox="0 0 600 400">
                <pattern id="local-dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1.8" fill="#CBD5E1" />
                </pattern>
                <rect width="600" height="400" fill="url(#local-dot-pattern)" />
                {/* Street arterial curves */}
                <path d="M0 200 Q250 180 600 220" stroke="#E2E8F0" strokeWidth="16" fill="none" opacity="0.7" />
                <path d="M300 0 Q320 200 280 400" stroke="#E2E8F0" strokeWidth="16" fill="none" opacity="0.7" />
              </svg>

              {/* 80px Storefront Pins */}
              {storePins.map((store) => {
                const isActive = activePinId === store.id;
                return (
                  <div
                    key={store.id}
                    style={{ left: `${store.coords.x}%`, top: `${store.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => {
                        setActivePinId(store.id);
                        setSelectedCity(store.name);
                      }}
                      className="group flex flex-col items-center cursor-pointer focus:outline-none"
                    >
                      {/* Pulse circle */}
                      <span className="absolute -inset-2 rounded-full bg-[#E63946]/20 animate-ping pointer-events-none" />

                      {/* 80px Circular Storefront Pin */}
                      <div
                        className={`w-14 sm:w-20 h-14 sm:h-20 rounded-full p-1 bg-white shadow-xl transition-all duration-300 border-2 ${
                          isActive
                            ? 'border-[#E63946] ring-4 ring-[#E63946]/30 scale-110'
                            : 'border-gray-200 hover:scale-105'
                        }`}
                      >
                        <img
                          src={store.image}
                          alt={store.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      {/* Badge info */}
                      <div className="mt-1 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-gray-100 text-center">
                        <p className="text-[10px] sm:text-[11px] font-bold text-[#111827] whitespace-nowrap">
                          {store.name}
                        </p>
                        <p className="text-[9px] text-[#E63946] font-semibold">
                          ⚡ {store.time}
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#6B7280]">
              <span>Showing 3 express hubs within 5 miles</span>
              <span className="font-semibold text-[#111827]">Average pickup: 12 mins</span>
            </div>
          </motion.div>

          {/* Right Column: Text + Search Form (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111827] leading-[1.12] font-display tracking-tight mb-4">
                Hungry? Craving? <br />
                What Else Do You Need?
              </h2>

              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed mb-8 sm:mb-10">
                Explore more than 50 menu items, find your nearest Churggers and order now with instant preparation tracking.
              </p>
            </motion.div>

            {/* Pill Search Bar Container */}
            <motion.div
              initial={{ scaleX: 0.85, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="w-full origin-left bg-white rounded-2xl sm:rounded-full p-3 sm:p-3.5 shadow-[0_6px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-2 relative z-30"
            >
              {/* Field 1: Location */}
              <div className="relative flex-1 px-3 sm:px-4 py-1.5 sm:py-1 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4A261]/15 text-[#F4A261] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#F4A261]" />
                </div>
                <div
                  className="cursor-pointer flex-1 select-none"
                  onClick={() => {
                    setLocationDropdownOpen(!locationDropdownOpen);
                    setOrderTypeDropdownOpen(false);
                  }}
                >
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#111827]">
                    Location
                  </span>
                  <div className="flex items-center justify-between text-sm text-[#6B7280] font-medium">
                    <span className="truncate">{selectedCity}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 ml-1 shrink-0" />
                  </div>
                </div>

                {/* Location Dropdown Menu */}
                {locationDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
                    {WORLD_PINS.map((pin) => (
                      <button
                        key={pin.id}
                        onClick={() => {
                          setSelectedCity(`${pin.city} (${pin.name.split(' ')[1] || 'Hub'})`);
                          setLocationDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-gray-50 text-xs font-medium text-[#111827]"
                      >
                        <div>
                          <p className="font-bold">{pin.city}</p>
                          <p className="text-[11px] text-gray-500">{pin.country}</p>
                        </div>
                        {selectedCity.includes(pin.city) && (
                          <Check className="w-4 h-4 text-[#E63946]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Responsive Divider */}
              <div className="hidden sm:block w-[1px] h-10 bg-gray-200" />
              <div className="sm:hidden w-full h-[1px] bg-gray-100" />

              {/* Field 2: Order Type */}
              <div className="relative flex-1 px-3 sm:px-4 py-1.5 sm:py-1 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4A261]/15 text-[#F4A261] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#F4A261]" />
                </div>
                <div
                  className="cursor-pointer flex-1 select-none"
                  onClick={() => {
                    setOrderTypeDropdownOpen(!orderTypeDropdownOpen);
                    setLocationDropdownOpen(false);
                  }}
                >
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#111827]">
                    Order Type
                  </span>
                  <div className="flex items-center justify-between text-sm text-[#6B7280] font-medium">
                    <span>{orderType}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 ml-1 shrink-0" />
                  </div>
                </div>

                {/* Order Type Dropdown Menu */}
                {orderTypeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
                    {['Delivery', 'Pickup (Takeout)', 'Curbside Dine-In'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setOrderType(type);
                          setOrderTypeDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-gray-50 text-xs font-medium text-[#111827]"
                      >
                        <span>{type}</span>
                        {orderType === type && <Check className="w-4 h-4 text-[#E63946]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <motion.button
                id="search-menu-button"
                onClick={handleExecuteSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-full sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-full bg-[#1F2937] hover:bg-[#E63946] text-white flex items-center justify-center gap-2 shadow-lg transition-colors duration-200 shrink-0 cursor-pointer focus:outline-none"
                aria-label="Search Locations and Menu"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span className="sm:hidden text-sm font-bold">Search Menu</span>
              </motion.button>
            </motion.div>

            {/* Quick Suggestions Chips with Generous Margin */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-[#6B7280]">
              <span className="font-semibold text-[#111827] mr-1">Popular Searches:</span>
              {['Double Smash', 'Cheesy Loaded Fries', 'Strawberry Shake', 'Feast Box'].map(
                (item) => (
                  <button
                    key={item}
                    onClick={handleExecuteSearch}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 text-gray-700 hover:border-[#E63946] hover:text-[#E63946] transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    {item}
                  </button>
                )
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
