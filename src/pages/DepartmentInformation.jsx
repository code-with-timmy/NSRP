import { Building2 } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AccordionSection from '../components/ui/AccordionSection';

const departments = [
  {
    name: 'Liberty County Police Department (LCPD)',
    icon: '🚔',
    color: 'border-blue-500/20',
    overview: 'The LCPD is the primary law enforcement department in Liberty County. Officers are responsible for patrolling, responding to calls, enforcing traffic laws, and assisting in high-priority situations.',
    ranks: ['Cadet', 'Officer', 'Senior Officer', 'Corporal', 'Sergeant', 'Lieutenant', 'Captain', 'Chief'],
    duties: ['Traffic enforcement and vehicle stops', 'Responding to 10-codes and active crimes', 'Providing backup to other departments', 'Processing arrests and detentions', 'Pursuing fleeing suspects within legal pursuit policy'],
    notes: 'Officers are expected to follow department-specific protocols including proper radio communication (10-codes) and pursuit policies. Department leadership handles internal discipline separately from server staff.',
  },
  {
    name: 'Liberty County Fire & Rescue (LCFR)',
    icon: '🚒',
    color: 'border-red-500/20',
    overview: 'LCFR handles all fire emergencies, vehicle accidents, medical assists, and rescue operations. Fire personnel are required to arrive on scene promptly and operate specialized equipment safely.',
    ranks: ['Probationary Firefighter', 'Firefighter', 'Senior Firefighter', 'Engineer', 'Lieutenant', 'Captain', 'Chief'],
    duties: ['Structure and vehicle fire suppression', 'Vehicle extrication at accident scenes', 'Medical assist alongside EMS', 'Hazmat response', 'Water rescue operations'],
    notes: 'Fire personnel must park apparatus appropriately to avoid blocking traffic unnecessarily. Failure to follow proper protocols while on duty may result in a staff review.',
  },
  {
    name: 'Liberty County Emergency Medical Services (LCEMS)',
    icon: '🚑',
    color: 'border-green-500/20',
    overview: 'LCEMS provides emergency medical care and transport. Medics must respond to all medical calls and prioritize patient care. EMS personnel operate ambulances and are equipped with medical tools.',
    ranks: ['EMT-B', 'EMT-P', 'Paramedic', 'Senior Paramedic', 'Supervisor', 'Medical Director'],
    duties: ['Responding to medical emergencies and injuries', 'Patient assessment and treatment on scene', 'Transporting patients to the hospital', 'Providing medical cover at scenes', 'Coordinating with LCPD and LCFR on multi-agency calls'],
    notes: 'EMS personnel must not engage in law enforcement activities. If a scene is unsafe, wait for LCPD clearance before approaching.',
  },
  {
    name: 'Department of Transportation (DOT)',
    icon: '🚧',
    color: 'border-yellow-500/20',
    overview: 'The DOT manages road infrastructure, traffic control, and scene management during large incidents. DOT personnel coordinate with all departments on road closures and traffic redirection.',
    ranks: ['Traffic Technician', 'Senior Technician', 'Supervisor', 'Director'],
    duties: ['Traffic cone and barrier placement', 'Road closure management', 'Scene perimeter support', 'Coordination with LCPD during major incidents'],
    notes: 'DOT personnel must have explicit permission from LCPD command before closing major roadways.',
  },
];

export default function DepartmentInformation() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Department Information"
        subtitle="Overview of all active departments in Liberty County — their roles, ranks, and responsibilities."
        icon={Building2}
        badge="Reference"
      />

      <div className="space-y-3">
        {departments.map((dept, i) => (
          <AccordionSection key={i} title={`${dept.icon}  ${dept.name}`} defaultOpen={i === 0}>
            <div className={`glass ${dept.color} rounded-xl p-4 mb-4 border`}>
              <p>{dept.overview}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Rank Structure</h4>
                <div className="flex flex-wrap gap-1">
                  {dept.ranks.map(r => (
                    <span key={r} className="text-[10px] px-2 py-0.5 rounded-full glass border border-white/10 text-white/40">{r}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Primary Duties</h4>
                <ul className="space-y-1">
                  {dept.duties.map((d, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <span className="text-blue-400 text-[10px] mt-0.5">▸</span>
                      <span className="text-[11px] text-white/45">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <p className="text-xs text-white/35 italic">{dept.notes}</p>
            </div>
          </AccordionSection>
        ))}
      </div>
    </div>
  );
}