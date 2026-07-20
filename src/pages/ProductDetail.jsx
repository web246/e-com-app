import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Minus, Plus, Truck, ShieldCheck, RotateCcw, ChevronLeft } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import ProductGrid from '@/components/home/ProductGrid';
import { formatPrice } from '@/lib/constants';
import { useCart } from '@/lib/useCart';
import { useWishlist } from '@/lib/useWishlist';
import { toast } from '@/components/ui/use-toast';
import { fetchProduct, fetchProducts } from '@/lib/api/catalogService';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState('description');
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const p = await fetchProduct(id);
        setProduct(p);
        const { items } = await fetchProducts({ page: 1, page_size: 8 });
        setRelated(items.filter((r) => r.id !== p.id).slice(0, 4));
      } catch (err) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFF6FF] flex items-center justify-center">
        <p className="text-slate-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#EFF6FF] flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500">{error || 'Product not found'}</p>
        <button onClick={() => navigate('/')} className="btn-primary px-6 py-2">Back to home</button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const images = product.images?.length ? product.images : product.thumbnail ? [product.thumbnail] : [];

  const handleAddToCart = async () => {
    try {
      await addItem(product, qty);
      toast({ title: 'Added to cart', description: `${qty} × ${product.name}` });
    } catch (err) {
      toast({ title: 'Could not add to cart', description: err.message, variant: 'destructive' });
    }
  };

  const handleBuyNow = async () => {
    try {
      await addItem(product, qty);
      navigate('/cart');
    } catch (err) {
      toast({ title: 'Could not add to cart', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <TopBar />
      <PageTransition>
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-32 md:pb-16">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-slate-500 mb-4 hover:text-slate-700">
          <ChevronLeft size={16} /> Back
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-lg mb-3">
              {images[activeImg] ? (
                <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-50" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${activeImg === i ? 'border-[#005BB5]' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-[#005BB5] font-semibold mb-1">{product.store_name}</p>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0F1E] mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold text-sm">{product.rating || '—'}</span>
              </div>
              {product.reviews_count > 0 && (
                <span className="text-sm text-slate-400">({product.reviews_count} reviews)</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="price-display text-3xl">{formatPrice(product.price, product.currency)}</span>
              {product.old_price && <span className="text-lg text-slate-400 line-through">{formatPrice(product.old_price, product.currency)}</span>}
              {product.discount_percent > 0 && <span className="bg-[#E67A00] text-white text-xs font-bold px-2 py-1 rounded-full">-{product.discount_percent}%</span>}
            </div>
            {product.free_shipping && <p className="text-sm text-green-600 font-semibold mb-5">✓ Free Shipping</p>}

            <div className="flex items-center gap-4 mb-6 mt-4">
              <span className="text-sm font-medium text-slate-600">Quantity</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2.5"><Minus size={14} /></button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-2.5"><Plus size={14} /></button>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button onClick={handleAddToCart} className="flex-1 btn-primary py-3.5">Add to Cart</button>
              <button onClick={handleBuyNow} className="flex-1 btn-accent py-3.5">Buy Now</button>
              <button onClick={() => toggle(product)} className="w-14 h-14 rounded-xl border border-slate-200 bg-white flex items-center justify-center flex-shrink-0">
                <Heart size={20} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="linet-card p-3">
                <Truck size={18} className="mx-auto mb-1 text-[#005BB5]" />
                <p className="text-[11px] text-slate-500">Fast Delivery</p>
              </div>
              <div className="linet-card p-3">
                <ShieldCheck size={18} className="mx-auto mb-1 text-[#005BB5]" />
                <p className="text-[11px] text-slate-500">Secure Payment</p>
              </div>
              <div className="linet-card p-3">
                <RotateCcw size={18} className="mx-auto mb-1 text-[#005BB5]" />
                <p className="text-[11px] text-slate-500">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex gap-6 border-b border-slate-200 mb-6">
            {['description', 'specifications', 'reviews'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-colors ${tab === t ? 'border-[#005BB5] text-[#005BB5]' : 'border-transparent text-slate-400'}`}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === 'description' && (
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              {product.description || `${product.name} from ${product.store_name}.`}
            </p>
          )}
          {tab === 'specifications' && (
            <div className="grid grid-cols-2 gap-3 max-w-lg text-sm">
              <div className="text-slate-400">Brand</div><div className="text-slate-700 font-medium">{product.store_name}</div>
              <div className="text-slate-400">Weight</div><div className="text-slate-700 font-medium">{product.weight || '—'} kg</div>
              <div className="text-slate-400">SKU</div><div className="text-slate-700 font-medium">{product.slug || product.id}</div>
            </div>
          )}
          {tab === 'reviews' && (
            <p className="text-slate-500 text-sm">Reviews will appear here once available.</p>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-xl text-[#0A0F1E] mb-5">You May Also Like</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
