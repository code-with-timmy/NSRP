import { useState } from 'react';
import { ChevronDown, Shield, AlertTriangle, Users, ArrowRight, CheckCircle, MessageCircle, Info, XCircle } from 'lucide-react';
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
          <div className="pt-5 space-y-5">{children}</div>
        </div>
      )}
    </div>
  );
};

const SectionLabel = ({ children }) => (
  <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3">{children}</div>
);

const BulletItem = ({ children, color = 'blue' }) => {
  const dotColors = {
    blue: 'bg-blue-400/60',
    green: 'bg-green-400/60',
    yellow: 'bg-yellow-400/60',
    orange: 'bg-orange-400/60',
    red: 'bg-red-400/60',
  };
  return (
    <div className="flex items-start gap-2.5 py-1">
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color] || dotColors.blue} flex-shrink-0 mt-1.5`} />
      <span className="text-sm text-white/60 leading-snug">{children}</span>
    </div>
  );
};

const PunishmentTag = ({ label, color }) => {
  const colors = {
    green: 'bg-green-500/15 text-green-400 border-green-500/30',
    yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${colors[color] || colors.blue}`}>
      {label}
    </span>
  );
};

const InfoBox = ({ color = 'blue', title, children }) => {
  const colors = {
    blue: 'border-blue-500/25 bg-blue-500/8',
    yellow: 'border-yellow-500/25 bg-yellow-500/8',
    orange: 'border-orange-500/25 bg-orange-500/8',
    red: 'border-red-500/25 bg-red-500/8',
    green: 'border-green-500/25 bg-green-500/8',
  };
  const textColors = {
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    orange: 'text-orange-400',
    red: 'text-red-400',
    green: 'text-green-400',
  };
  return (
    <div className={`glass border rounded-xl px-4 py-3.5 ${colors[color]}`}>
      {title && <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${textColors[color]}`}>{title}</div>}
      <div className="text-sm text-white/60 leading-relaxed">{children}</div>
    </div>
  );
};

const GreetingCard = ({ text }) => (
  <div className="glass border border-blue-500/20 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-blue-500/40 transition-colors">
    <MessageCircle size={14} className="text-blue-400 flex-shrink-0" />
    <span className="text-sm text-white/75 italic">"{text}"</span>
  </div>
);

export default function ModerationSceneProcedures() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Moderation Scene Procedures"
        subtitle="This section explains the proper procedures staff members must follow during active moderation scenes. All staff are expected to remain professional, unbiased, and organized while handling reports or disputes between players."
        icon={Shield}
        badge="In-Game"
      />

      {/* Important Notice */}
      <div className="relative glass-strong border border-yellow-500/20 rounded-2xl p-5 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(234, 179, 8, 0.12), transparent 100%)' }}
        />
        <div className="relative flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={15} className="text-yellow-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1.5">Important</div>
            <p className="text-sm text-white/65 leading-relaxed">
              Moderation scenes should remain <strong className="text-white/85">calm, organized, and evidence-based</strong>. Staff members are expected to remain professional at all times and avoid emotional moderation.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">

        {/* Panel 1 — Introduction Procedures */}
        <Panel title="Introduction Procedures" accentColor="blue" defaultOpen>
          <div>
            <SectionLabel>Overview</SectionLabel>
            <p className="text-sm text-white/60 leading-relaxed">
              This section explains how moderators should begin and manage moderation scenes professionally. A strong introduction sets the tone for the entire interaction.
            </p>
          </div>

          {/* Starting a Scene */}
          <div>
            <SectionLabel>Starting a Moderation Scene</SectionLabel>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              When beginning a moderation scene, staff members should professionally introduce themselves before discussing the situation. Use a friendly and neutral opener to keep the atmosphere calm.
            </p>
            <div className="space-y-2">
              <GreetingCard text="How's it going?" />
              <GreetingCard text="How can I help you today?" />
              <GreetingCard text="Can you explain what happened?" />
            </div>
          </div>

          {/* Staff Waiting Room */}
          <div>
            <SectionLabel>Calling Players to Staff Waiting Room</SectionLabel>
            <InfoBox color="blue" title="Staff Waiting Room — How It Works">
              <div className="space-y-2">
                <p>Staff members should <strong className="text-white/80">PM players in-game</strong> and request that they join the <strong className="text-blue-400">Staff Waiting Room</strong> voice channel.</p>
                <div className="mt-3 space-y-1.5">
                  <BulletItem>The Staff Waiting Room is exclusively used for active moderation scenes</BulletItem>
                  <BulletItem>Players inside the waiting room remain server muted until moved</BulletItem>
                  <BulletItem>The room is only used for dragging users into active scene channels</BulletItem>
                  <BulletItem>Staff should stay organized — avoid dragging multiple unrelated users at once</BulletItem>
                </div>
              </div>
            </InfoBox>
          </div>

          {/* Multiple Reports */}
          <div>
            <SectionLabel>Handling Multiple Reports</SectionLabel>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              When multiple users are waiting in the Staff Waiting Room, maintain a structured and fair process.
            </p>

            <div className="space-y-3">
              <div className="glass border border-white/8 rounded-xl px-4 py-3.5 space-y-2">
                <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Step 1 — Reporting Player</div>
                <BulletItem color="green">Prioritize the player who called <code className="text-blue-400 bg-blue-500/10 px-1 rounded text-xs">!mod</code> first</BulletItem>
                <BulletItem color="green">Allow the reporting player to explain the situation fully</BulletItem>
                <BulletItem color="green">Ask if they have any evidence:</BulletItem>
                <div className="ml-6 space-y-1">
                  {['Clips', 'Screenshots', 'Images', 'Video proof'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <ArrowRight size={11} className="text-blue-400/50" />
                      <span className="text-xs text-white/50">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass border border-white/8 rounded-xl px-4 py-3.5 space-y-2">
                <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Step 2 — Accused Player</div>
                <BulletItem color="yellow">Bring the second player into the moderation scene</BulletItem>
                <BulletItem color="yellow">Allow them to explain their side respectfully</BulletItem>
                <BulletItem color="yellow">Review all provided evidence fairly before making a decision</BulletItem>
              </div>

              <div>
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Possible Outcomes</div>
                <div className="flex flex-wrap gap-2">
                  <PunishmentTag label="Verbal Warning" color="green" />
                  <PunishmentTag label="Official Warning" color="yellow" />
                  <PunishmentTag label="Kick" color="orange" />
                  <PunishmentTag label="Ban" color="red" />
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/* Panel 2 — Evidence & Voiding Scenes */}
        <Panel title="Evidence & Scene Voiding" accentColor="orange">
          <div>
            <SectionLabel>Overview</SectionLabel>
            <p className="text-sm text-white/60 leading-relaxed">
              Moderation scenes should always rely on proper evidence and professional communication. Decisions made without evidence are unreliable and may result in unfair outcomes.
            </p>
          </div>

          <div className="relative glass-strong border border-orange-500/20 rounded-xl p-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative flex items-start gap-3">
              <AlertTriangle size={15} className="text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1.5">Important</div>
                <p className="text-sm text-white/60 leading-relaxed">
                  If all users in a moderation scene are arguing <strong className="text-white/80">without valid evidence</strong> or are unable to properly explain the situation, the scene should be <strong className="text-orange-400">voided</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Voiding */}
          <div>
            <SectionLabel>When to Void a Scene</SectionLabel>
            <div className="glass border border-white/8 rounded-xl px-4 py-3.5 space-y-1.5">
              <BulletItem color="orange">No valid evidence is provided by either party</BulletItem>
              <BulletItem color="orange">Both sides continuously argue without proof</BulletItem>
              <BulletItem color="orange">Staff cannot fairly determine what occurred</BulletItem>
              <BulletItem color="orange">Players refuse to cooperate professionally</BulletItem>
            </div>
          </div>

          <div>
            <SectionLabel>How to Void a Scene</SectionLabel>
            <div className="glass border border-white/8 rounded-xl px-4 py-3.5 space-y-1.5 mb-3">
              <BulletItem>Separate all involved players immediately</BulletItem>
              <BulletItem>End the moderation scene calmly and professionally</BulletItem>
              <BulletItem>Tell users to continue with their day respectfully</BulletItem>
              <BulletItem>Avoid escalating unnecessary arguments</BulletItem>
            </div>

            <div className="flex items-center gap-3 glass border border-red-500/20 bg-red-500/5 rounded-xl px-4 py-3">
              <XCircle size={16} className="text-red-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Scene Voided</span>
                <p className="text-xs text-white/50 mt-0.5">No action taken — insufficient evidence or cooperation.</p>
              </div>
            </div>
          </div>
        </Panel>

        {/* Panel 3 — Higher-Up Requests */}
        <Panel title="Higher-Up Requests" accentColor="purple">
          <div>
            <SectionLabel>Overview</SectionLabel>
            <p className="text-sm text-white/60 leading-relaxed">
              Players may sometimes request a higher-ranking staff member during a moderation scene. This is a normal part of the process and should be handled calmly and professionally.
            </p>
          </div>

          <div>
            <SectionLabel>When Higher Staff is Available</SectionLabel>
            <div className="glass border border-white/8 rounded-xl px-4 py-3.5 space-y-1.5">
              <BulletItem color="blue">Staff may ping available higher-ranking staff members in the appropriate channel</BulletItem>
              <BulletItem color="blue">Explain the situation calmly and professionally to the higher-up</BulletItem>
              <BulletItem color="blue">Do not argue with the player who is requesting assistance</BulletItem>
            </div>
          </div>

          <div>
            <SectionLabel>When No Higher Staff is Available</SectionLabel>
            <div className="glass border border-white/8 rounded-xl px-4 py-3.5 space-y-1.5">
              <BulletItem color="yellow">Politely inform the player that no higher staff is currently available</BulletItem>
              <BulletItem color="yellow">Request that they create a <strong className="text-white/75">support ticket</strong> for additional assistance</BulletItem>
              <BulletItem color="yellow">Continue handling the scene professionally if possible</BulletItem>
            </div>
          </div>

          <div className="relative glass-strong border border-purple-500/20 rounded-xl p-4 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative flex items-start gap-3">
              <Info size={15} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1.5">Important</div>
                <p className="text-sm text-white/60 leading-relaxed">
                  Staff members should <strong className="text-white/80">never become argumentative or emotional</strong> when a player requests higher staff assistance. Always remain calm, composed, and professional.
                </p>
              </div>
            </div>
          </div>
        </Panel>

      </div>

      <div className="glass border border-blue-500/20 rounded-2xl p-4">
        <p className="text-sm text-blue-400/80 leading-relaxed">
          <strong className="text-blue-400">Reminder:</strong> Moderation scenes reflect the professionalism of the entire staff team. Always remain calm, evidence-based, and respectful to all players regardless of the situation.
        </p>
      </div>
    </div>
  );
}