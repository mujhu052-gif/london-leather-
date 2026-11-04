import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-[#141414] border border-white/15 rounded-3xl shadow-2xl p-6 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-white/15 pb-4">
          <Search className="w-5 h-5 text-white shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jackets, boots, wallets, belts..."
            className="w-full bg-transparent px-4 text-base sm:text-lg text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="py-6 space-y-3">
            <p className="text-xs uppercase tracking-wider text-neutral-400">Popular Searches:</p>
            <div className="flex flex-wrap gap-2">
              {['Mayfair Biker', 'Double-Monk Shoes', 'Chelsea Boots', 'Bridle Belt', 'Bifold Wallet'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 text-xs text-neutral-300 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="py-4 max-h-[60vh] overflow-y-auto space-y-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-neutral-400 py-6 text-center">
                No leather creations matching "{query}".
              </p>
            ) : (
              filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3 rounded-2xl hover:bg-white/5 transition-all flex items-center justify-between gap-4 cursor-pointer group border border-transparent hover:border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-black"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-neutral-400 uppercase tracking-widest">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white">
                      PKR {(product.salePrice ?? product.price).toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
