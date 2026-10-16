import { LogOut, Menu, Search, User } from 'lucide-react';
import { useSession } from '@/lib/session';

export default function Navbar({ onMenuToggle, onSearchOpen }) {
  const { user, logout } = useSession();

  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-white/5 px-4 lg:px-6 h-16 flex items-center gap-4">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden text-white/50 hover:text-white transition-colors p-2.5 rounded-xl hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <Menu size={22} />
      </button>

      {/* Title */}
      <div className="flex-1">
        <h1 className="text-sm font-semibold text-white/80 hidden sm:block">
          Staff Hub <span className="text-white/25 font-normal">— Nevada State Roleplay</span>
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-white/5 text-white/40 hover:text-white/70 hover:border-white/10 transition-all text-sm"
        >
          <Search size={14} />
          <span className="hidden sm:inline text-xs">Search...</span>
          <span className="hidden sm:inline text-[10px] glass px-1.5 py-0.5 rounded text-white/25 border border-white/5">⌘K</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Staff chip */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl glass border border-white/5">
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <User size={12} className="text-white" />
            </div>
          )}
          <div className="hidden sm:block text-left">
            <div className="text-xs font-medium text-white/80 leading-none max-w-[140px] truncate">
              {user?.name || 'Staff Member'}
            </div>
            <div className="text-[10px] text-white/30 mt-0.5">Staff Team</div>
          </div>
        </div>

        <button
          onClick={logout}
          title="Sign out"
          aria-label="Sign out"
          className="text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}