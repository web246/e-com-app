import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, getErrorMessage, takeOtpPassword } from "@/lib/AuthContext";
import { hasTokens } from "@/lib/api/tokenStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function VerifyOtp() {
  const { verifyOtp, sendOtp, login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const [otp, setOtp] = useState("");
  const [password] = useState(() => takeOtpPassword() || params.get("password") || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      if (password) {
        try {
          await login(email, password);
          if (!hasTokens()) {
            setError("Verified, but session could not be saved. Please log in manually.");
            navigate("/login");
            return;
          }
          navigate("/");
          return;
        } catch (loginErr) {
          const msg = getErrorMessage(loginErr, "Invalid email or password");
          setError(`Verified, but automatic sign-in failed: ${msg}. Please log in manually.`);
          setLoading(false);
          navigate("/login");
          return;
        }
      }
      navigate("/login");
    } catch (err) {
      setError(getErrorMessage(err, "Invalid or expired OTP"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      await sendOtp(email);
      setSent(true);
    } catch (err) {
      setError(getErrorMessage(err, "Could not resend OTP"));
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout
      icon={ShieldCheck}
      title="Verify your email"
      subtitle={`Enter the 6-digit code sent to ${email}`}
      footer={
        <>
          Already verified?{" "}
          <Link to="/login" className="text-brand font-semibold hover:underline">
            Log in
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>
      )}
      {sent && (
        <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
          A new code has been sent.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="otp">Verification code</Label>
          <Input
            id="otp"
            inputMode="numeric"
            maxLength={6}
            autoFocus
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="h-12 text-center text-lg tracking-widest"
            required
          />
        </div>
        <Button type="submit" className="w-full h-12" disabled={loading || otp.length !== 6}>
          {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>) : "Verify & continue"}
        </Button>
      </form>

      <button
        type="button"
        onClick={handleResend}
        disabled={resending}
        className="w-full mt-4 text-sm text-brand font-semibold hover:underline disabled:opacity-50"
      >
        {resending ? "Sending..." : "Resend code"}
      </button>
    </AuthLayout>
  );
}
