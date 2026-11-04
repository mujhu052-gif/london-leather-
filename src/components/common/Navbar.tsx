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
          ? 'bg-[#0B0B0B]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-2.5 sm:py-3.5'
          : 'bg-[#0B0B0B]/75 backdrop-blur-sm border-b border-white/5 py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer text-left focus-visible:outline-none"
        >
          <Logo size="sm" tone="silver" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.22em] font-medium text-neutral-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                link.action();
                setMobileMenuOpen(false);
              }}
              className="hover:text-white transition-colors relative py-1 focus-visible:outline-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4 text-neutral-200">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Search leather catalog"
            title="Search products"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={onOpenCart}
            className="p-2.5 rounded-full hover:text-white hover:bg-white/10 transition-colors relative cursor-pointer"
            aria-label={`Shopping bag with ${totalCartCount} items`}
            title="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute top-0 right-0 bg-white text-[#0B0B0B] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard Entry */}
          <button
            onClick={() => onNavigate('admin')}
            className={`p-2.5 rounded-full hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${
              currentView === 'admin' ? 'text-white bg-white/15' : 'text-neutral-400'
            }`}
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121212] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
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
