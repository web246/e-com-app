import { motion } from 'framer-motion';

export default function AuthLayout({ icon: Icon, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#EFF6FF] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-4">
            {Icon ? <Icon size={24} className="text-white" /> : <span className="text-white font-bold text-xl font-display">D</span>}
          </div>
          <h1 className="font-display font-bold text-2xl text-[#0A0F1E]">{title}</h1>
          {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
        </div>

        {children}

        {footer && <p className="text-center text-sm text-slate-500 mt-6">{footer}</p>}
      </motion.div>
    </div>
  );
}
