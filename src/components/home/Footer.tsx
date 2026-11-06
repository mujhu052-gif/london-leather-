import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Logo } from '../common/Logo';
import { ArrowUpRight, MessageCircle, Mail, MapPin, Check } from 'lucide-react';
import { StoreSettings } from '../../types';

interface FooterProps {
  settings: StoreSettings;
  onNavigate: (view: 'home' | 'shop' | 'admin', category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative px-2.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-8 sm:pb-14 max-w-[1520px] mx-auto">
      {/* Outer Rounded Container in Neumorphic Dark Raised Elevation */}
      <div className="relative rounded-[1.75rem] sm:rounded-[3.5rem] neu-dark-raised-lg p-4 sm:p-12 lg:p-16 text-white overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Massive Headline Row with Diagonal Accent Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 sm:pb-14 border-b border-white/5"
        >
          <div>
            <span className="inline-flex px-3.5 py-1 rounded-full neu-dark-inset-sm text-[10px] sm:text-xs uppercase tracking-[0.3em] text-slate-300 font-semibold mb-2">
              Stride London Atelier
            </span>
            <h2 className="text-3xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mt-1 sm:mt-2 font-heading leading-tight neu-text-deboss">
              Step Bold. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-slate-400">
                Live Stylish.
              </span>
            </h2>
          </div>

          {/* Accent Diagonal Circular Button in Tactile Convex Bevel */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <button
              onClick={scrollToTop}
              className="group w-16 h-16 sm:w-20 sm:h-20 rounded-full neu-dark-button text-white flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUpRight className="w-8 h-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-slate-200" />
            </button>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
              Back to Top
            </span>
          </div>
        </motion.div>

        {/* Middle Navigation & Contact Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-14 border-b border-white/5"
        >
          {/* Col 1: Brand & Atelier */}
          <div className="lg:col-span-4 space-y-5">
            <Logo size="md" tone="silver" />
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              Makers of bespoke British outerwear, benchmade footwear, and vegetable-tanned accessories. Designed in Mayfair, handcrafted by master artisans.
            </p>
            
            {/* WhatsApp Direct Order Badge in Tactile Inset Track */}
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full neu-dark-button text-[#25D366] hover:text-white text-xs font-semibold transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge: {settings.whatsappNumber}</span>
            </a>
          </div>

          {/* Col 2: Showrooms */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white font-bold">
              Atelier Locations
            </p>
            <div className="space-y-3 text-xs text-neutral-300 font-light">
              <div className="flex items-start gap-2.5 neu-dark-inset-sm p-3 rounded-2xl">
                <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mayfair Showroom</p>
                  <p className="text-neutral-400">{settings.londonShowroom}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 neu-dark-inset-sm p-3 rounded-2xl">
                <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Bespoke Workshop</p>
                  <p className="text-neutral-400">{settings.craftStudio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white font-bold">
              Collections
            </p>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li>
                <button onClick={() => onNavigate('shop', 'jackets')} className="hover:text-white transition-colors cursor-pointer">
                  Leather Jackets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'shoes')} className="hover:text-white transition-colors cursor-pointer">
                  Footwear Lasts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'wallets')} className="hover:text-white transition-colors cursor-pointer">
                  Harness Wallets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'belts')} className="hover:text-white transition-colors cursor-pointer">
                  Bridle Belts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'keychains')} className="hover:text-white transition-colors cursor-pointer">
                  Valet Key Fobs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-slate-300 hover:text-white hover:underline transition-colors cursor-pointer">
                  Admin Dashboard &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter in Recessed Well */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white font-bold">
              Private Release Drops
            </p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Receive private announcements and early allocations to small-batch leather drops.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full neu-dark-inset rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 shadow-[-2px_-2px_4px_rgba(255,255,255,0.7),2px_2px_5px_rgba(0,0,0,0.5)] active:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.3)] transition-all cursor-pointer flex items-center justify-center"
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#25D366] flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome to the Stride London Inner Circle.</span>
                </p>
              )}
            </form>
          </div>
        </motion.div>

        {/* Bottom Copyright & Legal */}
        <div className="relative z-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 STRIDE LONDON. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-neutral-400 cursor-pointer">Care & Restoration</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
