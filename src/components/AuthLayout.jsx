import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

export default function AuthLayout({ icon: Icon, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#421313] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-[28px] border border-[#D9D2CB]/60 bg-[#F7F3EF] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[#D9D2CB] bg-[#F7F3EF] shadow-sm">
            {Icon ? (
              <img src={logo} alt="logo" className="h-full w-full object-contain p-1" />
            ) : (
              <img src={logo} alt="logo" className="h-full w-full object-contain p-1" />
            )}
          </div>
          <h1 className="font-display text-2xl font-bold text-[#421313]">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-[#6f5848]">{subtitle}</p>}
        </div>

        {children}

        {footer && <p className="mt-6 text-center text-sm text-[#6f5848]">{footer}</p>}
      </motion.div>
    </div>
  );
}
