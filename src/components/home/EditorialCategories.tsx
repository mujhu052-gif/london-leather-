import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';

interface EditorialCategoriesProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onNavigateToCategory: (category: string) => void;
}

interface EditorialItem {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  sampleProductId: string;
  image: string;
  price: string;
  badge: string;
}

export const EditorialCategories: React.FC<EditorialCategoriesProps> = ({
  products,
  onOpenProduct,
  onNavigateToCategory
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const editorialItems: EditorialItem[] = [
    {
      number: '01',
      title: 'New Arrivals',
      subtitle: 'Engineered for modern urban commute. Features antique metal hardware, double stitching, and naked calfskin.',
      category: 'jackets',
      sampleProductId: 'prod-1',
      image: '/src/assets/images/leather_biker_jacket_real_1793989042539.jpg',
      price: 'PKR 42,000',
      badge: 'Biker Outerwear'
    },
    {
      number: '02',
      title: 'Best Sellers',
      subtitle: 'Hand-burnished bridle leather and saddle harness accessories that age with rich individual patina.',
      category: 'wallets',
      sampleProductId: 'prod-4',
      image: '/src/assets/images/leather_bifold_wallet_real_1793989044375.jpg',
      price: 'PKR 9,500',
      badge: 'Heritage Carry'
    },
    {
      number: '03',
      title: 'Benchmade Footwear',
      subtitle: 'Goodyear-welted double monk straps and Chelsea boots hand-patinated in Italian crust hides.',
      category: 'shoes',
      sampleProductId: 'prod-2',
      image: '/src/assets/images/leather_monk_strap_shoes_real_1793989042490.jpg',
      price: 'PKR 31,500',
      badge: 'Classic Last'
    },
    {
      number: '04',
      title: 'Bespoke Accessories',
      subtitle: 'English bridle dress belts and solid brass valet key fobs designed to last generations.',
      category: 'belts',
      sampleProductId: 'prod-5',
      image: '/src/assets/images/leather_bridle_belt_real_1793989044358.jpg',
      price: 'PKR 11,900',
      badge: 'Solid Brass Hardwear'
    }
  ];

  const currentItem = editorialItems[activeIndex];
  const matchedProduct = products.find(p => p.id === currentItem.sampleProductId) || products[0];

  return (
    <section className="relative px-2.5 sm:px-6 lg:px-8 py-6 sm:py-16 lg:py-24 max-w-[1520px] mx-auto">
      {/* Light Background Container with Neumorphic Raised Elevation */}
      <div className="relative rounded-[1.75rem] sm:rounded-[3.5rem] neu-light-raised-lg text-[#1e2229] p-4 sm:p-10 lg:p-16 overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
          
          {/* Left Column: Vertical Editorial Category List with Scroll Reveal */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-4 sm:mb-8"
            >
              <span className="inline-flex px-3 py-1 rounded-full neu-light-inset-sm text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#556070] font-semibold mb-2">
                Bespoke Hierarchy
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#161a22] mt-0.5 sm:mt-1 font-heading neu-light-text-deboss">
                Editorial Categories
              </h2>
            </motion.div>

            <div className="space-y-2 sm:space-y-3">
              {editorialItems.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      setActiveIndex(idx);
                      onNavigateToCategory(item.category);
                    }}
                    className={`py-3 sm:py-4 px-3 sm:px-5 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer flex items-start justify-between gap-3 sm:gap-4 group ${
                      isActive 
                        ? 'neu-light-inset' 
                        : 'neu-light-raised-sm hover:shadow-[-4px_-4px_10px_rgba(255,255,255,0.9),4px_6px_14px_rgba(166,178,196,0.4)]'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-mono text-[10px] sm:text-xs text-[#606c80] font-semibold">
                          {item.number}
                        </span>
                        <h3 className={`text-base sm:text-2xl font-bold tracking-tight transition-colors ${
                          isActive ? 'text-[#111317]' : 'text-[#353f4e] group-hover:text-black'
                        }`}>
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[11px] sm:text-sm text-[#505c70] max-w-lg leading-relaxed font-light pl-4 sm:pl-7 line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center self-center shrink-0">
                      <div className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-[#15171c] text-white rotate-0 shadow-[-1px_-1px_4px_rgba(255,255,255,0.08),2px_3px_6px_rgba(0,0,0,0.5)]'
                          : 'neu-light-button text-[#404a58] group-hover:text-black -rotate-45'
                      }`}>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Synced Product Card with Neumorphic Dark Elevation */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-2 sm:pt-0">
            {/* Background Accent Card */}
            <div className="absolute inset-0 bg-[#d9e0ea] rounded-2xl sm:rounded-[2.5rem] rotate-2 transform pointer-events-none shadow-[-5px_-5px_12px_rgba(255,255,255,0.6),6px_8px_16px_rgba(160,170,185,0.35)]" />

            <div
              onClick={() => matchedProduct && onOpenProduct(matchedProduct)}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[460px] aspect-4/3 sm:aspect-3/4 rounded-2xl sm:rounded-[2rem] overflow-hidden neu-dark-raised text-white cursor-pointer group p-2"
            >
              <div className="relative w-full h-full rounded-xl sm:rounded-[1.75rem] overflow-hidden neu-dark-inset">
                <img
                  key={currentItem.image}
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108 animate-in fade-in"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 neu-dark-inset-sm px-3.5 py-1.5 rounded-full text-xs font-semibold text-white tracking-wider">
                  {currentItem.badge}
                </div>

                {/* Bottom Card Info & Price */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-300">Featured in {currentItem.title}</span>
                    <p className="text-xl font-bold text-white mt-0.5 neu-text-deboss">{matchedProduct?.name}</p>
                    <p className="text-sm font-mono text-slate-200 font-semibold mt-1">{currentItem.price}</p>
                  </div>

                  <div className="p-3 rounded-full neu-dark-button text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
