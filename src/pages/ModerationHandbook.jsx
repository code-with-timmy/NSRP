import { BookOpen, Flag, HelpCircle, AlertTriangle, LogOut, Ban, Camera, Scale, Brain, Handshake } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const Section = ({ icon: Icon, title, color = 'blue', children }) => {
  const colors = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400', heading: 'text-blue-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400', heading: 'text-amber-400' },
    red: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: 'text-red-400', heading: 'text-red-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'text-green-400', heading: 'text-green-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400', heading: 'text-purple-400' },
  };
  const c = colors[color];
  return (
    <div className={`glass border ${c.border} rounded-2xl p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
          <Icon size={17} className={c.icon} />
        </div>
        <h3 className={`text-sm font-bold ${c.heading} uppercase tracking-wide`}>{title}</h3>
      </div>
      <div className="space-y-3 text-sm text-white/65 leading-relaxed">{children}</div>
    </div>
  );
};

const Bullet = ({ children }) => (
  <div className="flex items-start gap-2.5">
    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0 mt-1.5" />
    <span>{children}</span>
  </div>
);

const Step = ({ number, children }) => (
  <div className="flex items-start gap-3">
    <span className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">{number}</span>
    <span className="text-sm text-white/65 leading-relaxed">{children}</span>
  </div>
);

export default function ModerationHandbook() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Moderation Handbook"
        subtitle="A comprehensive guide to handling moderation situations as a Nevada State Roleplay staff member. This handbook covers everything from responding to player reports to issuing punishments correctly and professionally."
        icon={BookOpen}
        badge="Core Training"
      />

      <div className="space-y-4">
        <Section icon={Flag} title="How to Handle Player Reports" color="blue">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Step-by-Step Process</p>
          <Step number="1">Acknowledge the report promptly in the moderation channel. Never leave a report unresponded to for an extended period.</Step>
          <Step number="2">Gather information before taking action. Ask the reporting player for context — when did it happen, who was involved, what occurred?</Step>
          <Step number="3">Review any available evidence such as screenshots, clips, or server logs before making a decision.</Step>
          <Step number="4">Speak to the reported player calmly and privately. Hear their side of the story before reaching a conclusion.</Step>
          <Step number="5">Make a fair decision based on the evidence and rules. Document your action and reasoning in the moderation log.</Step>
          <Step number="6">Follow up with the reporting player to let them know the outcome, within the bounds of confidentiality.</Step>
        </Section>

        <Section icon={HelpCircle} title="How to Respond to Player Questions" color="green">
          <Bullet>Always respond to player questions politely and helpfully, even if the question has been asked before.</Bullet>
          <Bullet>If you do not know the answer, do not guess. Tell the player you will find out and follow through — or direct them to a staff member who knows.</Bullet>
          <Bullet>Never dismiss a player's question as "obvious" or make them feel unintelligent for asking. New players need guidance, not judgment.</Bullet>
          <Bullet>If a player asks about a specific moderation decision made against them, keep your response factual, calm, and within the bounds of what you can share.</Bullet>
          <Bullet>Direct players to the appropriate resources (server rules, FAQ, staff channels) where applicable, rather than explaining everything from scratch each time.</Bullet>
        </Section>

        <Section icon={AlertTriangle} title="When to Issue Warnings" color="amber">
          <Bullet>Warnings should be issued for first-time, minor, or accidental rule violations where the player has not demonstrated intent to disrupt the server.</Bullet>
          <Bullet>Always explain the rule that was violated when issuing a warning so the player understands what they did wrong and how to correct it.</Bullet>
          <Bullet>Common warning-level offenses include: minor FRP, first-time NLR violation, low-level chat misconduct, or minor roleplay disruptions.</Bullet>
          <Bullet>Before issuing a warning, check if the player has prior warnings. Repeat offenders may warrant a stronger action.</Bullet>
          <Bullet>A warning is an educational tool — make sure the player understands it and confirm they acknowledge the rule.</Bullet>
        </Section>

        <Section icon={LogOut} title="When to Issue Kicks" color="amber">
          <Bullet>Kicks are appropriate for players who continue rule-breaking behavior after a verbal warning or who need a cooling-off period.</Bullet>
          <Bullet>Use a kick when a player is being disruptive, refusing to cooperate with staff, or committing a second violation of the same rule shortly after a warning.</Bullet>
          <Bullet>Always provide a clear kick reason that the player can read and understand upon rejoining. Vague kick reasons are not acceptable.</Bullet>
          <Bullet>A kick is not a punishment in the same sense as a ban — it is a reset and a stronger warning. Use it proportionately.</Bullet>
          <Bullet>Do not kick players for petty or personal reasons. If a situation doesn't meet the threshold for a kick, use a warning instead.</Bullet>
        </Section>

        <Section icon={Ban} title="When to Issue Bans" color="red">
          <Bullet>Bans are reserved for serious, intentional, or repeated rule violations where warnings and kicks have not corrected the behavior.</Bullet>
          <Bullet>Immediate permanent or long-term bans are appropriate for: hacking, exploiting, hate speech, doxxing, or intentional and severe harassment.</Bullet>
          <Bullet>Temporary bans (1–7 days) are appropriate for repeated RDM/VDM after prior action, severe FRP, or repeated disrespect toward staff.</Bullet>
          <Bullet>All bans must be logged with a detailed reason. Ban reasons should be clear, factual, and professional.</Bullet>
          <Bullet>As a Trial Moderator, consult a senior staff member before issuing bans longer than 3 days when you are uncertain about the appropriate duration.</Bullet>
          <Bullet>Never ban a player you have personal conflict with without first recusing yourself and handing the situation to another staff member.</Bullet>
        </Section>

        <Section icon={Camera} title="Gathering Evidence" color="purple">
          <Bullet>Evidence is essential. Never take a major action (kick, ban) without documented evidence to support it.</Bullet>
          <Bullet>Request video clips or screenshots from reporting players. Footage is the strongest form of evidence in moderation cases.</Bullet>
          <Bullet>Use server logs where available to corroborate reports. Logs can verify player positions, chat history, and action timestamps.</Bullet>
          <Bullet>Take your own screenshots or recordings during active moderation situations when possible.</Bullet>
          <Bullet>Store evidence in the appropriate staff channel or folder for future reference, especially in ban cases that may be appealed.</Bullet>
          <Bullet>Do not rely solely on one player's word against another without additional evidence — witness accounts without supporting evidence are supplementary, not conclusive.</Bullet>
        </Section>

        <Section icon={Scale} title="Using Staff Discretion" color="blue">
          <Bullet>Not every situation fits neatly into a rule. Use your best judgment while staying consistent with the spirit of the rules and community standards.</Bullet>
          <Bullet>Discretion means considering context: was the violation accidental or intentional? Is the player new or a repeat offender? What is the severity of the impact on others?</Bullet>
          <Bullet>Discretion does not mean leniency for friends or severity toward people you dislike. Discretion must always be applied fairly and consistently.</Bullet>
          <Bullet>If you are unsure whether a situation warrants action, consult a fellow staff member or senior before proceeding.</Bullet>
          <Bullet>Document your reasoning when using discretion. If your decision is ever questioned, you should be able to explain clearly why you made the call you did.</Bullet>
        </Section>

        <Section icon={Brain} title="Remaining Unbiased" color="green">
          <Bullet>Your personal feelings about a player must never influence a moderation decision. Every player deserves to be judged by their actions, not your opinion of them.</Bullet>
          <Bullet>Treat first-time rule-breakers and frequent players with the same standard. Familiarity should never lead to favoritism.</Bullet>
          <Bullet>If a player reports someone you are close with, hand the situation to another staff member immediately. Do not attempt to moderate that situation yourself.</Bullet>
          <Bullet>Be aware of your own biases — everyone has them. Actively check yourself before making decisions that involve people you know personally.</Bullet>
          <Bullet>If you feel emotionally involved in a situation, step back. A clear head produces better decisions and protects you from accusations of unfair moderation.</Bullet>
        </Section>

        <Section icon={Handshake} title="Proper Moderation Etiquette" color="purple">
          <Bullet>Always introduce yourself when approaching a player for moderation. "Hey, I'm [name], a staff member for Nevada State Roleplay — can I speak with you for a moment?" goes a long way.</Bullet>
          <Bullet>Keep moderation interactions brief, professional, and solution-oriented. Do not lecture players unnecessarily.</Bullet>
          <Bullet>Never argue publicly with a player. If a player disputes your decision, calmly direct them to the appeals process and end the conversation.</Bullet>
          <Bullet>Do not mock, belittle, or make players feel attacked during moderation. Even when issuing a ban, remain respectful and factual.</Bullet>
          <Bullet>After resolving a situation, check in on the server to ensure things have stabilized before moving on. Good moderation doesn't end at the punishment — it ends when the situation is resolved.</Bullet>
        </Section>
      </div>
    </div>
  );
}