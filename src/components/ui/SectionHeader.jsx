import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, badge, viewAllTo }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        {badge && (
          <span className="badge-pill mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em]">{badge}</span>
        )}
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#4A2A1A] leading-tight">{title}</h2>
        {subtitle && <p className="text-[#6f5848] text-sm mt-1 max-w-xl">{subtitle}</p>}
      </div>
      {viewAllTo && (
        <Link to={viewAllTo} className="flex items-center gap-2 text-sm font-semibold text-brand-dark hover:text-[#4A2A1A] transition-colors">
          View All <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
