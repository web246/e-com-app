export const CATEGORIES = [
  { name: 'Electronics', slug: 'electronics', icon: 'Cpu', color: '#005BB5' },
  { name: 'Fashion', slug: 'fashion', icon: 'Shirt', color: '#E67A00' },
  { name: 'Phones', slug: 'phones', icon: 'Smartphone', color: '#6366F1' },
  { name: 'Computers', slug: 'computers', icon: 'Monitor', color: '#6366F1' },
  { name: 'Home & Living', slug: 'home', icon: 'Sofa', color: '#22C55E' },
  { name: 'Gaming', slug: 'gaming', icon: 'Gamepad2', color: '#EC4899' },
  { name: 'Beauty', slug: 'beauty', icon: 'Sparkles', color: '#8B5CF6' },
  { name: 'Footwear', slug: 'footwear', icon: 'Footprints', color: '#E67A00' },
  { name: 'Groceries', slug: 'groceries', icon: 'ShoppingBasket', color: '#22C55E' },
  { name: 'Food & Drinks', slug: 'food', icon: 'UtensilsCrossed', color: '#EF4444' },
  { name: 'Automotive', slug: 'automotive', icon: 'Car', color: '#64748B' },
  { name: 'Health', slug: 'health', icon: 'Heart', color: '#EF4444' },
  { name: 'Sports', slug: 'sports', icon: 'Dumbbell', color: '#06B6D4' },
  { name: 'More', slug: 'more', icon: 'Grid3X3', color: '#64748B' },
];

const IMG = (seed, w = 600) => `https://images.unsplash.com/${seed}?w=${w}&q=80`;

export const SAMPLE_PRODUCTS = [
  { id: 'p1', name: 'Wireless Noise-Cancelling Headphones', slug: 'wireless-headphones', category: 'electronics', store_name: 'TechHub Kenya', store_id: 's1', price: 8999, old_price: 12999, discount_percent: 31, currency: 'KES', thumbnail: IMG('photo-1505740420928-5e560c06d30e'), images: [IMG('photo-1505740420928-5e560c06d30e'), IMG('photo-1484704849700-f032a568e944')], stock: 34, rating: 4.6, reviews_count: 214, sold_count: 850, free_shipping: true, is_best_seller: true, is_flash_sale: true, flash_sale_stock: 12 },
  { id: 'p2', name: 'Smart Fitness Watch Series 6', slug: 'smart-fitness-watch', category: 'electronics', store_name: 'GadgetWorld', store_id: 's2', price: 5499, old_price: 7999, discount_percent: 31, currency: 'KES', thumbnail: IMG('photo-1523275335684-37898b6baf30'), images: [IMG('photo-1523275335684-37898b6baf30')], stock: 50, rating: 4.4, reviews_count: 132, sold_count: 620, free_shipping: true, is_new_arrival: true },
  { id: 'p3', name: 'Classic Leather Sneakers', slug: 'leather-sneakers', category: 'footwear', store_name: 'StepStyle', store_id: 's3', price: 3499, old_price: 4999, discount_percent: 30, currency: 'KES', thumbnail: IMG('photo-1549298916-b41d501d3772'), images: [IMG('photo-1549298916-b41d501d3772')], stock: 78, rating: 4.7, reviews_count: 341, sold_count: 1200, free_shipping: false, is_best_seller: true },
  { id: 'p4', name: 'Minimalist Cotton T-Shirt', slug: 'cotton-tshirt', category: 'fashion', store_name: 'Urban Threads', store_id: 's4', price: 899, old_price: 1299, discount_percent: 31, currency: 'KES', thumbnail: IMG('photo-1521572163474-6864f9cf17ab'), images: [IMG('photo-1521572163474-6864f9cf17ab')], stock: 200, rating: 4.3, reviews_count: 89, sold_count: 430, free_shipping: true, is_new_arrival: true },
  { id: 'p5', name: '4K Ultra HD Smart TV 55"', slug: '4k-smart-tv', category: 'electronics', store_name: 'TechHub Kenya', store_id: 's1', price: 42999, old_price: 54999, discount_percent: 22, currency: 'KES', thumbnail: IMG('photo-1593359677879-a4bb92f829d1'), images: [IMG('photo-1593359677879-a4bb92f829d1')], stock: 15, rating: 4.8, reviews_count: 502, sold_count: 340, free_shipping: true, is_best_seller: true, is_flash_sale: true, flash_sale_stock: 5 },
  { id: 'p6', name: 'Modern Ergonomic Office Chair', slug: 'ergonomic-chair', category: 'home', store_name: 'HomeStyle', store_id: 's5', price: 12999, old_price: 17999, discount_percent: 28, currency: 'KES', thumbnail: IMG('photo-1580480055273-228ff5388ef8'), images: [IMG('photo-1580480055273-228ff5388ef8')], stock: 22, rating: 4.5, reviews_count: 76, sold_count: 190, free_shipping: true },
  { id: 'p7', name: 'Premium Skincare Gift Set', slug: 'skincare-set', category: 'beauty', store_name: 'GlowUp Beauty', store_id: 's6', price: 2999, old_price: 4499, discount_percent: 33, currency: 'KES', thumbnail: IMG('photo-1522335789203-aabd1fc54bc9'), images: [IMG('photo-1522335789203-aabd1fc54bc9')], stock: 60, rating: 4.6, reviews_count: 158, sold_count: 720, free_shipping: false, is_new_arrival: true },
  { id: 'p8', name: 'Wireless Gaming Controller', slug: 'gaming-controller', category: 'gaming', store_name: 'GameZone', store_id: 's7', price: 4499, old_price: 5999, discount_percent: 25, currency: 'KES', thumbnail: IMG('photo-1592840062661-a5a7f78e2056'), images: [IMG('photo-1592840062661-a5a7f78e2056')], stock: 40, rating: 4.5, reviews_count: 203, sold_count: 560, free_shipping: true, is_best_seller: true },
];

export const STORES = [
  { id: 's1', name: 'TechHub Kenya', logo_url: IMG('photo-1560472354-b33ff0c44a43', 200), rating: 4.7, followers_count: 12400, verified: true, category: 'Electronics' },
  { id: 's2', name: 'GadgetWorld', logo_url: IMG('photo-1518770660439-4636190af475', 200), rating: 4.5, followers_count: 8900, verified: true, category: 'Electronics' },
  { id: 's3', name: 'StepStyle', logo_url: IMG('photo-1549298916-b41d501d3772', 200), rating: 4.8, followers_count: 15600, verified: true, category: 'Footwear' },
  { id: 's4', name: 'Urban Threads', logo_url: IMG('photo-1441984904996-e0b6ba687e04', 200), rating: 4.4, followers_count: 6700, verified: false, category: 'Fashion' },
];

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
