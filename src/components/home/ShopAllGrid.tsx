import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Product, ProductCategory } from '../../types';
import { TypewriterText } from '../common/TypewriterText';

interface ShopAllGridProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onNavigateToShop: (category?: string) => void;
  onAddToCart: (product: Product) => void;
  whatsappNumber: string;
}

export const ShopAllGrid: React.FC<ShopAllGridProps> = ({
  products,
  onOpenProduct,
  onNavigateToShop,
  onAddToCart,
  whatsappNumber
}) => {
  const [selectedCat, setSelectedCat] = useState<ProductCategory>('all');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Pieces' },
    { id: 'jackets', label: 'Jackets' },
    { id: 'shoes', label: 'Footwear' },
    { id: 'wallets', label: 'Wallets' },
    { id: 'belts', label: 'Belts' },
    { id: 'keychains', label: 'Keychains' }
  ];

  const displayedProducts = products
    .filter(p => selectedCat === 'all' || p.category === selectedCat)
    .slice(0, 8);

  return (
    <section id="shop-all-products" className="relative px-2.5 sm:px-6 lg:px-8 py-6 sm:py-16 lg:py-24 max-w-[1520px] mx-auto">
      {/* Dark Charcoal Container */}
      <div className="relative rounded-[1.75rem] sm:rounded-[3.5rem] bg-[#111111] border border-white/10 p-4 sm:p-10 lg:p-16 shadow-2xl text-white">
        
        {/* Header & Filter Controls with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12"
        >
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-slate-400 font-semibold">
              The Complete Archive
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-0.5 sm:mt-1 font-heading">
              Shop All Products
            </h2>
            <div className="min-h-[1.5em]">
              <TypewriterText
                text="Crafted in limited runs. Hand-inspected with individual artisan bench marks."
                delay={300}
                speed={18}
                as="p"
                className="text-xs sm:text-sm text-neutral-400 mt-1 font-light"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white/5 rounded-full overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-black shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Product Grid: 2 Columns on Mobile for Compact Luxury Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayedProducts.map((product, idx) => {
            const hasDiscount = product.salePrice && product.salePrice < product.price;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onOpenProduct(product)}
                className="group relative rounded-2xl sm:rounded-3xl bg-[#161616] border border-white/10 hover:border-white/40 p-2.5 sm:p-4 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
              >
                {/* Visual */}
                <div className="relative aspect-1/1 rounded-xl sm:rounded-2xl overflow-hidden bg-black/40 mb-2.5 sm:mb-4">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
                    {product.isBestSeller && (
                      <span className="bg-white text-black text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Bestseller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="bg-slate-200 text-black text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        New In
                      </span>
                    )}
                  </div>

                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="flex-1 bg-white hover:bg-neutral-200 text-black font-semibold text-[10px] sm:text-[11px] py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="hidden sm:inline">Add to Bag</span>
                    </button>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello Stride London! I would like to order: ${product.name} (PKR ${(product.salePrice ?? product.price).toLocaleString()}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-black/70 hover:bg-[#25D366] text-white hover:text-black transition-colors"
                      title="Buy now via WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1 sm:space-y-2">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                      {product.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight line-clamp-1 group-hover:text-slate-200 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-white/10">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white font-mono">
                        PKR {(product.salePrice ?? product.price).toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-[9px] sm:text-xs text-neutral-500 line-through font-mono hidden sm:inline">
                          PKR {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] sm:text-[11px] text-neutral-400 group-hover:text-white transition-colors">
                      View &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom View All Link */}
        <div className="mt-12 text-center pt-8 border-t border-white/10">
          <button
            onClick={() => onNavigateToShop(selectedCat === 'all' ? undefined : selectedCat)}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white hover:text-black text-white font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer"
          >
            <span>View All in Full Catalog</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
