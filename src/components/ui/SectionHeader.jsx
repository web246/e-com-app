import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, badge, viewAllTo }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6 mt-4 sm:mt-6">
      <div>
        {badge && (
          <span className="badge-pill mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#111111]">{badge}</span>
        )}
        <h2 className="font-display font-bold text-xl sm:text-2xl text-[#111111] leading-tight">{title}</h2>
        {subtitle && <p className="text-[#333333] text-sm mt-1 max-w-xl">{subtitle}</p>}
      </div>
      {viewAllTo && (
        <Link to={viewAllTo} className="flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#333333] transition-colors">
          View All <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
