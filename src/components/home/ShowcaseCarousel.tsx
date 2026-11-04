import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Heart, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { TypewriterText } from '../common/TypewriterText';

interface ShowcaseCarouselProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onNavigateToShop: () => void;
  onAddToCart: (product: Product) => void;
}

export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({
  products,
  onOpenProduct,
  onNavigateToShop,
  onAddToCart
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeDot, setActiveDot] = useState(0);

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const progress = scrollLeft / (scrollWidth - clientWidth || 1);
    const dotIndex = Math.min(3, Math.floor(progress * 4));
    setActiveDot(dotIndex);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = window.innerWidth < 640 ? 240 : 320;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section id="showcase-carousel" className="relative px-2.5 sm:px-6 lg:px-8 py-6 sm:py-16 lg:py-24 max-w-[1520px] mx-auto">
      {/* Editorial White Background Container (Alternating Theme Matching Video Frames 1-2) */}
      <div className="relative rounded-[1.75rem] sm:rounded-[3.5rem] bg-[#FFFFFF] text-[#0B0B0B] p-4 sm:p-10 lg:p-14 shadow-2xl overflow-hidden">
        {/* Subtle Luxury Pattern Watermark */}
        <div className="absolute right-0 top-0 w-96 h-96 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-black" fill="currentColor">
            <path d="M100 20 C140 20 180 60 180 100 C180 140 140 180 100 180 C60 180 20 140 20 100 C20 60 60 20 100 20 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Section Header: "See What's New" / "DISCOVER OUR COLLECTION" + "Shop all" */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
              Curated Masterpieces
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0B0B0B] mt-0.5 sm:mt-1 font-heading">
              Discover Our Collection
            </h2>
            <div className="min-h-[1.5em]">
              <TypewriterText
                text="Full-grain leather outerwear, handcrafted monk shoes & accessories"
                delay={300}
                speed={20}
                as="p"
                className="text-xs sm:text-sm text-neutral-500 mt-1 font-light"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToShop}
              className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#0B0B0B] hover:text-neutral-600 font-semibold transition-colors cursor-pointer"
            >
              <span>Shop All</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Container (Compact on mobile) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative z-10 flex gap-3.5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-3 pt-1"
        >
          {products.slice(0, 7).map((product, idx) => {
            const hasDiscount = product.salePrice && product.salePrice < product.price;
            const discountPercent = hasDiscount
              ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
              : 0;

            const isLiked = wishlist.includes(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onOpenProduct(product)}
                className="group relative flex-none w-[220px] sm:w-[320px] rounded-2xl sm:rounded-3xl bg-[#141414] text-white p-3 sm:p-4 snap-start border border-black/5 hover:border-white/30 transition-all duration-300 shadow-xl cursor-pointer flex flex-col justify-between"
              >
                {/* Top Card Controls: Badges & Wishlist */}
                <div className="relative aspect-4/3 sm:aspect-1/1 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A0A0A] mb-3 sm:mb-4">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Percentage Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5">
                    {hasDiscount ? (
                      <span className="bg-white/90 backdrop-blur-md text-[#0B0B0B] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider shadow-md">
                        -{discountPercent}%
                      </span>
                    ) : (
                      <span className="bg-white text-black text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider shadow-md">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleWishlist(e, product.id)}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-rose-400 hover:scale-110 transition-all cursor-pointer"
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="flex-1 bg-white hover:bg-neutral-200 text-black font-semibold text-[10px] sm:text-[11px] py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-1 shadow-md cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 justify-between space-y-1.5 sm:space-y-2">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                      {product.category}
                    </span>
                    <h3 className="text-xs sm:text-base font-semibold text-white tracking-tight line-clamp-1 group-hover:text-slate-300 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-base font-bold text-white font-mono">
                        PKR {(product.salePrice ?? product.price).toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-[10px] sm:text-xs text-neutral-400 line-through font-mono">
                          PKR {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <span className="text-[9px] sm:text-[10px] text-neutral-400 group-hover:text-white transition-colors">
                      Details &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Pagination Dots & Circular Arrow Controls (Video Frame 0:02) */}
        <div className="relative z-10 flex items-center justify-between mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-black/5">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((dot) => (
              <span
                key={dot}
                className={`transition-all duration-300 rounded-full ${
                  activeDot === dot
                    ? 'w-6 h-2 bg-[#0B0B0B]'
                    : 'w-2 h-2 bg-neutral-300'
                }`}
              />
            ))}
          </div>

          {/* Left / Right Circular Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-black/15 text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white transition-colors cursor-pointer"
              aria-label="Previous products"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-black/15 text-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white transition-colors cursor-pointer"
              aria-label="Next products"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
