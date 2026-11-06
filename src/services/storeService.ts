import { Product, StoreSettings, CartItem, ProductColor } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialProducts';

const PRODUCTS_STORAGE_KEY = 'stride_london_products_v2';
const SETTINGS_STORAGE_KEY = 'stride_london_settings_v2';
const CART_STORAGE_KEY = 'stride_london_cart_v2';

type Listener = () => void;

class StoreService {
  private products: Product[] = [];
  private settings: StoreSettings = INITIAL_SETTINGS;
  private cart: CartItem[] = [];
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (storedProducts) {
        const parsed: Product[] = JSON.parse(storedProducts);
        // If stored products have legacy image paths, refresh them to real photos
        const hasLegacyImages = parsed.some(p => p.primaryImage && p.primaryImage.includes('product_leather_'));
        if (hasLegacyImages || parsed.length < INITIAL_PRODUCTS.length) {
          this.products = [...INITIAL_PRODUCTS];
          this.persistProducts();
        } else {
          this.products = parsed;
        }
      } else {
        this.products = [...INITIAL_PRODUCTS];
        this.persistProducts();
      }

      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        this.settings = { ...INITIAL_SETTINGS, ...JSON.parse(storedSettings) };
      } else {
        this.settings = { ...INITIAL_SETTINGS };
        this.persistSettings();
      }

      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
      }
    } catch {
      this.products = [...INITIAL_PRODUCTS];
      this.settings = { ...INITIAL_SETTINGS };
      this.cart = [];
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  private persistProducts() {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(this.products));
    } catch (e) {
      console.warn('Failed to persist products to localStorage', e);
    }
  }

  private persistSettings() {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
    } catch (e) {
      console.warn('Failed to persist settings to localStorage', e);
    }
  }

  private persistCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Failed to persist cart to localStorage', e);
    }
  }

  // --- PRODUCTS CRUD ---
  public getProducts(): Product[] {
    return [...this.products];
  }

  public getPublishedProducts(): Product[] {
    return this.products
      .filter(p => p.isPublished)
      .sort((a, b) => a.order - b.order);
  }

  public getFeaturedProducts(): Product[] {
    return this.products
      .filter(p => p.isPublished && p.isFeatured)
      .sort((a, b) => a.order - b.order);
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.products.find(p => p.slug === slug);
  }

  public addProduct(productData: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    this.products.unshift(newProduct);
    this.persistProducts();
    this.notify();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.products[index] = { ...this.products[index], ...updates };
    this.persistProducts();
    this.notify();
    return true;
  }

  public deleteProduct(id: string): boolean {
    const beforeCount = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    if (this.products.length !== beforeCount) {
      this.persistProducts();
      this.notify();
      return true;
    }
    return false;
  }

  public resetProductsToDefault() {
    this.products = [...INITIAL_PRODUCTS];
    this.persistProducts();
    this.notify();
  }

  // --- SETTINGS ---
  public getSettings(): StoreSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<StoreSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.persistSettings();
    this.notify();
  }

  // --- CART ---
  public getCart(): CartItem[] {
    return [...this.cart];
  }

  public addToCart(product: Product, size: string, color: ProductColor, quantity: number = 1) {
    const cartItemId = `${product.id}-${size}-${color.name}`;
    const existingIndex = this.cart.findIndex(item => item.id === cartItemId);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: cartItemId,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity
      });
    }

    this.persistCart();
    this.notify();
  }

  public updateCartItemQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(id);
      return;
    }
    const item = this.cart.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      this.persistCart();
      this.notify();
    }
  }

  public removeFromCart(id: string) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.persistCart();
    this.notify();
  }

  public clearCart() {
    this.cart = [];
    this.persistCart();
    this.notify();
  }

  // --- WHATSAPP ORDER GENERATOR ---
  public getFormattedWhatsAppNumber(): string {
    return this.settings.whatsappNumber.replace(/[^0-9]/g, '');
  }

  public generateWhatsAppOrderUrl(
    product: Product,
    selectedSize: string,
    selectedColor: ProductColor,
    quantity: number,
    specialInstructions?: string
  ): string {
    const cleanNumber = this.getFormattedWhatsAppNumber();
    const effectivePrice = product.salePrice ?? product.price;
    const itemTotal = effectivePrice * quantity;
    const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/shop?product=${product.id}` : '';

    const lines = [
      `*ORDER INQUIRY — ${this.settings.brandName.toUpperCase()}*`,
      `_Step Bold. Live Stylish._`,
      '',
      `Hello! I would like to place an order for the following luxury leather item:`,
      '',
      `• *Product:* ${product.name}`,
      `• *Category:* ${product.category.toUpperCase()}`,
      `• *Price:* PKR ${effectivePrice.toLocaleString()}`,
      `• *Selected Size:* ${selectedSize}`,
      `• *Selected Finish/Color:* ${selectedColor.name}`,
      `• *Quantity:* ${quantity}`,
      `• *Item Total:* PKR ${itemTotal.toLocaleString()}`,
      currentUrl ? `• *Product Reference:* ${currentUrl}` : '',
      specialInstructions ? `• *Notes:* ${specialInstructions}` : '',
      '',
      `Please confirm availability, estimated delivery timeline, and payment instructions. Thank you!`
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${cleanNumber}?text=${message}`;
  }

  public generateCartWhatsAppOrderUrl(cartItems: CartItem[]): string {
    const cleanNumber = this.getFormattedWhatsAppNumber();
    const subtotal = cartItems.reduce((sum, item) => {
      const price = item.product.salePrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const itemsText = cartItems.map((item, idx) => {
      const price = item.product.salePrice ?? item.product.price;
      return `${idx + 1}. *${item.product.name}*\n   Size: ${item.selectedSize} | Color: ${item.selectedColor.name} | Qty: ${item.quantity}\n   Price: PKR ${(price * item.quantity).toLocaleString()}`;
    }).join('\n\n');

    const lines = [
      `*BESPOKE BAG ORDER — ${this.settings.brandName.toUpperCase()}*`,
      `_Step Bold. Live Stylish._`,
      '',
      `Hello! I would like to confirm my shopping bag order:`,
      '',
      itemsText,
      '',
      `━━━━━━━━━━━━━━━━━━`,
      `*ESTIMATED BAG TOTAL:* PKR ${subtotal.toLocaleString()}`,
      `*DELIVERY:* Complimentary Insured Courier Across Pakistan`,
      `━━━━━━━━━━━━━━━━━━`,
      '',
      `Please provide invoice details and bank / payment guidance. Thank you!`
    ];

    const message = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${cleanNumber}?text=${message}`;
  }
}

export const storeService = new StoreService();
