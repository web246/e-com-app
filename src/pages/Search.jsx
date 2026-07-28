import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/ui/PageTransition';
import PullToRefresh from '@/components/ui/PullToRefresh';
import { SimpleSelect } from '@/components/ui/select';
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
    if (slug && categories.length) {
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
  }, [query, sort, selectedCategoryId, freeShippingOnly]);

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
    <div className="min-h-screen bg-brown-light">
      <PageTransition>
        <PullToRefresh onRefresh={loadProducts}>
          <div className="max-w-7xl mx-auto px-4 pt-24 pb-32 md:pb-16">
            <div className="mb-6">
              <h1 className="font-display font-bold text-2xl text-[#0A0F1E]">
                {query ? <>Results for <span className="text-brand">"{query}"</span></> : 'All Products'}
              </h1>
              <p className="text-slate-500 text-sm mt-1">{loading ? 'Searching...' : `${products.length} products found`}</p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 text-red-600 text-sm p-4">{error}</div>
            )}

            <div className="flex gap-6">
              <aside className="w-64 flex-shrink-0 hidden lg:block">
                <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
                  <h3 className="font-display font-semibold text-[#0A0F1E] mb-4 flex items-center gap-2"><SlidersHorizontal size={16} /> Filters</h3>
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Category</h4>
                    <div className="space-y-1">
                      {categories.slice(0, 10).map(cat => (
                        <button
                          key={cat.slug || cat.id}
                          onClick={() => selectCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${selectedCategory === cat.slug ? 'bg-brown-light text-brand font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Shipping</h4>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div onClick={() => setFreeShippingOnly(v => !v)} className={`w-10 h-5 rounded-full transition-colors ${freeShippingOnly ? 'bg-brand' : 'bg-slate-200'} relative`}>
                        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${freeShippingOnly ? 'translate-x-5' : ''}`} />
                      </div>
                      <span className="text-sm text-slate-600">Free Shipping</span>
                    </label>
                  </div>
                  {(selectedCategory || freeShippingOnly) && (
                    <button onClick={() => { setSelectedCategory(''); setSelectedCategoryId(null); setFreeShippingOnly(false); }} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium">
                      <X size={14} /> Clear Filters
                    </button>
                  )}
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide lg:hidden">
                    {categories.slice(0, 6).map(cat => (
                      <button
                        key={cat.slug || cat.id}
                        onClick={() => selectCategory(cat)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border ${selectedCategory === cat.slug ? 'bg-brand text-white border-brand' : 'bg-white text-slate-600 border-slate-200'}`}
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
                {!loading && products.length === 0 && (
                  <p className="text-center text-slate-500 text-sm py-12">No products match your filters.</p>
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
