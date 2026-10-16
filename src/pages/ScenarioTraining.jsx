import { useState } from 'react';
import { Swords, ChevronDown, ChevronUp, CheckCircle2, HelpCircle } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const scenarios = [
  {
    category: 'Random Deathmatch (RDM)',
    color: 'red',
    items: [
      {
        id: 'rdm1',
        title: 'Accidental RDM — No Prior Warnings',
        situation: 'A player reports that another player shot and killed them without any in-roleplay reason. You pull the reported player aside and they claim it was an accident — they accidentally pressed the wrong key. They have no prior warnings and have been on the server for over an hour without issues.',
        question: 'What action do you take?',
        answer: 'Issue a verbal warning and log a formal warning. Explain to the player what RDM is, why it is against the rules, and what the consequences are if it happens again.',
        why: 'First-time offenses with a plausible explanation and no prior history warrant an educational approach rather than a heavy punishment. The goal is to correct behavior, not punish newcomers who make genuine mistakes. A warning ensures the incident is documented if it repeats.',
      },
      {
        id: 'rdm2',
        title: 'Repeated RDM — Second Offense',
        situation: 'A player has already received a warning for RDM 20 minutes ago. They have now been reported again by a different player for killing them without cause. You review the logs and confirm the kill was unprovoked.',
        question: 'What action do you take?',
        answer: 'Issue a temporary kick (with a clear reason), and log a second warning in the moderation log. If the behavior continues upon return, escalate to a short-term ban.',
        why: 'Repeated offenses after a recent warning demonstrate that the player did not take the initial correction seriously. Escalation to a kick is appropriate to interrupt the behavior. Clear documentation ensures any further action (ban) can be justified.',
      },
      {
        id: 'rdm3',
        title: 'Mass RDM',
        situation: 'Multiple players are reporting kills in rapid succession. You log in and review server data showing one player has killed six players in under three minutes with no visible roleplay justification.',
        question: 'What action do you take?',
        answer: 'Issue an immediate temporary or permanent ban depending on the severity, gather evidence (logs/clips), and report the incident to a senior staff member. Document everything in the moderation log.',
        why: 'Mass RDM is a severe, intentional disruption of the server. It warrants an immediate removal to protect the remaining players. Senior notification is required because the ban length and any appeal process may need Management oversight.',
      },
    ],
  },
  {
    category: 'Vehicle Deathmatch (VDM)',
    color: 'amber',
    items: [
      {
        id: 'vdm1',
        title: 'First-Time VDM During Active Roleplay',
        situation: 'A player is reported for running over a civilian character with a car during an active roleplay scene. The player claims they were attempting to flee the police and the kill was accidental. There are no prior warnings on their record.',
        question: 'What action do you take?',
        answer: 'Issue a warning and explain the VDM rule. Clarify that even during roleplay, using a vehicle as a weapon against players without valid RP reason constitutes VDM.',
        why: 'Context matters. If the player was in a genuine pursuit scenario and the collision was plausible as an accident, a warning is the proportionate response. The warning serves as an educational record and a deterrent for future incidents.',
      },
      {
        id: 'vdm2',
        title: 'Intentional VDM — Bystander Targeted',
        situation: 'A player is caught on video deliberately driving their vehicle into a crowd of players who were roleplaying a civilian scene. The video clearly shows the vehicle steering directly toward the group multiple times.',
        question: 'What action do you take?',
        answer: 'Issue an immediate temporary ban (3–7 days) with a clear reason, save the evidence, and log the full incident. Notify a senior staff member.',
        why: 'Clear, deliberate VDM with video evidence warrants a strong response. This is not an accident — it is intentional griefing. The evidence must be preserved in case of an appeal, and senior staff should be aware of significant bans.',
      },
    ],
  },
  {
    category: 'No Intent to Roleplay (NITRP)',
    color: 'purple',
    items: [
      {
        id: 'nitrp1',
        title: 'Player Refusing to Engage in Roleplay',
        situation: 'A player joins the server and immediately begins driving in circles, ignoring all player interactions, speaking in out-of-character chat constantly, and disrupting an active crime scene RP. When contacted by staff, they respond with "I don\'t care about this server."',
        question: 'What action do you take?',
        answer: 'Issue a kick with reason "NITRP — Failure to engage in roleplay." If the player returns and continues the behavior, escalate to a temporary ban.',
        why: 'A player who explicitly states they have no interest in roleplay and is actively disrupting others cannot be rehabilitated through a warning alone. A kick serves as a clear message. If they return and continue, a ban is justified to protect the RP environment.',
      },
    ],
  },
  {
    category: 'Fail Roleplay (FRP)',
    color: 'blue',
    items: [
      {
        id: 'frp1',
        title: 'Minor Fail Roleplay — First Occurrence',
        situation: 'A player is reported for fail roleplay after another player saw them sprint away unrealistically during a mugging scenario (they were told they had a gun pointed at them but ran anyway).',
        question: 'What action do you take?',
        answer: 'Issue a verbal explanation of the FRP rule and a formal warning. Clarify what "value of life" means in the context of RP and why complying with realistic scenarios matters.',
        why: 'FRP violations are often the result of misunderstanding rather than intent. A first-time offense with no prior record warrants an educational warning. Helping the player understand why the rule exists encourages better RP behavior going forward.',
      },
      {
        id: 'frp2',
        title: 'Severe Fail Roleplay — Persistent Behavior',
        situation: 'A player has received two FRP warnings in the past hour. They are now breaking character mid-scene, laughing at other players, and refusing to follow basic RP scenarios despite multiple staff interventions.',
        question: 'What action do you take?',
        answer: 'Issue a kick followed by a short-term ban (1–2 days) if the player returns and continues. Document each prior warning and the escalation process in the moderation log.',
        why: 'Persistent FRP after multiple warnings demonstrates the player is not willing to respect the server\'s RP standards. Escalation is appropriate and necessary to protect the quality of the roleplay environment for other players.',
      },
    ],
  },
  {
    category: 'Staff Abuse Reports',
    color: 'red',
    items: [
      {
        id: 'abuse1',
        title: 'Report Against a Fellow Staff Member',
        situation: 'A player DMs you claiming that another Trial Moderator banned them without cause and has been giving their friends unfair advantages in-game. They have a screenshot showing the ban reason as "I don\'t like you."',
        question: 'What action do you take?',
        answer: 'Do NOT attempt to handle this yourself. Immediately escalate the report to a senior staff member or Administrator. Document the player\'s message and the screenshot, and inform the player that the report is being forwarded to appropriate Management.',
        why: 'Reports involving staff members must be handled by a higher authority to prevent bias and ensure a fair investigation. Attempting to handle it yourself — especially if you know the accused staff member — creates a conflict of interest. Transparency and proper escalation are essential.',
      },
    ],
  },
  {
    category: 'Player Disputes',
    color: 'green',
    items: [
      {
        id: 'dispute1',
        title: 'Two Players in an Active Argument',
        situation: 'Two players are arguing in in-game chat about whether a roleplay scenario was valid. The argument is escalating and other players are getting involved, turning it into a public spectacle that is disrupting the server.',
        question: 'What action do you take?',
        answer: 'Step in immediately. Address both players professionally, separate them if possible (move them to a private moderation conversation), listen to both sides calmly, make a ruling based on the rules, and remind both players to keep disputes out of public channels.',
        why: 'Public arguments disrupt the server experience and can escalate rapidly. Early intervention prevents the situation from requiring harsher action later. Hearing both sides before ruling demonstrates fairness and reduces the chance of appeals.',
      },
    ],
  },
  {
    category: 'Escalation Situations',
    color: 'amber',
    items: [
      {
        id: 'esc1',
        title: 'Situation Beyond Your Authority',
        situation: 'A player reports that a well-known community member with a large following is consistently breaking rules and has been banned before. You begin investigating but the situation is complex, involves multiple rule violations, and several players are watching the outcome closely.',
        question: 'What action do you take?',
        answer: 'Pause your investigation, document what you have gathered so far, and immediately escalate to a senior Administrator or Management. Inform the reporting player that the case has been referred to senior staff.',
        why: 'High-profile or complex cases carry significant risk if handled incorrectly at the Trial Moderator level. Escalation is not a failure — it is appropriate judgment. A wrong decision on a visible case can damage community trust. Senior staff are better equipped to handle the political and procedural complexity of these situations.',
      },
      {
        id: 'esc2',
        title: 'Hacking Suspected',
        situation: 'Multiple players report a user who appears to be teleporting across the map, has impossible aim, and seems immune to damage. You observe the player and confirm the behavior is not explainable by lag or normal gameplay.',
        question: 'What action do you take?',
        answer: 'Issue an immediate temporary ban pending review, save all available evidence (server logs, player reports, any footage), and escalate to Administration immediately. Do not engage the player or give them a warning first.',
        why: 'Exploiters and hackers cause rapid, wide-scale disruption. Removing them immediately protects the server. Warnings are not appropriate for confirmed exploit usage. Administration must be notified for proper investigation, as exploiting may also require a platform-level report.',
      },
    ],
  },
];

const colorMap = {
  red: { badge: 'bg-red-500/15 text-red-400 border-red-500/25', dot: 'bg-red-400' },
  amber: { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25', dot: 'bg-amber-400' },
  blue: { badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25', dot: 'bg-blue-400' },
  purple: { badge: 'bg-purple-500/15 text-purple-400 border-purple-500/25', dot: 'bg-purple-400' },
  green: { badge: 'bg-green-500/15 text-green-400 border-green-500/25', dot: 'bg-green-400' },
};

function ScenarioCard({ scenario }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="glass cv-card border border-white/8 rounded-2xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <HelpCircle size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-white/80">{scenario.title}</p>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-white/35 uppercase tracking-wider mb-2">Situation</p>
          <p className="text-sm text-white/65 leading-relaxed">{scenario.situation}</p>
        </div>
        <p className="text-sm font-bold text-blue-400 mb-3">{scenario.question}</p>
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="btn-glow text-white text-xs font-semibold px-4 py-2.5 rounded-xl inline-flex items-center gap-2 min-h-[40px]"
          >
            <CheckCircle2 size={13} />
            Reveal Answer
          </button>
        ) : (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-green-500/8 border border-green-500/25 rounded-xl p-4">
              <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-2">✓ Correct Action</p>
              <p className="text-sm text-white/70 leading-relaxed">{scenario.answer}</p>
            </div>
            <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Why This Is Correct</p>
              <p className="text-sm text-white/65 leading-relaxed">{scenario.why}</p>
            </div>
            <button
              onClick={() => setRevealed(false)}
              className="text-xs text-white/25 hover:text-white/50 transition-colors flex items-center gap-1"
            >
              <ChevronUp size={12} /> Hide Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ScenarioTraining() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Scenario Training"
        subtitle="Practice your moderation decision-making with real-world scenarios. Read each situation, decide what action you would take, then reveal the correct answer and explanation. This is essential training for new Trial Moderators."
        icon={Swords}
        badge="Interactive Training"
      />

      <div className="glass border border-blue-500/20 rounded-2xl p-5 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
          <HelpCircle size={15} className="text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white/80 mb-1">How to Use This Section</p>
          <p className="text-sm text-white/50 leading-relaxed">Read each scenario carefully, then decide what action you would take before clicking "Reveal Answer." The goal is to think critically, not just memorize answers. Understanding the <em>why</em> behind each decision is what makes a good moderator.</p>
        </div>
      </div>

      <div className="space-y-8">
        {scenarios.map(cat => {
          const c = colorMap[cat.color];
          return (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${c.badge}`}>{cat.category}</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="space-y-3">
                {cat.items.map(s => <ScenarioCard key={s.id} scenario={s} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}