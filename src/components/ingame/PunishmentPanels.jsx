import { AlertTriangle, ShieldAlert, Ban } from 'lucide-react';
import AccordionSection from '@/components/ui/AccordionSection';
import RuleList from './RuleList';
import { rulesStartingWith } from '@/lib/ingameRules';

function PunishmentIcon({ Icon, tone }) {
  return (
    <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${tone}`}>
      <Icon size={12} strokeWidth={2} />
    </span>
  );
}

const YELLOW = 'text-yellow-400/80 border-yellow-400/25 bg-yellow-400/5';
const ORANGE = 'text-orange-400/80 border-orange-400/25 bg-orange-400/5';
const RED = 'text-red-400/80 border-red-400/25 bg-red-400/5';

const PANELS = [
  {
    title: 'Verbal Warning Offenses',
    start: ['vw'],
    standard: 'vw',
    icon: <PunishmentIcon Icon={AlertTriangle} tone={YELLOW} />,
    intro: 'Verbal warnings are for minor, first-time, or low-impact violations when appropriate, and the punishment depends on the specific rule broken and the player\'s behavior. Three (3) verbal warnings equal one (1) official warning.',
  },
  {
    title: 'Warning Offenses',
    start: ['w'],
    standard: 'w',
    icon: <PunishmentIcon Icon={AlertTriangle} tone={YELLOW} />,
    intro: 'Official warnings are given for more serious violations and may be issued immediately — a verbal warning is not required first. The severity and circumstances of the offense determine the punishment. Official warnings must be logged by staff.',
  },
  {
    title: 'Kick Offenses',
    start: ['k'],
    standard: 'k',
    icon: <PunishmentIcon Icon={ShieldAlert} tone={ORANGE} />,
    intro: 'Serious violations, repeated offenses, or disruptive behavior that negatively impacts roleplay.',
    extra: 'Also kick-tier: Accumulating 3 Official Warnings (1-Hour Kick) · Staff RDM · Staff VDM · Mass RDM (3+ kills) · Mass VDM · Mass Unrealistic Driving · Repeated Unrealistic Avatar After Two Warnings · RTAP — Respawn To Avoid Punishment · Refusing To Comply With Staff · Serious Disruption of RP · Staff Evasion · NITRP · TLLG — Trolling. Loud soundboards and microphone spam are serious disruptions and should result in an immediate kick if the player does not comply after a warning.',
  },
  {
    title: 'Ban Offenses',
    start: ['b', 'pb'],
    standard: 'b',
    icon: <PunishmentIcon Icon={Ban} tone={RED} />,
    intro: 'Severe violations that seriously harm the server environment, community safety, or roleplay quality. Severe offenses may bypass lower tiers.',
    extra: 'Also ban-tier: Roblox ToS Violations · Mass Staff RDM · Mass Staff VDM · Non-Consensual / Inappropriate RP · Exploiting (repeat offenses) · Botting / Server Attacks · Sexual RP · Bomb / Terrorism RP · Drug-Related RP · Suicide / Self-Harm RP · Kidnapping RP · Animal Abuse RP · Ban Evasion · Returning To The Server After A Kick When Prohibited.',
  },
];

export default function PunishmentPanels() {
  return (
    <>
      {PANELS.map((panel) => (
        <AccordionSection key={panel.title} title={panel.title} icon={panel.icon}>
          <p>{panel.intro}</p>
          <RuleList rules={rulesStartingWith(panel.start)} hideStandard={panel.standard} />
          {panel.extra && <p className="text-xs text-white/45">{panel.extra}</p>}
        </AccordionSection>
      ))}
    </>
  );
}