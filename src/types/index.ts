export type ProductCategory = 'all' | 'jackets' | 'shoes' | 'wallets' | 'belts' | 'keychains' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'jackets' | 'shoes' | 'wallets' | 'belts' | 'keychains' | 'accessories';
  price: number; // PKR
  salePrice?: number; // PKR
  description: string;
  craftDetails: string[];
  images: string[];
  primaryImage: string;
  sizes: string[];
  colors: ProductColor[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isPublished: boolean;
  order: number;
  stock: number;
  collectionTag?: 'classic' | 'modern' | 'bestseller' | 'new';
  hotspots?: {
    x: number; // percentage
    y: number; // percentage
    title: string;
    description: string;
  }[];
}

export interface StoreSettings {
  whatsappNumber: string;
  brandName: string;
  tagline: string;
  currency: string;
  announcement: string;
  londonShowroom: string;
  craftStudio: string;
}

export interface CartItem {
  id: string; // unique item id (product.id + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}
