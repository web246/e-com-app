import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, badge, viewAllTo }) {
  return (
    <div className="flex items-end justify-between mb-4 sm:mb-5">
      <div>
        {badge && (
          <span className="inline-block text-xs font-semibold text-[#E67A00] bg-orange-50 px-2.5 py-1 rounded-full mb-2">{badge}</span>
        )}
        <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0A0F1E]">{title}</h2>
        {subtitle && <p className="text-slate-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {viewAllTo && (
        <Link to={viewAllTo} className="flex items-center gap-0.5 text-sm font-semibold text-[#005BB5] flex-shrink-0">
          View All <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
