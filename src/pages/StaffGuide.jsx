import { BookOpen } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AccordionSection from '../components/ui/AccordionSection';
import EscalationChain from '../components/staff/EscalationChain';
import { rolePalette } from '@/lib/roleColors';

export default function StaffGuide() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Guide"
        subtitle="The complete onboarding and reference guide for all staff members of ERLC Liberty County."
        icon={BookOpen}
        badge="All Ranks" />
      

      <div className="space-y-3">
        <AccordionSection title="Welcome to the Staff Team" defaultOpen>
          <p>Congratulations on joining the Nevada State Roleplay Staff Team. You have been selected because we believe you possess the character, maturity, and dedication required to uphold the standards of this community. This guide serves as your primary reference for all things staff-related. </p>
          <p>Read this guide thoroughly before taking any moderation actions. Ignorance of these guidelines is not a valid excuse for improper conduct.</p>
        </AccordionSection>

        <AccordionSection title="Staff Rank Structure" badge="Overview">
          <div className="space-y-5">
            {[
            {
              dept: 'Directive Team',
              palette: rolePalette('Nevada Directive Team'),
              ranks: ['Director', 'Deputy Director', 'Assistant Director', 'Nevada Directive Team']
            },
            {
              dept: 'Community Team',
              palette: rolePalette('Community Team'),
              ranks: ['Community Director', 'Community Manager']
            },
            {
              dept: 'Management Team',
              palette: rolePalette('Management Team'),
              ranks: ['Head Management', 'Senior Management', 'Management', 'Junior Management', 'Trial Management', 'Management Team']
            },
            {
              dept: 'Internal Affairs',
              palette: rolePalette('Internal Affairs'),
              ranks: ['Director of Internal Affairs', 'Senior Internal Affairs', 'Internal Affairs', 'Junior Internal Affairs', 'Internal Affairs Team']
            },
            {
              dept: 'Administration Team',
              palette: rolePalette('Administration Team'),
              ranks: ['Senior Administrator', 'Administrator', 'Junior Administrator', 'Trial Administrator', 'Administration Team']
            },
            {
              dept: 'Moderation Team',
              palette: rolePalette('Moderation Team'),
              ranks: ['Head Moderator', 'Senior Moderator', 'Moderator', 'Junior Moderator', 'Trial Moderator', 'Moderation Team']
            }].
            map(({ dept, palette, ranks }) =>
            <div key={dept} className={`glass border ${palette.border} ${palette.bg} ${palette.glow} rounded-2xl overflow-hidden`}>
                {/* Department Header */}
                <div className={`flex items-center gap-2.5 px-5 py-3 border-b ${palette.border}`}>
                  <span className={`w-2 h-2 rounded-full ${palette.dot}`} />
                  <span className="text-xs font-black uppercase tracking-widest text-white/80">{dept}</span>
                </div>
                {/* Ranks */}
                <div className="px-4 py-3 space-y-1.5">
                  {ranks.map((rank, i) =>
                <div
                  key={rank}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                  
                      <span className={`text-[10px] font-bold text-white/20 w-4 text-right flex-shrink-0`}>{i + 1}</span>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${palette.badge} flex-shrink-0`}>
                        {rank}
                      </span>
                    </div>
                )}
                </div>
              </div>
            )}
          </div>
        </AccordionSection>

        <AccordionSection title="General Conduct Expectations">
          <ul className="space-y-2">
            {[
            'Always remain professional and respectful in all server channels and in-game.',
            'Do not abuse your staff permissions under any circumstances.',
            'Avoid engaging in arguments with community members publicly — escalate to a higher rank if needed.',
            'Maintain a neutral stance on all moderation decisions. Do not play favorites.',
            'Activity is required. If you need a leave of absence, notify Management Team.',
            'Do not leak internal staff discussions or decisions to non-staff members.',
            'Represent the server positively at all times, both in-game and in Discord.'].
            map((item, i) =>
            <li key={i} className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">·</span>
                <span>{item}</span>
              </li>
            )}
          </ul>
        </AccordionSection>

        <AccordionSection title="Escalation Procedure">
          <p className="mb-3">Escalate through the following teams, in order:</p>
          <EscalationChain />
        </AccordionSection>

        <AccordionSection title="Confidentiality Policy">
          <p>All staff discussions, internal decisions, evidence files, and personnel matters are strictly confidential. Sharing any of this information with non-staff members is grounds for immediate removal from the staff team, regardless of rank.</p>
          <p className="mt-3">This includes, but is not limited to: ban appeals, IA investigations, promotion/demotion discussions, and any content shared in private staff channels.</p>
        </AccordionSection>
      </div>
    </div>);

}