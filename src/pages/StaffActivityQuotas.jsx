import { BarChart3 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ActivityCard from '../components/staff/ActivityCard';
import { rolePalette } from '@/lib/roleColors';

const ROLES = [
  { role: 'Moderator', hours: '5 hrs / week', desc: 'Expected to actively moderate scenes, assist players, and remain responsive during patrols.' },
  { role: 'Administration', hours: '5 hrs / week', desc: 'Responsible for handling moderation situations, assisting staff, and maintaining server stability.' },
  { role: 'Internal Affairs', hours: '5 hrs / week + 3 tickets', desc: 'Responsible for reviewing reports, investigating staff matters, and handling internal affairs professionally.' },
  { role: 'Management', hours: '4 hrs / week', desc: 'Responsible for overseeing moderation, supervising staff performance, and assisting with staff operations.' },
  { role: 'Directive Team', hours: '1 hr / week', desc: 'Responsible for staff oversight, training, and onboarding new staff members.' },
  { role: 'Community Director', hours: '2 hrs / week', desc: 'Responsible for overseeing community operations, supervising community leadership, resolving escalated community issues, and maintaining a professional community environment.' },
  { role: 'Community Manager', hours: '3 hrs / week', desc: 'Responsible for managing community engagement, assisting members, organizing community activities, and supporting day-to-day community operations.' },
];

export default function StaffActivityQuotas() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Activity & Quotas"
        subtitle="Weekly activity requirements for every staff rank. Meet your quota to remain in good standing."
        icon={BarChart3}
        badge="All Ranks"
      />

      <div className="glass border border-amber-500/20 bg-amber-500/5 rounded-2xl px-4 py-3">
        <p className="text-sm text-amber-300/90 leading-relaxed">
          All staff members are expected to maintain activity and professionalism within the community. Failure to meet activity requirements without notice may result in <strong className="text-amber-300">inactivity review, demotion, or removal</strong> from the staff team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ROLES.map((r) => (
          <ActivityCard key={r.role} role={r.role} hours={r.hours} desc={r.desc} palette={rolePalette(r.role)} />
        ))}
      </div>
    </div>
  );
}