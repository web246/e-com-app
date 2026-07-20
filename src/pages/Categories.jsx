import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Shirt, Smartphone, Monitor, Sofa, Gamepad2, Sparkles, Footprints, ShoppingBasket, UtensilsCrossed, Car, Heart, Dumbbell, Grid3X3 } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { enrichCategory } from '@/lib/constants';
import { fetchCategories } from '@/lib/api/catalogService';

const iconMap = { Cpu, Shirt, Smartphone, Monitor, Sofa, Gamepad2, Sparkles, Footprints, ShoppingBasket, UtensilsCrossed, Car, Heart, Dumbbell, Grid3X3 };

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(cats.map(enrichCategory)))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <TopBar />
      <PageTransition>
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-3xl text-[#0A0F1E] mb-2">All Categories</h1>
        <p className="text-slate-500 mb-10">Discover products across every category</p>

        {loading ? (
          <p className="text-slate-500 text-sm">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-slate-500 text-sm">No categories available yet.</p>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
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
                    className="linet-card p-6 flex flex-col items-center text-center gap-4 hydro-shadow-hover group"
                  >
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${cat.color}15` }}
                    >
                      <Icon size={34} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[#0A0F1E] mb-1">{cat.name}</h3>
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
