import { Shield, Users, Info } from 'lucide-react';
import { TEAMS } from '@/lib/roleColors';

function RoleRow({ team, count }) {
  const { palette } = team;

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 min-h-[64px] hover:bg-white/[0.03] transition-colors">
      <span className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${palette.iconBox}`}>
        <Shield size={18} strokeWidth={1.75} />
      </span>
      <span className={`flex-1 min-w-0 text-sm font-semibold truncate ${palette.text}`}>
        {team.name}
      </span>
      <span className="flex items-center gap-1.5 text-xs font-semibold text-white/40 flex-shrink-0">
        <Users size={14} strokeWidth={1.75} />
        {count ?? '—'}
      </span>
    </div>
  );
}

export default function EscalationChain({ counts = {} }) {
  return (
    <div className="space-y-3">
      <div className="glass border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
        {TEAMS.map((team) => (
          <RoleRow key={team.name} team={team} count={counts[team.name]} />
        ))}
      </div>

      <div className="glass border border-blue-500/20 bg-blue-500/5 rounded-2xl px-4 py-3.5 flex items-start gap-3">
        <Info size={16} strokeWidth={1.75} className="text-blue-400 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Important</p>
          <p className="text-xs text-white/60 leading-relaxed mt-1">
            Always attempt to resolve situations at your level before escalating. Document all escalations in the staff log channel.
          </p>
        </div>
      </div>
    </div>
  );
}