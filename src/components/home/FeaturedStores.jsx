import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { fetchStores } from '@/lib/api/catalogService';

export default function FeaturedStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores({ page: 1, page_size: 4 })
      .then(({ items }) => setStores(items))
      .catch(() => setStores([]));
  }, []);

  if (stores.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Featured Stores" subtitle="Shop from trusted, verified sellers" badge="⭐ Handpicked" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stores.map((store, i) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="linet-card p-4 flex flex-col items-center text-center gap-2 hydro-shadow-hover"
          >
            {store.logo_url ? (
              <img src={store.logo_url} alt={store.name} className="w-14 h-14 rounded-2xl object-cover" />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-brown-light border border-[#D9D2CB]/70 flex items-center justify-center text-brand font-bold">
                {store.name?.charAt(0)}
              </div>
            )}
            <div className="flex items-center gap-1">
              <p className="font-display font-semibold text-sm text-brown">{store.name}</p>
              {store.verified && <BadgeCheck size={14} className="text-brand" />}
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs text-[#7a675a]">{store.rating} · {store.city || store.category}</span>
            </div>
            <Link
              to={`/store/${store.slug}`}
              className="text-xs font-semibold text-[#4A2A1A] border border-[#D9B48A]/60 rounded-full px-3 py-1 mt-1 hover:bg-brown-light transition-all"
            >
              View Store
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
