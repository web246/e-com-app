import ProductCard from '@/components/ui/ProductCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

export default function ProductGrid({ products, loading, cols = 4 }) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  }[cols] || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  if (loading) {
    return (
      <div className={`grid ${colClass} gap-3 sm:gap-4`}>
        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400">No products found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${colClass} gap-3 sm:gap-4`}>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
