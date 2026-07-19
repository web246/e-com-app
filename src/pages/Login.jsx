import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={LogIn}
      title="Welcome back"
      subtitle="Log in to your account"
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="text-[#005BB5] font-semibold hover:underline">
            Create one
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">Demo accounts</p>
        <ul className="mt-2 space-y-1">
          <li><button type="button" onClick={() => { setEmail("admin@example.com"); setPassword("admin123"); }} className="text-left text-[#005BB5] hover:underline">Admin: admin@example.com / admin123</button></li>
          <li><button type="button" onClick={() => { setEmail("buyer@example.com"); setPassword("buyer123"); }} className="text-left text-[#005BB5] hover:underline">Buyer: buyer@example.com / buyer123</button></li>
          <li><button type="button" onClick={() => { setEmail("seller@example.com"); setPassword("seller123"); }} className="text-left text-[#005BB5] hover:underline">Seller: seller@example.com / seller123</button></li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-[#005BB5] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-12" disabled={loading}>
          {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</>) : "Log in"}
        </Button>
      </form>

      <p className="text-center text-xs text-slate-400 mt-5">
        Demo mode: accounts are stored on this device only.
      </p>
    </AuthLayout>
  );
}
