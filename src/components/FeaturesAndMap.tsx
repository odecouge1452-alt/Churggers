import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Clock, Receipt, MapPin, Star, X, ArrowUpRight } from 'lucide-react';
import { FloatingScribble } from './Scribbles';
import { WORLD_PINS } from '../data/mockData';
import { MapPinData } from '../types';

interface FeaturesAndMapProps {
  onSelectLocation?: (location: MapPinData) => void;
  onOpenMenu?: () => void;
}

export const FeaturesAndMap: React.FC<FeaturesAndMapProps> = ({
  onSelectLocation,
  onOpenMenu,
}) => {
  const [selectedPin, setSelectedPin] = useState<MapPinData | null>(null);

  const features = [
    {
      title: 'Lot Of Choices',
      text: 'We have 50+ menu items that are always fresh and ready.',
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F4A261] to-[#E9C46A] flex items-center justify-center text-white shadow-lg shadow-[#F4A261]/25">
          <Globe className="w-8 h-8 text-white" />
        </div>
      ),
    },
    {
      title: 'Fast Delivery',
      text: 'Our delivery team is ready to bring your food hot & fresh.',
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-[#F4A261] flex items-center justify-center text-white shadow-lg shadow-[#F4A261]/25">
          <Clock className="w-8 h-8 text-white" />
        </div>
      ),
    },
    {
      title: 'Easy Ordering',
      text: 'With an easy, safe and fast checkout process.',
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-[#E9C46A] flex items-center justify-center text-[#111827] shadow-lg shadow-[#E9C46A]/25">
          <Receipt className="w-8 h-8 text-[#111827]" />
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="bg-white py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative top scribble */}
      <div className="absolute top-12 right-16 opacity-70 hidden md:block">
        <FloatingScribble variant="loop" color="#F4A261" className="w-20 h-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW: Heading Block & 3 Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16 sm:mb-20 lg:mb-24">
          
          {/* Left Heading Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-4 flex flex-col items-start"
          >
            <div className="mb-2">
              <FloatingScribble variant="burst" color="#F4A261" className="w-7 h-7" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#111827] leading-[1.15] font-display tracking-tight mb-4">
              That is The Way To Churggers!
            </h2>
            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
              Try a variety of benefits when ordering with us. Always crispy, cooked to order, and full of flavor.
            </p>
          </motion.div>

          {/* Right: 3 Feature Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
            {features.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 * (idx + 1),
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex flex-col items-start group"
              >
                <div className="mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#111827] font-display mb-2.5">
                  {item.title}
                </h3>
                <p className="text-[#6B7280] text-sm sm:text-[15px] leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* BOTTOM ROW: Dotted World Map with Pulsing Food Pins */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="relative bg-[#FAFAFC] border border-gray-100/90 rounded-3xl p-5 sm:p-8 lg:p-12 shadow-sm overflow-hidden"
        >
          {/* Section Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 lg:mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E63946]">
                Global Presence
              </span>
              <h4 className="text-2xl sm:text-3xl font-bold text-[#111827] font-display mt-0.5">
                Churggers Near You
              </h4>
            </div>
            <p className="text-sm text-[#6B7280] max-w-sm">
              Click any food pin on the world map to view live location details, chef specials, and operating hours.
            </p>
          </div>

          {/* Mobile Quick City Jump Bar */}
          <div className="flex sm:hidden items-center gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1 scrollbar-none text-xs">
            <span className="text-gray-400 shrink-0 font-medium text-[11px]">Branches:</span>
            {WORLD_PINS.map((pin) => (
              <button
                key={pin.id}
                onClick={() => {
                  setSelectedPin(pin);
                  if (onSelectLocation) onSelectLocation(pin);
                }}
                className={`px-3 py-1.5 rounded-full shrink-0 font-bold transition-all text-xs cursor-pointer ${
                  selectedPin?.id === pin.id
                    ? 'bg-[#E63946] text-white shadow-sm'
                    : 'bg-white border border-gray-200/80 text-gray-700'
                }`}
              >
                {pin.city}
              </button>
            ))}
          </div>

          {/* Dotted Map Canvas Container with Horizontal Scroll on Narrow Mobile */}
          <div className="w-full overflow-x-auto overflow-y-hidden pb-2 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            <div className="relative min-w-[580px] sm:min-w-0 w-full h-[400px] sm:h-[460px] lg:h-[500px] bg-[#F3F4F6]/50 rounded-2xl overflow-hidden flex items-center justify-center">
            
            {/* SVG Dotted World Map */}
            <svg
              className="w-full h-full object-cover opacity-80"
              viewBox="0 0 1000 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG Grid of Dotted World Continents */}
              <defs>
                <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#CBD5E1" />
                </pattern>
                <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F1F5F9" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="1000" height="500" fill="url(#dot-pattern)" />
              <rect width="1000" height="500" fill="url(#map-glow)" />

              {/* Continents Outlines/Silhouettes in dotted density */}
              {/* North America */}
              <path
                d="M120 100 Q180 80 280 120 Q320 180 240 240 Q180 220 140 180 Z"
                fill="#E2E8F0"
                opacity="0.6"
              />
              {/* South America */}
              <path
                d="M260 260 Q340 280 320 400 Q260 450 240 340 Z"
                fill="#E2E8F0"
                opacity="0.6"
              />
              {/* Europe */}
              <path
                d="M460 110 Q540 100 550 170 Q480 200 450 160 Z"
                fill="#E2E8F0"
                opacity="0.6"
              />
              {/* Africa */}
              <path
                d="M480 210 Q580 220 560 360 Q480 380 470 260 Z"
                fill="#E2E8F0"
                opacity="0.6"
              />
              {/* Asia */}
              <path
                d="M580 90 Q850 80 880 220 Q750 300 620 220 Z"
                fill="#E2E8F0"
                opacity="0.6"
              />
              {/* Australia */}
              <path
                d="M780 340 Q890 330 870 420 Q790 440 770 380 Z"
                fill="#E2E8F0"
                opacity="0.6"
              />
            </svg>

            {/* Interactive Pins on Map */}
            {WORLD_PINS.map((pin, idx) => {
              const delays = [0, 0.4, 0.8, 1.2, 1.6, 2.0];
              const isSelected = selectedPin?.id === pin.id;

              return (
                <div
                  key={pin.id}
                  style={{
                    left: `${pin.coordinates.x}%`,
                    top: `${pin.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <motion.div
                    initial={{ y: -30, opacity: 0, scale: 0.5 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 18,
                      delay: 0.1 * idx,
                    }}
                  >
                    <motion.button
                      onClick={() => {
                        setSelectedPin(isSelected ? null : pin);
                        if (onSelectLocation) onSelectLocation(pin);
                      }}
                      animate={{
                        scale: [1, 1.09, 1],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: delays[idx % delays.length],
                      }}
                      className={`group relative flex flex-col items-center cursor-pointer focus:outline-none transition-transform duration-200 ${
                        isSelected ? 'scale-125 z-40' : 'hover:scale-115'
                      }`}
                      aria-label={`View ${pin.name}`}
                    >
                      {/* Pulse Ring */}
                      <span className="absolute -inset-2 rounded-full bg-[#F4A261]/30 animate-ping pointer-events-none" />

                      {/* Map Marker Pin Container */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-tr from-[#E63946] via-[#F4A261] to-[#E9C46A] shadow-xl flex items-center justify-center">
                        <img
                          src={pin.image}
                          alt={pin.name}
                          className="w-full h-full object-cover rounded-full border-2 border-white"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-[#1F2937] text-white p-1 rounded-full shadow">
                          <MapPin className="w-3 h-3 text-[#F4A261]" />
                        </div>
                      </div>

                      {/* Mini City Pill */}
                      <span className="mt-1 px-2.5 py-0.5 rounded-full bg-white/95 text-[11px] font-bold text-[#111827] shadow-md border border-gray-100 whitespace-nowrap">
                        {pin.city}
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              );
            })}

            {/* Selected Pin Detail Overlay Modal/Card */}
            <AnimatePresence>
              {selectedPin && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-gray-100 z-50 text-[#111827]"
                >
                  <button
                    onClick={() => setSelectedPin(null)}
                    className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex gap-3 items-center mb-3">
                    <img
                      src={selectedPin.image}
                      alt={selectedPin.name}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-100"
                    />
                    <div>
                      <div className="flex items-center gap-1 text-[#E9C46A]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#E9C46A]" />
                        ))}
                        <span className="text-xs font-bold text-[#111827] ml-1">
                          {selectedPin.rating}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-[#111827] font-display">
                        {selectedPin.name}
                      </h5>
                      <span className="text-xs text-[#E63946] font-semibold">
                        {selectedPin.city}, {selectedPin.country}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] mb-2 leading-relaxed">
                    <strong className="text-gray-700">Specialty:</strong> {selectedPin.specialty}
                  </p>

                  <div className="text-[11px] text-[#6B7280] space-y-1 mb-3 pt-2 border-t border-gray-100">
                    <p>📍 {selectedPin.address}</p>
                    <p>⏰ {selectedPin.hours}</p>
                  </div>

                  <button
                    onClick={onOpenMenu}
                    className="w-full bg-[#E63946] hover:bg-[#d62839] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-[#E63946]/20 cursor-pointer"
                  >
                    Order From This Branch
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
