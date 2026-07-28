import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BANNERS } from '@/lib/constants';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % BANNERS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const banner = BANNERS[current];

  return (
    <div className="relative w-full aspect-[16/7] sm:aspect-[16/5] lg:aspect-[16/4.5] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(74,42,26,0.12)] border border-[#E5DDD2] bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9))' }}
        >
          <img src={banner.image_url} alt={banner.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.05)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          <div className="relative h-full flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-8">
            <div className="mb-3 w-fit rounded-full border border-white/65 bg-[#FFF9F3]/95 px-3 py-1.5 shadow-[0_6px_18px_rgba(0,0,0,0.12)] backdrop-blur">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#7D2B2B]">{banner.badge_text}</span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-white mb-2 max-w-xs sm:max-w-md lg:max-w-lg leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{banner.title}</h2>
            <p className="text-white text-sm sm:text-[15px] mb-4 max-w-sm sm:max-w-md leading-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{banner.subtitle}</p>
            <button className="w-fit bg-[#7D2B2B] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-[0_10px_25px_rgba(125,43,43,0.25)] hover:scale-[1.02] transition-transform">
              Shop Now
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 right-6 flex gap-1.5">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-[#111111]' : 'w-1.5 bg-[#111111]/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
