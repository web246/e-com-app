export function mapProduct(p) {
  if (!p) return null;
  const price = p.sale_price > 0 ? p.sale_price : p.price;
  const oldPrice = p.sale_price > 0 ? p.price : null;
  const discountPercent =
    oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description || '',
    price,
    old_price: oldPrice,
    discount_percent: discountPercent,
    currency: p.currency || 'KES',
    thumbnail: p.image_url || '',
    images: p.image_urls?.length ? p.image_urls : p.image_url ? [p.image_url] : [],
    store_name: p.vendor_name || '',
    vendor_slug: p.vendor_slug || '',
    store_id: p.vendor_slug,
    category: p.category_slug || '',
    free_shipping: !!p.free_shipping,
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
    logo_url: s.logo_url || '',
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
    image_url: c.image_url || '',
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
