import React, { useState } from 'react';
import { 
  ShieldCheck, Plus, Edit2, Trash2, ArrowLeft, Save, 
  RefreshCcw, Eye, Phone, Settings, Package, Sparkles, Check, X, Image as ImageIcon
} from 'lucide-react';
import { Product, StoreSettings } from '../../types';
import { storeService } from '../../services/storeService';

interface AdminDashboardProps {
  products: Product[];
  settings: StoreSettings;
  onBackToHome: () => void;
  onRefreshData: () => void;
}

const CURATED_IMAGE_PRESETS = [
  { label: 'Sitting Model on Wall', url: '/src/assets/images/hero_model_sitting_wall_1793810739363.jpg' },
  { label: 'Mayfair Biker Jacket', url: '/src/assets/images/product_leather_jacket_biker_1793808348824.jpg' },
  { label: 'Editorial Model Standing', url: '/src/assets/images/hero_leather_model_1793808348992.jpg' },
  { label: 'Cognac Double-Monk Shoes', url: '/src/assets/images/product_leather_monk_shoes_1793808349740.jpg' },
  { label: 'Italian Chelsea Boots', url: '/src/assets/images/product_leather_chelsea_boots_1793808372633.jpg' },
  { label: 'Whiskey Bifold Wallet', url: '/src/assets/images/product_leather_bifold_wallet_1793808351137.jpg' },
  { label: 'Bridle Leather Belt', url: '/src/assets/images/product_leather_belt_1793808371481.jpg' },
  { label: 'Heritage Valet Key Fob', url: '/src/assets/images/product_leather_keychain_1793808372383.jpg' },
  { label: 'Tannery Artisan Workshop', url: '/src/assets/images/craft_leather_tannery_macro_1793808351301.jpg' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  settings,
  onBackToHome,
  onRefreshData
}) => {
  // Simple auth gate with demo credentials
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Tabs: 'products' | 'settings'
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');

  // Edit / Add modal state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>({ ...settings });
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'stride2026' || passwordInput === 'admin' || passwordInput === 'stride') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials.');
    }
  };

  const openAddProductModal = () => {
    setIsNewProduct(true);
    setEditingProduct({
      name: '',
      slug: '',
      category: 'jackets',
      price: 35000,
      salePrice: 29000,
      description: 'Handcrafted luxury leather outerwear made with full-grain calfskin.',
      craftDetails: ['100% Full-grain calfskin', 'Goodyear welted or lock-stitched', 'Antique brass hardware'],
      images: ['/src/assets/images/product_leather_jacket_biker_1793808348824.jpg'],
      primaryImage: '/src/assets/images/product_leather_jacket_biker_1793808348824.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Midnight Black', hex: '#0B0B0B' }],
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: false,
      isPublished: true,
      order: products.length + 1,
      stock: 10,
      collectionTag: 'new'
    });
  };

  const openEditProductModal = (product: Product) => {
    setIsNewProduct(false);
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    if (isNewProduct) {
      storeService.addProduct(editingProduct as any);
    } else if (editingProduct.id) {
      storeService.updateProduct(editingProduct.id, editingProduct);
    }

    setEditingProduct(null);
    onRefreshData();
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      storeService.deleteProduct(id);
      onRefreshData();
    }
  };

  const handleTogglePublished = (product: Product) => {
    storeService.updateProduct(product.id, { isPublished: !product.isPublished });
    onRefreshData();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    storeService.updateSettings(settingsForm);
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 3000);
    onRefreshData();
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog to factory STRIDE LONDON products?')) {
      storeService.resetProductsToDefault();
      onRefreshData();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#141414] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center text-white mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-heading">STRIDE LONDON Admin</h1>
            <p className="text-xs text-neutral-400">Authorized personnel authentication portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                Passphrase
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (e.g. stride2026)"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
              />
            </div>

            {authError && <p className="text-xs text-rose-400">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
            >
              Authenticate & Access
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setPasswordInput('stride2026');
                setIsAuthenticated(true);
              }}
              className="text-[11px] text-white underline cursor-pointer"
            >
              Auto-login with Demo Admin Credentials
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-6 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Return to website"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-heading text-white">STRIDE LONDON Admin</h1>
              <span className="bg-[#25D366]/20 text-[#25D366] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Active Session
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Live Product Catalog & WhatsApp Concierge Settings
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetCatalog}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset catalog"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset Factory</span>
          </button>

          <button
            onClick={openAddProductModal}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Leather Piece</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'products'
              ? 'bg-white text-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Management ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-white text-black'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Store & WhatsApp Config</span>
        </button>
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div className="bg-[#141414] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1A1A1A] border-b border-white/10 uppercase tracking-widest text-white">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price (PKR)</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6">Tags & Badges</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={p.primaryImage}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover bg-black shrink-0 border border-white/10"
                      />
                      <div>
                        <p className="font-semibold text-white">{p.name}</p>
                        <p className="text-[11px] text-neutral-400 line-clamp-1">{p.description}</p>
                      </div>
                    </td>

                    <td className="py-4 px-6 uppercase tracking-wider text-neutral-300 font-medium">
                      {p.category}
                    </td>

                    <td className="py-4 px-6 font-mono font-bold text-white">
                      <div>
                        PKR {(p.salePrice ?? p.price).toLocaleString()}
                        {p.salePrice && (
                          <span className="block text-[10px] text-neutral-400 line-through">
                            PKR {p.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 font-mono text-neutral-300">
                      {p.stock} units
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {p.isFeatured && (
                          <span className="bg-white/20 text-white text-[9px] px-2 py-0.5 rounded font-bold">
                            FEATURED
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="bg-blue-500/20 text-blue-400 text-[9px] px-2 py-0.5 rounded font-bold">
                            NEW
                          </span>
                        )}
                        {p.isBestSeller && (
                          <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded font-bold">
                            BESTSELLER
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleTogglePublished(p)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider cursor-pointer transition-colors ${
                          p.isPublished
                            ? 'bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30'
                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                        }`}
                      >
                        {p.isPublished ? 'PUBLISHED' : 'DRAFT'}
                      </button>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditProductModal(p)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Piece"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                          title="Delete Piece"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Settings Management */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-heading text-white">Store & WhatsApp Ordering Setup</h2>
            <p className="text-xs text-neutral-400">
              Configure the central WhatsApp phone number for instant Buy Now checkout links and store announcements.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white font-semibold mb-2">
                WhatsApp Ordering Number (Central)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#25D366] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  placeholder="+923001234567"
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1.5">
                Default: <span className="font-mono text-neutral-200">+923001234567</span>. All customer "Buy Now" clicks automatically formulate direct orders to this number.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Brand Name
              </label>
              <input
                type="text"
                value={settingsForm.brandName}
                onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={settingsForm.tagline}
                onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                Top Announcement Banner
              </label>
              <input
                type="text"
                value={settingsForm.announcement}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  London Showroom Address
                </label>
                <input
                  type="text"
                  value={settingsForm.londonShowroom}
                  onChange={(e) => setSettingsForm({ ...settingsForm, londonShowroom: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Bespoke Workshop Address
                </label>
                <input
                  type="text"
                  value={settingsForm.craftStudio}
                  onChange={(e) => setSettingsForm({ ...settingsForm, craftStudio: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>
            </div>

            {savedSettingsNotice && (
              <div className="p-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Store configuration saved successfully!</span>
              </div>
            )}

            <button
              type="submit"
              className="py-3 px-8 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </form>
        </div>
      )}

      {/* Edit / Add Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div
            className="w-full max-w-3xl bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-auto max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold font-heading">
                {isNewProduct ? 'Add New Leather Piece' : `Edit: ${editingProduct.name}`}
              </h2>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-neutral-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 mb-1">Category</label>
                  <select
                    value={editingProduct.category || 'jackets'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white"
                  >
                    <option value="jackets" className="bg-[#141414]">Jackets</option>
                    <option value="shoes" className="bg-[#141414]">Shoes</option>
                    <option value="wallets" className="bg-[#141414]">Wallets</option>
                    <option value="belts" className="bg-[#141414]">Belts</option>
                    <option value="keychains" className="bg-[#141414]">Keychains</option>
                    <option value="accessories" className="bg-[#141414]">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-neutral-400 mb-1">Regular Price (PKR)</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-neutral-400 mb-1">Sale Price (PKR, optional)</label>
                  <input
                    type="number"
                    value={editingProduct.salePrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, salePrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-1">Description</label>
                <textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white"
                />
              </div>

              {/* Curated Luxury Preset Image Picker */}
              <div className="space-y-2">
                <label className="block text-xs uppercase text-white font-semibold">
                  Select or Paste Product Image
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {CURATED_IMAGE_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.url}
                      onClick={() =>
                        setEditingProduct({
                          ...editingProduct,
                          primaryImage: preset.url,
                          images: [preset.url, ...(editingProduct.images || []).filter(i => i !== preset.url)]
                        })
                      }
                      className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        editingProduct.primaryImage === preset.url ? 'border-white scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 text-[9px] text-center p-0.5 truncate">
                        {preset.label}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={editingProduct.primaryImage || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, primaryImage: e.target.value })}
                    placeholder="Or enter image URL path directly"
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-1">Available Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={editingProduct.sizes?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="e.g. S, M, L, XL, XXL or 40, 41, 42, 43, 44"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2 text-xs text-white"
                />
              </div>

              {/* Badges and visibility */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isPublished ?? true}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isPublished: e.target.checked })}
                    className="accent-white"
                  />
                  <span>Published in Shop</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isFeatured ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                    className="accent-white"
                  />
                  <span>Featured Carousel</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNewArrival ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })}
                    className="accent-white"
                  />
                  <span>New Arrival</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestSeller ?? false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                    className="accent-[#C6A15B]"
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-neutral-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C6A15B] text-black hover:bg-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg"
                >
                  {isNewProduct ? 'Create Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
