import { Bookmark, ExternalLink, Users, FileText, Link as LinkIcon } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

const ResourceCard = ({ icon: Icon, title, description, href, label, accent = 'blue' }) => {
  const accents = {
    blue: { border: 'border-blue-500/25', iconBg: 'bg-blue-500/15', iconBorder: 'border-blue-500/25', icon: 'text-blue-400', btn: 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30' },
    green: { border: 'border-green-500/25', iconBg: 'bg-green-500/15', iconBorder: 'border-green-500/25', icon: 'text-green-400', btn: 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30' },
    purple: { border: 'border-purple-500/25', iconBg: 'bg-purple-500/15', iconBorder: 'border-purple-500/25', icon: 'text-purple-400', btn: 'bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30' },
    amber: { border: 'border-amber-500/25', iconBg: 'bg-amber-500/15', iconBorder: 'border-amber-500/25', icon: 'text-amber-400', btn: 'bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30' },
  };
  const a = accents[accent];
  return (
    <div className={`glass border ${a.border} rounded-2xl p-5 flex items-start gap-4`}>
      <div className={`w-10 h-10 rounded-xl ${a.iconBg} border ${a.iconBorder} flex items-center justify-center flex-shrink-0 mt-0.5`}>
        <Icon size={18} className={a.icon} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-white mb-1">{title}</div>
        <div className="text-xs text-white/45 leading-relaxed mb-3">{description}</div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${a.btn}`}
          >
            <ExternalLink size={12} />
            {label || 'Open Link'}
          </a>
        )}
      </div>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 mt-2 mb-3">
    <div className="h-px flex-1 bg-white/5" />
    <span className="text-[10px] font-bold text-white/25 uppercase tracking-widest">{title}</span>
    <div className="h-px flex-1 bg-white/5" />
  </div>
);

export default function StaffResources() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Staff Resources"
        subtitle="A curated collection of important links, tools, and documentation for Nevada State Roleplay staff members. Bookmark this page for quick access to everything you need."
        icon={Bookmark}
        badge="Quick Access"
      />

      <SectionHeader title="Community" />
      <ResourceCard
        icon={Users}
        accent="green"
        title="Nevada State Roleplay Community"
        description="Join the official Nevada State Roleplay ERLC private server. This link provides direct access to our active roleplay community. Share this with players who are looking to join."
        href="https://melon.ly/join/RCCXFP"
        label="Join Community"
      />

      <SectionHeader title="Staff Portal & Applications" />
      <div className="space-y-3">
        <ResourceCard
          icon={FileText}
          accent="blue"
          title="Staff Application Portal"
          description="The official staff application hub where prospective members can review open positions, requirements, and submit their applications to join the Nevada State Roleplay staff team."
          href="/staff-applications"
          label="View Applications"
        />
        <ResourceCard
          icon={FileText}
          accent="purple"
          title="Application Review Panel"
          description="Admin-only access to the application review dashboard where Management can review, accept, or deny submitted staff applications and track application status."
          href="/application-review"
          label="Review Applications"
        />
      </div>

      <SectionHeader title="Documentation" />
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { title: 'Staff Guide', path: '/staff-guide', desc: 'Overview of staff ranks, departments, and operational structure.' },
          { title: 'Moderator Rules', path: '/moderator-rules', desc: 'Official infraction system and conduct expectations for all staff.' },
          { title: 'In-Game Rules', path: '/in-game-rules', desc: 'ER:LC violations, punishment tiers, and enforcement procedures.' },
          { title: 'Server Rules', path: '/server-rules', desc: 'General community, Discord, and account rules.' },
          { title: 'Discord Moderation', path: '/discord-moderation', desc: 'Guidelines for moderating the Nevada State Roleplay Discord server and community channels.' },
          { title: 'Staff Commands', path: '/staff-commands', desc: 'Reference list of all available staff commands and their usage.' },
          { title: 'Department Info', path: '/department-information', desc: 'Overview of each department and their specific roles and responsibilities.' },
          { title: 'Training Info', path: '/training-information', desc: 'Training procedures and expectations for new and current staff members.' },
        ].map(item => (
          <a
            key={item.title}
            href={item.path}
            className="glass border border-white/8 rounded-xl p-4 hover:border-blue-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{item.title}</span>
              <ExternalLink size={13} className="text-white/20 group-hover:text-blue-400 transition-colors" />
            </div>
            <p className="text-xs text-white/35 leading-relaxed">{item.desc}</p>
          </a>
        ))}
      </div>

      <SectionHeader title="Training Resources" />
      <div className="space-y-3">
        {[
          { title: 'Moderation Handbook', path: '/moderation-handbook', desc: 'Detailed guide on how to handle player reports, issue punishments, and moderate effectively.' },
          { title: 'Staff Expectations', path: '/staff-expectations', desc: 'Professionalism standards, activity expectations, and conduct requirements for all staff members.' },
          { title: 'Scenario Training', path: '/scenario-training', desc: 'Practice moderation scenarios with detailed correct answers and explanations — essential for Trial Moderators.' },
          { title: 'Staff Communication', path: '/staff-communication', desc: 'Guidelines for professional communication with players, in staff chat, and on Discord.' },
          { title: 'Promotion Information', path: '/promotion-information', desc: 'How the promotion process works, what is evaluated, and how to advance through the staff ranks.' },
          { title: 'Knowledge Base', path: '/knowledge-base', desc: 'Answers to common staff and player questions, rule clarifications, and important roleplay definitions.' },
        ].map(item => (
          <a
            key={item.title}
            href={item.path}
            className="glass border border-white/8 rounded-xl p-4 hover:border-blue-500/30 transition-all group flex items-center gap-3"
          >
            <LinkIcon size={14} className="text-blue-400/60 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{item.title}</div>
              <div className="text-xs text-white/35 leading-relaxed mt-0.5">{item.desc}</div>
            </div>
            <ExternalLink size={12} className="text-white/20 group-hover:text-blue-400 transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}