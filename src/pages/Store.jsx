import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, MapPin } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import ProductGrid from '@/components/home/ProductGrid';
import { fetchStoreBySlug, fetchProducts } from '@/lib/api/catalogService';
import { formatPrice } from '@/lib/constants';

export default function Store() {
  const { slug } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [storeData, productData] = await Promise.all([
          fetchStoreBySlug(slug),
          fetchProducts({ page: 1, page_size: 20, vendor_slug: slug }),
        ]);

        if (!storeData) {
          setError('Store not found.');
          setStore(null);
          setProducts([]);
          return;
        }

        setStore(storeData);
        setProducts(productData.items || []);
      } catch (err) {
        setError(err.message || 'Failed to load store.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brown-light flex items-center justify-center">
        <p className="text-slate-500">Loading store...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brown-light flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-slate-500">{error}</p>
        <Link to="/" className="btn-primary px-5 py-2">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-light">
      <PageTransition>
        <div className="relative overflow-hidden bg-white pb-10">
          <div className="h-64 bg-slate-900/95">
            {store?.banner_url ? (
              <img src={store.banner_url} alt={store.name} className="w-full h-full object-cover opacity-80" />
            ) : (
              <div className="w-full h-full bg-slate-700" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/25 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="-mt-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-4 rounded-[32px] bg-white p-4 shadow-xl ring-1 ring-slate-200">
                <div className="w-24 h-24 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                  {store.logo_url ? (
                    <img src={store.logo_url} alt={store.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-200 text-3xl font-bold text-slate-700">
                      {store.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Store</p>
                  <h1 className="font-display text-3xl font-bold text-[#111827]">{store.name}</h1>
                  <p className="mt-2 text-sm text-slate-500 max-w-xl">{store.description || 'Curated store collection with the best products for your needs.'}</p>
                </div>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                <ArrowLeft size={16} /> Back to home
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Rating</p>
                <div className="mt-3 flex items-center gap-2 text-xl font-semibold text-slate-900">
                  <Star size={20} className="text-amber-400" />
                  {store.rating?.toFixed(1) || '4.5'}
                </div>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Location</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                  <MapPin size={16} className="text-slate-500" />
                  {store.city ? `${store.city}, ${store.country}` : store.country || 'Unknown'}
                </div>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Category</p>
                <p className="mt-3 text-sm font-semibold text-slate-900">{store.category || 'General'}</p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Followers</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">{store.followers_count || '1.2k'}</p>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Store products</p>
                  <h2 className="font-display text-2xl font-bold text-[#111827]">Shop directly from this store</h2>
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">{products.length} items</div>
              </div>
              <div className="mt-5">
                <ProductGrid products={products} loading={false} cols={4} />
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
