import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Bell, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useCart } from '@/lib/useCart';
import { useWishlist } from '@/lib/useWishlist';

export default function TopBar() {
  const { user, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const { count } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const doSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 pt-safe">
      <div className="max-w-7xl mx-auto glass rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-white font-bold font-display text-lg">D</span>
          </div>
          <span className="hidden sm:block font-display font-bold text-[#0A0F1E] text-lg">Dennis Mendez</span>
        </Link>

        <form onSubmit={doSearch} className="hidden md:flex flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, brands, stores..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/70 border border-slate-200 text-sm outline-none focus:border-[#005BB5]"
          />
        </form>

        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setSearchOpen(v => !v)} className="md:hidden p-2 rounded-xl hover:bg-white/50">
            <Search size={19} className="text-[#0A0F1E]" />
          </button>
          <Link to="/wishlist" className="relative p-2 rounded-xl hover:bg-white/50 hidden sm:block">
            <Heart size={19} className="text-[#0A0F1E]" />
            {count > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E67A00] text-white text-[10px] flex items-center justify-center font-bold">{count}</span>}
          </Link>
          <Link to="/orders" className="p-2 rounded-xl hover:bg-white/50 hidden sm:block">
            <Bell size={19} className="text-[#0A0F1E]" />
          </Link>
          <Link to="/cart" className="relative p-2 rounded-xl hover:bg-white/50">
            <ShoppingCart size={19} className="text-[#0A0F1E]" />
            {itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-primary text-white text-[10px] flex items-center justify-center font-bold">{itemCount}</span>}
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className="p-2 rounded-xl hover:bg-white/50 hidden sm:block">
              <User size={19} className="text-[#0A0F1E]" />
            </Link>
          ) : (
            <Link to="/login" className="hidden sm:block text-sm font-semibold text-[#005BB5] px-3 py-2">Sign In</Link>
          )}
          <button onClick={() => setMenuOpen(v => !v)} className="sm:hidden p-2 rounded-xl hover:bg-white/50">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={doSearch} className="md:hidden max-w-7xl mx-auto mt-2 glass rounded-2xl shadow-lg px-4 py-2.5 flex items-center relative">
          <Search size={16} className="absolute left-7 text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-7 pr-2 py-1.5 bg-transparent text-sm outline-none"
          />
        </form>
      )}

      {menuOpen && (
        <div className="sm:hidden max-w-7xl mx-auto mt-2 glass rounded-2xl shadow-lg px-4 py-3 flex flex-col gap-1">
          <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#0A0F1E]">Home</Link>
          <Link to="/categories" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#0A0F1E]">Categories</Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#0A0F1E]">My Orders</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#0A0F1E]">Wishlist</Link>
          <Link to="/seller" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#0A0F1E]">Seller Dashboard</Link>
          {!isAuthenticated && <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold text-[#005BB5]">Sign In</Link>}
        </div>
      )}
    </div>
  );
}
