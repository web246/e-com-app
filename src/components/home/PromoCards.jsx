import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Gift, Truck, Tag, ArrowRight } from 'lucide-react';

const PROMOS = [
  { icon: Zap, title: 'Flash Deals', subtitle: 'Up to 50% off', color: '#E67A00', to: '/search?filter=discount' },
  { icon: Gift, title: 'New User Gift', subtitle: 'KSH 500 voucher', color: '#8B5CF6', to: '/search?filter=gift' },
  { icon: Truck, title: 'Free Shipping', subtitle: 'Orders over KSH 2,000', color: '#22C55E', to: '/search?filter=free_shipping' },
  { icon: Tag, title: 'Clearance', subtitle: 'Final markdowns', color: '#EF4444', to: '/search?filter=clearance' },
];

export default function PromoCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {PROMOS.map((promo, i) => {
        const Icon = promo.icon;
        return (
          <motion.div
            key={promo.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={promo.to}
              className="group flex h-full flex-col gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7D2B2B]/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200" style={{ background: `${promo.color}12` }}>
                  <Icon size={18} style={{ color: promo.color }} />
                </div>
                <ArrowRight size={16} className="text-slate-400 transition-colors group-hover:text-[#7D2B2B]" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-slate-900">{promo.title}</p>
                <p className="text-xs text-slate-500">{promo.subtitle}</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
