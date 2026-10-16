import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function PolicyPanel({ title, icon: Icon, accent, items = [], defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-300 ${accent.panel}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-5 sm:px-6 sm:py-6 text-left group"
      >
        <span className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${accent.icon}`}>
          <Icon size={22} strokeWidth={1.5} />
        </span>
        <span className={`flex-1 min-w-0 text-base sm:text-[17px] font-semibold tracking-tight leading-snug transition-colors ${accent.heading} group-hover:brightness-125`}>
          {title}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.75}
          className={`flex-shrink-0 transition-transform duration-300 ${accent.chevron} ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-[88px]">
          {items.length > 0 && (
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                  <span className={`mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent.dot}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {children}
        </div>
      )}
    </div>
  );
}