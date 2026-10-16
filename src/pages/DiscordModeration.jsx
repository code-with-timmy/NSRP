import { MessageSquare, ChevronDown, ArrowRight, CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';

const Panel = ({ title, accentColor = 'blue', defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  const colors = {
    blue: 'border-blue-500/20',
    yellow: 'border-yellow-500/20',
    orange: 'border-orange-500/20',
    red: 'border-red-500/20',
    darkred: 'border-red-800/20',
    green: 'border-green-500/20',
    purple: 'border-purple-500/20'
  };
  return (
    <div className={`glass cv-auto border rounded-2xl overflow-hidden transition-colors duration-200 ${open ? colors[accentColor] : 'border-white/5'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group">
        
        <span className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{title}</span>
        <ChevronDown size={16} className={`text-white/30 transition-transform duration-300 flex-shrink-0 ml-2 ${open ? 'rotate-180 text-blue-400' : ''}`} />
      </button>
      {open &&
      <div className="px-5 pb-6 border-t border-white/5">
          <div className="pt-5 space-y-5">{children}</div>
        </div>
      }
    </div>);

};

const SectionLabel = ({ children }) =>
<div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3">{children}</div>;


const BulletItem = ({ children, icon }) =>
<div className="flex items-start gap-2.5 py-1">
    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0 mt-1.5" />
    <span className="text-sm text-white/55 leading-snug">{children}</span>
  </div>;


const PunishmentTag = ({ label, color }) => {
  const colors = {
    green: 'bg-green-500/15 text-green-400 border-green-500/30',
    yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    darkred: 'bg-red-900/30 text-red-300 border-red-800/40',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30'
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${colors[color] || colors.blue}`}>
      {label}
    </span>);

};

const EscalationRow = ({ step, result, stepColor, resultColor }) => {
  const stepColors = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    orange: 'text-orange-400',
    red: 'text-red-400',
    darkred: 'text-red-300',
    blue: 'text-blue-400',
    white: 'text-white/70'
  };
  return (
    <div className="flex items-center justify-between gap-4 py-3 px-4 border-b border-white/5 last:border-0">
      <span className={`text-sm font-semibold ${stepColors[stepColor] || 'text-white/70'}`}>{step}</span>
      <div className="flex items-center gap-2">
        <ArrowRight size={13} className="text-white/20" />
        <span className={`text-sm font-bold ${stepColors[resultColor] || 'text-white'}`}>{result}</span>
      </div>
    </div>);

};

export default function DiscordModeration() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Discord Moderation"
        subtitle="Guidelines and escalation procedures for moderating the Nevada State Roleplay Discord server."
        icon={MessageSquare}
        badge="Discord" />
      

      {/* Philosophy Card */}
      <div className="relative glass-strong border border-blue-500/15 rounded-3xl p-6 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(59, 130, 246, 0.12), transparent 100%)' }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl btn-glow flex items-center justify-center flex-shrink-0">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <div className="text-base font-black text-white mb-1 tracking-wide">Moderation Philosophy</div>
              <div className="text-xs text-white/35">Core expectations for all Discord staff</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Staff Are Expected To</div>
              <div className="space-y-2">
                {['Stay professional and unbiased', 'De-escalate situations whenever possible', 'Use the lowest effective punishment first', 'Document all major actions', 'Treat all members fairly'].map((item) =>
                <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Punishments Should Escalate Based On</div>
              <div className="space-y-2">
                {['Severity of the violation', 'Repeated behavior', 'Intent of the member', 'Impact on the community'].map((item) =>
                <div key={item} className="flex items-start gap-2.5">
                    <ArrowRight size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">

        {/* Minor Moderation */}
        <Panel title="Minor Moderation" accentColor="green" defaultOpen>
          <div>
            <SectionLabel>Purpose</SectionLabel>
            <p className="text-sm text-white/55 leading-relaxed">Used for low-level rule violations that do not seriously disrupt the community.</p>
          </div>
          <div>
            <SectionLabel>Examples</SectionLabel>
            <div className="space-y-0.5">
              {['Mild spam', 'Talking over others repeatedly', 'Soundboard misuse', 'Minor disrespect', 'Brief mic abuse', 'Inappropriate jokes that are not severe', 'Excessive yelling', 'Backseat moderating', 'Minor VC trolling'].map((ex) => <BulletItem key={ex}>{ex}</BulletItem>)}
            </div>
          </div>
          <div>
            <SectionLabel>Punishments</SectionLabel>
            <div className="flex flex-wrap gap-2">
              <PunishmentTag label="Verbal Warning" color="green" />
              <PunishmentTag label="Text Warning" color="green" />
              <PunishmentTag label="VC Warning" color="green" />
              <PunishmentTag label="Temp Mute (1–10 min)" color="yellow" />
              <PunishmentTag label="Temp VC Removal" color="yellow" />
              <PunishmentTag label="Message Deletion" color="blue" />
            </div>
          </div>
          <div className="glass border border-yellow-500/15 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-yellow-400 mb-1">Escalation</div>
            <p className="text-xs text-white/50">Repeated minor offenses may escalate into <strong className="text-yellow-400">Major Moderation</strong>.</p>
          </div>
          <div className="glass border border-blue-500/15 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-blue-400 mb-2">Staff Notes</div>
            <div className="space-y-1 text-xs text-white/50">
              <p>• Keep interactions calm and composed.</p>
              <p>• Clearly explain which rule was violated.</p>
              <p>• Avoid arguing with members.</p>
            </div>
          </div>
        </Panel>

        {/* Major Moderation */}
        <Panel title="Major Moderation" accentColor="yellow">
          <div>
            <SectionLabel>Purpose</SectionLabel>
            <p className="text-sm text-white/55 leading-relaxed">Used for significant disruptions or repeated rule violations.</p>
          </div>
          <div>
            <SectionLabel>Examples</SectionLabel>
            <div className="space-y-0.5">
              {['Repeated toxicity', 'Harassment', 'Intentional VC disruption', 'Serious disrespect toward staff', 'Racist or sexist jokes without slurs', 'Rejoining VC to continue arguments', 'Excessive trolling', 'Ignoring multiple warnings', 'Moderate NSFW references', 'Toxic roleplay behavior affecting others'].map((ex) => <BulletItem key={ex}>{ex}</BulletItem>)}
            </div>
          </div>
          <div>
            <SectionLabel>Punishments</SectionLabel>
            <div className="flex flex-wrap gap-2">
              <PunishmentTag label="Formal Warning" color="yellow" />
              <PunishmentTag label="VC Mute (10–60 min)" color="yellow" />
              <PunishmentTag label="Server Kick" color="orange" />
              <PunishmentTag label="Temp VC Blacklist" color="orange" />
              <PunishmentTag label="Timeout (1h–3d)" color="orange" />
              <PunishmentTag label="Event Restriction" color="orange" />
              <PunishmentTag label="Strike on Record" color="red" />
            </div>
          </div>
          <div className="glass border border-orange-500/15 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-orange-400 mb-1">Escalation</div>
            <p className="text-xs text-white/50">Multiple Major Moderation incidents may escalate into <strong className="text-orange-400">Severe Moderation</strong>.</p>
          </div>
          <div className="glass border border-blue-500/15 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-blue-400 mb-2">Staff Notes</div>
            <div className="space-y-1 text-xs text-white/50">
              <p>• Document all actions in moderation logs.</p>
              <p>• Include evidence whenever possible.</p>
              <p>• Obtain a second staff opinion for longer punishments.</p>
            </div>
          </div>
        </Panel>

        {/* Severe Moderation */}
        <Panel title="Severe Moderation / Strict Moderation" accentColor="orange">
          <div>
            <SectionLabel>Purpose</SectionLabel>
            <p className="text-sm text-white/55 leading-relaxed">Used for severe violations, targeted harassment, or dangerous behavior.</p>
          </div>
          <div>
            <SectionLabel>Examples</SectionLabel>
            <div className="space-y-0.5">
              {['Hate speech or slurs', 'Serious harassment', 'Threats', 'Doxxing threats', 'Explicit NSFW audio or content', 'Mass VC disruption', 'Staff impersonation', 'False staff reports made maliciously', 'Punishment evasion', 'Severe toxicity', 'Encouraging self-harm', 'Extreme mic spam or soundboard abuse', 'Discriminatory behavior'].map((ex) => <BulletItem key={ex}>{ex}</BulletItem>)}
            </div>
          </div>
          <div>
            <SectionLabel>Punishments</SectionLabel>
            <div className="flex flex-wrap gap-2">
              <PunishmentTag label="Long Timeout (3–30 days)" color="orange" />
              <PunishmentTag label="Temp Server Ban" color="red" />
              <PunishmentTag label="Permanent VC Blacklist" color="red" />
              <PunishmentTag label="Event Removal" color="red" />
              <PunishmentTag label="Role Removal" color="red" />
              <PunishmentTag label="Probation Status" color="orange" />
            </div>
          </div>
          <div className="glass border border-red-500/15 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-red-400 mb-1">Escalation</div>
            <p className="text-xs text-white/50">Severe violations may immediately escalate into <strong className="text-red-400">Full Enforcement</strong> depending on severity.</p>
          </div>
          <div className="glass border border-blue-500/15 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-blue-400 mb-2">Staff Notes</div>
            <div className="space-y-1 text-xs text-white/50">
              <p>• Evidence is <strong className="text-white/70">required</strong> for all actions at this level.</p>
              <p>• Notify senior staff or administrators.</p>
              <p>• Remain neutral and factual at all times.</p>
            </div>
          </div>
        </Panel>

        {/* Full Enforcement */}
        <Panel title="Full Enforcement / Administrative Action" accentColor="red">
          <div>
            <SectionLabel>Purpose</SectionLabel>
            <p className="text-sm text-white/55 leading-relaxed">Reserved for extreme behavior that threatens the safety or stability of the community.</p>
          </div>
          <div>
            <SectionLabel>Examples</SectionLabel>
            <div className="space-y-0.5">
              {['Doxxing', 'Credible threats', 'Raiding', 'NSFW involving minors', 'Extreme harassment', 'Ban evasion', 'Malicious server attacks', 'Hate group promotion', 'Illegal content', 'Repeated severe offenses', 'Staff corruption or abuse', 'Attempting to intentionally crash events'].map((ex) => <BulletItem key={ex}>{ex}</BulletItem>)}
            </div>
          </div>
          <div>
            <SectionLabel>Punishments</SectionLabel>
            <div className="flex flex-wrap gap-2">
              <PunishmentTag label="Permanent Ban" color="darkred" />
              <PunishmentTag label="Permanent Blacklist" color="darkred" />
              <PunishmentTag label="Appeal Denial" color="red" />
              <PunishmentTag label="Staff Removal" color="red" />
              <PunishmentTag label="Partnership Blacklist" color="red" />
              <PunishmentTag label="Report to Discord T&S" color="orange" />
            </div>
          </div>
          <div className="glass border border-red-800/30 bg-red-900/8 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-red-300 mb-2">Staff Notes</div>
            <div className="space-y-1 text-xs text-red-300/70">
              <p>• Senior staff or admin approval strongly preferred.</p>
              <p>• Preserve all evidence without exception.</p>
              <p>• Avoid public arguments — keep all discussions private.</p>
              <p>• Never leak moderation discussions under any circumstances.</p>
            </div>
          </div>
        </Panel>

        {/* Escalation Table */}
        <div className="glass-strong border border-white/8 rounded-2xl pt-5 pr-5 pb-5 pl-5">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle size={16} className="text-blue-400" />
            <div className="text-sm font-bold text-white">Punishment Escalation Example</div>
          </div>
          <div className="glass border border-white/5 rounded-xl overflow-hidden">
            <EscalationRow step="1st Minor Offense" result="Warning" stepColor="green" resultColor="green" />
            <EscalationRow step="2nd Minor Offense" result="VC Mute" stepColor="yellow" resultColor="yellow" />
            <EscalationRow step="3rd Minor Offense" result="Timeout" stepColor="orange" resultColor="orange" />
            <EscalationRow step="Continued Behavior" result="Major Moderation" stepColor="orange" resultColor="orange" />
            <EscalationRow step="Severe Rule Break" result="Severe Moderation" stepColor="red" resultColor="red" />
            <EscalationRow step="Extreme / Dangerous Behavior" result="Full Enforcement" stepColor="darkred" resultColor="darkred" />
          </div>
        </div>

      </div>

      <div className="glass border border-blue-500/20 rounded-2xl p-4">
        <p className="text-sm text-blue-400/80 leading-relaxed">
          <strong className="text-blue-400">Reminder:</strong> Always document your moderation actions. Consistent, fair, and evidence-based moderation is the standard expected of all Nevada State Roleplay Discord staff.
        </p>
      </div>
    </div>);

}