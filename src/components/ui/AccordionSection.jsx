import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AccordionSection({ title, children, defaultOpen = false, badge = null, icon = null }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`glass cv-auto border rounded-2xl overflow-hidden transition-colors duration-200 ${open ? 'border-blue-500/20' : 'border-white/5'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{title}</span>
          {badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-white/30 transition-transform duration-300 ${open ? 'rotate-180 text-blue-400' : ''}`}
        />
      </button>
      
      {open && (
        <div className="px-5 pb-5 border-t border-white/5">
          <div className="pt-4 text-sm text-white/60 leading-relaxed space-y-3">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}