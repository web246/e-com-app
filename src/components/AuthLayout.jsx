import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-10 pb-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-20 w-56 h-56 rounded-full bg-[#7D2B2B]/5" />
      <div className="absolute top-48 -left-28 w-52 h-52 rounded-full bg-[#A24A3A]/5" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md mx-auto flex-1 flex flex-col relative"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-white shadow-md ring-1 ring-[#7D2B2B]/10 p-2.5 mb-3">
            <img src={logo} alt="Dennis Mendez" className="w-full h-full object-contain" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-brown)]">Dennis Mendez</p>
        </div>
        <h1 className="font-display text-[1.8rem] leading-tight font-bold text-center text-[#1A1A1A] mb-2">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-center text-sm text-[#8A8A8A] mb-8">{subtitle}</p>
        ) : (
          <div className="mb-8" />
        )}

        <div className="flex-1 flex flex-col">{children}</div>

        {footer && (
          <p className="mt-8 text-center text-sm text-[#6B6B6B]">{footer}</p>
        )}
      </motion.div>
    </div>
  );
}
