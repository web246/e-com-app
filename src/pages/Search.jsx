import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import PullToRefresh from '@/components/ui/PullToRefresh';
import { SimpleSelect } from '@/components/ui/select';
import ProductGrid from '@/components/home/ProductGrid';
import { SAMPLE_PRODUCTS, CATEGORIES } from '@/lib/constants';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Search() {
  const { search } = useLocation();
  const { slug } = useParams();
  const params = new URLSearchParams(search);
  const query = params.get('q') || '';
  const filterParam = params.get('filter') || '';
  const [sort, setSort] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState(slug || '');
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => setSelectedCategory(slug || ''), [slug]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      let results = [...SAMPLE_PRODUCTS];
      if (query) results = results.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.store_name.toLowerCase().includes(query.toLowerCase()));
      if (selectedCategory) results = results.filter(p => p.category === selectedCategory);
      if (filterParam === 'best_seller') results = results.filter(p => p.is_best_seller);
      if (filterParam === 'new_arrival') results = results.filter(p => p.is_new_arrival);
      if (freeShippingOnly) results = results.filter(p => p.free_shipping);
      if (sort === 'price_asc') results.sort((a, b) => a.price - b.price);
      else if (sort === 'price_desc') results.sort((a, b) => b.price - a.price);
      else if (sort === 'rating') results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      setProducts(results);
      setLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [query, sort, selectedCategory, freeShippingOnly, filterParam]);

  return (
    <div className="min-h-screen bg-[#EFF6FF]">
      <TopBar />
      <PageTransition>
      <PullToRefresh onRefresh={async () => { setLoading(true); setTimeout(() => setLoading(false), 400); }}>
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-32 md:pb-16">
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-[#0A0F1E]">
            {query ? <>Results for <span className="text-[#005BB5]">"{query}"</span></> : 'All Products'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{loading ? 'Searching...' : `${products.length} products found`}</p>
        </div>

        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
              <h3 className="font-display font-semibold text-[#0A0F1E] mb-4 flex items-center gap-2"><SlidersHorizontal size={16} /> Filters</h3>
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Category</h4>
                <div className="space-y-1">
                  {CATEGORIES.slice(0, 10).map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${selectedCategory === cat.slug ? 'bg-blue-50 text-[#005BB5] font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Shipping</h4>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => setFreeShippingOnly(v => !v)} className={`w-10 h-5 rounded-full transition-colors ${freeShippingOnly ? 'bg-[#005BB5]' : 'bg-slate-200'} relative`}>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${freeShippingOnly ? 'translate-x-5' : ''}`} />
                  </div>
                  <span className="text-sm text-slate-600">Free Shipping</span>
                </label>
              </div>
              {(selectedCategory || freeShippingOnly) && (
                <button onClick={() => { setSelectedCategory(''); setFreeShippingOnly(false); }} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium">
                  <X size={14} /> Clear Filters
                </button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide lg:hidden">
                {CATEGORIES.slice(0, 6).map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${selectedCategory === cat.slug ? 'bg-[#005BB5] text-white border-[#005BB5]' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                <span className="text-sm text-slate-500 hidden sm:inline">Sort:</span>
                <SimpleSelect value={sort} onChange={setSort} options={SORT_OPTIONS} />
              </div>
            </div>
            <ProductGrid products={products} loading={loading} cols={4} />
          </div>
        </div>
      </div>
      </PullToRefresh>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
