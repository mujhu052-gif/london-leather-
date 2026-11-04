import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { TypewriterText } from '../common/TypewriterText';

interface NewCollectionsProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  whatsappNumber: string;
}

type CollectionFilter = 'new' | 'classic' | 'bestseller' | 'modern';

export const NewCollections: React.FC<NewCollectionsProps> = ({
  products,
  onOpenProduct,
  whatsappNumber
}) => {
  const [activeCategory, setActiveCategory] = useState<CollectionFilter>('classic');
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const filterTabs: { id: CollectionFilter; label: string }[] = [
    { id: 'new', label: 'New Arrivals' },
    { id: 'classic', label: 'Classic' },
    { id: 'bestseller', label: 'Best Sellers' },
    { id: 'modern', label: 'Modern' }
  ];

  // Filter products by collection tag or category
  const filteredProducts = products.filter(p => {
    if (activeCategory === 'new') return p.isNewArrival || p.collectionTag === 'new';
    if (activeCategory === 'bestseller') return p.isBestSeller || p.collectionTag === 'bestseller';
    if (activeCategory === 'classic') return p.collectionTag === 'classic' || p.category === 'shoes' || p.category === 'jackets';
    if (activeCategory === 'modern') return p.collectionTag === 'modern' || p.category === 'wallets' || p.category === 'keychains';
    return true;
  });

  const currentProduct = filteredProducts[activeProductIndex % (filteredProducts.length || 1)] || products[0];

  const handlePrev = () => {
    setActiveProductIndex(prev => (prev === 0 ? filteredProducts.length - 1 : prev - 1));
    setActiveHotspot(null);
  };

  const handleNext = () => {
    setActiveProductIndex(prev => (prev + 1) % (filteredProducts.length || 1));
    setActiveHotspot(null);
  };

  return (
    <section className="relative px-2.5 sm:px-6 lg:px-8 py-6 sm:py-16 lg:py-24 max-w-[1520px] mx-auto">
      {/* Off-White / Pure White Architectural Card (Matching Video Frame 0:04 - 0:06) */}
      <div className="relative rounded-[1.75rem] sm:rounded-[3.5rem] bg-[#F7F6F3] text-[#0B0B0B] p-4 sm:p-10 lg:p-14 shadow-2xl border border-black/5 overflow-hidden">
        
        {/* Top Header: Title & Filter Tabs (Video Frame 0:04) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-500 font-semibold mb-0.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Spotlight</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B0B0B] font-heading">
              New Collections
            </h2>
          </div>

          {/* Interactive Filter Pills (Compact on mobile) */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-[#EAE7E1] rounded-full self-start md:self-auto overflow-x-auto max-w-full">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setActiveProductIndex(0);
                    setActiveHotspot(null);
                  }}
                  className={`px-3 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0B0B0B] text-white shadow-md'
                      : 'text-neutral-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Center Presentation: Product resting on Tilted Backdrop with Hotspots */}
        {currentProduct && (
          <div className="relative flex flex-col items-center justify-center py-2 sm:py-6">
            {/* Subtle Tilted Blush Accent Card Backdrop */}
            <div className="absolute w-[94%] sm:w-[680px] h-[260px] sm:h-[420px] bg-[#E9D1D2] rounded-2xl sm:rounded-[2.5rem] -rotate-3 transform transition-transform duration-700 pointer-events-none opacity-85 shadow-lg" />

            {/* Main Product Showcase Card */}
            <div className="relative z-10 w-full max-w-[720px] bg-[#141414] text-white rounded-2xl sm:rounded-[2rem] p-3.5 sm:p-8 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-4 sm:gap-8">
              {/* Product Visual with Hotspots */}
              <div className="relative w-full md:w-1/2 aspect-4/3 sm:aspect-1/1 rounded-xl sm:rounded-2xl overflow-hidden bg-black/50 shrink-0">
                <img
                  src={currentProduct.primaryImage}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />

                {/* Craftsmanship Hotspots */}
                {currentProduct.hotspots?.map((hotspot, idx) => (
                  <div
                    key={idx}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                      className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-black font-mono text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-lg hover:scale-125 transition-transform cursor-pointer"
                      title={hotspot.title}
                    >
                      <span className="w-2 h-2 rounded-full bg-slate-300 animate-ping absolute inset-1.5" />
                      +
                    </button>

                    {/* Popover Card */}
                    {(activeHotspot === idx || false) && (
                      <div className="absolute left-7 top-1/2 -translate-y-1/2 w-44 sm:w-48 p-2.5 sm:p-3 rounded-xl bg-black/95 text-white text-[10px] sm:text-[11px] backdrop-blur-md border border-white/30 shadow-2xl z-30 animate-in fade-in zoom-in-95">
                        <p className="font-semibold text-slate-200">{hotspot.title}</p>
                        <p className="text-neutral-300 mt-1 leading-snug">{hotspot.description}</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-black/70 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-[10px] text-neutral-300 uppercase tracking-widest">
                  Tap hotspots to inspect
                </div>
              </div>

              {/* Product Info & Actions */}
              <div className="flex flex-col justify-between space-y-3 sm:space-y-4 w-full">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    {currentProduct.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5 sm:mt-1">
                    {currentProduct.name}
                  </h3>
                  <div className="min-h-[2.5em]">
                    <TypewriterText
                      key={currentProduct.id}
                      text={currentProduct.description}
                      delay={250}
                      speed={15}
                      as="p"
                      className="text-xs sm:text-sm text-neutral-400 mt-1.5 line-clamp-3 leading-relaxed font-light"
                    />
                  </div>
                </div>

                {/* Price & Specs */}
                <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-baseline gap-2.5 sm:gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                      PKR {(currentProduct.salePrice ?? currentProduct.price).toLocaleString()}
                    </span>
                    {currentProduct.salePrice && (
                      <span className="text-xs sm:text-sm text-neutral-400 line-through font-mono">
                        PKR {currentProduct.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-[9px] sm:text-[10px] text-neutral-300">
                    <span className="bg-white/10 px-2 py-0.5 rounded">Goodyear / Waxed</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded">British Design</span>
                    <span className="bg-white/20 text-white px-2 py-0.5 rounded">Insured Courier</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenProduct(currentProduct)}
                    className="flex-1 py-3 px-5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>

                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello Stride London! I would like to inquire about the ${currentProduct.name} (PKR ${(currentProduct.salePrice ?? currentProduct.price).toLocaleString()}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-white/20 hover:border-[#25D366] text-white hover:text-[#25D366] transition-colors"
                    title="Inquire via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Left and Right Nav Buttons (Video Frame 0:05) */}
            <div className="flex items-center justify-between w-full max-w-[820px] mt-6 px-4">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-black/10 shadow-md hover:bg-black hover:text-white transition-colors cursor-pointer"
                aria-label="Previous collection piece"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {filteredProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveProductIndex(i);
                      setActiveHotspot(null);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeProductIndex === i ? 'w-6 bg-[#0B0B0B]' : 'w-2 bg-neutral-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-black/10 shadow-md hover:bg-black hover:text-white transition-colors cursor-pointer"
                aria-label="Next collection piece"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
