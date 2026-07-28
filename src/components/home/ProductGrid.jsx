import ProductCard from '@/components/ui/ProductCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

export default function ProductGrid({ products, loading, cols = 4, compact = false }) {
  const colClass = compact
    ? 'grid-cols-2'
    : {
        2: 'grid-cols-2',
        3: 'grid-cols-2',
        4: 'grid-cols-2',
      }[cols] || 'grid-cols-2';

  if (loading) {
    return (
      <div className={`grid ${colClass} gap-1.5 sm:gap-2`}>
        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#BDBDBD]">No products found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${colClass} gap-1.5 sm:gap-2 items-start`}>
      {products.map(p => <ProductCard key={p.id} product={p} compact={compact} />)}
    </div>
  );
}
