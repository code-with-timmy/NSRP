import { ClipboardList } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AccordionSection from '../components/ui/AccordionSection';
import RankBadge from '../components/ui/RankBadge';

const positions = [
  {
    title: 'Trial Moderator',
    rank: 'Trial Moderator',
    status: 'Open',
    statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    requirements: [
      'Must be 13+ years of age',
      'Must have been a community member for at least 2 weeks',
      'No active bans or serious warnings on your account',
      'Must have a functioning Discord account and microphone',
      'Minimum 3 hours in-server over the past 7 days',
    ],
    process: 'Submit your application form via the #applications channel in Discord. Applications are reviewed by the Management Team within 5–7 business days.',
  },
  {
    title: 'Internal Affairs Team',
    rank: 'Internal Affairs',
    status: 'By Invite',
    statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    requirements: [
      'Must currently hold the rank of Moderator or higher',
      'Must have been on the staff team for at least 1 month',
      'Must have a clean staff record — no active disciplinary actions',
      'Must demonstrate exceptional judgment and impartiality',
      'Must be recommended by a Management Team member or above',
    ],
    process: 'This position is invitation-only. You cannot apply directly. Candidates are nominated and evaluated by the Management Team.',
  },
  {
    title: 'Department Supervisor',
    rank: 'Administrator',
    status: 'Closed',
    statusColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    requirements: [
      'Must hold the rank of Administrator on the staff team',
      'Must have active department membership for at least 3 weeks',
      'Must be approved by the relevant Department Head',
      'Strong leadership and communication skills required',
    ],
    process: 'Applications are currently closed. Watch for announcements in the staff channel for when openings become available.',
  },
];

export default function ApplicationInformation() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Application Information"
        subtitle="How to apply for staff positions within ERLC Liberty County — requirements, process, and status for each role."
        icon={ClipboardList}
        badge="Recruitment"
      />

      {/* Position cards */}
      <div className="grid sm:grid-cols-3 gap-3">
        {positions.map(p => (
          <div key={p.title} className="glass border border-white/5 rounded-2xl p-4">
            <RankBadge rank={p.rank} />
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-white/80">{p.title}</div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${p.statusColor}`}>{p.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <AccordionSection title="Application Requirements by Position" defaultOpen>
          <div className="space-y-5">
            {positions.map(p => (
              <div key={p.title} className="glass border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <RankBadge rank={p.rank} size="xs" />
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${p.statusColor}`}>{p.status}</span>
                </div>
                <ul className="space-y-1.5 mb-3">
                  {p.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="text-blue-400/70 flex-shrink-0 mt-0.5">✓</span>
                      <span className="text-white/50">{r}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-white/35 italic border-t border-white/5 pt-2">{p.process}</p>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Application Tips & Best Practices">
          <ul className="space-y-2">
            {[
              'Be honest in your application. Lying or exaggerating will result in a permanent denial.',
              'Write in full sentences — applications written in shorthand or with poor grammar will be disqualified.',
              'Explain why you want to help the community, not just what rank you want.',
              'Reference specific experiences you\'ve had in the server when relevant.',
              'Do not ping Management or send DMs asking about your application status — this will negatively impact your review.',
              'If denied, wait the full cooldown period before reapplying. Feedback is provided in the denial message.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[9px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span className="text-white/50 pt-0.5">{tip}</span>
              </li>
            ))}
          </ul>
        </AccordionSection>

        <AccordionSection title="Appeal & Reapplication Policy">
          <p className="mb-3">If your application is denied, you may reapply after the specified cooldown period:</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { reason: 'First denial', wait: '2 weeks' },
              { reason: 'Second denial', wait: '1 month' },
              { reason: 'Third+ denial', wait: '3 months' },
            ].map(item => (
              <div key={item.reason} className="glass border border-white/5 rounded-xl p-3 text-center">
                <div className="text-[10px] text-white/30 mb-1">{item.reason}</div>
                <div className="text-base font-bold text-white">{item.wait}</div>
                <div className="text-[10px] text-white/25">cooldown</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-white/40">Appeals for wrongful denials can be submitted to the Internal Affairs Team via the #support channel.</p>
        </AccordionSection>
      </div>
    </div>
  );
}