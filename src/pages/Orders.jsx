import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, MapPin } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { formatPrice } from '@/lib/constants';

const STAGES = ['confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('dm_orders') || '[]'));
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#EFF6FF]">
        <TopBar />
        <PageTransition>
        <div className="max-w-xl mx-auto px-4 pt-32 pb-32 text-center">
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-[#005BB5]" />
          </div>
          <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-2">No orders yet</h1>
          <p className="text-slate-500">Your order history will show up here once you check out.</p>
        </div>
        </PageTransition>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <TopBar />
      <PageTransition>
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-6">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order, idx) => {
            const isOpen = expanded === idx;
            const stageIdx = 2;
            return (
              <div key={order.order_number} className="linet-card overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : idx)} className="w-full p-4 flex items-center justify-between text-left">
                  <div>
                    <p className="font-display font-bold text-sm text-[#0A0F1E]">Order #{order.order_number}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{new Date(order.date).toLocaleDateString()} · {order.items?.length} item(s)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="price-display text-sm">{formatPrice(order.total)}</span>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <div className="flex items-center justify-between mb-4 mt-2">
                        {STAGES.map((s, i) => (
                          <div key={s} className="flex-1 flex flex-col items-center relative">
                            <div className={`w-3 h-3 rounded-full z-10 ${i <= stageIdx ? 'bg-[#005BB5]' : 'bg-slate-200'}`} />
                            {i < STAGES.length - 1 && <div className={`absolute top-1.5 left-1/2 w-full h-0.5 ${i < stageIdx ? 'bg-[#005BB5]' : 'bg-slate-200'}`} />}
                            <span className="text-[9px] text-slate-400 mt-1.5 capitalize text-center">{s.replace('_', ' ')}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-500 mb-3">
                        <MapPin size={13} className="mt-0.5 flex-shrink-0" />
                        <span>{order.address?.name}, {order.address?.area}, {order.address?.town}</span>
                      </div>
                      <div className="space-y-2">
                        {order.items?.map(it => (
                          <div key={it.key} className="flex items-center gap-2 text-sm">
                            <img src={it.product.thumbnail} className="w-10 h-10 rounded-lg object-cover" alt="" />
                            <span className="flex-1 text-[#0A0F1E] line-clamp-1">{it.product.name}</span>
                            <span className="text-slate-400">×{it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
