import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, Bell, Moon, Sun, LogOut, Store, Shield, ChevronRight } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/lib/AuthContext';
import { useTheme } from '@/lib/useTheme';

const MENU = [
  { icon: Package, label: 'My Orders', to: '/orders' },
  { icon: Heart, label: 'Wishlist', to: '/wishlist' },
  { icon: MapPin, label: 'Delivery Addresses', to: '/profile' },
  { icon: Bell, label: 'Notifications', to: '/orders' },
  { icon: Store, label: 'Seller Dashboard', to: '/seller' },
  { icon: Shield, label: 'Admin Panel', to: '/admin' },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <TopBar />
      <PageTransition>
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-32 md:pb-16">
        <div className="linet-card p-6 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0">
            <User size={28} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-[#0A0F1E]">{user?.full_name || 'Guest User'}</h1>
            <p className="text-slate-500 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="linet-card divide-y divide-slate-100 mb-6">
          {MENU.map(item => (
            <Link key={item.label} to={item.to} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors">
              <item.icon size={18} className="text-[#005BB5]" />
              <span className="flex-1 text-sm font-medium text-[#0A0F1E]">{item.label}</span>
              <ChevronRight size={16} className="text-slate-300" />
            </Link>
          ))}
          <button onClick={toggle} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors">
            {dark ? <Sun size={18} className="text-[#005BB5]" /> : <Moon size={18} className="text-[#005BB5]" />}
            <span className="flex-1 text-sm font-medium text-[#0A0F1E] text-left">{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-red-200 text-red-500 font-semibold text-sm">
          <LogOut size={16} /> Log Out
        </button>
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
