import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Shirt, Smartphone, Monitor, Sofa, Gamepad2, Sparkles, Footprints, ShoppingBasket, UtensilsCrossed, Car, Heart, Dumbbell, Grid3X3 } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { enrichCategory } from '@/lib/constants';
import { fetchCategories } from '@/lib/api/catalogService';

const iconMap = { Cpu, Shirt, Smartphone, Monitor, Sofa, Gamepad2, Sparkles, Footprints, ShoppingBasket, UtensilsCrossed, Car, Heart, Dumbbell, Grid3X3 };
const GENERAL_CATEGORY = { id: 'general', slug: 'general', name: 'General', icon: 'Grid3X3', color: '#64748B' };

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories([GENERAL_CATEGORY, ...cats.map(enrichCategory).filter((cat) => cat.slug !== 'general')]))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageTransition>
      <div className="max-w-5xl mx-auto px-5 sm:px-6 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-1">All Categories</h1>
        <p className="text-slate-500 mb-6">Discover products across every category</p>

        {loading ? (
          <p className="text-slate-500 text-sm">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-slate-500 text-sm">No categories available yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Grid3X3;
              return (
                <motion.div
                  key={cat.slug || cat.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="linet-card rounded-2xl p-3 flex flex-col items-center text-center gap-2 hydro-shadow-hover group"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${cat.color}15` }}
                    >
                      <Icon size={22} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xs text-[#0A0F1E] line-clamp-2">{cat.name}</h3>
                      <p className="text-xs text-slate-500">Explore →</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
