import { CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AccordionSection from '../components/ui/AccordionSection';

const MelonlyIcon = () => (
  <img
    src="https://media.base44.com/images/public/6a1559683a239521f5263a7b/42a988b6a_melonlyLogo.png"
    alt="Melonly"
    loading="lazy"
    decoding="async"
    className="w-full h-full object-contain"
  />
);

const Step = ({ number, children }) => (
  <div className="flex items-start gap-3">
    <div className="w-6 h-6 rounded-full btn-glow flex items-center justify-center flex-shrink-0 mt-0.5">
      <span className="text-[11px] font-black text-white">{number}</span>
    </div>
    <span className="text-xs text-white/60 leading-relaxed pt-0.5">{children}</span>
  </div>
);

const Check = ({ children }) => (
  <div className="flex items-start gap-2">
    <CheckCircle size={13} className="text-green-400 flex-shrink-0 mt-0.5" />
    <span className="text-xs text-white/60 leading-relaxed">{children}</span>
  </div>
);

const Bullet = ({ children }) => (
  <div className="flex items-start gap-2">
    <span className="w-1 h-1 rounded-full bg-blue-400/60 flex-shrink-0 mt-1.5" />
    <span className="text-xs text-white/60 leading-relaxed">{children}</span>
  </div>
);

const InfoBox = ({ color = 'blue', children }) => {
  const colors = {
    blue: 'border-blue-500/20 bg-blue-500/5',
    yellow: 'border-yellow-500/20 bg-yellow-500/5',
    red: 'border-red-500/20 bg-red-500/5',
    green: 'border-green-500/20 bg-green-500/5',
  };
  return (
    <div className={`glass border ${colors[color]} rounded-xl p-3`}>
      <p className="text-xs text-white/55 leading-relaxed">{children}</p>
    </div>
  );
};

const CodeBlock = ({ children }) => (
  <div className="glass border border-white/8 rounded-xl px-4 py-3 font-mono text-sm text-blue-300 tracking-wide">
    {children}
  </div>
);

export default function MelonlyGuide() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Melonly Moderation Guide"
        subtitle="Learn how to properly use Melonly for moderation actions, VC checks, Ban BOLOs, moderation records, and administrative punishments."
        icon={MelonlyIcon}
        badge="All Staff"
      />

      {/* Importance Notice */}
      <div className="glass border border-red-500/30 bg-red-500/5 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1">Important</p>
            <p className="text-xs text-white/65 leading-relaxed">
              Melonly is <strong className="text-white/85">required for all staff members.</strong> This platform is used for moderation records, Ban BOLOs, moderation history, punishment tracking, and administrative actions. Staff members are expected to understand how to properly use Melonly before performing moderation duties.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access Card */}
      <div className="glass-strong border border-blue-500/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <img
          src="https://media.base44.com/images/public/6a1559683a239521f5263a7b/42a988b6a_melonlyLogo.png"
          alt="Melonly"
          loading="lazy"
          decoding="async"
          className="w-10 h-10 object-contain flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white mb-0.5">Quick Access: Melonly</p>
          <p className="text-xs text-white/45 leading-relaxed">
            Melonly is the official moderation management platform used by Nevada State Roleplay. Staff members use Melonly for moderation records, Ban BOLOs, punishment tracking, moderation history, and administrative actions.
          </p>
        </div>
        <a
          href="https://melon.ly/join/RCCXFP"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow text-white text-sm font-semibold px-5 py-2.5 rounded-xl inline-flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
        >
          Open Melonly
        </a>
      </div>

      <div className="space-y-3">

        {/* Section 1 */}
        <AccordionSection title="What Is Melonly?" defaultOpen>
          <p>Melonly is the official moderation management platform used by Nevada State Roleplay.</p>
          <p>All staff members are expected to understand how to properly use Melonly for moderation records, Ban BOLOs, moderation history, and punishment tracking.</p>
          <InfoBox color="yellow">
            Failure to properly document moderation actions may result in staff disciplinary action.
          </InfoBox>
        </AccordionSection>

        {/* Section 2 */}
        <AccordionSection title="Before Issuing Punishments" badge="Required">
          <p className="mb-3">Before issuing any moderation action, staff members must complete the following steps:</p>
          <div className="space-y-2">
            <Check>Gather evidence</Check>
            <Check>Verify the rule violation</Check>
            <Check>Remain professional</Check>
            <Check>Review applicable regulations</Check>
            <Check>Ensure the punishment is appropriate</Check>
          </div>
          <InfoBox color="red">
            Never issue punishments without sufficient evidence.
          </InfoBox>
        </AccordionSection>

        {/* Section 3 */}
        <AccordionSection title="Voice Chat Verification Checks">
          <p className="mb-3">Nevada State Roleplay is a <strong className="text-white/80">Voice Chat Only</strong> server. Staff members are responsible for verifying that players meet Voice Chat requirements.</p>
          <InfoBox color="red">
            <strong className="text-white/80">/erlc membercheck is run through DISCORD — not inside ER:LC.</strong> Do not open an in-game command menu.
          </InfoBox>
          <p className="text-xs text-white/40 mt-3 mb-4 uppercase tracking-wider font-semibold">To perform a Voice Chat check:</p>
          <div className="space-y-3">
            <Step number={1}>Open <strong className="text-white/80">Discord</strong>.</Step>
            <Step number={2}>Go to the <strong className="text-white/80">Staff Commands</strong> area/channel.</Step>
            <Step number={3}>
              <span>Enter the command in Discord: <CodeBlock>/erlc membercheck</CodeBlock></span>
            </Step>
            <Step number={4}>Review the player's Voice Chat status.</Step>
            <Step number={5}>Take the appropriate action if the player does not meet Nevada State RP requirements.</Step>
          </div>
          <InfoBox color="blue">
            Voice Chat checks should be performed whenever necessary to ensure compliance with server standards.
          </InfoBox>
        </AccordionSection>

        {/* Section 4 */}
        <AccordionSection title="Creating A Ban BOLO">
          <p className="mb-3">If a player commits a bannable offense but is currently in-game, follow this process:</p>
          <div className="space-y-3 mb-4">
            <Step number={1}>Bring the player into a moderation scene.</Step>
            <Step number={2}>Explain the violation professionally.</Step>
            <Step number={3}>Inform the player that they will be receiving a server ban.</Step>
            <Step number={4}>Kick the player from the server.</Step>
            <Step number={5}>Open Melonly.</Step>
            <Step number={6}>Navigate to <strong className="text-white/80">Ban BOLOs</strong>.</Step>
            <Step number={7}>Create a new Ban BOLO.</Step>
            <Step number={8}>
              <div className="space-y-1">
                <span className="block mb-1">Include the following information:</span>
                <div className="space-y-1 pl-1">
                  <Bullet>Roblox Username</Bullet>
                  <Bullet>User ID</Bullet>
                  <Bullet>Rule Violated</Bullet>
                  <Bullet>Detailed Description</Bullet>
                  <Bullet>Evidence</Bullet>
                  <Bullet>Additional Notes</Bullet>
                </div>
              </div>
            </Step>
            <Step number={9}>Submit the Ban BOLO.</Step>
          </div>
          <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2">The description must clearly explain:</p>
          <div className="space-y-1 mb-3">
            <Bullet>What occurred</Bullet>
            <Bullet>Which rule was violated</Bullet>
            <Bullet>Why the punishment is justified</Bullet>
            <Bullet>Any supporting context</Bullet>
          </div>
          <InfoBox color="yellow">
            Poorly documented BOLOs may be denied or returned for corrections.
          </InfoBox>
        </AccordionSection>

        {/* Section 5 */}
        <AccordionSection title="Ban BOLO Standards">
          <p className="mb-3">When creating a Ban BOLO, maintain the following standards:</p>
          <div className="space-y-2 mb-4">
            <Check>Be detailed</Check>
            <Check>Be professional</Check>
            <Check>Include evidence</Check>
            <Check>Use proper grammar</Check>
            <Check>Clearly explain the violation</Check>
          </div>
          <div className="space-y-2 mb-3">
            <div className="flex items-start gap-2">
              <AlertTriangle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/60">Do not submit vague reports.</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-white/60">Do not submit one-sentence descriptions.</span>
            </div>
          </div>
          <InfoBox color="blue">
            Management should be able to fully understand the incident from your report alone.
          </InfoBox>
        </AccordionSection>

        {/* Section 6 */}
        <AccordionSection title="Administrator Ban Authority" badge="Admin+">
          <p className="mb-3">Administrators have additional moderation authority and may issue direct bans when appropriate under Nevada State Roleplay policy.</p>
          <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-3">When issuing a direct ban:</p>
          <div className="space-y-3 mb-4">
            <Step number={1}>Verify the violation.</Step>
            <Step number={2}>Gather evidence.</Step>
            <Step number={3}>Issue the ban.</Step>
            <Step number={4}>Document the action.</Step>
            <Step number={5}>Create all required moderation logs.</Step>
            <Step number={6}>Ensure all information is entered accurately into Melonly.</Step>
          </div>
          <InfoBox color="red">
            Failure to document bans may result in administrative review.
          </InfoBox>
        </AccordionSection>

        {/* Section 7 */}
        <AccordionSection title="Logging Requirements">
          <p className="mb-3">All significant moderation actions must be documented in Melonly. Examples include:</p>
          <div className="grid sm:grid-cols-2 gap-2 mb-3">
            {[
              'Bans',
              'Direct Administrator Bans',
              'Ban BOLOs',
              'Major Moderation Actions',
              'Serious Rule Violations',
            ].map((item) => (
              <div key={item} className="glass border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2">
                <FileText size={12} className="text-blue-400 flex-shrink-0" />
                <span className="text-xs text-white/65">{item}</span>
              </div>
            ))}
          </div>
          <InfoBox color="blue">
            Moderation records must remain accurate, professional, and complete.
          </InfoBox>
        </AccordionSection>

        {/* Section 8 */}
        <AccordionSection title="Professional Conduct">
          <p className="mb-3">When using Melonly, all staff members must adhere to professional standards:</p>
          <div className="space-y-2 mb-4">
            <Check>Remain unbiased</Check>
            <Check>Remain professional</Check>
            <Check>Document facts only</Check>
            <Check>Avoid emotional decisions</Check>
          </div>
          <div className="space-y-2 mb-4">
            {[
              'Never falsify evidence',
              'Never alter moderation records',
              'Never issue punishments without justification',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <AlertTriangle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/60">{item}</span>
              </div>
            ))}
          </div>
          <InfoBox color="blue">
            Staff members are expected to maintain the highest standards of professionalism when utilizing moderation systems.
          </InfoBox>
        </AccordionSection>

        {/* Section 9 */}
        <AccordionSection title="Final Reminder">
          <p>Melonly serves as the official moderation record system for Nevada State Roleplay.</p>
          <p>Every moderation action entered into Melonly should be <strong className="text-white/80">clear, accurate, professional, and supported by evidence.</strong></p>
          <InfoBox color="green">
            When in doubt, consult a higher-ranking staff member before issuing major moderation actions.
          </InfoBox>
        </AccordionSection>

      </div>
    </div>
  );
}