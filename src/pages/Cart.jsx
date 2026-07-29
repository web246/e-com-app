import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import { useCart } from '@/lib/useCart';
import { formatPrice } from '@/lib/constants';
import { toast } from '@/components/ui/use-toast';

const FREE_SHIP_THRESHOLD = 2000;
const SHIP_FEE = 150;

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, coupon, applyCoupon, loading } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [applying, setApplying] = useState(false);
  const navigate = useNavigate();

  const shipping = subtotal >= FREE_SHIP_THRESHOLD || items.length === 0 ? 0 : SHIP_FEE;
  const discount = coupon?.discount ?? 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setApplying(true);
    try {
      const result = await applyCoupon(couponInput.trim());
      toast({ title: 'Coupon applied', description: result.message || 'Discount applied' });
    } catch (err) {
      toast({ title: 'Invalid coupon', description: err.message, variant: 'destructive' });
    } finally {
      setApplying(false);
    }
  };

  const handleRemove = async (key) => {
    try {
      await removeItem(key);
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleUpdateQty = async (key, qty) => {
    try {
      await updateQuantity(key, qty);
    } catch (err) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-brown-light flex items-center justify-center">
        <p className="text-slate-500">Loading cart...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brown-light">
        <PageTransition>
        <div className="max-w-xl mx-auto px-4 sm:px-5 pt-32 pb-32 text-center">
          <div className="w-24 h-24 rounded-full bg-brown-light flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-brand" />
          </div>
          <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-2">Your cart is empty</h1>
          <p className="text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/" className="btn-primary inline-block px-8 py-3">Start Shopping</Link>
        </div>
        </PageTransition>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-light">
      <PageTransition>
      <div className="max-w-5xl mx-auto px-4 sm:px-5 pt-24 pb-32 md:pb-16">
        <h1 className="font-display font-bold text-2xl text-[#0A0F1E] mb-6">Shopping Cart ({items.length})</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map(({ key, product, quantity }) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="linet-card p-3 flex gap-3 items-center"
              >
                <Link to={`/product/${product.id}`} className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-brown-light">
                  {product.thumbnail && <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />}
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-slate-400">{product.store_name}</p>
                  <Link to={`/product/${product.id}`} className="font-medium text-sm text-[#0A0F1E] line-clamp-1">{product.name}</Link>
                  <p className="price-display text-sm mt-1">{formatPrice(product.price, product.currency)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => handleRemove(key)} className="text-slate-300 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center border border-slate-200 rounded-lg">
                    <button onClick={() => handleUpdateQty(key, quantity - 1)} className="p-1.5"><Minus size={12} /></button>
                    <span className="w-7 text-center text-xs font-semibold">{quantity}</span>
                    <button onClick={() => handleUpdateQty(key, quantity + 1)} className="p-1.5"><Plus size={12} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="linet-card p-5 h-fit sticky top-24">
            <h2 className="font-display font-bold text-lg text-[#0A0F1E] mb-4">Order Summary</h2>

            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full pl-8 pr-2 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-brand"
                />
              </div>
              <button onClick={handleApplyCoupon} disabled={applying} className="px-4 py-2 text-sm font-semibold text-brand border border-brand/30 rounded-xl hover:bg-brown-light disabled:opacity-50">
                {applying ? '...' : 'Apply'}
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-slate-500"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount ({coupon?.code})</span><span>-{formatPrice(discount)}</span></div>}
              <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-[#0A0F1E]">
                <span>Total</span><span className="price-display">{formatPrice(total)}</span>
              </div>
            </div>

            {subtotal < FREE_SHIP_THRESHOLD && (
              <p className="text-xs text-slate-400 mt-3">Add {formatPrice(FREE_SHIP_THRESHOLD - subtotal)} more for free shipping</p>
            )}

            <button onClick={() => navigate('/checkout')} className="btn-primary w-full py-3.5 mt-5">Proceed to Checkout</button>
          </div>
        </div>
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
