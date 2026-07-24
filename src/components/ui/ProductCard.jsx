import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Plus } from 'lucide-react';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';
import { formatPrice } from '@/lib/constants';
import { toast } from '@/components/ui/use-toast';

export default function ProductCard({ product }) {
  const { toggle, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    try {
      await toggle(product);
    } catch (err) {
      toast({ title: 'Wishlist', description: err.message, variant: 'destructive' });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addItem(product, 1);
      toast({ title: 'Added to cart', description: product.name });
    } catch (err) {
      toast({ title: 'Cart', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <motion.div whileHover={{ y: -2 }} className="linet-card overflow-hidden hydro-shadow-hover group border border-[#D9B48A]/40">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-brown-light overflow-hidden">
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#7A4F2D] text-sm">No image</div>
          )}
          <div className="absolute inset-x-2 top-2 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {product.discount_percent > 0 && (
                <span className="badge-pill bg-[#A15B2A]/10 text-[#A15B2A]">-{product.discount_percent}%</span>
              )}
              {product.is_best_seller && (
                <span className="badge-pill bg-[#DA212A]/10 text-[#DA212A]">Best Seller</span>
              )}
            </div>
            <button onClick={handleWishlist} className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-sm border border-[#D9B48A]/30">
              <Heart size={15} className={wishlisted ? 'fill-[#A15B2A] text-[#A15B2A]' : 'text-[#5E3A25]'} />
            </button>
          </div>
          <button onClick={handleAdd} className="absolute bottom-3 right-3 w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus size={18} className="text-white" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6F5745]">{product.category || 'General'}</p>
            <span className={`product-label ${product.free_shipping ? 'bg-[#22C55E]/12 text-[#166534]' : 'bg-[#E4C9A6]/20 text-[#6F4E2A]'}`}>
              {product.free_shipping ? 'Free Shipping' : product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <div>
            <h3 className="font-display font-semibold text-base text-[#2F241E] line-clamp-2 leading-tight">{product.name}</h3>
            <p className="text-xs text-[#7A4F2D] mt-2 line-clamp-2">{product.description || 'Premium quality product with strong customer appeal.'}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Star size={12} className="fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-xs font-semibold text-[#6F4E2A]">{product.rating > 0 ? product.rating.toFixed(1) : '4.5'}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#6F4E2A]">
                <span className="price-display">{formatPrice(product.price, product.currency)}</span>
                {product.old_price && <span className="text-xs text-[#9A7B5B] line-through">{formatPrice(product.old_price, product.currency)}</span>}
              </div>
            </div>
            <div className="text-right text-[11px] text-[#7A4F2D]">
              <div>{product.sold_count ? `${product.sold_count} sold` : 'Popular item'}</div>
              <div className={product.stock > 0 ? 'text-[#166534]' : 'text-[#991B1B]'}>{product.stock > 0 ? 'Available now' : 'Out of stock'}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
