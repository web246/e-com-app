const IMG = (seed, w = 600) => `https://images.unsplash.com/${seed}?w=${w}&q=80`;

/** Static icon/color metadata for category slugs (API categories may not include these). */
export const CATEGORY_META = {
  electronics: { icon: 'Cpu', color: '#005BB5' },
  fashion: { icon: 'Shirt', color: '#E67A00' },
  phones: { icon: 'Smartphone', color: '#6366F1' },
  computers: { icon: 'Monitor', color: '#6366F1' },
  home: { icon: 'Sofa', color: '#22C55E' },
  gaming: { icon: 'Gamepad2', color: '#EC4899' },
  beauty: { icon: 'Sparkles', color: '#8B5CF6' },
  footwear: { icon: 'Footprints', color: '#E67A00' },
  groceries: { icon: 'ShoppingBasket', color: '#22C55E' },
  food: { icon: 'UtensilsCrossed', color: '#EF4444' },
  automotive: { icon: 'Car', color: '#64748B' },
  health: { icon: 'Heart', color: '#EF4444' },
  sports: { icon: 'Dumbbell', color: '#06B6D4' },
  more: { icon: 'Grid3X3', color: '#64748B' },
};

export function enrichCategory(cat) {
  const meta = CATEGORY_META[cat.slug] || { icon: 'Grid3X3', color: '#64748B' };
  return { ...cat, icon: meta.icon, color: meta.color };
}

export const BANNERS = [
  { title: 'Mega Electronics Sale', subtitle: 'Up to 40% off top gadgets', badge_text: 'Limited Time', image_url: IMG('photo-1607082349566-187342175e2f', 900), gradient_from: '#005BB5', gradient_to: '#003D8F' },
  { title: 'Fashion Week Drop', subtitle: 'New arrivals every day', badge_text: 'Just Landed', image_url: IMG('photo-1441986300917-64674bd600d8', 900), gradient_from: '#E67A00', gradient_to: '#C45F00' },
  { title: 'Home Essentials', subtitle: 'Furnish your space for less', badge_text: 'Best Value', image_url: IMG('photo-1567016432779-094069958ea5', 900), gradient_from: '#22C55E', gradient_to: '#0F9D58' },
];

export const PAYMENT_METHODS = [
  { id: 'mpesa', name: 'M-Pesa', description: 'Pay via M-Pesa STK push' },
  { id: 'card', name: 'Card', description: 'Visa / Mastercard' },
  { id: 'cash_on_delivery', name: 'Cash on Delivery', description: 'Pay when it arrives' },
];

export const DELIVERY_METHODS = [
  { id: 'boda_express', name: 'Boda Express', fee: 250, eta: 'Within 2 hours' },
  { id: 'standard', name: 'Standard Delivery', fee: 150, eta: '2-4 business days' },
  { id: 'pickup', name: 'Store Pickup', fee: 0, eta: 'Ready in 1 day' },
];

export function formatPrice(amount, currency = 'KES') {
  if (amount == null || isNaN(amount)) return `${currency} 0`;
  return `${currency} ${Number(amount).toLocaleString('en-KE')}`;
}
