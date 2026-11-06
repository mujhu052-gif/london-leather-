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
        className="relative w-full max-w-2xl neu-dark-raised-lg rounded-3xl shadow-[-10px_-10px_30px_rgba(255,255,255,0.03),15px_20px_50px_rgba(0,0,0,0.95)] p-6 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar inside Recessed Neumorphic Well */}
        <div className="relative flex items-center neu-dark-inset rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-slate-300 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jackets, boots, wallets, belts..."
            className="w-full bg-transparent px-3 text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full neu-dark-button text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills in Tactile Buttons */}
        {!query && (
          <div className="py-6 space-y-3">
            <p className="text-xs uppercase tracking-wider text-neutral-400">Popular Searches:</p>
            <div className="flex flex-wrap gap-2">
              {['Mayfair Biker', 'Double-Monk Shoes', 'Chelsea Boots', 'Bridle Belt', 'Bifold Wallet'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full neu-dark-button text-xs text-neutral-300 hover:text-white cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="py-4 max-h-[60vh] overflow-y-auto space-y-2.5">
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
                  className="p-3 rounded-2xl neu-dark-raised-sm hover:shadow-[-3px_-3px_8px_rgba(255,255,255,0.06),4px_6px_14px_rgba(0,0,0,0.8)] transition-all flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden neu-dark-inset p-0.5">
                      <img
                        src={product.primaryImage}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-slate-200 transition-colors">
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
                    <div className="p-2 rounded-full neu-dark-button text-neutral-400 group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
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
