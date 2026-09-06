import React from 'react';
import { motion } from 'motion/react';

interface FloatingScribbleProps {
  className?: string;
  color?: string;
  variant?: 'burst' | 'loop' | 'sparkle' | 'zigzag' | 'crown';
  delay?: number;
}

export const FloatingScribble: React.FC<FloatingScribbleProps> = ({
  className = '',
  color = '#F4A261',
  variant = 'burst',
  delay = 0,
}) => {
  const getSvgPath = () => {
    switch (variant) {
      case 'loop':
        return (
          <path
            d="M5 25C15 5 35 5 45 25C55 45 75 45 85 25C95 5 115 5 125 25"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        );
      case 'sparkle':
        return (
          <path
            d="M20 2L23 15L36 18L23 21L20 34L17 21L4 18L17 15Z"
            fill={color}
          />
        );
      case 'zigzag':
        return (
          <path
            d="M4 18L16 6L28 18L40 6L52 18L64 6"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        );
      case 'crown':
        return (
          <path
            d="M6 30L12 12L24 24L36 8L48 24L60 12L66 30H6Z"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        );
      case 'burst':
      default:
        return (
          <path
            d="M20 6V0M20 34V40M6 20H0M34 20H40M10 10L5 5M30 30L35 35M30 10L35 5M10 30L5 35"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        );
    }
  };

  return (
    <motion.div
      className={`pointer-events-none select-none inline-block ${className}`}
      animate={{
        rotate: [0, 5, -5, 0],
        y: [0, -8, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <svg
        viewBox={
          variant === 'loop'
            ? '0 0 130 50'
            : variant === 'sparkle'
            ? '0 0 40 40'
            : variant === 'zigzag'
            ? '0 0 68 24'
            : variant === 'crown'
            ? '0 0 72 36'
            : '0 0 40 40'
        }
        className="w-full h-full"
      >
        {getSvgPath()}
      </svg>
    </motion.div>
  );
};

export const UnderlineScribble: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`overflow-visible pointer-events-none absolute -bottom-3 left-0 w-full ${className}`}
      height="18"
      viewBox="0 0 280 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M3 14C50 4 120 2 277 11C200 16 110 18 20 18"
        stroke="url(#underline-grad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          delay: 0.5,
          ease: [0.25, 1, 0.5, 1],
        }}
      />
      <defs>
        <linearGradient id="underline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F4A261" />
          <stop offset="100%" stopColor="#E9C46A" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const RedQuoteMark: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`w-12 h-12 text-[#E63946] ${className}`}
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <path d="M9.333 8C6.388 8 4 10.388 4 13.333c0 2.946 2.388 5.334 5.333 5.334.364 0 .717-.038 1.056-.109C9.82 20.893 7.644 22.84 5 23.667L6.333 26C11.127 24.533 14.667 20.147 14.667 14.667V8H9.333zm14.667 0c-2.945 0-5.333 2.388-5.333 5.333 0 2.946 2.388 5.334 5.333 5.334.364 0 .717-.038 1.056-.109-.569 2.335-2.745 4.282-5.389 5.109L21 26c4.793-1.467 8.333-5.853 8.333-11.333V8H24z" />
    </svg>
  );
};
