import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, MapPin } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { formatPrice } from '@/lib/constants';
import { fetchCustomerOrders, orderStatusIndex } from '@/lib/api/orderService';

const STAGES = ['confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomerOrders({ page: 1, page_size: 50 })
      .then(({ items }) => setOrders(items))
      .catch((err) => setError(err.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brown-light flex items-center justify-center">
        <p className="text-slate-500">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-brown-light">
        <PageTransition>
        <div className="max-w-xl mx-auto px-4 pt-32 pb-32 text-center">
          <div className="w-24 h-24 rounded-full bg-brown-light flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-brand" />
          </div>
          <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-2">No orders yet</h1>
          <p className="text-slate-500">{error || 'Your order history will show up here once you check out.'}</p>
        </div>
        </PageTransition>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-light">
      <PageTransition>
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-6">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order, idx) => {
            const isOpen = expanded === idx;
            const stageIdx = Math.min(orderStatusIndex(order.status), STAGES.length - 1);
            const orderNumber = order.order_number || order.id;
            const orderDate = order.created_at || order.order_date;
            const total = order.total_amount ?? order.commerce_grand_total ?? 0;

            return (
              <div key={order.id || orderNumber} className="linet-card overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : idx)} className="w-full p-4 flex items-center justify-between text-left">
                  <div>
                    <p className="font-display font-bold text-sm text-[#0A0F1E]">Order #{orderNumber}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {orderDate ? new Date(orderDate).toLocaleDateString() : '—'} · {order.status?.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="price-display text-sm">{formatPrice(total, order.currency)}</span>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100 px-4 pb-4">
                      <div className="flex items-center gap-1 mt-4 mb-3 overflow-x-auto">
                        {STAGES.map((stage, si) => (
                          <div key={stage} className={`flex-shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${si <= stageIdx ? 'bg-brand text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {stage.replace(/_/g, ' ')}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start gap-2 text-sm text-slate-600">
                        <MapPin size={14} className="text-brand mt-0.5 flex-shrink-0" />
                        <span>{order.delivery_contact_name}, {order.delivery_contact_phone}</span>
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
