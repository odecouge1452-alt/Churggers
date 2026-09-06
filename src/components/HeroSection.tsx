import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Flame, Star, ShoppingBag, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { PillButton } from './PillButton';
import { FloatingScribble, UnderlineScribble } from './Scribbles';
import { MenuItem } from '../types';

interface HeroSectionProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderNow,
  onExploreMenu,
  onAddToCart,
}) => {
  const [activeMiniCard, setActiveMiniCard] = useState<number>(0);
  const [miniLiked, setMiniLiked] = useState<boolean>(false);

  const miniAppCards: MenuItem[] = [
    {
      id: 'churg-classic',
      name: 'Churggers Classic',
      category: 'burgers',
      price: 8.99,
      calories: 680,
      description: 'Double beef, cheddar & house glaze',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80',
      rating: 4.9,
    },
    {
      id: 'spicy-deluxe',
      name: 'Spicy Deluxe',
      category: 'burgers',
      price: 9.79,
      calories: 740,
      description: 'Crispy fried chicken, habanero glaze',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop&q=80',
      rating: 4.8,
    },
    {
      id: 'cheesy-fries',
      name: 'Cheesy Fries',
      category: 'sides',
      price: 5.49,
      calories: 490,
      description: 'Warm melted cheddar & house spices',
      image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&auto=format&fit=crop&q=80',
      rating: 4.9,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-fit lg:min-h-screen pt-28 sm:pt-36 lg:pt-32 pb-20 sm:pb-28 lg:pb-20 flex items-center overflow-hidden bg-[#F8F9FA]"
    >
      {/* Background radial tint & decorative organic shapes */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-[#E9C46A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#F4A261]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating background clouds / doodles */}
      <div className="absolute top-20 left-[10%] opacity-40">
        <FloatingScribble variant="sparkle" color="#F4A261" delay={0.2} className="w-8 h-8" />
      </div>
      <div className="absolute bottom-28 left-[45%] opacity-50">
        <FloatingScribble variant="loop" color="#E9C46A" delay={1.5} className="w-16 h-8" />
      </div>
      <div className="absolute top-36 right-[12%] opacity-60">
        <FloatingScribble variant="crown" color="#F4A261" delay={0.8} className="w-12 h-8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Text: 55% -> 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center">
            
            {/* Small orange burst/scribble above headline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-3"
            >
              <FloatingScribble variant="burst" color="#F4A261" className="w-7 h-7" />
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F4A261]/15 text-[#E63946] text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-[#E63946]" />
                100% Fresh Daily • Never Frozen
              </span>
            </motion.div>

            {/* Headline with animated hand-drawn SVG underline */}
            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-[62px] xl:text-[70px] font-black text-[#111827] leading-[1.12] sm:leading-[1.08] tracking-tight font-display mb-6"
            >
              Flavor In Your Face, <br className="hidden sm:inline" />
              But In{' '}
              <span className="relative inline-block text-[#111827]">
                A Good Way!
                <UnderlineScribble />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-[480px] mb-8"
            >
              Now you can order the best fast food anywhere, anytime — and of course it is made fresh. Double smash patties, golden melted cheese, and craft thick shakes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <PillButton
                id="hero-order-now-btn"
                variant="red"
                size="lg"
                onClick={onOrderNow}
                className="w-full sm:w-auto text-base shadow-xl shadow-[#E63946]/30"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Now
              </PillButton>

              <PillButton
                id="hero-explore-menu-btn"
                variant="outline"
                size="lg"
                onClick={onExploreMenu}
                className="w-full sm:w-auto text-base border-2"
              >
                Browse Menu
                <ArrowRight className="w-4 h-4 text-[#1F2937]" />
              </PillButton>
            </motion.div>

            {/* Trust badge row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex items-center gap-6 pt-6 border-t border-gray-200/60 w-full max-w-md"
            >
              <div className="flex -space-x-2.5">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer avatar"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer avatar"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Customer avatar"
                />
                <div className="h-9 w-9 rounded-full bg-[#E63946] text-white text-xs font-bold flex items-center justify-center ring-2 ring-white shadow-sm">
                  50k+
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#E9C46A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E9C46A]" />
                  ))}
                  <span className="text-xs font-bold text-[#111827] ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-[#6B7280] font-medium">From 100,000+ burger lovers</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Visual: 45% -> 5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-10 sm:mt-14 lg:mt-0 pb-6 sm:pb-8 lg:pb-0">
            
            {/* Soft pale yellow to white radial background behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#FFF4D6] via-[#FFF9E8] to-white opacity-80 blur-2xl transform scale-110" />
            </div>

            {/* Faint floating clouds / badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 left-0 sm:left-2 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5 sm:gap-3 z-20"
            >
              <div className="w-8 h-8 rounded-full bg-[#E63946]/10 text-[#E63946] flex items-center justify-center">
                <Flame className="w-4 h-4 fill-[#E63946]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111827]">Fast Delivery</p>
                <p className="text-[11px] text-[#6B7280]">Under 25 mins avg.</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 sm:-bottom-4 right-0 sm:right-4 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5 sm:gap-3 z-20"
            >
              <div className="w-8 h-8 rounded-full bg-[#E9C46A]/20 text-[#111827] flex items-center justify-center">
                <Star className="w-4 h-4 fill-[#E9C46A] text-[#E9C46A]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111827]">Free Shake Coupon</p>
                <p className="text-[11px] text-[#6B7280]">On orders over $25</p>
              </div>
            </motion.div>

            {/* 3D Hand Holding iPhone Mockup with Bobbing Float Animation */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="relative z-10 w-full max-w-[320px] sm:max-w-[340px]"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* iPhone Body Frame */}
                <div className="relative mx-auto w-[290px] sm:w-[310px] bg-[#1F2937] p-3 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-[#374151]">
                  
                  {/* Dynamic Island / Speaker notch */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111827]" />
                    <div className="w-2 h-2 rounded-full bg-[#1e293b]" />
                  </div>

                  {/* Phone Screen UI (Mini Churggers App) */}
                  <div className="bg-[#FAFAFA] rounded-[34px] overflow-hidden pt-7 pb-4 px-3.5 text-[#111827] select-none flex flex-col justify-between h-[490px] border border-gray-100">
                    
                    {/* App Header */}
                    <div className="pt-2 pb-1.5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider block">Churggers App</span>
                        <h4 className="text-sm font-bold text-[#111827] font-display">Create Your Own Meal.</h4>
                      </div>
                      <button
                        onClick={() => setMiniLiked(!miniLiked)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          miniLiked ? 'bg-[#E63946]/10 text-[#E63946]' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${miniLiked ? 'fill-[#E63946]' : ''}`} />
                      </button>
                    </div>

                    {/* App Categories Bar */}
                    <div className="flex items-center gap-1.5 py-1 text-[11px] font-semibold overflow-x-auto no-scrollbar">
                      {['All', 'Burgers', 'Sides', 'Shakes'].map((cat, i) => (
                        <button
                          key={cat}
                          onClick={() => setActiveMiniCard(i % miniAppCards.length)}
                          className={`px-2.5 py-1 rounded-full transition-colors ${
                            i === 0
                              ? 'bg-[#E63946] text-white shadow-sm'
                              : 'bg-white text-[#6B7280] border border-gray-100'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Horizontal Scroll Cards in Mini App */}
                    <div className="relative my-2">
                      <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-100/80">
                        <div className="relative h-32 w-full rounded-xl overflow-hidden mb-2.5 bg-gray-50">
                          <img
                            src={miniAppCards[activeMiniCard].image}
                            alt={miniAppCards[activeMiniCard].name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute top-2 left-2 bg-[#E63946] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ★ {miniAppCards[activeMiniCard].rating}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-[#111827] truncate w-36">
                              {miniAppCards[activeMiniCard].name}
                            </h5>
                            <p className="text-[10px] text-[#6B7280]">
                              {miniAppCards[activeMiniCard].description}
                            </p>
                          </div>
                          <span className="text-xs font-black text-[#E63946]">
                            ${miniAppCards[activeMiniCard].price.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => onAddToCart(miniAppCards[activeMiniCard])}
                          className="mt-2.5 w-full bg-[#1F2937] hover:bg-[#E63946] text-white text-[11px] font-semibold py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add To Meal
                        </button>
                      </div>

                      {/* Mini card indicator dots */}
                      <div className="flex justify-center gap-1 mt-2">
                        {miniAppCards.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveMiniCard(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              activeMiniCard === idx ? 'w-4 bg-[#E63946]' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Bottom Mini App Tab Bar */}
                    <div className="bg-white rounded-2xl px-3 py-2 border border-gray-100 flex items-center justify-around text-gray-400">
                      <div className="text-[#E63946] flex flex-col items-center">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[9px] font-bold mt-0.5">Explore</span>
                      </div>
                      <div className="hover:text-[#111827] flex flex-col items-center cursor-pointer" onClick={onExploreMenu}>
                        <ShoppingBag className="w-4 h-4" />
                        <span className="text-[9px] font-medium mt-0.5">Menu</span>
                      </div>
                      <div className="hover:text-[#111827] flex flex-col items-center cursor-pointer" onClick={onOrderNow}>
                        <Flame className="w-4 h-4" />
                        <span className="text-[9px] font-medium mt-0.5">Deals</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Subtle 3D Grip Reflection Effect */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/20 rounded-full blur-md" />
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
