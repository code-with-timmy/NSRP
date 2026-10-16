// Centralized staff team and rank colors — sourced from the Discord role configuration.
// Nevada Directive Team: purple · Head Management: bright green
// Administration Team: red · Moderation Team: blue
//
// Every component that shows a staff role, rank, or team must read its colors from
// here so the same role never renders in two different colors.

const PALETTES = {
  purple: {
    text: 'text-purple-400',
    border: 'border-purple-500/25',
    bg: 'bg-purple-500/5',
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    dot: 'bg-purple-400',
    iconBox: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    glow: 'hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.08)]',
  },
  green: {
    text: 'text-green-400',
    border: 'border-green-500/25',
    bg: 'bg-green-500/5',
    badge: 'bg-green-500/15 text-green-400 border-green-500/30',
    dot: 'bg-green-400',
    iconBox: 'border-green-500/30 bg-green-500/10 text-green-400',
    glow: 'hover:border-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)]',
  },
  red: {
    text: 'text-red-400',
    border: 'border-red-500/25',
    bg: 'bg-red-500/5',
    badge: 'bg-red-500/15 text-red-400 border-red-500/30',
    dot: 'bg-red-400',
    iconBox: 'border-red-500/30 bg-red-500/10 text-red-400',
    glow: 'hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)]',
  },
  blue: {
    text: 'text-blue-400',
    border: 'border-blue-500/25',
    bg: 'bg-blue-500/5',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    dot: 'bg-blue-400',
    iconBox: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    glow: 'hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]',
  },
  // Internal Affairs — unchanged team accent.
  yellow: {
    text: 'text-yellow-400',
    border: 'border-yellow-500/25',
    bg: 'bg-yellow-500/5',
    badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    dot: 'bg-yellow-400',
    iconBox: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    glow: 'hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.08)]',
  },
  // Community Team — unchanged team accent.
  slate: {
    text: 'text-slate-300',
    border: 'border-slate-400/25',
    bg: 'bg-slate-400/5',
    badge: 'bg-slate-400/15 text-slate-300 border-slate-400/30',
    dot: 'bg-slate-400',
    iconBox: 'border-slate-400/30 bg-slate-400/10 text-slate-300',
    glow: 'hover:border-slate-400/40 hover:shadow-[0_0_20px_rgba(148,163,184,0.08)]',
  },
};

// The escalation order shown in the Chain of Command.
export const TEAMS = [
  { name: 'Nevada Directive Team', palette: PALETTES.purple },
  { name: 'Head Management', palette: PALETTES.green },
  { name: 'Administration Team', palette: PALETTES.red },
  { name: 'Moderation Team', palette: PALETTES.blue },
];

const ROLE_COLORS = {
  // Nevada Directive Team — purple
  'Nevada Directive Team': 'purple',
  'Directive Team': 'purple',
  'Director': 'purple',
  'Deputy Director': 'purple',
  'Assistant Director': 'purple',

  // Head Management — bright green
  'Head Management': 'green',
  'Management': 'green',
  'Management Team': 'green',
  'Senior Management': 'green',
  'Junior Management': 'green',
  'Trial Management': 'green',

  // Administration Team — red
  'Administration': 'red',
  'Administration Team': 'red',
  'Administrator': 'red',
  'Senior Administrator': 'red',
  'Junior Administrator': 'red',
  'Trial Administrator': 'red',

  // Moderation Team — blue
  'Moderation Team': 'blue',
  'Moderator': 'blue',
  'Head Moderator': 'blue',
  'Senior Moderator': 'blue',
  'Junior Moderator': 'blue',
  'Trial Moderator': 'blue',

  // Internal Affairs — yellow
  'Internal Affairs': 'yellow',
  'Internal Affairs Team': 'yellow',
  'Director of Internal Affairs': 'yellow',
  'Senior Internal Affairs': 'yellow',
  'Junior Internal Affairs': 'yellow',

  // Community Team — slate
  'Community Team': 'slate',
  'Community Director': 'slate',
  'Community Manager': 'slate',
};

const FALLBACK = {
  text: 'text-white/60',
  border: 'border-white/10',
  bg: 'bg-white/5',
  badge: 'bg-white/10 text-white/60 border-white/10',
  dot: 'bg-white/40',
  iconBox: 'border-white/15 bg-white/5 text-white/60',
  glow: 'hover:border-white/20',
};

// Palette for any rank, team, or role label. Unknown labels fall back to neutral.
export const rolePalette = (role) => PALETTES[ROLE_COLORS[role]] || FALLBACK;