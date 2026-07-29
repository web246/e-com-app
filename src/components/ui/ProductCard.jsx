import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Plus, MapPin, Truck } from 'lucide-react';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';
import { formatPrice } from '@/lib/constants';
import { toast } from '@/components/ui/use-toast';

export default function ProductCard({ product, compact = false }) {
  const { toggle, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);
  const cardClass = compact
    ? 'rounded-2xl border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.06)] w-full'
    : 'rounded-2xl border border-[#D9D2CB] bg-white shadow-sm';
  const imageClass = compact ? 'aspect-[5/4]' : 'aspect-[5/4]';
  const contentClass = compact ? 'p-2.5 space-y-1.5 min-h-0' : 'p-3 space-y-2';

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
    <motion.div whileHover={{ y: -2 }} className={`${compact ? '' : 'linet-card hydro-shadow-hover'} overflow-hidden group ${cardClass}`}>
      <Link to={`/product/${product.id}`} className="block">
        <div className={`relative ${imageClass} bg-brown-light overflow-hidden`}>
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#7A4F2D] text-sm">No image</div>
          )}
          <div className="absolute inset-x-1.5 top-1.5 flex items-center justify-between gap-1">
            <div className="flex flex-wrap gap-0.5">
              {product.discount_percent > 0 && (
                <span className="badge-pill bg-[#A15B2A]/10 text-[#A15B2A]">-{product.discount_percent}%</span>
              )}
              {product.is_best_seller && (
                <span className="badge-pill bg-[#DA212A]/10 text-[#DA212A]">Best Seller</span>
              )}
            </div>
            <button onClick={handleWishlist} aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'} className={`rounded-full bg-white/95 flex items-center justify-center shadow-sm border border-[#D9B48A]/30 ${compact ? 'w-7 h-7' : 'w-9 h-9'}`}>
              <Heart size={compact ? 12 : 15} className={wishlisted ? 'fill-[#A15B2A] text-[#A15B2A]' : 'text-[#5E3A25]'} />
            </button>
          </div>
          <button onClick={handleAdd} aria-label={`Add ${product.name} to cart`} className={`absolute bottom-1.5 right-1.5 rounded-full gradient-primary flex items-center justify-center shadow-md transition-opacity ${compact ? 'w-7 h-7 opacity-100' : 'w-10 h-10 opacity-0 group-hover:opacity-100'}`}>
            <Plus size={compact ? 14 : 18} className="text-white" />
          </button>
        </div>
        <div className={contentClass}>
          <div className={`flex items-center justify-between gap-1 ${compact ? 'gap-0.5' : ''}`}>
            <p className={`font-semibold uppercase tracking-[0.1em] text-[#6F5745] ${compact ? 'text-[9px]' : 'text-[11px]'}`}>{product.category || 'General'}</p>
            <span className={`product-label ${product.free_shipping ? 'bg-[#22C55E]/12 text-[#166534]' : 'bg-[#E4C9A6]/20 text-[#6F4E2A]'} ${compact ? 'text-[8px] px-1.5 py-0.5 normal-case tracking-normal' : ''}`}>
              {product.country_of_origin || 'Kenya'}
            </span>
          </div>
          <div>
            <h3 className={`font-display font-semibold text-[#2F241E] line-clamp-2 leading-tight ${compact ? 'text-[13px]' : 'text-base'}`}>{product.name}</h3>
            {!compact && <p className="text-[#7A4F2D] mt-0.5 line-clamp-1 text-xs">{product.description || 'Premium quality product.'}</p>}
          </div>
          <div className={`flex items-center justify-between gap-1 ${compact ? 'gap-1' : ''}`}>
            <div>
              <div className={`flex items-center gap-1 ${compact ? 'mb-0' : 'mb-1'}`}>
                <Star size={compact ? 10 : 12} className="fill-[#F59E0B] text-[#F59E0B]" />
                <span className={`font-semibold text-[#6F4E2A] ${compact ? 'text-[10px]' : 'text-xs'}`}>{product.rating > 0 ? product.rating.toFixed(1) : '4.5'}</span>
              </div>
              <div className={`flex items-center gap-1 text-[#6F4E2A] ${compact ? 'text-[13px]' : 'text-[13px]'}`}>
                <span className="price-display">{formatPrice(product.price, product.currency)}</span>
                {product.old_price && <span className={`text-[#9A7B5B] line-through ${compact ? 'text-[9px]' : 'text-xs'}`}>{formatPrice(product.old_price, product.currency)}</span>}
              </div>
            </div>
            {!compact && <div className="text-right text-[#7A4F2D] text-[11px]">
              <div className="flex items-center justify-end gap-1"><Truck size={12} />{product.free_shipping ? 'Free shipping' : formatPrice(product.shipping_cost)}</div>
              <div className="flex items-center justify-end gap-1"><MapPin size={12} />{product.country_of_origin || 'Kenya'}</div>
            </div>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
