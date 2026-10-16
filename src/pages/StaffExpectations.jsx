import { Star, Activity, UserCheck, Lock, ShieldOff, GitMerge, Award } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import AccordionSection from '@/components/ui/AccordionSection';

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

export default function StaffExpectations() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Staff Expectations"
        subtitle="Every member of the Nevada State Roleplay staff team is held to a high standard of conduct, professionalism, and accountability. These expectations apply at all times — in-game, in Discord, and in any other space where you represent Nevada State Roleplay."
        icon={Award}
        badge="Required Reading"
      />

      <div className="space-y-4">
        <Section icon={Star} title="Staff Professionalism" color="blue">
          <Bullet>Always communicate in a calm, respectful, and mature manner regardless of the situation or how the player behaves toward you.</Bullet>
          <Bullet>Avoid using unprofessional language, excessive slang, or inappropriate humor when on duty or in any staff-related channel.</Bullet>
          <Bullet>Treat every player — regardless of rank or history — with the same level of respect and fairness. No exceptions.</Bullet>
          <Bullet>You are a representative of Nevada State Roleplay at all times. Your actions and words reflect on the entire staff team and community.</Bullet>
          <Bullet>Do not engage in arguments publicly with players or fellow staff. Address disputes privately and calmly, escalating when necessary.</Bullet>
          <Bullet>Refrain from making statements about pending moderation actions, ongoing investigations, or internal staff decisions to the public.</Bullet>
        </Section>

        <Section icon={Activity} title="Activity Expectations" color="green">
          <Bullet>Staff members are expected to be actively present in the community — both in-game and on Discord — on a consistent, regular basis.</Bullet>
          <Bullet>Trial Moderators are expected to meet minimum activity requirements as outlined during onboarding. Failure to maintain activity may result in demotion.</Bullet>
          <Bullet>If you are going to be absent for any reason, you must submit a Leave of Absence (LOA) request through the appropriate staff channel before your absence begins.</Bullet>
          <Bullet>Activity is evaluated on a weekly basis by Management. Consistent inactivity without an approved LOA will result in a staff strike or removal from the team.</Bullet>
          <Bullet>Being "present but inactive" — logged in but not actively moderating or engaging — does not count as fulfilling your activity requirement.</Bullet>
        </Section>

        <Section icon={UserCheck} title="Appropriate Staff Behavior" color="purple">
          <Bullet>Do not spawn items, vehicles, or use admin tools for personal benefit or entertainment while on duty. Staff tools are moderation tools, not personal perks.</Bullet>
          <Bullet>Do not moderate players you have personal history or conflict with. Recuse yourself and hand the situation to another available staff member.</Bullet>
          <Bullet>Avoid making jokes at players' expense, especially regarding moderation actions. Your demeanor should always remain professional.</Bullet>
          <Bullet>Do not use your staff position to gain an advantage in roleplay scenarios, bypass server rules, or skip consequences that would apply to a regular player.</Bullet>
          <Bullet>Staff members should actively model the behavior they expect from the community — if you would issue a warning for it, you should not be doing it yourself.</Bullet>
        </Section>

        <Section icon={Lock} title="Confidentiality Requirements" color="amber">
          <Bullet>Internal staff discussions, investigations, disciplinary actions, and personnel decisions are strictly confidential and must never be shared publicly.</Bullet>
          <Bullet>Do not discuss another staff member's infraction record, warning history, or performance reviews with anyone outside of Management.</Bullet>
          <Bullet>Information shared in private staff channels, DMs, or meetings is to be treated with the highest level of discretion.</Bullet>
          <Bullet>Leaking internal information — whether intentionally or carelessly — is considered a serious violation and may result in immediate removal from the team.</Bullet>
          <Bullet>If a player asks about an internal matter, politely decline to comment and redirect them to the appropriate channel for their inquiry.</Bullet>
        </Section>

        <Section icon={ShieldOff} title="Abuse of Permissions" color="red">
          <Bullet>Using staff tools, commands, or access for any purpose other than legitimate moderation is classified as permission abuse and will not be tolerated.</Bullet>
          <Bullet>Banning, kicking, or warning players without valid cause — or doing so based on personal dislike — is a serious offense and may result in immediate removal.</Bullet>
          <Bullet>Do not share staff credentials, account access, or moderation tools with anyone inside or outside the team.</Bullet>
          <Bullet>Abusing your access to player data, logs, or records for personal reasons — outside of an active moderation situation — is strictly prohibited.</Bullet>
          <Bullet>All actions taken using staff permissions are logged. If your actions cannot be justified with a clear moderation reason, they should not have been taken.</Bullet>
        </Section>

        <Section icon={GitMerge} title="Conflict of Interest Guidelines" color="amber">
          <Bullet>A conflict of interest occurs when a personal relationship or bias may affect your ability to moderate fairly. When in doubt, step aside.</Bullet>
          <Bullet>Do not moderate situations involving close friends, frequent roleplay partners, or people you have personal history with — positive or negative.</Bullet>
          <Bullet>If you are involved in a situation as a player (e.g., you were the victim of an alleged RDM), you cannot be the moderator for that same situation.</Bullet>
          <Bullet>Declare conflicts of interest to a fellow staff member and request they handle the case instead. This is not a sign of weakness — it is professional conduct.</Bullet>
        </Section>

        <Section icon={Award} title="Representing Nevada State Roleplay" color="blue">
          <Bullet>Your conduct outside of Nevada State Roleplay — on other communities, social media, or public forums — can still reflect on the Nevada State Roleplay brand.</Bullet>
          <Bullet>Publicly criticizing Nevada State Roleplay, its Management, or its staff decisions while holding a staff position is not acceptable and may result in removal.</Bullet>
          <Bullet>You were selected for this team because the Management team believes you represent Nevada State Roleplay's values. Continue to embody professionalism, fairness, and community spirit in everything you do.</Bullet>
          <Bullet>If you are unsure whether a particular action or statement is appropriate, ask a senior staff member before proceeding.</Bullet>
        </Section>
      </div>
    </div>
  );
}