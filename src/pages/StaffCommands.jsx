import { Terminal } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { rolePalette } from '@/lib/roleColors';

const commands = [
  { cmd: ':m [message]', desc: 'Send a global server message visible to all players.', rank: 'Trial Moderator', category: 'Messaging' },
  { cmd: ':pm [player] [message]', desc: 'Send a private message to a specific player.', rank: 'Trial Moderator', category: 'Messaging' },
  { cmd: ':h [message]', desc: 'Send a global hint message visible to all players as an in-game header.', rank: 'Trial Moderator', category: 'Messaging' },
  { cmd: ':kick [player]', desc: 'Remove a player from the server with a stated reason.', rank: 'Trial Moderator', category: 'Moderation' },
  { cmd: ':jail [player]', desc: 'Temporarily jail a player during severe moderation situations instead of issuing a kick.', rank: 'Trial Moderator', category: 'Moderation' },
  { cmd: ':refresh [player]', desc: 'Force refresh a player when stuck or requested during moderation.', rank: 'Trial Moderator', category: 'Utilities' },
  { cmd: ':heal [player]', desc: 'Heal a player during moderation scenes or when a valid reason is provided.', rank: 'Trial Moderator', category: 'Utilities' },
  { cmd: ':kl', desc: 'View kill logs to identify who killed a player when proper evidence is provided.', rank: 'Trial Moderator', category: 'Utilities' },
  { cmd: ':logs', desc: 'View all in-game server moderation logs.', rank: 'Trial Moderator', category: 'Utilities' },
  { cmd: ':startfire', desc: 'Start a fire scenario (e.g. House, Dumpster, Building).', rank: 'Trial Moderator', category: 'Utilities' },
  { cmd: ':load [player]', desc: 'Respawn a player back to the civilian spawn.', rank: 'Trial Moderator', category: 'Respawn' },
  { cmd: ':to [player]', desc: "Teleport to the specified player's location.", rank: 'Trial Moderator', category: 'Teleport' },
  { cmd: ':bring [player]', desc: 'Teleport the specified player to your location.', rank: 'Trial Moderator', category: 'Teleport' },
  { cmd: ':tp [player1] [player2]', desc: "Teleport player1 to player2's location. Use only with approval from both players.", rank: 'Trial Moderator', category: 'Teleport' },
  { cmd: ':tocar', desc: 'Teleport directly to your vehicle.', rank: 'Trial Moderator', category: 'Teleport' },
  { cmd: ':pt [number]', desc: 'Enable peacetime to stop all active violence and combat.', rank: 'Trial Moderator', category: 'Time' },
  { cmd: ':time [number]', desc: 'Set the in-game time. (0–24 format, 12 = Noon)', rank: 'Trial Moderator', category: 'Time' },
  { cmd: ':ban [player] [days] [reason]', desc: 'Issue a timed ban. Ban duration must follow rank limitations.', rank: 'Administrator', category: 'Moderation' },
  { cmd: ':unban [player]', desc: 'Remove an active ban. Must be documented properly.', rank: 'Administrator', category: 'Moderation' },
  { cmd: ':unmod [player/UserID]', desc: 'Remove moderation permissions from another moderator. Use only with authorization.', rank: 'Administrator', category: 'Moderation' },
  { cmd: ':mod [player/UserID]', desc: 'Grant moderation permissions to another player. Use only when authorized.', rank: 'Administrator', category: 'Moderation' },
  { cmd: ':helper [player]', desc: 'Grant helper permissions to another player. Typically used for media or support teams.', rank: 'Administrator', category: 'Moderation' },
  { cmd: ':unhelper [player/UserID]', desc: 'Remove helper permissions from another player. Use only with authorization.', rank: 'Administrator', category: 'Moderation' },
  { cmd: ':weather [type]', desc: 'Set server weather conditions (e.g. Rain, Clear, Thunderstorm, Fog, Snow).', rank: 'Administrator', category: 'Utilities' },
  { cmd: ':admin', desc: 'Grant administrator permissions to another player. Use only with authorization.', rank: 'Director', category: 'Server Control' },
  { cmd: ':unadmin', desc: 'Remove administrator permissions from another player. Use only with authorization.', rank: 'Director', category: 'Administration' },
];

const categories = ['All', 'Messaging', 'Moderation', 'Teleport', 'Utilities', 'Respawn', 'Time', 'Administration', 'Server Control'];
const ranks = ['All', 'Trial Moderator', 'Administrator', 'Director'];

const rankColor = (rank) => rolePalette(rank).badge;

const categoryColor = {
  'Messaging':     'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Moderation':    'bg-red-500/10 text-red-400 border-red-500/20',
  'Teleport':      'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Utilities':     'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Respawn':       'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'Time':          'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Administration':'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Server Control':'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

export default function StaffCommands() {
  const [filterCat, setFilterCat] = useState('All');
  const [filterRank, setFilterRank] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = commands.filter(c => {
    const matchCat = filterCat === 'All' || c.category === filterCat;
    const matchRank = filterRank === 'All' || c.rank === filterRank;
    const matchSearch = !search || c.cmd.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchRank && matchSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Commands"
        subtitle="Complete reference for all available in-game staff commands, organized by rank requirement."
        icon={Terminal}
        badge="Reference"
      />

      {/* Filters */}
      <div className="glass border border-white/5 rounded-2xl p-5 space-y-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search commands..."
          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-blue-500/40 transition-colors"
        />
        <div className="space-y-3">
          <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Category</div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${filterCat === cat ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'glass border-white/5 text-white/40 hover:text-white/70 hover:border-white/10'}`}
              >{cat}</button>
            ))}
          </div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold pt-1">Min. Rank</div>
          <div className="flex flex-wrap gap-2">
            {ranks.map(rank => (
              <button
                key={rank}
                onClick={() => setFilterRank(rank)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${filterRank === rank ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'glass border-white/5 text-white/40 hover:text-white/70 hover:border-white/10'}`}
              >{rank}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs text-white/30 font-medium">{filtered.length} command{filtered.length !== 1 ? 's' : ''} shown</div>

      {/* Command list */}
      <div className="space-y-3">
        {filtered.map((c, i) => (
          <div
            key={i}
            className="glass border border-white/5 rounded-2xl p-4 flex items-start gap-4 hover:border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <code className="text-sm font-mono font-bold text-blue-300 flex-shrink-0 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20 whitespace-nowrap tracking-wide">
              {c.cmd}
            </code>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/65 leading-relaxed">{c.desc}</p>
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${categoryColor[c.category] || 'bg-white/5 text-white/30 border-white/10'}`}>
                  {c.category}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${rankColor(c.rank)}`}>
                  {c.rank}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}