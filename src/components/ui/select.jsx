import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export function SimpleSelect({ value, onChange, options, className }) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'appearance-none pl-3 pr-8 py-2 h-9 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-white outline-none cursor-pointer',
          className
        )}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
