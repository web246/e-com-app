import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex w-full rounded-xl border border-[#D9D2CB] bg-white px-3 py-2 text-sm text-[#421313] placeholder:text-[#8b6f63] outline-none transition-colors focus:border-[#46B8FF] focus:ring-2 focus:ring-[#46B8FF]/20 disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';
