import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, getErrorMessage, stashOtpPassword } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import SocialAuthRow from '@/components/SocialAuthRow';

const fieldClass =
  'h-14 rounded-2xl border-0 bg-[#F3F3F3] px-4 text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:border-transparent focus:ring-2 focus:ring-[var(--color-brown)]/25';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      const msg = getErrorMessage(err, 'Invalid email or password');
      setError(msg);
      if (err?.code === 'UNVERIFIED' || msg.toLowerCase().includes('verify')) {
        stashOtpPassword(password);
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back — sign in to continue"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-[var(--color-accent)] hover:underline"
          >
            Sign up
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${fieldClass} pr-12`}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] hover:text-[#1A1A1A]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-[#1A1A1A] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 h-14 w-full rounded-2xl bg-[var(--color-brown)] text-base font-semibold text-white hover:bg-[var(--color-brown-dark)]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      <SocialAuthRow mode="sign in" />
    </AuthLayout>
  );
}
