import React from 'react';
import { motion } from 'motion/react';

interface PillButtonProps {
  children: React.ReactNode;
  variant?: 'red' | 'outline' | 'dark' | 'yellow';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  id?: string;
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = 'red',
  onClick,
  className = '',
  type = 'button',
  size = 'md',
  disabled = false,
  id,
}) => {
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-2.5 px-6 text-base',
    lg: 'py-3.5 px-8 text-lg font-semibold tracking-wide',
  };

  const variantStyles = {
    red: 'bg-[#E63946] text-white hover:bg-[#d62839] shadow-md hover:shadow-lg shadow-[#E63946]/25 active:scale-95',
    outline: 'border border-[#1F2937] text-[#1F2937] hover:bg-[#1F2937] hover:text-white active:scale-95',
    dark: 'bg-[#1F2937] text-white hover:bg-[#111827] shadow-md hover:shadow-lg active:scale-95',
    yellow: 'bg-[#E9C46A] text-[#111827] hover:bg-[#dfb555] font-semibold active:scale-95',
  };

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
