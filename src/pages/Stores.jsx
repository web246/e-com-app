import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, BadgeCheck, Store } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { fetchStores } from '@/lib/api/catalogService';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores({ page: 1, page_size: 100 })
      .then(({ items }) => setStores(items))
      .catch(() => setStores([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageTransition>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-24 pb-32 md:pb-16">
          <div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display font-bold text-2xl text-[#0A0F1E]">All Stores</h1>
              <p className="text-slate-500 text-sm mt-1">Browse every verified store available on Salam Exporters.</p>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">
              {loading ? 'Loading...' : `${stores.length} stores`}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm h-44 animate-pulse" />
              ))}
            </div>
          ) : stores.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
              No stores available right now.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {stores.map((store, i) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    {store.logo_url ? (
                      <img src={store.logo_url} alt={store.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-brand font-bold">
                        {store.name?.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-display font-semibold text-sm text-slate-900 truncate">{store.name}</p>
                        {store.verified && <BadgeCheck size={14} className="text-[#7D2B2B] flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{store.city || store.category || 'Verified seller'}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-xs text-slate-500">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span>{store.rating || '4.8'} · {store.city || 'Kenya'}</span>
                  </div>

                  <Link
                    to={`/store/${store.slug}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Store size={14} /> View Store
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
