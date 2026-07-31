import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Store, Package, Tag } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { formatPrice } from '@/lib/constants';
import { fetchStores } from '@/lib/api/catalogService';

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'sellers', label: 'Sellers', icon: Store },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'coupons', label: 'Coupons', icon: Tag },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores({ page: 1, page_size: 20 }).then(({ items }) => setStores(items)).catch(() => setStores([]));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-6">Admin Dashboard</h1>

        <div className="flex gap-6">
          <aside className="w-52 flex-shrink-0 hidden md:block">
            <div className="linet-card p-2 sticky top-24">
              {NAV.map(n => (
                <button
                  key={n.id}
                  onClick={() => setTab(n.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${tab === n.id ? 'bg-brown-light text-brand' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <n.icon size={16} /> {n.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-5 md:hidden">
              {NAV.map(n => (
                <button key={n.id} onClick={() => setTab(n.id)} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${tab === n.id ? 'bg-brand text-white border-brand' : 'bg-white text-slate-600 border-slate-200'}`}>
                  {n.label}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Total GMV', value: formatPrice(4820000) },
                  { label: 'Active Sellers', value: stores.length },
                  { label: 'Total Users', value: '18,204' },
                  { label: 'Pending Approvals', value: '3' },
                ].map(s => (
                  <div key={s.label} className="linet-card p-4">
                    <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                    <p className="font-display font-bold text-lg text-[#0A0F1E]">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'sellers' && (
              <div className="linet-card p-5">
                <h2 className="font-display font-bold text-base text-[#0A0F1E] mb-4">Registered Sellers</h2>
                <div className="space-y-3">
                  {stores.map(s => (
                    <div key={s.id} className="flex items-center gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      {s.logo_url ? (
                        <img src={s.logo_url} className="w-11 h-11 rounded-xl object-cover" alt="" />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-brown-light flex items-center justify-center text-brand font-bold">{s.name?.charAt(0)}</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0A0F1E]">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.category} · {s.rating}★</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.verified ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                        {s.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {['users', 'products', 'coupons'].includes(tab) && (
              <div className="linet-card p-5 text-center py-16">
                <p className="text-slate-500 text-sm capitalize">{tab} management coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
