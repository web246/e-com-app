import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Tag, Star, Truck } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const floatingIcons = [
  { icon: ShoppingBag, x: '15%', y: '20%', delay: 0.5, size: 24 },
  { icon: Package, x: '80%', y: '15%', delay: 0.7, size: 20 },
  { icon: Tag, x: '70%', y: '70%', delay: 0.9, size: 22 },
  { icon: Star, x: '20%', y: '75%', delay: 0.6, size: 18 },
  { icon: Truck, x: '85%', y: '45%', delay: 0.8, size: 22 },
];

export default function Splash() {
  const navigate = useNavigate();
  const { isAuthenticated, authChecked } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (authChecked && isAuthenticated) {
        navigate('/', { replace: true });
        return;
      }
      if (localStorage.getItem('linet_onboarding_seen') === 'true') {
        navigate('/login', { replace: true });
        return;
      }
      navigate('/onboarding', { replace: true });
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigate, authChecked, isAuthenticated]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center relative overflow-hidden">
      {floatingIcons.map(({ icon: Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{ delay, duration: 2, y: { repeat: Infinity, duration: 3, ease: 'easeInOut', delay } }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
      >
        <motion.div
          className="w-28 h-28 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-8"
          animate={{ boxShadow: ['0 20px 60px rgba(0,0,0,0.3)', '0 30px 80px rgba(0,91,181,0.5)', '0 20px 60px rgba(0,0,0,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[#005BB5] font-bold text-5xl font-display">D</span>
        </motion.div>

        <motion.h1
          className="font-display font-bold text-4xl text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Dennis Mendez
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg font-medium"
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
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
