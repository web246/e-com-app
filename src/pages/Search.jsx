import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import PullToRefresh from '@/components/ui/PullToRefresh';
import ProductGrid from '@/components/home/ProductGrid';
import { enrichCategory } from '@/lib/constants';
import { fetchProducts, fetchCategories } from '@/lib/api/catalogService';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Search() {
  const { search } = useLocation();
  const { slug } = useParams();
  const params = new URLSearchParams(search);
  const query = params.get('q') || '';
  const [sort, setSort] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(cats.map(enrichCategory)))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    if (slug === 'general') {
      setSelectedCategory('general');
      setSelectedCategoryId(null);
    } else if (slug && categories.length) {
      const cat = categories.find((c) => c.slug === slug);
      setSelectedCategory(slug);
      setSelectedCategoryId(cat && !cat.isFallback ? (cat.id ?? null) : null);
    } else if (!slug) {
      setSelectedCategory('');
      setSelectedCategoryId(null);
    }
  }, [slug, categories]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Only filter by category_id when the category came from the API (not DEFAULT_CATEGORIES).
      const { items } = await fetchProducts({
        page: 1,
        page_size: 50,
        search: query || undefined,
        category_id: selectedCategoryId || undefined,
      });
      let results = items;
      if (selectedCategory && !selectedCategoryId) {
        const needle = selectedCategory.toLowerCase();
        results = results.filter((p) => {
          const cat = String(p.category || '').toLowerCase();
          return cat.includes(needle) || needle.includes(cat.replace(/\s+/g, '-'));
        });
      }
      if (freeShippingOnly) results = results.filter((p) => p.free_shipping);
      if (sort === 'price_asc') results.sort((a, b) => a.price - b.price);
      else if (sort === 'price_desc') results.sort((a, b) => b.price - a.price);
      setProducts(results);
    } catch (err) {
      setError(err.message || 'Search failed');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [query, sort, selectedCategory, selectedCategoryId, freeShippingOnly]);

  const selectCategory = (cat) => {
    if (selectedCategory === cat.slug) {
      setSelectedCategory('');
      setSelectedCategoryId(null);
    } else {
      setSelectedCategory(cat.slug);
      setSelectedCategoryId(cat.isFallback ? null : (cat.id ?? null));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageTransition>
        <PullToRefresh onRefresh={loadProducts}>
          <div className="max-w-7xl mx-auto px-4 sm:px-5 pt-20 pb-24 md:pb-16">
            <div className="mb-4">
              <div>
                <h1 className="font-display font-bold text-lg text-[#0A0F1E] leading-tight">
                  {query ? <>Results for <span className="text-brand">"{query}"</span></> : 'All Products'}
                </h1>
                <p className="text-slate-500 text-[11px] mt-0.5">{loading ? 'Searching...' : `${products.length} products found`}</p>
              </div>
            </div>

            {error && (
              <div className="mb-2 rounded-lg bg-red-50 text-red-600 text-[11px] p-2">{error}</div>
            )}

            <div className="flex gap-3">
              <aside className="w-44 flex-shrink-0 hidden lg:block">
                <div className="bg-white rounded-xl p-3 shadow-sm sticky top-20 border border-slate-200">
                  <h3 className="font-display font-semibold text-[#0A0F1E] mb-2 flex items-center gap-2 text-[12px]"><SlidersHorizontal size={14} /> Filters</h3>
                  <div className="mb-3">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Category</h4>
                    <div className="space-y-1">
                      {categories.slice(0, 10).map(cat => (
                        <button
                          key={cat.slug || cat.id}
                          onClick={() => selectCategory(cat)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-[11px] transition-colors ${selectedCategory === cat.slug ? 'bg-brown-light text-brand font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Shipping</h4>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div onClick={() => setFreeShippingOnly(v => !v)} className={`w-8 h-4 rounded-full transition-colors ${freeShippingOnly ? 'bg-brand' : 'bg-slate-200'} relative`}>
                        <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${freeShippingOnly ? 'translate-x-4' : ''}`} />
                      </div>
                      <span className="text-[11px] text-slate-600">Free</span>
                    </label>
                  </div>
                  {(selectedCategory || freeShippingOnly) && (
                    <button onClick={() => { setSelectedCategory(''); setSelectedCategoryId(null); setFreeShippingOnly(false); }} className="flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 font-medium">
                      <X size={12} /> Clear
                    </button>
                  )}
                </div>
              </aside>

              <div className="flex-1 min-w-0">
                <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-2.5">
                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    <div className="flex shrink-0 items-center gap-1.5 px-1 text-[11px] font-semibold text-slate-700">
                      <SlidersHorizontal size={14} className="text-brand" /> Sort by
                    </div>
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSort(option.value)}
                        className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-semibold transition-colors ${sort === option.value ? 'bg-brand text-white shadow-sm' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-brand'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                    {categories.slice(0, 6).map(cat => (
                      <button
                        key={cat.slug || cat.id}
                        onClick={() => selectCategory(cat)}
                        className={`flex-shrink-0 px-2 py-1 rounded-full text-[10px] font-medium border ${selectedCategory === cat.slug ? 'bg-brand text-white border-brand' : 'bg-white text-slate-600 border-slate-200'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <ProductGrid products={products} loading={loading} cols={2} compact />
                {!loading && products.length === 0 && (
                  <p className="text-center text-slate-500 text-sm py-8">No products match your filters.</p>
                )}
              </div>
            </div>
          </div>
        </PullToRefresh>
      </PageTransition>
      <BottomNav />
    </div>
  );
}
