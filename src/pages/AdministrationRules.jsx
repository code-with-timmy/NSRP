import { Crown } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AccordionSection from '../components/ui/AccordionSection';
import RankBadge from '../components/ui/RankBadge';

const rules = [
  {
    title: 'Rule 1 — Ban Authority & Limits',
    body: 'Administrators may issue bans up to 30 days. Permanent bans require approval from the Management Team or above. Always document the reason, evidence, and duration in the staff-logs channel immediately after action.',
    applies: ['Administrator'],
  },
  {
    title: 'Rule 2 — No Overriding Lower-Rank Decisions Without Cause',
    body: 'Do not reverse or override moderator actions without legitimate cause. If a moderator\'s decision was incorrect, correct it professionally and use it as a teaching moment. Arbitrary overrides undermine team morale.',
    applies: ['Administrator'],
  },
  {
    title: 'Rule 3 — Mentor & Support Moderators',
    body: 'Administrators are expected to actively mentor Trial Moderators and Moderators. Answer questions, review their logs, and provide constructive feedback. Leadership is part of your role.',
    applies: ['Administrator'],
  },
  {
    title: 'Rule 4 — Escalate to Management When Uncertain',
    body: 'When facing a situation that exceeds your confidence or authority, escalate to Management Team immediately. Never guess or improvise on complex ban cases, appeals, or staff conduct issues.',
    applies: ['Administrator'],
  },
  {
    title: 'Rule 5 — No Retaliatory Actions',
    body: 'Administrators must never take moderation actions in retaliation for personal conflicts, complaints against them, or IA investigations. All actions must be impartial and evidence-based.',
    applies: ['Administrator'],
  },
  {
    title: 'Rule 6 — Handling Ban Appeals',
    body: 'Do not process your own ban appeals or the appeals of bans you issued alone. Involve at least one other Administrator or Management Team member. Document all appeal decisions thoroughly.',
    applies: ['Administrator'],
  },
  {
    title: 'Rule 7 — Internal Affairs Cooperation',
    body: 'If the Internal Affairs Team opens an investigation involving you or a case you are involved in, you must cooperate fully. Obstructing an IA investigation is a severe violation that may result in immediate demotion.',
    applies: ['Administrator', 'Management'],
  },
];

export default function AdministrationRules() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Administration Rules"
        subtitle="Rules and responsibilities for Administrators and above. These govern elevated moderation authority and team leadership."
        icon={Crown}
        badge="Admin+"
      />

      <div className="flex gap-2 items-center flex-wrap">
        <span className="text-xs text-white/40">Primarily applies to:</span>
        <RankBadge rank="Administrator" size="xs" />
        <RankBadge rank="Management" size="xs" />
        <RankBadge rank="Nevada Directive Team" size="xs" />
      </div>

      <div className="space-y-3">
        {rules.map((rule, i) => (
          <AccordionSection key={i} title={rule.title} defaultOpen={i === 0}>
            <p>{rule.body}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5 flex-wrap">
              <span className="text-[10px] text-white/30">Applies to:</span>
              {rule.applies.map(r => <RankBadge key={r} rank={r} size="xs" />)}
            </div>
          </AccordionSection>
        ))}
      </div>

      <div className="glass border border-blue-500/20 rounded-2xl p-4">
        <p className="text-xs text-blue-400/80 leading-relaxed">
          <strong className="text-blue-400">Admin Note:</strong> With greater authority comes greater accountability. The community looks to Administrators as role models. Your conduct sets the tone for the entire staff team.
        </p>
      </div>
    </div>
  );
}