import { useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function PullToRefresh({ onRefresh, children }) {
  const startY = useRef(0);
  const [pulling, setPulling] = useState(false);
  const [distance, setDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const onTouchStart = (e) => {
    if (window.scrollY === 0) startY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e) => {
    if (window.scrollY === 0 && startY.current) {
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 0) {
        setPulling(true);
        setDistance(Math.min(delta, 80));
      }
    }
  };
  const onTouchEnd = async () => {
    if (distance > 50 && onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
    setPulling(false);
    setDistance(0);
    startY.current = 0;
  };

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {(pulling || refreshing) && (
        <div className="flex justify-center py-2" style={{ height: refreshing ? 40 : distance }}>
          <RefreshCw size={20} className={`text-brand ${refreshing ? 'animate-spin' : ''}`} />
        </div>
      )}
      {children}
    </div>
  );
}
