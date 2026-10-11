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

  // Active section state for mobile/tablet to ensure single-section visibility
  const [mobileActiveSection, setMobileActiveSection] = useState<string>('hero');

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
      window.scrollTo(0, 0);
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Reset scroll immediately when navigating between routes
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [currentRoute.type]);

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
    
    // Update active section for mobile/tablet single-section view
    setMobileActiveSection(sectionId);

    window.scrollTo(0, 0);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(el, { duration: 0.75, offset: -80 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Fallback: scroll to top if section not found (e.g. mobile virtual sections)
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {/* Upper Sheet */}
          <div className="relative z-10 bg-[oklch(0.98_0.005_78.3)] mb-0 xl:mb-[380px] shadow-[0_25px_50px_-12px_oklch(0_0_0/0.12)] border-b border-[oklch(0.926_0.01_81.8)]">
            <div className="hidden xl:block">
              <Navbar 
                onOpenSearch={() => setIsSearchOpen(true)}
                onNavigateSection={handleNavigateSection}
              />
            </div>

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

          {/* Statically Anchored Brand Name at Bottom (Desktop Only) */}
          <div className="hidden xl:block">
            <ParallaxFooterReveal />
          </div>
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
          {/* Upper Sheet: All page content */}
          <div className="relative z-10 bg-[oklch(0.98_0.005_78.3)] mb-0 xl:mb-[380px] shadow-[0_25px_50px_-12px_oklch(0_0_0/0.12)] border-b border-[oklch(0.926_0.01_81.8)]">
            {/* Desktop Top Navbar: Strictly hidden on mobile, tablet, and foldable screens */}
            <div className="hidden xl:block">
              <Navbar 
                onOpenSearch={() => setIsSearchOpen(true)}
                onNavigateSection={handleNavigateSection}
              />
            </div>

            {/* Desktop View (xl and up, >= 1280px): all sections visible with standard scrolling */}
            <main className="hidden xl:block flex-1">
              <Hero 
                products={products}
                onExploreCatalog={() => handleNavigateSection('catalog')} 
                onNavigateSection={handleNavigateSection}
                onSelectProduct={(p) => navigateToProduct(p.sku)}
              />
              <Tier1Showcase products={products} />
              <ProductGrid products={products} />
              <CannibalizationShowcase products={products} />
              <TestimonialsSection />
              <SpotlightsSection />
              <NewsletterClub />
              <Footer 
                onNavigateSection={handleNavigateSection} 
                onReplayIntro={handleReplayIntro}
                onOpenPolicy={(tab) => setPolicyTab(tab)}
              />
            </main>

            {/* Mobile, Tablet, and Foldable View (< 1280px):
                Exclusively ONE section visible at a time. No endless scrolling.
                Right-hand floating navbar safe right-padding (min-[600px]:pr-16 lg:pr-20)
                Bottom mobile navbar safe bottom-padding (pb-20 min-[600px]:pb-8) */}
            <main className="block xl:hidden flex-1 pb-20 min-[600px]:pb-8 min-[600px]:pr-16 lg:pr-20">
              {mobileActiveSection === 'hero' && (
                <Hero 
                  products={products}
                  onExploreCatalog={() => handleNavigateSection('catalog')} 
                  onNavigateSection={handleNavigateSection}
                  onSelectProduct={(p) => navigateToProduct(p.sku)}
                />
              )}

              {mobileActiveSection === 'tier1' && (
                <Tier1Showcase products={products} />
              )}

              {mobileActiveSection === 'catalog' && (
                <ProductGrid products={products} />
              )}

              {mobileActiveSection === 'cannibalization' && (
                <CannibalizationShowcase products={products} />
              )}

              {mobileActiveSection === 'editorial' && (
                <>
                  <SpotlightsSection />
                  <NewsletterClub />
                </>
              )}

              {/* Universal Collapsible Accordion Footer for all mobile/tablet sections */}
              <Footer 
                onNavigateSection={handleNavigateSection} 
                onReplayIntro={handleReplayIntro}
                onOpenPolicy={(tab) => setPolicyTab(tab)}
              />
            </main>
          </div>

          {/* Statically Anchored Brand Name at Bottom (Desktop Only to prevent mobile empty gaps) */}
          <div className="hidden xl:block">
            <ParallaxFooterReveal />
          </div>
        </div>
      )}

      {/* Global Bottom Navigation (Mobile < 600px) & Right-hand Floating Navigation (Tablets/Foldables >= 600px to < 1280px) */}
      <MobileBottomNav 
        activeSection={mobileActiveSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={handleNavigateSection}
        isProductPage={currentRoute.type === 'product'}
        product={currentRoute.type === 'product' ? currentRoute.product : null}
        onBackToCatalog={() => {
          navigateToHome();
          setMobileActiveSection('catalog');
        }}
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
