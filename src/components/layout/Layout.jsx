import { useState, useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import SearchModal from '../ui/SearchModal';

function PageLoading() {
  return (
    <div className="flex items-center justify-center gap-2 py-24 text-sm text-white/30">
      <Loader2 size={15} className="animate-spin" />
      Loading…
    </div>
  );
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Background: two static gradient layers, painted once */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orbs absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-40" />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onMenuToggle={() => setSidebarOpen(true)}
          onSearchOpen={() => setSearchOpen(true)}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Suspense fallback={<PageLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}