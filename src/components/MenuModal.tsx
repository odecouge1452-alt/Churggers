import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, Star, Plus, Search, Check, ShoppingBag, Info } from 'lucide-react';
import { PillButton } from './PillButton';
import { NutritionPopover } from './NutritionPopover';
import { MENU_ITEMS } from '../data/mockData';
import { MenuItem } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options?: string[]) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemForCustom, setSelectedItemForCustom] = useState<MenuItem | null>(null);
  const [customOptions, setCustomOptions] = useState<string[]>([]);
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [addedAlert, setAddedAlert] = useState<string | null>(null);
  const [activeNutritionItemId, setActiveNutritionItemId] = useState<string | null>(null);

  // Close nutrition popover on outside click
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (activeNutritionItemId) {
        const target = e.target as HTMLElement;
        if (!target.closest('.nutrition-popover') && !target.closest('.nutrition-toggle-btn')) {
          setActiveNutritionItemId(null);
        }
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, [activeNutritionItemId]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'burgers', label: '🍔 Burgers' },
    { id: 'sides', label: '🍟 Sides & Wings' },
    { id: 'shakes', label: '🥤 Shakes & Coolers' },
    { id: 'combos', label: '🍱 Feast Combos' },
  ];

  const availableAddons = [
    'Extra Melted Cheddar (+$1.50)',
    'Crispy Bacon Strips (+$2.00)',
    'Pickled Jalapeños (+$0.75)',
    'Secret Churggers Aioli (+$0.50)',
    'Gluten-Free Brioche Bun (+$1.00)',
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item, 1);
    setAddedAlert(`Added ${item.name} to your tray!`);
    setTimeout(() => setAddedAlert(null), 2500);
  };

  const handleOpenCustom = (item: MenuItem) => {
    setSelectedItemForCustom(item);
    setCustomOptions([]);
    setItemQuantity(1);
  };

  const handleConfirmCustomAdd = () => {
    if (selectedItemForCustom) {
      onAddToCart(selectedItemForCustom, itemQuantity, customOptions);
      setAddedAlert(`Added ${selectedItemForCustom.name} to your tray!`);
      setSelectedItemForCustom(null);
      setTimeout(() => setAddedAlert(null), 2500);
    }
  };

  const toggleOption = (opt: string) => {
    if (customOptions.includes(opt)) {
      setCustomOptions(customOptions.filter((o) => o !== opt));
    } else {
      setCustomOptions([...customOptions, opt]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E63946]">
              Made Fresh Daily
            </span>
            <h3 className="text-2xl font-black text-[#111827] font-display">
              Churggers Full Menu
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Added Alert Toast */}
        <AnimatePresence>
          {addedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1F2937] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-green-400" />
              {addedAlert}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters & Search Row */}
        <div className="p-6 pb-3 border-b border-gray-100 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search burgers, sides, shakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-xs font-medium text-[#111827] focus:outline-none focus:border-[#E63946] focus:bg-white transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#E63946] text-white shadow-md shadow-[#E63946]/20'
                      : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenCustom(item)}
              className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3.5 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/cajun_loaded_twisters.webp';
                    }}
                  />
                  {item.isPopular && (
                    <div className="absolute top-2.5 left-2.5 bg-[#E63946] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                      Popular
                    </div>
                  )}
                  {item.isSpicy && (
                    <div className="absolute top-2.5 right-2.5 bg-[#F4A261] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      Spicy
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-[#111827] text-base font-display">
                    {item.name}
                  </h4>
                  <span className="font-black text-[#E63946] text-base">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2 text-xs">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <span className="flex items-center gap-0.5 text-[#E9C46A] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#E9C46A]" />
                      {item.rating}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-gray-700">{item.calories} kcal</span>
                  </div>

                  {/* Clickable 'i' icon to open nutrition & macro popover */}
                  <button
                    id={`menu-item-info-${item.id}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNutritionItemId((prev) => (prev === item.id ? null : item.id));
                    }}
                    className={`nutrition-toggle-btn inline-flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 cursor-pointer ${
                      activeNutritionItemId === item.id
                        ? 'bg-[#E63946] text-white shadow-xs scale-105'
                        : 'bg-gray-100 hover:bg-[#E63946] text-gray-500 hover:text-white'
                    }`}
                    title={`View calories and macro-nutrients for ${item.name}`}
                    aria-label={`View calories and macro-nutrients for ${item.name}`}
                  >
                    <Info className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-50 flex items-center justify-between gap-2">
                <span className="text-[11px] text-gray-400 font-medium">Click to customize</span>
                <button
                  onClick={(e) => handleQuickAdd(item, e)}
                  className="bg-[#1F2937] hover:bg-[#E63946] text-white text-xs font-semibold py-1.5 px-3.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>

              {/* In-Card Nutrition & Macro-Nutrient Popover */}
              <AnimatePresence>
                {activeNutritionItemId === item.id && (
                  <NutritionPopover
                    item={item}
                    onClose={() => setActiveNutritionItemId(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Customization Drawer Sub-modal */}
        <AnimatePresence>
          {selectedItemForCustom && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl border-t border-gray-200 shadow-2xl p-6 z-50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedItemForCustom.image}
                    alt={selectedItemForCustom.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/cajun_loaded_twisters.webp';
                    }}
                  />
                  <div>
                    <h4 className="text-lg font-bold text-[#111827] font-display">
                      Customize {selectedItemForCustom.name}
                    </h4>
                    <p className="text-xs text-[#6B7280]">
                      Base Price: ${selectedItemForCustom.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItemForCustom(null)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Addons Selection */}
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111827] block mb-2">
                  Upgrade & Extras:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {availableAddons.map((addon) => {
                    const isChecked = customOptions.includes(addon);
                    return (
                      <button
                        key={addon}
                        onClick={() => toggleOption(addon)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium text-left border flex items-center justify-between transition-colors ${
                          isChecked
                            ? 'border-[#E63946] bg-[#E63946]/5 text-[#E63946] font-semibold'
                            : 'border-gray-200 text-[#1F2937] hover:bg-gray-50'
                        }`}
                      >
                        <span>{addon}</span>
                        {isChecked && <Check className="w-4 h-4 text-[#E63946]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity and Confirm Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-4">
                <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full">
                  <button
                    onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                    className="w-6 h-6 rounded-full bg-white text-[#111827] font-bold text-sm flex items-center justify-center shadow-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-[#111827] w-4 text-center">
                    {itemQuantity}
                  </span>
                  <button
                    onClick={() => setItemQuantity(itemQuantity + 1)}
                    className="w-6 h-6 rounded-full bg-white text-[#111827] font-bold text-sm flex items-center justify-center shadow-sm"
                  >
                    +
                  </button>
                </div>

                <PillButton
                  variant="red"
                  onClick={handleConfirmCustomAdd}
                  className="flex-1 max-w-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Order • ${(selectedItemForCustom.price * itemQuantity).toFixed(2)}
                </PillButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
