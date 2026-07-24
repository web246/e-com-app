import { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingBag, TrendingUp, Settings, Plus } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { formatPrice } from '@/lib/constants';
import { fetchProducts } from '@/lib/api/catalogService';

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const REVENUE = [12, 18, 14, 22, 19, 28, 24];

export default function SellerDashboard() {
  const [tab, setTab] = useState('overview');
  const [myProducts, setMyProducts] = useState([]);
  const maxRev = Math.max(...REVENUE);

  useEffect(() => {
    fetchProducts({ page: 1, page_size: 4 }).then(({ items }) => setMyProducts(items)).catch(() => setMyProducts([]));
  }, []);

  return (
    <div className="min-h-screen bg-brown-light">
      <TopBar />
      <PageTransition>
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-6">Seller Dashboard</h1>

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
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Revenue', value: formatPrice(184500) },
                    { label: 'Orders', value: '246' },
                    { label: 'Products', value: myProducts.length },
                    { label: 'Rating', value: '4.7 ★' },
                  ].map(s => (
                    <div key={s.label} className="linet-card p-4">
                      <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                      <p className="font-display font-bold text-lg text-[#0A0F1E]">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div className="linet-card p-5 mb-6">
                  <h2 className="font-display font-bold text-base text-[#0A0F1E] mb-4">Weekly Revenue (KSH '000)</h2>
                  <div className="flex items-end gap-3 h-40">
                    {REVENUE.map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full rounded-t-lg gradient-primary" style={{ height: `${(v / maxRev) * 100}%` }} />
                        <span className="text-[10px] text-slate-400">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === 'products' && (
              <div className="linet-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-base text-[#0A0F1E]">My Products</h2>
                  <button className="btn-primary py-2 px-4 text-sm flex items-center gap-1"><Plus size={14} /> Add Product</button>
                </div>
                <div className="space-y-3">
                  {myProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                      <img src={p.thumbnail} className="w-12 h-12 rounded-lg object-cover" alt="" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#0A0F1E] line-clamp-1">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.stock} in stock</p>
                      </div>
                      <span className="price-display text-sm">{formatPrice(p.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div className="linet-card p-5 text-center py-16">
                <ShoppingBag size={36} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500 text-sm">Incoming orders will appear here.</p>
              </div>
            )}

            {tab === 'analytics' && (
              <div className="linet-card p-5 text-center py-16">
                <TrendingUp size={36} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500 text-sm">Detailed analytics coming soon.</p>
              </div>
            )}

            {tab === 'settings' && (
              <div className="linet-card p-5 text-center py-16">
                <Settings size={36} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500 text-sm">Store settings coming soon.</p>
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
