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
    <motion.div whileHover={{ y: -4 }} className="linet-card overflow-hidden hydro-shadow-hover group border border-[#8B5E3B]/25">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-[#F6EBDD] overflow-hidden">
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#7A4F2D] text-sm">No image</div>
          )}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount_percent > 0 && (
              <span className="bg-[#A15B2A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{product.discount_percent}%</span>
            )}
            {product.is_best_seller && (
              <span className="bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full">🏆 Best Seller</span>
            )}
            {product.is_new_arrival && (
              <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>
            )}
          </div>
          <button onClick={handleWishlist} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#F7F3EF]/95 flex items-center justify-center shadow-sm">
            <Heart size={15} className={wishlisted ? 'fill-[#A15B2A] text-[#A15B2A]' : 'text-brown'} />
          </button>
          <button onClick={handleAdd} className="absolute bottom-2 right-2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus size={16} className="text-white" />
          </button>
        </div>
        <div className="p-3">
          <p className="text-[11px] text-[#8A5A35] mb-0.5">{product.store_name}</p>
          <h3 className="font-medium text-sm text-[#3F2415] line-clamp-2 leading-snug mb-1.5 min-h-[2.5em]">{product.name}</h3>
          {product.category && (
            <div className="text-xs text-[#7A4F2D] mb-1">{product.category}</div>
          )}
          {product.description && (
            <p className="text-[12px] text-[#6B4A2E] line-clamp-2 mb-2">{product.description}</p>
          )}
          <div className="flex items-center gap-1 mb-1.5">
            {product.rating > 0 && (
              <>
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-[11px] text-[#7A4F2D]">{product.rating}</span>
              </>
            )}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="price-display text-sm">{formatPrice(product.price, product.currency)}</span>
            {product.old_price && <span className="text-xs text-[#9A7B5B] line-through">{formatPrice(product.old_price, product.currency)}</span>}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-[#6B4A2E]">
            <span>{product.sold_count ? `${product.sold_count} sold` : '—'}</span>
            <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
