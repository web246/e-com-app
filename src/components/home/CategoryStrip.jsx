import { Link } from 'react-router-dom';
import { Cpu, Shirt, Smartphone, Monitor, Sofa, Gamepad2, Sparkles, Footprints, ShoppingBasket, UtensilsCrossed, Car, Heart, Dumbbell, Grid3X3 } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

const iconMap = { Cpu, Shirt, Smartphone, Monitor, Sofa, Gamepad2, Sparkles, Footprints, ShoppingBasket, UtensilsCrossed, Car, Heart, Dumbbell, Grid3X3 };

export default function CategoryStrip() {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
      {CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon] || Grid3X3;
        return (
          <Link
            key={cat.slug}
            to={cat.slug === 'more' ? '/categories' : `/categories/${cat.slug}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 w-16 sm:w-20 category-pill"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform hover:scale-105"
              style={{ background: `${cat.color}15` }}
            >
              <Icon size={24} style={{ color: cat.color }} />
            </div>
            <span className="text-xs font-medium text-slate-600 text-center leading-tight">{cat.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
