import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Truck, ArrowRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    icon: ShoppingBag,
    title: 'Shop Smarter',
    description: 'Discover millions of products from trusted stores around the world — all in one place.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    accent: '#005BB5',
  },
  {
    icon: Truck,
    title: 'Fast & Secure Delivery',
    description: 'Track every order in real time while enjoying secure, reliable shopping with M-Pesa payments.',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
    accent: '#E67A00',
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const completeOnboarding = () => {
    localStorage.setItem('linet_onboarding_seen', 'true');
    navigate('/login');
  };

  const next = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1);
    else completeOnboarding();
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-between items-center p-6">
        {current > 0 ? (
          <button onClick={() => setCurrent(c => c - 1)} className="flex items-center gap-2 text-slate-500 font-medium text-sm">
            <ChevronLeft size={16} /> Back
          </button>
        ) : <div />}
        <button onClick={completeOnboarding} className="text-slate-400 text-sm font-medium hover:text-slate-600">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="w-72 h-72 rounded-3xl overflow-hidden mb-10 shadow-2xl relative">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <motion.div
                className="absolute bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ background: slide.accent }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon size={24} className="text-white" />
              </motion.div>
            </div>

            <h1 className="font-display font-bold text-4xl text-[#0A0F1E] mb-4">{slide.title}</h1>
            <p className="text-slate-500 text-lg leading-relaxed">{slide.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-10 mb-8">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#005BB5]' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>

        <button
          onClick={next}
          className="btn-primary w-full max-w-sm py-4 flex items-center justify-center gap-2 text-lg"
        >
          {current < slides.length - 1 ? 'Continue' : 'Get Started'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
