import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Check, Gift } from 'lucide-react';
import { PillButton } from './PillButton';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinCommunityModal: React.FC<JoinCommunityModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#E9C46A]/30 text-[#111827] flex items-center justify-center mb-4 ring-8 ring-[#E9C46A]/20">
              <Gift className="w-8 h-8 text-[#E63946]" />
            </div>
            <h4 className="text-2xl font-black text-[#111827] font-display mb-1">
              Welcome to the Fam!
            </h4>
            <p className="text-xs text-[#6B7280] max-w-xs mb-4">
              Here is your exclusive 20% off community discount code:
            </p>
            <div className="px-6 py-3 bg-red-50 border-2 border-dashed border-[#E63946] rounded-2xl text-lg font-black text-[#E63946] tracking-widest mb-6 select-all">
              CHURGGERS20
            </div>
            <PillButton variant="red" size="md" onClick={onClose} className="w-full">
              Use In Menu Now
            </PillButton>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-[#F4A261]/20 text-[#E63946] flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-[#111827] font-display mb-1">
              Join #ChurggersFam
            </h3>
            <p className="text-xs text-[#6B7280] max-w-xs mx-auto mb-6">
              Get secret drop alerts, exclusive 20% discount coupon, and invite-only tasting events.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                  Social Handle (Optional)
                </label>
                <input
                  type="text"
                  placeholder="@yourusername"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#E63946] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">
                  Your Best Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#E63946] focus:bg-white"
                />
              </div>

              <PillButton type="submit" variant="red" size="md" className="w-full mt-3">
                Claim VIP Pass & 20% Off
              </PillButton>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};
