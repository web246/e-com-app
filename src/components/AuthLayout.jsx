import { motion } from 'framer-motion';

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-14 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md mx-auto flex-1 flex flex-col"
      >
        <h1 className="font-display text-[2rem] leading-tight font-bold text-center text-[#1A1A1A] mb-2">
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
