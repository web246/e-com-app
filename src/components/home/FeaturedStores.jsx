import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { STORES } from '@/lib/constants';

export default function FeaturedStores() {
  return (
    <section>
      <SectionHeader title="Featured Stores" subtitle="Shop from trusted, verified sellers" badge="⭐ Handpicked" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {STORES.map((store, i) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="linet-card p-4 flex flex-col items-center text-center gap-2 hydro-shadow-hover"
          >
            <img src={store.logo_url} alt={store.name} className="w-14 h-14 rounded-2xl object-cover" />
            <div className="flex items-center gap-1">
              <p className="font-display font-semibold text-sm text-[#0A0F1E]">{store.name}</p>
              {store.verified && <BadgeCheck size={14} className="text-[#005BB5]" />}
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs text-slate-500">{store.rating} · {(store.followers_count / 1000).toFixed(1)}k followers</span>
            </div>
            <button className="text-xs font-semibold text-[#005BB5] border border-[#005BB5]/30 rounded-full px-3 py-1 mt-1 hover:bg-blue-50">
              View Store
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
