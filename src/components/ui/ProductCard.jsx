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

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, 1);
    toast({ title: 'Added to cart', description: product.name });
  };

  return (
    <motion.div whileHover={{ y: -4 }} className="linet-card overflow-hidden hydro-shadow-hover group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-blue-50 overflow-hidden">
          <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount_percent > 0 && (
              <span className="bg-[#E67A00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{product.discount_percent}%</span>
            )}
            {product.is_best_seller && (
              <span className="bg-amber-400 text-[#0A0F1E] text-[10px] font-bold px-2 py-0.5 rounded-full">🏆 Best Seller</span>
            )}
            {product.is_new_arrival && (
              <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>
            )}
          </div>
          <button onClick={handleWishlist} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
            <Heart size={15} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'} />
          </button>
          <button onClick={handleAdd} className="absolute bottom-2 right-2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus size={16} className="text-white" />
          </button>
        </div>
        <div className="p-3">
          <p className="text-[11px] text-slate-400 mb-0.5">{product.store_name}</p>
          <h3 className="font-medium text-sm text-[#0A0F1E] line-clamp-2 leading-snug mb-1.5 min-h-[2.5em]">{product.name}</h3>
          <div className="flex items-center gap-1 mb-1.5">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs text-slate-500">{product.rating} ({product.reviews_count})</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="price-display text-sm">{formatPrice(product.price, product.currency)}</span>
            {product.old_price && <span className="text-xs text-slate-400 line-through">{formatPrice(product.old_price, product.currency)}</span>}
          </div>
          {product.free_shipping && <span className="text-[10px] text-green-600 font-semibold">Free Shipping</span>}
        </div>
      </Link>
    </motion.div>
  );
}
