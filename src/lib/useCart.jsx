import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import * as cartApi from '@/lib/api/cartService';
import { validateCoupon } from '@/lib/api/orderService';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [currency, setCurrency] = useState('KES');
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  const applyCartResponse = (data) => {
    setItems(data.items || []);
    setSubtotal(data.subtotal ?? 0);
    setCurrency(data.currency || 'KES');
  };

  const reload = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      setSubtotal(0);
      return;
    }
    setLoading(true);
    try {
      const data = await cartApi.getCart();
      applyCartResponse(data);
    } catch {
      setItems([]);
      setSubtotal(0);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    reload();
    if (!isAuthenticated) setCoupon(null);
  }, [reload, isAuthenticated]);

  const addItem = async (product, quantity = 1) => {
    if (!isAuthenticated) throw new Error('Please log in to add items to your cart');
    const data = await cartApi.addCartItem(product.id, quantity);
    applyCartResponse(data);
  };

  const removeItem = async (key) => {
    const item = items.find((i) => i.key === key);
    if (!item) return;
    const data = await cartApi.removeCartItem(item.product_id);
    applyCartResponse(data);
  };

  const updateQuantity = async (key, qty) => {
    const item = items.find((i) => i.key === key);
    if (!item) return;
    if (qty <= 0) return removeItem(key);
    const data = await cartApi.updateCartItem(item.product_id, qty);
    applyCartResponse(data);
  };

  const clearCart = async () => {
    for (const item of [...items]) {
      await cartApi.removeCartItem(item.product_id);
    }
    setItems([]);
    setSubtotal(0);
    setCoupon(null);
  };

  const applyCoupon = async (code) => {
    const result = await validateCoupon(code, subtotal);
    setCoupon({ code, discount: result.discount, message: result.message });
    return result;
  };

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      itemCount, subtotal, currency, coupon, setCoupon, applyCoupon,
      loading, reload,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
