import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-[#0A0F1E] placeholder:text-slate-400 outline-none transition-colors focus:border-[#005BB5] focus:ring-2 focus:ring-[#005BB5]/20 disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';
