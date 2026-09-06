import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface StatItemProps {
  finalNumber: number;
  suffix: string;
  decimals?: number;
  label1: string;
  label2: string;
  delay: number;
  inView: boolean;
}

const StatColumn: React.FC<StatItemProps> = ({
  finalNumber,
  suffix,
  decimals = 0,
  label1,
  label2,
  delay,
  inView,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500; // 1.5s
    const startTime = performance.now() + delay * 1000;

    const updateCounter = (currentTime: number) => {
      if (currentTime < startTime) {
        requestAnimationFrame(updateCounter);
        return;
      }
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * finalNumber;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(finalNumber);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [inView, finalNumber, delay]);

  const formattedValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
      className="flex flex-col items-center justify-center text-center px-3 sm:px-6 py-2 sm:py-3"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight mb-1.5">
        {formattedValue}
        <span>{suffix}</span>
      </div>
      <div className="text-xs sm:text-[13px] lg:text-sm font-semibold uppercase tracking-wider text-white/90 leading-snug">
        <div>{label1}</div>
        <div>{label2}</div>
      </div>
    </motion.div>
  );
};

export const StatsBar: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="relative z-20 w-full mt-10 sm:mt-14 lg:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ y: 80, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="w-full bg-[#E63946] rounded-[24px] sm:rounded-[28px] lg:rounded-b-none lg:rounded-t-[28px] shadow-2xl shadow-[#E63946]/30 py-10 sm:py-12 lg:py-12 px-6 sm:px-10 lg:px-12 border-t-2 border-white/20"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-10 lg:gap-y-0 gap-x-4 sm:gap-x-8 lg:gap-x-6 lg:divide-x lg:divide-white/20">
          <StatColumn
            finalNumber={10}
            suffix="+"
            label1="Years of"
            label2="Flavor"
            delay={0.1}
            inView={isInView}
          />
          <StatColumn
            finalNumber={50}
            suffix="+"
            label1="Locations"
            label2="Worldwide"
            delay={0.25}
            inView={isInView}
          />
          <StatColumn
            finalNumber={100}
            suffix="K+"
            label1="Happy"
            label2="Customers"
            delay={0.4}
            inView={isInView}
          />
          <StatColumn
            finalNumber={4.8}
            suffix=""
            decimals={1}
            label1="Overall"
            label2="Rating"
            delay={0.55}
            inView={isInView}
          />
        </div>
      </motion.div>
    </div>
  );
};
