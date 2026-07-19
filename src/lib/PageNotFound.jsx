import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-[#EFF6FF] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display font-bold text-6xl text-[#005BB5] mb-3">404</h1>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary px-8 py-3">Go Home</Link>
    </div>
  );
}
