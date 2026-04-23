import { create } from 'zustand';
import { Product } from './data';

type CartItem = {
  product: Product;
  quantity: number;
  color?: string;
};

type Store = {
  // Cart
  cartItems: CartItem[];
  cartOpen: boolean;
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;

  // UI
  lang: 'uk' | 'en';
  setLang: (lang: 'uk' | 'en') => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickView: (product: Product | null) => void;

  // Filters
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
};

export const useStore = create<Store>((set, get) => ({
  // Cart
  cartItems: [],
  cartOpen: false,
  addToCart: (product, quantity = 1, color) => {
    const items = get().cartItems;
    const existing = items.find(i => i.product.id === product.id && i.color === color);
    if (existing) {
      set({ cartItems: items.map(i => i.product.id === product.id && i.color === color ? { ...i, quantity: i.quantity + quantity } : i) });
    } else {
      set({ cartItems: [...items, { product, quantity, color }] });
    }
    set({ cartOpen: true });
  },
  removeFromCart: (id) => set({ cartItems: get().cartItems.filter(i => i.product.id !== id) }),
  updateQuantity: (id, quantity) => {
    if (quantity < 1) return get().removeFromCart(id);
    set({ cartItems: get().cartItems.map(i => i.product.id === id ? { ...i, quantity } : i) });
  },
  clearCart: () => set({ cartItems: [] }),
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),

  // Wishlist
  wishlist: [],
  toggleWishlist: (id) => {
    const wl = get().wishlist;
    set({ wishlist: wl.includes(id) ? wl.filter(i => i !== id) : [...wl, id] });
  },

  // UI
  lang: 'uk',
  setLang: (lang) => set({ lang }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  quickViewProduct: null,
  setQuickView: (product) => set({ quickViewProduct: product }),

  // Filters
  activeCategory: 'all',
  setActiveCategory: (cat) => set({ activeCategory: cat }),
}));
