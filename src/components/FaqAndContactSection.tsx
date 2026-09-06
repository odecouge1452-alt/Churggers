import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, CheckCircle2, Send } from 'lucide-react';
import { FloatingScribble } from './Scribbles';
import { PillButton } from './PillButton';
import { FAQ_ITEMS } from '../data/mockData';

export const FaqAndContactSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32 bg-[#F8F9FA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Email Capture (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* Orange scribble accent */}
            <div className="mb-2">
              <FloatingScribble variant="burst" color="#F4A261" className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111827] font-display tracking-tight leading-[1.15] mb-4">
              Got A Question For Churggers?
            </h2>

            <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed mb-8">
              If there are questions you want to ask, we will answer all your questions. Drop your email and our friendly team will reply in minutes.
            </p>

            {/* Email Capture: Combined Pill Input + Red Pill Submit Button */}
            <div className="w-full max-w-md">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-full bg-green-50 border border-green-200 text-green-800 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm font-semibold">
                    Thank you! We'll get back to you shortly.
                  </span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleEmailSubmit}
                  className="relative flex flex-col sm:flex-row items-stretch sm:items-center w-full bg-white rounded-2xl sm:rounded-full border border-gray-300/80 shadow-md p-1.5 focus-within:border-[#E63946] focus-within:ring-2 focus-within:ring-[#E63946]/20 transition-all gap-2 sm:gap-0"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="w-full bg-transparent pl-4 sm:pl-5 pr-4 sm:pr-28 py-3 sm:py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none"
                  />
                  <PillButton
                    type="submit"
                    variant="red"
                    size="sm"
                    className="sm:absolute sm:right-1.5 sm:top-1.5 sm:bottom-1.5 px-6 font-semibold w-full sm:w-auto"
                  >
                    Submit
                  </PillButton>
                </form>
              )}

              <p className="text-xs text-[#6B7280] mt-3 pl-4">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </motion.div>

          {/* Right Column: FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg font-medium text-[#6B7280] mb-6"
            >
              Maybe your question has been answered, check this out:
            </motion.p>

            <div className="divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB]">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 * idx,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="group"
                  >
                    <button
                      onClick={() => toggleFaq(item.id)}
                      className="w-full py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg sm:text-xl font-bold text-[#111827] group-hover:text-black font-display pr-4">
                        {item.question}
                      </span>
                      <motion.div
                        animate={{
                          rotate: isOpen ? 90 : 0,
                          x: isOpen ? 0 : 0,
                        }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#1F2937] group-hover:text-[#E63946] shrink-0"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-[15px] sm:text-base text-[#6B7280] leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
