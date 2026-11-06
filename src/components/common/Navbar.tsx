import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Search, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { CartItem } from '../../types';

interface NavbarProps {
  currentView: 'home' | 'shop' | 'admin';
  onNavigate: (view: 'home' | 'shop' | 'admin', category?: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartItems: CartItem[];
  whatsappNumber: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenCart,
  cartItems,
  whatsappNumber
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Home', action: () => onNavigate('home') },
    { label: 'Shop All', action: () => onNavigate('shop', 'all') },
    { label: 'Jackets', action: () => onNavigate('shop', 'jackets') },
    { label: 'Footwear', action: () => onNavigate('shop', 'shoes') },
    { label: 'Wallets', action: () => onNavigate('shop', 'wallets') },
    { label: 'Accessories', action: () => onNavigate('shop', 'accessories') },
    { label: 'Story', action: () => {
      if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById('brand-story')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        document.getElementById('brand-story')?.scrollIntoView({ behavior: 'smooth' });
      }
    }},
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#131417]/95 backdrop-blur-md border-b border-white/5 shadow-[-2px_-2px_10px_rgba(255,255,255,0.03),4px_6px_20px_rgba(0,0,0,0.9)] py-2.5 sm:py-3.5'
          : 'bg-[#111215]/85 backdrop-blur-sm border-b border-white/5 py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-6">
        {/* Brand Logo with subtle neumorphic plate */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer text-left focus-visible:outline-none p-1.5 rounded-xl hover:bg-white/[0.03] transition-all"
        >
          <Logo size="sm" tone="silver" />
        </button>

        {/* Desktop Navigation Links with Neumorphic hover */}
        <nav className="hidden lg:flex items-center gap-2 p-1.5 rounded-full neu-dark-inset-sm">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                link.action();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-1.5 text-xs uppercase tracking-[0.22em] font-medium text-neutral-300 hover:text-white rounded-full transition-all hover:bg-white/5 active:neu-dark-inset-sm cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Icons with Neumorphic tactile buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-neutral-200">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full neu-dark-button flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Search leather catalog"
            title="Search products"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="w-9 h-9 rounded-full neu-dark-button flex items-center justify-center text-neutral-300 hover:text-white relative cursor-pointer"
            aria-label={`Shopping bag with ${totalCartCount} items`}
            title="View shopping bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-[#0B0B0B] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard Entry */}
          <button
            onClick={() => onNavigate('admin')}
            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
              currentView === 'admin'
                ? 'neu-dark-inset text-white'
                : 'neu-dark-button text-neutral-400 hover:text-white'
            }`}
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full neu-dark-button flex items-center justify-center text-neutral-200 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden neu-dark-flat border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs uppercase tracking-widest text-neutral-300 hover:text-white py-2.5 border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs uppercase tracking-widest text-slate-300 py-2.5 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Management</span>
            </button>
          </div>
          <div className="pt-2 text-xs text-neutral-400">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">WhatsApp Concierge:</p>
            <p className="text-white font-mono mt-0.5">{whatsappNumber}</p>
          </div>
        </div>
      )}
    </header>
  );
};
