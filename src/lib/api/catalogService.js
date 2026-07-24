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

export async function fetchProducts({ page = 1, page_size = 20, search, category_id } = {}) {
  const data = await apiGetPublic(`/public/products${buildQuery({ page, page_size, search, category_id })}`);
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
  return list.length ? list.map(mapCategory) : DEFAULT_CATEGORIES.map(mapCategory);
}

export async function fetchStores({ page = 1, page_size = 20 } = {}) {
  const data = await apiGetPublic(`/public/stores${buildQuery({ page, page_size })}`);
  return {
    items: (data.items || []).map(mapStore),
    pagination: data.pagination || {},
  };
}

export async function fetchShippingChannels() {
  return apiGetPublic('/public/cost-estimator/channels');
}
