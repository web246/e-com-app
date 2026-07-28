import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, getErrorMessage, stashOtpPassword } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import SocialAuthRow from '@/components/SocialAuthRow';

const fieldClass =
  'h-14 rounded-2xl border-0 bg-[#F3F3F3] px-4 text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:border-transparent focus:ring-2 focus:ring-[var(--color-brown)]/25';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!agreed) {
      setError('Please agree to the Terms and conditions');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register({ email, password, full_name: fullName });
      stashOtpPassword(password);
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(getErrorMessage(err, 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      footer={
        <>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[var(--color-accent)] hover:underline"
          >
            Sign in
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
        <Input
          id="name"
          autoFocus
          placeholder="Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={fieldClass}
          required
        />

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
          required
        />

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Password"
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

        <label className="flex items-start gap-3 pt-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#D0D0D0] accent-[var(--color-accent)]"
          />
          <span className="text-sm text-[#6B6B6B] leading-snug">
            Agree with{' '}
            <span className="font-medium text-[var(--color-accent)]">
              Terms and conditions
            </span>
          </span>
        </label>

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 h-14 w-full rounded-2xl bg-[var(--color-brown)] text-base font-semibold text-white hover:bg-[var(--color-brown-dark)]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creating account...
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </form>

      <SocialAuthRow mode="sign up" />
    </AuthLayout>
  );
}
