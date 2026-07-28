import { motion } from 'framer-motion';
import { Zap, Gift, Truck, Tag } from 'lucide-react';

const PROMOS = [
  { icon: Zap, title: 'Flash Deals', subtitle: 'Up to 50% off', color: '#E67A00' },
  { icon: Gift, title: 'New User Gift', subtitle: 'KSH 500 voucher', color: '#8B5CF6' },
  { icon: Truck, title: 'Free Shipping', subtitle: 'Orders over KSH 2,000', color: '#22C55E' },
  { icon: Tag, title: 'Clearance', subtitle: 'Final markdowns', color: '#EF4444' },
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
            className="p-4 flex flex-col gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${promo.color}15` }}>
              <Icon size={18} style={{ color: promo.color }} />
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-brown">{promo.title}</p>
              <p className="text-xs text-[#6f5848]">{promo.subtitle}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
