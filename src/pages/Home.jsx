import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import PullToRefresh from '@/components/ui/PullToRefresh';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryStrip from '@/components/home/CategoryStrip';
import PromoCards from '@/components/home/PromoCards';
import FeaturedStores from '@/components/home/FeaturedStores';
import FlashSale from '@/components/home/FlashSale';
import ProductGrid from '@/components/home/ProductGrid';
import SectionHeader from '@/components/ui/SectionHeader';
import { fetchProducts } from '@/lib/api/catalogService';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { items } = await fetchProducts({ page: 1, page_size: 20 });
      setProducts(items);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const trending = products;
  const bestSellers = [...products].reverse();
  const newArrivals = products.slice(0, 4);
  const flashProducts = products.filter((p) => p.discount_percent > 0).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <TopBar />
      <PageTransition>

      <div className="relative pt-28 pb-4 sm:pb-6 bg-gradient-to-b from-[#003D8F] via-[#005BB5] to-[#EFF6FF]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
          <HeroBanner />
        </div>
      </div>

      <PullToRefresh onRefresh={loadProducts}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 space-y-10 sm:space-y-16 pb-28 md:pb-16">
        {error && (
          <div className="rounded-xl bg-red-50 text-red-600 text-sm p-4 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={loadProducts} className="font-semibold underline">Retry</button>
          </div>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SectionHeader title="Shop by Category" viewAllTo="/categories" />
          <CategoryStrip />
        </motion.section>

        <section>
          <SectionHeader title="Today's Best Deals" subtitle="Curated offers just for you" badge="🔥 Hot Right Now" />
          <PromoCards />
        </section>

        <FlashSale products={flashProducts} />

        <section>
          <SectionHeader title="Trending Now" subtitle="What everyone's buying this week" viewAllTo="/search?sort=trending" badge="📈 Trending" />
          <ProductGrid products={trending} loading={loading} />
          {!loading && products.length === 0 && (
            <p className="text-center text-slate-500 text-sm py-8">No products available yet. Check back soon.</p>
          )}
        </section>

        <FeaturedStores />

        <section>
          <SectionHeader title="Best Sellers" subtitle="Trusted favourites across Kenya" viewAllTo="/search?filter=best_seller" badge="🏆 Top Rated" />
          <ProductGrid products={bestSellers.slice(0, 8)} loading={loading} cols={4} />
        </section>

        <section>
          <SectionHeader title="New Arrivals" subtitle="Fresh drops added today" viewAllTo="/search?filter=new_arrival" />
          <ProductGrid products={newArrivals} loading={loading} cols={4} />
        </section>

        <section>
          <SectionHeader title="Popular Brands" subtitle="Authentic products from top global brands" />
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {['Apple', 'Samsung', 'Nike', 'Sony', 'LG', 'Dyson'].map((brand, i) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="linet-card flex items-center justify-center p-4 h-20 cursor-pointer hydro-shadow-hover"
              >
                <span className="font-display font-bold text-slate-600 text-sm">{brand}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      </PullToRefresh>
      </PageTransition>

      <BottomNav />
    </div>
  );
}
