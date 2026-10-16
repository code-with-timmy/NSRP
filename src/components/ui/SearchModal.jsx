import { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allPages = [
  { label: 'Staff Guide', path: '/staff-guide', desc: 'Complete guide for all staff members' },
  { label: 'Moderator Rules', path: '/moderator-rules', desc: 'Rules and expectations for moderators' },
  { label: 'Administration Rules', path: '/administration-rules', desc: 'Admin-level policies and responsibilities' },
  { label: 'Department Information', path: '/department-information', desc: 'Info on police, fire, and EMS departments' },
  { label: 'In-Game Rules', path: '/in-game-rules', desc: 'ER:LC roleplay violations and punishments' },
  { label: 'Staff Activity & Quotas', path: '/staff-activity-quotas', desc: 'Weekly activity requirements by rank' },
  { label: 'Server Rules', path: '/server-rules', desc: 'General community and Discord rules' },
  { label: 'Training Information', path: '/training-information', desc: 'Staff training requirements and procedures' },
  { label: 'Staff Commands', path: '/staff-commands', desc: 'Complete list of in-game staff commands' },
  { label: 'Application Information', path: '/application-information', desc: 'How to apply for staff positions' },
  { label: 'FAQ', path: '/faq', desc: 'Frequently asked questions' },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const results = query.trim()
    ? allPages.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase())
      )
    : allPages;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-xl glass-strong border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
          <Search size={18} className="text-white/30 flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search guides, rules, commands..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/25"
          />
          <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto scrollbar-thin p-2">
          {results.length === 0 ? (
            <div className="text-center py-8 text-white/30 text-sm">No results found</div>
          ) : (
            results.map((page) => (
              <button
                key={page.path}
                onClick={() => handleSelect(page.path)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all group text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{page.label}</div>
                  <div className="text-xs text-white/30 mt-0.5 truncate">{page.desc}</div>
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-3 text-[10px] text-white/20">
          <span>↵ to select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}