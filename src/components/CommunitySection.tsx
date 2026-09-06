import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, Heart } from 'lucide-react';
import { PillButton } from './PillButton';
import { FloatingScribble } from './Scribbles';
import { COMMUNITY_MEMBERS } from '../data/mockData';

interface CommunitySectionProps {
  onJoinCommunity: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onJoinCommunity }) => {
  return (
    <section id="community" className="py-20 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Text (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            
            {/* Orange scribble burst near headline */}
            <div className="mb-2">
              <FloatingScribble variant="burst" color="#F4A261" className="w-8 h-8" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#111827] leading-[1.12] font-display tracking-tight mb-4"
            >
              The Churggers Fam Is Calling, <br />
              No Need For Stalling.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="text-base sm:text-lg text-[#6B7280] leading-relaxed mb-8 max-w-md"
            >
              Want more fun perks? Join our community to get exclusive secret menu drops, VIP burger passes, instant birthday gifts, and feel the real flavor.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            >
              <PillButton
                id="join-community-btn"
                variant="red"
                size="lg"
                onClick={onJoinCommunity}
                className="shadow-xl shadow-[#E63946]/25"
              >
                <Users className="w-5 h-5" />
                Join Community
              </PillButton>
            </motion.div>

            {/* Micro perk bullet points */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 grid grid-cols-2 gap-3 text-xs font-semibold text-[#1F2937]"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F4A261]" />
                <span>20% First Order Code</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#E63946] fill-[#E63946]" />
                <span>Free Birthday Shake</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Avatar Cluster (7 cols) */}
          <div className="lg:col-span-7 relative h-[400px] sm:h-[460px] lg:h-[480px] bg-[#FAFAFC] rounded-3xl border border-gray-100 p-4 sm:p-6 overflow-hidden flex items-center justify-center">
            
            {/* Background cloud shape */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-[#FFF5EA] via-[#FFFDF8] to-[#FFF0F0] opacity-90 blur-xl" />

            {/* Floating Avatars & Social Medallions Cluster */}
            <div className="relative w-full h-full">
              {COMMUNITY_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  style={{
                    left: `${member.position.x}%`,
                    top: `${member.position.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Floating loop container */}
                  <motion.div
                    animate={{
                      y: [0, -14, 0],
                      x: [0, 4, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: member.floatDuration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: member.floatDelay,
                    }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Speech Bubble (appears 0.3s after avatar) */}
                    {member.speechText && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.7 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: member.floatDelay + 0.3,
                          duration: 0.5,
                          type: 'spring',
                          stiffness: 260,
                        }}
                        className="relative mb-1.5 px-3 py-1 bg-white text-[#111827] text-xs font-bold rounded-xl shadow-lg border border-gray-100 select-none whitespace-nowrap"
                      >
                        {member.speechText}
                        {/* Speech bubble tail */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-100" />
                      </motion.div>
                    )}

                    {/* Circular Avatar Frame */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        delay: member.floatDelay,
                      }}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-white shadow-xl ring-4 ring-[#F4A261]/20 hover:scale-110 transition-transform duration-200"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full"
                      />

                      {/* Attached Social Icon badge if present */}
                      {member.socialIcon === 'instagram' && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-2 ring-white">
                          ig
                        </div>
                      )}
                      {member.socialIcon === 'tiktok' && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-2 ring-white">
                          tk
                        </div>
                      )}
                      {member.socialIcon === 'twitter' && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-2 ring-white">
                          X
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              ))}

              {/* Floating Center Badge */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 z-10"
              >
                <div className="w-6 h-6 rounded-full bg-[#E63946] flex items-center justify-center text-white text-xs font-bold">
                  🍔
                </div>
                <span className="text-xs font-bold text-[#111827]">#ChurggersSquad</span>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
