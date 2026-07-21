import { apiGetPublic } from './apiClient';
import { mapCategory, mapProduct, mapStore } from '../mappers/productMapper';
import { getMockCatalog } from './mockCatalog';

function buildQuery(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== '') q.set(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : '';
}

async function getCatalogData() {
  try {
    return await apiGetPublic('/public/products');
  } catch {
    return getMockCatalog();
  }
}

export async function fetchProducts({ page = 1, page_size = 20, search, category_id } = {}) {
  try {
    const data = await apiGetPublic(`/public/products${buildQuery({ page, page_size, search, category_id })}`);
    return {
      items: (data.items || []).map(mapProduct),
      pagination: data.pagination || {},
    };
  } catch {
    const { products } = getMockCatalog();
    const filtered = products.filter((product) => {
      const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category_id || product.category_slug === category_id;
      return matchesSearch && matchesCategory;
    });
    return {
      items: filtered.slice(0, page_size).map(mapProduct),
      pagination: { page, page_size, total: filtered.length },
    };
  }
}

export async function fetchProduct(id) {
  try {
    const data = await apiGetPublic(`/public/products/${id}`);
    return mapProduct(data);
  } catch {
    const { products } = getMockCatalog();
    return mapProduct(products.find((product) => product.id === id));
  }
}

export async function fetchCategories(parent_id) {
  try {
    const data = await apiGetPublic(`/public/categories${buildQuery({ parent_id })}`);
    const list = Array.isArray(data) ? data : data.items || [];
    return list.map(mapCategory);
  } catch {
    const { categories } = getMockCatalog();
    return categories.map(mapCategory);
  }
}

export async function fetchStores({ page = 1, page_size = 20 } = {}) {
  try {
    const data = await apiGetPublic(`/public/stores${buildQuery({ page, page_size })}`);
    return {
      items: (data.items || []).map(mapStore),
      pagination: data.pagination || {},
    };
  } catch {
    const { stores } = getMockCatalog();
    return {
      items: stores.slice(0, page_size).map(mapStore),
      pagination: { page, page_size, total: stores.length },
    };
  }
}

export async function fetchShippingChannels() {
  try {
    return await apiGetPublic('/public/cost-estimator/channels');
  } catch {
    return [];
  }
}
