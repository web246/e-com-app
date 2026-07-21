import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SectionHeader({ title, subtitle, badge, viewAllTo }) {
  return (
    <div className="flex items-end justify-between mb-4 sm:mb-5">
      <div>
        {badge && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A2A1A] bg-[#F6EBDD] border border-[#D9B48A] px-3 py-1.5 rounded-full mb-2 shadow-sm">{badge}</span>
        )}
        <h2 className="font-display font-bold text-xl sm:text-2xl text-brown">{title}</h2>
        {subtitle && <p className="text-[#6f5848] text-sm mt-0.5">{subtitle}</p>}
      </div>
      {viewAllTo && (
        <Link to={viewAllTo} className="flex items-center gap-0.5 text-sm font-semibold text-brand flex-shrink-0">
          View All <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
