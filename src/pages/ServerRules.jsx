import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AccordionSection from '../components/ui/AccordionSection';

const TSRIcon = () => (
  <img
    src="https://media.base44.com/images/public/6a1559683a239521f5263a7b/4cedc96e8_nevada_roleplay_logo.png"
    alt="Nevada State Roleplay"
    loading="lazy"
    decoding="async"
    className="w-full h-full object-contain"
  />
);

const categories = [
  {
    title: 'Community Conduct',
    rules: [
      { num: '1.1', title: 'Respect All Members', desc: 'All players and staff must be treated with basic respect. Harassment, slurs, hate speech, or targeted abuse of any kind will not be tolerated.' },
      { num: '1.2', title: 'No Toxicity', desc: 'Toxic behavior including trolling, baiting, excessive trash-talking, or deliberately ruining the experience of others is prohibited.' },
      { num: '1.3', title: 'English Only (main channels)', desc: 'All communication in public server channels must be in English to ensure staff can moderate effectively.' },
      { num: '1.4', title: 'No Advertising', desc: 'Advertising other Roblox games, Discord servers, or content without explicit staff approval is strictly prohibited.' },
    ],
  },
  {
    title: 'Discord Rules',
    rules: [
      { num: '2.1', title: 'Follow Discord Terms of Service', desc: 'All members must follow Discord\'s Terms of Service and Community Guidelines at all times.' },
      { num: '2.2', title: 'No Spam or Channel Abuse', desc: 'Do not spam messages, ping staff or members repeatedly, or abuse channels by posting unrelated or repeated content.' },
      { num: '2.3', title: 'No NSFW or Illegal Content', desc: 'Posting NSFW, illegal, or otherwise inappropriate content is strictly prohibited anywhere in the server.' },
      { num: '2.4', title: 'Protect Privacy (No Doxxing)', desc: 'Sharing another person\'s private information without consent is prohibited and may result in an immediate ban.' },
      { num: '2.5', title: 'Use the Correct Channels', desc: 'Keep discussions in their proper channels. Support requests belong in the Support Channel, not general chat.' },
      { num: '2.6', title: 'No DM Advertising', desc: 'Do not add members or direct-message them to advertise servers, services, or content.' },
    ],
  },
  {
    title: 'Staff Interaction',
    rules: [
      { num: '3.1', title: 'Comply With Staff', desc: 'All players must comply with staff during moderation situations. Arguing, ignoring, or disrespecting staff during an active moderation action may increase your punishment.' },
      { num: '3.2', title: 'No False Reporting', desc: 'Submitting false reports or wasting staff time with fraudulent claims is a punishable offense.' },
      { num: '3.3', title: 'No Staff Impersonation', desc: 'Claiming to be a staff member when you are not, or misrepresenting your rank, is a bannable offense.' },
    ],
  },
  {
    title: 'Roblox & Account Standards',
    rules: [
      { num: '4.1', title: 'Follow Roblox Community Standards', desc: 'All players must follow Roblox Terms of Service and Community Standards at all times while in the community. Severe violations may bypass normal punishment progression.' },
      { num: '4.2', title: 'No Ban Evasion', desc: 'Using an alternate account to bypass an active ban is strictly prohibited and may result in a permanent ban.' },
      { num: '4.3', title: 'One Account Per Player', desc: 'Each player is expected to use a single account. Alternate accounts used to evade punishments or deceive others are not permitted.' },
    ],
  },
];

export default function ServerRules() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Server Rules"
        subtitle="The official community and Discord rules for Nevada State Roleplay. All players and staff are expected to know and follow these at all times."
        icon={TSRIcon}
        badge="Mandatory"
      />

      <div className="glass border border-red-500/20 rounded-2xl p-4">
        <p className="text-xs text-red-400/80 leading-relaxed">
          <strong className="text-red-400">Enforcement Notice:</strong> These rules apply to everyone — including staff. Staff members who violate server rules are held to a higher standard and may face additional disciplinary action beyond standard punishments.
        </p>
      </div>

      <div className="glass border border-blue-500/20 bg-blue-500/5 rounded-2xl p-4 flex items-start gap-3">
        <Gamepad2 size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white/55 leading-relaxed">
          Looking for ER:LC in-game rules and punishments? Those live on the{' '}
          <Link to="/in-game-rules" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">In-Game Rules</Link>{' '}
          page. This page covers general community, Discord, and account rules only.
        </p>
      </div>

      <div className="space-y-3">
        {categories.map((cat, i) => (
          <AccordionSection key={cat.title} title={cat.title} defaultOpen={i === 0}>
            <div className="space-y-3">
              {cat.rules.map(rule => (
                <div key={rule.num} className="glass border border-white/5 rounded-xl p-3 flex gap-3">
                  <span className="text-[10px] font-bold text-blue-400 font-mono mt-0.5 flex-shrink-0">{rule.num}</span>
                  <div>
                    <div className="text-xs font-semibold text-white/80 mb-1">{rule.title}</div>
                    <div className="text-xs text-white/45 leading-relaxed">{rule.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>
        ))}
      </div>
    </div>
  );
}