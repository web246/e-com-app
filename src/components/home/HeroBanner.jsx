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
    <div className="relative w-full aspect-[16/8] sm:aspect-[16/6] rounded-3xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${banner.gradient_from}, ${banner.gradient_to})` }}
        >
          <img src={banner.image_url} alt={banner.title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="relative h-full flex flex-col justify-center px-6 sm:px-12">
            <span className="inline-block w-fit text-xs font-bold text-white bg-white/20 px-3 py-1 rounded-full mb-3">{banner.badge_text}</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-2 max-w-xs sm:max-w-md">{banner.title}</h2>
            <p className="text-white/85 text-sm sm:text-base mb-4 max-w-xs">{banner.subtitle}</p>
            <button className="w-fit bg-white text-[#0A0F1E] font-semibold text-sm px-5 py-2.5 rounded-xl hover:scale-105 transition-transform">
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
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
