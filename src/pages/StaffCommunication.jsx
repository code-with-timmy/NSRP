import { MessageCircle, MessageSquare, Users, DiscIcon, AlertCircle, ArrowUpCircle } from 'lucide-react';
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

const DosDonts = ({ dos, donts }) => (
  <div className="grid sm:grid-cols-2 gap-3 mt-2">
    <div className="glass border border-green-500/20 rounded-xl p-4">
      <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">✓ Do</p>
      <div className="space-y-2">
        {dos.map((d, i) => <p key={i} className="text-xs text-white/60 leading-relaxed">{d}</p>)}
      </div>
    </div>
    <div className="glass border border-red-500/20 rounded-xl p-4">
      <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">✗ Don't</p>
      <div className="space-y-2">
        {donts.map((d, i) => <p key={i} className="text-xs text-white/60 leading-relaxed">{d}</p>)}
      </div>
    </div>
  </div>
);

export default function StaffCommunication() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Staff Communication"
        subtitle="Effective, professional communication is one of the most important skills a Nevada State Roleplay staff member can develop. This guide covers how to communicate with players, fellow staff, and in Discord environments."
        icon={MessageCircle}
        badge="Core Training"
      />

      <div className="space-y-4">
        <Section icon={MessageCircle} title="Professional Communication Standards" color="blue">
          <Bullet>Use proper grammar, punctuation, and complete sentences in all staff communications — in-game, in Discord, and in reports.</Bullet>
          <Bullet>Avoid using excessive abbreviations, slang, or informal language when addressing players in a moderation context.</Bullet>
          <Bullet>Keep your tone neutral and calm at all times, especially when dealing with upset or uncooperative players.</Bullet>
          <Bullet>Be concise. Say what needs to be said clearly and without unnecessary filler. Players respond better to direct, clear communication.</Bullet>
          <DosDonts
            dos={[
              '"Hello, I\'m a staff member for Nevada State Roleplay. I\'d like to speak with you about a report I received."',
              '"You have been warned for Random Deathmatch (RDM). Please review the server rules."',
            ]}
            donts={[
              '"ayo bro why u rdm that dude lol"',
              '"ur getting a warn rn dont do it again ok"',
            ]}
          />
        </Section>

        <Section icon={Users} title="How to Interact with Players" color="green">
          <Bullet>Approach every player interaction with patience and empathy. Remember that not everyone is familiar with all the rules, and many players are new to roleplay servers.</Bullet>
          <Bullet>When initiating a moderation conversation, always identify yourself as a staff member and explain why you are reaching out.</Bullet>
          <Bullet>Listen fully before responding. Do not interrupt players or make assumptions before they have had a chance to explain their side.</Bullet>
          <Bullet>If a player becomes hostile or disrespectful during an interaction, remain calm, set a clear boundary ("I need you to communicate respectfully so I can help you"), and escalate if necessary.</Bullet>
          <Bullet>After resolving a situation, wish the player well and invite them to reach out if they have further questions. Ending interactions positively helps maintain community morale.</Bullet>
        </Section>

        <Section icon={MessageSquare} title="Staff Chat Guidelines" color="purple">
          <Bullet>Staff chats are professional spaces. Keep discussions on-topic and relevant to moderation, community management, or staff operations.</Bullet>
          <Bullet>Do not spam, send repeated messages, or flood the staff chat with off-topic content. Use designated channels for casual conversation.</Bullet>
          <Bullet>When discussing a moderation case in staff chat, be factual and concise. Share relevant evidence and avoid editorializing.</Bullet>
          <Bullet>Disagreements about moderation decisions should be handled respectfully and in the appropriate channel — not as public arguments in general staff chat.</Bullet>
          <Bullet>Do not use staff chat to complain about players, vent frustration, or make negative comments about community members. Keep it constructive.</Bullet>
          <Bullet>Confidential information discussed in staff chat stays in staff chat. Do not screenshot or share internal staff conversations externally.</Bullet>
        </Section>

        <Section icon={DiscIcon} title="Discord Conduct Expectations" color="blue">
          <Bullet>As a staff member, your Discord conduct is held to a higher standard than regular members — both in Nevada State Roleplay's server and in other communities.</Bullet>
          <Bullet>Keep your status, username, and profile picture appropriate for a staff member representing Nevada State Roleplay. Avoid anything offensive, explicit, or intentionally provocative.</Bullet>
          <Bullet>Do not engage in arguments or drama in public channels. If a situation arises, address it in DMs or escalate it to a senior staff member.</Bullet>
          <Bullet>Respond to player DMs and reports in a timely manner. While you are not expected to be available 24/7, leaving messages unread for extended periods is not acceptable.</Bullet>
          <Bullet>Use the correct channels for the correct purposes. Do not post moderation actions in general channels or use announcement channels for personal messages.</Bullet>
        </Section>

        <Section icon={AlertCircle} title="Handling Disagreements Professionally" color="amber">
          <Bullet>Disagreements between staff members are normal and expected. The key is how you handle them — always with respect, maturity, and a focus on resolution.</Bullet>
          <Bullet>If you disagree with a fellow staff member's moderation decision, raise it privately via DM or in the appropriate staff discussion channel — never publicly in front of players or in general channels.</Bullet>
          <Bullet>Focus on the decision, not the person. "I think this situation may have warranted a ban instead of a warning because..." is constructive. "You always handle things wrong" is not.</Bullet>
          <Bullet>If a disagreement cannot be resolved between staff members, bring it to a senior staff member or Management for mediation. Do not allow disputes to fester.</Bullet>
          <Bullet>Never go behind a fellow staff member's back to reverse or undo their decision without first consulting them or a senior staff member.</Bullet>
        </Section>

        <Section icon={ArrowUpCircle} title="Escalating Issues to Higher Staff" color="red">
          <Bullet>Not every situation can or should be handled at the Trial Moderator level. Knowing when to escalate is a sign of good judgment, not weakness.</Bullet>
          <Bullet>Escalate to a Moderator or Administrator when: the situation involves another staff member, the violation is severe (hacking, doxxing, CSAM), or you are unsure of the correct action.</Bullet>
          <Bullet>When escalating, provide a clear summary: what happened, who is involved, what evidence exists, and what actions (if any) have already been taken.</Bullet>
          <Bullet>Do not escalate every minor situation. Attempt to resolve standard moderation cases independently first, and only escalate when the situation genuinely requires higher authority.</Bullet>
          <Bullet>If you escalate a situation, follow up to ensure it was addressed. Do not assume it was handled without confirmation.</Bullet>
          <Bullet>Never escalate as a way to avoid doing your job. Escalation is a tool for genuinely complex or sensitive situations, not an excuse to pass off routine moderation.</Bullet>
        </Section>
      </div>
    </div>
  );
}