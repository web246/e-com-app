import { resolveImageUrl, resolveImageUrls } from '../resolveImageUrl';
import { getCategoryName } from '../constants';

export function mapProduct(p) {
  if (!p) return null;
  const rawCategory = p.category && typeof p.category === 'object' ? p.category : null;
  const categoryValue = p.category_slug || rawCategory?.slug || p.category_name || rawCategory?.name || p.category || 'general';
  const normalizedCategorySlug = String(categoryValue || 'general').trim().toLowerCase().replace(/\s+/g, '-');
  const categoryDisplayName = p.category_name || rawCategory?.name || getCategoryName(categoryValue) || 'General';
  const price = p.sale_price > 0 ? p.sale_price : p.price;
  const oldPrice = p.sale_price > 0 ? p.price : null;
  const discountPercent =
    oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const thumbnail = resolveImageUrl(p.image_url);
  const images = resolveImageUrls(p.image_urls?.length ? p.image_urls : p.image_url ? [p.image_url] : []);

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description || '',
    price,
    old_price: oldPrice,
    discount_percent: discountPercent,
    currency: 'KSH',
    thumbnail,
    images: images.length ? images : thumbnail ? [thumbnail] : [],
    store_name: p.vendor_name || p.vendor?.business_name || p.store_name || '',
    vendor_slug: p.vendor_slug || p.vendor?.slug || p.store_slug || '',
    vendor_id: p.vendor_id || p.vendor?.id || p.store_id || null,
    category: categoryDisplayName,
    category_slug: normalizedCategorySlug,
    category_name: categoryDisplayName,
    category_id: p.category_id || rawCategory?.id || null,
    free_shipping: !!p.free_shipping,
    shipping_cost: Number(p.shipping_cost ?? p.shipping_fee ?? p.delivery_fee ?? 0),
    country_of_origin: p.country_of_origin || p.origin_country || p.country || '',
    weight: p.weight || 0,
    length: p.length || 0,
    width: p.width || 0,
    height: p.height || 0,
    rating: 0,
    reviews_count: 0,
    sold_count: 0,
    stock: 99,
    is_best_seller: false,
    is_new_arrival: false,
    is_flash_sale: false,
  };
}

export function mapStore(s) {
  if (!s) return null;
  return {
    id: s.id,
    slug: s.slug,
    name: s.business_name,
    logo_url: resolveImageUrl(s.logo_url),
    banner_url: resolveImageUrl(s.banner_url),
    rating: 4.5,
    followers_count: 0,
    verified: true,
    category: s.business_type || '',
    description: s.description || '',
    city: s.city || '',
    country: s.country || '',
  };
}

export function mapCategory(c) {
  if (!c) return null;
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    image_url: resolveImageUrl(c.image_url),
    parent_id: c.parent_id,
    children: (c.children || []).map(mapCategory),
  };
}

export function mapCartItem(item) {
  const product = mapProduct(item.product || {});
  return {
    key: String(item.product_id),
    product_id: item.product_id,
    product,
    quantity: item.quantity,
    variant: null,
  };
}
