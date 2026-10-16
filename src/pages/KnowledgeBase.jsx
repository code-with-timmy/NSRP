import { useState } from 'react';
import { Library, ChevronDown, ChevronUp, Search } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const entries = [
  {
    category: 'Common Staff Questions',
    color: 'blue',
    items: [
      {
        q: 'Can I moderate a situation involving a friend of mine?',
        a: 'No. Any situation involving someone you have a personal relationship with — positive or negative — is a conflict of interest. You must recuse yourself and ask another available staff member to handle it. This protects both you and the integrity of the moderation decision.',
      },
      {
        q: 'What do I do if I make a wrong moderation decision?',
        a: 'Admit it, correct it where possible, and report it to a senior staff member. Mistakes happen — what matters is your honesty and willingness to fix them. Attempting to cover up a mistake is far more serious than the original error.',
      },
      {
        q: 'A player is arguing that my ban was unfair. What should I do?',
        a: 'Direct the player to the official ban appeal process calmly and professionally. Do not argue with them about the decision in public. Once a moderation action is taken, the proper channel for dispute is an appeal — not a public debate.',
      },
      {
        q: 'How much time do I have to respond to a report?',
        a: 'Reports should be acknowledged as promptly as possible. While you are not expected to drop everything instantly, leaving a report unacknowledged for an extended period reflects poorly on the staff team. Aim to acknowledge within 10–15 minutes when on duty.',
      },
      {
        q: 'Can I ban a player without warning them first?',
        a: 'For severe violations such as hacking, mass RDM, doxxing, or hate speech — yes, an immediate ban is appropriate. For less severe offenses, you should generally issue a warning or kick before escalating to a ban, unless the player\'s behavior clearly warrants immediate removal.',
      },
      {
        q: 'What if I witness rule-breaking but no one reports it?',
        a: 'You are empowered and expected to act on observed violations even without a formal report. Staff members are not only reactive — being proactive about maintaining the server\'s standards is a core part of the role.',
      },
    ],
  },
  {
    category: 'Frequently Misunderstood Rules',
    color: 'amber',
    items: [
      {
        q: 'Is all deathmatch considered RDM?',
        a: 'No. RDM (Random Deathmatch) refers specifically to killing another player without a valid, in-roleplay reason. If there is a legitimate RP reason for conflict — such as an active criminal situation, a war roleplay, or a roleplay-established rivalry — it may not constitute RDM. Context and intent matter.',
      },
      {
        q: 'Does the "value of life" rule mean you can never fight back?',
        a: 'No. Value of life means your character should realistically respond to threats — if a gun is pointed at you, for example, your character should comply rather than immediately attacking. However, if you have a clear tactical advantage (e.g., you are behind cover and they are not looking), exercising force may be valid. Use common sense and realistic roleplay standards.',
      },
      {
        q: 'Can staff members break rules in emergencies?',
        a: 'No. Staff members are held to the same rules as regular players — in some cases, a higher standard. Using your staff role as justification for rule-breaking behavior is considered permission abuse and will be treated seriously.',
      },
      {
        q: 'What counts as "FRP" versus creative roleplay?',
        a: 'Fail Roleplay occurs when a player\'s actions are so implausible or inconsistent with realistic roleplay that they break immersion for others. Creative roleplay that is unusual but internally consistent and respects the server\'s standards is generally acceptable. The line is: does it ruin the experience for other players?',
      },
      {
        q: 'Is it against the rules to go off-duty as a staff member?',
        a: 'Staff members are allowed to participate in roleplay as regular players (off-duty). However, if you witness a serious rule violation while off-duty, you are still expected to intervene or report it. Being off-duty is not a reason to ignore clear misconduct.',
      },
    ],
  },
  {
    category: 'Important Roleplay Term Definitions',
    color: 'purple',
    items: [
      {
        q: 'RDM — Random Deathmatch',
        a: 'Killing or attacking another player without a valid in-character roleplay reason. This includes shooting at players unprovoked, killing players for out-of-character reasons, or attacking people simply because you can.',
      },
      {
        q: 'VDM — Vehicle Deathmatch',
        a: 'Using a vehicle as a weapon to injure or kill other players without a valid RP justification. This includes ramming players intentionally, running people over for fun, or using a car to grief active roleplay scenes.',
      },
      {
        q: 'FRP — Fail Roleplay',
        a: 'Acting in a way that is unrealistic, implausible, or inconsistent with the established roleplay environment. Examples include ignoring a gun pointed at you, driving off a cliff to escape, or breaking character in the middle of a scene without reason.',
      },
      {
        q: 'NITRP — No Intent to Roleplay',
        a: 'Joining the server with the clear and demonstrated purpose of disrupting others, trolling, or refusing to engage in any meaningful roleplay. This is often identified by a combination of behaviors rather than a single incident.',
      },
      {
        q: 'NLR — New Life Rule',
        a: 'Upon character death, you must forget all events that led to your death and not return to the same area or seek revenge. Your character begins a "new life" with no memory of the previous encounter.',
      },
      {
        q: 'VOL — Value of Life',
        a: 'Your character should value their own life in realistic situations. If faced with a lethal threat where resistance is unrealistic (e.g., surrounded, outnumbered, weapon pointed at you), your character should comply rather than fight back suicidally.',
      },
      {
        q: 'Metagaming',
        a: 'Using out-of-character (OOC) information to influence in-character (IC) decisions. For example, using information from a Discord message to react to something your character couldn\'t have known in-game.',
      },
      {
        q: 'Powergaming',
        a: 'Forcing an action on another player without giving them the opportunity to react, or performing actions that are physically impossible for your character. Example: "/me shoots the officer and takes his gun" without giving the officer a chance to react.',
      },
      {
        q: 'OOC — Out of Character',
        a: 'Communications or actions that exist outside the roleplay scenario. OOC chat should be used sparingly in roleplay environments and is generally reserved for technical issues or genuine questions.',
      },
      {
        q: 'IC — In Character',
        a: 'Actions and dialogue that take place within the roleplay scenario. Your character\'s words and decisions within the RP world are IC.',
      },
    ],
  },
];

const colorMap = {
  blue: { badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25', divider: 'bg-blue-500/30' },
  green: { badge: 'bg-green-500/15 text-green-400 border-green-500/25', divider: 'bg-green-500/30' },
  amber: { badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25', divider: 'bg-amber-500/30' },
  purple: { badge: 'bg-purple-500/15 text-purple-400 border-purple-500/25', divider: 'bg-purple-500/30' },
};

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass border rounded-xl overflow-hidden transition-all ${open ? 'border-blue-500/20' : 'border-white/5'}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left">
        <span className="text-sm text-white/75 font-medium leading-relaxed">{q}</span>
        {open ? <ChevronUp size={15} className="text-blue-400 flex-shrink-0 mt-0.5" /> : <ChevronDown size={15} className="text-white/30 flex-shrink-0 mt-0.5" />}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3 animate-fade-in">
          <p className="text-sm text-white/60 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');

  const filtered = entries.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item => item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Knowledge Base"
        subtitle="A comprehensive staff reference of common questions, frequently misunderstood rules, and important roleplay terminology. Use the search bar to find answers quickly."
        icon={Library}
        badge="Reference"
      />

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search questions, rules, definitions..."
          className="w-full glass border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/15 transition-all bg-transparent"
        />
      </div>

      {filtered.length === 0 && (
        <div className="glass border border-white/5 rounded-2xl p-12 text-center text-sm text-white/25">
          No results found for "{search}"
        </div>
      )}

      <div className="space-y-8">
        {filtered.map(cat => {
          const c = colorMap[cat.color];
          return (
            <div key={cat.category}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${c.badge}`}>{cat.category}</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="space-y-2">
                {cat.items.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}