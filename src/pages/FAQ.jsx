import { HelpCircle } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import AccordionSection from '../components/ui/AccordionSection';

const faqs = [
  {
    q: 'Can I use my staff commands outside of active moderation situations?',
    a: null,
  },
  {
    q: 'What should I do if I witness another staff member breaking rules?',
    a: null,
  },

  {
    q: 'Can I issue a ban without evidence?',
    a: 'No. Every ban, regardless of severity, must be accompanied by documented evidence. This protects both the community and the staff team from unfair decisions. If you cannot produce evidence, you cannot issue the ban.',
  },

  {
    q: 'I was demoted. Can I appeal?',
    a: null,
  },
  {
    q: 'What is the difference between a verbal warning and an official warning?',
    a: 'A verbal warning is an informal reminder — not logged in the system and not counted toward punishment escalation. An official warning is logged, visible in staff records, and counts toward kick/ban escalation thresholds.',
  },
  {
    q: 'Can I moderate my friends or people I know?',
    a: 'This is strongly discouraged. If your relationship with a player could compromise your objectivity — either too lenient or too harsh — recuse yourself and ask another staff member to handle the situation. Bias-based moderation is a serious violation.',
  },
  {
    q: 'How are promotions decided?',
    a: 'Promotions are reviewed by the Management Team based on performance evaluations, activity logs, peer feedback, and conduct record. There is no fixed schedule — promotions happen when leadership determines you are ready. Asking for a promotion does not accelerate the process.',
  },
  {
    q: 'What happens if I make a mistake during moderation?',
    a: 'Mistakes happen. If you realize you\'ve made an error — wrong player kicked, incorrect punishment applied — notify a higher rank immediately and correct the situation. Transparency is valued. Attempting to cover up mistakes is treated far more seriously than the mistake itself.',
  },
  {
    q: 'Is it okay to discuss staff decisions in public channels?',
    a: 'No. All staff decisions, especially regarding bans, warnings, or personnel matters, must remain in private staff channels. Discussing them publicly creates drama and undermines professionalism.',
  },
];

export default function FAQ() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQ"
        subtitle="Answers to the most frequently asked questions by staff members at ERLC Liberty County."
        icon={HelpCircle}
        badge="Reference"
      />

      <div className="glass border border-white/5 rounded-2xl p-4 text-xs text-white/40 leading-relaxed">
        Can't find what you're looking for? Ask in the <span className="text-blue-400">#staff-help</span> channel on Discord. Management Team members are available to answer questions.
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionSection key={i} title={faq.q}>
            {faq.q === 'Can I use my staff commands outside of active moderation situations?' ? (
              <p>
                No. Staff commands are intended for official moderation and administrative duties only.<br /><br />
                The only commands that may be used while off-duty are <span className="text-blue-400 font-semibold">:logs</span>, <span className="text-blue-400 font-semibold">:pm</span>, and <span className="text-blue-400 font-semibold">:refresh</span>.<br /><br />
                The <span className="text-blue-400 font-semibold">:refresh</span> command should only be used when necessary, such as resolving avatar loading issues, fixing character-related problems, or becoming stuck in-game.<br /><br />
                Any misuse of staff commands for personal benefit, entertainment, roleplay advantages, or unauthorized purposes may be considered an abuse of permissions and could result in disciplinary action.
              </p>
            ) : faq.q === 'What should I do if I witness another staff member breaking rules?' ? (
              <p>
                Document the incident thoroughly by gathering evidence such as screenshots, recordings, chat logs, or other relevant proof.<br /><br />
                To report a staff member, create an Internal Affairs ticket through the{' '}
                <a
                  href="https://discord.com/channels/1240254671189180416/1241959413397585990"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >#support channel</a>.<br /><br />
                If the report involves a high-ranking staff member, Management Team member, or someone in a leadership position, create a Management Ticket instead.<br /><br />
                Do not confront the staff member directly regarding the report. Allow Internal Affairs or Management to conduct an impartial review of the situation to ensure fairness and professionalism throughout the investigation process.
              </p>
            ) : faq.q === 'I was demoted. Can I appeal?' ? (
              <p>
                Yes. Demotions can be appealed through the Internal Affairs Team. Submit your appeal in the{' '}
                <a
                  href="https://discord.com/channels/1240254671189180416/1241959413397585990"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >#support channel</a>{' '}
                with your reasons and any relevant evidence. Appeals are reviewed within 7 days. Note that appeals do not guarantee a reversal.
              </p>
            ) : (
              <p>{faq.a}</p>
            )}
          </AccordionSection>
        ))}
      </div>
    </div>
  );
}