import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Plus } from 'lucide-react';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';
import { formatPrice } from '@/lib/constants';
import { toast } from '@/components/ui/use-toast';

export default function ProductCard({ product, compact = false }) {
  const { toggle, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);
  const cardClass = compact
    ? 'rounded-[8px] border border-[#8B5E3B] bg-white p-[1px] shadow-[0_0_0_1px_rgba(139,94,59,0.16),0_2px_6px_rgba(74,42,26,0.08)] w-full'
    : 'rounded-[22px] border-[3px] border-[#8B5E3B] bg-white p-[3px] shadow-[0_0_0_3px_rgba(139,94,59,0.25),0_10px_24px_rgba(74,42,26,0.16)]';
  const imageClass = compact ? 'aspect-[4/5]' : 'aspect-square';
  const contentClass = compact ? 'p-1.25 space-y-0.75 min-h-0' : 'p-4 space-y-3';

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
    <motion.div whileHover={{ y: -2 }} className={`linet-card overflow-hidden hydro-shadow-hover group ${cardClass}`}>
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
            <button onClick={handleWishlist} className={`rounded-full bg-white/95 flex items-center justify-center shadow-sm border border-[#D9B48A]/30 ${compact ? 'w-5 h-5' : 'w-9 h-9'}`}>
              <Heart size={compact ? 8 : 15} className={wishlisted ? 'fill-[#A15B2A] text-[#A15B2A]' : 'text-[#5E3A25]'} />
            </button>
          </div>
          <button onClick={handleAdd} className={`absolute bottom-1.5 right-1.5 rounded-full gradient-primary flex items-center justify-center shadow-md transition-opacity ${compact ? 'w-5 h-5 opacity-100' : 'w-10 h-10 opacity-0 group-hover:opacity-100'}`}>
            <Plus size={compact ? 10 : 18} className="text-white" />
          </button>
        </div>
        <div className={contentClass}>
          <div className={`flex items-center justify-between gap-1 ${compact ? 'gap-0.5' : ''}`}>
            <p className={`font-semibold uppercase tracking-[0.1em] text-[#6F5745] ${compact ? 'text-[6px]' : 'text-[11px]'}`}>{product.category || 'General'}</p>
            <span className={`product-label ${product.free_shipping ? 'bg-[#22C55E]/12 text-[#166534]' : 'bg-[#E4C9A6]/20 text-[#6F4E2A]'} ${compact ? 'text-[6px] px-0.5 py-0.25' : ''}`}>
              {product.free_shipping ? 'Free' : product.stock > 0 ? 'In stock' : 'Sold out'}
            </span>
          </div>
          <div>
            <h3 className={`font-display font-semibold text-[#2F241E] line-clamp-2 leading-tight ${compact ? 'text-[9px]' : 'text-base'}`}>{product.name}</h3>
            {!compact && <p className={`text-[#7A4F2D] mt-0.5 line-clamp-2 ${compact ? 'text-[8px]' : 'text-xs'}`}>{product.description || 'Premium quality product with strong customer appeal.'}</p>}
          </div>
          <div className={`flex items-center justify-between gap-1 ${compact ? 'gap-1' : ''}`}>
            <div>
              <div className={`flex items-center gap-1 ${compact ? 'mb-0' : 'mb-1'}`}>
                <Star size={compact ? 7 : 12} className="fill-[#F59E0B] text-[#F59E0B]" />
                <span className={`font-semibold text-[#6F4E2A] ${compact ? 'text-[7px]' : 'text-xs'}`}>{product.rating > 0 ? product.rating.toFixed(1) : '4.5'}</span>
              </div>
              <div className={`flex items-center gap-1 text-[#6F4E2A] ${compact ? 'text-[8px]' : 'text-[13px]'}`}>
                <span className="price-display">{formatPrice(product.price, product.currency)}</span>
                {product.old_price && <span className={`text-[#9A7B5B] line-through ${compact ? 'text-[6px]' : 'text-xs'}`}>{formatPrice(product.old_price, product.currency)}</span>}
              </div>
            </div>
            {!compact && <div className={`text-right text-[#7A4F2D] ${compact ? 'text-[7px] leading-3' : 'text-[11px]'}`}>
              <div>{product.sold_count ? `${product.sold_count} sold` : 'Popular item'}</div>
              <div className={product.stock > 0 ? 'text-[#166534]' : 'text-[#991B1B]'}>{product.stock > 0 ? 'Available now' : 'Out of stock'}</div>
            </div>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
