import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Truck, Lock, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';
import splashCart from '@/assets/splash-cart.png';
import imageBrowse from '@/assets/onboarding-browse.png';
import imageDeliver from '@/assets/onboarding-deliver.png';
import imageShop from '@/assets/onboarding-shop.png';

const features = [
  { icon: Truck, label: 'Fast Delivery' },
  { icon: Lock, label: 'Secure Pay' },
  { icon: MapPin, label: 'Worldwide' },
];

const steps = [
  {
    title: 'Explore Global Stores.',
    description:
      'Browse thousands of products from the UK, US, UAE and China, all in one place.',
    image: imageBrowse,
  },
  {
    title: 'We Deliver Worldwide.',
    description:
      'Wherever you shop from, we get your order delivered straight to your door.',
    image: imageDeliver,
  },
  {
    title: 'Enjoy Easy Shopping.',
    description:
      'Fast checkout, secure payments, and order tracking, all in a few simple taps.',
    image: imageShop,
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
    if (current < steps.length) {
      setCurrent((value) => value + 1);
    } else {
      completeOnboarding();
    }
  };

  const isIntro = current === 0;
  const stepIndex = current - 1;
  const step = steps[stepIndex];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-end items-center px-6 pt-6 pb-2">
        <button
          type="button"
          onClick={completeOnboarding}
          className="text-[#8A8A8A] text-sm font-medium hover:text-[var(--color-brown)]"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-10">
        <AnimatePresence mode="wait">
          {isIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col items-center text-center w-full max-w-sm"
            >
              <img
                src={logo}
                alt="Dennis Mendez"
                className="w-24 h-24 object-contain mb-5"
              />
              <h1 className="font-brand text-3xl text-[#1A1A1A] mb-2">
                Dennis Mendez.
              </h1>
              <p className="text-[#6B6B6B] text-base mb-8">
                The Complete Online Store
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {features.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-xs font-medium"
                    style={{ backgroundColor: 'var(--color-brown)' }}
                  >
                    <Icon size={14} strokeWidth={2.25} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <img
                src={splashCart}
                alt=""
                className="w-44 h-auto object-contain mb-10"
              />
            </motion.div>
          ) : (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col items-center text-center w-full max-w-sm"
            >
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#F3F3F3] overflow-hidden mb-8 flex items-center justify-center">
                <img
                  src={step.image}
                  alt=""
                  className="w-[88%] h-[88%] object-contain"
                />
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#1A1A1A] mb-3">
                {step.title}
              </h1>
              <p className="text-[#6B6B6B] text-base leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!isIntro && (
          <div className="flex gap-2 mt-8 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === stepIndex
                    ? 'w-2.5 bg-[var(--color-brown)]'
                    : 'w-2 bg-[#D9D9D9]'
                }`}
              />
            ))}
          </div>
        )}

        {isIntro && <div className="mt-2 mb-6" />}

        <button
          type="button"
          onClick={next}
          className="w-full max-w-sm py-4 text-lg rounded-2xl font-semibold text-white shadow-md transition-colors hover:opacity-90"
          style={{ backgroundColor: 'var(--color-brown)' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
