import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import { icons, NavIcon } from './staffIcons';

const HIGHLIGHTED = {
  '/in-game-rules': 'PRIMARY',
  '/melonly-guide': 'ESSENTIAL',
  '/staff-commands': 'ESSENTIAL',
  '/server-rules': 'POPULAR',
};

const pinnedShortcuts = [
  { label: 'Melonly Guide', path: '/melonly-guide', icon: icons.melonlyGuide },
  { label: 'Staff Commands', path: '/staff-commands', icon: icons.staffCommands },
  { label: 'Server Rules', path: '/server-rules', icon: icons.serverRules },
];

const navSections = [
  {
    label: 'General',
    items: [
      { label: 'Home', path: '/', icon: icons.home },
      { label: 'Staff Guide', path: '/staff-guide', icon: icons.staffGuide },
      { label: 'Staff Activity & Quotas', path: '/staff-activity-quotas', icon: icons.staffActivity },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Staff Resources', path: '/staff-resources', icon: icons.staffResources },
    ],
  },
  {
    label: 'Moderation',
    items: [
      { label: 'In-Game Rules', path: '/in-game-rules', icon: icons.inGameRules },
      { label: 'Moderator Rules', path: '/moderator-rules', icon: icons.moderatorRules },
      { label: 'Moderation Handbook', path: '/moderation-handbook', icon: icons.moderationHandbook },
      { label: 'Scene Procedures', path: '/moderation-scene-procedures', icon: icons.sceneProcedures },
      { label: 'Discord Moderation', path: '/discord-moderation', icon: icons.discordModeration },
      { label: 'Melonly Guide', path: '/melonly-guide', icon: icons.melonlyGuide },
      { label: 'Staff Commands', path: '/staff-commands', icon: icons.staffCommands },
      { label: 'Staff Communication', path: '/staff-communication', icon: icons.staffCommunication },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Administration Rules', path: '/administration-rules', icon: icons.administrationRules },
      { label: 'Server Rules', path: '/server-rules', icon: icons.serverRules },
    ],
  },
  {
    label: 'Training & Development',
    items: [
      { label: 'Training Info', path: '/training-information', icon: icons.trainingInfo },
      { label: 'Staff Expectations', path: '/staff-expectations', icon: icons.staffExpectations },
      { label: 'Scenario Training', path: '/scenario-training', icon: icons.scenarioTraining },
      { label: 'Promotion Info', path: '/promotion-information', icon: icons.promotionInfo },
    ],
  },
  {
    label: 'Help & Reference',
    items: [
      { label: 'FAQ', path: '/faq', icon: icons.faq },
      { label: 'Knowledge Base', path: '/knowledge-base', icon: icons.knowledgeBase },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-50 w-64
        glass-strong border-r border-white/5
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto lg:flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo area */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img
              src="https://media.base44.com/images/public/6a1559683a239521f5263a7b/4cedc96e8_nevada_roleplay_logo.png"
              alt="Nevada State Roleplay"
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="text-sm font-bold text-white leading-none">Nevada State</div>
              <div className="text-xs text-white/40 mt-0.5">Roleplay</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white/40 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 overflow-y-auto scrollbar-thin h-[calc(100%-80px)]">

          {/* Pinned Shortcuts */}
          <div className="mb-5">
            <div className="px-3 py-2 text-[10px] font-bold text-blue-400/60 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-blue-400/60 inline-block" />
              Most Used Staff Tools
            </div>
            <div className="space-y-0.5">
              {pinnedShortcuts.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={`pinned-${item.path}`}
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium min-h-[40px]
                      transition-all duration-200 group border
                      ${active
                        ? 'nav-active text-blue-400 border-blue-500/20'
                        : 'text-white/55 hover:text-white/80 hover:bg-blue-500/5 border-blue-500/10 bg-blue-500/3'
                      }
                    `}
                  >
                    <NavIcon icon={item.icon} className={active ? 'text-blue-400' : 'text-blue-400/50 group-hover:text-blue-400/80'} />
                    <span className="flex-1 text-xs">{item.label}</span>
                    <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400/70 border border-blue-500/20">
                      {HIGHLIGHTED[item.path]}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <div className="px-3 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                {section.label}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = location.pathname === item.path;
                  const badge = HIGHLIGHTED[item.path];
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium min-h-[44px]
                        transition-all duration-200 group
                        ${active
                          ? 'nav-active text-blue-400'
                          : badge
                            ? 'text-white/60 hover:text-white/85 hover:bg-blue-500/5 bg-blue-500/3 border border-blue-500/10'
                            : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                        }
                      `}
                    >
                      <NavIcon icon={item.icon} className={active ? 'text-blue-400' : badge ? 'text-blue-400/60 group-hover:text-blue-400/80' : 'text-white/30 group-hover:text-white/60'} />
                      <span className="flex-1">{item.label}</span>
                      {badge && !active && (
                        <span className="text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400/70 border border-blue-500/20">
                          {badge}
                        </span>
                      )}
                      {active && <ChevronRight size={14} className="text-blue-400/60" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}