import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { FloatingScribble, RedQuoteMark } from './Scribbles';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3 items visible on desktop, 1 on mobile
  const maxIndex = TESTIMONIALS.length - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  // Optional 5s auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section id="testimonials" className="py-20 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative top red scribble */}
      <div className="absolute top-10 left-12 opacity-80 pointer-events-none hidden md:block">
        <FloatingScribble variant="sparkle" color="#E63946" className="w-8 h-8" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-start"
          >
            {/* Red scribble accent */}
            <div className="mb-2">
              <FloatingScribble variant="burst" color="#E63946" className="w-7 h-7" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111827] font-display tracking-tight leading-tight">
              Satisfied Customers <br className="hidden sm:inline" />
              Are Our Best Ads.
            </h2>
          </motion.div>

          {/* Navigation Arrows on Far Right */}
          <div className="flex items-center gap-3">
            <motion.button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-200 hover:border-[#F4A261] text-[#111827] hover:text-[#F4A261] flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              id="testimonial-next-btn"
              onClick={handleNext}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-200 hover:border-[#F4A261] text-[#111827] hover:text-[#F4A261] flex items-center justify-center transition-colors duration-200 cursor-pointer focus:outline-none"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Testimonial Cards Row */}
        <div ref={containerRef} className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 lg:gap-12">
            {TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 * idx,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex flex-col justify-between p-6 sm:p-0 rounded-3xl sm:rounded-none bg-[#FAFAFC] sm:bg-transparent border border-gray-100 sm:border-0 shadow-sm sm:shadow-none"
              >
                <div>
                  {/* Large Red Quotation Mark */}
                  <div className="mb-4">
                    <RedQuoteMark />
                  </div>

                  {/* Quote Text (18px, #374151) */}
                  <p className="text-base sm:text-lg text-[#374151] leading-relaxed mb-8 font-normal">
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom Row: Customer Avatar, Name, Role, 5 Yellow Stars */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/60 sm:border-gray-100">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                    />
                    <div>
                      <h4 className="text-base font-bold text-[#111827] font-display">
                        {item.name}
                      </h4>
                      <p className="text-sm text-[#6B7280]">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* 5 Yellow Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.stars)].map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 fill-[#E9C46A] text-[#E9C46A]"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
