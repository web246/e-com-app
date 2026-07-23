import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import image1 from '@/assets/onboarding-1.png';
import image2 from '@/assets/onboarding-2.png';
import image3 from '@/assets/onboarding-3.png';

const slides = [
  {
    title: 'Straight to your door',
    description: 'Ready to shop? Browse with easy filtering options and intuitive navigation.',
    image: image1,
  },
  {
    title: 'Level Up Your Style',
    description: 'Shop smarter, dress bolder, and embrace your individuality to inspire every fashion moment.',
    image: image2,
  },
  {
    title: 'Build Your Wishlist',
    description: 'Start building your dream wardrobe and save your favourite items to access them later.',
    image: image3,
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const completeOnboarding = () => {
    localStorage.setItem('linet_onboarding_seen', 'true');
    navigate('/login', { replace: true });
  };

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent((value) => value + 1);
    } else {
      completeOnboarding();
    }
  };

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#FFF8F1_0%,#F6EBDD_100%)] flex flex-col">
      <div className="flex justify-between items-center p-6">
        {current > 0 ? (
          <button onClick={() => setCurrent(c => c - 1)} className="text-[#6D3F23] font-medium text-sm">Back</button>
        ) : <div />}
        <button onClick={completeOnboarding} className="text-[#7A4F2D] text-sm font-medium hover:text-[#4A2A1A]">Skip</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            <div className="w-72 h-72 rounded-[2rem] overflow-hidden mb-10 shadow-[0_20px_60px_rgba(74,42,26,0.15)] relative border border-[#E6D1B6]">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F1A0F]/30 to-transparent" />
            </div>

            <h1 className="font-display font-bold text-4xl text-[#3F2415] mb-4">{slide.title}</h1>
            <p className="text-[#6F5848] text-lg leading-relaxed">{slide.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-10 mb-8">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#4A2A1A]' : 'w-2 bg-[#D8C2A6]'}`} />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="w-full max-w-sm py-4 text-lg rounded-2xl font-semibold text-white shadow-lg bg-[#4A2A1A] hover:bg-[#6D3F23] transition-all"
        >
          {current < slides.length - 1 ? 'Continue' : 'Get Started'}
        </button>
      </div>
    </div>
  );
}
