import React from 'react';
import { CheckCircle2, Truck, Sparkles, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderConfirmationModal: React.FC = () => {
  const { orderConfirmation, setOrderConfirmation } = useCart();

  if (!orderConfirmation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-white border border-[oklch(0.926_0.01_81.8)] rounded-3xl shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
        
        {/* Celebration Monogram */}
        <div className="w-16 h-16 rounded-full bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] flex items-center justify-center mx-auto mb-4 text-[oklch(0.179_0.004_286)] shadow-xs">
          <CheckCircle2 className="w-8 h-8 text-[oklch(0.683_0.102_82.6)] stroke-[2.5]" />
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[oklch(0.683_0.102_82.6)] block mb-1">
          ORDER CONFIRMED & SEALED
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)] mb-2">
          Thank You For Choosing ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
        </h2>
        <p className="text-xs text-[oklch(0.442_0.015_286)] mb-6">
          Order Reference: <strong className="text-[oklch(0.179_0.004_286)] font-mono">{orderConfirmation.orderNumber}</strong> • {orderConfirmation.paymentMethod}
        </p>

        {/* Priority Logistics Milestone Card */}
        <div className="p-4 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] text-left mb-6 space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[oklch(0.926_0.01_81.8)]">
            <span className="font-bold text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
              <span>Priority Metro Express Delivery</span>
            </span>
            <span className="text-[oklch(0.683_0.102_82.6)] font-mono font-bold text-[11px]">{orderConfirmation.trackingAwb}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-[oklch(0.262_0.007_286)]">
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>Estimated SLA: <strong className="text-emerald-800 font-semibold">{orderConfirmation.estimatedDelivery}</strong></span>
          </div>

          <p className="text-[11px] text-[oklch(0.552_0.014_286)] flex items-center space-x-1">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real-time dispatch updates dispatched to WhatsApp (+91 {orderConfirmation.phone})</span>
          </p>
        </div>

        {/* The Crucial Maceration / Fragrance Resting Card */}
        <div className="p-4 rounded-2xl bg-[oklch(0.977_0.013_86.8)] border border-[oklch(0.926_0.01_81.8)] text-left mb-6">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)] mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Connoisseur Resting Protocol</span>
          </div>
          <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed font-normal">
            {orderConfirmation.macerationInstructions}
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => setOrderConfirmation(null)}
          className="w-full py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
        >
          Explore More Masterpieces
        </button>

      </div>
    </div>
  );
};
