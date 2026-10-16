import { MessageSquare, ClipboardList, Clock, Ban, ShieldAlert } from 'lucide-react';
import PolicyPanel from './PolicyPanel';

const ACCENTS = {
  blue: {
    panel: 'border-blue-500/30 bg-gradient-to-br from-blue-500/[0.08] via-blue-500/[0.03] to-transparent',
    icon: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    heading: 'text-blue-300',
    chevron: 'text-blue-400/70',
    dot: 'bg-blue-400/70',
  },
  green: {
    panel: 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] via-emerald-500/[0.03] to-transparent',
    icon: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    heading: 'text-emerald-300',
    chevron: 'text-emerald-400/70',
    dot: 'bg-emerald-400/70',
  },
  yellow: {
    panel: 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/[0.08] via-yellow-500/[0.03] to-transparent',
    icon: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    heading: 'text-yellow-300',
    chevron: 'text-yellow-400/70',
    dot: 'bg-yellow-400/70',
  },
  red: {
    panel: 'border-red-500/30 bg-gradient-to-br from-red-500/[0.08] via-red-500/[0.03] to-transparent',
    icon: 'border-red-500/30 bg-red-500/10 text-red-400',
    heading: 'text-red-300',
    chevron: 'text-red-400/70',
    dot: 'bg-red-400/70',
  },
  neutral: {
    panel: 'border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent',
    icon: 'border-white/15 bg-white/5 text-white/60',
    heading: 'text-white/80',
    chevron: 'text-white/40',
    dot: 'bg-white/40',
  },
};

const DISCRETION = [
  'The violation is severe.',
  'The player has repeatedly violated rules.',
  'Multiple violations occur during the same incident.',
  'The player is intentionally abusing the rules.',
  'The situation significantly disrupts the server.',
];

const POLICIES = [
  {
    title: 'Verbal Warning Policy',
    icon: MessageSquare,
    accent: ACCENTS.blue,
    items: [
      'Used for minor, first-time, or low-impact violations when appropriate.',
      <>
        <span className="font-semibold text-white/90">Three (3) verbal warnings</span> = one (1) official warning.
      </>,
      'Staff may skip verbal warnings for more serious violations.',
    ],
  },
  {
    title: 'Official Warning Policy',
    icon: ClipboardList,
    accent: ACCENTS.green,
    items: [
      <>
        May be issued <span className="font-semibold text-white/90">immediately</span> for serious violations.
      </>,
      'A verbal warning is not required before every official warning.',
      "The offense's severity determines the punishment.",
    ],
  },
  {
    title: 'Three Official Warnings = 1-Hour Kick',
    icon: Clock,
    accent: ACCENTS.yellow,
    items: [
      <>
        <span className="font-semibold text-white/90">Three (3) official warnings</span> result in a{' '}
        <span className="font-semibold text-white/90">one-hour kick</span> from the in-game server.
      </>,
      <>
        Players <span className="font-semibold text-white/90">may rejoin after one hour</span>.
      </>,
      <>
        Another official warning after returning results in a{' '}
        <span className="font-semibold text-white/90">ban</span> from the in-game server.
      </>,
    ],
  },
  {
    title: 'Seven Or More Total Warnings = Ban',
    icon: Ban,
    accent: ACCENTS.red,
    items: [
      <>
        <span className="font-semibold text-white/90">Seven (7) or more total official warnings</span> on a player's
        Melon.ly account result in a <span className="font-semibold text-white/90">ban</span> from the in-game server.
      </>,
      <>
        The total warning count applies <span className="font-semibold text-white/90">across sessions</span>, not just
        one session.
      </>,
    ],
  },
];

export default function PolicyPanels() {
  return (
    <div className="space-y-4">
      {POLICIES.map((policy) => (
        <PolicyPanel
          key={policy.title}
          title={policy.title}
          icon={policy.icon}
          accent={policy.accent}
          items={policy.items}
        />
      ))}

      <PolicyPanel title="Staff Discretion" icon={ShieldAlert} accent={ACCENTS.neutral} defaultOpen={false}>
        <div className="space-y-3 text-sm text-white/60 leading-relaxed">
          <p>
            Staff are expected to use reasonable judgment when enforcing these regulations. The listed punishment is the standard punishment and is not an absolute requirement in every situation.
          </p>
          <p>Staff may escalate punishment when:</p>
          <ul className="space-y-2">
            {DISCRETION.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-white/40 mt-0.5">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Severe violations may bypass the normal warning progression. Staff do not have to follow the normal tier progression for severe violations such as mass RDM, exploiting, cheating, severe harassment, major disruption, or serious abuse of department access.
          </p>
        </div>
      </PolicyPanel>
    </div>
  );
}