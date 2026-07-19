import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, Truck, CreditCard, ClipboardCheck } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/lib/useCart';
import { formatPrice, PAYMENT_METHODS, DELIVERY_METHODS } from '@/lib/constants';

const STEPS = [
  { id: 1, label: 'Address', icon: MapPin },
  { id: 2, label: 'Delivery', icon: Truck },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Review', icon: ClipboardCheck },
];

export default function Checkout() {
  const { items, subtotal, clearCart, coupon } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: '', phone: '', area: '', town: '', county: '', instructions: '' });
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('mpesa');
  const [placing, setPlacing] = useState(false);

  const deliveryMethod = DELIVERY_METHODS.find(d => d.id === delivery);
  const discount = coupon ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + (deliveryMethod?.fee || 0) - discount;

  const canContinue = () => {
    if (step === 1) return address.name && address.phone && address.area && address.town;
    return true;
  };

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1200));
    const order = {
      order_number: 'DM' + Math.floor(100000 + Math.random() * 900000),
      items, total, address, delivery, payment, date: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem('dm_orders') || '[]');
    localStorage.setItem('dm_orders', JSON.stringify([order, ...existing]));
    clearCart();
    setPlacing(false);
    navigate('/order-success', { state: { order } });
  };

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <TopBar />
      <PageTransition>
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-6">Checkout</h1>

        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s.id ? 'gradient-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {step > s.id ? <Check size={16} /> : <s.icon size={15} />}
                </div>
                <span className={`text-[10px] font-medium ${step >= s.id ? 'text-[#005BB5]' : 'text-slate-400'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-1 rounded-full ${step > s.id ? 'bg-[#005BB5]' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <div className="linet-card p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="font-display font-bold text-lg text-[#0A0F1E]">Delivery Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><Label>Full Name</Label><Input value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} placeholder="Jane Wanjiru" /></div>
                  <div className="space-y-1.5"><Label>Phone Number</Label><Input value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} placeholder="0712 345 678" /></div>
                  <div className="space-y-1.5"><Label>Area / Estate</Label><Input value={address.area} onChange={e => setAddress(a => ({ ...a, area: e.target.value }))} placeholder="Kilimani" /></div>
                  <div className="space-y-1.5"><Label>Town</Label><Input value={address.town} onChange={e => setAddress(a => ({ ...a, town: e.target.value }))} placeholder="Nairobi" /></div>
                  <div className="space-y-1.5"><Label>County</Label><Input value={address.county} onChange={e => setAddress(a => ({ ...a, county: e.target.value }))} placeholder="Nairobi County" /></div>
                  <div className="space-y-1.5"><Label>Delivery Instructions (optional)</Label><Input value={address.instructions} onChange={e => setAddress(a => ({ ...a, instructions: e.target.value }))} placeholder="Gate code, landmark..." /></div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                <h2 className="font-display font-bold text-lg text-[#0A0F1E] mb-2">Delivery Method</h2>
                {DELIVERY_METHODS.map(d => (
                  <button key={d.id} onClick={() => setDelivery(d.id)} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-colors ${delivery === d.id ? 'border-[#005BB5] bg-blue-50' : 'border-slate-200'}`}>
                    <div>
                      <p className="font-semibold text-sm text-[#0A0F1E]">{d.name}</p>
                      <p className="text-xs text-slate-500">{d.eta}</p>
                    </div>
                    <span className="font-bold text-sm text-[#005BB5]">{d.fee === 0 ? 'Free' : formatPrice(d.fee)}</span>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                <h2 className="font-display font-bold text-lg text-[#0A0F1E] mb-2">Payment Method</h2>
                {PAYMENT_METHODS.map(p => (
                  <button key={p.id} onClick={() => setPayment(p.id)} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-colors ${payment === p.id ? 'border-[#005BB5] bg-blue-50' : 'border-slate-200'}`}>
                    <div>
                      <p className="font-semibold text-sm text-[#0A0F1E]">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.description}</p>
                    </div>
                    {payment === p.id && <Check size={18} className="text-[#005BB5]" />}
                  </button>
                ))}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h2 className="font-display font-bold text-lg text-[#0A0F1E]">Review Order</h2>
                <div className="text-sm space-y-1 text-slate-600">
                  <p><span className="text-slate-400">Deliver to:</span> {address.name}, {address.area}, {address.town}</p>
                  <p><span className="text-slate-400">Phone:</span> {address.phone}</p>
                  <p><span className="text-slate-400">Method:</span> {deliveryMethod?.name}</p>
                  <p><span className="text-slate-400">Payment:</span> {PAYMENT_METHODS.find(p => p.id === payment)?.name}</p>
                </div>
                <div className="border-t border-slate-100 pt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between text-slate-500"><span>Delivery</span><span>{deliveryMethod?.fee === 0 ? 'Free' : formatPrice(deliveryMethod?.fee)}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
                  <div className="flex justify-between font-bold text-[#0A0F1E] text-base pt-1"><span>Total</span><span className="price-display">{formatPrice(total)}</span></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 mt-6">
            {step > 1 && <button onClick={() => setStep(s => s - 1)} className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600">Back</button>}
            {step < 4 ? (
              <button onClick={() => canContinue() && setStep(s => s + 1)} disabled={!canContinue()} className="btn-primary flex-1 py-3 disabled:opacity-40">Continue</button>
            ) : (
              <button onClick={placeOrder} disabled={placing} className="btn-primary flex-1 py-3 disabled:opacity-60">
                {placing ? 'Placing Order...' : `Place Order · ${formatPrice(total)}`}
              </button>
            )}
          </div>
        </div>
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
