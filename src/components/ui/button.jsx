import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-[#4A2A1A] text-white hover:bg-[#6D3F23] shadow-sm',
  outline: 'border border-[#D9D2CB] bg-[#F7F3EF] text-[#421313] hover:bg-[#f2e9e0]',
  ghost: 'text-[#421313] hover:bg-[#f2e9e0]',
  destructive: 'bg-[#E54545] text-white hover:bg-[#c93c3c]',
  accent: 'bg-[#391212] text-white hover:bg-[#4A2A1A]',
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
