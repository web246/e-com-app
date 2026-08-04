const IMG = (seed, w = 600) => `https://images.unsplash.com/${seed}?w=${w}&q=80`;

/** Static icon/color metadata for category slugs (API categories may not include these). */
export const CATEGORY_META = {
  electronics: { icon: 'Cpu', color: '#A15B2A', name: 'Electronics' },
  fashion: { icon: 'Shirt', color: '#6D3F23', name: 'Fashion' },
  phones: { icon: 'Smartphone', color: '#8B5CF6', name: 'Phones' },
  computers: { icon: 'Monitor', color: '#A15B2A', name: 'Computers' },
  home: { icon: 'Sofa', color: '#22C55E', name: 'Home' },
  gaming: { icon: 'Gamepad2', color: '#F97316', name: 'Gaming' },
  beauty: { icon: 'Sparkles', color: '#DA212A', name: 'Beauty' },
  footwear: { icon: 'Footprints', color: '#A15B2A', name: 'Footwear' },
  groceries: { icon: 'ShoppingBasket', color: '#22C55E', name: 'Groceries' },
  food: { icon: 'UtensilsCrossed', color: '#EF4444', name: 'Food' },
  automotive: { icon: 'Car', color: '#64748B', name: 'Automotive' },
  health: { icon: 'Heart', color: '#DA212A', name: 'Health' },
  sports: { icon: 'Dumbbell', color: '#06B6D4', name: 'Sports' },
  technology: { icon: 'Zap', color: '#F59E0B', name: 'Technology' },
  clothing: { icon: 'Shirt', color: '#EC4899', name: 'Clothing' },
  shoes: { icon: 'Footprints', color: '#8B5CF6', name: 'Shoes' },
  wearables: { icon: 'Watch', color: '#06B6D4', name: 'Wearables' },
  books: { icon: 'Book', color: '#A15B2A', name: 'Books & Music' },
  music: { icon: 'Music', color: '#A15B2A', name: 'Books & Music' },
  general_shopping: { icon: 'ShoppingBag', color: '#64748B', name: 'General Shopping' },
  marketplace: { icon: 'Store', color: '#6D3F23', name: 'Marketplace' },
  more: { icon: 'Grid3X3', color: '#6D3F23', name: 'More' },
};

export const DEFAULT_CATEGORIES = [
  { id: 1, slug: 'electronics', name: 'Electronics', description: 'Premium gadgets, accessories and tech essentials', image_url: '', parent_id: null },
  { id: 2, slug: 'fashion', name: 'Fashion', description: 'Curated clothing, shoes, and premium style pieces', image_url: '', parent_id: null },
  { id: 3, slug: 'phones', name: 'Phones', description: 'Latest smartphones and mobile accessories', image_url: '', parent_id: null },
  { id: 4, slug: 'computers', name: 'Computers', description: 'Laptops, desktops, and performance gear', image_url: '', parent_id: null },
  { id: 5, slug: 'home', name: 'Home', description: 'Elevated furniture, decor and home essentials', image_url: '', parent_id: null },
  { id: 6, slug: 'gaming', name: 'Gaming', description: 'Gaming consoles, controllers, and high-performance gear', image_url: '', parent_id: null },
  { id: 7, slug: 'beauty', name: 'Beauty', description: 'Personal care, fragrance and wellness favorites', image_url: '', parent_id: null },
  { id: 8, slug: 'groceries', name: 'Groceries', description: 'Daily essentials, pantry staples and premium foods', image_url: '', parent_id: null },
  { id: 9, slug: 'sports', name: 'Sports', description: 'Sports equipment, fitness gear, and athletic wear', image_url: '', parent_id: null },
  { id: 10, slug: 'food', name: 'Food', description: 'Fresh, gourmet, and specialty food items', image_url: '', parent_id: null },
  { id: 11, slug: 'technology', name: 'Technology', description: 'Latest technology products and gadgets', image_url: '', parent_id: null },
  { id: 12, slug: 'clothing', name: 'Clothing', description: 'Premium clothing and apparel for all occasions', image_url: '', parent_id: null },
  { id: 13, slug: 'shoes', name: 'Shoes', description: 'Designer shoes, sneakers, and footwear', image_url: '', parent_id: null },
  { id: 14, slug: 'wearables', name: 'Wearables', description: 'Smartwatches, fitness trackers, and tech accessories', image_url: '', parent_id: null },
  { id: 15, slug: 'books', name: 'Books & Music', description: 'Books, music, audiobooks, and entertainment', image_url: '', parent_id: null },
  { id: 16, slug: 'general_shopping', name: 'General Shopping', description: 'General merchandise and everyday essentials', image_url: '', parent_id: null },
  { id: 17, slug: 'marketplace', name: 'Marketplace', description: 'Curated marketplace with diverse sellers and products', image_url: '', parent_id: null },
];

export function getCategoryName(slug) {
  if (!slug) return '';
  return String(slug)
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function enrichCategory(cat) {
  const meta = CATEGORY_META[cat.slug] || { icon: 'Grid3X3', color: '#64748B', name: getCategoryName(cat.slug) };
  return {
    ...cat,
    icon: meta.icon,
    color: meta.color,
    name: cat.name || meta.name || getCategoryName(cat.slug),
  };
}

export const BANNERS = [
  { title: 'Mega Electronics Sale', subtitle: 'Up to 40% off top gadgets', badge_text: 'Limited Time', image_url: IMG('photo-1607082349566-187342175e2f', 900), gradient_from: '#A15B2A', gradient_to: '#6D3F23' },
  { title: 'Fashion Week Drop', subtitle: 'New arrivals every day', badge_text: 'Just Landed', image_url: IMG('photo-1441986300917-64674bd600d8', 900), gradient_from: '#E67A00', gradient_to: '#C45F00' },
  { title: 'Home Essentials', subtitle: 'Furnish your space for less', badge_text: 'Best Value', image_url: IMG('photo-1567016432779-094069958ea5', 900), gradient_from: '#22C55E', gradient_to: '#0F9D58' },
];

export const PAYMENT_METHODS = [
  { id: 'mpesa', name: 'M-Pesa', description: 'Recommended — pay via M-Pesa STK push' },
  { id: 'card', name: 'Card', description: 'Visa / Mastercard' },
  { id: 'cash_on_delivery', name: 'Cash on Delivery', description: 'Pay when it arrives' },
];

export const DELIVERY_METHODS = [
  {
    id: 'boda_express',
    name: 'Boda Express',
    fee: 250,
    eta: 'Within 2 hours',
    image_url: 'https://plus.unsplash.com/premium_photo-1681488134408-d6eb570673af?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'standard',
    name: 'Standard Delivery',
    fee: 150,
    eta: '2-4 business days',
    image_url: 'https://plus.unsplash.com/premium_photo-1681487855134-d6c0434f91f8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'pickup',
    name: 'Store Pickup',
    fee: 0,
    eta: 'Ready in 1 day',
    image_url: 'https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export function formatPrice(amount, currency = 'KSH') {
  if (amount == null || isNaN(amount)) return `KSH 0`;
  const normalizedCurrency = String(currency || 'KSH').toUpperCase();
  const displayCurrency =
    !normalizedCurrency
      || normalizedCurrency === 'DBP'
      || normalizedCurrency === 'KES'
      || normalizedCurrency === 'GBP'
      || normalizedCurrency === 'USD'
      ? 'KSH'
      : normalizedCurrency;
  return `${displayCurrency} ${Number(amount).toLocaleString('en-KE')}`;
}
