import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/AuthContext';
import * as wishlistApi from '@/lib/api/wishlistService';
import { getErrorMessage } from '@/lib/api/errors';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const data = await wishlistApi.getWishlist();
      setItems(data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    reload();
  }, [reload]);

  const toggle = async (product) => {
    if (!isAuthenticated) throw new Error('Please log in to manage your wishlist');
    try {
      const exists = items.some((p) => p.id === product.id);
      const data = exists
        ? await wishlistApi.removeWishlistItem(product.id)
        : await wishlistApi.addWishlistItem(product.id);
      setItems(data);
    } catch (err) {
      throw new Error(getErrorMessage(err, 'Could not update wishlist'));
    }
  };

  const isWishlisted = (id) => items.some((p) => p.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length, loading, reload }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
