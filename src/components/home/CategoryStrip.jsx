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
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon] || Grid3X3;
        return (
          <Link
            key={cat.slug || cat.id}
            to={`/categories/${cat.slug}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 w-16 sm:w-20 category-pill"
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform hover:scale-105"
              style={{ background: `${cat.color}15` }}
            >
              <Icon size={24} style={{ color: cat.color }} />
            </div>
            <span className="text-xs font-medium text-[#5a463b] text-center leading-tight">{cat.name}</span>
          </Link>
        );
      })}
      <Link to="/categories" className="flex flex-col items-center gap-2 flex-shrink-0 w-16 sm:w-20 category-pill">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-brown-light border border-[#D9D2CB]/70">
          <Grid3X3 size={24} className="text-brand" />
        </div>
        <span className="text-xs font-medium text-brown text-center leading-tight">More</span>
      </Link>
    </div>
  );
}
