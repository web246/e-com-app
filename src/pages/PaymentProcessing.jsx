import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CreditCard, CheckCircle2 } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { formatPrice, PAYMENT_METHODS } from '@/lib/constants';

export default function PaymentProcessing() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const order = state?.order;
  const paymentMethod = PAYMENT_METHODS.find((p) => p.id === order?.payment);

  useEffect(() => {
    if (!order) {
      navigate('/checkout', { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setStatus('confirmed');
      const nextTimer = setTimeout(() => {
        navigate('/order-success', { state: { order } });
      }, 1200);
      return () => clearTimeout(nextTimer);
    }, 2400);

    return () => clearTimeout(timer);
  }, [navigate, order]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-white">
      <PageTransition>
        <div className="max-w-md mx-auto px-4 sm:px-5 pt-28 pb-32 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="w-24 h-24 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6"
          >
            {status === 'processing' ? (
              <Loader2 className="animate-spin text-brand" size={44} />
            ) : (
              <CheckCircle2 size={44} className="text-green-600" />
            )}
          </motion.div>

          <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-2">
            {status === 'processing' ? 'Processing Payment' : 'Payment Confirmed'}
          </h1>
          <p className="text-slate-500 mb-6">
            {status === 'processing'
              ? `Completing your ${paymentMethod?.name || 'payment'} securely.`
              : 'Your payment is complete. Finalizing your order now.'}
          </p>

          <div className="linet-card p-5 text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm"><span className="text-slate-400">Payment Method</span><span className="font-medium text-[#0A0F1E]">{paymentMethod?.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Order Total</span><span className="font-bold text-[#0A0F1E]">{formatPrice(order.total)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-400">Deliver To</span><span className="text-[#0A0F1E]">{order.address?.town}</span></div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => navigate('/order-success', { state: { order } })} className="btn-primary flex-1 py-3">
              View Order
            </button>
            <button onClick={() => navigate('/')} className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-sm text-slate-600">
              Continue Shopping
            </button>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
