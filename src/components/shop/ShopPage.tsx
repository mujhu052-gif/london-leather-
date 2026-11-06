import React, { useState } from 'react';
import { Search, SlidersHorizontal, ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react';
import { Product, ProductCategory } from '../../types';

interface ShopPageProps {
  products: Product[];
  initialCategory?: ProductCategory;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBackToHome: () => void;
  whatsappNumber: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'all',
  onOpenProduct,
  onAddToCart,
  onBackToHome,
  whatsappNumber
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [filterTag, setFilterTag] = useState<'all' | 'new' | 'bestseller'>('all');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Pieces' },
    { id: 'jackets', label: 'Jackets' },
    { id: 'shoes', label: 'Shoes' },
    { id: 'wallets', label: 'Wallets' },
    { id: 'belts', label: 'Belts' },
    { id: 'keychains', label: 'Keychains' },
  ];

  // Filtering & Sorting
  let filtered = products.filter((p) => {
    if (!p.isPublished) return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (filterTag === 'new' && !p.isNewArrival) return false;
    if (filterTag === 'bestseller' && !p.isBestSeller) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    const priceA = a.salePrice ?? a.price;
    const priceB = b.salePrice ?? b.price;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    return a.order - b.order;
  });

  return (
    <div className="min-h-screen bg-[#111215] text-white pt-6 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between py-4 border-b border-white/5 mb-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full neu-dark-button text-xs uppercase tracking-widest text-neutral-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <span className="text-xs uppercase tracking-widest text-white font-mono neu-dark-inset-sm px-3.5 py-1.5 rounded-full">
          Showing {filtered.length} Curated Items
        </span>
      </div>

      {/* Catalog Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex px-3.5 py-1 rounded-full neu-dark-inset-sm text-xs uppercase tracking-[0.3em] text-slate-300 font-semibold mb-1">
          The Full British Leather Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-heading neu-text-deboss">
          Shop STRIDE LONDON
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
          Full-grain leather jackets, benchmade Goodyear footwear, and vegetable-tanned small leather goods. All orders backed by bespoke care and insured courier delivery.
        </p>
      </div>

      {/* Filter and Search Bar Container in Neumorphic Raised Elevation */}
      <div className="neu-dark-raised-lg rounded-3xl p-4 sm:p-6 mb-10 space-y-4">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, leather, feature..."
              className="w-full neu-dark-inset rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="neu-dark-button text-white rounded-xl px-3 py-2 text-xs focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#141518]">Featured Order</option>
              <option value="price-asc" className="bg-[#141518]">Price: Low to High</option>
              <option value="price-desc" className="bg-[#141518]">Price: High to Low</option>
              <option value="newest" className="bg-[#141518]">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Row 2: Categories and Tags in recessed track */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 neu-dark-inset p-1.5 rounded-full">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-[-2px_-2px_6px_rgba(255,255,255,0.7),2px_3px_6px_rgba(0,0,0,0.5)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Filters in Tactile Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setFilterTag(filterTag === 'new' ? 'all' : 'new')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterTag === 'new' ? 'bg-white text-black font-bold shadow-md' : 'neu-dark-button text-neutral-400'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setFilterTag(filterTag === 'bestseller' ? 'all' : 'bestseller')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterTag === 'bestseller' ? 'bg-white text-black font-bold shadow-md' : 'neu-dark-button text-neutral-400'
              }`}
            >
              Bestsellers
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <p className="text-xl font-bold text-white">No products found</p>
          <p className="text-xs text-neutral-400">Try adjusting your search criteria or category filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setFilterTag('all');
            }}
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const hasDiscount = product.salePrice && product.salePrice < product.price;
            const effectivePrice = product.salePrice ?? product.price;

            return (
              <div
                key={product.id}
                onClick={() => onOpenProduct(product)}
                className="group relative rounded-3xl neu-dark-raised hover:shadow-[-6px_-6px_16px_rgba(255,255,255,0.07),8px_10px_24px_rgba(0,0,0,0.85)] p-3.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual inside Inset Neumorphic Frame */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden neu-dark-inset p-1 mb-4">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Badges in tactile pills */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isBestSeller && (
                      <span className="bg-white text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        Bestseller
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="neu-dark-inset-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        New In
                      </span>
                    )}
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="flex-1 bg-white hover:bg-neutral-200 text-black font-semibold text-[11px] py-2 rounded-xl shadow-[-2px_-2px_6px_rgba(255,255,255,0.8),2px_3px_6px_rgba(0,0,0,0.5)] active:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello Stride London! I would like to order: ${product.name} (PKR ${effectivePrice.toLocaleString()}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl neu-dark-button text-white hover:text-[#25D366] transition-colors"
                      title="Buy now via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                      {product.category}
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight line-clamp-1 group-hover:text-slate-200 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 font-light leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-bold text-white font-mono">
                        PKR {effectivePrice.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-neutral-500 line-through font-mono">
                          PKR {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-neutral-400 group-hover:text-white transition-colors">
                      View Piece &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
