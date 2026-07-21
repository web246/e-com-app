import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { formatPrice } from '@/lib/constants';

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

export default function FlashSale({ products = [] }) {
  const { h, m, s } = useCountdown();
  const flashItems = products.filter((p) => p.discount_percent > 0);

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
        {flashItems.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="bg-brown-light rounded-2xl overflow-hidden border border-[#D9D2CB]/40">
            <div className="aspect-square overflow-hidden">
              {p.thumbnail ? (
                <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-orange-50" />
              )}
            </div>
            <div className="p-2.5">
              <p className="price-display text-sm">{formatPrice(p.price, p.currency)}</p>
              {p.discount_percent > 0 && (
                <p className="text-[10px] text-[#541B1B] mt-1">-{p.discount_percent}% off</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
