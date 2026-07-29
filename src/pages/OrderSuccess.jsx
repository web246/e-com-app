import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Home } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { formatPrice } from '@/lib/constants';

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-brown-light flex items-center justify-center px-4 sm:px-5">
        <div className="text-center">
          <p className="text-slate-500 mb-4">No recent order found.</p>
          <Link to="/" className="btn-primary inline-block px-6 py-3">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-light">
      <PageTransition>
      <div className="max-w-md mx-auto px-4 sm:px-5 pt-32 pb-32 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={48} className="text-green-500" />
        </motion.div>
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-2">Order Placed!</h1>
        <p className="text-slate-500 mb-6">Thank you — your order has been confirmed.</p>

        <div className="linet-card p-5 text-left space-y-2 mb-8">
          <div className="flex justify-between text-sm"><span className="text-slate-400">Order Number</span><span className="font-bold text-[#0A0F1E]">{order.order_number}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-400">Total</span><span className="price-display">{formatPrice(order.total)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-400">Delivering to</span><span className="text-[#0A0F1E] font-medium">{order.address?.town}</span></div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate('/orders')} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
            <Package size={16} /> Track Order
          </button>
          <button onClick={() => navigate('/')} className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-sm text-slate-600 flex items-center justify-center gap-2">
            <Home size={16} /> Continue Shopping
          </button>
        </div>
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
