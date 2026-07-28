import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Grid3X3, ShoppingCart, Package, User } from 'lucide-react';
import { useCart } from '@/lib/useCart';

const TABS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/categories', icon: Grid3X3, label: 'Categories' },
  { to: '/cart', icon: ShoppingCart, label: 'Cart' },
  { to: '/orders', icon: Package, label: 'Orders' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { itemCount } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pb-safe md:hidden">
      <div className="rounded-2xl shadow-lg border border-[#7D2B2B]/25 px-2 py-2 max-w-md mx-auto flex items-center justify-between relative bg-[#7D2B2B] text-[#F6EBDD]">
        {TABS.map(({ to, icon: Icon, label }) => {
          const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
          return (
            <Link key={to} to={to} className="relative flex flex-col items-center gap-0.5 flex-1 py-1.5">
              {active && (
                <motion.div
                  layoutId="bottomnav-active"
                  className="absolute -top-2 w-8 h-0.5 rounded-full bg-[#F6EBDD]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon size={20} strokeWidth={active ? 2.5 : 2} className={active ? 'text-[#F6EBDD]' : 'text-[#C8A37B]'} />
                {to === '/cart' && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#F6EBDD] text-[#4A2A1A] text-[9px] flex items-center justify-center font-bold">{itemCount}</span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-[#F6EBDD]' : 'text-[#C8A37B]'}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
