import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, getErrorMessage, stashOtpPassword } from "@/lib/AuthContext";
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
      const msg = getErrorMessage(err, "Invalid email or password");
      setError(msg);
      if (err?.code === "UNVERIFIED" || msg.toLowerCase().includes("verify")) {
        stashOtpPassword(password);
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
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
          <Link to="/register" className="text-[#421313] font-semibold hover:underline">
            Create one
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-4 rounded-xl border border-[#E54545]/20 bg-[#FFF1F1] p-3 text-sm text-[#C53A3A]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#421313]">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#6f5848]" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-10 border-[#D9D2CB] bg-white text-[#421313] placeholder:text-[#8b6f63] focus:border-[#6D3F23] focus:ring-[#6D3F23]/20"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[#421313]">Password</Label>
            <Link to="/forgot-password" className="text-xs font-semibold text-[#421313] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-[#6f5848]" />
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 pl-10 border-[#D9D2CB] bg-white text-[#421313] placeholder:text-[#8b6f63] focus:border-[#6D3F23] focus:ring-[#6D3F23]/20"
              required
            />
          </div>
        </div>
        <Button type="submit" className="h-12 w-full bg-[#541B1B] text-white hover:bg-[#421313]" disabled={loading}>
          {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</>) : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
