import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { useAuth } from '@/lib/AuthContext';

export default function TopBar() {
  const { isAuthenticated } = useAuth();
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
      <div className="max-w-7xl mx-auto rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-3 bg-[#4A2A1A] text-[#F6EBDD] border border-[#8B5E3B]/25">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center">
            <img src={logo} alt="Dennis Mendez" className="w-full h-full object-cover" />
          </div>
          <span className="hidden sm:block font-display font-bold text-[#F6EBDD] text-lg">Dennis Mendez</span>
        </Link>

        <form onSubmit={doSearch} className="hidden md:flex flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8A37B]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, brands, stores..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#8B5E3B]/20 bg-[#F6EBDD] text-[#3F2415] text-sm outline-none"
          />
        </form>

        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setSearchOpen(v => !v)} className="md:hidden p-2 rounded-xl hover:bg-white/10">
            <Search size={19} className="text-[#F6EBDD]" />
          </button>
          <button onClick={() => setMenuOpen(v => !v)} className="p-2 rounded-xl hover:bg-white/10">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={doSearch} className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl shadow-lg px-4 py-2.5 flex items-center relative bg-[#F6EBDD] border border-[#8B5E3B]/20">
          <Search size={16} className="absolute left-7 text-[#8B5E3B]" />
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
        <div className="max-w-7xl mx-auto mt-2 rounded-2xl shadow-lg px-4 py-3 flex flex-col gap-1 bg-[#F6EBDD] border border-[#8B5E3B]/20">
          <Link to="/" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#3F2415]">Home</Link>
          <Link to="/categories" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#3F2415]">Categories</Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#3F2415]">My Orders</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium text-[#3F2415]">Wishlist</Link>
          {!isAuthenticated && <Link to="/login" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-semibold text-[#4A2A1A]">Sign In</Link>}
        </div>
      )}
    </div>
  );
}
