import { GraduationCap } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AccordionSection from '../components/ui/AccordionSection';
import RankBadge from '../components/ui/RankBadge';

export default function TrainingInformation() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Training Information"
        subtitle="All training requirements, session formats, and evaluation procedures for ERLC Liberty County staff."
        icon={GraduationCap}
        badge="All Ranks"
      />

      <div className="space-y-3">
        <AccordionSection title="Trial Moderator Evaluation Period" defaultOpen badge="2 Weeks">
          <p>All newly appointed Trial Moderators undergo a mandatory 2-week evaluation period. During this time, you will be closely observed by Administrators and the Management Team. Your performance, decision-making, and conduct will determine whether you are promoted to full Moderator status.</p>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Evaluation Duration', value: '14 days from appointment' },
              { label: 'Required Activity', value: 'Min. 5 hrs/week in-server' },
              { label: 'Training Sessions', value: 'At least 1 attended' },
              { label: 'Supervisor Review', value: 'End-of-period report by Admin' },
            ].map(item => (
              <div key={item.label} className="glass border border-white/5 rounded-xl p-3">
                <div className="text-[10px] text-white/30 uppercase tracking-wider">{item.label}</div>
                <div className="text-sm font-medium text-white/70 mt-1">{item.value}</div>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Weekly Training Sessions">
          <p className="mb-3">Mandatory training sessions are hosted every <strong className="text-white/80">Saturday at 5:00 PM EST</strong>. These sessions are held in a designated voice channel on the staff Discord and cover practical scenarios, rule reviews, and command training.</p>
          <div className="glass border border-white/5 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 border-b border-white/5 px-4 py-2 text-[10px] text-white/30 uppercase tracking-wider">
              <span>Rank</span><span>Attendance Required</span><span>Session Type</span>
            </div>
            {[
              { rank: 'Trial Moderator', req: '1 per eval period', type: 'Mandatory basics' },
              { rank: 'Moderator', req: 'Monthly', type: 'Advanced scenarios' },
              { rank: 'Administrator', req: 'Quarterly', type: 'Leadership workshop' },
            ].map(row => (
              <div key={row.rank} className="grid grid-cols-3 px-4 py-3 border-b border-white/5 last:border-0 text-xs">
                <RankBadge rank={row.rank} size="xs" />
                <span className="text-white/50">{row.req}</span>
                <span className="text-white/40">{row.type}</span>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Session Content & Format">
          <p className="mb-3">Each Staff Instructor training session follows a structured process designed to evaluate a trainee's rule knowledge, moderation ability, professionalism, and performance during live scenarios.</p>
          <div className="space-y-3">
            {[
              {
                time: '10–15 min',
                topic: 'Staff Knowledge Quiz',
                bullets: [
                  'Review staff guide knowledge',
                  'Ask moderation questions',
                  'Verify understanding of rules and procedures',
                  'Test knowledge of moderation expectations',
                ],
              },
              {
                time: '15–20 min',
                topic: 'Scenario Evaluation',
                bullets: [
                  'Present moderation scenarios',
                  'Evaluate decision-making',
                  'Assess rule knowledge',
                  'Review moderation judgment',
                ],
              },
              {
                time: '20–50 min',
                topic: '30-Minute Ride-Along (R/A)',
                bullets: [
                  'Observe trainee responding to active calls',
                  'Evaluate scene handling and professionalism',
                  'Ensure proper communication with players',
                  'Assess rule enforcement and moderation practices',
                  'Verify the trainee pulls their vehicle off the roadway appropriately',
                  'Monitor decision-making during live situations',
                  'Evaluate fairness, maturity, and staff conduct',
                ],
              },
              {
                time: '50–55 min',
                topic: 'Final Review',
                bullets: [
                  'Discuss strengths and weaknesses',
                  'Address any concerns',
                  'Provide feedback and coaching',
                ],
              },
              {
                time: '55–60 min',
                topic: 'Pass / Fail Determination',
                bullets: [
                  'Review overall performance',
                  'Determine whether the trainee meets staff expectations',
                  'Submit training results and recommendations',
                ],
              },
            ].map(item => (
              <div key={item.time} className="glass border border-white/5 rounded-xl p-3">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-[10px] font-mono text-blue-400 flex-shrink-0 mt-0.5 w-16">{item.time}</span>
                  <span className="text-xs font-semibold text-white/80">{item.topic}</span>
                </div>
                <div className="ml-[76px] space-y-1">
                  {item.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400/50 flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-white/45 leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection title="Evaluation Criteria">
          <p className="mb-3">Staff are evaluated on the following criteria during the trial period and periodic reviews:</p>
          <ul className="space-y-2">
            {[
              'Professionalism and conduct in-game and in Discord',
              'Accuracy and fairness of moderation decisions',
              'Response time to active incidents and staff calls',
              'Correct use of staff commands and documentation',
              'Communication with fellow staff members',
              'Understanding of all punishment tiers and rules',
              'Willingness to learn and accept feedback',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <span className="w-5 h-5 rounded-full glass border border-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span className="text-white/55 pt-0.5">{item}</span>
              </li>
            ))}
          </ul>
        </AccordionSection>

        <AccordionSection title="Requesting a Leave of Absence (LOA)">
          <p>If you need to take a break from your staff duties, you must submit a Leave of Absence request in the designated Discord channel at least <strong className="text-white/80">48 hours before your absence begins</strong>.</p>
          <p className="mt-3">Include: start date, expected return date, and reason. LOA requests for longer than 14 days require Management Team approval. Unannounced absences exceeding 7 days may result in automatic demotion.</p>
          <div className="mt-3 glass border border-yellow-500/20 rounded-xl p-3">
            <p className="text-xs text-yellow-400/70">Maximum LOA without Management approval: <strong className="text-yellow-400">14 days</strong></p>
          </div>
        </AccordionSection>
      </div>
    </div>
  );
}