import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { PackageCheck, ChevronDown, MapPin } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { formatPrice } from '@/lib/constants';
import { fetchCustomerOrders, isCompletedOrder, orderStatusIndex } from '@/lib/api/orderService';

const STAGES = ['confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];

export default function OrdersCompleted() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isPendingActive = location.pathname === '/orders';
  const isCompletedActive = location.pathname === '/orders/completed';

  useEffect(() => {
    fetchCustomerOrders({ page: 1, page_size: 50 })
      .then(({ items }) => setOrders(items))
      .catch((err) => setError(err.message || 'Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  const completedOrders = orders.filter((order) => isCompletedOrder(order));

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-slate-500">Loading completed orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PageTransition>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-20 pb-32 md:pb-16">
          <div className="mb-4">
            <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
              <Link to="/orders" className={`flex-1 rounded-full px-3 py-2 text-center text-sm font-semibold transition-colors ${isPendingActive ? 'bg-brand text-white shadow-sm' : 'text-slate-600'}`}>
                Pending
              </Link>
              <Link to="/orders/completed" className={`flex-1 rounded-full px-3 py-2 text-center text-sm font-semibold transition-colors ${isCompletedActive ? 'bg-brand text-white shadow-sm' : 'text-slate-600'}`}>
                Completed
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-display font-bold text-xl text-[#0A0F1E]">Completed Orders</h1>
              <p className="text-[11px] text-slate-500">Finished purchases</p>
            </div>
          </div>

          {error && <div className="mb-3 rounded-lg bg-red-50 text-red-600 text-sm p-3">{error}</div>}

          {completedOrders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <PackageCheck size={32} className="mx-auto text-brand mb-3" />
              <p className="text-sm text-slate-600">No completed orders yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedOrders.map((order) => {
                const orderKey = order.id || order.order_number || 'order';
                const isOpen = expanded === orderKey;
                const stageIdx = Math.min(orderStatusIndex(order.status), STAGES.length - 1);
                const orderNumber = order.order_number || order.id;
                const orderDate = order.created_at || order.order_date;
                const total = order.total_amount ?? order.commerce_grand_total ?? 0;

                return (
                  <div key={orderKey} className="linet-card overflow-hidden">
                    <button onClick={() => setExpanded(isOpen ? null : orderKey)} className="w-full p-4 flex items-center justify-between text-left">
                      <div>
                        <p className="font-display font-bold text-sm text-[#0A0F1E]">Order #{orderNumber}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{orderDate ? new Date(orderDate).toLocaleDateString() : '—'} · {order.status?.replace(/_/g, ' ')}</p>
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
          )}
        </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
