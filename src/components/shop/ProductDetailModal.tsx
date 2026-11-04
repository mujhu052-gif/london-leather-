import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Truck, RefreshCw, MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { storeService } from '../../services/storeService';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  whatsappNumber: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  whatsappNumber
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Standard Finish', hex: '#000000' });
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = product.images.length > 0 ? product.images : [product.primaryImage];
  const activeImage = images[activeImageIndex] || product.primaryImage;
  const effectivePrice = product.salePrice ?? product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const whatsAppUrl = storeService.generateWhatsAppOrderUrl(
    product,
    selectedSize,
    selectedColor,
    quantity
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#121212] border border-white/15 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden text-white my-auto max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-white hover:text-black transition-colors text-white cursor-pointer border border-white/10"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Imagery Gallery */}
        <div className="md:w-1/2 p-4 sm:p-8 flex flex-col justify-between bg-[#0A0A0A] border-b md:border-b-0 md:border-r border-white/10">
          {/* Main Large Visual */}
          <div className="relative aspect-4/3 sm:aspect-1/1 rounded-2xl overflow-hidden bg-black/40 mb-4 border border-white/10">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {hasDiscount && (
              <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Special Allocation
              </span>
            )}
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === i ? 'border-white scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumb ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Module (Scrollable if needed) */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.25em] text-white font-semibold">
                {product.category}
              </span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-rose-500 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
                PKR {effectivePrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-sm text-neutral-400 line-through font-mono">
                  PKR {product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Select Size:</span>
                  <span className="text-white font-mono">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-white text-black font-bold shadow-md'
                          : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color / Finish Selector */}
            {product.colors.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Leather Finish:</span>
                  <span className="text-neutral-200 font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                        selectedColor.name === c.name ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor.name === c.name && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs text-neutral-400">Quantity:</span>
              <div className="flex items-center border border-white/15 rounded-lg bg-white/5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-mono font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Craftsmanship Details */}
            {product.craftDetails.length > 0 && (
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                <p className="text-[11px] uppercase tracking-wider text-white font-semibold">
                  Craftsmanship & Specifications:
                </p>
                <ul className="text-xs text-neutral-300 space-y-1 list-disc list-inside font-light">
                  {product.craftDetails.map((detail, idx) => (
                    <li key={idx} className="leading-snug">{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons & Guarantees */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            {/* Primary Buy CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-white hover:bg-white text-black font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToast ? 'Added to Bag!' : 'Add to Bag'}</span>
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                title="Direct WhatsApp Order"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">Order via WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2 text-[10px] text-neutral-400">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-white" />
                <span>Free Insured Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>100% Full-Grain Hide</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5 text-white" />
                <span>Lifetime Restoration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
