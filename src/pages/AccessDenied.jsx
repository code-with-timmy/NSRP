import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="orb w-96 h-96 bg-red-600/6 top-[-100px] left-[-100px]" />
        <div className="bg-grid absolute inset-0 opacity-20" />
      </div>

      <div className="relative text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
          <Lock size={28} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-sm text-white/40 leading-relaxed mb-6">
          Your Discord account does not have the <span className="text-white/70 font-medium">Staff Team</span> role required to access this portal. If you believe this is an error, contact a Management Team member.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 glass border border-white/10 text-white/60 hover:text-white px-4 py-2 rounded-xl text-sm transition-all hover:border-white/20"
        >
          <ArrowLeft size={14} />
          Back to Staff Hub
        </Link>
      </div>
    </div>
  );
}