import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import ProductGrid from '@/components/home/ProductGrid';
import { useWishlist } from '@/lib/useWishlist';

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <div className="min-h-screen bg-brown-light">
      <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-6">My Wishlist ({items.length})</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-brown-light flex items-center justify-center mx-auto mb-6">
              <Heart size={40} className="text-brand" />
            </div>
            <h2 className="font-display font-bold text-xl text-[#0A0F1E] mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 mb-6">Save items you love to find them here later.</p>
            <Link to="/" className="btn-primary inline-block px-8 py-3">Explore Products</Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
