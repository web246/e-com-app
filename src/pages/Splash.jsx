import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '@/assets/logo.png';
import { useAuth } from '@/lib/AuthContext';

const PHASE_LOGO_MS = 1000;
const PHASE_BRANDED_MS = 1400;

export default function Splash() {
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-brown)' }}
    >
      <AnimatePresence mode="wait">
        {phase === 0 ? (
          <motion.div
            key="logo-only"
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <img
              src={logo}
              alt="Dennis Mendez"
              className="w-36 h-36 object-contain mix-blend-multiply"
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Dennis Mendez
        </motion.h1>

        <motion.p
          className="text-white/80 text-sm font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Everything You Need, Delivered.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
>>>>>>> 07e3576 (ci(android): add GitHub Actions workflow to build APK)
            />
          </motion.div>
        ) : (
          <motion.div
            key="branded"
            className="flex flex-col items-center px-8 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <img
              src={logo}
              alt="Dennis Mendez"
              className="w-28 h-28 object-contain mb-8 mix-blend-multiply"
            />
            <h1 className="font-display font-bold text-3xl tracking-[0.08em] text-white uppercase mb-3">
              Dennis Mendez
            </h1>
            <p className="text-white/85 text-sm font-medium tracking-[0.18em] uppercase">
              Shop Global • Delivering Local
            </p>
            <div className="mt-16 flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all ${
                    i === 0
                      ? 'w-2.5 h-2.5 bg-[var(--color-accent)]'
                      : 'w-2 h-2 bg-[var(--color-accent)]/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
