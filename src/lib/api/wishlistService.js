import { apiGet, apiPost, apiDelete } from './apiClient';
import { mapProduct } from '../mappers/productMapper';

export async function getWishlist() {
  const data = await apiGet('/wishlist');
  const items = (data.items || []).map((item) => mapProduct(item.product || { id: item.product_id }));
  return items.filter(Boolean);
}

export async function addWishlistItem(product_id) {
  const data = await apiPost('/wishlist/items', { product_id });
  return (data.items || []).map((item) => mapProduct(item.product || { id: item.product_id })).filter(Boolean);
}

export async function removeWishlistItem(productId) {
  const data = await apiDelete(`/wishlist/items/${productId}`);
  return (data.items || []).map((item) => mapProduct(item.product || { id: item.product_id })).filter(Boolean);
}
