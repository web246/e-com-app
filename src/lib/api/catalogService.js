import { apiGetPublic } from './apiClient';
import { mapCategory, mapProduct, mapStore } from '../mappers/productMapper';
import { DEFAULT_CATEGORIES } from '../constants';

function buildQuery(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== '') q.set(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : '';
}

export async function fetchProducts({ page = 1, page_size = 20, search, category_id, vendor_slug } = {}) {
  const data = await apiGetPublic(`/public/products${buildQuery({ page, page_size, search, category_id, vendor_slug })}`);
  return {
    items: (data.items || []).map(mapProduct),
    pagination: data.pagination || {},
  };
}

export async function fetchProduct(id) {
  const data = await apiGetPublic(`/public/products/${id}`);
  return mapProduct(data);
}

export async function fetchCategories(parent_id) {
  const data = await apiGetPublic(`/public/categories${buildQuery({ parent_id })}`);
  const list = Array.isArray(data) ? data : data.items || [];
  if (list.length) {
    return list.map((c) => ({ ...mapCategory(c), isFallback: false }));
  }
  // Default UI categories are display-only — never send their fake IDs to the API.
  return DEFAULT_CATEGORIES.map((c) => ({
    ...mapCategory(c),
    id: null,
    isFallback: true,
  }));
}

export async function fetchStores({ page = 1, page_size = 20 } = {}) {
  const data = await apiGetPublic(`/public/stores${buildQuery({ page, page_size })}`);
  return {
    items: (data.items || []).map(mapStore),
    pagination: data.pagination || {},
  };
}

export async function fetchStoreBySlug(slug) {
  try {
    const data = await apiGetPublic(`/public/stores/${slug}`);
    return mapStore(data);
  } catch (err) {
    const { items } = await fetchStores({ page: 1, page_size: 100 });
    return items.find((store) => store.slug === slug) || null;
  }
}

export async function fetchShippingChannels() {
  return apiGetPublic('/public/cost-estimator/channels');
}
