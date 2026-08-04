import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, Truck, CreditCard, ClipboardCheck, Bike, Store, Banknote, LockKeyhole } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/lib/useCart';
import { useAuth } from '@/lib/AuthContext';
import { formatPrice, PAYMENT_METHODS, DELIVERY_METHODS } from '@/lib/constants';
import { fetchShippingChannels } from '@/lib/api/catalogService';
import { createOrder, payOrder, buildOrderPayload, pickDefaultServiceProduct } from '@/lib/api/orderService';
import { toast } from '@/components/ui/use-toast';

const STEPS = [
  { id: 1, label: 'Address', icon: MapPin },
  { id: 2, label: 'Delivery', icon: Truck },
  { id: 3, label: 'Payment', icon: CreditCard },
  { id: 4, label: 'Review', icon: ClipboardCheck },
];

const PAYMENT_LOGOS = {
  mpesa: [
    { name: 'M-Pesa', src: 'https://commons.wikimedia.org/wiki/Special:FilePath/M-PESA_LOGO-01.svg?width=160' },
  ],
  card: [
    { name: 'Visa', src: 'https://cdn.simpleicons.org/visa/1A1F71' },
    { name: 'Mastercard', src: 'https://cdn.simpleicons.org/mastercard/EB001B' },
  ],
};

function PaymentMethodLogo({ method }) {
  const logos = PAYMENT_LOGOS[method];

  if (!logos) {
    return (
      <div className="w-12 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center" aria-hidden="true">
        <Banknote size={20} />
      </div>
    );
  }

  return (
    <div className={`h-10 rounded-lg flex items-center justify-center gap-1.5 px-2 ${method === 'mpesa' ? 'w-[76px] bg-green-50' : 'bg-white border border-slate-200'}`}>
      {logos.map((logo) => (
        <img
          key={logo.name}
          src={logo.src}
          alt={logo.name}
          className={method === 'mpesa' ? 'h-7 w-[66px] object-contain' : 'h-5 w-9 object-contain'}
        />
      ))}
    </div>
  );
}

export default function Checkout() {
  const { items, subtotal, clearCart, coupon } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: '', phone: '', area: '', town: '', country: 'Kenya', instructions: '' });
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [placing, setPlacing] = useState(false);
  const [serviceProductId, setServiceProductId] = useState(null);
  const [channelsError, setChannelsError] = useState(null);

  useEffect(() => {
    fetchShippingChannels()
      .then((channels) => {
        const picked = pickDefaultServiceProduct(channels);
        if (picked) setServiceProductId(picked.id);
        else setChannelsError('No shipping options available. Please try again later.');
      })
      .catch(() => setChannelsError('Could not load shipping options.'));
  }, []);

  useEffect(() => {
    if (!user) return;
    const fullName = user.full_name || [user.first_name, user.last_name].filter(Boolean).join(' ');
    const phone = user.phone || user.phone_number || '';
    setAddress((current) => ({ ...current, name: current.name || fullName, phone: current.phone || phone }));
    setMpesaPhone((current) => current || phone);
  }, [user]);

  const deliveryMethod = DELIVERY_METHODS.find(d => d.id === delivery);
  const discount = coupon?.discount ?? 0;
  const total = subtotal + (deliveryMethod?.fee || 0) - discount;

  const canContinue = () => {
    if (step === 1) return address.name && address.phone && address.area && address.town && address.country;
    if (step === 3 && payment === 'mpesa') return mpesaPhone.trim().length >= 9;
    if (step === 3 && payment === 'card') return cardDetails.number.replace(/\s/g, '').length >= 12 && cardDetails.name && cardDetails.expiry && cardDetails.cvc;
    return true;
  };

  const placeOrder = async () => {
    if (!serviceProductId) {
      toast({ title: 'Checkout unavailable', description: channelsError || 'Shipping not configured', variant: 'destructive' });
      return;
    }
    setPlacing(true);
    try {
      const payload = buildOrderPayload({
        user,
        address,
        delivery,
        items,
        subtotal,
        total,
        coupon,
        discount,
        serviceProductId,
      });
      const order = await createOrder(payload);
      await payOrder({
        order_id: order.id,
        method: payment,
        amount: total,
        currency: order.currency || 'KSH',
        phone_number: payment === 'mpesa' ? mpesaPhone : undefined,
      });
      await clearCart();
      navigate('/payment-processing', {
        state: {
          order: {
            order_number: order.order_number,
            total: order.total_amount ?? total,
            items,
            address,
            delivery,
            payment,
            date: order.created_at || new Date().toISOString(),
          },
        },
      });
    } catch (err) {
      toast({ title: 'Order failed', description: err.message || 'Could not place order', variant: 'destructive' });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageTransition>
      <div className="max-w-3xl mx-auto px-4 sm:px-5 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-6">Checkout</h1>

        {channelsError && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 text-amber-800 text-sm">{channelsError}</div>
        )}

        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s.id ? 'gradient-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {step > s.id ? <Check size={16} /> : <s.icon size={15} />}
                </div>
                <span className={`text-[10px] font-medium ${step >= s.id ? 'text-brand' : 'text-slate-400'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-1 rounded-full ${step > s.id ? 'bg-brand' : 'bg-slate-200'}`} />}
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
                  <div className="space-y-1.5"><Label>Country</Label><Input value={address.country} onChange={e => setAddress(a => ({ ...a, country: e.target.value }))} placeholder="Kenya" /></div>
                  <div className="space-y-1.5"><Label>Delivery Instructions (optional)</Label><Input value={address.instructions} onChange={e => setAddress(a => ({ ...a, instructions: e.target.value }))} placeholder="Gate code, landmark..." /></div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                <h2 className="font-display font-bold text-lg text-[#0A0F1E] mb-2">Delivery Method</h2>
                {DELIVERY_METHODS.map(d => {
                  const DeliveryIcon = d.id === 'boda_express' ? Bike : d.id === 'pickup' ? Store : Truck;
                  const iconColors = d.id === 'pickup'
                    ? 'bg-[#FEF3C7] text-[#92400E]'
                    : 'bg-[#DCFCE7] text-[#166534]';
                  return (
                  <button key={d.id} onClick={() => setDelivery(d.id)} className={`w-full flex items-center justify-between gap-4 p-4 rounded-3xl border-2 text-left transition-all ${delivery === d.id ? 'border-[#7D2B2B] bg-yellow-50 shadow-[0_20px_50px_rgba(253,224,71,0.35)]' : 'border-white bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-200 flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconColors}`}>
                          <DeliveryIcon size={24} />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#0A0F1E]">{d.name}</p>
                        <p className="text-xs text-slate-500">{d.eta}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-[#B45309]">{d.fee === 0 ? 'Free' : formatPrice(d.fee)}</span>
                  </button>
                  );
                })}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                <h2 className="font-display font-bold text-lg text-[#0A0F1E] mb-2">Payment Method</h2>
                {PAYMENT_METHODS.map(p => {
                  return (
                  <button key={p.id} onClick={() => setPayment(p.id)} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-colors ${payment === p.id ? 'border-brand bg-brown-light' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                      <PaymentMethodLogo method={p.id} />
                      <div>
                      <p className="font-semibold text-sm text-[#0A0F1E]">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.description}</p>
                      </div>
                    </div>
                    {payment === p.id && <Check size={18} className="text-brand" />}
                  </button>
                  );
                })}
                {payment === 'mpesa' && (
                  <div className="rounded-xl bg-green-50 border border-green-100 p-4 space-y-2">
                    <Label>M-Pesa phone number</Label>
                    <Input type="tel" value={mpesaPhone} onChange={e => setMpesaPhone(e.target.value)} placeholder="0712 345 678" />
                    <p className="text-xs text-green-800">We will send a secure M-Pesa prompt to this number when you place the order.</p>
                  </div>
                )}
                {payment === 'card' && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><LockKeyhole size={15} /> Secure card details</div>
                    <Input inputMode="numeric" value={cardDetails.number} onChange={e => setCardDetails(v => ({ ...v, number: e.target.value }))} placeholder="Card number" />
                    <Input value={cardDetails.name} onChange={e => setCardDetails(v => ({ ...v, name: e.target.value }))} placeholder="Name on card" />
                    <div className="grid grid-cols-2 gap-3"><Input value={cardDetails.expiry} onChange={e => setCardDetails(v => ({ ...v, expiry: e.target.value }))} placeholder="MM / YY" /><Input inputMode="numeric" value={cardDetails.cvc} onChange={e => setCardDetails(v => ({ ...v, cvc: e.target.value }))} placeholder="CVC" /></div>
                  </div>
                )}
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
              <button onClick={placeOrder} disabled={placing || !serviceProductId} className="btn-primary flex-1 py-3 disabled:opacity-60">
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
