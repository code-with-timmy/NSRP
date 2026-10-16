import { TrendingUp, ClipboardCheck, Activity, Crown, Clock, Star } from 'lucide-react';
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

const MetricCard = ({ label, value, sub }) => (
  <div className="glass border border-white/8 rounded-xl p-4 text-center">
    <div className="text-xl font-black text-white mb-1">{value}</div>
    <div className="text-xs font-semibold text-white/50">{label}</div>
    {sub && <div className="text-[10px] text-white/25 mt-1">{sub}</div>}
  </div>
);

export default function PromotionInformation() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Promotion Information"
        subtitle="Promotions at Nevada State Roleplay are earned through consistent dedication, professionalism, and demonstrated performance. This page explains how the promotion process works and what is expected of you at each stage."
        icon={TrendingUp}
        badge="Staff Development"
      />

      <div className="space-y-4">
        <Section icon={TrendingUp} title="Promotion Process Overview" color="blue">
          <p className="text-white/60 leading-relaxed">
            Nevada State Roleplay uses a merit-based promotion system. Promotions are not automatic and are not based on time alone. Every promotion decision is made by the Management Team based on a comprehensive evaluation of your performance, activity, attitude, and contributions to the community.
          </p>
          <Bullet>Promotions are evaluated on a rolling basis — there is no fixed schedule. You may be reviewed at any time.</Bullet>
          <Bullet>Staff members are not able to request or apply for promotions directly. Performance is observed and evaluated passively.</Bullet>
          <Bullet>Promotions are announced by Management in the appropriate staff channel. All promotion decisions are final.</Bullet>
          <Bullet>Not receiving a promotion does not mean you are performing poorly — it means the Management team feels there is still room for growth before the next step.</Bullet>
        </Section>

        <Section icon={ClipboardCheck} title="Performance Expectations" color="green">
          <Bullet>Consistently handle moderation situations correctly, fairly, and in line with Nevada State Roleplay's rules and guidelines.</Bullet>
          <Bullet>Demonstrate good judgment — knowing when to warn, kick, or ban, and when to escalate or consult a senior staff member.</Bullet>
          <Bullet>Maintain a positive reputation within the community and among fellow staff members. Professionalism must be consistent, not situational.</Bullet>
          <Bullet>Show initiative: actively moderate, help players, contribute to discussions, and look for ways to improve the community — without being asked.</Bullet>
          <Bullet>Accept feedback and constructive criticism gracefully. Staff members who push back against feedback or repeat corrected mistakes consistently will not be considered for promotion.</Bullet>
          <Bullet>Your moderation log — the quality, quantity, and accuracy of your actions — is one of the primary tools used to evaluate performance.</Bullet>
        </Section>

        <Section icon={Activity} title="Activity Requirements" color="purple">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <MetricCard label="Minimum Weekly Hours" value="5+" sub="In-game activity" />
            <MetricCard label="LOA Limit" value="14 days" sub="Per month with approval" />
            <MetricCard label="Review Period" value="Ongoing" sub="Evaluated continuously" />
          </div>
          <Bullet>Meeting minimum activity requirements is a baseline — it is not sufficient alone for promotion. Activity above and beyond minimums is noticed and valued.</Bullet>
          <Bullet>Consistent LOAs, frequent periods of low activity, or only barely meeting minimums may delay or pause promotion consideration.</Bullet>
          <Bullet>Quality of activity matters as much as quantity. Being active but spending that time idling rather than actively moderating does not contribute positively to your evaluation.</Bullet>
        </Section>

        <Section icon={Crown} title="Leadership Expectations" color="amber">
          <Bullet>As you progress through the staff ranks, leadership ability becomes increasingly important. Management looks for staff members who naturally guide and support others.</Bullet>
          <Bullet>Leadership at Nevada State Roleplay means: mentoring newer staff members, setting a positive example, contributing constructively to staff discussions, and handling situations with confidence.</Bullet>
          <Bullet>You do not need to be loud or assertive to demonstrate leadership. Quiet consistency, good judgment, and reliability are all forms of strong leadership.</Bullet>
          <Bullet>Staff members who put down, belittle, or undermine fellow staff members — even in jest — are not demonstrating leadership and will not be considered for promotion.</Bullet>
        </Section>

        <Section icon={Clock} title="Trial Periods" color="red">
          <Bullet>Every new staff member begins as a Trial Moderator and undergoes a trial period during which their performance is closely monitored.</Bullet>
          <Bullet>The trial period for Trial Moderators lasts until Management determines you have demonstrated sufficient competence and reliability to advance. There is no fixed end date.</Bullet>
          <Bullet>During your trial period, you are expected to seek guidance when uncertain, document your moderation actions thoroughly, and avoid making large decisions independently.</Bullet>
          <Bullet>Mistakes during a trial period are expected and are learning opportunities — as long as they are not repeated or the result of recklessness.</Bullet>
          <Bullet>At the end of your trial period, Management will either promote you to full Moderator, extend your trial period with specific goals, or remove you from the team if expectations have not been met.</Bullet>
        </Section>

        <Section icon={Star} title="How Promotions Are Evaluated" color="blue">
          <Bullet>Management reviews moderation logs to assess the volume, quality, and accuracy of your actions.</Bullet>
          <Bullet>Peer feedback from fellow staff members is considered — your reputation within the team matters.</Bullet>
          <Bullet>Community feedback, player interactions, and the absence of valid complaints about your moderation are taken into account.</Bullet>
          <Bullet>Participation in staff discussions, willingness to learn, and contributions beyond basic moderation duties all factor into the evaluation.</Bullet>
          <Bullet>A clean disciplinary record is essential. Staff infractions or repeated conduct issues will significantly delay or prevent promotions.</Bullet>
          <Bullet>The decision is holistic — no single factor determines whether you are promoted. It is a complete picture of who you are as a staff member and community representative.</Bullet>
        </Section>
      </div>
    </div>
  );
}