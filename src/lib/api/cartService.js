import { apiGet, apiPost, apiPut, apiDelete } from './apiClient';
import { mapCartItem } from '../mappers/productMapper';

export async function getCart() {
  const data = await apiGet('/cart');
  return {
    items: (data.items || []).map(mapCartItem),
    subtotal: data.subtotal ?? 0,
    currency: data.currency || 'KSH',
  };
}

export async function addCartItem(product_id, quantity = 1) {
  const data = await apiPost('/cart/items', { product_id, quantity });
  return {
    items: (data.items || []).map(mapCartItem),
    subtotal: data.subtotal ?? 0,
    currency: data.currency || 'KSH',
  };
}

export async function updateCartItem(productId, quantity) {
  const data = await apiPut(`/cart/items/${productId}`, { quantity });
  return {
    items: (data.items || []).map(mapCartItem),
    subtotal: data.subtotal ?? 0,
    currency: data.currency || 'KSH',
  };
}

export async function removeCartItem(productId) {
  const data = await apiDelete(`/cart/items/${productId}`);
  return {
    items: (data.items || []).map(mapCartItem),
    subtotal: data.subtotal ?? 0,
    currency: data.currency || 'KSH',
  };
}
