import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderConfirmation } from '../types';

interface PricingDetails {
  bottleCount: number;
  originalSubtotal: number;
  originalSubtotalEur: number;
  bundleDiscount: number;
  bundleName: string;
  prepaidDiscount: number;
  finalTotal: number;
  finalTotalEur: number;
  freeShipping: boolean;
  savingsMessage: string;
  nextTierPrompt: string | null;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  pricing: PricingDetails;
  isPrepaidUpi: boolean;
  setIsPrepaidUpi: (val: boolean) => void;
  
  // Modals state
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (val: boolean) => void;
  isWardrobeOpen: boolean;
  setIsWardrobeOpen: (val: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (val: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (val: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  orderConfirmation: OrderConfirmation | null;
  setOrderConfirmation: (order: OrderConfirmation | null) => void;
  
  // Navigation helpers for dedicated pages & SEO
  navigateToProduct: (sku: string) => void;
  navigateToHome: () => void;
  navigateTo404: () => void;

  // Pincode
  userPincode: string;
  setUserPincode: (pin: string) => void;
  pincodeDeliveryText: string;
  isSameDayAvailable: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zorune_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isPrepaidUpi, setIsPrepaidUpi] = useState<boolean>(true);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  
  const [userPincode, setUserPincode] = useState<string>('400050');
  const [pincodeDeliveryText, setPincodeDeliveryText] = useState<string>('TODAY by 9:00 PM via Priority Metro Express');
  const [isSameDayAvailable, setIsSameDayAvailable] = useState<boolean>(true);

  useEffect(() => {
    try {
      localStorage.setItem('zorune_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Dynamic Pincode evaluation
  useEffect(() => {
    const pin = userPincode.trim();
    if (pin.startsWith('400') || pin.startsWith('110') || pin.startsWith('560') || pin.startsWith('500') || pin.startsWith('600') || pin.startsWith('411')) {
      setIsSameDayAvailable(true);
      setPincodeDeliveryText('TODAY by 9:00 PM via Priority Metro Express');
    } else if (pin.length === 6) {
      setIsSameDayAvailable(false);
      setPincodeDeliveryText('Within 24–48 Hours via Priority Air Courier');
    } else {
      setIsSameDayAvailable(false);
      setPincodeDeliveryText('Express Priority Delivery across India');
    }
  }, [userPincode]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.sku === product.sku);
      if (existing) {
        return prev.map(item =>
          item.product.sku === product.sku
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const navigateToProduct = (sku: string) => {
    setSelectedProduct(null);
    window.history.pushState({}, '', `/product/${sku.toUpperCase()}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo404 = () => {
    window.history.pushState({}, '', '/404');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeFromCart = (sku: string) => {
    setCart(prev => prev.filter(item => item.product.sku !== sku));
  };

  const updateQuantity = (sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sku);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.sku === sku ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Haute Niche Pricing Calculation: Pure product subtotal with zero promotional gimmicks
  const originalSubtotal = cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
  const originalSubtotalEur = cart.reduce((acc, item) => acc + (item.product.price_eur || Math.round((item.product.price || 0) / 90)) * item.quantity, 0);
  const bundleDiscount = 0;
  const bundleName = cartCount > 1 ? `Sovereign Collection (${cartCount} Editions)` : 'Haute Parfumerie Flacon';
  const nextTierPrompt: string | null = null;
  const savingsMessage = 'Complimentary White-Glove Insured Courier Included';

  // Zero merchant promotional discounts
  const prepaidDiscount = 0;
  const finalTotal = originalSubtotal;
  const finalTotalEur = originalSubtotalEur;
  const freeShipping = true; // All sovereign caskets receive complimentary insured courier

  const pricing: PricingDetails = {
    bottleCount: cartCount,
    originalSubtotal,
    originalSubtotalEur,
    bundleDiscount,
    bundleName,
    prepaidDiscount,
    finalTotal,
    finalTotalEur,
    freeShipping,
    savingsMessage,
    nextTierPrompt
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        pricing,
        isPrepaidUpi,
        setIsPrepaidUpi,
        isCartOpen,
        setIsCartOpen,
        isQuizOpen,
        setIsQuizOpen,
        isWardrobeOpen,
        setIsWardrobeOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isContactOpen,
        setIsContactOpen,
        selectedProduct,
        setSelectedProduct,
        navigateToProduct,
        navigateToHome,
        navigateTo404,
        orderConfirmation,
        setOrderConfirmation,
        userPincode,
        setUserPincode,
        pincodeDeliveryText,
        isSameDayAvailable
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
