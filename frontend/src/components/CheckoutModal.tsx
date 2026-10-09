import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CheckCircle2, CreditCard, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderConfirmation } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    pricing, 
    isPrepaidUpi, 
    setIsPrepaidUpi,
    clearCart,
    setOrderConfirmation,
    userPincode,
    pincodeDeliveryText
  } = useCart();

  const [phone, setPhone] = useState('9820123456');
  const [name, setName] = useState('Aarav Mehta');
  const [address, setAddress] = useState('Flat 402, Signature Towers, Bandra West');
  const [pincode, setPincode] = useState(userPincode || '400050');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = 'ZR-' + Math.floor(100000 + Math.random() * 900000);
      const confirmation: OrderConfirmation = {
        orderNumber,
        items: [...cart],
        total: pricing.finalTotal,
        paymentMethod: isPrepaidUpi ? 'Online Gateway (UPI / Cards / NetBanking)' : 'Cash on Delivery (COD)',
        phone,
        trackingAwb: 'ZR-EXP-' + Math.floor(10000000 + Math.random() * 90000000),
        estimatedDelivery: pincodeDeliveryText,
        macerationInstructions: 'Artisanal Extrait de Parfum (28%) experiences kinetic agitation in transit. Spray 3 test pumps into the air, then let your bottle rest in a cool, dark drawer for 24–48 hours to allow the accords to settle.'
      };

      setOrderConfirmation(confirmation);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsCheckoutOpen(false)}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white border border-[oklch(0.926_0.01_81.8)] rounded-3xl shadow-2xl p-6 sm:p-8 overscroll-contain popup-scroll-pane"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer border border-[oklch(0.926_0.01_81.8)]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Secure Checkout Header */}
        <div className="flex items-center space-x-2.5 pb-4 border-b border-[oklch(0.926_0.01_81.8)] mb-6">
          <div className="w-8 h-8 rounded-lg bg-[oklch(0.179_0.004_286)] flex items-center justify-center text-white font-extrabold text-sm">
            <ShieldCheck className="w-5 h-5 text-[oklch(0.683_0.102_82.6)]" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)] flex items-center space-x-2">
              <span>Instant 1-Click Secure Checkout<span className="text-[oklch(0.683_0.102_82.6)]">.</span></span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-sans font-bold border border-emerald-200">Encrypted</span>
            </h3>
            <p className="text-[11px] text-[oklch(0.552_0.014_286)]">Fast-track verified checkout for luxury fragrance</p>
          </div>
        </div>

        {/* Order Summary Pill */}
        <div className="p-3.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] mb-6 flex items-center justify-between text-xs">
          <div>
            <span className="text-[oklch(0.442_0.015_286)] block">{pricing.bottleCount} Flacons ({pricing.bundleName})</span>
            <span className="font-bold text-[oklch(0.179_0.004_286)]">Estimated Delivery: {pincodeDeliveryText}</span>
          </div>
          <span className="text-base font-extrabold text-[oklch(0.179_0.004_286)]">₹{pricing.finalTotal.toLocaleString('en-IN')}</span>
        </div>

        <form onSubmit={handleCompleteOrder} className="space-y-4">
          
          {/* Phone */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
              Mobile Number (For Priority WhatsApp Updates)
            </label>
            <div className="flex rounded-xl overflow-hidden border border-[oklch(0.926_0.01_81.8)] focus-within:border-[oklch(0.683_0.102_82.6)]">
              <span className="px-3 py-2 bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)] text-xs flex items-center border-r border-[oklch(0.926_0.01_81.8)] font-bold">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Name & Pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs px-3 py-2 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
                Pincode
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs px-3 py-2 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1">
              Delivery Address (Street, Building, Flat)
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs px-3 py-2 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)] mb-1.5">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              
              {/* UPI Option */}
              <div
                onClick={() => setIsPrepaidUpi(true)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isPrepaidUpi
                    ? 'bg-[oklch(0.977_0.013_86.8)] border-[oklch(0.683_0.102_82.6)] shadow-2xs'
                    : 'bg-[oklch(0.98_0.005_78.3)] border-[oklch(0.926_0.01_81.8)]'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <CreditCard className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                  <span className="text-xs font-bold text-[oklch(0.179_0.004_286)]">UPI / Cards / NetBanking</span>
                </div>
                <span className="text-[10px] text-[oklch(0.442_0.015_286)] block">
                  Encrypted Gateway Checkout
                </span>
              </div>

              {/* COD Option */}
              <div
                onClick={() => setIsPrepaidUpi(false)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  !isPrepaidUpi
                    ? 'bg-[oklch(0.977_0.013_86.8)] border-[oklch(0.683_0.102_82.6)]'
                    : 'bg-[oklch(0.98_0.005_78.3)] border-[oklch(0.926_0.01_81.8)]'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <Banknote className="w-4 h-4 text-[oklch(0.552_0.014_286)]" />
                  <span className="text-xs font-bold text-[oklch(0.179_0.004_286)]">Cash on Delivery</span>
                </div>
                <span className="text-[10px] text-[oklch(0.552_0.014_286)] block">
                  Pay upon hand-delivery
                </span>
              </div>

            </div>
          </div>

          {/* Risk Mitigation Pill */}
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>Fast-Track Verified: Zero transit risk. Priority queued for dispatch.</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4"
          >
            {isSubmitting ? (
              <span>Securing Transaction...</span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                <span>Confirm Order (Pay ₹{pricing.finalTotal.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
