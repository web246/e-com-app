import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Shirt, Smartphone, Monitor, Sofa, Gamepad2, Sparkles, Footprints, ShoppingBasket, UtensilsCrossed, Car, Heart, Dumbbell, Grid3X3 } from 'lucide-react';
import { enrichCategory } from '@/lib/constants';
import { fetchCategories } from '@/lib/api/catalogService';

const iconMap = { Cpu, Shirt, Smartphone, Monitor, Sofa, Gamepad2, Sparkles, Footprints, ShoppingBasket, UtensilsCrossed, Car, Heart, Dumbbell, Grid3X3 };

export default function CategoryStrip() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(cats.map(enrichCategory).slice(0, 12)))
      .catch(() => setCategories([]));
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon] || Grid3X3;
        return (
          <Link
            key={cat.slug || cat.id}
            to={`/categories/${cat.slug}`}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 w-14 sm:w-16 category-pill"
          >
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-105"
              style={{ background: `${cat.color}15` }}
            >
              <Icon size={18} style={{ color: cat.color }} />
            </div>
            <span className="text-[10px] font-medium text-[#5a463b] text-center leading-tight line-clamp-2">{cat.name}</span>
          </Link>
        );
      })}
      <Link to="/categories" className="flex flex-col items-center gap-1.5 flex-shrink-0 w-14 sm:w-16 category-pill">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-brown-light border border-[#D9D2CB]/70">
          <Grid3X3 size={18} className="text-[#4A2A1A]" />
        </div>
        <span className="text-[10px] font-medium text-[#4A2A1A] text-center leading-tight">More</span>
      </Link>
    </div>
  );
}
