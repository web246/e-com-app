import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useToast, registerToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';

export function Toaster() {
  const { toasts, toast } = useToast();

  useEffect(() => { registerToast(toast); }, [toast]);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className={`glass rounded-2xl px-4 py-3 shadow-lg flex items-start gap-2 max-w-xs pointer-events-auto ${t.variant === 'destructive' ? 'border-red-200' : ''}`}
          >
            {t.variant === 'destructive'
              ? <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
              : <CheckCircle2 size={18} className="text-[#005BB5] mt-0.5 flex-shrink-0" />}
            <div>
              {t.title && <p className="font-semibold text-sm text-[#0A0F1E]">{t.title}</p>}
              {t.description && <p className="text-xs text-slate-500 mt-0.5">{t.description}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
