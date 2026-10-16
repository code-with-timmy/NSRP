import { useState } from 'react';
import { GraduationCap, ChevronDown, ChevronUp, CheckCircle2, HelpCircle, AlertTriangle, Star, MessageSquare, Swords, Search, XCircle, ClipboardCheck, Shield, Users, Car, ListChecks } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

// ─── NAV ITEMS ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'training-flow',       label: 'Training Flow',            icon: ListChecks },
  { id: 'before-training',     label: 'Before Training Begins',   icon: CheckCircle2 },
  { id: 'mod-expectations',    label: 'Moderator Expectations',   icon: Shield },
  { id: 'question-phase',      label: 'Question Phase',           icon: MessageSquare },
  { id: 'scenario-phase',      label: 'Scenario Phase',           icon: Swords },
  { id: 'ride-along',          label: 'Ride-Along Evaluation',    icon: Car },
  { id: 'pass-fail',           label: 'Pass / Fail Evaluation',   icon: ClipboardCheck },
  { id: 'strike-warning',      label: 'Strike & Warning Examples',icon: AlertTriangle },
];

// ─── SCENARIO DATA ───────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'rdm', tag: 'RDM', color: 'red',
    title: 'Random Deathmatch (RDM)',
    situation: 'A player randomly shoots another player during a traffic stop with no roleplay initiation.',
    answer: 'RDM violation. The player killed another without valid RP initiation or in-character reason.',
    action: 'Pull the player aside privately. Issue a formal warning, explain the rule, and document with evidence. Escalate to kick/ban if prior warnings exist.',
    notes: 'Any kill without proper RP initiation is RDM regardless of context. Documentation is required for future escalation.',
  },
  {
    id: 'vdm', tag: 'VDM', color: 'amber',
    title: 'Vehicle Deathmatch (VDM)',
    situation: 'A user intentionally crashes their vehicle into another player repeatedly to kill them.',
    answer: 'VDM — using a vehicle as a weapon without valid RP justification.',
    action: 'If intentional and evidenced, issue a temporary ban (3–7 days). Notify a senior staff member and log the incident in full.',
    notes: 'Deliberate VDM is griefing. Clear evidence of repeated targeting warrants a ban — do not issue repeated verbal warnings.',
  },
  {
    id: 'nitrp', tag: 'NITRP', color: 'purple',
    title: 'No Intent to Roleplay (NITRP)',
    situation: 'A player joins the server and repeatedly disrupts scenes without any attempt at proper roleplay.',
    answer: 'NITRP violation. Players who disrupt scenes without engaging in RP are subject to immediate removal.',
    action: 'Issue a kick with reason "NITRP." If they return and continue, escalate to a short-term ban.',
    notes: 'Do not warn repeatedly — NITRP warrants swift action once the pattern is established.',
  },
  {
    id: 'nlr', tag: 'NLR', color: 'blue',
    title: 'New Life Rule (NLR)',
    situation: 'A player dies during a shootout and returns five minutes later to kill the same people involved.',
    answer: 'NLR violation. Upon death, a player must forget all events from their previous life.',
    action: 'Issue a formal warning explaining NLR. If they returned specifically to kill or disrupt the same scene, consider a kick.',
    notes: 'NLR maintains RP immersion. Returning to the same location or targeting the same players after death breaks continuity for everyone.',
  },
  {
    id: 'vol', tag: 'VOL', color: 'red',
    title: 'Value of Life (VOL)',
    situation: 'A suspect has multiple guns pointed at them but refuses to comply and acts fearless.',
    answer: 'VOL / FearRP violation. Players must act realistically when clearly outgunned.',
    action: 'Issue a formal warning explaining VOL and FearRP. Gather witness accounts and document clearly. Escalate to a kick for repeat offenders.',
    notes: 'VOL is foundational to realistic roleplay. Ignoring lethal threats undermines the integrity of any scenario.',
  },
  {
    id: 'rtap', tag: 'RTAP', color: 'green',
    title: 'Respawn to Avoid Punishment (RTAP)',
    situation: 'A player respawns to avoid being arrested by law enforcement.',
    answer: 'RTAP — exploiting a game mechanic to escape an active RP situation.',
    action: 'Issue a warning and document the incident. If clearly intentional and previously warned, escalate to a kick.',
    notes: 'RTAP removes accountability from characters and breaks the experience for officers involved. Coordinate with LE players to resolve the RP.',
  },
  {
    id: 'gta', tag: 'GTA Driving', color: 'amber',
    title: 'GTA-Style Driving',
    situation: 'A player drives at unrealistic speeds through traffic and crashes constantly without roleplay concern.',
    answer: 'GTA-style driving — unrealistic vehicle operation inconsistent with server standards.',
    action: 'Issue a warning and explain realistic driving expectations. If deliberately trolling, treat as NITRP/FRP and escalate.',
    notes: 'Reckless driving breaks RP for emergency responders and civilians and can escalate into VDM if players are struck.',
  },
  {
    id: 'gunmotion', tag: 'Gun Motion', color: 'purple',
    title: 'Gun Motion Violation',
    situation: 'A user equips a weapon instantly without roleplay or chat motion before using it.',
    answer: 'Failed to perform proper gun motion — a required chat-based action before drawing a firearm.',
    action: 'Issue a verbal correction or formal warning. Be educational on first offense. Escalate if combined with other FRP behavior.',
    notes: 'Gun motion gives other players time to react in-character. Skipping it removes a critical element of fair RP confrontations.',
  },
];

// ─── MODERATOR QUESTIONS ─────────────────────────────────────────────────────
const MOD_QUESTIONS = [
  { q: 'What is RDM and how do you handle a first-time offender?', a: 'RDM (Random Deathmatch) — killing without valid RP reason. First offense: formal warning, clear rule explanation, incident documented.' },
  { q: 'What is VDM and when would you issue a ban?', a: 'VDM (Vehicle Deathmatch) — using a vehicle as a weapon without RP justification. Ban when there is clear evidence of deliberate, repeated targeting.' },
  { q: 'What steps do you take before issuing a ban?', a: 'Gather evidence → review warning history → contact player if appropriate → consult senior staff if unsure → issue ban with documented reason.' },
  { q: 'How do you handle a situation where you know the player personally?', a: 'Recuse yourself immediately and hand it to another staff member. Personal relationships — positive or negative — create bias and must be avoided.' },
  { q: 'What do you do if you make an incorrect moderation decision?', a: 'Acknowledge the mistake, notify a senior staff member, correct the action (e.g. unban), and document everything. Transparency is mandatory.' },
  { q: 'When do you escalate to a senior staff member?', a: 'When the situation is beyond your authority, involves a complex case, involves a report against another staff member, or when you are unsure of the correct action.' },
  { q: 'What is NITRP and how quickly should you act?', a: 'NITRP — no intention to participate in RP. Action should be swift: kick, then ban if behavior continues after return.' },
  { q: 'How do you document a moderation action?', a: 'Log: player name, rule violated, evidence collected, action taken, date/time, witnesses or senior staff notified.' },
];

// ─── STRIKE EXAMPLES ─────────────────────────────────────────────────────────
const STRIKES = [
  { level: 'Verbal Warning', color: 'blue', examples: ['Minor fail roleplay — first offense', 'Forgetting to log a moderation action once', 'Minor unprofessional behavior in staff chat', 'Misidentifying a rule violation but correcting it immediately'] },
  { level: 'Formal Warning (Strike 1)', color: 'amber', examples: ['Repeated failure to document moderation actions', 'Using staff commands off-duty without authorization', 'Bias-based moderation — leniency toward a friend', 'Ignoring a direct instruction from a senior staff member'] },
  { level: 'Strike 2 — Final Warning', color: 'orange', examples: ['Sharing confidential staff information publicly', 'Issuing an unjustified ban without evidence', 'Repeated off-duty command misuse after a warning', 'Failing to escalate a high-severity situation', 'Unprofessional conduct toward a community member'] },
  { level: 'Termination (Strike 3)', color: 'red', examples: ['Staff abuse — deliberate misuse of permissions for personal gain', 'Leaking Internal Affairs information', 'Covering up a moderation mistake intentionally', 'Harassment or targeted discrimination', 'Coordinating with rule-breakers or corrupt players'] },
];

// ─── COLOR MAPS ───────────────────────────────────────────────────────────────
const scenarioColor = {
  red:    'bg-red-500/15 text-red-400 border-red-500/25',
  amber:  'bg-amber-500/15 text-amber-400 border-amber-500/25',
  blue:   'bg-blue-500/15 text-blue-400 border-blue-500/25',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  green:  'bg-green-500/15 text-green-400 border-green-500/25',
};

const strikeColor = {
  blue:   { card: 'border-blue-500/20',   badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',   dot: 'bg-blue-400' },
  amber:  { card: 'border-amber-500/20',  badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',  dot: 'bg-amber-400' },
  orange: { card: 'border-orange-500/20', badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30', dot: 'bg-orange-400' },
  red:    { card: 'border-red-500/20',    badge: 'bg-red-500/15 text-red-400 border-red-500/30',    dot: 'bg-red-400' },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function Section({ id, title, icon: Icon, badge, badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/30', children }) {
  return (
    <section id={id} className="scroll-mt-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl btn-glow flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-white" />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight flex-1">{title}</h2>
        {badge && <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${badgeColor}`}>{badge}</span>}
      </div>
      <div className="h-px bg-gradient-to-r from-blue-500/30 via-white/5 to-transparent mb-1" />
      {children}
    </section>
  );
}

function CheckItem({ children, color = 'green' }) {
  const colors = {
    green: 'text-green-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    amber: 'text-amber-400',
  };
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 size={15} className={`${colors[color]} flex-shrink-0 mt-0.5`} />
      <span className="text-sm text-white/65 leading-snug">{children}</span>
    </li>
  );
}

function ScenarioCard({ s }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass border rounded-2xl overflow-hidden transition-colors duration-200 ${open ? 'border-blue-500/25' : 'border-white/8'}`}>
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border flex-shrink-0 mt-0.5 ${scenarioColor[s.color]}`}>{s.tag}</span>
          <p className="text-sm font-semibold text-white/85 leading-snug">{s.title}</p>
        </div>
        {/* Situation — always visible */}
        <div className="bg-white/3 border border-white/8 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-white/35 uppercase tracking-wider mb-1.5">Situation</p>
          <p className="text-sm text-white/65 leading-relaxed">{s.situation}</p>
        </div>
        {!open ? (
          <button onClick={() => setOpen(true)} className="btn-glow text-white text-xs font-semibold px-4 py-2.5 rounded-xl inline-flex items-center gap-2 min-h-[40px]">
            <CheckCircle2 size={13} /> Reveal Answer
          </button>
        ) : (
          <div className="space-y-2.5 animate-fade-in">
            <div className="bg-green-500/8 border border-green-500/25 rounded-xl p-4">
              <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-1.5">✓ Expected Answer</p>
              <p className="text-sm text-white/70 leading-relaxed">{s.answer}</p>
            </div>
            <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1.5">Correct Action</p>
              <p className="text-sm text-white/65 leading-relaxed">{s.action}</p>
            </div>
            <div className="bg-white/3 border border-white/8 rounded-xl p-4">
              <p className="text-xs font-bold text-white/30 uppercase tracking-wider mb-1.5">Instructor Notes</p>
              <p className="text-sm text-white/55 leading-relaxed">{s.notes}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-xs text-white/25 hover:text-white/50 transition-colors flex items-center gap-1">
              <ChevronUp size={12} /> Hide Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function QAAccordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className={`glass border rounded-2xl overflow-hidden transition-all duration-200 ${openIdx === i ? 'border-blue-500/25' : 'border-white/5'}`}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
          >
            <span className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors leading-snug">{item.q}</span>
            <ChevronDown size={15} className={`text-white/30 flex-shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-blue-400' : ''}`} />
          </button>
          {openIdx === i && (
            <div className="px-5 pb-5 border-t border-white/5 animate-fade-in">
              <p className="pt-4 text-sm text-white/60 leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search the Instructor Guide..."
        className="w-full glass border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/15 transition-all bg-transparent"
      />
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function StaffInstructorGuide() {
  const [search, setSearch] = useState('');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const lc = search.toLowerCase();
  const filterQA = (items) => !search ? items : items.filter(i => i.q.toLowerCase().includes(lc) || i.a.toLowerCase().includes(lc));
  const filterScenarios = (items) => !search ? items : items.filter(s => s.title.toLowerCase().includes(lc) || s.situation.toLowerCase().includes(lc) || s.tag.toLowerCase().includes(lc));

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Staff Instructor Guide"
        subtitle="A confidential internal training reference for certified Staff Instructors. Use this guide to conduct structured, professional training sessions."
        icon={GraduationCap}
        badge="Instructor Only"
      />

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Quick Nav */}
      <div className="glass-strong border border-white/8 rounded-3xl p-6">
        <p className="text-xs font-bold text-white/35 uppercase tracking-widest mb-4">Quick Navigation</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/8 text-white/50 hover:text-white/90 transition-all duration-200 text-left group"
              >
                <Icon size={14} className="text-white/25 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                <span className="text-xs font-semibold leading-snug">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SECTION 1: Training Flow ── */}
      <Section id="training-flow" title="Trial Moderator Training Process" icon={ListChecks} badge="Start Here">
        <div className="glass border border-blue-500/15 rounded-2xl p-5 mb-2 flex items-start gap-3">
          <HelpCircle size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/55 leading-relaxed">Follow these steps in order during every training session. Do not skip or reorder phases without Management approval.</p>
        </div>
        <div className="space-y-2">
          {[
            { step: '01', title: 'Welcome the Trainee',       desc: 'Introduce yourself, confirm their identity, and set expectations for the session.' },
            { step: '02', title: 'Verify Prerequisites',       desc: 'Confirm the trainee has reviewed all required materials before beginning.' },
            { step: '03', title: 'Review Staff Knowledge',     desc: 'Walk through moderator expectations and key server rules verbally.' },
            { step: '04', title: 'Conduct Question Phase',     desc: 'Ask moderator knowledge questions one at a time using the Question Phase section.' },
            { step: '05', title: 'Conduct Scenario Phase',     desc: 'Present each scenario and allow the trainee to respond before revealing the answer.' },
            { step: '06', title: 'Complete Ride-Along',        desc: 'Accompany the trainee on the server for a 30-minute live evaluation.' },
            { step: '07', title: 'Final Evaluation',           desc: 'Tally scores, apply pass/fail criteria, and communicate the result professionally.' },
            { step: '08', title: 'Submit Training Results',    desc: 'Log the session in full — trainee name, date, scores, result, and conduct notes.' },
          ].map(item => (
            <div key={item.step} className="flex items-start gap-4 glass border border-white/5 rounded-2xl p-4 hover:border-blue-500/15 transition-all duration-200">
              <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-black text-blue-400">{item.step}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">{item.title}</p>
                <p className="text-xs text-white/45 leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Auto-fail callout */}
        <div className="grid sm:grid-cols-3 gap-3 mt-2">
          {[
            { label: 'ToS Violation', desc: 'Auto-fail, may result in ban', color: 'red' },
            { label: 'Disrespect / Trolling', desc: 'Auto-fail, must reapply', color: 'amber' },
            { label: 'Staff Abuse', desc: 'Auto-fail + disciplinary review', color: 'red' },
          ].map(item => (
            <div key={item.label} className={`glass border border-${item.color}-500/20 rounded-xl px-4 py-3`}>
              <p className={`text-xs font-bold text-${item.color}-400 mb-1`}>{item.label}</p>
              <p className="text-xs text-white/40">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── SECTION 2: Before Training Begins ── */}
      <Section id="before-training" title="Before Training Begins" icon={CheckCircle2} badge="Prerequisites">
        <p className="text-sm text-white/50 leading-relaxed">Before beginning any training session, verify that the trainee has reviewed all of the following materials. If they have not, direct them to do so before continuing.</p>
        <div className="glass border border-white/8 rounded-2xl p-5">
          <p className="text-xs font-bold text-white/35 uppercase tracking-widest mb-4">Required Pre-Reading Checklist</p>
          <ul className="space-y-3">
            {[
              'Read the entire Staff Guide',
              'Read Moderator Rules',
              'Read the Moderation Handbook',
              'Read the In-Game Rules',
              'Read Training Information',
              'Reviewed moderation scenarios',
              'Reviewed staff expectations',
              'Reviewed all relevant policies and procedures',
            ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
          </ul>
        </div>

        {/* Instructor rules */}
        <div className="glass border border-amber-500/20 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-4">Instructor Rules</p>
          <ul className="space-y-3">
            {[
              'Remain neutral and professional at all times — personal feelings must never influence scoring.',
              'Do not provide hints or answers during question or scenario phases.',
              'All sessions must be logged. Failure to submit a log is a disciplinary violation.',
              'End the session immediately if a trainee becomes abusive or violates ToS. Report to Management.',
              'You may not pass a trainee who has not met the minimum score threshold.',
              'Conduct all sessions in a private voice or text channel.',
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-sm text-white/65 leading-snug">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── SECTION 3: Moderator Expectations ── */}
      <Section id="mod-expectations" title="Important Moderator Expectations" icon={Shield} badge="Review with Trainee">
        <p className="text-sm text-white/50 leading-relaxed">Go through these expectations with the trainee during the Review Staff Knowledge phase. Ensure they understand and acknowledge each point.</p>
        <div className="glass border border-white/8 rounded-2xl p-5">
          <ul className="space-y-3">
            {[
              'Greet users professionally when bringing them into a moderation scene.',
              'Remain calm, respectful, and unbiased in every situation.',
              'Listen to both sides before making any moderation decision.',
              'Avoid favoritism and personal bias at all times.',
              'Enforce rules consistently and fairly — apply the same standard to everyone.',
              'You represent Nevada State Roleplay at all times while on duty.',
              'Professional communication is expected in every moderation situation.',
            ].map((item, i) => <CheckItem key={i} color="blue">{item}</CheckItem>)}
          </ul>
        </div>
      </Section>

      {/* ── SECTION 4: Question Phase ── */}
      <Section id="question-phase" title="Question Phase" icon={MessageSquare} badge="Trial Moderator">
        <div className="glass border border-blue-500/15 rounded-2xl p-5 flex items-start gap-3 mb-2">
          <HelpCircle size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/55 leading-relaxed">Ask each question one at a time. Wait for a full response before expanding the answer. Score each response using the pass/fail rubric.</p>
        </div>
        <QAAccordion items={filterQA(MOD_QUESTIONS)} />
        {filterQA(MOD_QUESTIONS).length === 0 && <p className="text-sm text-white/30 text-center py-8">No questions match your search.</p>}
      </Section>

      {/* ── SECTION 5: Scenario Phase ── */}
      <Section id="scenario-phase" title="Scenario Phase" icon={Swords} badge="Interactive">
        <div className="glass border border-blue-500/15 rounded-2xl p-5 flex items-start gap-3 mb-2">
          <HelpCircle size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/55 leading-relaxed">Present each scenario verbally. Allow the trainee to respond fully before revealing the expected answer and instructor notes.</p>
        </div>
        <div className="space-y-3">
          {filterScenarios(SCENARIOS).map(s => <ScenarioCard key={s.id} s={s} />)}
          {filterScenarios(SCENARIOS).length === 0 && <p className="text-sm text-white/30 text-center py-8">No scenarios match your search.</p>}
        </div>

      </Section>

      {/* ── SECTION 6: Ride-Along Evaluation ── */}
      <Section id="ride-along" title="30-Minute Ride-Along Evaluation" icon={Car} badge="Live Session">
        <p className="text-sm text-white/50 leading-relaxed">Every Trial Moderator must complete a ride-along before receiving a final evaluation. The ride-along should last approximately <span className="text-white/80 font-semibold">30 minutes</span> and takes place live on the server.</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass border border-blue-500/20 rounded-2xl p-5">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Instructor Evaluation Criteria</p>
            <ul className="space-y-2.5">
              {[
                'Response to active calls',
                'Scene awareness',
                'Communication skills',
                'Rule knowledge in practice',
                'Professional conduct',
                'Decision making',
                'Ability to remain unbiased',
                'Proper moderation behavior',
              ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
            </ul>
          </div>

          <div className="glass border border-white/8 rounded-2xl p-5">
            <p className="text-xs font-bold text-white/35 uppercase tracking-widest mb-4">What to Observe</p>
            <ul className="space-y-2.5">
              {[
                'Pulls vehicle off the roadway properly',
                'Responds to calls appropriately',
                'Interacts professionally with community members',
                'Handles scenes realistically and fairly',
                'Demonstrates understanding of server rules',
                'Maintains proper staff conduct throughout',
              ].map((item, i) => <CheckItem key={i} color="amber">{item}</CheckItem>)}
            </ul>
          </div>
        </div>

        <div className="glass border border-white/5 rounded-2xl p-4 text-xs text-white/40 leading-relaxed">
          If the trainee demonstrates a pattern of poor conduct, poor decision-making, or clear rule ignorance during the ride-along, the Instructor may end the evaluation early and record a Fail. Document all observations in the training log.
        </div>
      </Section>

      {/* ── SECTION 7: Pass / Fail Evaluation ── */}
      <Section id="pass-fail" title="Pass / Fail Evaluation" icon={ClipboardCheck} badge="Final Decision">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="glass border border-green-500/25 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} className="text-green-400" />
              <p className="text-sm font-bold text-green-400">PASS Requirements</p>
            </div>
            <ul className="space-y-2.5">
              {[
                'Demonstrates rule knowledge',
                'Handles scenarios correctly',
                'Maintains professionalism throughout',
                'Completes ride-along successfully',
                'Demonstrates fair moderation practices',
                'Understands staff expectations',
              ].map((item, i) => <CheckItem key={i}>{item}</CheckItem>)}
            </ul>
          </div>
          <div className="glass border border-red-500/25 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <XCircle size={16} className="text-red-400" />
              <p className="text-sm font-bold text-red-400">FAIL Conditions</p>
            </div>
            <ul className="space-y-2.5">
              {[
                'Disrespectful behavior during training',
                'Abuse of authority',
                'Failure to understand basic moderation procedures',
                'Failure to complete required training',
                'Unprofessional conduct',
                'Inability to moderate fairly',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/65 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="glass border border-white/8 rounded-2xl p-5">
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Score Breakdown</p>
          <div className="space-y-2">
            {[
              { range: '90–100%', result: 'Excellent Pass',                         color: 'text-green-400' },
              { range: '70–89%',  result: 'Pass',                                   color: 'text-green-400' },
              { range: '50–69%',  result: 'Borderline — refer to Management',       color: 'text-amber-400' },
              { range: '0–49%',   result: 'Fail — must reapply after cooldown',     color: 'text-red-400' },
              { range: 'N/A',     result: 'Conduct Failure — auto-fail regardless of score', color: 'text-red-400' },
            ].map(item => (
              <div key={item.range} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm text-white/50 font-mono">{item.range}</span>
                <span className={`text-sm font-semibold ${item.color}`}>{item.result}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── SECTION 8: Strike & Warning Examples ── */}
      <Section id="strike-warning" title="Strike & Warning Examples" icon={AlertTriangle} badge="Disciplinary Reference" badgeColor="bg-red-500/20 text-red-400 border-red-500/30">
        <div className="glass border border-white/5 rounded-2xl p-4 text-xs text-white/40 leading-relaxed mb-2">
          Reference for Instructors when explaining the staff disciplinary system to trainees. Strikes apply to active staff members, not trainees during training sessions.
        </div>
        <div className="space-y-3">
          {STRIKES.map(s => {
            const c = strikeColor[s.color];
            return (
              <div key={s.level} className={`glass border rounded-2xl p-5 ${c.card}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${c.badge}`}>{s.level}</span>
                </div>
                <ul className="space-y-2">
                  {s.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                      <span className="text-sm text-white/60 leading-snug">{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Footer */}
      <div className="glass border border-white/5 rounded-2xl p-5 text-center">
        <p className="text-xs text-white/25 leading-relaxed">
          This document is confidential and intended for certified Staff Instructors only. Unauthorized sharing or distribution is a disciplinary violation.
        </p>
      </div>
    </div>
  );
}