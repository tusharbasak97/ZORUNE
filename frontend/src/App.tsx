import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Tier1Showcase } from './components/Tier1Showcase';
import { ProductGrid } from './components/ProductGrid';
import { CannibalizationShowcase } from './components/CannibalizationShowcase';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SpotlightsSection } from './components/SpotlightsSection';
import { NewsletterClub } from './components/NewsletterClub';
import { ParallaxFooterReveal } from './components/ParallaxFooterReveal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { NotFound } from './components/NotFound';
import { Preloader } from './components/Preloader';
import { WardrobeBuilderModal } from './components/WardrobeBuilderModal';
import { OlfactiveMatchmakerModal } from './components/OlfactiveMatchmakerModal';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { PolicyModal, PolicyTab } from './components/PolicyModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Load enriched 30-perfume catalog
import productsData from './data/products.json';
import { Product } from './types';

type RouteState = 
  | { type: 'home' }
  | { type: 'product'; product: Product }
  | { type: '404' };

export const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab | null>(null);
  const { isContactOpen, setIsContactOpen } = useCart();
  const products: Product[] = (productsData as any).products;

  // Brand landing preloader on every page load
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // High-sensitivity luxury smooth scroll animation
  useSmoothScroll(!showIntro);

  // Parse route based on URL path
  const resolveRoute = (): RouteState => {
    if (typeof window === 'undefined') return { type: 'home' };
    const path = window.location.pathname;

    if (path === '/' || path === '') {
      return { type: 'home' };
    }

    if (path === '/404') {
      return { type: '404' };
    }

    if (path.startsWith('/product/')) {
      const rawSku = path.replace('/product/', '').trim().toUpperCase();
      const found = products.find(
        p => p.sku.toUpperCase() === rawSku || 
             p.sku.toUpperCase().replace('-', '') === rawSku.replace('-', '') ||
             rawSku.includes(p.sku.toUpperCase())
      );
      if (found) {
        return { type: 'product', product: found };
      }
      return { type: '404' };
    }

    // Any invalid/unrecognized URL redirects to 404 error page
    return { type: '404' };
  };

  const [currentRoute, setCurrentRoute] = useState<RouteState>(resolveRoute);

  // If wrong URL navigated, automatically redirect browser address bar to /404
  useEffect(() => {
    if (currentRoute.type === '404' && window.location.pathname !== '/404') {
      window.history.replaceState({ zoruneRoute: '/404' }, '', '/404');
    }
  }, [currentRoute]);

  const { setIsQuizOpen, setIsWardrobeOpen, navigateToHome, navigateToProduct, navigateTo404 } = useCart();

  // Listen to popstate for browser Back/Forward & URL changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(resolveRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    if (currentRoute.type !== 'home') {
      navigateToHome();
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(el, { duration: 0.75, offset: -80 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 80);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <>
      {/* Haute Landing Preloader on Every Page Load */}
      {showIntro && (
        <Preloader
          onComplete={() => {
            setShowIntro(false);
          }}
        />
      )}

      {/* VIEW 1: DEDICATED PRODUCT PAGE */}
      {currentRoute.type === 'product' && (
        <div className="min-h-screen bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] flex flex-col font-sans selection:bg-[oklch(0.683_0.102_82.6)] selection:text-white relative">
          {/* Upper Sheet: All page content and footer existing on a layer above the brand */}
          <div className="relative z-10 bg-[oklch(0.98_0.005_78.3)] mb-[260px] sm:mb-[340px] lg:mb-[380px] shadow-[0_25px_50px_-12px_oklch(0_0_0/0.12)] border-b border-[oklch(0.926_0.01_81.8)]">
            <Navbar 
              onOpenSearch={() => setIsSearchOpen(true)}
              onNavigateSection={handleNavigateSection}
            />

            <ProductDetailPage
              product={currentRoute.product}
              allProducts={products}
              onNavigateHome={navigateToHome}
              onSelectProduct={(p) => navigateToProduct(p.sku)}
            />

            <Footer 
              onNavigateSection={handleNavigateSection} 
              onReplayIntro={handleReplayIntro}
              onOpenPolicy={(tab) => setPolicyTab(tab)}
            />
          </div>

          {/* Statically Anchored Brand Name at Bottom */}
          <ParallaxFooterReveal />
        </div>
      )}

      {/* VIEW 2: SCENTEDELIC 404 ERROR PAGE */}
      {currentRoute.type === '404' && (
        <NotFound
          onReturnHome={navigateToHome}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenWardrobe={() => setIsWardrobeOpen(true)}
        />
      )}

      {/* VIEW 3: MAIN BOUTIQUE HOMEPAGE */}
      {currentRoute.type === 'home' && (
        <div className="min-h-screen bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] flex flex-col font-sans selection:bg-[oklch(0.683_0.102_82.6)] selection:text-white relative">
          {/* Upper Sheet: All page content and footer existing on a layer above the brand */}
          <div className="relative z-10 bg-[oklch(0.98_0.005_78.3)] mb-[260px] sm:mb-[340px] lg:mb-[380px] shadow-[0_25px_50px_-12px_oklch(0_0_0/0.12)] border-b border-[oklch(0.926_0.01_81.8)]">
            <Navbar 
              onOpenSearch={() => setIsSearchOpen(true)}
              onNavigateSection={handleNavigateSection}
            />

            <main className="flex-1">
              <Hero onExploreCatalog={() => handleNavigateSection('catalog')} />
              <Tier1Showcase products={products} />
              <ProductGrid products={products} />
              <CannibalizationShowcase products={products} />
              
              {/* Belvish Homepage Ending Sections */}
              <TestimonialsSection />
              <SpotlightsSection />
              <NewsletterClub />
            </main>

            <Footer 
              onNavigateSection={handleNavigateSection} 
              onReplayIntro={handleReplayIntro}
              onOpenPolicy={(tab) => setPolicyTab(tab)}
            />
          </div>

          {/* Statically Anchored Brand Name at Bottom */}
          <ParallaxFooterReveal />
        </div>
      )}

      {/* Mobile Bottom Fixed Navigation */}
      <MobileBottomNav 
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Floating Animated Move To Top Button */}
      <ScrollToTopButton />

      {/* Interactive Global Modals */}
      <WardrobeBuilderModal products={products} />
      <OlfactiveMatchmakerModal products={products} />
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        products={products} 
      />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <PolicyModal 
        isOpen={!!policyTab || isContactOpen} 
        initialTab={policyTab || (isContactOpen ? 'contact' : 'privacy')} 
        onClose={() => {
          setPolicyTab(null);
          setIsContactOpen(false);
        }} 
      />
    </>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
