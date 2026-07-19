import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'gradient-primary text-white hover:opacity-95 shadow-sm',
  outline: 'border border-slate-200 bg-white text-[#0A0F1E] hover:bg-slate-50',
  ghost: 'text-[#0A0F1E] hover:bg-slate-100',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  accent: 'gradient-accent text-white hover:opacity-95',
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
