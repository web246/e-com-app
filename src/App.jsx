import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/use-toast";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import DeepLinkHandler from './components/DeepLinkHandler';
import ProtectedRoute from '@/components/ProtectedRoute';
import { CartProvider } from '@/lib/useCart';
import { WishlistProvider } from '@/lib/useWishlist';
import { ThemeProvider } from '@/lib/useTheme';
import ErrorBoundary from '@/components/ErrorBoundary';

import Splash from '@/pages/Splash';
import Onboarding from '@/pages/Onboarding';
import Home from '@/pages/Home';
import ProductDetail from '@/pages/ProductDetail';
import Store from '@/pages/Store';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderSuccess from '@/pages/OrderSuccess';
import PaymentProcessing from '@/pages/PaymentProcessing';
import Orders from '@/pages/Orders';
import OrdersPending from '@/pages/OrdersPending';
import OrdersCompleted from '@/pages/OrdersCompleted';
import Wishlist from '@/pages/Wishlist';
import Search from '@/pages/Search';
import Categories from '@/pages/Categories';
import Stores from '@/pages/Stores';
import Profile from '@/pages/Profile';
// Seller and Admin dashboards removed from public routes (kept as pages for internal use)
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import VerifyOtp from '@/pages/VerifyOtp';
import ResetPassword from '@/pages/ResetPassword';
import PageNotFound from '@/lib/PageNotFound';

const AuthenticatedApp = () => {
  const { isLoadingAuth, authChecked } = useAuth();
  const location = useLocation();

  if (!authChecked || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_12px_30px_rgba(15,23,42,0.08)] overflow-hidden p-2 ring-1 ring-slate-200">
            <img src="/src/assets/logo.png" alt="Dennis Mendez" className="w-full h-full object-contain" />
          </div>
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/splash" replace />} />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/store/:slug" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-processing" element={<PaymentProcessing />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<OrdersPending />} />
          <Route path="/orders/completed" element={<OrdersCompleted />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<Search />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/profile" element={<Profile />} />
          {/* Seller and Admin routes intentionally removed from public routing */}
        </Route>
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <Router>
                  <ScrollToTop />
                  <DeepLinkHandler />
                  <AuthenticatedApp />
                </Router>
                <Toaster />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
