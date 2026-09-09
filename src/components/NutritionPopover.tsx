import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Info, Flame } from 'lucide-react';
import { MenuItem } from '../types';

interface NutritionPopoverProps {
  item: MenuItem;
  onClose: () => void;
}

export const NutritionPopover: React.FC<NutritionPopoverProps> = ({ item, onClose }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Use provided macros or generate realistic fallback
  const macros = item.macros || {
    protein: Math.round((item.calories * 0.25) / 4),
    carbs: Math.round((item.calories * 0.45) / 4),
    fat: Math.round((item.calories * 0.3) / 9),
    fiber: 3,
    sugar: item.category === 'shakes' ? 55 : 6,
    sodium: Math.round(item.calories * 1.4),
  };

  // Calculate calories from each macro (4 kcal/g protein, 4 kcal/g carbs, 9 kcal/g fat)
  const calProtein = macros.protein * 4;
  const calCarbs = macros.carbs * 4;
  const calFat = macros.fat * 9;
  const totalMacroCal = calProtein + calCarbs + calFat || 1;

  const pctProtein = Math.round((calProtein / totalMacroCal) * 100);
  const pctCarbs = Math.round((calCarbs / totalMacroCal) * 100);
  const pctFat = Math.max(0, 100 - pctProtein - pctCarbs);

  // Daily Value reference (based on 2000 kcal standard diet)
  const calDailyPct = Math.round((item.calories / 2000) * 100);
  const proteinDailyPct = Math.round((macros.protein / 50) * 100);
  const carbsDailyPct = Math.round((macros.carbs / 275) * 100);
  const fatDailyPct = Math.round((macros.fat / 78) * 100);

  return (
    <motion.div
      ref={popoverRef}
      id={`nutrition-popover-${item.id}`}
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
      className="nutrition-popover absolute inset-2 z-30 bg-white/98 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-200/90 flex flex-col justify-between text-left cursor-default select-text"
      role="dialog"
      aria-label={`Nutritional information for ${item.name}`}
    >
      {/* Popover Header */}
      <div>
        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E63946] uppercase tracking-wider">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Nutritional Info</span>
          </div>
          <button
            type="button"
            id={`close-nutrition-${item.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close nutritional popover"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Title */}
        <h4 className="font-bold text-gray-900 text-sm font-display mt-2 mb-2 line-clamp-1">
          {item.name}
        </h4>

        {/* Calorie Count Banner */}
        <div className="p-2.5 bg-[#FFF5EA] rounded-xl border border-[#F4A261]/25 flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-bold text-[#B25E20] uppercase tracking-wider block">
              Calorie Count
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#111827]">
                {item.calories}
              </span>
              <span className="text-xs font-bold text-gray-500">kcal</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 block">Daily Value</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E63946] bg-white px-2 py-0.5 rounded-full shadow-xs border border-orange-100">
              <Flame className="w-3 h-3 text-[#F4A261]" />
              {calDailyPct}% DV
            </span>
          </div>
        </div>

        {/* Macro-nutrient Breakdown Section */}
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
            <span className="text-gray-700 font-bold">Macro Breakdown</span>
            <span className="text-[10px] text-gray-400">P / C / F Ratio</span>
          </div>

          {/* Visual Segmented Progress Bar */}
          <div className="w-full h-2 rounded-full overflow-hidden bg-gray-100 flex mb-3 shadow-inner">
            <div
              style={{ width: `${pctProtein}%` }}
              className="bg-[#2A9D8F] transition-all duration-300"
              title={`Protein: ${pctProtein}%`}
            />
            <div
              style={{ width: `${pctCarbs}%` }}
              className="bg-[#E9C46A] transition-all duration-300"
              title={`Carbs: ${pctCarbs}%`}
            />
            <div
              style={{ width: `${pctFat}%` }}
              className="bg-[#E63946] transition-all duration-300"
              title={`Fat: ${pctFat}%`}
            />
          </div>

          {/* 3 Macro Cards */}
          <div className="grid grid-cols-3 gap-2 text-center mb-2.5">
            {/* Protein */}
            <div className="bg-gray-50/90 rounded-xl p-2 border border-gray-100/80">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F]" />
                <span className="text-[10px] font-medium text-gray-500">Protein</span>
              </div>
              <p className="text-sm font-black text-gray-900">{macros.protein}g</p>
              <span className="text-[9px] text-gray-400 font-medium block">
                {proteinDailyPct}% DV
              </span>
            </div>

            {/* Carbs */}
            <div className="bg-gray-50/90 rounded-xl p-2 border border-gray-100/80">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E9C46A]" />
                <span className="text-[10px] font-medium text-gray-500">Carbs</span>
              </div>
              <p className="text-sm font-black text-gray-900">{macros.carbs}g</p>
              <span className="text-[9px] text-gray-400 font-medium block">
                {carbsDailyPct}% DV
              </span>
            </div>

            {/* Fat */}
            <div className="bg-gray-50/90 rounded-xl p-2 border border-gray-100/80">
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                <span className="text-[10px] font-medium text-gray-500">Fat</span>
              </div>
              <p className="text-sm font-black text-gray-900">{macros.fat}g</p>
              <span className="text-[9px] text-gray-400 font-medium block">
                {fatDailyPct}% DV
              </span>
            </div>
          </div>

          {/* Secondary Nutritional Micronutrients */}
          <div className="bg-gray-50/60 rounded-lg px-2 py-1.5 flex items-center justify-around text-[10px] text-gray-600 border border-gray-100">
            {macros.fiber !== undefined && (
              <div className="text-center">
                <span className="text-gray-400 block text-[9px]">Fiber</span>
                <span className="font-bold text-gray-800">{macros.fiber}g</span>
              </div>
            )}
            {macros.sugar !== undefined && (
              <div className="text-center">
                <span className="text-gray-400 block text-[9px]">Sugar</span>
                <span className="font-bold text-gray-800">{macros.sugar}g</span>
              </div>
            )}
            {macros.sodium !== undefined && (
              <div className="text-center">
                <span className="text-gray-400 block text-[9px]">Sodium</span>
                <span className="font-bold text-gray-800">{macros.sodium}mg</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popover Footer */}
      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[9px] text-gray-400 leading-tight">
          Standard serving • 2,000 kcal diet ref.
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-xs font-bold text-[#E63946] hover:text-white hover:bg-[#E63946] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
        >
          Got it
        </button>
      </div>
    </motion.div>
  );
};
