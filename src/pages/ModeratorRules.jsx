import { Shield, AlertTriangle, ChevronDown, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';

const Panel = ({ title, accentColor = 'blue', defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  const colors = {
    blue: 'border-blue-500/20',
    yellow: 'border-yellow-500/20',
    orange: 'border-orange-500/20',
    red: 'border-red-500/20',
    green: 'border-green-500/20',
    purple: 'border-purple-500/20',
  };
  return (
    <div className={`glass cv-auto border rounded-2xl overflow-hidden transition-colors duration-200 ${open ? colors[accentColor] : 'border-white/5'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <span className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{title}</span>
        <ChevronDown size={16} className={`text-white/30 transition-transform duration-300 flex-shrink-0 ml-2 ${open ? 'rotate-180 text-blue-400' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-6 border-t border-white/5">
          <div className="pt-5 space-y-4">{children}</div>
        </div>
      )}
    </div>
  );
};

const SectionLabel = ({ children }) => (
  <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3">{children}</div>
);

const ExampleItem = ({ children }) => (
  <div className="flex items-start gap-2.5 py-1.5">
    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0 mt-1.5" />
    <span className="text-sm text-white/55 leading-snug">{children}</span>
  </div>
);

const PunishmentTag = ({ label, color }) => {
  const colors = {
    green: 'bg-green-500/15 text-green-400 border-green-500/30',
    yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    darkred: 'bg-red-900/30 text-red-300 border-red-800/40',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${colors[color] || colors.blue}`}>
      {label}
    </span>
  );
};

const ProgressionStep = ({ label, color, isLast }) => {
  const colors = {
    green: 'bg-green-500/15 border-green-500/30 text-green-400',
    yellow: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400',
    orange: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
    red: 'bg-red-500/15 border-red-500/30 text-red-400',
    darkred: 'bg-red-900/20 border-red-800/30 text-red-300',
    blue: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold text-center ${colors[color]}`}>{label}</div>
      {!isLast && <ArrowRight size={14} className="text-white/20 flex-shrink-0" />}
    </div>
  );
};

const EscalationRow = ({ step, result, stepColor, resultColor }) => {
  const stepColors = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    orange: 'text-orange-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    white: 'text-white/70',
  };
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
      <span className={`text-sm font-semibold ${stepColors[stepColor] || 'text-white/70'}`}>{step}</span>
      <div className="flex items-center gap-2">
        <ArrowRight size={13} className="text-white/20" />
        <span className={`text-sm font-bold ${stepColors[resultColor] || 'text-white'}`}>{result}</span>
      </div>
    </div>
  );
};

export default function ModeratorRules() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Infraction System"
        subtitle="The official framework governing staff accountability, progressive discipline, and conduct expectations."
        icon={Shield}
        badge="Internal Policy"
      />

      {/* Purpose card */}
      <div className="glass-strong border border-blue-500/15 rounded-2xl p-5 space-y-4">
        <div className="text-sm font-bold text-white mb-1">Purpose of the Infraction System</div>
        <p className="text-sm text-white/50 leading-relaxed">The Staff Infraction System exists to maintain professionalism, ensure fair and consistent discipline, and encourage improvement before severe punishment.</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {['Maintain professionalism', 'Hold staff accountable', 'Create fair, consistent discipline', 'Prevent staff abuse', 'Encourage improvement'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
              <span className="text-sm text-white/60">{item}</span>
            </div>
          ))}
        </div>
        <div className="glass border border-red-500/20 bg-red-500/5 rounded-xl px-4 py-3">
          <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">Severe violations may immediately result in:</div>
          <div className="flex flex-wrap gap-2">
            <PunishmentTag label="Immediate Strike" color="orange" />
            <PunishmentTag label="Immediate Suspension" color="red" />
            <PunishmentTag label="Immediate Termination" color="darkred" />
          </div>
        </div>
      </div>

      <div className="space-y-3">

        {/* Progression */}
        <Panel title="Infraction Progression" accentColor="yellow" defaultOpen>
          <SectionLabel>Warning Path</SectionLabel>
          <div className="flex items-center gap-2 flex-wrap">
            <ProgressionStep label="Warning 1" color="green" />
            <ProgressionStep label="Warning 2" color="yellow" />
            <ProgressionStep label="Warning 3" color="orange" isLast />
          </div>
          <div className="glass border border-orange-500/20 bg-orange-500/5 rounded-xl px-4 py-3">
            <p className="text-sm text-orange-300 font-semibold">After Warning 3 → Staff receives <span className="text-orange-400 font-black">Strike 1</span></p>
          </div>
        </Panel>

        {/* Strike Path */}
        <Panel title="Strike Path" accentColor="orange">
          <SectionLabel>Strike Progression</SectionLabel>
          <div className="flex items-center gap-2 flex-wrap">
            <ProgressionStep label="Strike 1" color="yellow" />
            <ProgressionStep label="Strike 2" color="orange" />
            <ProgressionStep label="Strike 3" color="red" isLast />
          </div>
          <div className="glass border border-red-500/20 bg-red-500/5 rounded-xl px-4 py-3">
            <p className="text-sm text-red-300 font-semibold">After Strike 3 → <span className="text-red-400 font-black">7-Day Suspension</span></p>
          </div>
        </Panel>

        {/* Continued Violations */}
        <Panel title="Continued Violations After Suspension" accentColor="red">
          <p className="text-sm text-white/55 leading-relaxed">If problematic behavior continues after a suspension, the following escalations apply:</p>
          <div className="space-y-2">
            {[
              { label: 'Extended Suspension', color: 'orange' },
              { label: 'Demotion', color: 'orange' },
              { label: 'Administrative Review', color: 'red' },
              { label: 'Termination', color: 'darkred' },
            ].map(({ label, color }) => (
              <div key={label} className={`glass border rounded-xl px-4 py-2.5 flex items-center gap-3 ${
                label === 'Termination' ? 'border-red-800/30 bg-red-900/10' : 'border-white/5'
              }`}>
                <ArrowRight size={13} className="text-white/25 flex-shrink-0" />
                <PunishmentTag label={label} color={color} />
              </div>
            ))}
          </div>
        </Panel>

        {/* Infraction Reference Guide */}
        <Panel title="Infraction Reference — Warning Level" accentColor="green">
          <p className="text-sm text-white/55 leading-relaxed">Used for minor staff mistakes or low-level professionalism issues.</p>
          <SectionLabel>Examples</SectionLabel>
          <div className="space-y-0.5">
            {['Minor inactivity', 'Small moderation mistakes', 'Forgetting to log actions', 'Light unprofessional behavior', 'Minor misuse of permissions', 'Excessive joking while on duty', 'Occasionally failing to respond to staff pings', 'Minor disrespect', 'Non-serious command misuse', 'Brief arguments in staff channels'].map(ex => <ExampleItem key={ex}>{ex}</ExampleItem>)}
          </div>
          <SectionLabel>Punishments</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <PunishmentTag label="Verbal Warning" color="green" />
            <PunishmentTag label="Written Warning 1" color="green" />
            <PunishmentTag label="Written Warning 2" color="yellow" />
            <PunishmentTag label="Written Warning 3" color="orange" />
          </div>
          <div className="glass border border-blue-500/15 rounded-xl px-4 py-3 text-xs text-blue-300/80 space-y-1">
            <p>• Warnings should include improvement guidance.</p>
            <p>• Staff should acknowledge warnings.</p>
            <p>• Repeated warning-level behavior escalates into strikes.</p>
          </div>
        </Panel>

        <Panel title="Infraction Reference — Strike Level" accentColor="yellow">
          <p className="text-sm text-white/55 leading-relaxed">Used for serious misconduct or repeated warning-level behavior.</p>
          <SectionLabel>Examples</SectionLabel>
          <div className="space-y-0.5">
            {['Repeated unprofessional behavior', 'Consistent inactivity', 'Abuse of minor permissions', 'Toxic behavior toward members', 'Failure to follow procedures', 'Ignoring higher staff instructions', 'Emotionally driven moderation', 'Public arguments with members', 'Leaking minor internal information', 'Repeated failure to log punishments', 'Disrespect toward staff members'].map(ex => <ExampleItem key={ex}>{ex}</ExampleItem>)}
          </div>
          <SectionLabel>Punishments</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <PunishmentTag label="Strike 1" color="yellow" />
            <PunishmentTag label="Strike 2" color="orange" />
            <PunishmentTag label="Strike 3" color="red" />
            <PunishmentTag label="Permission Removal" color="red" />
          </div>
          <div className="glass border border-orange-500/20 bg-orange-500/5 rounded-xl px-4 py-3 text-xs text-orange-300/90">
            Strike 3 automatically results in a <strong>7-day suspension</strong>. Strikes remain on record longer than warnings.
          </div>
        </Panel>

        <Panel title="Infraction Reference — Suspension Level" accentColor="orange">
          <p className="text-sm text-white/55 leading-relaxed">Used for severe misconduct that damages the staff team or community.</p>
          <SectionLabel>Examples</SectionLabel>
          <div className="space-y-0.5">
            {['Major abuse of permissions', 'Severe staff toxicity', 'Harassment', 'Leaking confidential staff information', 'Severe inactivity without notice', 'Intentionally false punishments', 'Threatening members', 'Discrimination', 'Creating staff drama', 'Retaliation moderation', 'Intentionally bypassing policies', 'Major disrespect toward leadership'].map(ex => <ExampleItem key={ex}>{ex}</ExampleItem>)}
          </div>
          <SectionLabel>Punishments</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <PunishmentTag label="Suspension (1–30 days)" color="orange" />
            <PunishmentTag label="Duty Removal" color="orange" />
            <PunishmentTag label="Administrative Review" color="red" />
          </div>
          <div className="glass border border-red-500/20 bg-red-500/5 rounded-xl px-4 py-3 text-xs text-red-300/90">
            Evidence is required. Leadership review is recommended. Suspension does not guarantee reinstatement.
          </div>
        </Panel>

        <Panel title="Infraction Reference — Termination Level" accentColor="red">
          <p className="text-sm text-white/55 leading-relaxed">Reserved for extreme staff misconduct or betrayal of trust.</p>
          <SectionLabel>Examples</SectionLabel>
          <div className="space-y-0.5">
            {['Admin abuse', 'Malicious moderation', 'Leaking sensitive staff documents', 'Doxxing', 'Threats', 'Ban abuse', 'Corruption or favoritism', 'Hate speech or slurs', 'NSFW involving minors', 'Ban evasion while staff', 'Server sabotage', 'Intentional community damage', 'Creating fake evidence'].map(ex => <ExampleItem key={ex}>{ex}</ExampleItem>)}
          </div>
          <SectionLabel>Punishments</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <PunishmentTag label="Immediate Termination" color="darkred" />
            <PunishmentTag label="Permanent Blacklist" color="darkred" />
            <PunishmentTag label="Appeal Denial" color="red" />
          </div>
          <div className="glass border border-red-800/30 bg-red-900/10 rounded-xl px-4 py-3 text-xs text-red-300/90">
            Zero tolerance policy. Senior administration review strongly recommended. Preserve all evidence.
          </div>
        </Panel>

        {/* Example Escalation */}
        <Panel title="Example Escalation Timeline" accentColor="blue">
          <div className="glass border border-white/5 rounded-xl overflow-hidden">
            <EscalationRow step="Warning 1" result="Reminder / Coaching" stepColor="green" resultColor="green" />
            <EscalationRow step="Warning 2" result="Formal Warning" stepColor="yellow" resultColor="yellow" />
            <EscalationRow step="Warning 3" result="Strike 1" stepColor="orange" resultColor="orange" />
            <EscalationRow step="Strike 2" result="Final Staff Warning" stepColor="orange" resultColor="orange" />
            <EscalationRow step="Strike 3" result="7-Day Suspension" stepColor="red" resultColor="red" />
            <EscalationRow step="Continued Issues" result="Termination Review" stepColor="red" resultColor="red" />
          </div>
        </Panel>

        {/* Appeal Policy */}
        <Panel title="Appeal Policy" accentColor="blue">
          <SectionLabel>Staff May Appeal</SectionLabel>
          <div className="flex flex-wrap gap-2 mb-4">
            <PunishmentTag label="Strikes" color="yellow" />
            <PunishmentTag label="Suspensions" color="orange" />
            <PunishmentTag label="Terminations" color="red" />
          </div>
          <div className="glass border border-red-500/20 bg-red-500/5 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">Appeals may be denied if:</div>
            <div className="space-y-1.5">
              {['Evidence is overwhelming', 'The behavior severely harmed the community', 'The staff member acted maliciously', 'Trust can no longer be restored'].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <XCircle size={12} className="text-red-400/60 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-red-300/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className="glass border border-yellow-500/20 rounded-2xl p-4">
        <p className="text-sm text-yellow-400/80 leading-relaxed">
          <strong className="text-yellow-400">Important:</strong> Violations of these rules are handled by the Internal Affairs Team. If you witness another staff member breaking these rules, report it through the proper Support Channel. Do not attempt to discipline peers at the same rank level.
        </p>
      </div>
    </div>
  );
}