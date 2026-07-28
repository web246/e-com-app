import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-[#7D2B2B] text-white hover:bg-[#A24A3A] shadow-sm',
  outline: 'border border-[#D9D2CB] bg-[#F7F3EF] text-[#421313] hover:bg-[#f2e9e0]',
  ghost: 'text-[#421313] hover:bg-[#f2e9e0]',
  destructive: 'bg-[#E54545] text-white hover:bg-[#c93c3c]',
  accent: 'bg-[#7D2B2B] text-white hover:bg-[#A24A3A]',
};

const sizes = {
  default: 'h-11 px-5 text-sm',
  sm: 'h-9 px-3 text-xs',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
};

export const Button = forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold font-display transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = 'Button';
