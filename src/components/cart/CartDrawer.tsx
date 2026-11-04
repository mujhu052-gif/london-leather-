import React from 'react';
import { X, Trash2, MessageCircle, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../../types';
import { storeService } from '../../services/storeService';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onExplore
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const whatsAppCheckoutUrl = storeService.generateCartWhatsAppOrderUrl(cartItems);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#121212] border-l border-white/10 h-full flex flex-col justify-between text-white shadow-2xl p-6 sm:p-8 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-white">
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 divide-y divide-white/5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div>
                <p className="text-base font-semibold text-white">Your bag is empty</p>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                  Discover our handcrafted leather jackets, shoes, and luxury accessories.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const effectivePrice = item.product.salePrice ?? item.product.price;
              return (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{item.product.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                      <span>Size: {item.selectedSize}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>

                    <p className="text-xs font-mono font-bold text-white mt-1">
                      PKR {(effectivePrice * item.quantity).toLocaleString()}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-white/10 rounded-md bg-white/5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-[11px] font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Subtotal & WhatsApp Checkout */}
        {cartItems.length > 0 && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Courier & Insurance:</span>
                <span className="text-[#25D366] font-semibold">Complimentary</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold text-white">
                <span>Estimated Total:</span>
                <span className="text-xl font-mono text-white">
                  PKR {subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Checkout Button */}
            <a
              href={whatsAppCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Confirm Order on WhatsApp</span>
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>Direct personal confirmation with our Mayfair & Lahore concierge.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
