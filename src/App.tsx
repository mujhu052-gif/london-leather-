/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/home/HeroSection';
import { ShowcaseCarousel } from './components/home/ShowcaseCarousel';
import { NewCollections } from './components/home/NewCollections';
import { SplitStorySection } from './components/home/SplitStorySection';
import { EditorialCategories } from './components/home/EditorialCategories';
import { BrandStorySection } from './components/home/BrandStorySection';
import { LogoScrollRevealSection } from './components/home/LogoScrollRevealSection';
import { ShopAllGrid } from './components/home/ShopAllGrid';
import { Footer } from './components/home/Footer';

import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailModal } from './components/shop/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { LookbookModal } from './components/home/LookbookModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { storeService } from './services/storeService';
import { Product, StoreSettings, CartItem, ProductCategory, ProductColor } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'admin'>('home');
  const [selectedCategoryForShop, setSelectedCategoryForShop] = useState<ProductCategory>('all');
  
  // Data State
  const [products, setProducts] = useState<Product[]>(storeService.getProducts());
  const [settings, setSettings] = useState<StoreSettings>(storeService.getSettings());
  const [cartItems, setCartItems] = useState<CartItem[]>(storeService.getCart());

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  // Subscribe to central store changes
  useEffect(() => {
    const unsubscribe = storeService.subscribe(() => {
      setProducts(storeService.getProducts());
      setSettings(storeService.getSettings());
      setCartItems(storeService.getCart());
    });
    return () => unsubscribe();
  }, []);

  // Sync route query if URL contains /shop or /admin
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') setCurrentView('admin');
      else if (path === '/shop') setCurrentView('shop');
      else setCurrentView('home');
    };
    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: 'home' | 'shop' | 'admin', category?: string) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategoryForShop(category as ProductCategory);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const newPath = view === 'home' ? '/' : `/${view}`;
      window.history.pushState(null, '', newPath);
    } catch {
      // Fallback in iframe sandbox
    }
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleOpenProductById = (id: string) => {
    const found = storeService.getProductById(id);
    if (found) setSelectedProduct(found);
  };

  const handleAddToCart = (product: Product, size?: string, color?: ProductColor, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0] || { name: 'Standard Finish', hex: '#000000' };
    storeService.addToCart(product, chosenSize, chosenColor, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#111215] text-[#F7F6F3] flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartItems={cartItems}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Main Body Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="space-y-4">
            {/* SECTION 02: Cinematic Hero Experience */}
            <HeroSection
              onExplore={() => handleNavigate('shop')}
              onOpenLookbook={() => setIsLookbookOpen(true)}
              onOpenProduct={handleOpenProductById}
              whatsappNumber={settings.whatsappNumber}
            />

            {/* SECTION 03: Product Showcase Carousel (Alternating White Section) */}
            <ShowcaseCarousel
              products={products.filter((p) => p.isPublished)}
              onOpenProduct={handleOpenProduct}
              onNavigateToShop={() => handleNavigate('shop')}
              onAddToCart={(p) => handleAddToCart(p)}
            />

            {/* SECTION 04: New Collections Spotlight */}
            <NewCollections
              products={products.filter((p) => p.isPublished)}
              onOpenProduct={handleOpenProduct}
              whatsappNumber={settings.whatsappNumber}
            />

            {/* SECTION 05: Premium Split-Screen Storytelling */}
            <SplitStorySection
              onNavigateToCategory={(cat) => handleNavigate('shop', cat)}
              onOpenProduct={handleOpenProductById}
            />

            {/* SECTION 06: Editorial Category Presentation */}
            <EditorialCategories
              products={products.filter((p) => p.isPublished)}
              onOpenProduct={handleOpenProduct}
              onNavigateToCategory={(cat) => handleNavigate('shop', cat)}
            />

            {/* SECTION 07: Brand Story & Circular Leather Philosophy */}
            <BrandStorySection onExplore={() => handleNavigate('shop')} />

            {/* FULL-PAGE ANIMATED ROTATING LOGO SECTION (Requested by user) */}
            <LogoScrollRevealSection
              onScrollToShop={() => {
                document.getElementById('shop-all-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* SECTION 08: Shop All Products Grid */}
            <ShopAllGrid
              products={products.filter((p) => p.isPublished)}
              onOpenProduct={handleOpenProduct}
              onNavigateToShop={(cat) => handleNavigate('shop', cat)}
              onAddToCart={(p) => handleAddToCart(p)}
              whatsappNumber={settings.whatsappNumber}
            />
          </div>
        )}

        {currentView === 'shop' && (
          <ShopPage
            products={products}
            initialCategory={selectedCategoryForShop}
            onOpenProduct={handleOpenProduct}
            onAddToCart={(p) => handleAddToCart(p)}
            onBackToHome={() => handleNavigate('home')}
            whatsappNumber={settings.whatsappNumber}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            products={products}
            settings={settings}
            onBackToHome={() => handleNavigate('home')}
            onRefreshData={() => {
              setProducts(storeService.getProducts());
              setSettings(storeService.getSettings());
            }}
          />
        )}
      </main>

      {/* SECTION 09: Luxury Minimal Footer */}
      <Footer settings={settings} onNavigate={handleNavigate} />

      {/* Interactive Global Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        whatsappNumber={settings.whatsappNumber}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, qty) => storeService.updateCartItemQuantity(id, qty)}
        onRemoveItem={(id) => storeService.removeFromCart(id)}
        onExplore={() => {
          setIsCartOpen(false);
          handleNavigate('shop');
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products.filter((p) => p.isPublished)}
        onSelectProduct={handleOpenProduct}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        onExplore={() => {
          setIsLookbookOpen(false);
          handleNavigate('shop');
        }}
      />
    </div>
  );
}
