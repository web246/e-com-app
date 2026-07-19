import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { SAMPLE_PRODUCTS, formatPrice } from '@/lib/constants';

function useCountdown() {
  const [time, setTime] = useState(3 * 3600 + 24 * 60 + 15);
  useEffect(() => {
    const t = setInterval(() => setTime(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(time / 3600)).padStart(2, '0');
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');
  return { h, m, s };
}

export default function FlashSale() {
  const { h, m, s } = useCountdown();
  const flashItems = SAMPLE_PRODUCTS.filter(p => p.is_flash_sale);

  if (flashItems.length === 0) return null;

  return (
    <section className="rounded-3xl gradient-accent p-5 sm:p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Zap size={22} className="text-white fill-white" />
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">Flash Sale</h2>
        </div>
        <div className="flex items-center gap-1 text-white font-mono font-bold text-sm bg-black/20 rounded-full px-3 py-1.5">
          <span>{h}</span>:<span>{m}</span>:<span>{s}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {flashItems.map(p => {
          const soldPct = Math.min(95, Math.round((1 - p.flash_sale_stock / 50) * 100));
          return (
            <Link key={p.id} to={`/product/${p.id}`} className="bg-white rounded-2xl overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-2.5">
                <p className="price-display text-sm">{formatPrice(p.price, p.currency)}</p>
                <div className="mt-1.5 h-1.5 bg-orange-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E67A00] rounded-full" style={{ width: `${soldPct}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{p.flash_sale_stock} left</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
