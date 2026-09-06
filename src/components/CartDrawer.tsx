import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Check, Flame } from 'lucide-react';
import { PillButton } from './PillButton';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 20 || discountPercent > 0 ? 0 : 3.99;
  const estimatedTax = (subtotal - discountAmount) * 0.08875;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + estimatedTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'CHURGGERS20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'FAM10') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid promo code. Try CHURGGERS20');
    }
  };

  const handleCheckout = () => {
    setOrderComplete(true);
  };

  const handleFinish = () => {
    setOrderComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#FAFAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E63946]/10 text-[#E63946] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111827] font-display">
                Your Flavor Tray
              </h3>
              <p className="text-xs text-[#6B7280]">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed Screen */}
        {orderComplete ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-5 ring-8 ring-green-50/50 animate-bounce">
              <Check className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-[#111827] font-display mb-2">
              Order Received!
            </h4>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
              Our grill masters have fired up the smash pans. Your order #{Math.floor(1000 + Math.random() * 9000)} is scheduled for fresh arrival in ~22 minutes.
            </p>
            <div className="w-full bg-[#F8F9FA] rounded-2xl p-4 mb-6 text-left border border-gray-100 text-xs text-[#1F2937] space-y-2">
              <p className="font-bold">⚡ Estimated Delivery: 20-25 mins</p>
              <p className="text-gray-500">📍 Delivering fresh from Manhattan Flagship</p>
              <p className="text-gray-500">💳 Total Paid: ${grandTotal.toFixed(2)}</p>
            </div>
            <PillButton variant="red" onClick={handleFinish} className="w-full">
              Back to Home
            </PillButton>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h5 className="text-base font-bold text-[#111827] mb-1">
                    Your tray is empty
                  </h5>
                  <p className="text-xs text-[#6B7280] max-w-xs mb-6">
                    Browse our gourmet burgers, loaded fries, and craft shakes to start building your meal.
                  </p>
                  <PillButton variant="red" size="sm" onClick={onClose}>
                    Explore Menu
                  </PillButton>
                </div>
              ) : (
                items.map((cartItem, idx) => (
                  <div
                    key={`${cartItem.item.id}-${idx}`}
                    className="flex gap-3 bg-[#FBFBFB] border border-gray-100 rounded-2xl p-3.5"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/cajun_loaded_twisters.webp';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h6 className="text-sm font-bold text-[#111827] truncate">
                          {cartItem.item.name}
                        </h6>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-gray-400 hover:text-[#E63946] transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {cartItem.selectedOptions && cartItem.selectedOptions.length > 0 && (
                        <p className="text-[10px] text-[#6B7280] truncate mt-0.5">
                          + {cartItem.selectedOptions.join(', ')}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-xs font-black text-[#E63946]">
                          ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </span>

                        {/* Quantity Adjuster */}
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-gray-200">
                          <button
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                            className="w-4 h-4 text-xs font-bold text-gray-600 hover:text-black flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-[#111827] w-3 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                            className="w-4 h-4 text-xs font-bold text-gray-600 hover:text-black flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Calculation & Checkout Button */}
            {items.length > 0 && (
              <div className="p-6 bg-[#FAFAFC] border-t border-gray-100 space-y-3">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (Try CHURGGERS20)"
                    disabled={promoApplied}
                    className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs text-[#111827] focus:outline-none focus:border-[#E63946] uppercase"
                  />
                  <PillButton
                    type="submit"
                    variant={promoApplied ? 'yellow' : 'dark'}
                    size="sm"
                    disabled={promoApplied}
                  >
                    {promoApplied ? 'Applied ✓' : 'Apply'}
                  </PillButton>
                </form>
                {promoError && <p className="text-[11px] text-red-500 pl-3">{promoError}</p>}

                {/* Subtotal & Breakdown */}
                <div className="space-y-1.5 text-xs text-[#6B7280] pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#111827]">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-[#111827]">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-[#111827]">${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#111827] pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-base text-[#E63946]">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <PillButton
                  id="checkout-order-btn"
                  variant="red"
                  size="lg"
                  onClick={handleCheckout}
                  className="w-full mt-2"
                >
                  Checkout Now • ${grandTotal.toFixed(2)}
                  <ArrowRight className="w-4 h-4" />
                </PillButton>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};
